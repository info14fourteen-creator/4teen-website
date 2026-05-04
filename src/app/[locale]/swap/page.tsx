import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SwapPageView, getSwapPageMetadata } from "@/app/swap/page-view";
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
  return isSupportedSiteLocale(locale) ? getSwapPageMetadata(locale) : {};
}

export default async function LocalizedSwapPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <SwapPageView locale={locale} />;
}
