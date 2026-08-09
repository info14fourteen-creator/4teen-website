import type { SupportedSiteLocale } from "@/lib/site-locale";
import { getGeneratedGlobalContent } from "../lib/generated-localization";

export type ChromeContent = {
  common: {
    copy: string;
    copied: string;
    failed: string;
    close: string;
    qrCode: string;
  };
  taglines: string[];
  header: {
    home: string;
    getApp: string;
    primaryNavAria: string;
  };
  market: {
    loading: string;
    unavailable: string;
    liveAria: string;
  };
  refresh: {
    idle: string;
    busy: string;
    aria: string;
  };
  mobileSearch: {
    ariaLabel: string;
    placeholder: string;
    eyebrow: string;
    title: string;
    dialogAria: string;
    route: string;
    external: string;
    empty: string;
  };
  desktopSearch: {
    prompts: string[];
    ariaLabel: string;
    actionAria: string;
    eyebrow: string;
    title: string;
    dialogAria: string;
    closeAria: string;
    resultsSuffix: string;
    noResultsYet: string;
    pressEnter: string;
    topMatch: string;
    route: string;
    external: string;
    empty: string;
  };
  locale: {
    eyebrow: string;
    title: string;
    active: string;
    soon: string;
  };
  mobileMenu: {
    coreSurfaces: string;
    docsAndRoutes: string;
    closeOpenPanelAria: string;
  };
  mobileDock: {
    menu: string;
    close: string;
    openMenuAria: string;
    closeMenuAria: string;
    openHomeAria: string;
    openSearchAria: string;
    openLanguageAria: string;
  };
  footer: {
    protocol: string;
    ecosystem: string;
    legal: string;
    privacy: string;
    terms: string;
    support: string;
    investorDeck: string;
    onePager: string;
    officialChannels: string;
    brandText: string;
    getApp: string;
    copyright: string;
    officialWebsite: string;
  };
};

const chromeContentEn: ChromeContent = {
  common: {
    copy: "Copy",
    copied: "Copied",
    failed: "Failed",
    close: "Close",
    qrCode: "QR code",
  },
  taglines: [
    "Early Entry. Higher Exit.",
    "Winners Don't Wait.",
    "Turn 14 Days Into Profit.",
    "Move Early. Win Early.",
  ],
  header: {
    home: "Home",
    getApp: "Get App",
    primaryNavAria: "Primary site navigation",
  },
  market: {
    loading: "Loading price",
    unavailable: "Price unavailable",
    liveAria: "Live market price",
  },
  refresh: {
    idle: "Refresh data",
    busy: "Refreshing",
    aria: "Refresh live data snapshot",
  },
  mobileSearch: {
    ariaLabel: "Search routes, contracts, and docs",
    placeholder: "Search routes, contracts, docs...",
    eyebrow: "Quick Search",
    title: "Pages, contracts, and proof surfaces",
    dialogAria: "Search results",
    route: "Route",
    external: "External",
    empty: "No quick matches yet. Try route, contract, or proof words.",
  },
  desktopSearch: {
    prompts: [
      "Search contracts, routes, docs...",
      "FourteenToken",
      "Unlock timeline",
      "Liquidity controller",
      "Ambassador rewards",
      "Whitepaper",
    ],
    ariaLabel: "Search 4TEEN routes and contracts",
    actionAria: "Open search results",
    eyebrow: "Quick search results",
    title: "Quick pages, contracts, and proof surfaces.",
    dialogAria: "Search results",
    closeAria: "Close search",
    resultsSuffix: "results",
    noResultsYet: "No results yet",
    pressEnter: "Press Enter to open the top match.",
    topMatch: "Top match",
    route: "Route",
    external: "External",
    empty: "No results. Try `buy`, `unlock`, `airdrop`, `controller`, or `whitepaper`.",
  },
  locale: {
    eyebrow: "Language",
    title: "Choose interface language",
    active: "Active",
    soon: "Soon",
  },
  mobileMenu: {
    coreSurfaces: "Core surfaces",
    docsAndRoutes: "Docs and routes",
    closeOpenPanelAria: "Close open panel",
  },
  mobileDock: {
    menu: "Menu",
    close: "Close",
    openMenuAria: "Open mobile menu",
    closeMenuAria: "Close mobile menu",
    openHomeAria: "Open home",
    openSearchAria: "Open mobile search",
    openLanguageAria: "Open language panel",
  },
  footer: {
    protocol: "Protocol",
    ecosystem: "Ecosystem",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
    investorDeck: "Investor Deck",
    onePager: "One-Pager",
    officialChannels: "Official Channels",
    brandText:
      "The wallet app now carries the live system surface: direct buy, unlock state, controller truth, ambassador cabinet, and Telegram-first growth flow.",
    getApp: "Get the App",
    copyright: "© 2026 4TEEN / AG PLUS LLC. Structured on-chain entry on TRON.",
    officialWebsite: "Official website: 4teen.me",
  },
};

