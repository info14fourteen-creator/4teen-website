import type { SupportedSiteLocale } from "@/lib/site-locale";

type RouteCopy = {
  title: string;
  statusLive: string;
  statusSoon: string;
  note: string;
};

export type AirdropPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    title: string;
    lead: string;
    body: string[];
    rotatingLines: string[];
    primaryCta: string;
    secondaryCta: string;
    ctaNote: string;
    stats: {
      currentWave: string;
      vaultBalance: string;
      vaultBalanceMeta: string;
      availableNow: string;
      availableNowMeta: string;
      nextWave: string;
      completed: string;
      nextWaveValue: (currentWave: number) => string;
      readFailed: string;
      readRetry: string;
    };
  };
  sections: {
    vaultState: {
      eyebrow: string;
      title: string;
      rows: {
        totalAllocation: string;
        unlockedTotal: string;
        totalDistributed: string;
        remainingUnlocked: string;
        remainingPlanned: string;
        vaultBalance: string;
      };
      noteTitle: string;
      noteBody: string;
    };
    distribution: {
      eyebrow: string;
      title: string;
      cards: {
        distributed: { title: string; text: string };
        planned: { title: string; text: string };
        lastDrop: { title: string; text: string };
        unlockedUndistributed: { title: string; text: string };
      };
      note: string;
    };
    dateLayer: {
      eyebrow: string;
      title: string;
      rows: {
        issueDate: string;
        currentWave: string;
        nextWave: string;
        lastDrop: string;
        snapshotUpdated: string;
      };
      note: string;
    };
    routeModel: {
      eyebrow: string;
      title: string;
      routeBitsLabel: (bit: number) => string;
      note: string;
      routes: Record<string, RouteCopy>;
    };
    walletAccess: {
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      openApp: string;
      openVault: string;
    };
    waveSchedule: {
      eyebrow: string;
      title: string;
      headers: {
        wave: string;
        cap: string;
        unlockTime: string;
        status: string;
      };
      current: string;
      unlocked: string;
      upcoming: string;
      waveLabel: (wave: number) => string;
    };
    verification: {
      eyebrow: string;
      title: string;
      body: string;
      vaultLabel: string;
      operatorLabel: string;
    };
    productContext: {
      eyebrow: string;
      title: string;
      bullets: string[];
    };
    fallback: {
      eyebrow: string;
      title: string;
      body: string;
      openVault: string;
      openApp: string;
    };
  };
};

