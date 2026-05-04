# Blog migration

This folder is intentionally isolated from the current live site routes.

It prepares three pieces for a blog migration from Google Sheets:

1. A Postgres schema for posts and images: `blog-schema.sql`
2. A normalizer for exported sheet data: `normalize-sheet.mjs`
3. DB-ready fixture output: `emit-db-fixtures.mjs`
4. R2 uploader: `upload-media-to-r2.mjs`
5. Postgres importer: `import-db.mjs`

## Recommended source format

The easiest handoff is a `CSV` export from Google Sheets.

If the source sheet stays private, a read-only Google Sheets link is also fine for review, but the actual import workflow is still simpler and safer from CSV.

## Expected columns

The normalizer accepts flexible header names and tries common aliases automatically.

Useful columns:

- `title`
- `slug`
- `content` or `body`
- `excerpt`
- `image_url` or `cover_image_url`
- `image_alt`
- `published_at`
- `locale`
- `status`
- `seo_title`
- `seo_description`
- `legacy_id`
- `source_url`

## Run

```bash
node scripts/blog-migration/normalize-sheet.mjs \
  --input ./data/blog-export.csv \
  --public-base-url https://img.4teen.me
```

Optional flags:

- `--out ./tmp/blog-import`
- `--image-base-path blog`
- `--storage-provider r2`

For your current table, the script already understands:

- `Page URL`
- `Page Title`
- `Page Description`
- `Social Media Title`
- `Social Media Description`
- `Summary`
- `HTML 5 formated text`
- `Date`
- `16x9 Image`
- `9x16 Image`
- `1x1 Image`

## Output

- `blog-import.bundle.json`: full normalized result
- `blog-posts.json`: post records only
- `blog-media-plan.json`: image migration plan only

## Convert normalized output into DB fixtures

```bash
node scripts/blog-migration/emit-db-fixtures.mjs \
  --input ./scripts/blog-migration/out/blog-import.bundle.json
```

This produces:

- `media-assets.fixture.json`
- `blog-posts.fixture.json`
- `blog-post-media.fixture.json`

## Upload media into R2

```bash
pnpm blog:upload-media --input ./scripts/blog-migration/out/content-table/db-fixtures/media-assets.fixture.json
```

Required env:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`

## Import fixtures into Postgres

```bash
pnpm blog:import-db --fixtures ./scripts/blog-migration/out/content-table/db-fixtures --apply-schema
```

Required env:

- `DATABASE_URL`

Optional env:

- `PGSSL_DISABLE=1`
- `BLOG_CONTENT_SOURCE=database`

## Next step after normalization

1. Download source images from old URLs
2. Upload them into your storage bucket, ideally `R2`
3. Replace `publicUrl` values with the final bucket domain
4. Insert `media_assets`
5. Insert `blog_posts`
6. Switch `/blog` to read from Postgres

## Suggested runtime env later

These are not wired into the site yet. They are only the likely names for the next step:

- `DATABASE_URL`
- `BLOG_MEDIA_PUBLIC_BASE_URL`
- `R2_BUCKET_NAME`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ACCOUNT_ID`
