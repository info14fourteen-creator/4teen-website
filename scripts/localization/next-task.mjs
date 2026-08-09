import fs from "node:fs/promises";

import plan from "../../config/localization-plan.json" with { type: "json" };

const generated = JSON.parse(
  await fs.readFile("src/content/localization-generated.json", "utf8"),
);

for (const locale of plan.locales) {
  for (const page of plan.pages) {
    if (!generated[locale]?.[page]) {
      process.stdout.write(JSON.stringify({ locale, page }));
      process.exit(0);
    }
  }
}

process.stdout.write(JSON.stringify({ locale: "", page: "" }));
