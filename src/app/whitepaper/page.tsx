import type { Metadata } from "next";

import {
  WhitepaperRouteView,
  getWhitepaperMetadata,
} from "@/app/whitepaper/page-view";

export const metadata: Metadata = getWhitepaperMetadata();

export default function WhitepaperPage() {
  return <WhitepaperRouteView />;
}
