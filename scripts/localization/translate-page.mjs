import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import plan from "../../config/localization-plan.json" with { type: "json" };
import {
  hasPageExtractor,
  loadEnglishPageContent,
} from "./page-registry.mjs";
import { collectStringPaths, validateTranslatedStructure } from "./structure.mjs";

const localeNames = {
  ar: "Arabic",
  de: "German",
  es: "Spanish",
  fr: "French",
  hi: "Hindi",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  ru: "Russian",
  tr: "Turkish",
  uz: "Uzbek (Latin script)",
  "zh-CN": "Simplified Chinese",
};

function parseArguments() {
  const args = new Map();

  for (let index = 2; index < process.argv.length; index += 2) {
    args.set(process.argv[index], process.argv[index + 1]);
  }

  return {
    locale: args.get("--locale"),
    page: args.get("--page"),
  };
}

async function requestTranslation({ locale, page, source }) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.LOCALIZATION_MODEL || "gpt-4o-mini";
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      // Some page surfaces contain hundreds of independent copy strings.
      // Reserve enough room for a complete JSON object rather than accepting
      // a syntactically valid but truncated translation.
      max_output_tokens: 16000,
      // Translation is a constrained rewrite, not an analysis task. Minimal
      // reasoning keeps GPT-5 batches predictable without weakening structure checks.
      ...(model.startsWith("gpt-5") ? { reasoning: { effort: "minimal" } } : {}),
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                `Translate the complete 4TEEN website content object into ${localeNames[locale]}. ` +
                "Return only valid JSON with exactly the same object shape, keys, arrays, URLs, contract addresses, numbers, token symbols, email addresses, and placeholders. " +
                "Translate every reader-facing sentence naturally for a fintech and crypto audience. Do not translate brand names, code, routes, URLs, 4TEEN, TRON, TRX, USDT, DEX, DeFi, App Store, Google Play, GitHub, or TronScan. " +
                "Do not add claims, remove warnings, shorten paragraphs, or leave English prose behind. Uzbek must use Latin script. Arabic must read naturally right-to-left.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({ page, locale, content: source }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(
      payload?.error?.message || `OpenAI returned HTTP ${response.status}`,
    );
  }

  const outputText =
    payload.output_text ||
    payload.output
      ?.flatMap((item) => item.content || [])
      .find((item) => item.type === "output_text")?.text;
  if (!outputText) {
    throw new Error("OpenAI response did not contain output_text");
  }

  const parsed = JSON.parse(outputText);
  return parsed?.content ?? parsed;
}

function setValueAtPath(value, path, replacement) {
  const segments = path.split(/\.|\[|\]/).filter(Boolean);
  const last = segments.pop();
  const target = segments.reduce((current, segment) => current[segment], value);
  target[last] = replacement;
}

async function translateObjectInChunks({ locale, page, source }) {
  const entries = [...collectStringPaths(source).entries()];
  const chunkSize = 80;
  const translatedValues = new Map(entries);

  for (let index = 0; index < entries.length; index += chunkSize) {
    const chunk = Object.fromEntries(entries.slice(index, index + chunkSize));
    const chunkNumber = Math.floor(index / chunkSize) + 1;
    const translation = await requestTranslation({
      locale,
      page: `${page} part ${chunkNumber}`,
      source: chunk,
    });
    const validation = validateTranslatedStructure(chunk, translation);

    if (!validation.valid) {
      throw new Error(
        `Translation validation failed for ${locale}/${page} part ${chunkNumber}:\n${JSON.stringify(validation, null, 2)}`,
      );
    }

    for (const path of Object.keys(chunk)) {
      translatedValues.set(path, translation[path]);
    }
  }

  // Apply the completed flat map only after every response has passed
  // validation. Deepest paths go first so a future source shape containing
  // overlapping paths cannot discard a later translation chunk.
  const translated = JSON.parse(JSON.stringify(source));
  for (const [path, replacement] of [...translatedValues.entries()].sort(
    ([left], [right]) => right.length - left.length,
  )) {
    setValueAtPath(translated, path, replacement);
  }

  return translated;
}

async function main() {
  const { locale, page } = parseArguments();

  if (!locale || !plan.locales.includes(locale)) {
    throw new Error(`Unsupported target locale: ${locale || "(missing)"}`);
  }

  if (!page || (page !== "all" && !plan.pages.includes(page))) {
    throw new Error(`Unsupported page: ${page || "(missing)"}`);
  }

  const targetPath = path.resolve("src/content/localization-generated.json");
  const existing = JSON.parse(await fs.readFile(targetPath, "utf8"));
  const pages = page === "all" ? plan.pages : [page];
  let written = 0;

  for (const pageName of pages) {
    if (!hasPageExtractor(pageName)) {
      throw new Error(
        `Page "${pageName}" is planned but its source extractor is not ready yet`,
      );
    }

    if (existing[locale]?.[pageName]) {
      process.stdout.write(`${locale}/${pageName}: already localized; skipping generation\n`);
      continue;
    }

    const source = await loadEnglishPageContent(pageName);
    const translated = await translateObjectInChunks({ locale, page: pageName, source });
    const validation = validateTranslatedStructure(source, translated);

    if (!validation.valid) {
      throw new Error(
        `Translation validation failed for ${locale}/${pageName}:\n${JSON.stringify(validation, null, 2)}`,
      );
    }

    existing[locale] ??= {};
    existing[locale][pageName] = translated;
    written += 1;
    process.stdout.write(
      `${locale}/${pageName}: prepared ${validation.translatedStringCount} translated strings\n`,
    );
  }

  if (written === 0) {
    process.stdout.write(`${locale}/${page}: already localized; skipping generation\n`);
    return;
  }

  await fs.writeFile(
    targetPath,
    `${JSON.stringify(existing, null, 2)}\n`,
    "utf8",
  );

  process.stdout.write(
    `${locale}/${page}: wrote ${written} localization surface(s) to ${targetPath}\n`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exit(1);
});
