import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppPageView, getAppPageMetadata } from "@/app/app/page-view";
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
  return isSupportedSiteLocale(locale) ? getAppPageMetadata(locale) : {};
}

export default async function LocalizedAppPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <AppPageView locale={locale} />;
}
