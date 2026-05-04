import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AirdropPageView, getAirdropPageMetadata } from "@/app/airdrop/page-view";
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
  return isSupportedSiteLocale(locale) ? getAirdropPageMetadata(locale) : {};
}

export default async function LocalizedAirdropPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <AirdropPageView locale={locale} />;
}
