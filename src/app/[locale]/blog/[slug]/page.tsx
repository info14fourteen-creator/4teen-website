import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BlogPostPageView,
  getBlogPostPageMetadata,
} from "@/app/blog/[slug]/page-view";
import {
  isSupportedSiteLocale,
} from "@/lib/site-locale";

type LocalizedBlogPostPageParams = {
  locale: string;
  slug: string;
};

export const dynamic = "force-dynamic";

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
