import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AmbassadorsPageView,
  getAmbassadorsPageMetadata,
} from "@/app/ambassadors/page-view";
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
  return isSupportedSiteLocale(locale) ? getAmbassadorsPageMetadata(locale) : {};
}

export default async function LocalizedAmbassadorsPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <AmbassadorsPageView locale={locale} />;
}
