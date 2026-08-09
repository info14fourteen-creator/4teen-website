import type { SupportedSiteLocale } from "@/lib/site-locale";
import { getGeneratedPageContent } from "../lib/generated-localization";

type StoreLink = {
  href: string;
  label: string;
  meta: string;
};

export type AppPageContent = {
  metadata: {
    title: string;
    description: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    title: string;
    lead: string;
    stayOnWeb: string;
    primaryCta?: string;
    secondaryCta?: string;
    ctaNote?: string;
    rotatingLines?: string[];
    stats: Array<{
      label: string;
      value: string;
      meta: string;
    }>;
  };
  storeLinks: StoreLink[];
  entryFlow: Array<{
    eyebrow: string;
    title: string;
    body: string;
  }>;
  walletFoundation: Array<{
    eyebrow: string;
    title: string;
    text: string;
  }>;
  resourceLayer: Array<{
    eyebrow: string;
    title: string;
    text: string;
  }>;
  protocolSurfaces: Array<{
    eyebrow: string;
    title: string;
    text: string;
    href: string;
  }>;
  operatingRules: Array<{
    title: string;
    text: string;
  }>;
  downloadReasons: string[];
  sections: {
    entryFlow: {
      eyebrow: string;
      title: string;
    };
    walletFoundation: {
      eyebrow: string;
      title: string;
    };
    resourceLayer: {
      eyebrow: string;
      title: string;
      notePrefix: string;
      noteNeedNow: string;
      noteMiddle: string;
      noteMissing: string;
      noteSuffix: string;
    };
    protocolSurfaces: {
      eyebrow: string;
      title: string;
    };
    operatingRuleLabel: string;
    download: {
      eyebrow: string;
      title: string;
      body: string;
      repoLabel: string;
    };
  };
};

