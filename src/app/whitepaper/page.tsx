import type { Metadata } from "next";

import { WhitepaperArchivePage } from "@/components/site/whitepaper-version-page";
import { getWhitepaperArchivePageContent } from "@/content/whitepaper-content";
import { defaultSiteLocale } from "@/lib/site-locale";

const content = getWhitepaperArchivePageContent(defaultSiteLocale);

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function WhitepaperPage() {
  return <WhitepaperArchivePage />;
}
