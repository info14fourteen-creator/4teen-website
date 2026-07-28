import type { Metadata } from "next";

import { LegalTrustPanel } from "@/components/site/legal-trust-panel";
import { PublicPageShell } from "@/components/site/public-page-shell";
import { getPublicPagesContent } from "@/content/public-pages-content";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getPrivacyPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const content = getPublicPagesContent(locale).privacy;
  return buildPageMetadata({ ...content.metadata, locale, pathname: "/privacy" });
}

export const metadata: Metadata = getPrivacyPageMetadata();

export function PrivacyPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getPublicPagesContent(locale).privacy;
  return (
    <PublicPageShell content={content} pageClassName="ft-privacy-page">
      <LegalTrustPanel
        eyebrow="Operator and contact record"
        lead="Privacy promises should anchor to a real company, a real support route, and a visible trust reference instead of generic website boilerplate."
        title="Legal operator details for 4teen.me"
      />
    </PublicPageShell>
  );
}

export default function PrivacyPage() {
  return <PrivacyPageView />;
}
