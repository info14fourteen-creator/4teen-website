import type { Metadata } from "next";

import {
  defaultSiteLocale,
  localizeSiteHref,
  supportedSiteLocales,
  type SupportedSiteLocale,
} from "@/lib/site-locale";

const openGraphLocaleMap: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  uz: "uz_UZ",
  ar: "ar_SA",
};

type PageMetadataImage = {
  url: string;
  alt?: string;
};

function normalizeMetadataImages({
  imageUrl,
  imageUrls,
  socialImages,
}: {
  imageUrl?: string | null;
  imageUrls?: Array<string | null | undefined>;
  socialImages?: Array<PageMetadataImage | null | undefined>;
}) {
  const candidates: PageMetadataImage[] = [
    ...(socialImages ?? [])
      .filter((item): item is PageMetadataImage => Boolean(item?.url))
      .map((item) => ({
        url: item.url,
        alt: item.alt ?? undefined,
      })),
    ...(imageUrls ?? [])
      .filter((item): item is string => Boolean(item))
      .map((url) => ({ url })),
    ...(imageUrl ? [{ url: imageUrl }] : []),
  ];

  return candidates.filter(
    (item, index, items) =>
      items.findIndex((candidate) => candidate.url === item.url) === index,
  );
}

export function buildPageMetadata({
  title,
  description,
  pathname,
  locale = defaultSiteLocale,
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription,
  imageUrl,
  imageUrls,
  socialImages,
  keywords,
  openGraphType,
  publishedTime,
}: {
  title: string;
  description: string;
  pathname: string;
  locale?: SupportedSiteLocale;
  openGraphTitle?: string | null;
  openGraphDescription?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  imageUrl?: string | null;
  imageUrls?: Array<string | null | undefined>;
  socialImages?: Array<PageMetadataImage | null | undefined>;
  keywords?: string[] | null;
  openGraphType?: "website" | "article";
  publishedTime?: string | null;
}): Metadata {
  const canonical = localizeSiteHref(pathname, locale);
  const languages = Object.fromEntries(
    supportedSiteLocales.map((supportedLocale) => [
      supportedLocale,
      localizeSiteHref(pathname, supportedLocale),
    ]),
  );
  const images = normalizeMetadataImages({ imageUrl, imageUrls, socialImages });
  const normalizedKeywords = keywords?.filter(Boolean);
  const ogTitle = openGraphTitle || title;
  const ogDescription = openGraphDescription || description;
  const twTitle = twitterTitle || ogTitle;
  const twDescription = twitterDescription || ogDescription;

  return {
    title,
    description,
    keywords: normalizedKeywords?.length ? normalizedKeywords : undefined,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": localizeSiteHref(pathname, defaultSiteLocale),
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      images: images.length ? images : undefined,
      ...(openGraphType ? { type: openGraphType } : {}),
      ...(openGraphType === "article" && publishedTime
        ? { publishedTime }
        : {}),
      locale: openGraphLocaleMap[locale] ?? openGraphLocaleMap[defaultSiteLocale],
      alternateLocale: supportedSiteLocales
        .filter((supportedLocale) => supportedLocale !== locale)
        .map(
          (supportedLocale) =>
            openGraphLocaleMap[supportedLocale] ?? openGraphLocaleMap[defaultSiteLocale],
        ),
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title: twTitle,
      description: twDescription,
      images: images.length ? images.map((image) => image.url) : undefined,
    },
  };
}
