/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from "react";

import { BlogCardFill } from "@/components/blog/blog-card-fill";
import { LoaderLink } from "@/components/site/loader-link";
import {
  getPublishedBlogPosts,
  isBlogDatabaseEnabled,
  type BlogPostSummary,
} from "@/lib/blog/blog-server";
import {
  defaultSiteLocale,
  localizeSiteHref,
  type SupportedSiteLocale,
} from "@/lib/site-locale";

const SOURCE_URL_PATTERN = /https?:\/\/[^\s)]+(?:\([^\s)]+\))?/g;

function formatBlogDate(date: string | null, locale: SupportedSiteLocale) {
  if (!date) {
    return "Archive";
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function estimateReadingLabel(text: string | null | undefined) {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 42));
  return `${minutes} min read`;
}

function buildTagHref(tag: string, locale: SupportedSiteLocale) {
  return `${localizeSiteHref("/blog", locale)}?tag=${encodeURIComponent(tag)}`;
}

function createBackdropStyle(imageUrl: string | null): CSSProperties | undefined {
  if (!imageUrl) {
    return undefined;
  }

  return {
    backgroundImage: `url("${imageUrl}")`,
  };
}

function normalizeSourceUrl(value: string | null | undefined) {
  if (!value?.startsWith("http")) {
    return null;
  }

  return value.replace(/[.,]+$/, "");
}

function getSourceHref(post: BlogPostSummary) {
  const directUrl = normalizeSourceUrl(post.sourceUrl);
  if (directUrl) {
    return directUrl;
  }

  const firstMatch = post.contentMarkdown?.match(SOURCE_URL_PATTERN)?.[0];
  return normalizeSourceUrl(firstMatch ?? null);
}

function formatSourceLabel(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).hostname;
  } catch {
    return value;
  }
}

function getArchiveRange(posts: BlogPostSummary[], locale: SupportedSiteLocale) {
  const datedPosts = posts.filter((post) => post.publishedAt);
  if (datedPosts.length < 2) {
    return `${posts.length} stories`;
  }

  const newest = formatBlogDate(datedPosts[0].publishedAt, locale);
  const oldest = formatBlogDate(datedPosts[datedPosts.length - 1].publishedAt, locale);
  return `${oldest} — ${newest}`;
}

function formatFeatureMetaLine(date: string | null, locale: SupportedSiteLocale) {
  return `${formatBlogDate(date, locale)} · Latest`;
}

function getKeywordCloud(posts: BlogPostSummary[], limit: number) {
  const keywords = new Map<string, { label: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.keywords) {
      const normalized = tag.trim().toLowerCase();
      if (!normalized) {
        continue;
      }

      const existing = keywords.get(normalized);
      if (existing) {
        existing.count += 1;
        continue;
      }

      keywords.set(normalized, {
        label: tag.trim(),
        count: 1,
      });
    }
  }

  return [...keywords.values()]
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
    .slice(0, limit)
    .map((item) => item.label);
}

function BlogTagCloud({
  keywords,
  locale,
  activeTag,
  compact = false,
}: {
  keywords: string[];
  locale: SupportedSiteLocale;
  activeTag?: string;
  compact?: boolean;
}) {
  if (keywords.length === 0) {
    return null;
  }

  const activeTagNormalized = activeTag?.trim().toLowerCase();

  return (
    <div className={`ft-blog-tag-cloud${compact ? " ft-blog-tag-cloud--compact" : ""}`}>
      {keywords.map((keyword) => {
        const isActive = activeTagNormalized === keyword.trim().toLowerCase();

        return (
          <LoaderLink
            key={keyword}
            className={`ft-blog-tag-cloud__item${isActive ? " is-active" : ""}`}
            href={buildTagHref(keyword, locale)}
          >
            {keyword}
          </LoaderLink>
        );
      })}
    </div>
  );
}

function BlogPostCard({
  locale,
  post,
  compact = false,
}: {
  locale: SupportedSiteLocale;
  post: BlogPostSummary;
  compact?: boolean;
}) {
  const href = localizeSiteHref(`/blog/${post.slug}`, locale);
  const cardClassName = compact ? "ft-blog-card ft-blog-card--compact" : "ft-blog-card";

  return (
    <LoaderLink
      aria-label={post.title}
      className={`ft-card ft-public-page__panel ${cardClassName}`}
      href={href}
    >
      <span
        aria-hidden="true"
        className="ft-blog-card__backdrop"
        style={createBackdropStyle(post.coverImageUrl)}
      />
      <span aria-hidden="true" className="ft-blog-card__shade" />

      <div className="ft-blog-card__inner">
        <div className="ft-blog-card__top">
          <span className="ft-blog-card__meta-line">{formatBlogDate(post.publishedAt, locale)}</span>
        </div>

        <BlogCardFill
          excerpt={post.seoDescription ?? post.excerpt ?? "Imported article."}
          excerptClassName="ft-text ft-blog-card__excerpt"
          readingLabel={estimateReadingLabel(
            post.contentMarkdown ?? post.seoDescription ?? post.excerpt,
          )}
          rootClassName="ft-blog-card__bottom"
          title={post.title}
          titleClassName="ft-subtitle ft-blog-card__title"
        />
      </div>
    </LoaderLink>
  );
}