const appContentEn: AppPageContent = {
  metadata: {
    title: "4TEEN App | TRON Wallet With The 4TEEN Operating Layer",
    description:
      "Open the 4TEEN mobile wallet, move through buy, unlock, liquidity, ambassadors, and proof routes, and download the product from the store links.",
    openGraphTitle: "4TEEN App Release",
    openGraphDescription:
      "Explore the 4TEEN mobile wallet and the live operating routes already built into the product.",
  },
  hero: {
    eyebrow: "4TEEN Mobile App",
    status: "App Store + Google Play",
    title:
      "A real TRON wallet with the 4TEEN operating layer already inside.",
    lead:
      "This page should feel like a product page, not a release memo. The app already behaves like a broader TRON wallet with wallets, assets, transfers, QR flow, contacts, language, settings, resource checks, and the full 4TEEN route map inside one execution surface.",
    stayOnWeb: "Stay on Web",
    primaryCta: "Download Options",
    secondaryCta: "See Protocol Surfaces",
    ctaNote:
      "The web side explains the system. The mobile side signs, routes, checks resources, and runs the real transaction flow.",
    rotatingLines: [
      "App Store + Google Play. One product surface.",
      "Universal Wallet. Native 4TEEN Layer.",
      "Broad Token Surface. Not Just One Asset.",
      "Resources First. Signature After.",
      "Wallet Core. Protocol Routes. Same Product.",
    ],
    stats: [
      {
        label: "Wallet core",
        value: "TRON-first",
        meta: "Wallets, send, asset management, scan, contacts, settings.",
      },
      {
        label: "Asset scope",
        value: "Broad",
        meta: "TRX, 4TEEN, stable assets, and user-managed custom token entries.",
      },
      {
        label: "Languages",
        value: "16",
        meta: "Dedicated language route with app-wide locale control.",
      },
      {
        label: "4TEEN layer",
        value: "7 Routes",
        meta: "Buy, swap, unlock, liquidity, airdrop, ambassadors, and info.",
      },
    ],
  },
  storeLinks: [
    {
      href: "https://apps.apple.com/",
      label: "App Store",
      meta: "Download for iPhone and iPad",
    },
    {
      href: "https://play.google.com/store/apps",
      label: "Google Play",
      meta: "Download for Android",
    },
  ],
  entryFlow: [
    {
      eyebrow: "Boot",
      title: "Smart entry routing",
      body: "The mobile app does not dump every user into one generic start screen. It decides between first access, wallet unlock, and the active wallet path before the user even reaches the main product layer.",
    },
    {
      eyebrow: "Home",
      title: "Compact hub",
      body: "The real home screen already acts as a working hub: direct buy, unlock visibility, liquidity control, and information routes stay close without hiding their deeper dedicated screens.",
    },
    {
      eyebrow: "Deep routes",
      title: "Full screens when needed",
      body: "Every serious action still opens into its own surface. The app stays compact at the top layer, but never collapses important flow into one shallow dashboard.",
    },
  ],
  walletFoundation: [
    {
      eyebrow: "Wallets",
      title: "Multiple identities, not one fixed shell",
      text: "Users can create, import, rename, switch, and remove wallets, while the product keeps clear separation between signing wallets and watch-only wallets.",
    },
    {
      eyebrow: "Send",
      title: "Real transfer preparation",
      text: "Send is not a raw address box. It already supports QR scan, contacts, recent recipients, asset selection, spendable-balance rules, and a clean confirmation step.",
    },
    {
      eyebrow: "Manage Crypto",
      title: "Broader than one ecosystem asset",
      text: "Manage Crypto is a real wallet layer: TRX, 4TEEN, stable assets, custom token entries, filters, sort modes, and target-asset selection for send and swap live in the same surface.",
    },
    {
      eyebrow: "Language",
      title: "16 interface languages",
      text: "The language layer is already built into the product with a dedicated route and app-level locale control across major regional entry points.",
    },
  ],
  resourceLayer: [
    {
      eyebrow: "Need now",
      title: "Resources are measured before signature",
      text: "Direct buy, send, swap, liquidity execution, and other contract routes estimate Energy and Bandwidth before the app asks for passcode or biometrics.",
    },
    {
      eyebrow: "Shortfall",
      title: "TRX burn is made visible instead of hidden",
      text: "The app compares required resources against current wallet resources, shows the shortfall, and exposes the expected burn path instead of letting the user discover it through failure.",
    },
    {
      eyebrow: "Rental",
      title: "Resource top-up is integrated into the flow",
      text: "The code already supports rental quote, payment, waiting, and ready states for send transfer, swap, direct buy, liquidity execution, ambassador registration, and ambassador withdrawals.",
    },
    {
      eyebrow: "Replay",
      title: "Pending rows stay operationally honest",
      text: "If the operator side drops below its safe resource floor, queued rows stay visible while the backend tops up resources and the replay cycle checks again until the reward lands on-chain.",
    },
  ],
  protocolSurfaces: [
    {
      eyebrow: "Direct Buy",
      title: "Prepare → confirm",
      text: "The buy route prepares the transaction first: quote, mint-on-purchase context, 14-day lock, TRX split preview, and only then the real confirmation and signing step.",
      href: "/buy",
    },
    {
      eyebrow: "Swap Token",
      title: "Route comparison, not blind exchange",
      text: "The swap route can compare paths, switch target assets, surface protected minimum receive, and stop the flow early if allowance or network resources are not ready.",
      href: "/swap",
    },
    {
      eyebrow: "Unlock Timeline",
      title: "Per-purchase lock visibility",
      text: "Each locked batch is shown by wallet, amount, UTC unlock time, countdown, and source transaction. This is a purpose-built lock surface, not just generic history.",
      href: "/unlock",
    },
    {
      eyebrow: "Liquidity Controller",
      title: "Controller-side truth",
      text: "The liquidity route exposes the 100 TRX threshold, 6.43% daily release cadence, executor split, and execution gating inside the app itself.",
      href: "/liquidity",
    },
    {
      eyebrow: "Airdrop",
      title: "Telegram-first live state",
      text: "The airdrop route combines current bot session state, local wallet state, and on-chain claim state. Telegram is live now; other socials are staged rails, not fake active buttons.",
      href: "/airdrop",
    },
    {
      eyebrow: "Ambassador",
      title: "Registration and cabinet in one route",
      text: "The ambassador route starts as registration and becomes the cabinet for the same wallet: identity slug, buyer binding, purchase rows, pending replay, withdrawals, and claimable state.",
      href: "/ambassadors",
    },
    {
      eyebrow: "Info",
      title: "Compact architecture and runtime map",
      text: "The information route connects contracts, vaults, liquidity execution, asset-wallet balances, and operator readiness, so architecture and runtime state are visible inside the product.",
      href: "/verification",
    },
  ],
  operatingRules: [
    {
      title: "Universal wallet first",
      text: "The strongest reading of this app is not “an ecosystem shell”. It behaves like a broader TRON wallet with a wider token universe, and 4TEEN is built into that foundation as a live product layer.",
    },
    {
      title: "Watch-only and signing are different states",
      text: "The app treats inspection and action differently. Watch-only wallets can read portfolio and protocol state, while direct buy, registration, liquidity execution, and withdrawal require full-access signing wallets.",
    },
    {
      title: "Operational readiness is part of the interface",
      text: "Controller gating, resource coverage, queued reward rows, and replay status are expressed as product states. The user sees what is ready now, what needs top-up, and what is waiting.",
    },
    {
      title: "Multilingual is product infrastructure",
      text: "Language support is already encoded into the app, not left as a future wish. That matters because the product is meant to work beyond one market and beyond one community entry route.",
    },
  ],
  downloadReasons: [
    "Use it as a broader TRON wallet, not only as a 4TEEN access point.",
    "Keep portfolio, custom token handling, transfers, scanning, contacts, and language control in the same product.",
    "Open the full 4TEEN layer inside the wallet: buy, swap, unlock, liquidity, airdrop, ambassadors, and info.",
    "See network load, resource shortfall, route protection, and operational readiness before signing or waiting blindly.",
  ],
  sections: {
    entryFlow: {
      eyebrow: "Entry Flow",
      title: "How the real app moves the user",
    },
    walletFoundation: {
      eyebrow: "Wallet Foundation",
      title: "Why this is a real wallet first",
    },
    resourceLayer: {
      eyebrow: "Resource Intelligence",
      title: "Why execution is safer than blind signing",
      notePrefix: "Inside the app, network-load cards already surface",
      noteNeedNow: "Need now",
      noteMiddle: "Available now",
      noteMissing: "Missing",
      noteSuffix:
        "and coverage percentage for both Energy and Bandwidth. That makes the execution model easier to trust because the wallet explains the cost before the transaction is signed.",
    },
    protocolSurfaces: {
      eyebrow: "4TEEN Surfaces",
      title: "What the protocol layer already does inside the wallet",
    },
    operatingRuleLabel: "Operating Rule",
    download: {
      eyebrow: "Download Route",
      title: "Install the wallet if you want the full product, not only the web map.",
      body:
        "The strongest version of the product lives in the app: real wallet behavior, multilingual interface, resource-aware execution, and the full 4TEEN operating layer in one place once the store rollout opens.",
      repoLabel: "Wallet App Repo",
    },
  },
};

