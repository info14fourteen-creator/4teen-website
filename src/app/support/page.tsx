import type { Metadata } from "next";

import { SupportPageView, getSupportPageMetadata } from "@/app/support/page-view";

export const metadata: Metadata = getSupportPageMetadata();

export default function SupportPage() {
  return <SupportPageView />;
}
