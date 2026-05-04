import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_OUT_DIR = path.resolve("scripts/blog-migration/out/db-fixtures");

function printHelp() {
  console.log(`Usage:
  node scripts/blog-migration/emit-db-fixtures.mjs --input ./scripts/blog-migration/out/blog-import.bundle.json

Options:
  --input, -i   Path to normalized bundle JSON
  --out, -o     Output directory for DB fixture files
  --help, -h    Show this help
`);
}

function parseArgs(argv) {
  const args = {
    outDir: DEFAULT_OUT_DIR,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === "--help" || current === "-h") {
      args.help = true;
      continue;
    }

    if ((current === "--input" || current === "-i") && next) {
      args.input = path.resolve(next);
      index += 1;
      continue;
    }

    if ((current === "--out" || current === "-o") && next) {
      args.outDir = path.resolve(next);
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${current}`);
  }

  if (!args.help && !args.input) {
    throw new Error("Missing required --input argument");
  }

  return args;
}

function createMediaUsage(variant) {
  if (variant === "cover-16x9") {
    return "cover";
  }
  if (variant === "social-9x16") {
    return "social";
  }
  return "gallery";
}

function createVariantSortOrder(variant) {
  if (variant === "cover-16x9") {
    return 0;
  }
  if (variant === "social-9x16") {
    return 1;
  }
  return 2;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const bundle = JSON.parse(await readFile(args.input, "utf8"));
  const mediaAssets = bundle.media.map((item, index) => ({
    storageProvider: item.storageProvider,
    variant: item.variant,
    storageKey: item.suggestedStorageKey,
    publicUrl: item.publicUrl ?? item.sourceUrl,
    altText: item.altText,
    sourceUrl: item.sourceUrl,
    sourceColumn: item.sourceColumn,
    importOrder: index,
  }));

  const posts = bundle.posts.map((post) => {
    const mediaForPost = bundle.media.filter(
      (item) =>
        item.linkedPostSlug === post.slug && item.linkedPostLocale === post.locale,
    );
    const coverMedia = mediaForPost.find((item) => item.variant === "cover-16x9");

    return {
      legacySourceId: post.legacyId,
      locale: post.locale,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      contentMarkdown: post.contentMarkdown,
      status: post.status,
      publishedAt: post.publishedAt,
      dateWasBackfilled: post.dateWasBackfilled,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      sourceUrl: post.sourceUrl,
      coverStorageKey: coverMedia?.suggestedStorageKey ?? null,
      sourcePayload: {
        sourceRowIndex: post.sourceRowIndex,
        sourceColumns: post.sourceColumns,
      },
    };
  });

  const postMediaLinks = bundle.media.map((item, index) => ({
    postSlug: item.linkedPostSlug,
    postLocale: item.linkedPostLocale,
    mediaStorageKey: item.suggestedStorageKey,
    usage: createMediaUsage(item.variant),
    sortOrder: createVariantSortOrder(item.variant),
    variant: item.variant,
  }));

  await mkdir(args.outDir, { recursive: true });

  await writeFile(
    path.join(args.outDir, "media-assets.fixture.json"),
    `${JSON.stringify(mediaAssets, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(args.outDir, "blog-posts.fixture.json"),
    `${JSON.stringify(posts, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(args.outDir, "blog-post-media.fixture.json"),
    `${JSON.stringify(postMediaLinks, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `Wrote ${posts.length} post fixtures, ${mediaAssets.length} media fixtures, and ${postMediaLinks.length} relation fixtures.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
