import type { Metadata } from "next";

import { HomePageView, getHomePageMetadata } from "@/app/page-view";

export const metadata: Metadata = getHomePageMetadata();

export default function Home() {
  return <HomePageView />;
}
