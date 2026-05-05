import nextEnv from "@next/env";
import { load as loadCheerio } from "cheerio";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pg from "pg";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const { Pool } = pg;

const ROOT_DIR = process.cwd();
const AUTOMATION_DIR = path.join(ROOT_DIR, "scripts/blog-automation");
const PROMPTS_DIR = path.join(AUTOMATION_DIR, "prompts");
const CONFIG_PATH = path.join(AUTOMATION_DIR, "config/pipeline-spec.json");
const SNAPSHOT_PATH = path.join(
  ROOT_DIR,
  "scripts/blog-migration/out/content-table/blog-import.bundle.json",
);
const SCHEMA_PATH = path.join(ROOT_DIR, "scripts/blog-migration/blog-schema.sql");
const GENERATED_IMAGE_DIR = path.join(ROOT_DIR, "public/blog/digests");

const DEFAULTS = {
  feedUrl: "https://rss.app/feeds/v1.1/tKryunfPwo68YKWa.json",
  locale: "en",
  maxArticles: 12,
  scanArticles: 24,
  deepAnalysisArticles: 8,
  lookbackHours: 24,
  triageModel: "gpt-5-nano",
  analysisModel: "gpt-5-mini",
  writerModel: "gpt-5.5",
  metadataModel: "gpt-5-nano",
  imageModel: "gpt-image-1",
  imageQuality: "medium",
  imageSize: "1536x1024",
  imageMode: "openai-generate",
  adminChatId: "@fourteen_smm_managment",
  signature: "Stan At, 4teen Founder",
};

const runStartedAt = Date.now();

function logStage(label, details = "") {
  const elapsedMs = Date.now() - runStartedAt;
  const elapsed = `${(elapsedMs / 1000).toFixed(1)}s`;
  const suffix = details ? ` ${details}` : "";
  console.log(`[digest:${elapsed}] ${label}${suffix}`);
}

function normalizeValue(value) {
  return String(value || "").trim();
}

function getEnv(name, fallback = "") {
  const value = normalizeValue(process.env[name]);
  return value || fallback;
}

