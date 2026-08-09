import type { SupportedSiteLocale } from "@/lib/site-locale";

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

export type SwapPageContent = {
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
      sampleAmount: HeroStatContent;
      supportedTargets: HeroStatContent;
      protectedRemainder: HeroStatContent;
      routerState: HeroStatContent;
      readFailed: string;
      readRetry: string;
      states: {
        live: string;
        partial: string;
        offline: string;
      };
    };
  };
  sections: {
    tokenUniverse: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
    };
    liveRoutes: {
      eyebrow: string;
      title: string;
      body: string;
      labels: {
        route: string;
        execution: string;
        impact: string;
        targets: string;
        updated: string;
        state: string;
      };
      transfers: {
        eyebrow: string;
        title: string;
        empty: string;
        note: string;
        labels: {
          direction: string;
          counterparty: string;
          amount: string;
          updated: string;
          tx: string;
        };
        states: {
          routerIn: string;
          routerOut: string;
          related: string;
        };
      };
      states: {
        executable: string;
        reviewOnly: string;
      };
      empty: string;
      note: string;
    };
    reviewLayer: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
    };
    verification: {
      eyebrow: string;
      title: string;
      body: string;
      labels: {
        router: string;
        token: string;
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

const swapContentEn: SwapPageContent = {
  metadata: {
    title: "Swap",
    description:
      "4TEEN swap route with broad wallet token coverage, ranked routes, minimum-receive protection, approval review, and live public route samples.",
  },
  hero: {
    eyebrow: "Swap Route",
    badge: "Wallet-first swap route",
    title: "Swap 4TEEN Into a Broader TRON Token Universe",
    subtitle:
      "The site only shows anchor samples. The wallet already searches a much wider token universe, ranks routes, and takes the user through approve, review, and swap.",
    body: [
      "This page should not read like 4TEEN only swaps into one or two house tokens. In the wallet, the target set is pulled from sendable assets, custom token catalog, and the Tronscan token list, then filtered by whether routing actually exists.",
      "That means the route is broader than the public website preview. If liquidity exists and the router can quote it, the wallet can surface it, rank it, and move the user into a real confirmation step.",
    ],
    rotatingLines: [
      "BROAD TOKEN UNIVERSE. RANKED ROUTES.",
      "PREVIEW ON SITE. EXECUTION IN WALLET.",
      "MIN OUT. APPROVE. SWAP.",
    ],
    primaryCta: "Open Wallet Route",
    secondaryCta: "Jump to Live Route Samples",
    ctaNote:
      "The site is the proof layer. The wallet is where token switching, route ranking, minimum-receive protection, allowance checks, and final signing actually happen.",
    stats: {
      sampleAmount: {
        label: "Sample Quote Size",
        meta: "Public route samples refresh against the same 4TEEN amount.",
      },
      supportedTargets: {
        label: "Public Sample Routes",
        meta: "The website keeps only a tiny anchor set public. The wallet can browse far more targets when routes exist.",
      },
      protectedRemainder: {
        label: "Protected Remainder",
        meta: "The wallet keeps a minimal 4TEEN remainder instead of flattening the balance to zero.",
      },
      routerState: {
        label: "Router State",
        meta: "Fast signal for whether public route sampling is fully responding right now.",
      },
      readFailed: "Live swap routing read failed.",
      readRetry: "Try refreshing in a moment.",
      states: {
        live: "Live",
        partial: "Partial",
        offline: "Offline",
      },
    },
  },
  sections: {
    tokenUniverse: {
      eyebrow: "Token Universe",
      title: "The wallet is not boxed into two promotional targets.",
      intro:
        "The public site deliberately keeps the story small. The wallet does the opposite: it merges sendable wallet assets, custom token catalog entries, and the Tronscan token list, then lets routing determine what is actually swappable.",
      mainCard: {
        eyebrow: "Broad target access",
        title: "If the router can quote it, the wallet can usually surface it.",
        text:
          "That is the important distinction. The website preview is intentionally narrow. The wallet is where target switching becomes real because it can pull a wider token universe and test it directly against the routing layer.",
        bullets: [
          "Sendable wallet balances can become source assets.",
          "Custom catalog entries and Tronscan token list expand the target set far beyond TRX and USDT.",
          "Routes are still filtered by whether real quoting exists, so the interface stays honest instead of pretending every token is liquid.",
        ],
      },
      cards: [
        {
          eyebrow: "Target switching",
          title: "The user can change both source and receive asset in the wallet",
          text:
            "The mobile flow is not frozen around one pair. It supports asset switching before quotes are requested, which is why the swap route should be framed as a broader market utility.",
        },
        {
          eyebrow: "Route ranking",
          title: "Routes are sorted by output, not by a hard-coded preference",
          text:
            "Available routes are ranked from better output to worse output, with executable routes prioritized first. The user sees what actually wins instead of one opaque path.",
        },
      ],
      note:
        "So the right product message is not “swap into TRX or USDT.” The right message is “the wallet can search across a much wider target universe when routing is available.”",
    },
    liveRoutes: {
      eyebrow: "Live Route Samples",
      title: "A small public window into the routing engine",
      body:
        "These cards stay intentionally narrow. They show only a couple of anchor samples so the site can prove the engine is alive without pretending to be the whole swap product.",
      labels: {
        route: "Route",
        execution: "Execution",
        impact: "Impact",
        targets: "Targets",
        updated: "Updated",
        state: "State",
      },
      transfers: {
        eyebrow: "Latest Router Transfers",
        title: "Recent confirmed 4TEEN movement touching the public router",
        empty: "No recent 4TEEN router transfers are cached right now.",
        note:
          "This list is loaded through the backend snapshot layer, cached in our database, and served stale-safe when the upstream explorer is noisy.",
        labels: {
          direction: "Direction",
          counterparty: "Counterparty",
          amount: "Amount",
          updated: "Updated",
          tx: "Tx",
        },
        states: {
          routerIn: "Router received",
          routerOut: "Router sent",
          related: "Router-related",
        },
      },
      states: {
        executable: "Executable route",
        reviewOnly: "Review-only route",
      },
      empty: "No public route sample is available right now.",
      note:
        "Inside the wallet, target switching and route ranking happen against a much wider token universe. The website keeps only a compact public sample visible.",
    },
    reviewLayer: {
      eyebrow: "Review Layer",
      title: "The wallet does not jump straight into swap. It builds a controlled review first.",
      intro:
        "The most important part of the route is not the marketing screenshot. It is the controlled handoff between quote preview and final execution: protected minimum, approval state, network resource picture, and the final signature step.",
      mainCard: {
        eyebrow: "Approve & swap",
        title: "Minimum out, approval, and resource review are all part of the route before anything is sent.",
        text:
          "A route can be visible and still not be executable yet. That is healthy behavior. The wallet waits until approval state, route validity, and resource readiness all line up before it offers the final action.",
        bullets: [
          "Slippage protects the minimum amount received before the swap leaves the wallet.",
          "Approval is checked first when the allowance is missing.",
          "Energy and bandwidth costs are surfaced before the final confirmation step.",
        ],
      },
      cards: [
        {
          eyebrow: "Resource rent",
          title: "The route can steer the user into rent-first execution when it is cheaper",
          text:
            "The wallet already frames save-resources logic as part of the flow. That keeps execution practical instead of letting users discover burn costs only after they sign.",
        },
        {
          eyebrow: "Protected dust",
          title: "A tiny 4TEEN remainder stays behind on purpose",
          text:
            "The protected remainder avoids brittle zero-balance edge cases and makes later route handling calmer. It is a small rule, but it is a good wallet rule.",
        },
      ],
      note:
        "That is what makes the product feel serious: broad token discovery on the front, controlled execution discipline on the back.",
    },
    verification: {
      eyebrow: "Verification",
      title: "Where this route story comes from",
      body:
        "This page follows the real wallet implementation: target switching, wider token catalog loading, quote ranking, minimum-receive protection, approval checks, and final execution through the router layer behind the app.",
      labels: {
        router: "Smart router",
        token: "4TEEN token",
        walletRepo: "Wallet repository",
      },
    },
    cta: {
      eyebrow: "Open The Real Route",
      title: "Open the wallet when you want the full route map",
      body:
        "The website should make the swap opportunity understandable. The mobile wallet is where the broader token universe, ranked routes, approval review, protected minimum, and final signature all come together.",
      openApp: "Open Mobile App",
      openBuy: "Open Buy Route",
    },
  },
};

const swapContentRu: SwapPageContent = {
  ...swapContentEn,
  metadata: { title: "Обмен", description: "Маршрут обмена 4TEEN с широким выбором токенов в кошельке, ранжированием маршрутов, защитой минимального результата, проверкой approve и живыми примерами." },
  hero: {
    ...swapContentEn.hero,
    eyebrow: "Маршрут обмена", badge: "Обмен из кошелька", title: "Обменивайте 4TEEN в более широкий мир токенов TRON",
    subtitle: "Сайт показывает только опорные примеры. Кошелек ищет значительно больше токенов, ранжирует маршруты и проводит пользователя через approve, review и swap.",
    body: ["Это не обмен только в одну-две внутренние монеты. В кошельке цели собираются из доступных активов, собственного каталога и списка токенов Tronscan, а затем фильтруются по реально существующей маршрутизации.", "Если есть ликвидность и роутер может дать котировку, кошелек показывает маршрут, ранжирует его и переводит пользователя к реальному подтверждению."],
    rotatingLines: ["ШИРОКИЙ НАБОР ТОКЕНОВ. РАНЖИРОВАННЫЕ МАРШРУТЫ.", "ПРЕВЬЮ НА САЙТЕ. ИСПОЛНЕНИЕ В КОШЕЛЬКЕ.", "MIN OUT. APPROVE. SWAP."],
    primaryCta: "Открыть маршрут в кошельке", secondaryCta: "К живым примерам маршрутов", ctaNote: "Сайт - слой проверки. Переключение токенов, ранжирование, защита min-receive, allowance и подпись происходят в кошельке.",
    stats: {
      sampleAmount: { label: "Размер примера", meta: "Публичные примеры маршрутов обновляются для одинакового объема 4TEEN." },
      supportedTargets: { label: "Публичные примеры", meta: "Сайт показывает лишь небольшой якорный набор. В кошельке доступно значительно больше целей, когда существуют маршруты." },
      protectedRemainder: { label: "Защищенный остаток", meta: "Кошелек сохраняет минимальный остаток 4TEEN, а не обнуляет баланс полностью." },
      routerState: { label: "Состояние роутера", meta: "Быстрый сигнал, полностью ли отвечает публичная выборка маршрутов сейчас." },
      readFailed: "Не удалось получить живую маршрутизацию обмена.", readRetry: "Попробуйте обновить чуть позже.",
      states: { live: "Онлайн", partial: "Частично", offline: "Недоступно" },
    },
  },
  sections: {
    ...swapContentEn.sections,
    tokenUniverse: {
      eyebrow: "Набор токенов", title: "Кошелек не ограничен двумя рекламными целями.", intro: "Публичный сайт намеренно держит историю компактной. Кошелек делает наоборот: объединяет доступные активы, записи собственного каталога и список токенов Tronscan, а затем позволяет маршрутизации определить, что реально можно обменять.",
      mainCard: { eyebrow: "Широкий доступ", title: "Если роутер может дать котировку, кошелек обычно может показать этот актив.", text: "В этом важное отличие. Превью на сайте узкое намеренно. Кошелек делает переключение цели реальным: он подгружает широкий набор токенов и тестирует его напрямую через слой маршрутизации.", bullets: ["Доступные к отправке балансы могут стать исходными активами.", "Собственный каталог и список Tronscan расширяют цели далеко за пределы TRX и USDT.", "Маршруты фильтруются по реальному наличию котировки, поэтому интерфейс не притворяется, что ликвиден каждый токен."] },
      cards: [{ eyebrow: "Переключение целей", title: "В кошельке можно менять и исходный, и получаемый актив", text: "Мобильный сценарий не привязан к одной паре: активы меняются до запроса котировки, поэтому swap - это рыночная утилита, а не один фиксированный экран." }, { eyebrow: "Ранжирование", title: "Маршруты сортируются по результату, а не по жестко заданному предпочтению", text: "Доступные маршруты ранжируются от лучшего output к худшему, а исполнимые ставятся первыми. Пользователь видит победителя, а не один непрозрачный путь." }],
      note: "Правильное сообщение не «обмен в TRX или USDT», а «кошелек ищет более широкий набор целей, когда доступна маршрутизация».",
    },
    liveRoutes: {
      ...swapContentEn.sections.liveRoutes,
      eyebrow: "Живые примеры маршрутов", title: "Небольшое публичное окно в движок маршрутизации", body: "Карточки намеренно компактны: они доказывают, что движок жив, но не выдают сайт за весь swap-продукт.",
      labels: { route: "Маршрут", execution: "Исполнение", impact: "Влияние", targets: "Цели", updated: "Обновлено", state: "Состояние" },
      transfers: { eyebrow: "Последние переводы роутера", title: "Недавнее подтвержденное движение 4TEEN через публичный роутер", empty: "Недавние переводы 4TEEN через роутер сейчас не сохранены.", note: "Список загружается через backend snapshot-слой, кэшируется в нашей базе и безопасно отдает последние данные, если explorer шумит.", labels: { direction: "Направление", counterparty: "Контрагент", amount: "Сумма", updated: "Обновлено", tx: "Tx" }, states: { routerIn: "Роутер получил", routerOut: "Роутер отправил", related: "Связано с роутером" } },
      states: { executable: "Исполнимый маршрут", reviewOnly: "Только review" }, empty: "Публичный пример маршрута сейчас недоступен.", note: "В кошельке выбор цели и ранжирование работают на более широком наборе токенов. Сайт держит видимым только компактный пример.",
    },
    reviewLayer: {
      eyebrow: "Слой проверки", title: "Кошелек не прыгает сразу в swap. Сначала он собирает контролируемый review.", intro: "Главное не маркетинговый скрин. Главное - управляемая передача от предпросмотра котировки к исполнению: защищенный минимум, approve, картина сетевых ресурсов и финальная подпись.",
      mainCard: { eyebrow: "Approve и swap", title: "Минимальный результат, approve и проверка ресурсов - часть маршрута до отправки.", text: "Маршрут может быть виден, но еще не исполним. Это здоровое поведение. Кошелек ждет совпадения allowance, валидности маршрута и готовности ресурсов, прежде чем дает финальное действие.", bullets: ["Slippage защищает минимально получаемую сумму до отправки swap.", "При нехватке allowance сначала проверяется approve.", "Затраты Energy и Bandwidth видны до финального подтверждения."] },
      cards: [{ eyebrow: "Аренда ресурсов", title: "При выгоде маршрут может сначала предложить аренду", text: "Логика экономии ресурсов встроена в поток: пользователь не узнает о сжигании TRX уже после подписи." }, { eyebrow: "Защищенная пыль", title: "Небольшой остаток 4TEEN остается специально", text: "Этот остаток исключает хрупкие edge cases нулевого баланса и делает дальнейшие сценарии спокойнее." }],
      note: "Именно так продукт выглядит серьезно: широкий поиск токенов на входе, дисциплина исполнения на выходе.",
    },
    verification: { eyebrow: "Проверка", title: "Откуда взята эта логика", body: "Страница следует реальной реализации кошелька: переключение целей, загрузка каталога токенов, ранжирование котировок, защита минимального получения, проверка approve и финальное исполнение через роутер.", labels: { router: "Смарт-роутер", token: "Токен 4TEEN", walletRepo: "Репозиторий кошелька" } },
    cta: { eyebrow: "Открыть реальный маршрут", title: "Откройте кошелек, когда нужна полная карта маршрутов", body: "Сайт объясняет возможность обмена. В мобильном кошельке соединяются широкий набор токенов, ранжированные маршруты, проверка approve, защищенный минимум и финальная подпись.", openApp: "Открыть мобильное приложение", openBuy: "Открыть покупку" },
  },
};

const swapContentUz: SwapPageContent = {
  ...swapContentEn,
  metadata: { title: "Almashuv", description: "4TEEN almashuv yo'nalishi: hamyondagi keng token qamrovi, yo'nalishlarni reytinglash, minimal natija himoyasi, approve tekshiruvi va jonli namunalar." },
  hero: {
    ...swapContentEn.hero,
    eyebrow: "Almashuv yo'nalishi", badge: "Hamyon orqali almashuv", title: "4TEEN-ni kengroq TRON tokenlari olamiga almashtiring", subtitle: "Sayt faqat tayanch namunalarni ko'rsatadi. Hamyon esa ko'proq tokenlarni qidiradi, yo'nalishlarni reytinglaydi va approve, review hamda swap jarayonidan olib o'tadi.",
    body: ["Bu faqat bir-ikki ichki tokenga almashuv emas. Hamyon maqsadlarni mavjud aktivlar, o'z katalogi va Tronscan tokenlar ro'yxatidan oladi, so'ng haqiqiy yo'nalish mavjudligiga qarab filtrlaydi.", "Likvidlik mavjud va router kotirovka bera olsa, hamyon yo'nalishni ko'rsatadi, reytinglaydi va haqiqiy tasdiqlashga o'tkazadi."],
    rotatingLines: ["KENG TOKEN OLAMI. REYTINGLANGAN YO'NALISHLAR.", "SAYTDA PREVIEW. HAMYONDA IJRO.", "MIN OUT. APPROVE. SWAP."], primaryCta: "Hamyon yo'nalishini ochish", secondaryCta: "Jonli namunalar", ctaNote: "Sayt tekshiruv qatlami. Token almashtirish, reyting, min-receive himoyasi, allowance va imzo hamyonda bo'ladi.",
    stats: { sampleAmount: { label: "Namuna miqdori", meta: "Ommaviy yo'nalish namunalari bir xil 4TEEN miqdorida yangilanadi." }, supportedTargets: { label: "Ommaviy namunalar", meta: "Sayt kichik tayanch to'plamni ko'rsatadi; yo'nalish bo'lsa hamyon ko'proq maqsadlarni ko'radi." }, protectedRemainder: { label: "Himoyalangan qoldiq", meta: "Hamyon 4TEEN balansini nolga tushirmay, minimal qoldiq qoldiradi." }, routerState: { label: "Router holati", meta: "Ommaviy namunalar hozir to'liq javob berayotganini tez ko'rsatadi." }, readFailed: "Jonli almashuv yo'nalishini o'qib bo'lmadi.", readRetry: "Birozdan keyin yangilang.", states: { live: "Jonli", partial: "Qisman", offline: "Mavjud emas" } },
  },
  sections: {
    ...swapContentEn.sections,
    tokenUniverse: { eyebrow: "Tokenlar olami", title: "Hamyon ikki reklama maqsadi bilan cheklanmaydi.", intro: "Ommaviy sayt hikoyani kichik tutadi. Hamyon esa jo'natish mumkin bo'lgan aktivlar, katalog va Tronscan ro'yxatini birlashtiradi; so'ng routing nimani almashish mumkinligini belgilaydi.", mainCard: { eyebrow: "Keng maqsadlar", title: "Router kotirovka bera olsa, hamyon odatda tokenni ko'rsatadi.", text: "Sayt previewi ataylab tor. Hamyon keng token olamini yuklaydi va routing qatlami orqali sinaydi.", bullets: ["Jo'natiladigan balanslar manba aktivlarga aylanishi mumkin.", "Katalog va Tronscan ro'yxati TRX hamda USDTdan ancha keng maqsadlarni beradi.", "Yo'nalishlar real kotirovka borligiga qarab filtrlanadi."] }, cards: [{ eyebrow: "Maqsadni almashtirish", title: "Hamyonda manba va qabul qilinadigan aktivni o'zgartirish mumkin", text: "Mobil oqim bitta juftlikka qotib qolmagan." }, { eyebrow: "Reyting", title: "Yo'nalishlar qat'iy tanlov emas, natijaga ko'ra saralanadi", text: "Eng yaxshi output birinchi turadi va foydalanuvchi shaffof natijani ko'radi." }], note: "To'g'ri xabar: routing mavjud bo'lsa, hamyon kengroq maqsadlar olamini qidiradi." },
    liveRoutes: { ...swapContentEn.sections.liveRoutes, eyebrow: "Jonli yo'nalish namunalari", title: "Routing mexanizmiga kichik ommaviy oyna", body: "Kartalar ixcham: ular mexanizm ishlashini isbotlaydi, ammo saytni butun swap mahsuloti qilib ko'rsatmaydi.", labels: { route: "Yo'nalish", execution: "Ijro", impact: "Ta'sir", targets: "Maqsadlar", updated: "Yangilandi", state: "Holat" }, transfers: { eyebrow: "Routerning so'nggi o'tkazmalari", title: "Ommaviy router bilan bog'liq tasdiqlangan 4TEEN harakati", empty: "Hozir router o'tkazmalari keshda yo'q.", note: "Ro'yxat backend snapshot qatlami orqali yuklanadi va ma'lumotlar bazasida keshlanadi.", labels: { direction: "Yo'nalish", counterparty: "Qarshi tomon", amount: "Miqdor", updated: "Yangilandi", tx: "Tx" }, states: { routerIn: "Router qabul qildi", routerOut: "Router yubordi", related: "Router bilan bog'liq" } }, states: { executable: "Ijro qilinadigan yo'nalish", reviewOnly: "Faqat review" }, empty: "Hozir ommaviy yo'nalish namunasi yo'q.", note: "Hamyon maqsadni almashtirish va reytingni kengroq token olamida bajaradi." },
    reviewLayer: { eyebrow: "Review qatlami", title: "Hamyon darhol swap qilmaydi. Avval nazoratli review tuziladi.", intro: "Muhim qism marketing rasmi emas. Kotirovkadan ijroga boshqariladigan o'tish: himoyalangan minimum, approval holati, tarmoq resurslari va yakuniy imzo.", mainCard: { eyebrow: "Approve va swap", title: "Minimal natija, approval va resurslar tekshiruvi yuborishdan oldin bajariladi.", text: "Yo'nalish ko'rinishi mumkin, ammo hali ijro qilinmasligi mumkin. Hamyon allowance, yo'nalish va resurslar tayyor bo'lguncha kutadi.", bullets: ["Slippage eng kam qabul qilinadigan miqdorni himoya qiladi.", "Allowance yetarli bo'lmasa avval approve tekshiriladi.", "Energy va Bandwidth xarajatlari tasdiqlashdan oldin ko'rsatiladi."] }, cards: [{ eyebrow: "Resurs ijarasi", title: "Arzonroq bo'lsa yo'nalish avval ijarani taklif qiladi", text: "Foydalanuvchi TRX burn xarajatini imzodan keyin bilib qolmaydi." }, { eyebrow: "Himoyalangan qoldiq", title: "Kichik 4TEEN qoldig'i ataylab qoladi", text: "Bu nol balans edge case-larini kamaytiradi." }], note: "Keng token izlash va qat'iy ijro intizomi mahsulotni jiddiy qiladi." },
    verification: { eyebrow: "Tekshiruv", title: "Bu yo'nalish qayerdan olinadi", body: "Sahifa hamyonning haqiqiy ishlashiga asoslanadi: maqsadlarni almashtirish, token katalogi, kotirovkalarni reytinglash, minimal qabul qilish himoyasi, approve va router orqali ijro.", labels: { router: "Smart router", token: "4TEEN tokeni", walletRepo: "Hamyon repozitoriyasi" } },
    cta: { eyebrow: "Haqiqiy yo'nalishni ochish", title: "To'liq yo'nalish xaritasi kerak bo'lsa hamyonni oching", body: "Sayt almashuv imkoniyatini tushuntiradi. Keng token olami, reyting, approve, himoyalangan minimum va imzo mobil hamyonda birlashadi.", openApp: "Mobil ilovani ochish", openBuy: "Xaridni ochish" },
  },
};

const swapContentByLocale: Partial<Record<SupportedSiteLocale, SwapPageContent>> = {
  en: swapContentEn,
  ru: swapContentRu,
  uz: swapContentUz,
};

export function getSwapPageContent(locale: SupportedSiteLocale) {
  return swapContentByLocale[locale] ?? swapContentEn;
}
