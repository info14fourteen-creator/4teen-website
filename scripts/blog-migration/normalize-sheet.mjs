import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_OUT_DIR = path.resolve("scripts/blog-migration/out");
const DEFAULT_BASE_IMAGE_PATH = "blog";
const DEFAULT_STORAGE_PROVIDER = "r2";
const SUPPORTED_LOCALES = new Set(["en", "ru", "uz"]);
const VALID_STATUSES = new Set(["draft", "published", "archived"]);

function printHelp() {
  console.log(`Usage:
  node scripts/blog-migration/normalize-sheet.mjs --input ./path/to/blog.csv

Options:
  --input, -i         Path to CSV export from Google Sheets
  --out, -o           Output directory for normalized JSON files
  --image-base-path   Prefix used for suggested image storage keys
  --public-base-url   Optional public image base URL, e.g. https://img.4teen.me
  --storage-provider  r2 | supabase-storage | external
  --help, -h          Show this help
`);
}

function parseArgs(argv) {
  const args = {
    outDir: DEFAULT_OUT_DIR,
    imageBasePath: DEFAULT_BASE_IMAGE_PATH,
    publicBaseUrl: null,
    storageProvider: DEFAULT_STORAGE_PROVIDER,
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

    if (current === "--image-base-path" && next) {
      args.imageBasePath = next.replace(/^\/+|\/+$/g, "") || DEFAULT_BASE_IMAGE_PATH;
      index += 1;
      continue;
    }

    if (current === "--public-base-url" && next) {
      args.publicBaseUrl = next.replace(/\/+$/g, "");
      index += 1;
      continue;
    }

    if (current === "--storage-provider" && next) {
      args.storageProvider = next;
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

function parseCsv(input) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      field = "";
      if (row.some((value) => value.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((value) => value.length > 0)) {
      rows.push(row);
    }
  }

  return rows;
}

function normalizeHeader(value) {
  return value.trim().toLowerCase().replace(/[\s.-]+/g, "_");
}

function cleanText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/\r\n/g, "\n").trim();
}

function nullableText(value) {
  const normalized = cleanText(value);
  return normalized.length > 0 ? normalized : null;
}

function pickFirst(source, keys) {
  for (const key of keys) {
    if (source[key]) {
      return source[key];
    }
  }
  return "";
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveLocale(value) {
  const normalized = cleanText(value).toLowerCase();
  if (SUPPORTED_LOCALES.has(normalized)) {
    return normalized;
  }
  return "en";
}

function resolveStatus(value, publishedAt) {
  const normalized = cleanText(value).toLowerCase();
  if (VALID_STATUSES.has(normalized)) {
    return normalized;
  }
  return publishedAt ? "published" : "published";
}

function ensureIsoDate(value) {
  const normalized = cleanText(value);
  if (!normalized) {
    return null;
  }

  if (/^\d{10,13}$/.test(normalized)) {
    const numeric = Number(normalized);
    const millis = normalized.length === 13 ? numeric : numeric * 1000;
    const parsed = new Date(millis);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }

  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

function guessFileExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const extension = path.extname(pathname).toLowerCase();
    return extension || ".jpg";
  } catch {
    return ".jpg";
  }
}

function buildSuggestedStorageKey({
  imageBasePath,
  publishedAt,
  slug,
  rowNumber,
  imageUrl,
  variant,
}) {
  const date = publishedAt ? new Date(publishedAt) : new Date();
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const extension = guessFileExtension(imageUrl);
  return `${imageBasePath}/${year}/${month}/${slug || `post-${rowNumber}`}-${variant}${extension}`;
}

function buildPublicUrl(publicBaseUrl, storageKey) {
  if (!publicBaseUrl) {
    return null;
  }
  return `${publicBaseUrl}/${storageKey}`;
}

