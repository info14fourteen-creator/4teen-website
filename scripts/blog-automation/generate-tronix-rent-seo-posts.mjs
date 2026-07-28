import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_MODEL = process.env.SEO_PARTNER_WRITER_MODEL || "gpt-5.5";
const DEFAULT_EFFORT = process.env.SEO_PARTNER_WRITER_EFFORT || "high";
const BASE_PUBLISHED_AT = new Date("2026-06-18T07:30:00.000Z");

const siteFacts = {
  brand: "TronixRent",
  primaryUrl: "https://tronix.rent/",
  summary:
    "TronixRent is a TRON Energy and Bandwidth rental service for USDT TRC20 transfers and smart contract actions.",
  facts: [
    "65,000 Energy + 350 Bandwidth is used for many active-recipient USDT TRC20 transfers.",
    "131,000 Energy + 350 Bandwidth is safer when the recipient is new or has no USDT history.",
    "Users should calculate a quote, create an order, and pay the exact TRX amount.",
    "The payment amount can include a small unique fraction so the watcher can match payment to order.",
    "The product exposes one shared public resource pool.",
    "The Smart Router checks live resources, price, reliability, package fit, and quote safety before showing one public route.",
    "Users should never share private keys, seed phrases, or wallet secrets.",
    "Completed blockchain resource deliveries are generally final and cannot be reversed by TronixRent.",
    "Users are responsible for checking receiver addresses and package choice before payment.",
  ],
  pages: [
    {
      url: "https://tronix.rent/rent-tron-energy",
      title: "Rent TRON Energy Before USDT TRC20 Transfer",
      description:
        "Rent TRON Energy before sending USDT TRC20. Calculate rental cost, compare it with possible TRX burn, and receive resources to your TRON address.",
    },
    {
      url: "https://tronix.rent/usdt-trc20-fees",
      title: "USDT TRC20 Fees: Why TRX Burns and When Energy Rental Helps",
      description:
        "Learn why USDT TRC20 transfers burn TRX, how TRON transaction fees work, and when renting Energy can reduce TRX burn.",
    },
    {
      url: "https://tronix.rent/no-trx-usdt-transfer",
      title: "Have USDT but No TRX? Swap USDT to TRX, Then Rent Energy",
      description:
        "Learn what to do when you have USDT on TRON but no TRX for fees. TronixRent lets you quote USDT to TRX, then rent Energy for the transfer.",
    },
    {
      url: "https://tronix.rent/out-of-energy-tron",
      title: "TRON OUT_OF_ENERGY: How to Fix USDT Transfer Errors",
      description:
        "Fix TRON OUT_OF_ENERGY and expensive USDT TRC20 transfer errors by renting the right Energy and Bandwidth package before sending.",
    },
    {
      url: "https://tronix.rent/tron-energy-api",
      title: "TRON Energy API for Wallets and Payment Tools",
      description:
        "Use a TRON Energy API and shared pool routing for wallets, dApps, and USDT TRC20 payment tools.",
    },
    {
      url: "https://tronix.rent/tron-energy-smart-router",
      title: "TRON Energy Smart Router",
      description:
        "Learn how the Smart Router checks available Energy, Bandwidth, price, reliability, and delivery safety before locking one simple rental quote.",
    },
    {
      url: "https://tronix.rent/tron-bandwidth-usdt-transfer",
      title: "TRON Bandwidth for USDT TRC20 Transfers",
      description:
        "Learn why TRON Bandwidth matters together with Energy for USDT TRC20 transfers.",
    },
    {
      url: "https://tronix.rent/65k-vs-131k-energy",
      title: "65k vs 131k TRON Energy for USDT TRC20 Transfers",
      description:
        "Compare 65k TRON Energy and 131k TRON Energy for USDT TRC20 transfers.",
    },
    {
      url: "https://tronix.rent/tronlink-usdt-fee",
      title: "TronLink USDT Fee Looks High? Check Energy First",
      description:
        "TronLink may show a high USDT TRC20 fee when Energy is missing. Compare TRX burn with Energy rental before sending.",
    },
  ],
};

