import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import plan from "../../config/localization-plan.json" with { type: "json" };
import {
  hasPageExtractor,
  loadEnglishPageContent,
} from "./page-registry.mjs";
import { validateTranslatedStructure } from "./structure.mjs";

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
      model: process.env.LOCALIZATION_MODEL || "gpt-5.5",
      reasoning: { effort: "medium" },
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

async function main() {
  const { locale, page } = parseArguments();

  if (!locale || !plan.locales.includes(locale)) {
    throw new Error(`Unsupported target locale: ${locale || "(missing)"}`);
  }

  if (!page || !plan.pages.includes(page)) {
    throw new Error(`Unsupported page: ${page || "(missing)"}`);
  }

  if (!hasPageExtractor(page)) {
    throw new Error(
      `Page "${page}" is planned but its source extractor is not ready yet`,
    );
  }

  const targetPath = path.resolve("src/content/localization-generated.json");
  const existing = JSON.parse(await fs.readFile(targetPath, "utf8"));
  if (existing[locale]?.[page]) {
    process.stdout.write(`${locale}/${page}: already localized; skipping generation\n`);
    return;
  }

  const source = await loadEnglishPageContent(page);
  const translated = await requestTranslation({ locale, page, source });
  const validation = validateTranslatedStructure(source, translated);

  if (!validation.valid) {
    throw new Error(
      `Translation validation failed:\n${JSON.stringify(validation, null, 2)}`,
    );
  }

  existing[locale] ??= {};
  existing[locale][page] = translated;
  await fs.writeFile(
    targetPath,
    `${JSON.stringify(existing, null, 2)}\n`,
    "utf8",
  );

  process.stdout.write(
    `${locale}/${page}: wrote ${validation.translatedStringCount} translated strings to ${targetPath}\n`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exit(1);
});
