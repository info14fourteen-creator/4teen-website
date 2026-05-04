import { cache } from "react";

import blogImportBundle from "../../../scripts/blog-migration/out/content-table/blog-import.bundle.json";
import { getBlogPool } from "@/lib/blog/blog-db";
import {
  defaultSiteLocale,
  resolveSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";

export type BlogPostMedia = {
  variant: "cover-16x9" | "social-9x16" | "thumb-1x1";
  usage: "cover" | "inline" | "gallery" | "social";
  publicUrl: string;
  altText: string | null;
  sortOrder: number;
};

export type BlogPostSummary = {
  locale: SupportedSiteLocale;
  slug: string;
  title: string;
  excerpt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  keywords: string[];
  sourceUrl: string | null;
  contentMarkdown: string | null;
  previewImageUrls: string[];
};

export type BlogPostDetail = BlogPostSummary & {
  sourceUrl: string | null;
  media: BlogPostMedia[];
};

type BlogPostRow = {
  locale: string;
  slug: string;
  title: string;
  excerpt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: Date | string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  keywords_text?: string | null;
  content_markdown?: string | null;
  source_url?: string | null;
  source_payload?: {
    sourceColumns?: Record<string, string>;
  } | null;
};

type BlogMediaRow = {
  variant: BlogPostMedia["variant"];
  usage: BlogPostMedia["usage"];
  public_url: string;
  alt_text: string | null;
  sort_order: number;
};

type BlogSnapshotBundle = {
  posts: BlogSnapshotPost[];
};

type BlogSnapshotPost = {
  locale: string;
  slug: string;
  title: string;
  excerpt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  contentMarkdown: string | null;
  sourceUrl: string | null;
  sourceColumns?: Record<string, string> | null;
};

type BlogContentSource = "snapshot" | "database" | "off";

function mapSummary(row: BlogPostRow): BlogPostSummary {
  return {
    locale: resolveSiteLocale(row.locale),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    publishedAt:
      row.published_at instanceof Date
        ? row.published_at.toISOString()
        : row.published_at,
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    keywords: parseKeywords(row.keywords_text),
    sourceUrl: row.source_url ?? null,
    contentMarkdown: row.content_markdown ?? null,
    previewImageUrls: getPreviewImageUrls(row),
  };
}

function parseKeywords(value: string | null | undefined) {
  if (!value) {
    return [];
  }

  return [...new Set(
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  )];
}

function normalizeKeyword(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function getSnapshotBundle() {
  return blogImportBundle as BlogSnapshotBundle;
}

function getPreviewImageUrls(row: BlogPostRow) {
  const sourceColumns = row.source_payload?.sourceColumns ?? {};
  const candidates = [
    row.cover_image_url,
    sourceColumns["1x1_image"],
    sourceColumns["9x16_image"],
    sourceColumns["16x9_image"],
  ].filter((value): value is string => Boolean(value));

  return [...new Set(candidates)].slice(0, 3);
}

function getPreviewImageUrlsFromSourceColumns(post: BlogSnapshotPost) {
  const sourceColumns = post.sourceColumns ?? {};
  const candidates = [
    post.coverImageUrl,
    sourceColumns["1x1_image"],
    sourceColumns["9x16_image"],
    sourceColumns["16x9_image"],
  ].filter((value): value is string => Boolean(value));

  return [...new Set(candidates)].slice(0, 3);
}

function mapSnapshotSummary(post: BlogSnapshotPost): BlogPostSummary {
  return {
    locale: resolveSiteLocale(post.locale),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    publishedAt: post.publishedAt,
    coverImageUrl: post.coverImageUrl,
    coverImageAlt: post.coverImageAlt,
    keywords: parseKeywords(post.sourceColumns?.keywords),
    sourceUrl: post.sourceUrl ?? null,
    contentMarkdown: post.contentMarkdown ?? null,
    previewImageUrls: getPreviewImageUrlsFromSourceColumns(post),
  };
}

function mapSnapshotMedia(post: BlogSnapshotPost): BlogPostMedia[] {
  const sourceColumns = post.sourceColumns ?? {};
  const candidates: Array<BlogPostMedia | null> = [
    sourceColumns["16x9_image"]
      ? {
          variant: "cover-16x9",
          usage: "cover",
          publicUrl: sourceColumns["16x9_image"],
          altText: post.coverImageAlt ?? post.title,
          sortOrder: 0,
        }
      : null,
    sourceColumns["9x16_image"]
      ? {
          variant: "social-9x16",
          usage: "social",
          publicUrl: sourceColumns["9x16_image"],
          altText: post.coverImageAlt ?? post.title,
          sortOrder: 1,
        }
      : null,
    sourceColumns["1x1_image"]
      ? {
          variant: "thumb-1x1",
          usage: "gallery",
          publicUrl: sourceColumns["1x1_image"],
          altText: post.coverImageAlt ?? post.title,
          sortOrder: 2,
        }
      : null,
  ];

  return candidates
    .filter((item): item is BlogPostMedia => Boolean(item))
    .filter(
      (item, index, items) =>
        items.findIndex((candidate) => candidate.publicUrl === item.publicUrl) === index,
    );
}

const BLOG_SNAPSHOT_POSTS = getSnapshotBundle()
  .posts.map(mapSnapshotSummary)
  .sort((left, right) => {
    const leftTime = left.publishedAt ? new Date(left.publishedAt).getTime() : 0;
    const rightTime = right.publishedAt ? new Date(right.publishedAt).getTime() : 0;
    return rightTime - leftTime;
  });

function resolveBlogContentSource(): BlogContentSource {
  const configuredSource = process.env.BLOG_CONTENT_SOURCE?.trim().toLowerCase();

  if (configuredSource === "database") {
    return "database";
  }

  if (configuredSource === "off") {
    return "off";
  }

  return "snapshot";
}

function hasBlogSnapshot() {
  return BLOG_SNAPSHOT_POSTS.length > 0;
}

function canUseDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function shouldTryDatabase() {
  return resolveBlogContentSource() === "database" && canUseDatabase();
}

function getSnapshotLocalizedBlogPosts(locale: SupportedSiteLocale) {
  const localizedPosts = BLOG_SNAPSHOT_POSTS.filter((post) => post.locale === locale);

  if (localizedPosts.length === 0 && locale !== defaultSiteLocale) {
    return BLOG_SNAPSHOT_POSTS.filter((post) => post.locale === defaultSiteLocale);
  }

  return localizedPosts;
}

function getSnapshotBlogPosts(options: {
  locale: SupportedSiteLocale;
  limit: number;
  tag?: string;
}) {
  const normalizedTag = normalizeKeyword(options.tag);
  const localizedPosts = getSnapshotLocalizedBlogPosts(options.locale);
  const filteredPosts = normalizedTag
    ? localizedPosts.filter((post) =>
        post.keywords.some((keyword) => normalizeKeyword(keyword) === normalizedTag),
      )
    : localizedPosts;

  return filteredPosts.slice(0, options.limit);
}

function getSnapshotBlogPostBySlug(options: {
  locale: SupportedSiteLocale;
  slug: string;
}): BlogPostDetail | null {
  const localizedPost = getSnapshotBundle().posts.find(
    (post) => resolveSiteLocale(post.locale) === options.locale && post.slug === options.slug,
  );

  const post =
    localizedPost ??
    (options.locale !== defaultSiteLocale
      ? getSnapshotBundle().posts.find(
          (candidate) =>
            resolveSiteLocale(candidate.locale) === defaultSiteLocale &&
            candidate.slug === options.slug,
        )
      : null);

  if (!post) {
    return null;
  }

  return {
    ...mapSnapshotSummary(post),
    media: mapSnapshotMedia(post),
  };
}

function mapMedia(row: BlogMediaRow): BlogPostMedia {
  return {
    variant: row.variant,
    usage: row.usage,
    publicUrl: row.public_url,
    altText: row.alt_text,
    sortOrder: row.sort_order,
  };
}

export function isBlogDatabaseEnabled() {
  if (resolveBlogContentSource() === "off") {
    return false;
  }

  return canUseDatabase() || hasBlogSnapshot();
}

export function isBlogContentEnabled() {
  return isBlogDatabaseEnabled();
}

export async function getPublishedBlogPostSlugs(options?: {
  locale?: SupportedSiteLocale;
}) {
  const locale = options?.locale ?? defaultSiteLocale;

  if (shouldTryDatabase()) {
    try {
      const pool = getBlogPool();
      const { rows } = await pool.query<{ slug: string }>(
        `
          select p.slug
          from blog_posts p
          where p.status = 'published' and p.locale = $1
          order by p.published_at desc nulls last, p.created_at desc
        `,
        [locale],
      );

      const slugs = rows.map((row) => row.slug).filter(Boolean);

      if (slugs.length > 0) {
        return slugs;
      }
    } catch (error) {
      console.error("Blog slug fetch failed, falling back to snapshot", error);
    }
  }

  return getSnapshotLocalizedBlogPosts(locale).map((post) => post.slug);
}

const getPublishedBlogPostsCached = cache(
  async (locale: SupportedSiteLocale, limit: number): Promise<BlogPostSummary[]> => {
    const pool = getBlogPool();
    const { rows } = await pool.query<BlogPostRow>(
      `
        select
          p.locale,
          p.slug,
          p.title,
          p.excerpt,
          p.seo_title,
          p.seo_description,
          p.published_at,
          p.content_markdown,
          p.source_url,
          p.source_payload,
          cover.public_url as cover_image_url,
          cover.alt_text as cover_image_alt,
          coalesce(
            p.source_payload -> 'sourceColumns' ->> 'keywords',
            p.source_payload ->> 'keywords'
          ) as keywords_text
        from blog_posts p
        left join media_assets cover on cover.id = p.cover_media_id
        where p.status = 'published' and p.locale = $1
        order by p.published_at desc nulls last, p.created_at desc
        limit $2
      `,
      [locale, limit],
    );

    return rows.map(mapSummary);
  },
);

const getPublishedBlogPostBySlugCached = cache(
  async (
    locale: SupportedSiteLocale,
    slug: string,
  ): Promise<BlogPostDetail | null> => {
    const pool = getBlogPool();
    const { rows } = await pool.query<BlogPostRow>(
      `
        select
          p.locale,
          p.slug,
          p.title,
          p.excerpt,
          p.seo_title,
          p.seo_description,
          p.published_at,
          p.content_markdown,
          p.source_url,
          p.source_payload,
          cover.public_url as cover_image_url,
          cover.alt_text as cover_image_alt,
          coalesce(
            p.source_payload -> 'sourceColumns' ->> 'keywords',
            p.source_payload ->> 'keywords'
          ) as keywords_text
        from blog_posts p
        left join media_assets cover on cover.id = p.cover_media_id
        where p.status = 'published' and p.locale = $1 and p.slug = $2
        limit 1
      `,
      [locale, slug],
    );

    const post = rows[0];
    if (!post) {
      return null;
    }

    const mediaResult = await pool.query<BlogMediaRow>(
      `
        select
          media.variant,
          rel.usage,
          media.public_url,
          media.alt_text,
          rel.sort_order
        from blog_post_media rel
        inner join blog_posts p on p.id = rel.post_id
        inner join media_assets media on media.id = rel.media_id
        where p.locale = $1 and p.slug = $2
        order by rel.sort_order asc, media.created_at asc
      `,
      [locale, slug],
    );

    return {
      ...mapSummary(post),
      contentMarkdown: post.content_markdown ?? "",
      sourceUrl: post.source_url ?? null,
      media: mediaResult.rows.map(mapMedia),
    };
  },
);

export async function getPublishedBlogPosts(options?: {
  locale?: SupportedSiteLocale;
  limit?: number;
  tag?: string;
}) {
  const locale = options?.locale ?? defaultSiteLocale;
  const limit = options?.limit ?? 12;
  const normalizedTag = normalizeKeyword(options?.tag);
  const fetchLimit = normalizedTag ? Math.max(limit * 8, 200) : limit;

  if (shouldTryDatabase()) {
    try {
      const rows = await getPublishedBlogPostsCached(locale, fetchLimit);
      const filteredRows = normalizedTag
        ? rows.filter((row) =>
            row.keywords.some((keyword) => normalizeKeyword(keyword) === normalizedTag),
          )
        : rows;

      if (filteredRows.length === 0 && locale !== defaultSiteLocale) {
        const fallbackRows = await getPublishedBlogPostsCached(defaultSiteLocale, fetchLimit);
        const fallbackFilteredRows = normalizedTag
          ? fallbackRows.filter((row) =>
              row.keywords.some((keyword) => normalizeKeyword(keyword) === normalizedTag),
            )
          : fallbackRows;
        return fallbackFilteredRows.slice(0, limit);
      }

      return filteredRows.slice(0, limit);
    } catch (error) {
      console.error("Blog database fetch failed, falling back to snapshot", error);
    }
  }

  return getSnapshotBlogPosts({ locale, limit, tag: options?.tag });
}

export async function getPublishedBlogPostBySlug(options: {
  locale?: SupportedSiteLocale;
  slug: string;
}) {
  const locale = options.locale ?? defaultSiteLocale;

  if (shouldTryDatabase()) {
    try {
      const row = await getPublishedBlogPostBySlugCached(locale, options.slug);

      if (!row && locale !== defaultSiteLocale) {
        return getPublishedBlogPostBySlugCached(defaultSiteLocale, options.slug);
      }

      return row;
    } catch (error) {
      console.error("Blog database detail fetch failed, falling back to snapshot", error);
    }
  }

  return getSnapshotBlogPostBySlug({ locale, slug: options.slug });
}
