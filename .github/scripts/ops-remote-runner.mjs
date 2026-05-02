import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const REPO_KEY = 'website';
const RUNNER_ID = process.env.OPS_EXECUTOR_RUNNER_ID || 'github-actions-website';
const MODEL = process.env.OPENAI_CODEX_MODEL || 'gpt-5-codex';
const OPENAI_BASE_URL = 'https://api.openai.com/v1';
const DEFAULT_BASE_URL = 'https://fourteen-wallet-api-7af291023d36.herokuapp.com';
const DEFAULT_BRANCH = process.env.GITHUB_REF_NAME || 'main';
const MAX_ALLOWED_FILES = 6;
const MAX_FILE_CHARS = 35_000;

function normalizeValue(value) {
  return String(value || '').trim();
}

function log(step, payload = {}) {
  process.stdout.write(`[ops-remote-runner] ${step} ${JSON.stringify(payload)}\n`);
}

function fail(message) {
  throw new Error(message);
}

function getEnv(name, options = {}) {
  const value = normalizeValue(process.env[name]);
  if (!value && options.required) {
    fail(`Missing required env: ${name}`);
  }
  return value;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      ...(options.env || {})
    }
  });

  if (result.status !== 0) {
    const error = new Error(
      `Command failed: ${command} ${args.join(' ')}\n${result.stdout || ''}\n${result.stderr || ''}`.trim()
    );
    error.stdout = result.stdout;
    error.stderr = result.stderr;
    error.status = result.status;
    throw error;
  }

  return (result.stdout || '').trim();
}

function getBaseUrl() {
  return getEnv('OPS_EXPORT_BASE_URL') || DEFAULT_BASE_URL;
}

function getControlHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${getEnv('ADMIN_SYNC_TOKEN', { required: true })}`,
    ...extra
  };
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function requestControl(pathname, init = {}) {
  const response = await fetch(`${getBaseUrl().replace(/\/+$/, '')}${pathname}`, init);
  const payload = await readJson(response);
  if (!response.ok || payload?.ok === false) {
    throw new Error(payload?.error || `Control plane request failed with status ${response.status}`);
  }
  return payload;
}

async function claimNextRequest() {
  for (const actionType of ['apply', 'publish', 'deploy', 'restart']) {
    const payload = await requestControl('/ops/execution-requests/claim', {
      method: 'POST',
      headers: getControlHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        repoKey: REPO_KEY,
        actionType,
        runnerId: RUNNER_ID
      })
    });

    if (payload?.result?.id) {
      return payload.result;
    }
  }

  return null;
}

async function fetchWorkOrder(taskId) {
  const payload = await requestControl(`/ops/tasks/${encodeURIComponent(taskId)}/work-order`, {
    headers: getControlHeaders()
  });
  return payload?.item || null;
}

async function finishRequest(requestId, status, summary, resultMessage, details = null) {
  return requestControl(`/ops/execution-requests/${encodeURIComponent(requestId)}/finish`, {
    method: 'POST',
    headers: getControlHeaders({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      status,
      summary,
      resultMessage,
      runnerId: RUNNER_ID,
      details
    })
  });
}

function remoteBranchExists(branchName) {
  const output = run('git', ['ls-remote', '--heads', 'origin', branchName]);
  return Boolean(output);
}

function ensureTaskBranch(branchName) {
  run('git', ['fetch', '--all', '--prune']);
  if (remoteBranchExists(branchName)) {
    run('git', ['checkout', '-B', branchName, `origin/${branchName}`]);
    return;
  }

  run('git', ['checkout', '-B', branchName, `origin/${DEFAULT_BRANCH}`]);
}

async function loadCandidateFiles(workOrder) {
  const candidates = Array.isArray(workOrder?.proposedFiles) ? workOrder.proposedFiles : [];
  const existing = [];

  for (const relativePath of candidates) {
    if (existing.length >= MAX_ALLOWED_FILES) {
      break;
    }

    const safePath = normalizeValue(relativePath).replace(/^\/+/, '');
    if (!safePath) {
      continue;
    }

    const absolutePath = path.resolve(process.cwd(), safePath);
    try {
      const content = await fs.readFile(absolutePath, 'utf8');
      existing.push({
        path: safePath,
        content: content.slice(0, MAX_FILE_CHARS)
      });
    } catch {
      continue;
    }
  }

  return existing;
}

function buildOpenAiHeaders() {
  const headers = {
    Authorization: `Bearer ${getEnv('OPENAI_API_KEY', { required: true })}`,
    'Content-Type': 'application/json'
  };

  const orgId = getEnv('OPENAI_ORG_ID');
  const projectId = getEnv('OPENAI_PROJECT_ID');
  if (orgId) headers['OpenAI-Organization'] = orgId;
  if (projectId) headers['OpenAI-Project'] = projectId;
  return headers;
}

function extractResponseText(payload) {
  if (!payload) return '';
  if (typeof payload.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const parts = [];
  const output = Array.isArray(payload.output) ? payload.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const chunk of content) {
      const text = normalizeValue(chunk?.text || chunk?.output_text);
      if (text) parts.push(text);
    }
  }
  return parts.join('\n').trim();
}

async function requestOpenAiJson(body) {
  const response = await fetch(`${OPENAI_BASE_URL}/responses`, {
    method: 'POST',
    headers: buildOpenAiHeaders(),
    body: JSON.stringify(body)
  });

  const payload = await readJson(response);
  if (!response.ok) {
    throw new Error(payload?.error?.message || `OpenAI request failed with status ${response.status}`);
  }

  return payload;
}

async function generateApplyPlan(workOrder, fileSnapshots) {
  const schema = {
    type: 'object',
    additionalProperties: false,
    required: ['outcome', 'summary', 'commitMessage', 'blockedReason', 'changes', 'verificationHints'],
    properties: {
      outcome: {
        type: 'string',
        enum: ['apply', 'blocked']
      },
      summary: {
        type: 'string'
      },
      commitMessage: {
        type: 'string'
      },
      blockedReason: {
        anyOf: [{ type: 'string' }, { type: 'null' }]
      },
      verificationHints: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      changes: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['path', 'content', 'rationale'],
          properties: {
            path: { type: 'string' },
            content: { type: 'string' },
            rationale: { type: 'string' }
          }
        }
      }
    }
  };

  const payload = await requestOpenAiJson({
    model: MODEL,
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text:
              'You are an exacting remote coding runner for a production marketing website repository. Work only from the supplied work order and file snapshots. Do not invent files, APIs, or routes that are not grounded in the provided content. If the task is too ambiguous or the files are not enough, return outcome=blocked with a precise blockedReason. Otherwise return minimal production-ready code changes with full updated file contents for changed files only.'
          }
        ]
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: JSON.stringify({
              repoKey: REPO_KEY,
              branchConvention: 'codex/ops-task-<taskId>',
              workOrder,
              allowedPaths: fileSnapshots.map((item) => item.path),
              fileSnapshots
            })
          }
        ]
      }
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'remote_runner_apply_result',
        schema,
        strict: true
      }
    },
    reasoning: {
      effort: 'medium'
    },
    max_output_tokens: 16000
  });

  const text = extractResponseText(payload);
  if (!text) {
    throw new Error('OpenAI returned empty apply plan');
  }

  return JSON.parse(text);
}

function validateChanges(plan, allowedPaths) {
  const changes = Array.isArray(plan?.changes) ? plan.changes : [];
  const allowed = new Set(allowedPaths);

  for (const change of changes) {
    const safePath = normalizeValue(change?.path).replace(/^\/+/, '');
    if (!allowed.has(safePath)) {
      throw new Error(`Runner refused to modify non-allowed path: ${safePath || '<empty>'}`);
    }
  }

  return changes.map((change) => ({
    path: normalizeValue(change.path).replace(/^\/+/, ''),
    content: String(change.content || ''),
    rationale: normalizeValue(change.rationale)
  }));
}

async function writeChanges(changes) {
  for (const change of changes) {
    const absolutePath = path.resolve(process.cwd(), change.path);
    await fs.writeFile(absolutePath, change.content, 'utf8');
  }
}

function collectChangedFiles() {
  return run('git', ['status', '--short'])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
}

function runVerification() {
  run('pnpm', ['lint']);
  run('pnpm', ['build']);
  return ['website-lint', 'website-build'];
}

function gitCommitAndPush(branchName, commitMessage) {
  const changedFiles = collectChangedFiles();
  if (!changedFiles.length) {
    return {
      changedFiles: [],
      commitSha: '',
      pushed: false
    };
  }

  run('git', ['config', 'user.name', '4TEEN Ops Runner']);
  run('git', ['config', 'user.email', 'ops-runner@4teen.me']);
  run('git', ['add', '--all']);
  run('git', ['commit', '-m', commitMessage]);
  const commitSha = run('git', ['rev-parse', 'HEAD']);
  run('git', ['push', '-u', 'origin', branchName]);

  return {
    changedFiles,
    commitSha,
    pushed: true
  };
}

async function findOrCreateDraftPr(branchName, taskId, taskTitle) {
  const token = getEnv('GITHUB_TOKEN', { required: true });
  const repository = getEnv('GITHUB_REPOSITORY', { required: true });
  const [owner, repo] = repository.split('/');
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': '4teen-ops-runner'
  };

  const search = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&head=${encodeURIComponent(`${owner}:${branchName}`)}&base=${encodeURIComponent(DEFAULT_BRANCH)}`,
    { headers }
  );
  const existing = await readJson(search);
  if (Array.isArray(existing) && existing[0]?.html_url) {
    return {
      created: false,
      url: existing[0].html_url
    };
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: `[Ops] Task #${taskId}: ${taskTitle}`,
      head: branchName,
      base: DEFAULT_BRANCH,
      draft: true,
      body:
        'Created by the 4TEEN Ops remote runner from a confirmed Telegram execution request.\n\nPlease review the branch diff and verification output before merging.'
    })
  });
  const payload = await readJson(response);
  if (!response.ok) {
    throw new Error(payload?.message || `GitHub PR creation failed with status ${response.status}`);
  }

  return {
    created: true,
    url: payload?.html_url || ''
  };
}

