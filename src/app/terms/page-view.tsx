import type { Metadata } from "next";

import { LegalTrustPanel } from "@/components/site/legal-trust-panel";
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
  return (
    <PublicPageShell content={content} pageClassName="ft-terms-page">
      <LegalTrustPanel
        eyebrow="Operator and governing identity"
        lead="Terms of use are stronger when the operator, support routes, and public company identity are explicit and easy to verify."
        title="Who stands behind the website and its public terms"
      />
    </PublicPageShell>
  );
}

export default function TermsPage() {
  return <TermsPageView />;
}
