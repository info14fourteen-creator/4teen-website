import type { Metadata } from "next";

import { GenesisPageView, getGenesisPageMetadata } from "@/app/genesis/page-view";

export const dynamic = "force-dynamic";
export const metadata: Metadata = getGenesisPageMetadata();

export default function DeckPage() {
  return <GenesisPageView />;
}
