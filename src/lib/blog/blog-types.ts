export const blogPostStatuses = ["draft", "published", "archived"] as const;
export const blogStorageProviders = ["r2", "supabase-storage", "external"] as const;
export const blogLocales = ["en", "ru", "uz"] as const;
export const plannedBlogTranslationLocales = ["en", "ru", "uz", "ar"] as const;

export type BlogPostStatus = (typeof blogPostStatuses)[number];
export type BlogStorageProvider = (typeof blogStorageProviders)[number];
export type BlogLocale = (typeof blogLocales)[number];
export type PlannedBlogTranslationLocale =
  (typeof plannedBlogTranslationLocales)[number];

/**
 * Blog data model decision
 *
 * The public site already supports locale-prefixed routes, multilingual metadata,
 * and future RTL work. To keep SEO, hreflang, snapshots, and editorial workflows
 * clean, the target blog architecture should be:
 *
 * 1. one canonical post record with shared publication data
 * 2. many translation records keyed by locale
 *
 * We explicitly do NOT want separate unrelated posts per language for the same
 * article. That would make canonical URLs, sitemap generation, and translation
 * management harder than necessary.
 *
 * Current state:
 * - import bundle and DB rows are still flat `locale + slug` records
 * - that is fine for runtime today
 *
 * Target state:
 * - one post group / canonical post
 * - translations per locale (`en`, `ru`, `uz`, later `ar`)
 * - snapshot export should eventually emit this grouped shape
 */
export type BlogCanonicalPostRecord = {
  id: string;
  translationGroupKey: string;
  status: BlogPostStatus;
  publishedAt: string | null;
  authorSlug: string | null;
  categorySlug: string | null;
  tagSlugs: string[];
  coverAssetKey: string | null;
  sourceUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Fields that are intentionally locale-specific.
 *
 * Slug stays localizable so we can later support translated URLs while keeping
 * unique constraints predictable: unique(post_id, locale) and unique(locale, slug).
 */
export type BlogPostTranslationRecord = {
  postId: string;
  locale: PlannedBlogTranslationLocale;
  slug: string;
  title: string;
  excerpt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  contentMarkdown: string;
  coverAlt: string | null;
};

/**
 * Preferred snapshot shape for the public website.
 *
 * The site can still flatten this into per-locale routes, but publishing grouped
 * translations keeps hreflang, locale alternates, and future Arabic / RTL support
 * aligned around one logical article.
 */
export type BlogMultilingualSnapshotPost = {
  canonical: BlogCanonicalPostRecord;
  translations: Partial<Record<PlannedBlogTranslationLocale, BlogPostTranslationRecord>>;
  media: BlogMediaPlan[];
};

export type BlogMultilingualSnapshotBundle = {
  meta: {
    generatedAt: string;
    sourcePath: string;
    postCount: number;
    translationCount: number;
    mediaCount: number;
  };
  posts: BlogMultilingualSnapshotPost[];
  warnings: string[];
};

export type BlogImportRow = {
  legacyId: string | null;
  locale: BlogLocale;
  title: string;
  slug: string;
  excerpt: string | null;
  contentMarkdown: string;
  status: BlogPostStatus;
  publishedAt: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  sourceUrl: string | null;
  dateWasBackfilled: boolean;
  sourceRowIndex: number;
  sourceColumns: Record<string, string>;
};

export type BlogMediaPlan = {
  legacyId: string;
  sourceUrl: string;
  variant: "cover-16x9" | "social-9x16" | "thumb-1x1";
  sourceColumn: string;
  storageProvider: BlogStorageProvider;
  suggestedStorageKey: string;
  publicUrl: string | null;
  altText: string | null;
  linkedPostSlug: string;
  linkedPostLocale: BlogLocale;
};

export type BlogImportBundle = {
  meta: {
    generatedAt: string;
    sourcePath: string;
    rowCount: number;
    postCount: number;
    mediaCount: number;
  };
  posts: BlogImportRow[];
  media: BlogMediaPlan[];
  warnings: string[];
};
