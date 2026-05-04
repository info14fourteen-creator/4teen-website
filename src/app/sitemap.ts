import type { MetadataRoute } from "next";

import {
  getPublishedBlogPostSlugs,
  getPublishedBlogPosts,
} from "@/lib/blog/blog-server";
import {
  defaultSiteLocale,
  localizeSiteHref,
  supportedSiteLocales,
} from "@/lib/site-locale";

const routes = [
  "",
  "/app",
  "/privacy",
  "/terms",
  "/support",
  "/buy",
  "/unlock",
  "/liquidity",
  "/airdrop",
  "/ambassadors",
  "/verification",
  "/whitepaper",
  "/whitepaper/v1-3",
  "/whitepaper/v1-2",
  "/whitepaper/v1-1",
  "/whitepaper/v1-0",
  "/blog",
  "/swap",
] as const;

function buildAlternates(pathname: string) {
  return {
    languages: Object.fromEntries(
      supportedSiteLocales.map((locale) => [
        locale,
        `https://4teen.me${localizeSiteHref(pathname, locale)}`,
      ]),
    ),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://4teen.me";
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
    alternates: buildAlternates(route),
  }));

  const blogPosts = await getPublishedBlogPosts({
    locale: defaultSiteLocale,
    limit: 1000,
  });
  const blogPostBySlug = new Map(blogPosts.map((post) => [post.slug, post]));
  const blogSlugs = await getPublishedBlogPostSlugs({
    locale: defaultSiteLocale,
  });

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => {
    const post = blogPostBySlug.get(slug);

    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: post?.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      images: post?.previewImageUrls?.length
        ? post.previewImageUrls
        : post?.coverImageUrl
          ? [post.coverImageUrl]
          : undefined,
      alternates: buildAlternates(`/blog/${slug}`),
    };
  });

  return [...staticEntries, ...blogEntries];
}
