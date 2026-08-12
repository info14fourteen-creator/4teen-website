import { readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const sourcePath = "src/content/localization-generated.json";
const outputPath = "src/content/localization-runtime.ts";

const source = await readFile(sourcePath, "utf8");
const translations = JSON.parse(source);

// These three complete locale packs remain in source control, but are too large
// for Cloudflare's 3 MiB free Worker bundle today. Their routes fall back to
// English until the final asset-backed locale loader lands.
for (const locale of ["hi", "ja", "zh-CN"]) {
  delete translations[locale];
}

const runtimeSource = JSON.stringify(translations);
const compressed = gzipSync(runtimeSource, { level: 9 }).toString("base64");

await writeFile(
  outputPath,
  [
    "// Generated from localization-generated.json during each production build.",
    "// Keep translations compressed so they do not consume the Worker bundle limit.",
    `export const compressedLocalization = ${JSON.stringify(compressed)};`,
    "",
  ].join("\n"),
);

process.stdout.write(
  `Packed localization runtime: ${Buffer.byteLength(source)} bytes -> ${Buffer.byteLength(compressed)} base64 bytes\n`,
);
