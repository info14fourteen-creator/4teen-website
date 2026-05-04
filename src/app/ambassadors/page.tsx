import type { Metadata } from "next";

import { AmbassadorsPageView, getAmbassadorsPageMetadata } from "@/app/ambassadors/page-view";

export const metadata: Metadata = getAmbassadorsPageMetadata();

export default async function AmbassadorsPage() {
  return <AmbassadorsPageView />;
}
