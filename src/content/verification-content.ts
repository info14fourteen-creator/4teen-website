import type { SupportedSiteLocale } from "@/lib/site-locale";
import { getGeneratedPageContent } from "../lib/generated-localization";

export type VerificationPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    title: string;
    lead: string;
    stats: {
      totalSupply: string;
      totalSupplyMeta: string;
      currentPrice: string;
      currentPriceMeta: string;
      vaultCustody: string;
      vaultCustodyMeta: string;
      controllerBalance: string;
      controllerBalanceMeta: string;
      readFailed: string;
      readRetry: string;
    };
  };
  sections: {
    orientation: {
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      openWhitepaper: string;
      openApp: string;
    };
    tokenMap: {
      eyebrow: string;
      title: string;
      rows: {
        tokenOwner: string;
        liquidityRoute: string;
        airdropRoute: string;
        directPrice: string;
        growthRule: string;
        lastPriceUpdate: string;
        snapshotUpdated: string;
      };
      note: string;
    };
    controllerState: {
      eyebrow: string;
      title: string;
      rows: {
        controllerOwner: string;
        contractBalance: string;
        ownerAvailable: string;
        reservedRewards: string;
        unallocatedPurchaseFunds: string;
        ambassadors: string;
        activeAmbassadors: string;
        boundBuyers: string;
        trackedVolume: string;
        rewardsClaimed: string;
      };
      note: string;
    };
    liquidityState: {
      eyebrow: string;
      title: string;
      rows: {
        controllerBalance: string;
        controllerOwner: string;
        minBalance: string;
        dailyRelease: string;
        justMoneyExecutor: string;
        sunExecutor: string;
      };
      note: string;
    };
    architecture: {
      eyebrow: string;
      title: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
      note: string;
    };
    reserveLayer: {
      eyebrow: string;
      title: string;
      body: string;
      note: string;
      labels: {
        balance: string;
        verify: string;
      };
    };
    verification: {
      eyebrow: string;
      title: string;
      body: string;
      groups: {
        core: string;
        vaults: string;
        execution: string;
        source: string;
      };
      labels: {
        token: string;
        controller: string;
        liquidityController: string;
        bootstrapper: string;
        fourteenVault: string;
        teamLockVault: string;
        airdropVault: string;
        justMoneyExecutor: string;
        sunV3Executor: string;
        contractsRepo: string;
        walletRepo: string;
      };
    };
    cta: {
      eyebrow: string;
      title: string;
      body: string;
      openApp: string;
      openBuy: string;
    };
  };
};