async function processApply(request) {
  const workOrder = await fetchWorkOrder(request.task_id);
  if (!workOrder?.readyToImplement) {
    return {
      status: 'blocked',
      summary: 'Task is not ready to implement',
      resultMessage: 'Work order is not marked as readyToImplement yet.'
    };
  }

  const fileSnapshots = await loadCandidateFiles(workOrder);
  if (!fileSnapshots.length) {
    return {
      status: 'blocked',
      summary: 'No repo files available for grounded changes',
      resultMessage: 'The work order did not expose any existing files that can be edited safely.'
    };
  }

  const branchName = `codex/ops-task-${Number(request.task_id || 0)}`;
  ensureTaskBranch(branchName);

  const plan = await generateApplyPlan(workOrder, fileSnapshots);
  if (normalizeValue(plan?.outcome) !== 'apply') {
    return {
      status: 'blocked',
      summary: normalizeValue(plan?.summary) || 'Runner blocked by Codex plan',
      resultMessage: normalizeValue(plan?.blockedReason) || 'Codex refused to generate a safe grounded patch.'
    };
  }

  const changes = validateChanges(plan, fileSnapshots.map((item) => item.path));
  if (!changes.length) {
    return {
      status: 'done',
      summary: normalizeValue(plan?.summary) || 'No code changes were required',
      resultMessage: 'Codex concluded that no file changes were needed for this task.'
    };
  }

  await writeChanges(changes);
  const changedFiles = collectChangedFiles();
  const verification = runVerification();
  const gitResult = gitCommitAndPush(branchName, normalizeValue(plan?.commitMessage) || `ops: apply task #${request.task_id}`);

  return {
    status: 'done',
    summary: normalizeValue(plan?.summary) || `Applied task #${request.task_id}`,
    resultMessage: [
      `Branch: ${branchName}`,
      gitResult.commitSha ? `Commit: ${gitResult.commitSha}` : '',
      gitResult.pushed ? 'Branch was pushed to origin.' : '',
      verification.length ? `Verification: ${verification.join(', ')}` : '',
      changedFiles.length ? `Files: ${changedFiles.join(', ')}` : ''
    ]
      .filter(Boolean)
      .join('\n'),
    details: {
      branchName,
      commitSha: gitResult.commitSha,
      changedFiles,
      verification
    }
  };
}

