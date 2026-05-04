import type { Metadata } from "next";

import { UnlockPageView, getUnlockPageMetadata } from "@/app/unlock/page-view";

export const metadata: Metadata = getUnlockPageMetadata();

export default async function UnlockPage() {
  return <UnlockPageView />;
}
