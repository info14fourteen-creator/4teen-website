import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "../..");
const source = path.join(
  projectRoot,
  "scripts/blog-migration/out/content-table/blog-import.bundle.json",
);
const destinationDirectory = path.join(projectRoot, "public/blog-data");
const destination = path.join(destinationDirectory, "blog-import.bundle.json");

await mkdir(destinationDirectory, { recursive: true });
await copyFile(source, destination);

console.log(`Staged blog snapshot asset at ${path.relative(projectRoot, destination)}`);
