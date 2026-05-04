import type { Metadata } from "next";

import { PublicPageShell } from "@/components/site/public-page-shell";
import { getPublicPagesContent } from "@/content/public-pages-content";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getTermsPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const content = getPublicPagesContent(locale).terms;
  return buildPageMetadata({ ...content.metadata, locale, pathname: "/terms" });
}

export const metadata: Metadata = getTermsPageMetadata();

export function TermsPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getPublicPagesContent(locale).terms;
  return <PublicPageShell content={content} pageClassName="ft-terms-page" />;
}

export default function TermsPage() {
  return <TermsPageView />;
}
