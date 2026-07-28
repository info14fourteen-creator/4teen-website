import fs from "node:fs/promises";

import plan from "../../config/localization-plan.json" with { type: "json" };
import { hasPageExtractor } from "./page-registry.mjs";

const generated = JSON.parse(
  await fs.readFile("src/content/localization-generated.json", "utf8"),
);

for (const locale of plan.locales) {
  for (const page of plan.pages) {
    if (hasPageExtractor(page) && !generated[locale]?.[page]) {
      process.stdout.write(JSON.stringify({ locale, page }));
      process.exit(0);
    }
  }
}

process.stdout.write(JSON.stringify({ locale: "", page: "" }));
