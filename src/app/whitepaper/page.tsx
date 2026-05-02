import type { Metadata } from "next";

import { WhitepaperVersionPage } from "@/components/site/whitepaper-version-page";
import { getWhitepaperVersionDocument } from "@/content/whitepaper-content";
import { defaultSiteLocale } from "@/lib/site-locale";

const document = getWhitepaperVersionDocument(defaultSiteLocale, "v1-3");

export const metadata: Metadata = {
  title: `Whitepaper ${document.version}`,
  description: document.lead,
};

export default function WhitepaperPage() {
  return <WhitepaperVersionPage slug="v1-3" />;
}
