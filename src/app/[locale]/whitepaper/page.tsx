import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  WhitepaperRouteView,
  getWhitepaperMetadata,
} from "@/app/whitepaper/page-view";
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
  return isSupportedSiteLocale(locale) ? getWhitepaperMetadata(locale) : {};
}

export default async function LocalizedWhitepaperPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <WhitepaperRouteView locale={locale} />;
}
