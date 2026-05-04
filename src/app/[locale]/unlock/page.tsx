import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UnlockPageView, getUnlockPageMetadata } from "@/app/unlock/page-view";
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
  return isSupportedSiteLocale(locale) ? getUnlockPageMetadata(locale) : {};
}

export default async function LocalizedUnlockPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <UnlockPageView locale={locale} />;
}
