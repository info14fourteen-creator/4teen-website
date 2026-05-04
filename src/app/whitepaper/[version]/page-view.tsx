import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WhitepaperVersionPage } from "@/components/site/whitepaper-version-page";
import {
  getWhitepaperPageContent,
  getWhitepaperVersionDocument,
  whitepaperVersionOrder,
  type WhitepaperVersionSlug,
} from "@/content/whitepaper-content";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

type Params = {
  version: string;
};

export { whitepaperVersionOrder };

export function resolveVersionSlug(version: string): WhitepaperVersionSlug | null {
  return whitepaperVersionOrder.includes(version as WhitepaperVersionSlug)
    ? (version as WhitepaperVersionSlug)
    : null;
}

export function generateStaticParams() {
  return whitepaperVersionOrder.map((slug) => ({ version: slug }));
}

export function getWhitepaperVersionMetadata(
  version: string,
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const slug = resolveVersionSlug(version);

  if (!slug) {
    return {};
  }

  const document = getWhitepaperVersionDocument(locale, slug);
  const page = getWhitepaperPageContent(locale);
  return buildPageMetadata({
    title: `${page.ui.whitepaperLabel} ${document.version}`,
    description: document.lead,
    locale,
    pathname: `/whitepaper/${slug}`,
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { version } = await params;
  return getWhitepaperVersionMetadata(version);
}

export async function WhitepaperVersionRouteView({
  slug,
  locale = defaultSiteLocale,
}: {
  slug: WhitepaperVersionSlug;
  locale?: SupportedSiteLocale;
}) {
  return <WhitepaperVersionPage locale={locale} slug={slug} />;
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