function backfillMissingPublishedDates(posts, warnings) {
  const dayMs = 24 * 60 * 60 * 1000;
  const datedIndexes = posts
    .map((post, index) => ({ index, publishedAt: post.publishedAt }))
    .filter((item) => item.publishedAt);

  if (datedIndexes.length === 0) {
    let cursor = Date.now() - (posts.length - 1) * dayMs;
    posts.forEach((post) => {
      post.publishedAt = new Date(cursor).toISOString();
      post.dateWasBackfilled = true;
      cursor += dayMs;
    });
    warnings.push(
      `No source dates were present; assigned generated dates across ${posts.length} posts.`,
    );
    return;
  }

  const firstDatedIndex = datedIndexes[0].index;
  if (firstDatedIndex > 0) {
    const anchor = new Date(posts[firstDatedIndex].publishedAt).getTime();
    for (let offset = 1; offset <= firstDatedIndex; offset += 1) {
      const postIndex = firstDatedIndex - offset;
      posts[postIndex].publishedAt = new Date(anchor - offset * dayMs).toISOString();
      posts[postIndex].dateWasBackfilled = true;
    }
    warnings.push(
      `Backfilled ${firstDatedIndex} leading posts with daily timestamps before ${posts[firstDatedIndex].slug}.`,
    );
  }

  for (let pointer = 0; pointer < datedIndexes.length - 1; pointer += 1) {
    const current = datedIndexes[pointer];
    const next = datedIndexes[pointer + 1];
    const gap = next.index - current.index - 1;

    if (gap <= 0) {
      continue;
    }

    const startTime = new Date(posts[current.index].publishedAt).getTime();
    const endTime = new Date(posts[next.index].publishedAt).getTime();
    const step = (endTime - startTime) / (gap + 1);

    for (let offset = 1; offset <= gap; offset += 1) {
      const postIndex = current.index + offset;
      posts[postIndex].publishedAt = new Date(startTime + step * offset).toISOString();
      posts[postIndex].dateWasBackfilled = true;
    }
  }

  const lastDatedIndex = datedIndexes[datedIndexes.length - 1].index;
  if (lastDatedIndex < posts.length - 1) {
    const anchor = new Date(posts[lastDatedIndex].publishedAt).getTime();
    for (let offset = 1; lastDatedIndex + offset < posts.length; offset += 1) {
      const postIndex = lastDatedIndex + offset;
      posts[postIndex].publishedAt = new Date(anchor + offset * dayMs).toISOString();
      posts[postIndex].dateWasBackfilled = true;
    }
    warnings.push(
      `Backfilled ${posts.length - lastDatedIndex - 1} trailing posts with daily timestamps after ${posts[lastDatedIndex].slug}.`,
    );
  }
}

