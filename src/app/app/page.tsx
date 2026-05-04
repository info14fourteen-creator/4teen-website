import type { Metadata } from "next";

import { AppPageView, getAppPageMetadata } from "@/app/app/page-view";

export const metadata: Metadata = getAppPageMetadata();

export default function AppPage() {
  return <AppPageView />;
}
