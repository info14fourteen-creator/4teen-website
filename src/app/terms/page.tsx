import type { Metadata } from "next";

import { PublicPageShell } from "@/components/site/public-page-shell";
import { getPublicPagesContent } from "@/content/public-pages-content";
import { defaultSiteLocale } from "@/lib/site-locale";

const locale = defaultSiteLocale;
const content = getPublicPagesContent(locale).terms;

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <PublicPageShell content={content} pageClassName="ft-terms-page" />;
}