async function processPublish(request) {
  const branchName = `codex/ops-task-${Number(request.task_id || 0)}`;
  if (!remoteBranchExists(branchName)) {
    return {
      status: 'blocked',
      summary: 'Branch is not available for publish step',
      resultMessage: `Remote branch ${branchName} does not exist yet. Run apply first.`
    };
  }

  const workOrder = await fetchWorkOrder(request.task_id);
  const pr = await findOrCreateDraftPr(branchName, request.task_id, workOrder?.title || `Task ${request.task_id}`);
  return {
    status: 'done',
    summary: pr.created ? 'Opened draft PR for the prepared branch' : 'Draft PR already exists',
    resultMessage: pr.url || `Branch ${branchName} is available on origin.`,
    details: {
      branchName,
      pullRequestUrl: pr.url || null
    }
  };
}

async function processDeploy(request) {
  const branchName = `codex/ops-task-${Number(request.task_id || 0)}`;
  if (!remoteBranchExists(branchName)) {
    return {
      status: 'blocked',
      summary: 'Branch is not available for deploy step',
      resultMessage: `Remote branch ${branchName} does not exist yet. Run apply first.`
    };
  }

  ensureTaskBranch(branchName);
  run('pnpm', ['install', '--frozen-lockfile']);
  run('pnpm', ['cf:deploy'], {
    env: {
      CLOUDFLARE_API_TOKEN: getEnv('CLOUDFLARE_API_TOKEN', { required: true })
    }
  });

  return {
    status: 'done',
    summary: 'Website deploy completed',
    resultMessage: `Deployed branch ${branchName} to Cloudflare Workers.`
  };
}

async function processRestart() {
  return {
    status: 'blocked',
    summary: 'Website restart is not a supported action',
    resultMessage: 'Cloudflare Worker deploys do not have a separate restart step. Use deploy instead.'
  };
}

async function main() {
  const request = await claimNextRequest();
  if (!request?.id) {
    log('idle', { repoKey: REPO_KEY });
    return;
  }

  log('claimed', {
    requestId: request.id,
    taskId: request.task_id,
    actionType: request.action_type
  });

  try {
    let result;
    if (request.action_type === 'apply') {
      result = await processApply(request);
    } else if (request.action_type === 'publish') {
      result = await processPublish(request);
    } else if (request.action_type === 'deploy') {
      result = await processDeploy(request);
    } else if (request.action_type === 'restart') {
      result = await processRestart(request);
    } else {
      result = {
        status: 'blocked',
        summary: 'Unknown action type',
        resultMessage: `Unsupported action type: ${request.action_type}`
      };
    }

    await finishRequest(request.id, result.status, result.summary, result.resultMessage, result.details || null);
    log('finished', {
      requestId: request.id,
      status: result.status,
      summary: result.summary
    });
  } catch (error) {
    const message = normalizeValue(error?.message) || 'Unknown runner failure';
    await finishRequest(request.id, 'blocked', 'Runner failed while processing request', message, {
      error: message
    }).catch(() => null);
    throw error;
  }
}

main().catch((error) => {
  process.stderr.write(`${normalizeValue(error?.message) || error}\n`);
  process.exit(1);
});
