import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  WhitepaperVersionRouteView,
  getWhitepaperVersionMetadata,
} from "@/app/whitepaper/[version]/page-view";
import {
  isSupportedSiteLocale,
  supportedSiteLocales,
} from "@/lib/site-locale";
import {
  whitepaperVersionOrder,
  type WhitepaperVersionSlug,
} from "@/content/whitepaper-content";

type LocaleVersionParams = {
  locale: string;
  version: string;
};

function resolveLocalizedVersion(version: string): WhitepaperVersionSlug | null {
  return whitepaperVersionOrder.includes(version as WhitepaperVersionSlug)
    ? (version as WhitepaperVersionSlug)
    : null;
}

export function generateStaticParams() {
  return supportedSiteLocales.flatMap((locale) =>
    whitepaperVersionOrder.map((version) => ({ locale, version })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleVersionParams>;
}): Promise<Metadata> {
  const { locale, version } = await params;
  return isSupportedSiteLocale(locale)
    ? getWhitepaperVersionMetadata(version, locale)
    : {};
}

export default async function LocalizedWhitepaperVersionPage({
  params,
}: {
  params: Promise<LocaleVersionParams>;
}) {
  const { locale, version } = await params;
  const slug = resolveLocalizedVersion(version);

  if (!isSupportedSiteLocale(locale) || !slug) {
    notFound();
  }

  return <WhitepaperVersionRouteView locale={locale} slug={slug} />;
}