const appContentRu: AppPageContent = {
  ...appContentEn,
  metadata: { title: "Приложение 4TEEN | TRON-кошелек с операционным слоем 4TEEN", description: "Откройте мобильный кошелек 4TEEN, проходите buy, unlock, liquidity, ambassador и proof-маршруты в одном приложении.", openGraphTitle: "Релиз приложения 4TEEN", openGraphDescription: "Изучите мобильный кошелек 4TEEN и живые продуктовые маршруты внутри него." },
  hero: { ...appContentEn.hero, eyebrow: "Мобильное приложение 4TEEN", status: "App Store + Google Play", title: "Настоящий TRON-кошелек с операционным слоем 4TEEN внутри.", lead: "Это продуктовая страница, а не релизная заметка. Приложение уже работает как широкий TRON-кошелек: кошельки, активы, переводы, QR, контакты, языки, настройки, проверка ресурсов и полная карта маршрутов 4TEEN в одной среде исполнения.", stayOnWeb: "Остаться в вебе", primaryCta: "Варианты загрузки", secondaryCta: "Посмотреть протокольные маршруты", ctaNote: "Веб объясняет систему. Мобильное приложение подписывает, маршрутизирует, проверяет ресурсы и исполняет реальные транзакции.", rotatingLines: ["App Store + Google Play. Одна продуктовая среда.", "Универсальный кошелек. Нативный слой 4TEEN.", "Сначала ресурсы. Потом подпись."], stats: [{ label: "Ядро кошелька", value: "TRON-first", meta: "Кошельки, отправка, активы, сканирование, контакты и настройки." }, { label: "Активы", value: "Широко", meta: "TRX, 4TEEN, стейбл-активы и пользовательские токены." }, { label: "Языки", value: "16", meta: "Отдельный языковой маршрут и управление locale на уровне приложения." }, { label: "Слой 4TEEN", value: "7 маршрутов", meta: "Buy, swap, unlock, liquidity, airdrop, ambassadors и info." }] },
  storeLinks: [{ href: "https://apps.apple.com/", label: "App Store", meta: "Загрузить для iPhone и iPad" }, { href: "https://play.google.com/store/apps", label: "Google Play", meta: "Загрузить для Android" }],
  entryFlow: [{ eyebrow: "Старт", title: "Умная маршрутизация входа", body: "Приложение определяет первый вход, разблокировку кошелька или путь активного кошелька до перехода в основной продуктовый слой." }, { eyebrow: "Главная", title: "Компактный хаб", body: "Главный экран уже служит рабочим хабом: прямой buy, видимость unlock, контроль ликвидности и информация остаются рядом." }, { eyebrow: "Глубокие маршруты", title: "Полные экраны, когда нужно", body: "Каждое серьезное действие открывается в собственную поверхность: важный поток не сворачивается в поверхностный dashboard." }],
  walletFoundation: [{ eyebrow: "Кошельки", title: "Несколько идентичностей, не одна оболочка", text: "Можно создавать, импортировать, переименовывать, переключать и удалять кошельки, сохраняя разницу между signing и watch-only." }, { eyebrow: "Отправка", title: "Подготовка реального перевода", text: "Есть QR, контакты, недавние получатели, выбор актива, правила доступного баланса и чистый шаг подтверждения." }, { eyebrow: "Управление активами", title: "Шире одного актива экосистемы", text: "TRX, 4TEEN, стейбл-активы, пользовательские токены, фильтры и выбор целевого актива живут в одном слое кошелька." }, { eyebrow: "Язык", title: "16 языков интерфейса", text: "Языковой слой встроен в продукт через отдельный маршрут и app-wide locale control." }],
  resourceLayer: [{ eyebrow: "Нужно сейчас", title: "Ресурсы измеряются до подписи", text: "Buy, send, swap, ликвидность и другие контрактные маршруты оценивают Energy и Bandwidth до запроса passcode или биометрии." }, { eyebrow: "Дефицит", title: "Сжигание TRX видно, а не скрыто", text: "Приложение показывает нехватку ресурсов и ожидаемое сжигание вместо того, чтобы пользователь узнал о нем через неудачу." }, { eyebrow: "Аренда", title: "Пополнение ресурсов встроено в поток", text: "Код уже поддерживает quote аренды, оплату, ожидание и готовность для send, swap, buy, ликвидности, регистрации ambassador и выводов." }, { eyebrow: "Повтор", title: "Ожидающие строки остаются честными", text: "Когда стороне оператора не хватает безопасного объема ресурсов, очередь остается видимой до пополнения и повторной проверки." }],
  sections: { ...appContentEn.sections, entryFlow: { eyebrow: "Поток входа", title: "Как реальное приложение ведет пользователя" }, walletFoundation: { eyebrow: "Основа кошелька", title: "Почему это сначала настоящий кошелек" }, resourceLayer: { eyebrow: "Интеллект ресурсов", title: "Почему исполнение безопаснее слепой подписи", notePrefix: "Внутри приложения карточки нагрузки показывают", noteNeedNow: "Нужно сейчас", noteMiddle: "Доступно сейчас", noteMissing: "Не хватает", noteSuffix: "и процент покрытия Energy и Bandwidth до подписи транзакции." }, protocolSurfaces: { eyebrow: "Поверхности 4TEEN", title: "Что протокольный слой уже делает в кошельке" }, operatingRuleLabel: "Правило работы", download: { eyebrow: "Загрузка", title: "Установите кошелек, если нужен полный продукт, а не только веб-карта.", body: "Самая сильная версия продукта живет в приложении: настоящий кошелек, многоязычный интерфейс, ресурсная подготовка и полный слой 4TEEN в одном месте.", repoLabel: "Репозиторий приложения" } },
};

