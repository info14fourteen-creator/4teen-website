import type { Metadata } from "next";

import { PrivacyPageView, getPrivacyPageMetadata } from "@/app/privacy/page-view";

export const metadata: Metadata = getPrivacyPageMetadata();

export default function PrivacyPage() {
  return <PrivacyPageView />;
}
