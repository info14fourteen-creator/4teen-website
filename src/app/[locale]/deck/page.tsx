import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GenesisPageView, getGenesisPageMetadata } from "@/app/genesis/page-view";
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
  return isSupportedSiteLocale(locale) ? getGenesisPageMetadata(locale, "/deck") : {};
}

export default async function LocalizedDeckPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <GenesisPageView locale={locale} />;
}
