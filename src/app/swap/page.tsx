import type { Metadata } from "next";

import { SwapPageView, getSwapPageMetadata } from "@/app/swap/page-view";

export const metadata: Metadata = getSwapPageMetadata();

export default async function SwapPage() {
  return <SwapPageView />;
}
