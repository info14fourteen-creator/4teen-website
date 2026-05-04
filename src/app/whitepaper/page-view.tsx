import type { Metadata } from "next";

import { WhitepaperCurrentPage } from "@/components/site/whitepaper-version-page";
import { getCurrentWhitepaperDocument } from "@/content/whitepaper-content";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getWhitepaperMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const document = getCurrentWhitepaperDocument(locale);
  return buildPageMetadata({
    title: `4TEEN Whitepaper ${document.version}`,
    description: document.lead,
    locale,
    pathname: "/whitepaper",
  });
}

export const metadata: Metadata = getWhitepaperMetadata();

export function WhitepaperRouteView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  return <WhitepaperCurrentPage locale={locale} />;
}

export default function WhitepaperPage() {
  return <WhitepaperRouteView />;
}
