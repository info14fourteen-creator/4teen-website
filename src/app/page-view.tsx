import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";

export function getHomePageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  return buildPageMetadata({
    title: "4TEEN",
    description:
      "4TEEN app hub on TRON for direct buy, unlock timeline, liquidity controller, ambassador cabinet, airdrop state, and protocol verification.",
    locale,
    pathname: "/",
  });
}

export const metadata: Metadata = getHomePageMetadata();

export function HomePageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  return <HomePage locale={locale} />;
}

export default function Home() {
  return <HomePageView />;
}
