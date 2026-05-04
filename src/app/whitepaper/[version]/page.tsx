import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  WhitepaperVersionRouteView,
  getWhitepaperVersionMetadata,
  resolveVersionSlug,
  whitepaperVersionOrder,
} from "@/app/whitepaper/[version]/page-view";

type Params = {
  version: string;
};

export function generateStaticParams() {
  return whitepaperVersionOrder.map((slug) => ({ version: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { version } = await params;
  return getWhitepaperVersionMetadata(version);
}

export default async function WhitepaperVersionRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { version } = await params;
  const slug = resolveVersionSlug(version);

  if (!slug) {
    notFound();
  }

  return <WhitepaperVersionRouteView slug={slug} />;
}