async function writeRunResult(status, payload = {}) {
  const resultPath = getEnv("DAILY_DIGEST_RESULT_PATH");
  if (!resultPath) {
    return;
  }

  const result = {
    status,
    generatedAt: new Date().toISOString(),
    ...payload,
  };

  await fs.mkdir(path.dirname(resultPath), { recursive: true });
  await fs.writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

function requireEnv(name) {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseArgs(argv) {
  const args = {
    date: null,
    dryRun: false,
    skipDeploy: false,
    skipNotify: false,
    force: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === "--date" && next) {
      args.date = next;
      index += 1;
      continue;
    }

    if (current === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    if (current === "--skip-deploy") {
      args.skipDeploy = true;
      continue;
    }

    if (current === "--skip-notify") {
      args.skipNotify = true;
      continue;
    }

    if (current === "--force") {
      args.force = true;
      continue;
    }

    throw new Error(`Unknown argument: ${current}`);
  }

  return args;
}

function readJsonFile(filePath) {
  return fs.readFile(filePath, "utf8").then((content) => JSON.parse(content));
}

async function loadConfig() {
  return readJsonFile(CONFIG_PATH);
}

async function loadPrompt(name) {
  return fs.readFile(path.join(PROMPTS_DIR, name), "utf8");
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "user-agent": "4TEEN Daily Digest Bot/1.0",
      accept: "application/json,text/plain,*/*",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.json();
}

async function fetchText(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 20_000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "user-agent": "4TEEN Daily Digest Bot/1.0",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed for ${url}: ${response.status}`);
    }

    return response.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchBuffer(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "user-agent": "4TEEN Daily Digest Bot/1.0",
      accept: "image/*,*/*;q=0.8",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Image request failed for ${url}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    mimeType: response.headers.get("content-type") || "image/jpeg",
  };
}

function canonicalUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    return normalizeValue(value);
  }
}

function dedupeFeedItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${canonicalUrl(item.url)}::${normalizeValue(item.title).toLowerCase()}`;
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function normalizeWhitespace(value) {
  return normalizeValue(value)
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToText(html) {
  const $ = loadCheerio(html);
  $("script, style, noscript, svg, iframe, form, header, footer").remove();
  const articleText = normalizeWhitespace($("article").text());
  const mainText = normalizeWhitespace($("main").text());
  const bodyText = normalizeWhitespace($("body").text());

  const candidates = [articleText, mainText, bodyText].filter(Boolean);
  return candidates.sort((left, right) => right.length - left.length)[0] ?? "";
}

function extractSourceImage($, fallbackImageUrl) {
  const candidates = [
    $('meta[property="og:image"]').attr("content"),
    $('meta[name="twitter:image"]').attr("content"),
    $('meta[property="og:image:url"]').attr("content"),
    $('link[rel="image_src"]').attr("href"),
    fallbackImageUrl,
  ].map(normalizeValue);

  return candidates.find(Boolean) || null;
}

function extractSourceName($, articleUrl) {
  const metaSource =
    $('meta[property="og:site_name"]').attr("content") ||
    $('meta[name="application-name"]').attr("content");

  if (metaSource) {
    return normalizeWhitespace(metaSource);
  }

  try {
    return new URL(articleUrl).hostname.replace(/^www\./, "");
  } catch {
    return "Unknown source";
  }
}

function pickDigestWindow(items, runDate, lookbackHours) {
  const now = runDate ? new Date(`${runDate}T23:59:59.999Z`) : new Date();
  const minTime = now.getTime() - lookbackHours * 60 * 60 * 1000;

  return items.filter((item) => {
    const publishedAt = item.date_published ? new Date(item.date_published).getTime() : 0;
    return publishedAt >= minTime && publishedAt <= now.getTime();
  });
}

function stripHtmlArtifacts(value) {
  return normalizeWhitespace(
    value
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'"),
  );
}

async function fetchArticlePayload(item) {
  let html = "";

  try {
    html = await fetchText(item.url);
  } catch (error) {
    console.warn(`Falling back to RSS content for ${item.url}: ${error.message}`);
  }

  let source = "Unknown source";
  let sourceImageUrl = item.image || null;
  let sourceText = stripHtmlArtifacts(item.content_text || "");

  if (html) {
    const $ = loadCheerio(html);
    source = extractSourceName($, item.url);
    sourceImageUrl = extractSourceImage($, item.image || null);

    const htmlText = htmlToText(html);
    if (htmlText.length > sourceText.length) {
      sourceText = htmlText;
    }
  }

  if (!sourceText) {
    sourceText = stripHtmlArtifacts(item.content_html || "");
  }

  return {
    article_id: item.id || crypto.createHash("sha1").update(item.url).digest("hex"),
    title: item.title,
    source,
    date: item.date_published || new Date().toISOString(),
    url: item.url,
    source_image_url: sourceImageUrl,
    raw_text: sourceText.slice(0, 40_000),
    rss_summary: stripHtmlArtifacts(item.content_text || "").slice(0, 4_000),
    authors: Array.isArray(item.authors) ? item.authors.map((author) => author?.name).filter(Boolean) : [],
  };
}

function buildOpenAiHeaders() {
  const headers = {
    Authorization: `Bearer ${requireEnv("OPENAI_API_KEY")}`,
    "Content-Type": "application/json",
  };

  const orgId = getEnv("OPENAI_ORG_ID");
  if (orgId) {
    headers["OpenAI-Organization"] = orgId;
  }

  const projectId = getEnv("OPENAI_PROJECT_ID");
  if (projectId) {
    headers["OpenAI-Project"] = projectId;
  }

  return headers;
}

function extractResponseText(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const outputs = Array.isArray(payload?.output) ? payload.output : [];
  for (const item of outputs) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      const text = normalizeValue(part?.text || part?.output_text);
      if (text) {
        return text;
      }
    }
  }

  return "";
}

function parseJsonResponse(text) {
  const safe = normalizeValue(text);
  if (!safe) {
    throw new Error("OpenAI returned empty JSON payload");
  }

  const fencedMatch = safe.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedMatch?.[1]?.trim() || safe;

  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    if (start >= 0) {
      let depth = 0;
      let inString = false;
      let escaped = false;

      for (let index = start; index < candidate.length; index += 1) {
        const char = candidate[index];

        if (inString) {
          if (escaped) {
            escaped = false;
            continue;
          }

          if (char === "\\") {
            escaped = true;
            continue;
          }

          if (char === '"') {
            inString = false;
          }
          continue;
        }

        if (char === '"') {
          inString = true;
          continue;
        }

        if (char === "{") {
          depth += 1;
          continue;
        }

        if (char === "}") {
          depth -= 1;
          if (depth === 0) {
            return JSON.parse(candidate.slice(start, index + 1));
          }
        }
      }
    }
  }

  throw new Error("Could not parse OpenAI JSON response");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableOpenAiStatus(status) {
  return status === 408 || status === 409 || status === 429 || status >= 500;
}

async function fetchOpenAiJsonWithRetry(url, init, options = {}) {
  const maxAttempts = options.maxAttempts ?? 3;
  const label = options.label || "OpenAI request";

  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(url, init);
      const payload = await response.json().catch(() => null);

      if (response.ok) {
        return payload;
      }

      const message = payload?.error?.message || `${label} failed: ${response.status}`;
      if (!isRetryableOpenAiStatus(response.status) || attempt === maxAttempts) {
        throw new Error(message);
      }

      lastError = new Error(message);
      const delayMs = 1500 * attempt;
      logStage(`${label} retry`, `attempt=${attempt + 1}/${maxAttempts} after ${response.status}`);
      await sleep(delayMs);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === maxAttempts) {
        throw lastError;
      }

      const delayMs = 1500 * attempt;
      logStage(`${label} retry`, `attempt=${attempt + 1}/${maxAttempts} after network error`);
      await sleep(delayMs);
    }
  }

  throw lastError || new Error(`${label} failed`);
}

async function callOpenAiText({ model, prompt, input, effort = "medium" }) {
  logStage("OpenAI request started", `model=${model} effort=${effort}`);
  const payload = await fetchOpenAiJsonWithRetry(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",
      headers: buildOpenAiHeaders(),
      body: JSON.stringify({
        model,
        reasoning: { effort },
        input: [
          {
            role: "developer",
            content: [{ type: "input_text", text: prompt }],
          },
          {
            role: "user",
            content: [{ type: "input_text", text: JSON.stringify(input, null, 2) }],
          },
        ],
      }),
    },
    {
      label: "OpenAI request",
      maxAttempts: 3,
    },
  );

  logStage("OpenAI request finished", `model=${model}`);
  return extractResponseText(payload);
}

async function callOpenAiJson({ model, prompt, input, effort = "medium" }) {
  const text = await callOpenAiText({ model, prompt, input, effort });
  return parseJsonResponse(text);
}

function collectDigestSignals(analysisCards) {
  return [...analysisCards].sort((left, right) => {
    const priorityDelta =
      Number(right.scores?.daily_digest_priority || 0) -
      Number(left.scores?.daily_digest_priority || 0);

    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    return Number(right.scores?.importance || 0) - Number(left.scores?.importance || 0);
  });
}

