/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from "react";

import { BlogCardFill } from "@/components/blog/blog-card-fill";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import { BlogShareActions } from "@/components/blog/blog-share-actions";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import type { BlogPostDetail, BlogPostSummary } from "@/lib/blog/blog-server";
import {
  localizeSiteHref,
  type SupportedSiteLocale,
} from "@/lib/site-locale";

const SOURCE_URL_PATTERN = /https?:\/\/[^\s)]+(?:\([^\s)]+\))?/g;

function formatBlogDate(date: string | null, locale: SupportedSiteLocale) {
  if (!date) {
    return "Imported article";
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function estimateReadingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 220));
}

function normalizeSourceUrl(value: string | null | undefined) {
  if (!value?.startsWith("http")) {
    return null;
  }

  return value.replace(/[.,]+$/, "");
}

function normalizeComparableUrl(value: string | null | undefined) {
  const normalized = normalizeSourceUrl(value);
  if (!normalized) {
    return null;
  }

  return normalized.replace(/\/+$/, "");
}

function getSourceHref(post: BlogPostDetail) {
  const directUrl = normalizeSourceUrl(post.sourceUrl);
  if (directUrl) {
    return directUrl;
  }

  const firstMatch = (post.contentMarkdown ?? "").match(SOURCE_URL_PATTERN)?.[0];
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

function buildTagHref(tag: string, locale: SupportedSiteLocale) {
  return `${localizeSiteHref("/blog", locale)}?tag=${encodeURIComponent(tag)}`;
}

function stripTrailingDuplicateSource(content: string, sourceHref: string | null) {
  if (!content.trim() || !sourceHref) {
    return content;
  }

  const blocks = content
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return content;
  }

  const lastBlock = blocks.at(-1);
  if (!lastBlock) {
    return content;
  }

  const candidateUrl = normalizeSourceUrl(
    lastBlock
      .replace(/^source\s*[:\-]?\s*/i, "")
      .replace(/\s+/g, " ")
      .trim(),
  );

  if (
    !candidateUrl ||
    normalizeComparableUrl(candidateUrl) !== normalizeComparableUrl(sourceHref)
  ) {
    return content;
  }

  return blocks.slice(0, -1).join("\n\n");
}