const semanticCore = {
  clusters: [
    {
      name: "direct transactional",
      phrases: [
        "rent tron energy",
        "tron energy rental",
        "rent energy for usdt trc20",
        "buy tron energy for transfer",
        "tron energy for usdt transfer",
      ],
    },
    {
      name: "fee pain",
      phrases: [
        "usdt trc20 fees",
        "tron usdt transfer fee",
        "tronlink usdt fee",
        "why usdt trc20 burns trx",
        "save trx on usdt transfer",
      ],
    },
    {
      name: "rescue intent",
      phrases: [
        "no trx usdt transfer",
        "have usdt but no trx",
        "how to send usdt on tron without trx",
        "stuck usdt on tron",
        "usdt on tron but cannot send",
      ],
    },
    {
      name: "error-driven",
      phrases: [
        "out of energy tron",
        "tron out of energy fix",
        "usdt trc20 out of energy",
        "tron transfer failed out of energy",
        "how much energy for usdt tron",
      ],
    },
  ],
};

const articleBriefs = [
  {
    primaryKeyword: "rent tron energy",
    secondaryKeywords: [
      "tron energy rental",
      "rent energy for usdt trc20",
      "tron bandwidth for usdt transfer",
      "how much energy for usdt tron",
    ],
    sourceUrl: "https://tronix.rent/rent-tron-energy",
    workingTitle: "How to Rent TRON Energy Before a USDT TRC20 Transfer",
    angle:
      "Explain the clean pre-transfer workflow for users who want to avoid random TRX burn when sending USDT TRC20.",
    requiredLinks: [
      "https://tronix.rent/rent-tron-energy",
      "https://tronix.rent/usdt-trc20-fees",
      "https://tronix.rent/tron-bandwidth-usdt-transfer",
      "https://tronix.rent/tron-energy-smart-router",
    ],
  },
  {
    primaryKeyword: "usdt trc20 fees",
    secondaryKeywords: [
      "tron usdt transfer fee",
      "tronlink usdt fee",
      "save trx on usdt transfer",
      "tron bandwidth usdt",
    ],
    sourceUrl: "https://tronix.rent/usdt-trc20-fees",
    workingTitle: "USDT TRC20 Fees Explained: When Renting TRON Energy Beats Burning TRX",
    angle:
      "Break down why TRX burn spikes, how TronLink fee estimates can confuse users, and when Energy rental is the better route.",
    requiredLinks: [
      "https://tronix.rent/usdt-trc20-fees",
      "https://tronix.rent/tronlink-usdt-fee",
      "https://tronix.rent/tron-bandwidth-usdt-transfer",
      "https://tronix.rent/rent-tron-energy",
    ],
  },
  {
    primaryKeyword: "no trx usdt transfer",
    secondaryKeywords: [
      "have usdt but no trx",
      "stuck usdt on tron",
      "how to send usdt on tron without trx",
      "tron usdt rescue flow",
    ],
    sourceUrl: "https://tronix.rent/no-trx-usdt-transfer",
    workingTitle: "Have USDT but No TRX? A Practical Recovery Flow for TRON Wallets",
    angle:
      "Walk through the blocked-wallet scenario and show the safest way to get back to a send-ready state without guessing.",
    requiredLinks: [
      "https://tronix.rent/no-trx-usdt-transfer",
      "https://tronix.rent/rent-tron-energy",
      "https://tronix.rent/usdt-trc20-fees",
      "https://tronix.rent/tron-energy-smart-router",
    ],
  },
  {
    primaryKeyword: "out of energy tron",
    secondaryKeywords: [
      "tron out of energy fix",
      "usdt trc20 out of energy",
      "65k vs 131k energy",
      "tron bandwidth for usdt transfer",
    ],
    sourceUrl: "https://tronix.rent/out-of-energy-tron",
    workingTitle: "TRON OUT_OF_ENERGY: How to Fix Failed USDT Transfers and Choose the Right Package",
    angle:
      "Diagnose failed transfers, explain the Energy and Bandwidth relationship, and show when 65k or 131k makes sense.",
    requiredLinks: [
      "https://tronix.rent/out-of-energy-tron",
      "https://tronix.rent/65k-vs-131k-energy",
      "https://tronix.rent/tron-bandwidth-usdt-transfer",
      "https://tronix.rent/rent-tron-energy",
    ],
  },
];

function getEnv(name, fallback = "") {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : fallback;
}