function collectTriageSignals(triageCards) {
  return [...triageCards].sort((left, right) => {
    const keepLeft = left.should_analyze ? 1 : 0;
    const keepRight = right.should_analyze ? 1 : 0;
    if (keepLeft !== keepRight) {
      return keepRight - keepLeft;
    }

    const priorityDelta =
      Number(right.scores?.daily_digest_priority || 0) -
      Number(left.scores?.daily_digest_priority || 0);
    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    const importanceDelta =
      Number(right.scores?.importance || 0) - Number(left.scores?.importance || 0);
    if (importanceDelta !== 0) {
      return importanceDelta;
    }

    return Number(right.scores?.verifiability || 0) - Number(left.scores?.verifiability || 0);
  });
}

function selectArticlesForDeepAnalysis(articles, triageCards, maxCount) {
  const articleMap = new Map(articles.map((article) => [article.article_id, article]));
  const rankedCards = collectTriageSignals(triageCards);
  const selected = [];
  const usedSources = new Map();

  for (const card of rankedCards) {
    const article = articleMap.get(card.article_id);
    if (!article) {
      continue;
    }

    const articleType = normalizeValue(card.article_type).toLowerCase();
    const priority = Number(card.scores?.daily_digest_priority || 0);
    const sourceKey = normalizeValue(article.source).toLowerCase();
    const sourceCount = usedSources.get(sourceKey) || 0;

    const isWeakType =
      articleType === "press release" ||
      articleType === "unclear / low-signal content" ||
      articleType === "opinion piece";

    if (!card.should_analyze && priority < 60) {
      continue;
    }

    if (isWeakType && priority < 70) {
      continue;
    }

    if (sourceCount >= 2) {
      continue;
    }

    selected.push(article);
    usedSources.set(sourceKey, sourceCount + 1);

    if (selected.length >= maxCount) {
      break;
    }
  }

  if (selected.length >= Math.min(maxCount, 4)) {
    return selected;
  }

  for (const card of rankedCards) {
    const article = articleMap.get(card.article_id);
    if (!article || selected.some((item) => item.article_id === article.article_id)) {
      continue;
    }

    selected.push(article);
    if (selected.length >= maxCount) {
      break;
    }
  }

  return selected;
}

function buildDigestLegacyId(runDate) {
  return `daily-digest:${runDate}`;
}

function buildFallbackSlug(runDate) {
  return `crypto-market-note-${runDate}`;
}

function extractTelegramTargetFromUrl(value) {
  const safe = normalizeValue(value);
  if (!safe) {
    return "";
  }

  try {
    const parsed = new URL(safe);
    const target = parsed.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
    return target ? `@${target}` : "";
  } catch {
    return "";
  }
}

function slugify(value) {
  return normalizeValue(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "daily-crypto-digest";
}

function extractDigestTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return normalizeWhitespace(match?.[1] || "");
}

function ensureSignature(markdown, signature) {
  const safeSignature = normalizeValue(signature);
  if (!safeSignature) {
    return markdown.trim();
  }

  if (markdown.includes(safeSignature)) {
    return markdown.trim();
  }

  return `${markdown.trim()}\n\n${safeSignature}`;
}

function buildSourceReferencesSection(sourceArticles) {
  const uniqueSources = [];
  const seen = new Set();

  for (const article of sourceArticles) {
    const url = canonicalUrl(article.url);
    if (!url || seen.has(url)) {
      continue;
    }
    seen.add(url);
    uniqueSources.push(`- ${article.title}: ${url}`);
  }

  if (uniqueSources.length === 0) {
    return "";
  }

  return `\n\n## Sources\n\n${uniqueSources.join("\n")}`;
}

async function ensureDir(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function createNoiseOverlay(width, height) {
  const noiseSeed = crypto.randomInt(0, 1_000_000);
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="${noiseSeed}" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.09"/>
        </feComponentTransfer>
      </filter>
      <rect width="${width}" height="${height}" filter="url(#noiseFilter)" opacity="0.55"/>
    </svg>
  `;

  return Buffer.from(svg);
}

function buildGridOverlay(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(12,12,12,0.15)"/>
          <stop offset="70%" stop-color="rgba(12,12,12,0.38)"/>
          <stop offset="100%" stop-color="rgba(255,105,0,0.18)"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shade)"/>
      <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
        ${Array.from({ length: Math.ceil(width / 72) }, (_, index) => {
          const x = index * 72;
          return `<line x1="${x}" y1="0" x2="${x}" y2="${height}" />`;
        }).join("")}
        ${Array.from({ length: Math.ceil(height / 72) }, (_, index) => {
          const y = index * 72;
          return `<line x1="0" y1="${y}" x2="${width}" y2="${y}" />`;
        }).join("")}
      </g>
      <rect width="${width}" height="${height}" fill="rgba(255,105,0,0.09)"/>
    </svg>
  `);
}

