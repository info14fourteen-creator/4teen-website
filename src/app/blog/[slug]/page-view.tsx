import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostPage } from "@/components/blog/blog-post-page";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from "@/lib/blog/blog-server";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export async function getBlogPostPageMetadata({
  slug,
  locale = defaultSiteLocale,
}: {
  slug: string;
  locale?: SupportedSiteLocale;
}): Promise<Metadata> {
  const post = await getPublishedBlogPostBySlug({ slug, locale });

  if (!post) {
    return buildPageMetadata({
      title: "Blog",
      description: "4TEEN blog article.",
      locale,
      pathname: `/blog/${slug}`,
    });
  }

  return buildPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? "4TEEN blog article.",
    locale,
    pathname: `/blog/${post.slug}`,
    imageUrl: post.coverImageUrl,
    imageUrls: post.previewImageUrls,
    socialImages: post.coverImageUrl
      ? [{ url: post.coverImageUrl, alt: post.coverImageAlt ?? post.title }]
      : undefined,
    keywords: post.keywords,
    openGraphType: "article",
    publishedTime: post.publishedAt,
  });
}

export async function BlogPostPageView({
  slug,
  locale = defaultSiteLocale,
}: {
  slug: string;
  locale?: SupportedSiteLocale;
}) {
  const post = await getPublishedBlogPostBySlug({ slug, locale });

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getPublishedBlogPosts({ locale, limit: 4 }))
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 3);

  return <BlogPostPage locale={locale} post={post} relatedPosts={relatedPosts} />;
}
