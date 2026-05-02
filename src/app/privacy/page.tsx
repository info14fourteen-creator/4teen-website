import type { Metadata } from "next";

import { PublicPageShell } from "@/components/site/public-page-shell";
import { getPublicPagesContent } from "@/content/public-pages-content";
import { defaultSiteLocale } from "@/lib/site-locale";

const locale = defaultSiteLocale;
const content = getPublicPagesContent(locale).privacy;

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <PublicPageShell content={content} pageClassName="ft-privacy-page" />;
}