const appContentUz: AppPageContent = {
  ...appContentEn,
  metadata: { title: "4TEEN ilovasi | 4TEEN operatsion qatlami bilan TRON hamyon", description: "4TEEN mobil hamyonini oching va buy, unlock, liquidity, ambassador hamda proof yo'nalishlaridan bitta ilovada foydalaning.", openGraphTitle: "4TEEN ilovasi relizi", openGraphDescription: "4TEEN mobil hamyoni va ichidagi jonli mahsulot yo'nalishlarini o'rganing." },
  hero: { ...appContentEn.hero, eyebrow: "4TEEN mobil ilovasi", status: "App Store + Google Play", title: "Ichida 4TEEN operatsion qatlami bo'lgan haqiqiy TRON hamyon.", lead: "Bu reliz eslatmasi emas, mahsulot sahifasi. Ilova allaqachon hamyonlar, aktivlar, o'tkazmalar, QR, kontaktlar, tillar, sozlamalar, resurs tekshiruvi va 4TEEN yo'nalishlarini bitta ijro yuzasida birlashtiradi.", stayOnWeb: "Vebda qolish", primaryCta: "Yuklab olish variantlari", secondaryCta: "Protokol yo'nalishlarini ko'rish", ctaNote: "Veb tizimni tushuntiradi. Mobil ilova imzolaydi, yo'naltiradi, resurslarni tekshiradi va tranzaksiyani bajaradi.", rotatingLines: ["App Store + Google Play. Bitta mahsulot yuzasi.", "Universal hamyon. 4TEENning nativ qatlami.", "Avval resurslar. Keyin imzo."], stats: [{ label: "Hamyon asosi", value: "TRON-first", meta: "Hamyonlar, yuborish, aktivlar, skan va sozlamalar." }, { label: "Aktivlar", value: "Keng", meta: "TRX, 4TEEN, stabil aktivlar va maxsus tokenlar." }, { label: "Tillar", value: "16", meta: "Ilova miqyosidagi locale boshqaruvi." }, { label: "4TEEN qatlami", value: "7 yo'nalish", meta: "Buy, swap, unlock, liquidity, airdrop, ambassadors va info." }] },
  storeLinks: [{ href: "https://apps.apple.com/", label: "App Store", meta: "iPhone va iPad uchun yuklash" }, { href: "https://play.google.com/store/apps", label: "Google Play", meta: "Android uchun yuklash" }],
  entryFlow: [{ eyebrow: "Start", title: "Aqlli kirish yo'nalishi", body: "Ilova asosiy qatlamga kirishdan oldin birinchi kirish, hamyon ochilishi yoki faol hamyon yo'lini belgilaydi." }, { eyebrow: "Bosh sahifa", title: "Ixcham xab", body: "Bosh ekran buy, unlock, likvidlik nazorati va ma'lumot yo'nalishlarini yaqin tutadi." }, { eyebrow: "Chuqur yo'nalishlar", title: "Kerak bo'lganda to'liq ekranlar", body: "Jiddiy harakatlar o'z yuzasiga ochiladi; muhim oqimlar yuzaki dashboardga sig'dirilmaydi." }],
  walletFoundation: [{ eyebrow: "Hamyonlar", title: "Bitta qobiq emas, bir nechta identitet", text: "Hamyonlarni yaratish, import qilish, nomlash va almashtirish mumkin; signing va watch-only aniq ajratiladi." }, { eyebrow: "Yuborish", title: "Haqiqiy o'tkazmani tayyorlash", text: "QR, kontaktlar, so'nggi qabul qiluvchilar, aktiv tanlash va tasdiqlash bor." }, { eyebrow: "Aktivlarni boshqarish", title: "Bitta ekotizim aktividan kengroq", text: "TRX, 4TEEN, stabil aktivlar, maxsus tokenlar va filtrlar bitta hamyon qatlamida." }, { eyebrow: "Til", title: "16 interfeys tili", text: "Til qatlami alohida yo'nalish va app-wide locale orqali mahsulot ichiga kiritilgan." }],
  resourceLayer: [{ eyebrow: "Hozir kerak", title: "Resurslar imzodan oldin o'lchanadi", text: "Buy, send, swap, likvidlik va boshqa kontrakt yo'nalishlari passcode yoki biometrikadan oldin Energy va Bandwidthni baholaydi." }, { eyebrow: "Kamomad", title: "TRX burn yashirilmaydi", text: "Ilova resurslar yetishmasligi va kutiladigan burn-ni xatolikdan oldin ko'rsatadi." }, { eyebrow: "Ijara", title: "Resurs to'ldirishi oqimga kiritilgan", text: "Send, swap, buy va boshqa yo'nalishlar uchun ijara quote, to'lov va tayyorlik holatlari bor." }, { eyebrow: "Takror", title: "Kutilayotgan qatorlar halol qoladi", text: "Operator resurslari yetarli bo'lmasa qatorlar ko'rinib turadi va to'ldirishdan keyin qayta tekshiriladi." }],
  sections: { ...appContentEn.sections, entryFlow: { eyebrow: "Kirish oqimi", title: "Haqiqiy ilova foydalanuvchini qanday olib boradi" }, walletFoundation: { eyebrow: "Hamyon asosi", title: "Nega bu avval haqiqiy hamyon" }, resourceLayer: { eyebrow: "Resurs intellekti", title: "Nega ijro ko'r-ko'rona imzodan xavfsizroq", notePrefix: "Ilova yuklama kartalari", noteNeedNow: "Hozir kerak", noteMiddle: "Hozir mavjud", noteMissing: "Yetishmaydi", noteSuffix: "va Energy hamda Bandwidth qoplamasini imzodan oldin ko'rsatadi." }, protocolSurfaces: { eyebrow: "4TEEN yuzalari", title: "Protokol qatlami hamyon ichida nima qila oladi" }, operatingRuleLabel: "Ishlash qoidasi", download: { eyebrow: "Yuklash yo'nalishi", title: "Faqat veb xarita emas, to'liq mahsulot kerak bo'lsa hamyonni o'rnating.", body: "Mahsulotning kuchli versiyasi ilovada: haqiqiy hamyon, ko'p tilli interfeys, resurslarni hisobga oladigan ijro va to'liq 4TEEN qatlami.", repoLabel: "Hamyon ilovasi repozitoriyasi" } },
};

const appContentByLocale: Partial<Record<SupportedSiteLocale, AppPageContent>> = {
  en: appContentEn,
  ru: appContentRu,
  uz: appContentUz,
};

export function getAppPageContent(locale: SupportedSiteLocale) {
  return getGeneratedPageContent(
    locale,
    "app",
    appContentByLocale[locale] ?? appContentEn,
  );
}
