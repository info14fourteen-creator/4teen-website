# Blog migration plan

Current state:

- The site already has `/blog` routes, but they still render static marketing content.
- The repository has active in-progress UI changes, so the migration groundwork is separated from the current page implementation.

Safe migration path:

1. Keep the current blog page untouched while preparing the data layer
2. Export the old Google Sheet to CSV
3. Normalize rows into stable JSON records
4. Move image files into owned storage instead of depending on old external links
5. Load posts and media into Postgres
6. Only then replace the blog page data source

Recommended storage split:

- `Postgres`: article data, slugs, SEO fields, publish dates, image references
- `R2`: original blog images and future uploads

Why not store images in Postgres:

- It makes backups and queries heavier
- It complicates CDN delivery
- It costs more than object storage at scale

Recommended image URL shape:

```txt
https://img.4teen.me/blog/2026/05/post-slug.jpg
```

What this repo now includes:

- `scripts/blog-migration/blog-schema.sql`
- `scripts/blog-migration/normalize-sheet.mjs`
- `scripts/blog-migration/README.md`
- `src/lib/blog/blog-types.ts`