const airdropContentEn: AirdropPageContent = {
  metadata: {
    title: "Airdrop",
    description:
      "Live 4TEEN airdrop status with current wave, unlocked balance, vault balance, Telegram route state, wallet-only claim access, and on-chain verification links.",
  },
  hero: {
    eyebrow: "AirdropVault",
    status: "Wallet claim route",
    title: "Claim 4TEEN Through the Wallet Route",
    lead:
      "The public site shows the live AirdropVault state. The mobile wallet handles the claim route.",
    body: [
      "Airdrop is not a fake promo button on a landing page. It is a wave-based vault, a wallet-aware claim state, and a Telegram-first route that the app reads before execution.",
      "This page mirrors the public side: current wave, vault balance, unlocked quota, planned remainder, route model, and on-chain verification. The live claim flow belongs inside the wallet.",
    ],
    rotatingLines: [
      "Vault State. Wallet Claim.",
      "Telegram Live. Social Rails Staged.",
      "Public Proof. App Execution.",
      "Wave Unlocks. Route Checks.",
      "No Fake Claims. Just State.",
    ],
    primaryCta: "Open Mobile App Route",
    secondaryCta: "Open AirdropVault",
    ctaNote:
      "The website shows the vault and route map. The wallet reads the selected account, Telegram session, claim state, and signing mode before the real claim path opens.",
    stats: {
      currentWave: "Current Wave",
      vaultBalance: "Vault Balance",
      vaultBalanceMeta: "4TEEN currently held inside AirdropVault.",
      availableNow: "Available Now",
      availableNowMeta: "What can be distributed now by contract rules.",
      nextWave: "Next Wave",
      completed: "Completed",
      nextWaveValue: (currentWave) => `Wave ${Math.min(currentWave + 2, 6)}`,
      readFailed: "Live vault read failed.",
      readRetry: "Try refreshing in a moment.",
    },
  },
  sections: {
    vaultState: {
      eyebrow: "Vault State",
      title: "What the contract says right now",
      rows: {
        totalAllocation: "Total Allocation",
        unlockedTotal: "Unlocked Total",
        totalDistributed: "Total Distributed",
        remainingUnlocked: "Remaining Unlocked",
        remainingPlanned: "Remaining Planned",
        vaultBalance: "Vault Balance",
      },
      noteTitle: "Why two “remaining” numbers exist:",
      noteBody:
        "`Remaining unlocked` is the quota the contract has already unlocked by wave time. `Remaining planned` is the undistributed part of the full 1,500,000 4TEEN allocation. `Available now` is the smaller of unlocked quota and actual vault balance.",
    },
    distribution: {
      eyebrow: "Distribution Footprint",
      title: "How much has already moved out of the vault",
      cards: {
        distributed: {
          title: "Already Distributed",
          text: "4TEEN already sent out from the full allocation.",
        },
        planned: {
          title: "Still Planned",
          text: "4TEEN still left inside the long-term distribution plan.",
        },
        lastDrop: {
          title: "Last Confirmed Drop",
          text: "4TEEN in the latest confirmed vault distribution event.",
        },
        unlockedUndistributed: {
          title: "Unlocked but Undistributed",
          text: "The quota already unlocked by waves but not yet sent out.",
        },
      },
      note:
        "This block is informational only. It uses light live reads that are safe for the public site: vault state from contract reads and the latest confirmed airdrop event from the event feed.",
    },
    dateLayer: {
      eyebrow: "Date Layer",
      title: "The contract runs on fixed timestamps",
      rows: {
        issueDate: "Issue Date",
        currentWave: "Current Wave",
        nextWave: "Next Wave",
        lastDrop: "Last Confirmed Drop",
        snapshotUpdated: "Snapshot Updated",
      },
      note:
        "Wave unlocks are fixed in the contract. The website is not inventing these dates from copy; it is reading and formatting the live contract clock.",
    },
    routeModel: {
      eyebrow: "Live Route Model",
      title: "Telegram is live. Other social bits are staged.",
      routeBitsLabel: (bit) => `platformBit = ${bit}`,
      note:
        "The wallet app combines three checks for Telegram: local wallet state, current bot session state, and on-chain claim state. The website does not fake that claim flow or pretend to claim on the web; it shows the live vault and the real route model around it.",
      routes: {
        telegram: {
          title: "Telegram",
          statusLive: "Live now",
          statusSoon: "Live now",
          note: "Wallet session, bot state, and on-chain claim state are already wired in the mobile app.",
        },
        instagram: {
          title: "Instagram",
          statusLive: "Rollout placeholder",
          statusSoon: "Rollout placeholder",
          note: "Route exists in the contract mask model, but the live claim flow is not open yet.",
        },
        x: {
          title: "X",
          statusLive: "Rollout placeholder",
          statusSoon: "Rollout placeholder",
          note: "Route exists in the contract mask model, but the live claim flow is not open yet.",
        },
        facebook: {
          title: "Facebook",
          statusLive: "Rollout placeholder",
          statusSoon: "Rollout placeholder",
          note: "Route exists in the contract mask model, but the live claim flow is not open yet.",
        },
        youtube: {
          title: "YouTube",
          statusLive: "Rollout placeholder",
          statusSoon: "Rollout placeholder",
          note: "Route exists in the contract mask model, but the live claim flow is not open yet.",
        },
      },
    },
    walletAccess: {
      eyebrow: "Live Claim Access",
      title: "The live airdrop route works from the mobile wallet, not from the public website",
      body:
        "Telegram claim state is wallet-aware in the real product. The app combines the selected wallet, current bot session, and on-chain claim state before it decides whether the route is available, queued, already received, or still blocked. This website stays informational on purpose.",
      bullets: [
        "Claim availability depends on wallet state, not only on a public page visit.",
        "Telegram is the only live claim route today; other socials remain staged rails.",
        "The wallet can distinguish watch-only, signing, received, queued, and legacy-used states.",
        "Use the app route for the real claim surface, then come back here for public vault verification.",
      ],
      openApp: "Open Mobile App Route",
      openVault: "Open AirdropVault",
    },
    waveSchedule: {
      eyebrow: "Wave Schedule",
      title: "Six fixed waves, one contract clock",
      headers: {
        wave: "Wave",
        cap: "Cap",
        unlockTime: "Unlock Time",
        status: "Status",
      },
      current: "Current",
      unlocked: "Unlocked",
      upcoming: "Upcoming",
      waveLabel: (wave) => `Wave ${wave}`,
    },
    verification: {
      eyebrow: "Verification",
      title: "Contract and operator",
      body:
        "The site is reading the same vault logic the wallet uses: current wave, next-wave timestamp, unlocked balance, available distribution amount, and vault balance.",
      vaultLabel: "AirdropVault",
      operatorLabel: "Operator",
    },
    productContext: {
      eyebrow: "Product Context",
      title: "How the wallet reads this surface",
      bullets: [
        "Telegram is the only live social claim route today.",
        "Other social bits already exist in the contract mask model.",
        "Claim history and claim status are wallet-specific and are read in the mobile app, not faked here.",
        "Vault funding and unlocked quota are separate realities, so the app shows both.",
        "This website does not perform the live claim itself; it points to the wallet route that does.",
      ],
    },
    fallback: {
      eyebrow: "Fallback",
      title: "The route is ready, but live reads failed.",
      body:
        "The page is already wired around the real AirdropVault contract. Once the live read succeeds again, it will populate wave state, balance, unlocked quota, planned remainder, and next-wave timing automatically.",
      openVault: "Open AirdropVault",
      openApp: "Open Mobile App Route",
    },
  },
};