const chromeContentRu: ChromeContent = {
  common: {
    copy: "Копировать",
    copied: "Скопировано",
    failed: "Ошибка",
    close: "Закрыть",
    qrCode: "QR-код",
  },
  taglines: [
    "Ранний вход. Выход выше.",
    "Победители не ждут.",
    "Преврати 14 дней в прибыль.",
    "Зайди раньше. Выиграй раньше.",
  ],
  header: {
    home: "Главная",
    getApp: "Скачать",
    primaryNavAria: "Основная навигация сайта",
  },
  market: {
    loading: "Загрузка цены",
    unavailable: "Цена недоступна",
    liveAria: "Живая рыночная цена",
  },
  refresh: {
    idle: "Обновить данные",
    busy: "Обновление",
    aria: "Обновить живой снимок данных",
  },
  mobileSearch: {
    ariaLabel: "Поиск маршрутов, контрактов и документов",
    placeholder: "Искать маршруты, контракты, документы...",
    eyebrow: "Быстрый поиск",
    title: "Страницы, контракты и proof-поверхности",
    dialogAria: "Результаты поиска",
    route: "Маршрут",
    external: "Внешнее",
    empty: "Пока нет совпадений. Попробуй route, contract или proof.",
  },
  desktopSearch: {
    prompts: [
      "Искать контракты, маршруты, документы...",
      "FourteenToken",
      "Таймлайн разблокировки",
      "Контроллер ликвидности",
      "Награды амбассадоров",
      "Whitepaper",
    ],
    ariaLabel: "Поиск маршрутов и контрактов 4TEEN",
    actionAria: "Открыть результаты поиска",
    eyebrow: "Быстрые результаты",
    title: "Быстрые страницы, контракты и proof-поверхности.",
    dialogAria: "Результаты поиска",
    closeAria: "Закрыть поиск",
    resultsSuffix: "результатов",
    noResultsYet: "Пока нет результатов",
    pressEnter: "Нажми Enter, чтобы открыть лучшее совпадение.",
    topMatch: "Лучшее совпадение",
    route: "Маршрут",
    external: "Внешнее",
    empty: "Нет результатов. Попробуй `buy`, `unlock`, `airdrop`, `controller` или `whitepaper`.",
  },
  locale: {
    eyebrow: "Язык",
    title: "Выбери язык интерфейса",
    active: "Активен",
    soon: "Скоро",
  },
  mobileMenu: {
    coreSurfaces: "Основные поверхности",
    docsAndRoutes: "Документы и маршруты",
    closeOpenPanelAria: "Закрыть открытую панель",
  },
  mobileDock: {
    menu: "Меню",
    close: "Закрыть",
    openMenuAria: "Открыть мобильное меню",
    closeMenuAria: "Закрыть мобильное меню",
    openHomeAria: "Открыть главную",
    openSearchAria: "Открыть мобильный поиск",
    openLanguageAria: "Открыть панель языка",
  },
  footer: {
    protocol: "Протокол",
    ecosystem: "Экосистема",
    legal: "Юридическое",
    privacy: "Конфиденциальность",
    terms: "Условия",
    support: "Поддержка",
    investorDeck: "Инвесторский дек",
    onePager: "One-pager",
    officialChannels: "Официальные каналы",
    brandText:
      "Приложение-кошелек уже несет живую поверхность системы: прямую покупку, состояние unlock, правду контроллера, кабинет амбассадора и Telegram-first growth flow.",
    getApp: "Скачать приложение",
    copyright: "© 2026 4TEEN / AG PLUS LLC. Структурированный on-chain вход в TRON.",
    officialWebsite: "Официальный сайт: 4teen.me",
  },
};

