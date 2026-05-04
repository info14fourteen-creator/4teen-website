import type { Metadata } from "next";

import { AirdropPageView, getAirdropPageMetadata } from "@/app/airdrop/page-view";

export const metadata: Metadata = getAirdropPageMetadata();

export default function AirdropPage() {
  return <AirdropPageView />;
}
