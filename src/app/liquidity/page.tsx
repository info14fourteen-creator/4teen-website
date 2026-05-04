import type { Metadata } from "next";

import { LiquidityPageView, getLiquidityPageMetadata } from "@/app/liquidity/page-view";

export const metadata: Metadata = getLiquidityPageMetadata();

export default async function LiquidityPage() {
  return <LiquidityPageView />;
}
