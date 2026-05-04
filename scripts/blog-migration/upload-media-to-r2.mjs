import nextEnv from "@next/env";
import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import mime from "mime-types";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const DEFAULT_OUT_DIR = path.resolve("scripts/blog-migration/out/r2-upload");

function printHelp() {
  console.log(`Usage:
  node scripts/blog-migration/upload-media-to-r2.mjs --input ./scripts/blog-migration/out/content-table/db-fixtures/media-assets.fixture.json

Required env:
  R2_ACCOUNT_ID
  R2_ACCESS_KEY_ID
  R2_SECRET_ACCESS_KEY
  R2_BUCKET_NAME

Optional env:
  R2_ENDPOINT
  BLOG_MEDIA_PUBLIC_BASE_URL

Options:
  --input, -i        Path to media fixture JSON
  --out, -o          Output directory for the upload report
  --limit            Upload only the first N assets
  --overwrite        Re-upload files even if they already exist in R2
  --dry-run          Skip upload and print the planned operations
  --help, -h         Show this help
`);
}

function parseArgs(argv) {
  const args = {
    outDir: DEFAULT_OUT_DIR,
    overwrite: false,
    dryRun: false,
    limit: null,
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

    if (current === "--limit" && next) {
      args.limit = Number(next);
      index += 1;
      continue;
    }

    if (current === "--overwrite") {
      args.overwrite = true;
      continue;
    }

    if (current === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    throw new Error(`Unknown argument: ${current}`);
  }

  if (!args.help && !args.input) {
    throw new Error("Missing required --input argument");
  }

  return args;
}

function getRequiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function buildClient() {
  const accountId = getRequiredEnv("R2_ACCOUNT_ID");
  const accessKeyId = getRequiredEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = getRequiredEnv("R2_SECRET_ACCESS_KEY");
  const endpoint =
    process.env.R2_ENDPOINT?.trim() ||
    `https://${accountId}.r2.cloudflarestorage.com`;

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

async function objectExists(client, bucket, key) {
  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
    return true;
  } catch (error) {
    const statusCode = error?.$metadata?.httpStatusCode;
    if (statusCode === 404) {
      return false;
    }
    if (error?.name === "NotFound") {
      return false;
    }
    throw error;
  }
}

async function downloadAsset(sourceUrl) {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Download failed with HTTP ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const urlPath = new URL(sourceUrl).pathname;
  const contentTypeHeader = response.headers.get("content-type");
  const contentType =
    contentTypeHeader?.split(";")[0]?.trim() ||
    mime.lookup(urlPath) ||
    "application/octet-stream";

  return {
    body: Buffer.from(arrayBuffer),
    contentType,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const bucketName = getRequiredEnv("R2_BUCKET_NAME");
  const client = buildClient();
  const fixtures = JSON.parse(await readFile(args.input, "utf8"));
  const items = args.limit ? fixtures.slice(0, args.limit) : fixtures;
  const results = [];

  await mkdir(args.outDir, { recursive: true });

  for (const item of items) {
    const result = {
      storageKey: item.storageKey,
      sourceUrl: item.sourceUrl,
      publicUrl: item.publicUrl,
      variant: item.variant,
      status: "pending",
      error: null,
    };

    try {
      const exists = args.overwrite
        ? false
        : await objectExists(client, bucketName, item.storageKey);

      if (exists) {
        result.status = "skipped-existing";
        results.push(result);
        continue;
      }

      if (args.dryRun) {
        result.status = "dry-run";
        results.push(result);
        continue;
      }

      const { body, contentType } = await downloadAsset(item.sourceUrl);

      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: item.storageKey,
          Body: body,
          ContentType: contentType,
          CacheControl: "public, max-age=31536000, immutable",
          Metadata: {
            variant: item.variant,
            sourceurl: item.sourceUrl,
          },
        }),
      );

      result.status = "uploaded";
      results.push(result);
    } catch (error) {
      result.status = "failed";
      result.error = error instanceof Error ? error.message : String(error);
      results.push(result);
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    bucketName,
    inputPath: args.input,
    total: results.length,
    uploaded: results.filter((item) => item.status === "uploaded").length,
    skippedExisting: results.filter((item) => item.status === "skipped-existing")
      .length,
    failed: results.filter((item) => item.status === "failed").length,
    dryRun: results.filter((item) => item.status === "dry-run").length,
    results,
  };

  const reportPath = path.join(args.outDir, "r2-upload-report.json");
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(
    `R2 upload report written to ${reportPath}. Uploaded ${report.uploaded}, skipped ${report.skippedExisting}, failed ${report.failed}, dry-run ${report.dryRun}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
