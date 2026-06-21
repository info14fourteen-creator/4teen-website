import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OnePagerPageView, getOnePagerPageMetadata } from "@/app/one-pager/page-view";
import { isSupportedSiteLocale } from "@/lib/site-locale";

type LocalePageParams = {
  locale: string;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<LocalePageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isSupportedSiteLocale(locale)
    ? getOnePagerPageMetadata(locale, "/one-pager")
    : {};
}

export default async function LocalizedOnePagerPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <OnePagerPageView locale={locale} />;
}