const verificationContentEn: VerificationPageContent = {
  metadata: {
    title: "Verification",
    description:
      "4TEEN verification route with live addresses, reserve balances, protocol ownership map, and direct proof links for deeper research.",
  },
  hero: {
    eyebrow: "Verification Surface",
    status: "Public architecture map",
    title:
      "This is the confidence layer: who owns what, where reserves sit, how value moves, and which public addresses back the project right now.",
    lead:
      "Serious users and investors do not stop at the landing page. This route gives them a fast way to inspect ownership, custody, balances, and contract paths without dropping them into a wall of raw explorer tabs on the first click.",
    stats: {
      totalSupply: "Total Supply",
      totalSupplyMeta: "Current FourteenToken totalSupply on-chain.",
      currentPrice: "Direct Price",
      currentPriceMeta: "Current preview price for buyTokens(), expressed in TRX.",
      vaultCustody: "Vault Custody",
      vaultCustodyMeta: "4TEEN currently parked in FourteenVault, TeamLockVault, and AirdropVault.",
      controllerBalance: "Controller Balance",
      controllerBalanceMeta: "TRX currently sitting inside FourteenController.",
      readFailed: "Live verification read failed.",
      readRetry: "The static architecture map is still valid. Refresh in a moment for current numbers.",
    },
  },
  sections: {
    orientation: {
      eyebrow: "Orientation",
      title: "Use this page to answer two questions quickly",
      body:
        "First: which contract or vault owns a specific protocol job. Second: whether the public state still matches the story the project is telling everywhere else. The page stays read-only on purpose. Its job is confidence, not execution.",
      bullets: [
        "FourteenToken is the buy, mint, lock, and split-entry contract.",
        "FourteenController is the admin and attribution layer, not the token itself.",
        "LiquidityController and LiquidityBootstrapper own the release-and-execution rail.",
        "Vault balances exist on-chain, but reserve custody is not free circulation.",
      ],
      openWhitepaper: "Open Whitepaper",
      openApp: "Open Mobile App",
    },
    tokenMap: {
      eyebrow: "Token Map",
      title: "How the main token is wired right now",
      rows: {
        tokenOwner: "Token Owner",
        liquidityRoute: "Liquidity Route",
        airdropRoute: "Airdrop Route",
        directPrice: "Direct Price",
        growthRule: "Growth Rule",
        lastPriceUpdate: "Last Price Update",
        snapshotUpdated: "Snapshot Updated",
      },
      note:
        "The key detail is the ownership chain. FourteenToken does not sit under a casual owner-wallet story. The owner path resolves into FourteenController, which is why both surfaces belong together here.",
    },
    controllerState: {
      eyebrow: "Controller State",
      title: "What the controller says about attribution and treasury flow",
      rows: {
        controllerOwner: "Controller Owner",
        contractBalance: "Contract Balance",
        ownerAvailable: "Owner Available",
        reservedRewards: "Reserved Rewards",
        unallocatedPurchaseFunds: "Unallocated Purchase Funds",
        ambassadors: "Total Ambassadors",
        activeAmbassadors: "Active Ambassadors",
        boundBuyers: "Bound Buyers",
        trackedVolume: "Tracked Volume",
        rewardsClaimed: "Rewards Claimed",
      },
      note:
        "This is why the controller story matters. It keeps separate public buckets for owner-available funds, reserved rewards, tracked volume, and buyer attribution counts instead of flattening everything into one vanity metric.",
    },
    liquidityState: {
      eyebrow: "Liquidity Rail",
      title: "The execution side is a separate public system",
      rows: {
        controllerBalance: "Liquidity Controller Balance",
        controllerOwner: "Liquidity Controller Owner",
        minBalance: "Minimum Trigger Balance",
        dailyRelease: "Daily Release Rule",
        justMoneyExecutor: "JustMoney Executor",
        sunExecutor: "Sun.io V3 Executor",
      },
      note:
        "Automation can wake the route up, but the release threshold and percentage still live in the contracts. Convenience sits outside the rules, not above them.",
    },
    architecture: {
      eyebrow: "Architecture",
      title: "The protocol is separated into explicit jobs instead of one giant contract",
      cards: [
        {
          eyebrow: "Core",
          title: "FourteenToken",
          text: "Receives direct buy TRX, mints 4TEEN, creates per-purchase 14-day locks, and atomically splits purchase value 90 / 7 / 3.",
        },
        {
          eyebrow: "Admin",
          title: "FourteenController",
          text: "Owns the token layer, holds attribution and reward accounting state, exposes public system summaries, and gates owner-side balance handling.",
        },
        {
          eyebrow: "Execution",
          title: "Liquidity Stack",
          text: "FourteenLiquidityController holds the buy-side TRX rail, while LiquidityBootstrapper prepares token inventory and triggers executor-side liquidity paths.",
        },
        {
          eyebrow: "Custody",
          title: "Vault Separation",
          text: "FourteenVault, TeamLockVault, and AirdropVault isolate reserve balances by purpose, so treasury, team, and growth supply are not flattened into one generic pool.",
        },
      ],
      note:
        "That separation is one of the easiest strengths to verify publicly. Explorer links, repository code, and live balances all point back to the same modular architecture.",
    },
    reserveLayer: {
      eyebrow: "Reserve Layer",
      title: "Live 4TEEN balances across vault and execution addresses",
      body:
        "These balances show where token inventory actually sits. Vault custody is not free circulation, and executor inventory is not a user wallet balance. Keeping them together makes the system readable at a glance.",
      note:
        "Executor balances can move as bootstrap and liquidity flow shift inventory around. Vault balances are the steadier proof layer for reserve custody.",
      labels: {
        balance: "Balance",
        verify: "Verify on Tronscan",
      },
    },
    verification: {
      eyebrow: "Proof Links",
      title: "Open the proof layer directly",
      body:
        "Each group below takes the user straight from the story into the proof layer: contracts, vaults, execution rails, and the repos behind the product.",
      groups: {
        core: "Core contracts",
        vaults: "Vault contracts",
        execution: "Execution contracts",
        source: "Source repositories",
      },
      labels: {
        token: "FourteenToken",
        controller: "FourteenController",
        liquidityController: "FourteenLiquidityController",
        bootstrapper: "LiquidityBootstrapper",
        fourteenVault: "FourteenVault",
        teamLockVault: "TeamLockVault",
        airdropVault: "AirdropVault",
        justMoneyExecutor: "LiquidityExecutorJustMoney",
        sunV3Executor: "LiquidityExecutorSunV3",
        contractsRepo: "Contracts repository",
        walletRepo: "Wallet repository",
      },
    },
    cta: {
      eyebrow: "Next Step",
      title: "Build conviction here, then move in the app",
      body:
        "Use the public route to inspect the system. Use the wallet when you want signing, buy, unlock, swap, airdrop claim, or manual liquidity action with real account state behind it.",
      openApp: "Open Mobile App",
      openBuy: "Open Buy Route",
    },
  },
};

