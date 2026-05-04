import type { Metadata } from "next";

import { TermsPageView, getTermsPageMetadata } from "@/app/terms/page-view";

export const metadata: Metadata = getTermsPageMetadata();

export default function TermsPage() {
  return <TermsPageView />;
}