function createRowMap(headers, row) {
  const map = {};
  headers.forEach((header, index) => {
    map[header] = row[index] ?? "";
  });
  return map;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  if (!["r2", "supabase-storage", "external"].includes(args.storageProvider)) {
    throw new Error(`Unsupported storage provider: ${args.storageProvider}`);
  }

  const csvContent = await readFile(args.input, "utf8");
  const parsedRows = parseCsv(csvContent);

  if (parsedRows.length < 2) {
    throw new Error("CSV must include a header row and at least one data row");
  }

  const headers = parsedRows[0].map(normalizeHeader);
  const dataRows = parsedRows.slice(1);
  const posts = [];
  const media = [];
  const warnings = [];
  const seenPostKeys = new Set();

  dataRows.forEach((row, rowIndex) => {
    const sourceColumns = createRowMap(headers, row);
    const title = cleanText(
      pickFirst(sourceColumns, [
        "title",
        "post_title",
        "name",
        "headline",
        "page_title",
        "social_media_title",
      ]),
    );
    const body = cleanText(
      pickFirst(sourceColumns, [
        "content",
        "body",
        "article",
        "article_body",
        "markdown",
        "html_5_formated_text",
        "html_5_formatted_text",
      ]),
    );

    if (!title) {
      warnings.push(`Row ${rowIndex + 2}: skipped because title is empty`);
      return;
    }

    if (!body) {
      warnings.push(`Row ${rowIndex + 2}: skipped because article content is empty`);
      return;
    }

    const legacyId =
      nullableText(pickFirst(sourceColumns, ["id", "legacy_id", "post_id"])) ??
      `${rowIndex + 2}`;
    const locale = resolveLocale(pickFirst(sourceColumns, ["locale", "lang", "language"]));
    const publishedAt = ensureIsoDate(
      pickFirst(sourceColumns, ["published_at", "publish_date", "date", "created_at"]),
    );
    const slug =
      cleanText(pickFirst(sourceColumns, ["slug", "url_slug", "page_url"])) ||
      slugify(title);
    const status = resolveStatus(
      pickFirst(sourceColumns, ["status", "state"]),
      publishedAt,
    );
    const postKey = `${locale}:${slug}`;

    if (seenPostKeys.has(postKey)) {
      warnings.push(`Row ${rowIndex + 2}: skipped duplicate locale+slug ${postKey}`);
      return;
    }

    seenPostKeys.add(postKey);

    const post = {
      legacyId,
      locale,
      title,
      slug,
      excerpt: nullableText(
        pickFirst(sourceColumns, [
          "excerpt",
          "summary",
          "description",
          "page_description",
        ]),
      ),
      contentMarkdown: body,
      status,
      publishedAt,
      coverImageUrl: nullableText(
        pickFirst(sourceColumns, [
          "cover_image",
          "cover_image_url",
          "image",
          "image_url",
          "hero_image",
          "16x9_image",
        ]),
      ),
      coverImageAlt: nullableText(
        pickFirst(sourceColumns, [
          "cover_image_alt",
          "image_alt",
          "alt",
          "page_title",
          "social_media_title",
        ]),
      ),
      seoTitle: nullableText(
        pickFirst(sourceColumns, [
          "seo_title",
          "meta_title",
          "social_media_title",
          "page_title",
        ]),
      ),
      seoDescription: nullableText(
        pickFirst(sourceColumns, [
          "seo_description",
          "meta_description",
          "social_media_description",
          "page_description",
        ]),
      ),
      sourceUrl: nullableText(
        pickFirst(sourceColumns, ["source_url", "old_url", "url", "page_url"]),
      ),
      dateWasBackfilled: false,
      sourceRowIndex: rowIndex + 2,
      sourceColumns,
    };

    posts.push(post);

    const imageVariants = [
      {
        sourceUrl: nullableText(sourceColumns["16x9_image"]),
        variant: "cover-16x9",
        sourceColumn: "16x9_image",
      },
      {
        sourceUrl: nullableText(sourceColumns["9x16_image"]),
        variant: "social-9x16",
        sourceColumn: "9x16_image",
      },
      {
        sourceUrl: nullableText(sourceColumns["1x1_image"]),
        variant: "thumb-1x1",
        sourceColumn: "1x1_image",
      },
    ];

    for (const image of imageVariants) {
      if (!image.sourceUrl) {
        continue;
      }

      const suggestedStorageKey = buildSuggestedStorageKey({
        imageBasePath: args.imageBasePath,
        publishedAt: post.publishedAt,
        slug: post.slug,
        rowNumber: rowIndex + 2,
        imageUrl: image.sourceUrl,
        variant: image.variant,
      });

      media.push({
        legacyId: `${image.variant}:${legacyId}`,
        sourceUrl: image.sourceUrl,
        variant: image.variant,
        sourceColumn: image.sourceColumn,
        storageProvider: args.storageProvider,
        suggestedStorageKey,
        publicUrl: buildPublicUrl(args.publicBaseUrl, suggestedStorageKey),
        altText: post.coverImageAlt,
        linkedPostSlug: post.slug,
        linkedPostLocale: post.locale,
      });
    }
  });

  backfillMissingPublishedDates(posts, warnings);

  await mkdir(args.outDir, { recursive: true });

  const bundle = {
    meta: {
      generatedAt: new Date().toISOString(),
      sourcePath: args.input,
      rowCount: dataRows.length,
      postCount: posts.length,
      mediaCount: media.length,
    },
    posts,
    media,
    warnings,
  };

  await writeFile(
    path.join(args.outDir, "blog-import.bundle.json"),
    `${JSON.stringify(bundle, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(args.outDir, "blog-posts.json"),
    `${JSON.stringify(posts, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(args.outDir, "blog-media-plan.json"),
    `${JSON.stringify(media, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `Prepared ${posts.length} posts and ${media.length} media records from ${dataRows.length} sheet rows.`,
  );

  if (warnings.length > 0) {
    console.log(`Warnings: ${warnings.length}`);
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