const verificationContentByLocale: Partial<
  Record<SupportedSiteLocale, VerificationPageContent>
> = {
  en: verificationContentEn,
  ru: {
    ...verificationContentEn,
    metadata: { title: "Проверка", description: "Маршрут проверки 4TEEN с живыми адресами, резервными балансами, картой владения и прямыми доказательствами." },
    hero: { eyebrow: "Поверхность проверки", status: "Публичная карта архитектуры", title: "Это слой уверенности: кто чем владеет, где лежат резервы, как движется стоимость и какие публичные адреса поддерживают проект сейчас.", lead: "Серьезные пользователи и инвесторы не останавливаются на лендинге. Здесь можно быстро проверить владение, custody, балансы и контрактные пути без стены вкладок explorer.", stats: { totalSupply: "Общий выпуск", totalSupplyMeta: "Текущий totalSupply FourteenToken on-chain.", currentPrice: "Прямая цена", currentPriceMeta: "Текущая preview-цена buyTokens() в TRX.", vaultCustody: "Хранение vault", vaultCustodyMeta: "4TEEN в FourteenVault, TeamLockVault и AirdropVault.", controllerBalance: "Баланс контроллера", controllerBalanceMeta: "TRX, который сейчас находится внутри FourteenController.", readFailed: "Не удалось получить живое состояние проверки.", readRetry: "Статическая карта архитектуры остается валидной. Обновите позже для текущих цифр." } },
    sections: { ...verificationContentEn.sections, orientation: { eyebrow: "Ориентация", title: "Эта страница быстро отвечает на два вопроса", body: "Во-первых: какой контракт или vault владеет конкретной задачей протокола. Во-вторых: совпадает ли публичное состояние с тем, что проект рассказывает в других местах. Страница намеренно read-only: ее работа - уверенность, не исполнение.", bullets: ["FourteenToken - контракт buy, mint, lock и входного сплита.", "FourteenController - слой администрирования и атрибуции, а не сам токен.", "LiquidityController и LiquidityBootstrapper владеют рельсой выпуска и исполнения.", "Балансы vault находятся on-chain, но резервное custody не равно свободному обращению."], openWhitepaper: "Открыть whitepaper", openApp: "Открыть мобильное приложение" }, tokenMap: { eyebrow: "Карта токена", title: "Как основной токен устроен сейчас", rows: { tokenOwner: "Владелец токена", liquidityRoute: "Маршрут ликвидности", airdropRoute: "Маршрут аирдропа", directPrice: "Прямая цена", growthRule: "Правило роста", lastPriceUpdate: "Последнее обновление цены", snapshotUpdated: "Snapshot обновлен" }, note: "Ключевая деталь - цепочка владения: owner path FourteenToken ведет в FourteenController, поэтому обе поверхности рассматриваются вместе." }, controllerState: { ...verificationContentEn.sections.controllerState, eyebrow: "Состояние контроллера", title: "Что контроллер говорит об атрибуции и treasury flow", rows: { controllerOwner: "Владелец контроллера", contractBalance: "Баланс контракта", ownerAvailable: "Доступно owner", reservedRewards: "Зарезервированные награды", unallocatedPurchaseFunds: "Нераспределенные средства покупок", ambassadors: "Всего амбассадоров", activeAmbassadors: "Активные амбассадоры", boundBuyers: "Привязанные покупатели", trackedVolume: "Учитываемый объем", rewardsClaimed: "Награды выведены" }, note: "Контроллер держит раздельные публичные корзины owner funds, reserved rewards, tracked volume и buyer attribution, а не один vanity metric." }, liquidityState: { ...verificationContentEn.sections.liquidityState, eyebrow: "Рельса ликвидности", title: "Сторона исполнения - отдельная публичная система", rows: { controllerBalance: "Баланс liquidity controller", controllerOwner: "Владелец liquidity controller", minBalance: "Минимальный баланс триггера", dailyRelease: "Правило дневного выпуска", justMoneyExecutor: "Исполнитель JustMoney", sunExecutor: "Исполнитель Sun.io V3" }, note: "Автоматизация может разбудить маршрут, но порог и процент выпуска остаются в контрактах." }, architecture: { ...verificationContentEn.sections.architecture, eyebrow: "Архитектура", title: "Протокол разделен на явные задачи, а не собран в один гигантский контракт", cards: [{ eyebrow: "Ядро", title: "FourteenToken", text: "Принимает TRX прямой покупки, выпускает 4TEEN, создает 14-дневные локи и атомарно делит стоимость 90 / 7 / 3." }, { eyebrow: "Администрирование", title: "FourteenController", text: "Владеет токенным слоем, учитывает атрибуцию и награды, открывает публичные сводки и управляет owner-side балансом." }, { eyebrow: "Исполнение", title: "Стек ликвидности", text: "FourteenLiquidityController держит TRX-рельсу, а LiquidityBootstrapper готовит инвентарь и запускает исполнителей." }, { eyebrow: "Хранение", title: "Разделение vault", text: "FourteenVault, TeamLockVault и AirdropVault отделяют резервы по назначению." }], note: "Explorer links, код репозитория и живые балансы указывают на одну модульную архитектуру." }, reserveLayer: { ...verificationContentEn.sections.reserveLayer, eyebrow: "Слой резервов", title: "Живые балансы 4TEEN на vault и execution адресах", body: "Балансы показывают, где реально лежит инвентарь. Vault custody не является свободным обращением, а executor inventory не является балансом пользовательского кошелька.", note: "Балансы исполнителей двигаются с bootstrap и liquidity flow. Balances vault - более устойчивое доказательство custody.", labels: { balance: "Баланс", verify: "Проверить в Tronscan" } }, verification: { ...verificationContentEn.sections.verification, eyebrow: "Ссылки-доказательства", title: "Откройте слой доказательства напрямую", body: "Каждая группа ведет прямо из истории к контрактам, vault, execution-рельсам и репозиториям продукта.", groups: { core: "Основные контракты", vaults: "Контракты vault", execution: "Контракты исполнения", source: "Исходные репозитории" } }, cta: { eyebrow: "Следующий шаг", title: "Соберите уверенность здесь, затем действуйте в приложении", body: "Публичный маршрут нужен для проверки системы. Кошелек нужен для подписи, buy, unlock, swap, аирдропа и ручного действия ликвидности.", openApp: "Открыть мобильное приложение", openBuy: "Открыть покупку" } },
  },
  uz: {
    ...verificationContentEn,
    metadata: { title: "Tekshiruv", description: "4TEEN tekshiruv yo'nalishi: jonli manzillar, rezerv balanslari, egalik xaritasi va bevosita isbot havolalari." },
    hero: { eyebrow: "Tekshiruv yuzasi", status: "Ommaviy arxitektura xaritasi", title: "Bu ishonch qatlami: kim nimaga egalik qiladi, rezervlar qayerda, qiymat qanday harakatlanadi va qaysi ommaviy manzillar loyihani qo'llab turibdi.", lead: "Jiddiy foydalanuvchi landing sahifasida to'xtamaydi. Bu yo'nalish egalik, custody, balanslar va kontrakt yo'llarini tez tekshirishga yordam beradi.", stats: { totalSupply: "Jami chiqarish", totalSupplyMeta: "FourteenTokenning joriy on-chain totalSupply'i.", currentPrice: "To'g'ridan-to'g'ri narx", currentPriceMeta: "buyTokens() uchun TRXdagi joriy preview narx.", vaultCustody: "Vault custody", vaultCustodyMeta: "FourteenVault, TeamLockVault va AirdropVaultdagi 4TEEN.", controllerBalance: "Kontroller balansi", controllerBalanceMeta: "FourteenController ichidagi TRX.", readFailed: "Jonli tekshiruv ma'lumotini o'qib bo'lmadi.", readRetry: "Statik arxitektura xaritasi yaroqli. Joriy raqamlar uchun keyin yangilang." } },
    sections: { ...verificationContentEn.sections, orientation: { eyebrow: "Yo'nalish", title: "Bu sahifa ikki savolga tez javob beradi", body: "Birinchisi: qaysi kontrakt yoki vault protokol ishiga egalik qiladi. Ikkinchisi: ommaviy holat loyiha hikoyasiga mosmi. Sahifa ataylab read-only: maqsadi ishonch, ijro emas.", bullets: ["FourteenToken buy, mint, lock va kirish split kontrakti.", "FourteenController admin va attribution qatlami, tokenning o'zi emas.", "LiquidityController va LiquidityBootstrapper chiqarish hamda ijro relsiga egalik qiladi.", "Vault balanslari on-chain, ammo rezerv custody erkin muomala emas."], openWhitepaper: "Whitepaper-ni ochish", openApp: "Mobil ilovani ochish" }, tokenMap: { eyebrow: "Token xaritasi", title: "Asosiy token hozir qanday ulangan", rows: { tokenOwner: "Token egasi", liquidityRoute: "Likvidlik yo'nalishi", airdropRoute: "Airdrop yo'nalishi", directPrice: "To'g'ridan-to'g'ri narx", growthRule: "O'sish qoidasi", lastPriceUpdate: "Oxirgi narx yangilanishi", snapshotUpdated: "Snapshot yangilandi" }, note: "Muhim detal - egalik zanjiri: FourteenToken owner path FourteenController-ga boradi." }, controllerState: { ...verificationContentEn.sections.controllerState, eyebrow: "Kontroller holati", title: "Kontroller attribution va treasury flow haqida nima deydi", rows: { controllerOwner: "Kontroller egasi", contractBalance: "Kontrakt balansi", ownerAvailable: "Owner uchun mavjud", reservedRewards: "Rezervdagi mukofotlar", unallocatedPurchaseFunds: "Taqsimlanmagan xarid mablag'lari", ambassadors: "Jami ambassadorlar", activeAmbassadors: "Faol ambassadorlar", boundBuyers: "Bog'langan xaridorlar", trackedVolume: "Kuzatilgan hajm", rewardsClaimed: "Yechilgan mukofotlar" }, note: "Kontroller owner funds, rezerv mukofotlar, hajm va xaridor attributionini alohida ushlab turadi." }, liquidityState: { ...verificationContentEn.sections.liquidityState, eyebrow: "Likvidlik relsi", title: "Ijro tomoni alohida ommaviy tizim", rows: { controllerBalance: "Likvidlik kontrolleri balansi", controllerOwner: "Likvidlik kontrolleri egasi", minBalance: "Minimal trigger balansi", dailyRelease: "Kunlik chiqarish qoidasi", justMoneyExecutor: "JustMoney ijrochisi", sunExecutor: "Sun.io V3 ijrochisi" }, note: "Avtomatlashtirish yo'nalishni uyg'otishi mumkin, ammo chegara va foiz kontraktda qoladi." }, architecture: { ...verificationContentEn.sections.architecture, eyebrow: "Arxitektura", title: "Protokol bitta gigant kontrakt emas, aniq vazifalarga bo'lingan", cards: [{ eyebrow: "Yadro", title: "FourteenToken", text: "TRX buy qabul qiladi, 4TEEN chiqaradi, 14 kunlik bloklar yaratadi va qiymatni 90 / 7 / 3 bo'ladi." }, { eyebrow: "Admin", title: "FourteenController", text: "Token qatlamiga egalik qiladi, attribution va mukofotlarni hisoblaydi." }, { eyebrow: "Ijro", title: "Likvidlik steki", text: "LiquidityController TRX relsini, Bootstrapper token inventarini va ijroni boshqaradi." }, { eyebrow: "Custody", title: "Vault ajratilishi", text: "FourteenVault, TeamLockVault va AirdropVault rezervlarni maqsadiga ko'ra ajratadi." }], note: "Explorer, repozitoriy kodi va jonli balanslar bir xil modulli arxitekturaga qaytadi." }, reserveLayer: { ...verificationContentEn.sections.reserveLayer, eyebrow: "Rezerv qatlami", title: "Vault va ijro manzillaridagi jonli 4TEEN balanslari", body: "Balanslar token inventari qayerda ekanini ko'rsatadi. Vault custody erkin muomala emas, executor inventari foydalanuvchi balansi emas.", note: "Ijro balanslari bootstrap va likvidlik oqimida harakatlanishi mumkin. Vault balanslari custody uchun barqaror isbot.", labels: { balance: "Balans", verify: "Tronscan-da tekshirish" } }, verification: { ...verificationContentEn.sections.verification, eyebrow: "Isbot havolalari", title: "Isbot qatlamini bevosita oching", body: "Har guruh kontraktlar, vaultlar, ijro relslari va repozitoriylarga olib boradi.", groups: { core: "Asosiy kontraktlar", vaults: "Vault kontraktlari", execution: "Ijro kontraktlari", source: "Manba repozitoriylari" } }, cta: { eyebrow: "Keyingi qadam", title: "Ishonchni bu yerda yig'ing, keyin ilovada harakat qiling", body: "Ommaviy yo'nalish tizimni tekshiradi. Hamyon imzo, buy, unlock, swap va boshqa real harakatlar uchun.", openApp: "Mobil ilovani ochish", openBuy: "Xaridni ochish" } },
  },
};

export function getVerificationPageContent(locale: SupportedSiteLocale) {
  return getGeneratedPageContent(
    locale,
    "verification",
    verificationContentByLocale[locale] ?? verificationContentEn,
  );
}
