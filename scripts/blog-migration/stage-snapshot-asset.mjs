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
const lottieSourceDirectory = path.join(projectRoot, "src/assets/lottie");
const lottieDestinationDirectory = path.join(projectRoot, "public/lottie");
const socialLottieAssets = [
  "social-discord-hover.json",
  "social-facebook-hover.json",
  "social-github-hover.json",
  "social-instagram-hover.json",
  "social-telegram-hover.json",
  "social-threads-hover.json",
  "social-tiktok-hover.json",
  "social-whatsapp-hover.json",
  "social-x-hover.json",
  "social-youtube-hover.json",
];

await Promise.all([
  mkdir(destinationDirectory, { recursive: true }),
  mkdir(lottieDestinationDirectory, { recursive: true }),
]);
await copyFile(source, destination);
await Promise.all(
  socialLottieAssets.map((asset) =>
    copyFile(
      path.join(lottieSourceDirectory, asset),
      path.join(lottieDestinationDirectory, asset),
    ),
  ),
);

console.log(`Staged blog snapshot asset at ${path.relative(projectRoot, destination)}`);