const airdropContentRu: AirdropPageContent = {
  ...airdropContentEn,
  metadata: { title: "Аирдроп", description: "Живой статус аирдропа 4TEEN: текущая волна, баланс vault, доступная квота, Telegram-маршрут, получение через кошелек и on-chain проверка." },
  hero: {
    ...airdropContentEn.hero,
    eyebrow: "AirdropVault", status: "Маршрут получения в кошельке", title: "Получайте 4TEEN через маршрут в кошельке", lead: "Публичный сайт показывает живое состояние AirdropVault. Мобильный кошелек исполняет получение.",
    body: ["Аирдроп - не фальшивая промо-кнопка на лендинге. Это wave-based vault, состояние получения с учетом кошелька и Telegram-first маршрут, который приложение читает перед исполнением.", "Страница показывает публичную сторону: текущую волну, баланс vault, разблокированную квоту, плановый остаток, модель маршрута и on-chain проверку. Живой claim остается в кошельке."],
    rotatingLines: ["СОСТОЯНИЕ VAULT. ПОЛУЧЕНИЕ В КОШЕЛЬКЕ.", "TELEGRAM АКТИВЕН. SOCIAL-РЕЛЬСЫ ПОЭТАПНО.", "ПУБЛИЧНОЕ ДОКАЗАТЕЛЬСТВО. ИСПОЛНЕНИЕ В ПРИЛОЖЕНИИ."], primaryCta: "Открыть маршрут в приложении", secondaryCta: "Открыть AirdropVault", ctaNote: "Сайт показывает vault и карту маршрута. Кошелек читает выбранный аккаунт, сессию Telegram, claim state и режим подписи перед реальным получением.",
    stats: { currentWave: "Текущая волна", vaultBalance: "Баланс vault", vaultBalanceMeta: "4TEEN, который сейчас хранится внутри AirdropVault.", availableNow: "Доступно сейчас", availableNowMeta: "То, что можно распределить сейчас по правилам контракта.", nextWave: "Следующая волна", completed: "Завершено", nextWaveValue: (currentWave) => `Волна ${Math.min(currentWave + 2, 6)}`, readFailed: "Не удалось получить живое состояние vault.", readRetry: "Попробуйте обновить чуть позже." },
  },
  sections: {
    ...airdropContentEn.sections,
    vaultState: { eyebrow: "Состояние vault", title: "Что контракт говорит прямо сейчас", rows: { totalAllocation: "Общее распределение", unlockedTotal: "Разблокировано всего", totalDistributed: "Распределено всего", remainingUnlocked: "Осталось разблокировано", remainingPlanned: "Осталось по плану", vaultBalance: "Баланс vault" }, noteTitle: "Почему есть два показателя «осталось»:", noteBody: "`Осталось разблокировано` - квота, которую контракт уже открыл по времени волн. `Осталось по плану` - нераспределенная часть полного объема 1,500,000 4TEEN. `Доступно сейчас` - меньшая величина из разблокированной квоты и реального баланса vault." },
    distribution: { eyebrow: "Контур распределения", title: "Сколько уже вышло из vault", cards: { distributed: { title: "Уже распределено", text: "4TEEN, уже отправленный из полного распределения." }, planned: { title: "Еще запланировано", text: "4TEEN, оставшийся в долгосрочном плане." }, lastDrop: { title: "Последняя подтвержденная раздача", text: "4TEEN в последнем подтвержденном событии распределения vault." }, unlockedUndistributed: { title: "Разблокировано, но не распределено", text: "Квота, открытая волнами, но еще не отправленная." } }, note: "Блок только информационный: он использует легкие публичные чтения состояния vault и последнее подтвержденное событие аирдропа." },
    dateLayer: { eyebrow: "Временной слой", title: "Контракт работает по фиксированным timestamp", rows: { issueDate: "Дата выпуска", currentWave: "Текущая волна", nextWave: "Следующая волна", lastDrop: "Последняя подтвержденная раздача", snapshotUpdated: "Snapshot обновлен" }, note: "Разблокировки волн зафиксированы в контракте. Сайт читает и форматирует живые контрактные даты, а не выдумывает их из текста." },
    routeModel: { eyebrow: "Модель живого маршрута", title: "Telegram активен. Остальные social bits подготовлены.", routeBitsLabel: (bit) => `platformBit = ${bit}`, note: "Приложение объединяет для Telegram три проверки: локальное состояние кошелька, сессию бота и on-chain claim state. Сайт не имитирует получение в вебе: он показывает vault и реальную модель маршрута.", routes: { telegram: { title: "Telegram", statusLive: "Активно", statusSoon: "Активно", note: "Сессия кошелька, состояние бота и on-chain claim уже подключены в мобильном приложении." }, instagram: { title: "Instagram", statusLive: "Заготовка rollout", statusSoon: "Заготовка rollout", note: "Маршрут есть в маске контракта, но получение еще не открыто." }, x: { title: "X", statusLive: "Заготовка rollout", statusSoon: "Заготовка rollout", note: "Маршрут есть в маске контракта, но получение еще не открыто." }, facebook: { title: "Facebook", statusLive: "Заготовка rollout", statusSoon: "Заготовка rollout", note: "Маршрут есть в маске контракта, но получение еще не открыто." }, youtube: { title: "YouTube", statusLive: "Заготовка rollout", statusSoon: "Заготовка rollout", note: "Маршрут есть в маске контракта, но получение еще не открыто." } } },
    walletAccess: { eyebrow: "Живой доступ к получению", title: "Рабочий аирдроп-маршрут находится в мобильном кошельке, не на публичном сайте", body: "Состояние получения Telegram учитывает кошелек. Приложение сопоставляет выбранный кошелек, сессию бота и on-chain claim state, прежде чем решить, доступен ли маршрут, находится в очереди, уже получен или заблокирован.", bullets: ["Доступность зависит от состояния кошелька, а не только от визита на страницу.", "Telegram - единственный активный маршрут получения; остальные social-рельсы пока подготовлены.", "Кошелек отличает watch-only, signing, received, queued и legacy-used состояния.", "Для получения используйте приложение, а сюда возвращайтесь для публичной проверки vault."], openApp: "Открыть маршрут в приложении", openVault: "Открыть AirdropVault" },
    waveSchedule: { ...airdropContentEn.sections.waveSchedule, eyebrow: "Расписание волн", title: "Шесть фиксированных волн, одни контрактные часы", headers: { wave: "Волна", cap: "Лимит", unlockTime: "Время разблокировки", status: "Статус" }, current: "Текущая", unlocked: "Разблокирована", upcoming: "Предстоящая", waveLabel: (wave) => `Волна ${wave}` },
    verification: { eyebrow: "Проверка", title: "Контракт и оператор", body: "Сайт читает ту же логику vault, что и кошелек: текущую волну, timestamp следующей волны, разблокированный баланс, доступный объем и баланс vault.", vaultLabel: "AirdropVault", operatorLabel: "Оператор" },
    fallback: { eyebrow: "Резервный режим", title: "Маршрут готов, но живое чтение не удалось", body: "Страница уже подключена к реальному AirdropVault. После восстановления живого чтения она автоматически покажет волну, баланс, квоту, плановый остаток и время следующей волны.", openVault: "Открыть AirdropVault", openApp: "Открыть маршрут в приложении" },
  },
};

