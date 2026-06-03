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
    title: "4TEEN | TRON Wallet Entry and Protocol Map",
    description:
      "Start with 4TEEN on TRON: direct buy, 14-day unlock, liquidity routing, ambassador rewards, airdrop state, wallet execution, whitepaper, verification, and investor deck.",
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
