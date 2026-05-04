create extension if not exists pgcrypto;

/*
Target multilingual blog model decision
--------------------------------------
For the public website we want one logical post plus many translations, not
independent duplicate posts per language.

Recommended long-term shape:

  blog_posts
    - one canonical record per article
    - shared fields: status, published_at, author/category/tags, cover asset,
      source url, timestamps

  blog_post_translations
    - one row per locale
    - locale-specific fields: slug, title, excerpt, seo_title,
      seo_description, content_markdown, cover_alt
    - unique(post_id, locale)
    - unique(locale, slug)

Current schema below is still the flat import/runtime schema, because it is what
the existing snapshot and DB import pipeline use today. The comment is here so
future migration work does not have to rediscover the architectural decision.
*/

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_provider text not null check (storage_provider in ('r2', 'supabase-storage', 'external')),
  variant text check (variant in ('cover-16x9', 'social-9x16', 'thumb-1x1')),
  storage_key text not null unique,
  public_url text not null,
  mime_type text,
  width integer,
  height integer,
  bytes bigint,
  alt_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  legacy_source_id text,
  locale text not null default 'en' check (locale in ('en', 'ru', 'uz')),
  slug text not null,
  title text not null,
  excerpt text,
  content_markdown text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  cover_media_id uuid references media_assets(id) on delete set null,
  seo_title text,
  seo_description text,
  source_url text,
  source_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, slug)
);

create unique index if not exists blog_posts_legacy_source_id_unique
  on blog_posts (legacy_source_id)
  where legacy_source_id is not null;

create index if not exists blog_posts_status_published_at_idx
  on blog_posts (status, published_at desc nulls last);

create table if not exists blog_post_media (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references blog_posts(id) on delete cascade,
  media_id uuid not null references media_assets(id) on delete cascade,
  usage text not null default 'inline' check (usage in ('cover', 'inline', 'gallery', 'social')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (post_id, media_id, usage)
);

create index if not exists blog_post_media_post_sort_idx
  on blog_post_media (post_id, usage, sort_order);