const chromeContentUz: ChromeContent = {
  common: {
    copy: "Nusxa olish",
    copied: "Nusxa olindi",
    failed: "Xato",
    close: "Yopish",
    qrCode: "QR-kod",
  },
  taglines: [
    "Erta kirish. Yuqori chiqish.",
    "G'oliblar kutmaydi.",
    "14 kunni foydaga aylantir.",
    "Erta harakat qil. Erta yut.",
  ],
  header: {
    home: "Bosh sahifa",
    getApp: "Ilovani olish",
    primaryNavAria: "Saytning asosiy navigatsiyasi",
  },
  market: {
    loading: "Narx yuklanmoqda",
    unavailable: "Narx mavjud emas",
    liveAria: "Jonli bozor narxi",
  },
  refresh: {
    idle: "Ma'lumotni yangilash",
    busy: "Yangilanmoqda",
    aria: "Jonli snapshot ma'lumotini yangilash",
  },
  mobileSearch: {
    ariaLabel: "Marshrutlar, kontraktlar va hujjatlarni qidirish",
    placeholder: "Marshrutlar, kontraktlar, hujjatlar...",
    eyebrow: "Tezkor qidiruv",
    title: "Sahifalar, kontraktlar va proof yuzalari",
    dialogAria: "Qidiruv natijalari",
    route: "Marshrut",
    external: "Tashqi",
    empty: "Hali moslik topilmadi. Route, contract yoki proof so'zlarini sinab ko'r.",
  },
  desktopSearch: {
    prompts: [
      "Kontraktlar, marshrutlar, hujjatlarni qidirish...",
      "FourteenToken",
      "Unlock taymlayni",
      "Likvidlik kontrolleri",
      "Ambassador mukofotlari",
      "Whitepaper",
    ],
    ariaLabel: "4TEEN marshrutlari va kontraktlarini qidirish",
    actionAria: "Qidiruv natijalarini ochish",
    eyebrow: "Tezkor qidiruv natijalari",
    title: "Tezkor sahifalar, kontraktlar va proof yuzalari.",
    dialogAria: "Qidiruv natijalari",
    closeAria: "Qidiruvni yopish",
    resultsSuffix: "natija",
    noResultsYet: "Hali natija yo'q",
    pressEnter: "Yuqori moslikni ochish uchun Enter bosing.",
    topMatch: "Eng yaxshi moslik",
    route: "Marshrut",
    external: "Tashqi",
    empty: "Natija yo'q. `buy`, `unlock`, `airdrop`, `controller` yoki `whitepaper` ni sinab ko'ring.",
  },
  locale: {
    eyebrow: "Til",
    title: "Interfeys tilini tanlang",
    active: "Faol",
    soon: "Tez orada",
  },
  mobileMenu: {
    coreSurfaces: "Asosiy yuzalar",
    docsAndRoutes: "Hujjatlar va marshrutlar",
    closeOpenPanelAria: "Ochiq panelni yopish",
  },
  mobileDock: {
    menu: "Menyu",
    close: "Yopish",
    openMenuAria: "Mobil menyuni ochish",
    closeMenuAria: "Mobil menyuni yopish",
    openHomeAria: "Bosh sahifani ochish",
    openSearchAria: "Mobil qidiruvni ochish",
    openLanguageAria: "Til panelini ochish",
  },
  footer: {
    protocol: "Protokol",
    ecosystem: "Ekotizim",
    legal: "Yuridik",
    privacy: "Maxfiylik",
    terms: "Shartlar",
    support: "Yordam",
    investorDeck: "Investor deck",
    onePager: "One-pager",
    officialChannels: "Rasmiy kanallar",
    brandText:
      "Wallet ilovasi endi tizimning jonli yuzasini olib yuradi: direct buy, unlock holati, controller truth, ambassador cabinet va Telegram-first growth flow.",
    getApp: "Ilovani olish",
    copyright: "© 2026 4TEEN / AG PLUS LLC. TRON uchun structured on-chain kirish.",
    officialWebsite: "Rasmiy sayt: 4teen.me",
  },
};

const chromeContentByLocale: Partial<Record<SupportedSiteLocale, ChromeContent>> = {
  en: chromeContentEn,
  ru: chromeContentRu,
  uz: chromeContentUz,
};

export function getChromeContent(locale: SupportedSiteLocale) {
  return getGeneratedGlobalContent(
    locale,
    "chrome",
    chromeContentByLocale[locale] ?? chromeContentEn,
  );
}
