import type { Metadata } from "next";

import { BlogPostsPanel } from "@/components/blog/blog-posts-panel";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { FourteenTopbar } from "@/components/site/topbar";
import { getPublicPagesContent } from "@/content/public-pages-content";
import { getPublishedBlogPosts } from "@/lib/blog/blog-server";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export async function getBlogPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Promise<Metadata> {
  const content = getPublicPagesContent(locale).blog;
  const posts = await getPublishedBlogPosts({ locale, limit: 12 });
  const featuredPost = posts[0];
  const keywordSet = new Set<string>();

  for (const post of posts) {
    for (const keyword of post.keywords) {
      if (keywordSet.size >= 12) {
        break;
      }

      keywordSet.add(keyword);
    }

    if (keywordSet.size >= 12) {
      break;
    }
  }

  return buildPageMetadata({
    ...content.metadata,
    locale,
    pathname: "/blog",
    imageUrl: featuredPost?.coverImageUrl,
    imageUrls: featuredPost?.previewImageUrls,
    socialImages: featuredPost?.coverImageUrl
      ? [
          {
            url: featuredPost.coverImageUrl,
            alt: featuredPost.coverImageAlt ?? featuredPost.title,
          },
        ]
      : undefined,
    keywords: [...keywordSet],
  });
}

export function BlogPageView({
  locale = defaultSiteLocale,
  selectedTag,
}: {
  locale?: SupportedSiteLocale;
  selectedTag?: string;
}) {
  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-public-page ft-blog-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl ft-blog-page__stack">
          <article className="ft-card ft-card--strong ft-placeholder-hero ft-blog-page__hero">
            <div className="ft-stack ft-stack--sm">
              <p className="ft-overline">Blog</p>
              <h1 className="ft-title-lg ft-blog-page__hero-title">
                Stories, signals and sharper market reading.
              </h1>
              <p className="ft-lead ft-blog-page__hero-lead">
                A cleaner editorial surface for the 4TEEN archive, built to read well on
                desktop and on the phone in one hand.
              </p>
            </div>
          </article>

          <BlogPostsPanel limit={13} locale={locale} selectedTag={selectedTag} />
        </div>
      </section>
    </main>
  );
}

export default function BlogPage() {
  return <BlogPageView />;
}
