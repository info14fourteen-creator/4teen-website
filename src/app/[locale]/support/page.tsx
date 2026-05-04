import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportPageView, getSupportPageMetadata } from "@/app/support/page-view";
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
  return isSupportedSiteLocale(locale) ? getSupportPageMetadata(locale) : {};
}

export default async function LocalizedSupportPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <SupportPageView locale={locale} />;
}
