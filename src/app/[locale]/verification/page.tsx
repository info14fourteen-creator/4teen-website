import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  VerificationPageView,
  getVerificationPageMetadata,
} from "@/app/verification/page-view";
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
  return isSupportedSiteLocale(locale) ? getVerificationPageMetadata(locale) : {};
}

export default async function LocalizedVerificationPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return <VerificationPageView locale={locale} />;
}
