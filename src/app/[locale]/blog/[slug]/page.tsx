import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BlogPostPageView,
  getBlogPostPageMetadata,
} from "@/app/blog/[slug]/page-view";
import {
  defaultSiteLocale,
  isSupportedSiteLocale,
  supportedSiteLocales,
} from "@/lib/site-locale";
import { getPublishedBlogPostSlugs } from "@/lib/blog/blog-server";

type LocalizedBlogPostPageParams = {
  locale: string;
  slug: string;
};

export async function generateStaticParams(): Promise<LocalizedBlogPostPageParams[]> {
  const slugs = await getPublishedBlogPostSlugs({
    locale: defaultSiteLocale,
  });

  return supportedSiteLocales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocalizedBlogPostPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSupportedSiteLocale(locale)) {
    return {};
  }

  return getBlogPostPageMetadata({ slug, locale });
}

export default async function LocalizedBlogPostPage({
  params,
}: {
  params: Promise<LocalizedBlogPostPageParams>;
}) {
  const { locale, slug } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <BlogPostPageView locale={locale} slug={slug} />;
}