function stripLeadingDuplicateTitle(content: string, title: string) {
  const blocks = content
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return content;
  }

  const firstBlock = blocks[0]
    .replace(/^#\s+/, "")
    .replace(/^##\s+/, "")
    .trim();

  if (firstBlock.toLowerCase() !== title.trim().toLowerCase()) {
    return content;
  }

  return blocks.slice(1).join("\n\n");
}

function createHeroBackdrop(imageUrl: string | null): CSSProperties | undefined {
  if (!imageUrl) {
    return undefined;
  }

  return {
    backgroundImage: `url("${imageUrl}")`,
  };
}

function BlogRelatedCard({
  locale,
  post,
}: {
  locale: SupportedSiteLocale;
  post: BlogPostSummary;
}) {
  return (
    <LoaderLink
      className="ft-card ft-card--plain ft-blog-related-card"
      href={localizeSiteHref(`/blog/${post.slug}`, locale)}
    >
      <div className="ft-stack ft-stack--sm">
        <div className="ft-blog-related-card__top">
          <span className="ft-blog-card__meta-line">{formatBlogDate(post.publishedAt, locale)}</span>
          {post.keywords[0] ? (
            <span className="ft-blog-card__topics">{post.keywords[0]}</span>
          ) : null}
        </div>
        <BlogCardFill
          excerpt={post.excerpt ?? post.seoDescription ?? "Imported article."}
          excerptClassName="ft-blog-related-card__excerpt"
          rootClassName="ft-stack ft-stack--xs ft-blog-related-card__body"
          title={post.title}
          titleClassName="ft-blog-related-card__title"
        />
      </div>
    </LoaderLink>
  );
}

export function BlogPostPage({
  locale,
  post,
  relatedPosts,
}: {
  locale: SupportedSiteLocale;
  post: BlogPostDetail;
  relatedPosts: BlogPostSummary[];
}) {
  const articleHref = localizeSiteHref("/blog", locale);
  const galleryMedia = [
    post.coverImageUrl
      ? {
          publicUrl: post.coverImageUrl,
          altText: post.coverImageAlt ?? post.title,
        }
      : null,
    ...post.media.map((item) => ({
      publicUrl: item.publicUrl,
      altText: item.altText ?? post.title,
    })),
  ]
    .filter((item): item is { publicUrl: string; altText: string } => Boolean(item))
    .filter(
      (item, index, items) =>
        items.findIndex((candidate) => candidate.publicUrl === item.publicUrl) === index,
    )
    .slice(0, 3);
  const sourceHref = getSourceHref(post);
  const titleCleanedContent = stripLeadingDuplicateTitle(post.contentMarkdown ?? "", post.title);
  const cleanedContent = stripTrailingDuplicateSource(titleCleanedContent, sourceHref);
  const readMinutes = estimateReadingMinutes(cleanedContent);
  const sourceLabel = formatSourceLabel(sourceHref);
  const keywords = post.keywords.slice(0, 8);
  const shareUrl = `https://4teen.me${localizeSiteHref(`/blog/${post.slug}`, locale)}`;
  const shareDescription =
    post.seoDescription ?? post.excerpt ?? "4TEEN blog article.";

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-public-page ft-blog-post-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl ft-blog-post-page__stack">
          <div className="ft-blog-post-page__breadcrumb">
            <LoaderLink className="ft-btn ft-btn--ghost w-fit" href={articleHref}>
              Back to blog
            </LoaderLink>
          </div>

          <article className="ft-card ft-card--strong ft-placeholder-hero ft-blog-post-hero">
            <span
              aria-hidden="true"
              className="ft-blog-post-hero__backdrop"
              style={createHeroBackdrop(post.coverImageUrl)}
            />
            <span aria-hidden="true" className="ft-blog-post-hero__shade" />

            <div className="ft-blog-post-hero__grid">
              <div className="ft-blog-post-hero__content">
                <div className="ft-stack ft-stack--md">
                  <p className="ft-blog-post-hero__meta-line">
                    {formatBlogDate(post.publishedAt, locale)} · {readMinutes} min read
                  </p>

                  <div className="ft-stack ft-stack--sm">
                    <h1 className="ft-title-lg ft-blog-post-hero__title">{post.title}</h1>
                    <p className="ft-lead ft-blog-post-hero__lead">
                      {post.excerpt ?? post.seoDescription ?? "Imported long-form article."}
                    </p>
                  </div>
                </div>
              </div>

              <aside className="ft-blog-post-info ft-blog-post-info--divider">
                <div className="ft-blog-post-info__rows">
                  <div className="ft-blog-post-info__row">
                    <span className="ft-note">Published</span>
                    <strong>{formatBlogDate(post.publishedAt, locale)}</strong>
                  </div>

                  <div className="ft-blog-post-info__row">
                    <span className="ft-note">Read time</span>
                    <strong>{readMinutes} min</strong>
                  </div>

                  {sourceHref && sourceLabel ? (
                    <div className="ft-blog-post-info__row">
                      <span className="ft-note">Source</span>
                      <a
                        className="ft-blog-post-info__link"
                        href={sourceHref}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {sourceLabel}
                      </a>
                    </div>
                  ) : null}

                  {keywords.length ? (
                    <div className="ft-blog-post-info__row">
                      <span className="ft-note">Keywords</span>
                      <div className="ft-blog-tag-cloud ft-blog-tag-cloud--compact ft-blog-post-info__tags">
                        {keywords.map((tag) => (
                          <LoaderLink
                            key={tag}
                            className="ft-blog-tag-cloud__item"
                            href={buildTagHref(tag, locale)}
                          >
                            {tag}
                          </LoaderLink>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </aside>
            </div>
          </article>

          <div className="ft-blog-post-layout">
            <article className="ft-card ft-public-page__panel ft-blog-post-article">
              <div className="ft-stack ft-stack--md">
                <BlogPostContent content={cleanedContent} />
              </div>
            </article>

            {galleryMedia.length ? (
              <aside className="ft-blog-post-rail">
                <div className="ft-card ft-card--plain ft-blog-post-rail__card">
                  <div className="ft-blog-post-gallery__stack">
                    {galleryMedia.map((media) => (
                      <img
                        key={media.publicUrl}
                        alt={media.altText}
                        className="ft-blog-post-gallery__image"
                        src={media.publicUrl}
                      />
                    ))}
                  </div>
                </div>
              </aside>
            ) : null}
          </div>

          <article className="ft-card ft-card--plain ft-public-page__links-panel ft-blog-post-share">
            <div className="ft-blog-post-share__inner">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">Share</p>
                <h2 className="ft-subtitle">Send this story</h2>
              </div>

              <BlogShareActions
                description={shareDescription}
                title={post.title}
                url={shareUrl}
              />
            </div>
          </article>

          {relatedPosts.length ? (
            <article className="ft-card ft-card--plain ft-public-page__links-panel ft-blog-related">
              <div className="ft-stack ft-stack--md">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">More</p>
                  <h2 className="ft-subtitle">More to read</h2>
                </div>

                <div className="ft-blog-related__grid">
                  {relatedPosts.map((relatedPost) => (
                    <BlogRelatedCard
                      key={`${relatedPost.locale}:${relatedPost.slug}`}
                      locale={locale}
                      post={relatedPost}
                    />
                  ))}
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </section>
    </main>
  );
}
