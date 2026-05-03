import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WhitepaperVersionPage } from "@/components/site/whitepaper-version-page";
import {
  getWhitepaperVersionDocument,
  whitepaperVersionOrder,
  type WhitepaperVersionSlug,
} from "@/content/whitepaper-content";
import { defaultSiteLocale } from "@/lib/site-locale";

type Params = {
  version: string;
};

function resolveVersionSlug(version: string): WhitepaperVersionSlug | null {
  return whitepaperVersionOrder.includes(version as WhitepaperVersionSlug)
    ? (version as WhitepaperVersionSlug)
    : null;
}

export function generateStaticParams() {
  return whitepaperVersionOrder.map((slug) => ({ version: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { version } = await params;
  const slug = resolveVersionSlug(version);

  if (!slug) {
    return {};
  }

  const document = getWhitepaperVersionDocument(defaultSiteLocale, slug);

  return {
    title: `Whitepaper ${document.version}`,
    description: document.lead,
  };
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

  return <WhitepaperVersionPage slug={slug} />;
}
