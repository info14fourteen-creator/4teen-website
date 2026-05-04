import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermsPageView, getTermsPageMetadata } from "@/app/terms/page-view";
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
  return isSupportedSiteLocale(locale) ? getTermsPageMetadata(locale) : {};
}

export default async function LocalizedTermsPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <TermsPageView locale={locale} />;
}
