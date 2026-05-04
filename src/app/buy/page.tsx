import type { Metadata } from "next";

import { BuyPageView, getBuyPageMetadata } from "@/app/buy/page-view";

export const metadata: Metadata = getBuyPageMetadata();

export default async function BuyPage() {
  return <BuyPageView />;
}