function requireEnv(name) {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function normalizeValue(value) {
  return typeof value === "string" ? value.trim() : "";
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

  try {
    return JSON.parse(safe);
  } catch {}

  const fencedMatches = [...safe.matchAll(/```(?:json)?\s*([\s\S]*?)\s*```/gi)];
  for (const match of fencedMatches) {
    try {
      return JSON.parse(match[1].trim());
    } catch {}
  }

  const start = Math.min(
    ...["{", "["]
      .map((char) => safe.indexOf(char))
      .filter((index) => index >= 0),
  );
  if (Number.isFinite(start) && start >= 0) {
    const sliced = safe.slice(start);
    try {
      return JSON.parse(sliced);
    } catch {}
  }

  throw new Error("Could not parse OpenAI JSON response");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status) {
  return status === 408 || status === 409 || status === 429 || status >= 500;
}

async function fetchOpenAiJson(init, label = "OpenAI request") {
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", init);
      const payload = await response.json().catch(() => null);

      if (response.ok) {
        return payload;
      }

      const message = payload?.error?.message || `${label} failed: ${response.status}`;
      if (!isRetryableStatus(response.status) || attempt === 3) {
        throw new Error(message);
      }

      lastError = new Error(message);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === 3) {
        throw lastError;
      }
    }

    await sleep(1500 * attempt);
  }

  throw lastError || new Error(`${label} failed`);
}

function slugify(value) {
  return normalizeValue(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function normalizeKeywords(keywords) {
  const values = Array.isArray(keywords)
    ? keywords
    : typeof keywords === "string"
      ? keywords.split(",")
      : [];

  return [...new Set(values.map((item) => normalizeValue(item)).filter(Boolean))].slice(0, 10);
}

function validateArticle(article, brief) {
  const title = normalizeValue(article?.title) || brief.workingTitle;
  const excerpt = normalizeValue(article?.excerpt);
  const seoTitle = normalizeValue(article?.seoTitle) || title;
  const seoDescription = normalizeValue(article?.seoDescription) || excerpt;
  const coverImageAlt = normalizeValue(article?.coverImageAlt) || `${title} on TronixRent`;
  const sourceUrl = normalizeValue(article?.sourceUrl) || brief.sourceUrl;
  const contentMarkdown = normalizeValue(article?.contentMarkdown);
  const slug = slugify(article?.slug || title);
  const keywords = normalizeKeywords(article?.keywords);

  if (!slug || !title || !excerpt || !seoTitle || !seoDescription || !contentMarkdown) {
    throw new Error(`Generated article for "${brief.primaryKeyword}" is missing required fields`);
  }

  return {
    slug,
    title,
    excerpt,
    seoTitle,
    seoDescription,
    coverImageAlt,
    sourceUrl,
    keywords,
    contentMarkdown,
  };
}

async function generateArticle(prompt, brief, index) {
  const payload = await fetchOpenAiJson(
    {
      method: "POST",
      headers: buildOpenAiHeaders(),
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        reasoning: { effort: DEFAULT_EFFORT },
        input: [
          {
            role: "developer",
            content: [{ type: "input_text", text: prompt }],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify(
                  {
                    siteFacts,
                    semanticCore,
                    articleBrief: brief,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        ],
      }),
    },
    `Generate article ${index + 1}`,
  );

  return validateArticle(parseJsonResponse(extractResponseText(payload)), brief);
}

async function main() {
  const promptPath = path.join(__dirname, "prompts", "tronix-rent-seo-writer.md");
  const prompt = await fs.readFile(promptPath, "utf8");

  const posts = [];
  for (const [index, brief] of articleBriefs.entries()) {
    const generated = await generateArticle(prompt, brief, index);
    const publishedAt = new Date(BASE_PUBLISHED_AT.getTime() - index * 90 * 60 * 1000).toISOString();

    posts.push({
      locale: "en",
      slug: generated.slug,
      title: generated.title,
      excerpt: generated.excerpt,
      seoTitle: generated.seoTitle,
      seoDescription: generated.seoDescription,
      publishedAt,
      coverImageUrl: null,
      coverImageAlt: generated.coverImageAlt,
      contentMarkdown: generated.contentMarkdown,
      sourceUrl: generated.sourceUrl,
      sourceColumns: {
        keywords: generated.keywords.join(", "),
        "16x9_image": "",
        "9x16_image": "",
        "1x1_image": "",
      },
    });
  }

  process.stdout.write(`${JSON.stringify(posts, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