async function createBrandedFallbackImage(sourceBuffer, outputPath) {
  const width = 1536;
  const height = 1024;
  const noiseOverlay = await createNoiseOverlay(width, height);
  const gridOverlay = buildGridOverlay(width, height);

  await sharp(sourceBuffer)
    .resize(width, height, {
      fit: "cover",
      position: "attention",
    })
    .modulate({
      brightness: 0.78,
      saturation: 0.65,
    })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${width}" height="${height}" fill="rgba(10,10,10,0.22)"/>
            <rect width="${width}" height="${height}" fill="rgba(255,105,0,0.08)"/>
          </svg>`,
        ),
        blend: "multiply",
      },
      {
        input: gridOverlay,
        blend: "screen",
      },
      {
        input: noiseOverlay,
        blend: "overlay",
      },
    ])
    .jpeg({
      quality: 90,
      mozjpeg: true,
    })
    .toFile(outputPath);
}

async function createOpenAiRemixImage({
  outputPath,
  prompt,
  sourceBuffer,
  sourceMimeType,
  model,
  quality,
  size,
}) {
  const formData = new FormData();
  formData.append("model", model);
  formData.append("prompt", prompt);
  formData.append("size", size);
  formData.append("quality", quality);
  formData.append("output_format", "jpeg");
  formData.append("input_fidelity", "high");
  formData.append(
    "image[]",
    new Blob([sourceBuffer], { type: sourceMimeType || "image/jpeg" }),
    "source-image.jpg",
  );

  const headers = {
    Authorization: `Bearer ${requireEnv("OPENAI_API_KEY")}`,
  };

  const orgId = getEnv("OPENAI_ORG_ID");
  if (orgId) {
    headers["OpenAI-Organization"] = orgId;
  }

  const payload = await fetchOpenAiJsonWithRetry(
    "https://api.openai.com/v1/images/edits",
    {
      method: "POST",
      headers,
      body: formData,
    },
    {
      label: "OpenAI image edit",
      maxAttempts: 3,
    },
  );

  const imageBase64 = payload?.data?.[0]?.b64_json;
  if (!imageBase64) {
    throw new Error("OpenAI image edit did not return image bytes");
  }

  await fs.writeFile(outputPath, Buffer.from(imageBase64, "base64"));
}

async function createOpenAiGeneratedImage({
  outputPath,
  prompt,
  model,
  quality,
  size,
}) {
  const payload = await fetchOpenAiJsonWithRetry(
    "https://api.openai.com/v1/images/generations",
    {
      method: "POST",
      headers: buildOpenAiHeaders(),
      body: JSON.stringify({
        model,
        prompt,
        size,
        quality,
        output_format: "jpeg",
      }),
    },
    {
      label: "OpenAI image generation",
      maxAttempts: 3,
    },
  );

  const imageBase64 = payload?.data?.[0]?.b64_json;
  if (!imageBase64) {
    throw new Error("OpenAI image generation did not return image bytes");
  }

  await fs.writeFile(outputPath, Buffer.from(imageBase64, "base64"));
}

function buildImagePrompt(title) {
  return [
    "Use the source image only as thematic reference.",
    "Create a unique editorial reinterpretation for a premium crypto market daily digest.",
    "Preserve the core subject and scene logic, but remove logos, labels, UI fragments, and watermarks.",
    "Restyle everything into a dark 4TEEN visual language with orange and graphite tones.",
    "Cinematic contrast, calm premium composition, subtle geometric grid atmosphere, subtle texture, no readable text.",
    "Landscape 16:9 news-cover composition.",
    `Context title: ${title}`,
  ].join(" ");
}

function buildDigestImageConcepts(metadata, rankedAnalyses) {
  const keywords = Array.isArray(metadata.keywords) ? metadata.keywords.slice(0, 6) : [];
  const topCards = rankedAnalyses.slice(0, 3);
  const themes = topCards
    .flatMap((card) => Array.isArray(card.sector_tags) ? card.sector_tags : [])
    .filter(Boolean)
    .slice(0, 8);
  const entities = topCards
    .flatMap((card) => Array.isArray(card.main_entities) ? card.main_entities : [])
    .filter(Boolean)
    .slice(0, 8);
  const thesis = normalizeWhitespace(metadata.excerpt || metadata.title || "");

  const base = [
    "Create a premium editorial crypto illustration for 4TEEN.",
    "Landscape 16:9.",
    "Dark graphite and orange 4TEEN brand palette.",
    "Cinematic contrast, subtle grid atmosphere, premium texture, restrained glow, no readable text, no logos, no watermarks, no UI screenshots.",
    "No portrait, no human face close-up, no typography inside the artwork.",
    thesis ? `Digest context: ${thesis}` : "",
    keywords.length ? `Keywords: ${keywords.join(", ")}.` : "",
    themes.length ? `Themes: ${themes.join(", ")}.` : "",
    entities.length ? `Entities: ${entities.join(", ")}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    `${base} Variant 1: a hero composition that visualizes the main market structure of the day with layered signals, capital flows, rails, chains, dashboards abstracted into shapes, and a strong central focal point.`,
    `${base} Variant 2: a protocol-mechanics composition showing pressure, liquidity, token flow, infrastructure, and interlocking systems with abstract geometric storytelling.`,
    `${base} Variant 3: a risk-and-opportunity composition balancing growth versus fragility, with dramatic depth, structural tension, and a more atmospheric editorial frame.`,
  ];
}

