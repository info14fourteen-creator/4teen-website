import type { SupportedSiteLocale } from "@/lib/site-locale";
import { getGeneratedGlobalContent } from "../lib/generated-localization";

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

const navContentRu: NavContent = {
  groups: {
    protocol: "Протокол",
    growth: "Рост",
    proof: "Проверка",
    ecosystem: "Экосистема",
  },
  links: {
    home: "Главная",
    buy: "Купить",
    unlock: "Разблокировка",
    liquidity: "Ликвидность",
    airdrop: "Аирдроп",
    ambassadors: "Амбассадоры",
    whitepaper: "Вайтпейпер",
    verification: "Верификация",
    blog: "Блог",
    swap: "Своп",
    mobileApp: "Приложение",
  },
  shortLinks: {
    buy: "Купить",
    unlock: "Анлок",
    liquidity: "Ликвидность",
    airdrop: "Аирдроп",
    earn: "Доход",
    swap: "Своп",
    app: "Приложение",
    home: "Главная",
  },
  menuLinks: {
    buy: "Прямая покупка",
    unlock: "Таймлайн разблокировки",
    liquidity: "Контроллер ликвидности",
    swap: "Своп токена",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
  },
};

const navContentUz: NavContent = {
  groups: {
    protocol: "Protokol",
    growth: "O'sish",
    proof: "Tasdiq",
    ecosystem: "Ekotizim",
  },
  links: {
    home: "Bosh sahifa",
    buy: "Sotib olish",
    unlock: "Ochilish",
    liquidity: "Likvidlik",
    airdrop: "Airdrop",
    ambassadors: "Ambassadorlar",
    whitepaper: "Whitepaper",
    verification: "Verifikatsiya",
    blog: "Blog",
    swap: "Svop",
    mobileApp: "Ilova",
  },
  shortLinks: {
    buy: "Buy",
    unlock: "Unlock",
    liquidity: "Likvidlik",
    airdrop: "Airdrop",
    earn: "Daromad",
    swap: "Svop",
    app: "Ilova",
    home: "Bosh sahifa",
  },
  menuLinks: {
    buy: "To'g'ridan-to'g'ri xarid",
    unlock: "Unlock taymlayni",
    liquidity: "Likvidlik kontrolleri",
    swap: "Token svopi",
    privacy: "Maxfiylik siyosati",
    terms: "Foydalanish shartlari",
  },
};

const navContentByLocale: Partial<Record<SupportedSiteLocale, NavContent>> = {
  en: navContentEn,
  ru: navContentRu,
  uz: navContentUz,
};

export function getNavContent(locale: SupportedSiteLocale) {
  return getGeneratedGlobalContent(
    locale,
    "nav",
    navContentByLocale[locale] ?? navContentEn,
  );
}
