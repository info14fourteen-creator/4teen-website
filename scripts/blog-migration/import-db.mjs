import nextEnv from "@next/env";
import { readFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const { Pool } = pg;
const DEFAULT_FIXTURE_DIR = path.resolve("scripts/blog-migration/out/content-table/db-fixtures");
const DEFAULT_SCHEMA_PATH = path.resolve("scripts/blog-migration/blog-schema.sql");

function printHelp() {
  console.log(`Usage:
  node scripts/blog-migration/import-db.mjs --fixtures ./scripts/blog-migration/out/content-table/db-fixtures --apply-schema

Required env:
  DATABASE_URL

Options:
  --fixtures, -f     Directory with blog-posts.fixture.json and related files
  --schema           Path to SQL schema file
  --apply-schema     Apply the schema before importing data
  --help, -h         Show this help
`);
}

function parseArgs(argv) {
  const args = {
    fixturesDir: DEFAULT_FIXTURE_DIR,
    schemaPath: DEFAULT_SCHEMA_PATH,
    applySchema: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === "--help" || current === "-h") {
      args.help = true;
      continue;
    }

    if ((current === "--fixtures" || current === "-f") && next) {
      args.fixturesDir = path.resolve(next);
      index += 1;
      continue;
    }

    if (current === "--schema" && next) {
      args.schemaPath = path.resolve(next);
      index += 1;
      continue;
    }

    if (current === "--apply-schema") {
      args.applySchema = true;
      continue;
    }

    throw new Error(`Unknown argument: ${current}`);
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

async function readFixtures(fixturesDir) {
  const [media, posts, links] = await Promise.all([
    readFile(path.join(fixturesDir, "media-assets.fixture.json"), "utf8"),
    readFile(path.join(fixturesDir, "blog-posts.fixture.json"), "utf8"),
    readFile(path.join(fixturesDir, "blog-post-media.fixture.json"), "utf8"),
  ]);

  return {
    media: JSON.parse(media),
    posts: JSON.parse(posts),
    links: JSON.parse(links),
  };
}

async function stageFixtures(client, fixtures) {
  await client.query(`
    create temp table stage_media_assets (
      storage_provider text,
      variant text,
      storage_key text,
      public_url text,
      alt_text text,
      source_url text,
      source_column text,
      import_order integer
    ) on commit drop;

    create temp table stage_blog_posts (
      legacy_source_id text,
      locale text,
      slug text,
      title text,
      excerpt text,
      content_markdown text,
      status text,
      published_at timestamptz,
      date_was_backfilled boolean,
      seo_title text,
      seo_description text,
      source_url text,
      cover_storage_key text,
      source_payload jsonb
    ) on commit drop;

    create temp table stage_blog_post_media (
      post_slug text,
      post_locale text,
      media_storage_key text,
      usage text,
      sort_order integer,
      variant text
    ) on commit drop;
  `);

  await client.query(
    `
      insert into stage_media_assets (
        storage_provider,
        variant,
        storage_key,
        public_url,
        alt_text,
        source_url,
        source_column,
        import_order
      )
      select
        storage_provider,
        variant,
        storage_key,
        public_url,
        alt_text,
        source_url,
        source_column,
        import_order
      from jsonb_to_recordset($1::jsonb) as x(
        storage_provider text,
        variant text,
        storage_key text,
        public_url text,
        alt_text text,
        source_url text,
        source_column text,
        import_order integer
      )
    `,
    [
      JSON.stringify(
        fixtures.media.map((item) => ({
          storage_provider: item.storageProvider,
          variant: item.variant,
          storage_key: item.storageKey,
          public_url: item.publicUrl,
          alt_text: item.altText,
          source_url: item.sourceUrl,
          source_column: item.sourceColumn,
          import_order: item.importOrder,
        })),
      ),
    ],
  );

  await client.query(
    `
      insert into stage_blog_posts (
        legacy_source_id,
        locale,
        slug,
        title,
        excerpt,
        content_markdown,
        status,
        published_at,
        date_was_backfilled,
        seo_title,
        seo_description,
        source_url,
        cover_storage_key,
        source_payload
      )
      select
        legacy_source_id,
        locale,
        slug,
        title,
        excerpt,
        content_markdown,
        status,
        published_at,
        date_was_backfilled,
        seo_title,
        seo_description,
        source_url,
        cover_storage_key,
        source_payload
      from jsonb_to_recordset($1::jsonb) as x(
        legacy_source_id text,
        locale text,
        slug text,
        title text,
        excerpt text,
        content_markdown text,
        status text,
        published_at timestamptz,
        date_was_backfilled boolean,
        seo_title text,
        seo_description text,
        source_url text,
        cover_storage_key text,
        source_payload jsonb
      )
    `,
    [
      JSON.stringify(
        fixtures.posts.map((item) => ({
          legacy_source_id: item.legacySourceId,
          locale: item.locale,
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          content_markdown: item.contentMarkdown,
          status: item.status,
          published_at: item.publishedAt,
          date_was_backfilled: item.dateWasBackfilled,
          seo_title: item.seoTitle,
          seo_description: item.seoDescription,
          source_url: item.sourceUrl,
          cover_storage_key: item.coverStorageKey,
          source_payload: item.sourcePayload,
        })),
      ),
    ],
  );

  await client.query(
    `
      insert into stage_blog_post_media (
        post_slug,
        post_locale,
        media_storage_key,
        usage,
        sort_order,
        variant
      )
      select
        post_slug,
        post_locale,
        media_storage_key,
        usage,
        sort_order,
        variant
      from jsonb_to_recordset($1::jsonb) as x(
        post_slug text,
        post_locale text,
        media_storage_key text,
        usage text,
        sort_order integer,
        variant text
      )
    `,
    [
      JSON.stringify(
        fixtures.links.map((item) => ({
          post_slug: item.postSlug,
          post_locale: item.postLocale,
          media_storage_key: item.mediaStorageKey,
          usage: item.usage,
          sort_order: item.sortOrder,
          variant: item.variant,
        })),
      ),
    ],
  );
}

async function upsertMedia(client) {
  await client.query(`
    insert into media_assets (
      storage_provider,
      variant,
      storage_key,
      public_url,
      alt_text
    )
    select
      storage_provider,
      variant,
      storage_key,
      public_url,
      alt_text
    from stage_media_assets
    on conflict (storage_key) do update
    set
      storage_provider = excluded.storage_provider,
      variant = excluded.variant,
      public_url = excluded.public_url,
      alt_text = excluded.alt_text,
      updated_at = now()
  `);
}

async function upsertPosts(client) {
  await client.query(`
    insert into blog_posts (
      legacy_source_id,
      locale,
      slug,
      title,
      excerpt,
      content_markdown,
      status,
      published_at,
      cover_media_id,
      seo_title,
      seo_description,
      source_url,
      source_payload
    )
    select
      p.legacy_source_id,
      p.locale,
      p.slug,
      p.title,
      p.excerpt,
      p.content_markdown,
      p.status,
      p.published_at,
      m.id,
      p.seo_title,
      p.seo_description,
      p.source_url,
      p.source_payload
    from stage_blog_posts p
    left join media_assets m on m.storage_key = p.cover_storage_key
    on conflict (locale, slug) do update
    set
      legacy_source_id = excluded.legacy_source_id,
      title = excluded.title,
      excerpt = excluded.excerpt,
      content_markdown = excluded.content_markdown,
      status = excluded.status,
      published_at = excluded.published_at,
      cover_media_id = excluded.cover_media_id,
      seo_title = excluded.seo_title,
      seo_description = excluded.seo_description,
      source_url = excluded.source_url,
      source_payload = excluded.source_payload,
      updated_at = now()
  `);
}

async function upsertPostMedia(client) {
  await client.query(`
    insert into blog_post_media (
      post_id,
      media_id,
      usage,
      sort_order
    )
    select
      p.id,
      m.id,
      rel.usage,
      rel.sort_order
    from stage_blog_post_media rel
    inner join blog_posts p
      on p.locale = rel.post_locale
     and p.slug = rel.post_slug
    inner join media_assets m
      on m.storage_key = rel.media_storage_key
    on conflict (post_id, media_id, usage) do update
    set
      sort_order = excluded.sort_order
  `);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const databaseUrl = getRequiredEnv("DATABASE_URL");
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.PGSSL_DISABLE === "1" ? false : { rejectUnauthorized: false },
    max: 4,
  });

  const client = await pool.connect();

  try {
    const fixtures = await readFixtures(args.fixturesDir);

    await client.query("begin");

    if (args.applySchema) {
      const schemaSql = await readFile(args.schemaPath, "utf8");
      await client.query(schemaSql);
    }

    await stageFixtures(client, fixtures);
    await upsertMedia(client);
    await upsertPosts(client);
    await upsertPostMedia(client);

    await client.query("commit");

    console.log(
      `Imported ${fixtures.posts.length} posts, ${fixtures.media.length} media rows, and ${fixtures.links.length} relations into Postgres.`,
    );
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