function FeaturedBlogPost({
  locale,
  post,
  activeTag,
}: {
  locale: SupportedSiteLocale;
  post: BlogPostSummary;
  activeTag?: string;
}) {
  const href = localizeSiteHref(`/blog/${post.slug}`, locale);
  const sourceHref = getSourceHref(post);
  const sourceLabel = formatSourceLabel(sourceHref);

  return (
    <article className="ft-card ft-card--strong ft-blog-feature">
      <span
        aria-hidden="true"
        className="ft-blog-feature__backdrop"
        style={createBackdropStyle(post.coverImageUrl)}
      />
      <span aria-hidden="true" className="ft-blog-feature__shade" />

      <div className="ft-blog-feature__inner">
        <div className="ft-blog-feature__grid">
          <div className="ft-blog-feature__body">
            <div className="ft-blog-feature__top">
              <span className="ft-blog-card__meta-line">
                {formatFeatureMetaLine(post.publishedAt, locale)}
              </span>
            </div>

            <h2 className="ft-title-md ft-blog-feature__title">{post.title}</h2>
            <p className="ft-lead ft-blog-feature__lead">
              {post.excerpt ?? post.seoDescription ?? "Imported long-form article."}
            </p>

            <BlogTagCloud activeTag={activeTag} keywords={post.keywords} locale={locale} compact />
          </div>

          <aside className="ft-blog-feature__aside">
            <div className="ft-blog-feature__info">
              <div className="ft-blog-feature__info-top">
                <div className="ft-blog-feature__info-row">
                  <span className="ft-note">Published</span>
                  <strong>{formatBlogDate(post.publishedAt, locale)}</strong>
                </div>

                <div className="ft-blog-feature__info-row">
                  <span className="ft-note">Read time</span>
                  <strong>
                    {estimateReadingLabel(post.contentMarkdown ?? post.seoDescription ?? post.excerpt)}
                  </strong>
                </div>

                {sourceHref && sourceLabel ? (
                  <div className="ft-blog-feature__info-row">
                    <span className="ft-note">Source</span>
                    <a
                      className="ft-blog-feature__source"
                      href={sourceHref}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {sourceLabel}
                    </a>
                  </div>
                ) : null}

                {post.previewImageUrls.length ? (
                  <div className="ft-blog-feature__thumbs">
                    {post.previewImageUrls.map((imageUrl, index) => (
                      <img
                        key={`${imageUrl}-${index}`}
                        alt={post.coverImageAlt ?? post.title}
                        className="ft-blog-feature__thumb"
                        src={imageUrl}
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <LoaderLink className="ft-btn ft-btn--primary ft-blog-feature__cta" href={href}>
                Read article
              </LoaderLink>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function BlogKeywordCloud({
  keywords,
  locale,
  activeTag,
}: {
  keywords: string[];
  locale: SupportedSiteLocale;
  activeTag?: string;
}) {
  if (keywords.length === 0) {
    return null;
  }

  return (
    <article className="ft-card ft-card--plain ft-public-page__links-panel ft-blog-keywords">
      <div className="ft-stack ft-stack--sm">
        <div className="ft-stack ft-stack--xs">
          <p className="ft-overline">Keywords</p>
          <h2 className="ft-subtitle">Topic cloud</h2>
        </div>

        <BlogTagCloud activeTag={activeTag} keywords={keywords} locale={locale} />
      </div>
    </article>
  );
}

function BlogArchiveIntro({
  locale,
  posts,
}: {
  locale: SupportedSiteLocale;
  posts: BlogPostSummary[];
}) {
  return (
    <article className="ft-card ft-card--plain ft-public-page__links-panel ft-blog-archive__intro">
      <div className="ft-blog-archive__intro-grid">
        <div className="ft-stack ft-stack--xs">
          <p className="ft-overline">Blog</p>
          <h2 className="ft-subtitle ft-blog-archive__title">
            Stories, signals and market context
          </h2>
          <p className="ft-text ft-blog-archive__text">
            A calmer reading surface for the archive, with stronger imagery and cleaner
            cards across desktop and mobile.
          </p>
        </div>

        <div className="ft-blog-archive__stats">
          <span className="ft-blog-archive__count">{posts.length}</span>
          <span className="ft-note">Stories</span>
          <span className="ft-note">{getArchiveRange(posts, locale)}</span>
        </div>
      </div>
    </article>
  );
}

export async function BlogPostsPanel({
  locale = defaultSiteLocale,
  limit = 13,
  selectedTag,
}: {
  locale?: SupportedSiteLocale;
  limit?: number;
  selectedTag?: string;
}) {
  if (!isBlogDatabaseEnabled()) {
    return null;
  }

  const allPosts = await getPublishedBlogPosts({ locale, limit: 500 });
  const posts = await getPublishedBlogPosts({ locale, limit, tag: selectedTag });

  if (posts.length === 0) {
    return null;
  }

  const [featuredPost, ...archivePosts] = posts;
  const keywordCloud = getKeywordCloud(allPosts, 18);

  return (
    <section className="ft-stack ft-stack--lg ft-blog-archive">
      <FeaturedBlogPost activeTag={selectedTag} locale={locale} post={featuredPost} />
      <BlogKeywordCloud activeTag={selectedTag} keywords={keywordCloud} locale={locale} />

      <div className="ft-blog-archive__grid">
        {archivePosts.map((post, index) => (
          <BlogPostCard
            key={`${post.locale}:${post.slug}`}
            compact={index > 5}
            locale={locale}
            post={post}
          />
        ))}
      </div>

      <BlogArchiveIntro locale={locale} posts={allPosts} />
    </section>
  );
}
