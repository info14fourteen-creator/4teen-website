import type { Metadata } from "next";

import { VerificationPageView, getVerificationPageMetadata } from "@/app/verification/page-view";

export const metadata: Metadata = getVerificationPageMetadata();

export default async function VerificationPage() {
  return <VerificationPageView />;
}