async function createAbstractFallbackImage(outputPath) {
  const width = 1536;
  const height = 1024;
  const noiseOverlay = await createNoiseOverlay(width, height);
  const gridOverlay = buildGridOverlay(width, height);

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 14, g: 14, b: 14 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glowA" cx="18%" cy="22%" r="45%">
                <stop offset="0%" stop-color="rgba(255,105,0,0.55)"/>
                <stop offset="55%" stop-color="rgba(255,105,0,0.12)"/>
                <stop offset="100%" stop-color="rgba(255,105,0,0)"/>
              </radialGradient>
              <radialGradient id="glowB" cx="82%" cy="72%" r="42%">
                <stop offset="0%" stop-color="rgba(255,170,80,0.25)"/>
                <stop offset="100%" stop-color="rgba(255,105,0,0)"/>
              </radialGradient>
            </defs>
            <rect width="${width}" height="${height}" fill="#101010"/>
            <rect width="${width}" height="${height}" fill="url(#glowA)"/>
            <rect width="${width}" height="${height}" fill="url(#glowB)"/>
          </svg>`,
        ),
        blend: "screen",
      },
      {
        input: gridOverlay,
        blend: "screen",
      },
      {
        input: noiseOverlay,
        blend: "overlay",
      },
    ])
    .jpeg({
      quality: 90,
      mozjpeg: true,
    })
    .toFile(outputPath);
}

async function createDigestImages({ sourceArticles, slug, runDate, metadata, rankedAnalyses }) {
  const mode = getEnv("DAILY_DIGEST_IMAGE_MODE", DEFAULTS.imageMode);
  const imageModel = getEnv("DAILY_DIGEST_IMAGE_MODEL", DEFAULTS.imageModel);
  const imageQuality = getEnv("DAILY_DIGEST_IMAGE_QUALITY", DEFAULTS.imageQuality);
  const imageSize = getEnv("DAILY_DIGEST_IMAGE_SIZE", DEFAULTS.imageSize);
  const todayPath = runDate;
  const outputDirectory = path.join(GENERATED_IMAGE_DIR, todayPath, slug);
  const imagePrompts = buildDigestImageConcepts(metadata, rankedAnalyses);

  await ensureDir(outputDirectory);

  const imageOutputs = [];

  for (const [index, prompt] of imagePrompts.entries()) {
    const sourceArticle = sourceArticles[index] || sourceArticles[0] || null;
    logStage("Preparing digest image", `${index + 1}/${imagePrompts.length}`);
    const fileName = `${slug}-${index + 1}.jpg`;
    const absolutePath = path.join(outputDirectory, fileName);
    const publicUrl = `/blog/digests/${todayPath}/${slug}/${fileName}`;

    let generationMode = mode;

    try {
      if (mode === "openai-generate" || mode === "auto") {
        await createOpenAiGeneratedImage({
          outputPath: absolutePath,
          prompt,
          model: imageModel,
          quality: imageQuality,
          size: imageSize,
        });
        generationMode = "openai-generate";
      } else if ((mode === "openai-remix" || mode === "source-remix") && sourceArticle?.source_image_url) {
        const { buffer, mimeType } = await fetchBuffer(sourceArticle.source_image_url);
        await createOpenAiRemixImage({
          outputPath: absolutePath,
          prompt: buildImagePrompt(sourceArticle.title),
          sourceBuffer: buffer,
          sourceMimeType: mimeType,
          model: imageModel,
          quality: imageQuality,
          size: imageSize,
        });
        generationMode = "openai-remix";
      } else if (mode === "brand-overlay" && sourceArticle?.source_image_url) {
        const { buffer } = await fetchBuffer(sourceArticle.source_image_url);
        await createBrandedFallbackImage(buffer, absolutePath);
        generationMode = "brand-overlay";
      } else {
        await createAbstractFallbackImage(absolutePath);
        generationMode = "abstract-fallback";
      }
    } catch (error) {
      console.warn(`Image generation failed for digest visual ${index + 1}, using fallback: ${error.message}`);
      if (sourceArticle?.source_image_url) {
        try {
          const { buffer } = await fetchBuffer(sourceArticle.source_image_url);
          await createBrandedFallbackImage(buffer, absolutePath);
          generationMode = "brand-overlay";
        } catch {
          await createAbstractFallbackImage(absolutePath);
          generationMode = "abstract-fallback";
        }
      } else {
        await createAbstractFallbackImage(absolutePath);
        generationMode = "abstract-fallback";
      }
    }

    imageOutputs.push({
      absolutePath,
      publicUrl,
      sourceUrl: sourceArticle?.source_image_url || "",
      generationMode,
      title: sourceArticle?.title || metadata.title,
    });
  }

  logStage("Digest images ready", `${imageOutputs.length} files`);
  return imageOutputs;
}

async function ensureBlogSchema(pool) {
  const schema = await fs.readFile(SCHEMA_PATH, "utf8");
  await pool.query(schema);
}

async function upsertMediaAsset(client, asset) {
  const storageKey = asset.storageKey;
  const existing = await client.query(
    `select id from media_assets where storage_key = $1 limit 1`,
    [storageKey],
  );

  if (existing.rows[0]?.id) {
    const updated = await client.query(
      `
        update media_assets
        set
          public_url = $2,
          alt_text = $3,
          updated_at = now()
        where id = $1
        returning id
      `,
      [existing.rows[0].id, asset.publicUrl, asset.altText],
    );

    return updated.rows[0].id;
  }

  const inserted = await client.query(
    `
      insert into media_assets (
        storage_provider,
        variant,
        storage_key,
        public_url,
        alt_text
      )
      values ($1, $2, $3, $4, $5)
      returning id
    `,
    ["external", asset.variant, storageKey, asset.publicUrl, asset.altText],
  );

  return inserted.rows[0].id;
}

async function upsertBlogPost(client, payload) {
  const existing = await client.query(
    `select id from blog_posts where legacy_source_id = $1 limit 1`,
    [payload.legacySourceId],
  );

  if (existing.rows[0]?.id) {
    const updated = await client.query(
      `
        update blog_posts
        set
          locale = $2,
          slug = $3,
          title = $4,
          excerpt = $5,
          content_markdown = $6,
          status = $7,
          published_at = $8,
          cover_media_id = $9,
          seo_title = $10,
          seo_description = $11,
          source_url = $12,
          source_payload = $13::jsonb,
          updated_at = now()
        where id = $1
        returning id
      `,
      [
        existing.rows[0].id,
        payload.locale,
        payload.slug,
        payload.title,
        payload.excerpt,
        payload.contentMarkdown,
        payload.status,
        payload.publishedAt,
        payload.coverMediaId,
        payload.seoTitle,
        payload.seoDescription,
        payload.sourceUrl,
        JSON.stringify(payload.sourcePayload),
      ],
    );

    return updated.rows[0].id;
  }

  const inserted = await client.query(
    `
      insert into blog_posts (
        legacy_source_id,
        locale,
        slug,
        title,
        excerpt,
        content_markdown,
        status,
        published_at,
        cover_media_id,
        seo_title,
        seo_description,
        source_url,
        source_payload
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb)
      returning id
    `,
    [
      payload.legacySourceId,
      payload.locale,
      payload.slug,
      payload.title,
      payload.excerpt,
      payload.contentMarkdown,
      payload.status,
      payload.publishedAt,
      payload.coverMediaId,
      payload.seoTitle,
      payload.seoDescription,
      payload.sourceUrl,
      JSON.stringify(payload.sourcePayload),
    ],
  );

  return inserted.rows[0].id;
}

async function syncPostMedia(client, postId, mediaIds) {
  await client.query(`delete from blog_post_media where post_id = $1`, [postId]);

  for (const media of mediaIds) {
    await client.query(
      `
        insert into blog_post_media (
          post_id,
          media_id,
          usage,
          sort_order
        )
        values ($1, $2, $3, $4)
      `,
      [postId, media.id, media.usage, media.sortOrder],
    );
  }
}

async function updateSnapshotFile(postRecord) {
  logStage("Updating blog snapshot", postRecord.slug);
  const snapshot = await readJsonFile(SNAPSHOT_PATH);
  const posts = Array.isArray(snapshot.posts) ? snapshot.posts : [];

  const nextPosts = posts.filter(
    (post) =>
      post.legacyId !== postRecord.legacyId &&
      !(post.locale === postRecord.locale && post.slug === postRecord.slug),
  );

  nextPosts.push(postRecord);
  nextPosts.sort(
    (left, right) =>
      new Date(right.publishedAt || 0).getTime() - new Date(left.publishedAt || 0).getTime(),
  );

  snapshot.posts = nextPosts;
  snapshot.meta = {
    ...snapshot.meta,
    generatedAt: new Date().toISOString(),
    sourcePath: "hybrid-generated-daily-digest",
    rowCount: nextPosts.length,
    postCount: nextPosts.length,
    mediaCount: nextPosts.reduce((count, post) => {
      const sourceColumns = post.sourceColumns || {};
      return (
        count +
        ["16x9_image", "9x16_image", "1x1_image"].filter((key) => sourceColumns[key]).length
      );
    }, 0),
  };

  await fs.writeFile(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  logStage("Blog snapshot updated", `${snapshot.posts.length} posts`);
}

function runCommand(command, args, options = {}) {
  const printable = [command, ...args].join(" ");
  console.log(`$ ${printable}`);
  return execFileSync(command, args, {
    cwd: options.cwd || ROOT_DIR,
    stdio: options.stdio || "pipe",
    encoding: "utf8",
    env: {
      ...process.env,
      ...(options.env || {}),
    },
  });
}

function deploySite() {
  logStage("Deploying site");
  return runCommand("pnpm", ["cf:deploy"], {
    stdio: "inherit",
  });
}

async function notifyAdminBot(message) {
  logStage("Sending admin bot notification");
  const token = getEnv("ADMIN_TELEGRAM_BOT_TOKEN", getEnv("TELEGRAM_BOT_TOKEN"));
  if (!token) {
    console.warn("Skipping Telegram notification because no Telegram bot token is available");
    return;
  }

  const fallbackChatFromUrl = extractTelegramTargetFromUrl(getEnv("TELEGRAM_GROUP_URL"));
  const chatId = getEnv(
    "BLOG_ADMIN_CHAT_ID",
    getEnv("DIGEST_ADMIN_CHAT_ID", fallbackChatFromUrl || DEFAULTS.adminChatId),
  );

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: false,
    }),
  });

  if (!response.ok) {
    const payload = await response.text().catch(() => "");
    throw new Error(`Telegram notification failed: ${response.status} ${payload}`);
  }

  logStage("Admin bot notification sent");
}

async function publishDigest({
  analyses,
  args,
  digestMarkdown,
  images,
  metadata,
  runDate,
  selectedArticles,
}) {
  logStage("Publishing digest", metadata.title);
  const legacySourceId = buildDigestLegacyId(runDate);
  const siteSlug = slugify(metadata.slug || metadata.title || buildFallbackSlug(runDate));
  const publishedAt = new Date().toISOString();
  const sourceUrl = selectedArticles[0]?.url || DEFAULTS.feedUrl;
  const keywords = Array.isArray(metadata.keywords) ? metadata.keywords.slice(0, 8) : [];
  const topImage = images[0];
  const sourceColumns = {
    page_url: siteSlug,
    page_title: metadata.title,
    page_description: metadata.seo_description,
    keywords: keywords.join(", "),
    social_media_title: metadata.seo_title,
    social_media_description: metadata.seo_description,
    "16x9_image": images[0]?.publicUrl || "",
    "9x16_image": images[1]?.publicUrl || images[0]?.publicUrl || "",
    "1x1_image": images[2]?.publicUrl || images[0]?.publicUrl || "",
    summary: metadata.excerpt,
    html_5_formated_text: digestMarkdown,
    date: String(Math.floor(new Date(publishedAt).getTime() / 1000)),
    primary_sm: "daily_digest",
    latest_flag: "1",
  };

  const sourcePayload = {
    sourceColumns,
    sourceFeedUrl: DEFAULTS.feedUrl,
    digestMode: "daily_digest",
    digestDate: runDate,
    articleIds: analyses.map((item) => item.article_id),
    articleUrls: selectedArticles.map((item) => item.url),
    analyses,
  };

  const snapshotPost = {
    legacyId: legacySourceId,
    locale: DEFAULTS.locale,
    title: metadata.title,
    slug: siteSlug,
    excerpt: metadata.excerpt,
    contentMarkdown: digestMarkdown,
    status: "published",
    publishedAt,
    coverImageUrl: topImage?.publicUrl || selectedArticles[0]?.source_image_url || null,
    coverImageAlt: metadata.title,
    seoTitle: metadata.seo_title,
    seoDescription: metadata.seo_description,
    sourceUrl,
    dateWasBackfilled: false,
    sourceRowIndex: 0,
    sourceColumns,
  };

  const digestUrl = `https://4teen.me/blog/${siteSlug}`;

  if (args.dryRun) {
    logStage("Dry run complete", "skipped DB/snapshot/deploy/notify");
    return {
      digestUrl,
      slug: siteSlug,
      legacySourceId,
      publishedAt,
      snapshotPost,
    };
  }

  const databaseUrl = getEnv("BLOG_DATABASE_URL", getEnv("DATABASE_URL"));
  if (!databaseUrl) {
    throw new Error("DATABASE_URL or BLOG_DATABASE_URL is required for digest publishing");
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: getEnv("PGSSL_DISABLE") === "1" ? false : { rejectUnauthorized: false },
    max: 4,
  });

  try {
    logStage("Ensuring blog schema");
    await ensureBlogSchema(pool);
    const client = await pool.connect();

    try {
      logStage("Writing digest to Postgres");
      await client.query("begin");

      const mediaIds = [];
      for (const [index, image] of images.entries()) {
        const mediaId = await upsertMediaAsset(client, {
          storageKey: `daily-digest/${runDate}/${siteSlug}-${index + 1}.jpg`,
          publicUrl: image.publicUrl,
          altText: metadata.title,
          variant: index === 0 ? "cover-16x9" : index === 1 ? "social-9x16" : "thumb-1x1",
        });

        mediaIds.push({
          id: mediaId,
          sortOrder: index,
          usage: index === 0 ? "cover" : "gallery",
        });
      }

      const postId = await upsertBlogPost(client, {
        legacySourceId,
        locale: DEFAULTS.locale,
        slug: siteSlug,
        title: metadata.title,
        excerpt: metadata.excerpt,
        contentMarkdown: digestMarkdown,
        status: "published",
        publishedAt,
        coverMediaId: mediaIds[0]?.id || null,
        seoTitle: metadata.seo_title,
        seoDescription: metadata.seo_description,
        sourceUrl,
        sourcePayload,
      });

      await syncPostMedia(client, postId, mediaIds);
      await client.query("commit");
      logStage("Postgres write complete", siteSlug);
    } catch (error) {
      await client.query("rollback");
      throw error;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }

  await updateSnapshotFile(snapshotPost);

  if (!args.skipDeploy) {
    deploySite();
  }

  if (!args.skipNotify) {
    try {
      await notifyAdminBot(`Daily digest published successfully:\n${digestUrl}`);
    } catch (error) {
      console.warn(`Admin bot success notification failed: ${error.message}`);
    }
  }

  return {
    digestUrl,
    slug: siteSlug,
    legacySourceId,
    publishedAt,
  };
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const config = await loadConfig();
  const runDate = args.date || new Date().toISOString().slice(0, 10);
  const feedUrl = getEnv("DAILY_DIGEST_FEED_URL", config.feedUrl || DEFAULTS.feedUrl);
  const lookbackHours = Number(getEnv("DAILY_DIGEST_LOOKBACK_HOURS", String(DEFAULTS.lookbackHours)));
  const maxArticles = Number(getEnv("DAILY_DIGEST_MAX_ARTICLES", String(DEFAULTS.maxArticles)));
  const scanArticles = Number(getEnv("DAILY_DIGEST_SCAN_ARTICLES", String(DEFAULTS.scanArticles)));
  const deepAnalysisArticles = Number(
    getEnv("DAILY_DIGEST_DEEP_ANALYSIS_ARTICLES", String(DEFAULTS.deepAnalysisArticles)),
  );
  const triageModel = getEnv("DAILY_DIGEST_TRIAGE_MODEL", DEFAULTS.triageModel);
  const analysisModel = getEnv("DAILY_DIGEST_ANALYSIS_MODEL", DEFAULTS.analysisModel);
  const writerModel = getEnv("DAILY_DIGEST_WRITER_MODEL", DEFAULTS.writerModel);
  const metadataModel = getEnv("DAILY_DIGEST_METADATA_MODEL", DEFAULTS.metadataModel);
  const writerEffort = getEnv("DAILY_DIGEST_WRITER_EFFORT", "high");
  const signature = getEnv("DAILY_DIGEST_SIGNATURE", config.contentStrategy?.signature || DEFAULTS.signature);

  logStage("Digest run started", `date=${runDate} dryRun=${args.dryRun ? "yes" : "no"}`);
  const feed = await fetchJson(feedUrl);
  const dedupedFeedItems = dedupeFeedItems(feed.items || []);
  logStage("RSS feed loaded", `${Array.isArray(feed.items) ? feed.items.length : 0} items`);
  let windowItems = pickDigestWindow(dedupedFeedItems, runDate, lookbackHours).slice(0, scanArticles);
  logStage("Digest window selected", `${windowItems.length} candidate articles`);

  if (windowItems.length === 0) {
    const fallbackLookbackHours = Math.max(lookbackHours * 3, 72);
    const fallbackWindow = pickDigestWindow(dedupedFeedItems, runDate, fallbackLookbackHours).slice(
      0,
      scanArticles,
    );

    if (fallbackWindow.length > 0) {
      windowItems = fallbackWindow;
      logStage(
        "Digest window fallback",
        `${windowItems.length} candidate articles from ${fallbackLookbackHours}h lookback`,
      );
    } else {
      windowItems = dedupedFeedItems.slice(0, scanArticles);
      if (windowItems.length > 0) {
        logStage("Digest window fallback", `${windowItems.length} latest feed articles`);
      }
    }
  }

  if (windowItems.length === 0) {
    const message = `Daily digest failed: no RSS items found for ${runDate}, even after fallback.`;
    if (!args.skipNotify) {
      await notifyAdminBot(message).catch(() => {});
    }
    throw new Error(message);
  }

  const articles = [];
  for (const [index, item] of windowItems.entries()) {
    logStage("Fetching article payload", `${index + 1}/${windowItems.length} ${item.title}`);
    articles.push(await fetchArticlePayload(item));
  }
  logStage("Article payloads ready", `${articles.length} articles`);

  const triagePrompt = await loadPrompt("article-triage-bot.md");
  const triageCards = [];
  for (const [index, article] of articles.entries()) {
    logStage("Triaging article", `${index + 1}/${articles.length} ${article.title}`);
    triageCards.push(
      await callOpenAiJson({
        model: triageModel,
        prompt: triagePrompt,
        input: article,
        effort: "low",
      }),
    );
  }
  logStage("Article triage complete", `${triageCards.length} cards`);

  const deepAnalysisCandidates = selectArticlesForDeepAnalysis(
    articles,
    triageCards,
    Math.min(maxArticles, deepAnalysisArticles),
  );
  logStage("Deep analysis selected", `${deepAnalysisCandidates.length} articles`);

  const analysisPrompt = await loadPrompt("article-analysis-bot.md");
  const analyses = [];
  for (const [index, article] of deepAnalysisCandidates.entries()) {
    logStage("Analyzing article", `${index + 1}/${deepAnalysisCandidates.length} ${article.title}`);
    analyses.push(
      await callOpenAiJson({
        model: analysisModel,
        prompt: analysisPrompt,
        input: article,
        effort: "low",
      }),
    );
  }
  logStage("Article analysis complete", `${analyses.length} cards`);

  const rankedAnalyses = collectDigestSignals(analyses);
  const digestWriterPrompt = await loadPrompt("daily-digest-writer.md");
  logStage("Generating digest markdown");
  const digestMarkdownRaw = await callOpenAiText({
    model: writerModel,
    prompt: digestWriterPrompt,
    input: rankedAnalyses,
    effort: writerEffort,
  });

  const digestMarkdown = ensureSignature(
    `${digestMarkdownRaw.trim()}${buildSourceReferencesSection(deepAnalysisCandidates)}`,
    signature,
  );

  const metadataPrompt = await loadPrompt("digest-metadata-bot.md");
  logStage("Generating digest metadata");
  const metadata = await callOpenAiJson({
    model: metadataModel,
    prompt: metadataPrompt,
    input: {
      digest_markdown: digestMarkdown,
      ranked_article_cards: rankedAnalyses,
      fallback_title: extractDigestTitle(digestMarkdown),
    },
    effort: "low",
  });

  if (!metadata.title) {
    metadata.title = extractDigestTitle(digestMarkdown) || `Daily Crypto Digest — ${runDate}`;
  }

  if (!metadata.slug) {
    metadata.slug = slugify(metadata.title);
  }

  const articleMap = new Map(articles.map((article) => [article.article_id, article]));
  const imageSourceArticles = rankedAnalyses
    .map((analysis) => articleMap.get(analysis.article_id))
    .filter(Boolean)
    .slice(0, 3);

  logStage("Selected image sources", `${imageSourceArticles.length} articles`);
  const images = await createDigestImages({
    sourceArticles: imageSourceArticles,
    slug: metadata.slug,
    runDate,
    metadata,
    rankedAnalyses,
  });

  const publishResult = await publishDigest({
    analyses: rankedAnalyses,
    args,
    digestMarkdown,
    images,
    metadata,
    runDate,
    selectedArticles: imageSourceArticles,
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        digestUrl: publishResult.digestUrl,
        slug: publishResult.slug,
        sourceArticles: deepAnalysisCandidates.length,
        publishedAt: publishResult.publishedAt,
      },
      null,
      2,
    ),
  );

  await writeRunResult("ok", {
    ok: true,
    digestUrl: publishResult.digestUrl,
    slug: publishResult.slug,
    sourceArticles: deepAnalysisCandidates.length,
    publishedAt: publishResult.publishedAt,
    runDate,
    skippedDeploy: args.skipDeploy,
    dryRun: args.dryRun,
  });
}

run().catch(async (error) => {
  const message = `Daily digest failed: ${error.message}`;
  console.error(message);

  await writeRunResult("error", {
    ok: false,
    error: error.message,
  }).catch((writeError) => {
    console.error(`Result file write failed: ${writeError.message}`);
  });

  try {
    if (!process.argv.includes("--skip-notify")) {
      await notifyAdminBot(message);
    }
  } catch (notifyError) {
    console.error(`Admin bot notification failed: ${notifyError.message}`);
  }

  process.exitCode = 1;
});
