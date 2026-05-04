import type { SupportedSiteLocale } from "@/lib/site-locale";

export type NavContent = {
  groups: {
    protocol: string;
    growth: string;
    proof: string;
    ecosystem: string;
  };
  links: {
    home: string;
    buy: string;
    unlock: string;
    liquidity: string;
    airdrop: string;
    ambassadors: string;
    whitepaper: string;
    verification: string;
    blog: string;
    swap: string;
    mobileApp: string;
  };
  shortLinks: {
    buy: string;
    unlock: string;
    liquidity: string;
    airdrop: string;
    earn: string;
    swap: string;
    app: string;
    home: string;
  };
  menuLinks: {
    buy: string;
    unlock: string;
    liquidity: string;
    swap: string;
    privacy: string;
    terms: string;
  };
};

const navContentEn: NavContent = {
  groups: {
    protocol: "Protocol",
    growth: "Growth",
    proof: "Proof",
    ecosystem: "Ecosystem",
  },
  links: {
    home: "Home",
    buy: "Buy",
    unlock: "Unlock",
    liquidity: "Liquidity",
    airdrop: "Airdrop",
    ambassadors: "Ambassadors",
    whitepaper: "Whitepaper",
    verification: "Verification",
    blog: "Blog",
    swap: "Swap",
    mobileApp: "Mobile App",
  },
  shortLinks: {
    buy: "Buy",
    unlock: "Unlock",
    liquidity: "Liquidity",
    airdrop: "Airdrop",
    earn: "Earn",
    swap: "Swap",
    app: "App",
    home: "Home",
  },
  menuLinks: {
    buy: "Direct Buy",
    unlock: "Unlock Timeline",
    liquidity: "Liquidity Controller",
    swap: "Swap Token",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
};

const navContentByLocale: Partial<Record<SupportedSiteLocale, NavContent>> = {
  en: navContentEn,
};

export function getNavContent(locale: SupportedSiteLocale) {
  return navContentByLocale[locale] ?? navContentEn;
}
