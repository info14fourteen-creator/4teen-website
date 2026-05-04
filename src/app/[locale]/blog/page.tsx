import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPageView, getBlogPageMetadata } from "@/app/blog/page-view";
import { isSupportedSiteLocale } from "@/lib/site-locale";

type LocalePageParams = {
  locale: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LocalePageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isSupportedSiteLocale(locale) ? await getBlogPageMetadata(locale) : {};
}

export default async function LocalizedBlogPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <BlogPageView locale={locale} />;
}
