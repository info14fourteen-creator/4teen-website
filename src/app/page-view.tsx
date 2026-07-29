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
    title: "4TEEN | TRON Wallet, Route Map, And Proof Stack",
    description:
      "Navigate the 4TEEN TRON route map, open the mobile wallet surface, and move between buy, unlock, liquidity, ambassadors, verification, and proof.",
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
