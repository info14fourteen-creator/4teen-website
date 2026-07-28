import fs from "node:fs/promises";
import path from "node:path";

import plan from "../../config/localization-plan.json" with { type: "json" };
import {
  hasPageExtractor,
  loadEnglishPageContent,
} from "./page-registry.mjs";
import { validateTranslatedStructure } from "./structure.mjs";

async function main() {
  const rows = [];
  let failed = false;
  const generated = JSON.parse(
    await fs.readFile(
      path.resolve("src/content/localization-generated.json"),
      "utf8",
    ),
  );

  for (const locale of plan.locales) {
    for (const page of plan.pages) {
      if (!hasPageExtractor(page)) {
        rows.push({ locale, page, status: "extractor-pending" });
        continue;
      }

      try {
        const source = await loadEnglishPageContent(page);
        const translated = generated[locale]?.[page];
        if (!translated) {
          rows.push({ locale, page, status: "pending" });
          continue;
        }
        const validation = validateTranslatedStructure(
          source,
          translated,
        );
        rows.push({
          locale,
          page,
          status: validation.valid ? "validated" : "invalid",
          strings: validation.translatedStringCount,
        });
        failed ||= !validation.valid;
      } catch (error) {
        rows.push({
          locale,
          page,
          status: "invalid",
          error: error instanceof Error ? error.message : String(error),
        });
        failed = true;
      }
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    totals: rows.reduce((result, row) => {
      result[row.status] = (result[row.status] || 0) + 1;
      return result;
    }, {}),
    rows,
  };

  await fs.mkdir("artifacts/localization", { recursive: true });
  await fs.writeFile(
    "artifacts/localization/status.json",
    `${JSON.stringify(summary, null, 2)}\n`,
  );

  console.table(rows);
  if (failed) {
    process.exitCode = 1;
  }
}

main();
