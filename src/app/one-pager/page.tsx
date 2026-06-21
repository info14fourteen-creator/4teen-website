import type { Metadata } from "next";

import { OnePagerPageView, getOnePagerPageMetadata } from "@/app/one-pager/page-view";

export const dynamic = "force-dynamic";
export const metadata: Metadata = getOnePagerPageMetadata();

export default function OnePagerPage() {
  return <OnePagerPageView />;
}
