import type { SupportedSiteLocale } from "@/lib/site-locale";
import { getGeneratedPageContent } from "../lib/generated-localization";

type HeroStatContent = {
  label: string;
  meta: string;
};

type SimpleCard = {
  eyebrow: string;
  title: string;
  text: string;
};

type BulletCard = SimpleCard & {
  bullets?: string[];
};

export type LiquidityPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    badge: string;
    title: string;
    subtitle: string;
    body: string[];
    rotatingLines: string[];
    primaryCta: string;
    secondaryCta: string;
    ctaNote: string;
    stats: {
      controllerBalance: HeroStatContent;
      nextRelease: HeroStatContent;
      triggerFloor: HeroStatContent;
      cadence: HeroStatContent;
      readFailed: string;
      readRetry: string;
    };
  };
  sections: {
    publicRoute: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
    };
    liveState: {
      eyebrow: string;
      title: string;
      rows: {
        controllerBalance: string;
        latestFunding: string;
        latestFundingAt: string;
        lastExecute: string;
        minBalance: string;
        dailyRelease: string;
        split: string;
        windowState: string;
        nextWindow: string;
        snapshotUpdated: string;
      };
      valueLabels: {
        openNow: string;
        waitForThreshold: string;
      };
      stateLabels: {
        ready: string;
        waiting: string;
        threshold: string;
      };
      note: string;
    };
    triggerModel: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
    };
    latestExecutions: {
      eyebrow: string;
      title: string;
      body: string;
      headers: {
        total: string;
        split: string;
        happened: string;
        day: string;
        source: string;
      };
      empty: string;
      openTx: string;
      note: string;
    };
    reservePath: {
      eyebrow: string;
      title: string;
      intro: string;
      primaryCard: BulletCard;
      secondaryCards: Array<{
        key: string;
        title: string;
        body: string;
      }>;
      note: string;
    };
    verification: {
      eyebrow: string;
      title: string;
      body: string;
      labels: {
        controller: string;
        bootstrapper: string;
        justMoney: string;
        sunV3: string;
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

const liquidityContentEn: LiquidityPageContent = {
  metadata: {
    title: "Public Liquidity Controller",
    description:
      "4TEEN public liquidity controller with live controller balance, public bootstrapper trigger path, reserve visibility, and confirmed execution feed.",
  },
  hero: {
    eyebrow: "Liquidity Controller",
    badge: "Public liquidity controller",
    title: "Public 4TEEN Liquidity Controller",
    subtitle:
      "Automation can wake the route, but any wallet can still pull the bootstrapper when the contract gate is open.",
    body: [
      "This page should not read like a closed ops panel. It should make one thing obvious: controller-side TRX is visible, reserve-side inventory is visible, and the release rules still live on-chain.",
      "If the UTC window is open, the controller is above threshold, and the signing wallet has enough network resources, liquidity can still execute from the wallet even if the automation layer misses a day.",
    ],
    rotatingLines: [
      "PUBLIC TRIGGER. CONTRACT GATE.",
      "AUTOMATION HELPS. CONTRACTS DECIDE.",
      "BOOTSTRAP FIRST. EXECUTE ON-CHAIN.",
    ],
    primaryCta: "Open Wallet Route",
    secondaryCta: "Jump to Live Executions",
    ctaNote:
      "The website is the proof layer. The wallet is the execution surface for manual trigger, resource checks, and final signing.",
    stats: {
      controllerBalance: {
        label: "Controller Balance",
        meta: "TRX currently waiting inside FourteenLiquidityController.",
      },
      nextRelease: {
        label: "Next Release",
        meta: "Projected TRX release when the contract window is valid.",
      },
      triggerFloor: {
        label: "Trigger Floor",
        meta: "Minimum controller balance required before execution is valid.",
      },
      cadence: {
        label: "Cadence",
        meta: "Once per UTC day. The gate is enforced by contract, not by automation.",
      },
      readFailed: "Live liquidity read failed.",
      readRetry: "Try refreshing in a moment.",
    },
  },
  sections: {
    publicRoute: {
      eyebrow: "Public Route",
      title: "Automation is configured. Public execution still belongs to the wallet.",
      intro:
        "The wallet app already carries the automation path, but the more important message is broader than that: this route is still public. A signing wallet can wake the bootstrapper when the contract conditions are already satisfied.",
      mainCard: {
        eyebrow: "Public Liquidity Controller",
        title: "Any wallet can wake the route. The controller still decides whether liquidity actually moves.",
        text:
          "That is the right separation of powers. Automation is allowed to help with timing, but the controller and bootstrapper remain the authority layer. The execution path does not disappear if a bot pauses.",
        bullets: [
          "Direct 4TEEN buys send 90% of purchase TRX into the controller balance.",
          "LiquidityBootstrapper prepares the token side from FourteenVault before the controller executes.",
          "The once-per-UTC-day rule, the minimum balance, the release percentage, and the split stay on-chain.",
        ],
      },
      cards: [
        {
          eyebrow: "Automation",
          title: "The wallet repo already wires the wake-up path",
          text:
            "The mobile flow exposes the liquidity trigger and the automation helper together. That makes the scheduler visible, but it does not turn the scheduler into a hidden operator.",
        },
        {
          eyebrow: "Manual trigger",
          title: "If automation misses, a user can still sign the route manually",
          text:
            "The wallet can call bootstrapAndExecute() from a normal user session. If the gate is open and resources are available, liquidity still goes through.",
        },
      ],
      note:
        "This is why the page should speak about a public controller, not about a private back office. The route survives beyond the automation layer.",
    },
    liveState: {
      eyebrow: "Live Controller State",
      title: "What the controller says right now",
      rows: {
        controllerBalance: "Controller Balance",
        latestFunding: "Latest Funding",
        latestFundingAt: "Latest Funding At",
        lastExecute: "Last Execute",
        minBalance: "Min Balance",
        dailyRelease: "Daily Release",
        split: "Target Split",
        windowState: "Window State",
        nextWindow: "Next Window",
        snapshotUpdated: "Snapshot Updated",
      },
      valueLabels: {
        openNow: "Open now",
        waitForThreshold: "Wait for funding",
      },
      stateLabels: {
        ready: "Ready now",
        waiting: "Already executed today",
        threshold: "Below threshold",
      },
      note:
        "The snapshot is useful because it separates moving parts cleanly: controller TRX, funding cadence, release size, threshold, and time gate all stay visible at once.",
    },
    triggerModel: {
      eyebrow: "Trigger Model",
      title: "What actually happens when someone taps Trigger Liquidity",
      intro:
        "The route is simple when stated honestly: first the bootstrapper checks the day gate and tops up executor inventory, then the controller releases TRX, then the two market paths receive their split.",
      mainCard: {
        eyebrow: "bootstrapAndExecute()",
        title: "The trigger path is public, resource-aware, and still ruled by contracts.",
        text:
          "This is not a fake admin button. The wallet has to satisfy normal network conditions, and the route only continues if the same controller rules still pass at execution time.",
        bullets: [
          "Step 1: bootstrapper checks the controller window and computes the allowed release size.",
          "Step 2: bootstrapper tops up executor-side 4TEEN from FourteenVault before the market-side leg runs.",
          "Step 3: controller executes the release and splits flow 50 / 50 across JustMoney and Sun.io V3.",
        ],
      },
      cards: [
        {
          eyebrow: "Resources",
          title: "A normal wallet can cover the route with rent or preloaded energy",
          text:
            "The app already frames this as a resource-aware action. The point is not a hidden server key. The point is that a public wallet can still finish the route cleanly.",
        },
        {
          eyebrow: "Rule set",
          title: "Scheduler convenience never overrides the contract rule set",
          text:
            "Missing the bot window does not rewrite the cadence. Hitting the button early does not bypass the gate. Contracts still accept or reject the route.",
        },
      ],
      note:
        "That is the right market signal: public trigger, visible reserve prep, deterministic release rule.",
    },
    latestExecutions: {
      eyebrow: "Latest Executions",
      title: "Confirmed liquidity executions from the live feed",
      body:
        "This list stays intentionally tight. It shows the latest confirmed execution rows so a user can verify that the controller is alive without turning the page into a noisy block explorer clone.",
      headers: {
        total: "Total Released",
        split: "Split",
        happened: "Happened",
        day: "UTC Day",
        source: "Source",
      },
      empty: "No confirmed LiquidityExecuted rows are visible yet.",
      openTx: "Open tx",
      note:
        "Each row comes from confirmed LiquidityExecuted(day, totalAmount, amountA, amountB) events.",
    },
    reservePath: {
      eyebrow: "Reserve Path",
      title: "Reserve tokens are inventory, not free circulation",
      intro:
        "Controller-side TRX is only half the route. The token side needs isolated inventory too, and that is why FourteenVault exists before the two execution paths receive their balances.",
      primaryCard: {
        eyebrow: "Reserve layer",
        title: "FourteenVault backs the public liquidity route before market execution begins.",
        text:
          "These 4TEEN balances should be read as reserve-side working inventory. They are not ordinary wallet balances and they should not be framed like freely circulating supply.",
        bullets: [
          "Vault inventory is topped into the bootstrapper path before the controller executes.",
          "JustMoney and Sun.io V3 receive prepared balances only when the route is valid.",
          "Reserve custody, controller TRX, and executor destinations are separate layers of the same engine.",
        ],
      },
      secondaryCards: [
        {
          key: "justmoney",
          title: "JustMoney path",
          body:
            "Executor A takes half of the allowed release and runs the AMM-side liquidity path after its token inventory has been prepared.",
        },
        {
          key: "sun",
          title: "Sun.io V3 path",
          body:
            "Executor B takes the other half and routes it through the concentrated-liquidity path with its own prepared token side.",
        },
      ],
      note:
        "This is why the page should explain a route, not just print one vanity total. Reserve inventory, controller balance, and execution destinations do different jobs.",
    },
    verification: {
      eyebrow: "Verification",
      title: "Open the proof layer",
      body:
        "Jump straight from the story into the rails underneath it: the controller contract, bootstrapper route, executor contracts, and the wallet implementation that exposes both automation and manual trigger.",
      labels: {
        controller: "FourteenLiquidityController",
        bootstrapper: "LiquidityBootstrapper",
        justMoney: "JustMoney executor",
        sunV3: "Sun.io V3 executor",
        contractsRepo: "Contracts repository",
        walletRepo: "Wallet repository",
      },
    },
    cta: {
      eyebrow: "Next Step",
      title: "Open the wallet when you want to wake the route yourself",
      body:
        "The site is where you verify the state. The mobile wallet is where a real user can inspect resources, call the bootstrapper, and sign the route if the controller gate is already open.",
      openApp: "Open Liquidity in App",
      openBuy: "Open Buy Route",
    },
  },
};

const liquidityContentRu: LiquidityPageContent = {
  ...liquidityContentEn,
  metadata: {
    title: "Публичный контроллер ликвидности",
    description:
      "Публичный контроллер ликвидности 4TEEN: баланс контроллера, запуск bootstrapper из кошелька, видимость резерва и подтвержденные исполнения.",
  },
  hero: {
    ...liquidityContentEn.hero,
    eyebrow: "Контроллер ликвидности",
    badge: "Публичный контроллер ликвидности",
    title: "Публичный контроллер ликвидности 4TEEN",
    subtitle:
      "Автоматизация может разбудить маршрут, но любой кошелек все еще может вызвать bootstrapper, когда контрактное условие открыто.",
    body: [
      "Это не закрытая операционная панель. TRX в контроллере виден, резервный инвентарь виден, а правила выпуска остаются в контракте.",
      "Если UTC-окно открыто, контроллер выше порога, а у кошелька есть сетевые ресурсы, ликвидность может быть исполнена вручную даже при пропущенном запуске автоматизации.",
    ],
    rotatingLines: [
      "ПУБЛИЧНЫЙ ТРИГГЕР. КОНТРАКТНЫЙ ГЕЙТ.",
      "АВТОМАТИЗАЦИЯ ПОМОГАЕТ. РЕШАЮТ КОНТРАКТЫ.",
      "СНАЧАЛА BOOTSTRAP. ЗАТЕМ ON-CHAIN ИСПОЛНЕНИЕ.",
    ],
    primaryCta: "Открыть маршрут в кошельке",
    secondaryCta: "К последним исполнениям",
    ctaNote:
      "Сайт служит слоем проверки. Кошелек исполняет ручной триггер, проверку ресурсов и подпись.",
    stats: {
      controllerBalance: { label: "Баланс контроллера", meta: "TRX, который сейчас ожидает внутри FourteenLiquidityController." },
      nextRelease: { label: "Следующий выпуск", meta: "Расчетный выпуск TRX, когда контрактное окно действительно." },
      triggerFloor: { label: "Порог триггера", meta: "Минимальный баланс контроллера для валидного исполнения." },
      cadence: { label: "Периодичность", meta: "Раз в UTC-день. Гейт задает контракт, а не автоматизация." },
      readFailed: "Не удалось получить живое состояние ликвидности.",
      readRetry: "Попробуйте обновить чуть позже.",
    },
  },
  sections: {
    ...liquidityContentEn.sections,
    publicRoute: {
      eyebrow: "Публичный маршрут",
      title: "Автоматизация настроена. Публичное исполнение все равно принадлежит кошельку.",
      intro:
        "В приложении есть путь автоматизации, но главное шире: маршрут остается публичным. Кошелек с подписью может разбудить bootstrapper, когда контрактные условия уже выполнены.",
      mainCard: {
        eyebrow: "Публичный контроллер ликвидности",
        title: "Любой кошелек может разбудить маршрут. Контроллер все равно решает, двинется ли ликвидность.",
        text:
          "Это правильное разделение полномочий. Автоматизация помогает со временем, но контроллер и bootstrapper остаются слоем власти. Маршрут не исчезает, если бот остановился.",
        bullets: [
          "90% TRX от прямых покупок 4TEEN попадает в баланс контроллера.",
          "LiquidityBootstrapper готовит токенную сторону из FourteenVault до исполнения контроллера.",
          "Ограничение раз в UTC-день, минимум баланса, процент выпуска и сплит остаются on-chain.",
        ],
      },
      cards: [
        { eyebrow: "Автоматизация", title: "В репозитории кошелька уже есть путь запуска", text: "Мобильный сценарий показывает триггер ликвидности и помощник автоматизации. Это не превращает планировщик в скрытого оператора." },
        { eyebrow: "Ручной запуск", title: "Если автоматизация пропустила окно, пользователь все еще может подписать маршрут", text: "Кошелек вызывает bootstrapAndExecute() из обычной пользовательской сессии. Если гейт открыт и есть ресурсы, ликвидность пройдет." },
      ],
      note: "Поэтому эта страница говорит о публичном контроллере, а не о приватном бэкофисе. Маршрут переживает слой автоматизации.",
    },
    liveState: {
      eyebrow: "Живое состояние контроллера",
      title: "Что контроллер говорит прямо сейчас",
      rows: {
        controllerBalance: "Баланс контроллера", latestFunding: "Последнее пополнение", latestFundingAt: "Время пополнения", lastExecute: "Последнее исполнение", minBalance: "Мин. баланс", dailyRelease: "Дневной выпуск", split: "Целевой сплит", windowState: "Состояние окна", nextWindow: "Следующее окно", snapshotUpdated: "Snapshot обновлен",
      },
      valueLabels: { openNow: "Открыто сейчас", waitForThreshold: "Ожидание пополнения" },
      stateLabels: { ready: "Готово сейчас", waiting: "Сегодня уже исполнено", threshold: "Ниже порога" },
      note: "Snapshot раздельно показывает TRX контроллера, период пополнений, объем выпуска, порог и временной гейт.",
    },
    triggerModel: {
      eyebrow: "Модель запуска",
      title: "Что происходит, когда кто-то нажимает Trigger Liquidity",
      intro:
        "Маршрут простой: bootstrapper проверяет дневной гейт и готовит инвентарь исполнителей, контроллер выпускает TRX, а два рыночных пути получают свой сплит.",
      mainCard: {
        eyebrow: "bootstrapAndExecute()",
        title: "Путь запуска публичный, учитывает ресурсы и все еще подчиняется контрактам.",
        text:
          "Это не декоративная админ-кнопка. Кошелек должен удовлетворить обычным сетевым условиям, а маршрут продолжается, только если правила контроллера снова проходят в момент исполнения.",
        bullets: [
          "Шаг 1: bootstrapper проверяет окно контроллера и рассчитывает разрешенный выпуск.",
          "Шаг 2: bootstrapper пополняет 4TEEN исполнителей из FourteenVault.",
          "Шаг 3: контроллер исполняет выпуск и делит поток 50 / 50 между JustMoney и Sun.io V3.",
        ],
      },
      cards: liquidityContentEn.sections.triggerModel.cards,
      note: "Это правильный рыночный сигнал: публичный триггер, видимая подготовка резерва, детерминированное правило выпуска.",
    },
    latestExecutions: {
      ...liquidityContentEn.sections.latestExecutions,
      eyebrow: "Последние исполнения", title: "Подтвержденные исполнения ликвидности из живой ленты", body: "Список намеренно компактный: он показывает последние подтвержденные строки, чтобы проверить жизнь контроллера без шумной копии блок-эксплорера.",
      headers: { total: "Всего выпущено", split: "Сплит", happened: "Время", day: "UTC-день", source: "Источник" },
      empty: "Подтвержденные LiquidityExecuted пока не видны.", openTx: "Открыть tx", note: "Каждая строка приходит из подтвержденных событий LiquidityExecuted(day, totalAmount, amountA, amountB).",
    },
    cta: { eyebrow: "Следующий шаг", title: "Откройте кошелек, когда захотите разбудить маршрут сами", body: "Сайт нужен для проверки состояния. В мобильном кошельке можно проверить ресурсы, вызвать bootstrapper и подписать маршрут, если контрактный гейт открыт.", openApp: "Открыть ликвидность в приложении", openBuy: "Открыть покупку" },
  },
};

const liquidityContentUz: LiquidityPageContent = {
  ...liquidityContentEn,
  metadata: { title: "Ommaviy likvidlik kontrolleri", description: "4TEEN ommaviy likvidlik kontrolleri: kontroller balansi, hamyon orqali bootstrapper ishga tushirishi, rezerv ko'rinishi va tasdiqlangan ijrolar." },
  hero: {
    ...liquidityContentEn.hero,
    eyebrow: "Likvidlik kontrolleri", badge: "Ommaviy likvidlik kontrolleri", title: "4TEEN ommaviy likvidlik kontrolleri",
    subtitle: "Avtomatlashtirish yo'nalishni uyg'otishi mumkin, ammo kontrakt geyi ochiq bo'lsa istalgan hamyon bootstrapper-ni chaqira oladi.",
    body: ["Bu yopiq operatsion panel emas. Kontrollerdagi TRX ham, rezerv inventari ham ko'rinadi, chiqarish qoidalari esa kontraktda qoladi.", "UTC oynasi ochiq bo'lsa, kontroller chegaradan yuqori va hamyonda tarmoq resurslari yetarli bo'lsa, likvidlik qo'lda ham bajariladi."],
    rotatingLines: ["OMMAVIY TRIGGER. KONTRAKT GEYTI.", "AVTOMATLASHTIRISH YORDAM BERADI. KONTRAKTLAR HAL QILADI."],
    primaryCta: "Hamyon yo'nalishini ochish", secondaryCta: "So'nggi ijrolarga o'tish", ctaNote: "Sayt tekshiruv qatlami. Hamyon qo'lda trigger, resurs tekshiruvi va imzo uchun ishlatiladi.",
    stats: {
      controllerBalance: { label: "Kontroller balansi", meta: "FourteenLiquidityController ichida kutayotgan TRX." },
      nextRelease: { label: "Keyingi chiqarish", meta: "Kontrakt oynasi yaroqli bo'lganda hisoblangan TRX chiqarishi." },
      triggerFloor: { label: "Trigger chegarasi", meta: "Ijro yaroqli bo'lishi uchun minimal kontroller balansi." },
      cadence: { label: "Davriylik", meta: "Har UTC kunida bir marta. Geytni avtomatlashtirish emas, kontrakt belgilaydi." },
      readFailed: "Jonli likvidlik ma'lumotlarini olib bo'lmadi.", readRetry: "Birozdan keyin yangilang.",
    },
  },
  sections: {
    ...liquidityContentEn.sections,
    publicRoute: {
      eyebrow: "Ommaviy yo'nalish", title: "Avtomatlashtirish sozlangan. Ommaviy ijro hamyonga tegishli.", intro: "Ilovada avtomatlashtirish yo'li bor, ammo asosiy qoida kengroq: yo'nalish ommaviyligicha qoladi. Imzolovchi hamyon kontrakt shartlari bajarilganda bootstrapper-ni uyg'ota oladi.",
      mainCard: { eyebrow: "Ommaviy likvidlik kontrolleri", title: "Istalgan hamyon yo'nalishni uyg'ota oladi. Likvidlik harakatlanishini kontroller hal qiladi.", text: "Avtomatlashtirish vaqtga yordam beradi, ammo kontroller va bootstrapper vakolat qatlami bo'lib qoladi. Bot to'xtasa ham yo'nalish yo'qolmaydi.", bullets: ["To'g'ridan-to'g'ri 4TEEN xaridlaridagi TRXning 90 foizi kontroller balansiga o'tadi.", "LiquidityBootstrapper ijrodan oldin FourteenVault-dan token tomonini tayyorlaydi.", "UTC kunlik qoida, minimal balans, chiqarish foizi va split on-chain qoladi."] },
      cards: [{ eyebrow: "Avtomatlashtirish", title: "Hamyon repozitoriyasida uyg'otish yo'li bor", text: "Mobil oqim likvidlik triggeri va avtomatlashtirish yordamchisini ko'rsatadi." }, { eyebrow: "Qo'lda trigger", title: "Avtomatlashtirish o'tkazib yuborsa ham foydalanuvchi yo'nalishni imzolashi mumkin", text: "Hamyon oddiy sessiyada bootstrapAndExecute() chaqiradi. Geyt ochiq va resurslar bo'lsa likvidlik o'tadi." }],
      note: "Bu ommaviy kontroller, xususiy bэkofis emas. Yo'nalish avtomatlashtirish qatlamidan mustaqil yashaydi.",
    },
    liveState: {
      eyebrow: "Kontrollerning jonli holati", title: "Kontroller hozir nima deydi", rows: { controllerBalance: "Kontroller balansi", latestFunding: "Oxirgi to'ldirish", latestFundingAt: "To'ldirish vaqti", lastExecute: "Oxirgi ijro", minBalance: "Min. balans", dailyRelease: "Kunlik chiqarish", split: "Maqsadli split", windowState: "Oyna holati", nextWindow: "Keyingi oyna", snapshotUpdated: "Snapshot yangilandi" }, valueLabels: { openNow: "Hozir ochiq", waitForThreshold: "To'ldirishni kutish" }, stateLabels: { ready: "Hozir tayyor", waiting: "Bugun allaqachon bajarilgan", threshold: "Chegaradan past" }, note: "Snapshot kontroller TRX, to'ldirish davri, chiqarish hajmi, chegara va vaqt geytini alohida ko'rsatadi.",
    },
    triggerModel: {
      eyebrow: "Trigger modeli", title: "Kimdir Trigger Liquidity-ni bosganda nima bo'ladi", intro: "Bootstrapper kunlik geytni tekshiradi va ijro inventarini tayyorlaydi, kontroller TRX chiqaradi, so'ng ikki bozor yo'liga split beriladi.", mainCard: { eyebrow: "bootstrapAndExecute()", title: "Trigger yo'li ommaviy, resurslarni hisobga oladi va kontraktlarga bo'ysunadi.", text: "Bu soxta admin tugmasi emas. Hamyon normal tarmoq shartlarini qondirishi kerak va ijro paytida qoidalar yana o'tishi lozim.", bullets: ["1-qadam: ruxsat etilgan chiqarish hajmi hisoblanadi.", "2-qadam: FourteenVault-dan 4TEEN ijrochilariga tayyorlanadi.", "3-qadam: oqim JustMoney va Sun.io V3 o'rtasida 50 / 50 bo'linadi."] }, cards: liquidityContentEn.sections.triggerModel.cards, note: "Ommaviy trigger, ko'rinadigan rezerv tayyorlovi, qat'iy chiqarish qoidasi.",
    },
    latestExecutions: { ...liquidityContentEn.sections.latestExecutions, eyebrow: "So'nggi ijrolar", title: "Jonli lentadagi tasdiqlangan likvidlik ijrolari", body: "Kompakt ro'yxat kontrollerning ishlayotganini ko'rsatadi.", headers: { total: "Jami chiqarilgan", split: "Split", happened: "Vaqt", day: "UTC kuni", source: "Manba" }, empty: "Tasdiqlangan LiquidityExecuted qatorlari hali ko'rinmayapti.", openTx: "Tx ochish", note: "Har qator tasdiqlangan LiquidityExecuted voqeasidan keladi." },
    cta: { eyebrow: "Keyingi qadam", title: "Yo'nalishni o'zingiz uyg'otmoqchi bo'lsangiz hamyonni oching", body: "Sayt holatni tekshiradi. Mobil hamyon resurslarni tekshiradi, bootstrapper-ni chaqiradi va geyi ochiq bo'lsa imzo qo'yadi.", openApp: "Ilovada likvidlikni ochish", openBuy: "Xaridni ochish" },
  },
};

const liquidityContentByLocale: Partial<
  Record<SupportedSiteLocale, LiquidityPageContent>
> = {
  en: liquidityContentEn,
  ru: liquidityContentRu,
  uz: liquidityContentUz,
};

export function getLiquidityPageContent(locale: SupportedSiteLocale) {
  return getGeneratedPageContent(
    locale,
    "liquidity",
    liquidityContentByLocale[locale] ?? liquidityContentEn,
  );
}
