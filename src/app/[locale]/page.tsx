import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HomePageView, getHomePageMetadata } from "@/app/page-view";
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
  return isSupportedSiteLocale(locale) ? getHomePageMetadata(locale) : {};
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <HomePageView locale={locale} />;
}
