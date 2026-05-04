import type { Metadata } from "next";

import {
  BlogPostPageView,
  getBlogPostPageMetadata,
} from "@/app/blog/[slug]/page-view";
import { getPublishedBlogPostSlugs } from "@/lib/blog/blog-server";
import { defaultSiteLocale } from "@/lib/site-locale";

type BlogPostPageParams = {
  slug: string;
};

export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const slugs = await getPublishedBlogPostSlugs({
    locale: defaultSiteLocale,
  });

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getBlogPostPageMetadata({ slug });
}

export default async function BlogPostPageRoute({
  params,
}: {
  params: Promise<BlogPostPageParams>;
}) {
  const { slug } = await params;
  return <BlogPostPageView slug={slug} />;
}