const airdropContentUz: AirdropPageContent = {
  ...airdropContentEn,
  metadata: { title: "Airdrop", description: "4TEEN airdropining jonli holati: joriy to'lqin, vault balansi, mavjud kvota, Telegram yo'nalishi, hamyon orqali claim va on-chain tekshiruv." },
  hero: {
    ...airdropContentEn.hero,
    eyebrow: "AirdropVault", status: "Hamyonda claim yo'nalishi", title: "4TEEN-ni hamyon yo'nalishi orqali oling", lead: "Ommaviy sayt AirdropVault jonli holatini ko'rsatadi. Mobil hamyon claim jarayonini bajaradi.",
    body: ["Airdrop landing sahifasidagi soxta promo tugma emas. Bu to'lqinli vault, hamyonni hisobga oladigan claim holati va ilova ijrodan oldin o'qiydigan Telegram-first yo'nalish.", "Sahifa ommaviy tomonni ko'rsatadi: joriy to'lqin, vault balansi, ochilgan kvota, rejalashtirilgan qoldiq, yo'nalish modeli va on-chain tekshiruv."], rotatingLines: ["VAULT HOLATI. HAMYONDA CLAIM.", "TELEGRAM JONLI. SOCIAL RAILS BOSQICHMA-BOSQICH.", "OMMAVIY ISBOT. ILOVADA IJRO."], primaryCta: "Ilova yo'nalishini ochish", secondaryCta: "AirdropVault-ni ochish", ctaNote: "Sayt vault va yo'nalish xaritasini ko'rsatadi. Hamyon tanlangan hisobni, Telegram sessiyasini, claim holatini va imzo rejimini o'qiydi.",
    stats: { currentWave: "Joriy to'lqin", vaultBalance: "Vault balansi", vaultBalanceMeta: "AirdropVault ichida saqlanayotgan 4TEEN.", availableNow: "Hozir mavjud", availableNowMeta: "Kontrakt qoidalari bo'yicha hozir taqsimlanishi mumkin bo'lgan miqdor.", nextWave: "Keyingi to'lqin", completed: "Yakunlangan", nextWaveValue: (currentWave) => `To'lqin ${Math.min(currentWave + 2, 6)}`, readFailed: "Vaultning jonli holatini o'qib bo'lmadi.", readRetry: "Birozdan keyin yangilang." },
  },
  sections: {
    ...airdropContentEn.sections,
    vaultState: { eyebrow: "Vault holati", title: "Kontrakt hozir nima deydi", rows: { totalAllocation: "Jami taqsimot", unlockedTotal: "Jami ochilgan", totalDistributed: "Jami tarqatilgan", remainingUnlocked: "Ochilgan qoldiq", remainingPlanned: "Rejadagi qoldiq", vaultBalance: "Vault balansi" }, noteTitle: "Nega ikkita qoldiq raqami bor:", noteBody: "`Ochilgan qoldiq` - vaqt bo'yicha kontrakt ochgan kvota. `Rejadagi qoldiq` - 1,500,000 4TEENning taqsimlanmagan qismi. `Hozir mavjud` ochilgan kvota va haqiqiy vault balansi ichidan kichigidir." },
    distribution: { eyebrow: "Taqsimot holati", title: "Vaultdan qancha chiqib ketdi", cards: { distributed: { title: "Allaqachon tarqatilgan", text: "To'liq taqsimotdan yuborilgan 4TEEN." }, planned: { title: "Hali rejalashtirilgan", text: "Uzoq muddatli rejada qolgan 4TEEN." }, lastDrop: { title: "Oxirgi tasdiqlangan tarqatish", text: "Oxirgi vault taqsimot voqeasidagi 4TEEN." }, unlockedUndistributed: { title: "Ochilgan, ammo tarqatilmagan", text: "To'lqinlar ochgan, lekin hali yuborilmagan kvota." } }, note: "Bu faqat ma'lumot bloki: vault holati va oxirgi tasdiqlangan airdrop voqeasini yengil o'qiydi." },
    dateLayer: { eyebrow: "Vaqt qatlami", title: "Kontrakt qat'iy timestamp bo'yicha ishlaydi", rows: { issueDate: "Chiqarilgan sana", currentWave: "Joriy to'lqin", nextWave: "Keyingi to'lqin", lastDrop: "Oxirgi tasdiqlangan tarqatish", snapshotUpdated: "Snapshot yangilandi" }, note: "To'lqin ochilishlari kontraktda belgilangan. Sayt jonli kontrakt vaqtini o'qiydi va formatlaydi." },
    routeModel: { eyebrow: "Jonli yo'nalish modeli", title: "Telegram jonli. Boshqa social bitlar tayyor.", routeBitsLabel: (bit) => `platformBit = ${bit}`, note: "Telegram uchun ilova hamyon holati, bot sessiyasi va on-chain claim holatini birlashtiradi. Sayt webda claimni soxtalashtirmaydi, balki vault va haqiqiy yo'nalish modelini ko'rsatadi.", routes: { telegram: { title: "Telegram", statusLive: "Hozir jonli", statusSoon: "Hozir jonli", note: "Hamyon sessiyasi, bot holati va on-chain claim mobil ilovada ulangan." }, instagram: { title: "Instagram", statusLive: "Rollout tayyorgarligi", statusSoon: "Rollout tayyorgarligi", note: "Yo'nalish kontrakt maskasida mavjud, ammo claim hali ochilmagan." }, x: { title: "X", statusLive: "Rollout tayyorgarligi", statusSoon: "Rollout tayyorgarligi", note: "Yo'nalish kontrakt maskasida mavjud, ammo claim hali ochilmagan." }, facebook: { title: "Facebook", statusLive: "Rollout tayyorgarligi", statusSoon: "Rollout tayyorgarligi", note: "Yo'nalish kontrakt maskasida mavjud, ammo claim hali ochilmagan." }, youtube: { title: "YouTube", statusLive: "Rollout tayyorgarligi", statusSoon: "Rollout tayyorgarligi", note: "Yo'nalish kontrakt maskasida mavjud, ammo claim hali ochilmagan." } } },
    walletAccess: { eyebrow: "Jonli claim kirishi", title: "Ishlaydigan airdrop yo'nalishi mobil hamyonda", body: "Telegram claim holati haqiqiy mahsulotda hamyonni hisobga oladi. Ilova tanlangan hamyon, bot sessiyasi va on-chain claimni tekshiradi.", bullets: ["Mavjudlik faqat ommaviy sahifaga kirishga bog'liq emas.", "Bugun faqat Telegram jonli claim yo'nalishi.", "Hamyon watch-only, signing, received va queued holatlarini ajratadi.", "Claim uchun ilovadan foydalaning, vault tekshiruvi uchun bu yerga qayting."], openApp: "Ilova yo'nalishini ochish", openVault: "AirdropVault-ni ochish" },
    waveSchedule: { ...airdropContentEn.sections.waveSchedule, eyebrow: "To'lqinlar jadvali", title: "Olti qat'iy to'lqin, bitta kontrakt soati", headers: { wave: "To'lqin", cap: "Limit", unlockTime: "Ochilish vaqti", status: "Holat" }, current: "Joriy", unlocked: "Ochilgan", upcoming: "Kelgusi", waveLabel: (wave) => `To'lqin ${wave}` },
    verification: { eyebrow: "Tekshiruv", title: "Kontrakt va operator", body: "Sayt hamyon ishlatadigan vault logikasini o'qiydi: joriy to'lqin, keyingi timestamp, ochilgan balans va vault balansi.", vaultLabel: "AirdropVault", operatorLabel: "Operator" },
    fallback: { eyebrow: "Zaxira rejimi", title: "Yo'nalish tayyor, ammo jonli o'qish muvaffaqiyatsiz", body: "Sahifa haqiqiy AirdropVault-ga ulangan. O'qish tiklanganda to'lqin, balans, kvota va keyingi to'lqin vaqti avtomatik ko'rinadi.", openVault: "AirdropVault-ni ochish", openApp: "Ilova yo'nalishini ochish" },
  },
};

const airdropContentByLocale: Partial<Record<SupportedSiteLocale, AirdropPageContent>> = {
  en: airdropContentEn,
  ru: airdropContentRu,
  uz: airdropContentUz,
};

export function getAirdropPageContent(locale: SupportedSiteLocale) {
  return airdropContentByLocale[locale] ?? airdropContentEn;
}
