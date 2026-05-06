import type { SupportedSiteLocale } from "@/lib/site-locale";

export type BuyPageContent = {
  metadata: {
    title: string;
    description: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
  };
  hero: {
    eyebrow: string;
    badge: string;
    title: string;
    subtitle?: string;
    body: string[];
    primaryCta?: string;
    secondaryCta?: string;
    ctaNote?: string;
    rotatingLines?: string[];
    stats: {
      directPrice: string;
      directPriceMeta: string;
      lockRule: string;
      lockRuleValue: string;
      lockRuleMeta: string;
      trxSplit: string;
      trxSplitValue: string;
      trxSplitMeta: string;
      execution: string;
      executionValue: string;
      executionMeta: string;
      priceFallback: string;
      priceUnavailable: string;
    };
  };
  sections: {
    executionRoute: {
      eyebrow: string;
      title: string;
      intro?: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        subtitle?: string;
        text: string;
      }>;
    };
    priceLogic: {
      eyebrow: string;
      title: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
      note: string;
    };
    lockLayer: {
      eyebrow: string;
      title: string;
      bullets: string[];
      note: string;
    };
    trxRouting: {
      eyebrow: string;
      title: string;
      rows: Array<{
        share: string;
        title: string;
        text: string;
        linkLabel?: string;
        linkHref?: string;
      }>;
      note: string;
    };
    walletFlow: {
      eyebrow: string;
      title: string;
      steps: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
      note: string;
    };
    resourceLayer: {
      eyebrow: string;
      title: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
      note: string;
    };
    latestPurchases: {
      eyebrow: string;
      title: string;
      intro?: string;
      headers: {
        wallet: string;
        trxIn: string;
        minted: string;
        lockEnds: string;
        transaction: string;
        status: string;
      };
      statusConfirmed: string;
      openTx: string;
      note: string;
      empty: string;
      unknownTime: string;
      fallbackBody: string;
      fallbackPrimaryCta: string;
      fallbackSecondaryCta: string;
    };
    comparison: {
      eyebrow: string;
      title: string;
      intro?: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
        subtitle?: string;
        footerLabel?: string;
        footerText?: string;
      }>;
    };
    afterPurchase: {
      eyebrow: string;
      title: string;
      steps: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
    };
    signingWallet: {
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      ctaTitle?: string;
      ctaText?: string;
    };
    verification: {
      eyebrow: string;
      title: string;
      body: string;
      tokenLabel: string;
      controllerLabel: string;
      contractsRepoLabel: string;
      walletRepoLabel: string;
    };
    cta: {
      eyebrow: string;
      title: string;
      body: string;
      openApp: string;
      openUnlock: string;
    };
  };
};

const buyContentEn: BuyPageContent = {
  metadata: {
    title: "Buy 4TEEN | Contract-Native TRON Entry",
    description:
      "Buy 4TEEN directly from the smart contract: mint a locked batch, track confirmed purchases, understand the 90/7/3 TRX routing, then install the wallet and execute the real buy flow.",
    openGraphTitle: "Buy 4TEEN",
    openGraphDescription:
      "Enter 4TEEN through the contract-native buy route. Mint a locked batch, watch confirmed BuyTokens events, review the TRX routing, and execute from a signing wallet.",
  },
  hero: {
    eyebrow: "FourteenToken",
    badge: "Contract-native buy route",
    title: "Buy 4TEEN Straight From the Contract",
    subtitle:
      "Mint a fresh 4TEEN batch, lock it for 14 days, watch confirmed buys hit the feed, then decide what to do when the unlock timer ends.",
    body: [
      "This is not a generic swap form pretending to be DeFi. This is the protocol-native entry route.",
      "You enter TRX, the contract calculates how much 4TEEN will be minted, the transaction creates a separate 14-day lock for that batch, and the incoming TRX is routed by contract rule: 90% to liquidity, 7% to the controller, and 3% to the airdrop side.",
      "The website shows the map. The wallet executes the transaction.",
    ],
    primaryCta: "Install / Open Wallet",
    secondaryCta: "View Latest Buys",
    ctaNote:
      "A signing wallet is required. Watch-only mode can read the system, but it cannot send the buy transaction. Humanity discovered signatures, and now we all must respect them.",
    rotatingLines: [
      "Contract Entry. Real Lock.",
      "Mint First. Unlock Later.",
      "Buy On-Chain. Track Everything.",
      "Your Batch. Your Timer.",
      "No Fake Volume. Just Events.",
    ],
    stats: {
      directPrice: "Direct Price",
      directPriceMeta:
        "Current contract-side entry price per 4TEEN from the public snapshot layer. The wallet refreshes the live value before execution.",
      lockRule: "Lock Rule",
      lockRuleValue: "14 Days",
      lockRuleMeta:
        "Every direct buy creates its own locked batch. The timer belongs to that purchase, not to your whole wallet.",
      trxSplit: "TRX Routing",
      trxSplitValue: "90 / 7 / 3",
      trxSplitMeta:
        "Incoming TRX is routed inside the buy transaction: liquidity side, controller side, and airdrop side.",
      execution: "Execution",
      executionValue: "Wallet + Resources",
      executionMeta:
        "The real buy flow runs from a signing wallet. TRX balance, Energy, Bandwidth, and transaction readiness are checked before the final signature.",
      priceFallback: "1.147500 TRX",
      priceUnavailable: "Live price unavailable right now. Fallback reflects the latest known direct route.",
    },
  },
  sections: {
    executionRoute: {
      eyebrow: "How the Cycle Works",
      title: "The Buy Page Should Explain the Whole Route",
      intro:
        "A direct buy is not just “send TRX, receive token”. The module walks the user through the actual on-chain cycle: contract entry, mint, lock, liquidity routing, and the decision point after unlock.",
      cards: [
        {
          eyebrow: "Step 1",
          title: "Enter Through the Contract",
          subtitle: "This is the primary protocol route, not the secondary market.",
          text: "Direct buy sends the `buyTokens()` command from a signing wallet. The contract receives TRX, calculates the 4TEEN amount, and starts the mint flow for that exact transaction.\n\nNo pool hunting. No route roulette. No pretending that a swap and a mint are the same thing because apparently words still matter.",
        },
        {
          eyebrow: "Step 2",
          title: "Mint a Fresh Batch",
          subtitle: "The contract creates new 4TEEN for the buyer.",
          text: "The 4TEEN amount is minted during the buy transaction. That minted batch is tied to the buyer wallet and immediately enters the lock logic.\n\nThis is why direct buy is different from swap. Swap trades existing liquidity. Direct buy creates a new locked batch through the token contract.",
        },
        {
          eyebrow: "Step 3",
          title: "Lock for 14 Days",
          subtitle: "Every buy gets its own unlock timer.",
          text: "The purchased batch is locked for 14 days. If the same wallet buys again later, that second buy creates a separate locked batch with its own timer.\n\nThe wallet shows the unlock timeline so the user can see exactly when each batch becomes movable.",
        },
        {
          eyebrow: "Step 4",
          title: "Feed the Liquidity Side",
          subtitle: "New buys keep pushing fresh TRX into the system.",
          text: "Each direct buy routes 90% of incoming TRX to the liquidity side. That value does not just sit in a marketing screenshot. It enters the protocol liquidity flow and is processed through the daily liquidity execution logic.\n\nThis is the part users need to understand: later buys keep feeding the system while earlier buyers wait through their lock.",
        },
        {
          eyebrow: "Step 5",
          title: "Reach the Unlock Point",
          subtitle: "After unlock, the user chooses the next route.",
          text: "When the lock expires, the batch becomes available. The holder can keep holding the position or move to the market route and swap through available liquidity.\n\nNo forced exit. No magic button. Just an unlock point and a market decision, because DeFi is already dramatic enough without inventing more nonsense.",
        },
      ],
    },
    priceLogic: {
      eyebrow: "Primary Price Logic",
      title: "Direct buy enters by contract price now and meets market price later",
      cards: [
        {
          eyebrow: "Base",
          title: "1 TRX = 1 4TEEN at deployment",
          text: "The starting direct-buy price is encoded in FourteenToken as 1.000000 TRX per token before later compounding periods move it forward.",
        },
        {
          eyebrow: "Growth",
          title: "14.75% growth per price period",
          text: "The contract stores annualGrowthRate = 1475 basis points and compounds tokenPrice forward whenever enough time has elapsed.",
        },
        {
          eyebrow: "Interval",
          title: "Every 90 days",
          text: "Price updates are not arbitrary admin edits. getCurrentPrice() advances the stored token price based on elapsed 90-day periods from lastPriceUpdate.",
        },
        {
          eyebrow: "Scope",
          title: "Only for direct issuance",
          text: "This price governs direct issuance through `buyTokens()`. It does not promise anything about DEX price or later exit conditions once the batch unlocks and the user moves to the market route.",
        },
      ],
      note:
        "The site reads direct price as a public informational layer. The real wallet route still matters because it combines that contract price with the selected signing wallet, the actual TRX balance, and confirmation-time resource checks.",
    },
    lockLayer: {
      eyebrow: "14-Day Lock Layer",
      title: "Every direct purchase mints immediately and locks immediately",
      bullets: [
        "Each buyTokens() call mints 4TEEN to the buyer address right away.",
        "The same transaction appends a new lock record with releaseTime = block timestamp + 14 days.",
        "Locks are per purchase batch, not one blended timer for the whole wallet.",
        "Transfers and transferFrom are blocked whenever the requested amount would spend from still-locked balance.",
        "The unlock timeline in the wallet is the natural companion route after a purchase.",
      ],
      note:
        "This is why direct buy and swap are not the same thing. Direct buy gives the user protocol-native issuance first, then a fixed wait, and only after unlock does the market route become relevant.",
    },
    trxRouting: {
      eyebrow: "Routing",
      title: "Where the TRX Goes",
      rows: [
        {
          share: "90%",
          title: "To Liquidity",
          text: "The largest share moves into the liquidity side of the system. This is the core flow that supports the market route after users reach unlock.",
          linkLabel: "Open Liquidity Page",
          linkHref: "/liquidity",
        },
        {
          share: "7%",
          title: "To the Controller",
          text: "A smaller share goes to FourteenController. This is the control and accounting layer connected to token administration, purchase tracking, ambassador logic, and reward settlement.",
          linkLabel: "Open Ambassadors Page",
          linkHref: "/ambassadors",
        },
        {
          share: "3%",
          title: "To the Airdrop Side",
          text: "The final share goes to the airdrop side, so the same direct-buy flow also keeps feeding public distribution and ecosystem growth.",
          linkLabel: "Open Airdrop Page",
          linkHref: "/airdrop",
        },
      ],
      note:
        "The split happens inside the buy transaction itself. It is not a later spreadsheet exercise, not a “trust us bro” allocation, and not a manual promise written in a Telegram chat at 3 AM.",
    },
    walletFlow: {
      eyebrow: "Wallet Flow",
      title: "How the real product moves from amount entry to signature",
      steps: [
        {
          eyebrow: "1. Prepare",
          title: "Choose the wallet that will actually buy",
          text: "The app starts with the selected signing wallet, loads its TRX balance, contract price, locked balance, and contract addresses, then limits the amount field to what that wallet can actually cover.",
        },
        {
          eyebrow: "2. Review",
          title: "See the minted amount and the split before you commit",
          text: "Before the user approves anything, the wallet shows the estimated 4TEEN output, the 90 / 7 / 3 split, the next contract price step, and the future unlock time for that batch.",
        },
        {
          eyebrow: "3. Confirm",
          title: "Check resources before the wallet asks for approval",
          text: "The confirmation layer measures Energy, Bandwidth, and any shortfall so the user sees the real execution state before passcode or biometric approval.",
        },
        {
          eyebrow: "4. Continue",
          title: "If resources are short, the wallet can bridge the gap first",
          text: "When the selected wallet is short on execution resources, the app can quote energy rental and clear that gap before the direct buy is sent, instead of letting the user walk into a failed transaction blindly.",
        },
        {
          eyebrow: "5. After landing",
          title: "The system tracks both unlock and controller-side attribution",
          text: "Once the buy lands, the wallet can show the lock countdown for that batch, while FourteenController can bind the buyer, record a verified purchase once per purchase ID, and finalize ambassador reward balance when allocation succeeds.",
        },
      ],
      note:
        "The website should explain this path clearly, then hand the user into the wallet. It should not pretend to be the execution layer itself.",
    },
    resourceLayer: {
      eyebrow: "Resource Readiness",
      title: "The wallet treats network cost as part of the product, not as a trap at the end",
      cards: [
        {
          eyebrow: "Estimate",
          title: "Energy and bandwidth are priced before signature",
          text: "The wallet estimates the contract-call cost for `buyTokens()` before signature, so the user sees what the route needs before the final approval step.",
        },
        {
          eyebrow: "Coverage",
          title: "Current wallet resources are compared against the route",
          text: "The review step shows not only the TRX amount, but also whether the selected wallet can cover the route cleanly right now.",
        },
        {
          eyebrow: "Shortfall",
          title: "If resources are missing, the app can help close the gap",
          text: "If the signing wallet comes up short, the product surfaces the gap directly and can move into the energy-rental step before the buy is sent.",
        },
      ],
      note:
        "This matters because direct buy is not just a number field. It is a live contract route, and the wallet already exposes the resource state behind it.",
    },
    latestPurchases: {
      eyebrow: "Live Buy Feed",
      title: "Confirmed Buys Already Hit the Contract",
      intro:
        "These rows come from confirmed `BuyTokens` events on FourteenToken. Real wallets, real transactions, real on-chain proof. Not fake volume, not a decorative table, not another dashboard hallucination wearing a dark theme.",
      headers: {
        wallet: "Wallet",
        trxIn: "TRX In",
        minted: "Minted",
        lockEnds: "Lock Ends",
        transaction: "Transaction",
        status: "Confirmed",
      },
      statusConfirmed: "Confirmed",
      openTx: "Open tx",
      note:
        "The feed is here for one reason: proof. Users should see that the buy module is not theoretical. Purchases have happened, the contract emitted events, and the wallet can take the next buyer through the same route.",
      empty: "Waiting for confirmed BuyTokens events.",
      unknownTime: "Time unavailable",
      fallbackBody:
        "Recent direct buys are temporarily hidden on the public site while the route is being stabilized. The mobile app remains the primary place where the buy is executed, and public verification links stay available.",
      fallbackPrimaryCta: "Open Mobile App Route",
      fallbackSecondaryCta: "Open Token Contract",
    },
    comparison: {
      eyebrow: "Buy Is Not the Same as Swap",
      title: "Direct Buy Is the Entry Route. Swap Is the Market Route.",
      intro:
        "Both routes matter, but they do different jobs. Users need to know which machine they are touching before they start pressing buttons like civilization was a mistake.",
      cards: [
        {
          eyebrow: "Buy",
          title: "Buy",
          subtitle: "Direct contract entry",
          text: "Direct buy sends the contract buy command, mints a fresh batch of 4TEEN by contract rule, creates a new 14-day lock for that batch, and routes incoming TRX into liquidity, controller, and airdrop flows.",
          footerLabel: "Best For",
          footerText:
            "Users who want to enter through the protocol-native mint route and understand exactly how the buy transaction works.",
        },
        {
          eyebrow: "Swap",
          title: "Swap",
          subtitle: "Secondary-market route",
          text: "Swap trades against available liquidity on the market. It does not mint a new batch, does not create the direct-buy lock, and depends on route quality, price impact, slippage, and DEX conditions at that moment.",
          footerLabel: "Best For",
          footerText:
            "Users who already hold unlocked 4TEEN or want to trade through available market liquidity.",
        },
        {
          eyebrow: "Meaning",
          title: "Meaning",
          subtitle: "Enter here, decide later",
          text: "Direct buy is the entry flow. Unlock is the waiting period. Swap is the market route after the user has movable tokens.\n\nThe clean path is simple: buy through the contract, track the lock, watch the feed, then choose the next move after unlock.",
        },
      ],
    },
    afterPurchase: {
      eyebrow: "After Purchase",
      title: "What happens next once the buy lands",
      steps: [
        {
          eyebrow: "Minted",
          title: "4TEEN appears immediately",
          text: "The token amount is minted in the same transaction that receives the TRX. This is not a delayed backend allocation.",
        },
        {
          eyebrow: "Locked",
          title: "The purchased batch enters its own 14-day lock",
          text: "A new lock record is created for that exact purchase batch. The wallet can later show it as a separate row in unlock timeline.",
        },
        {
          eyebrow: "Tracked",
          title: "The unlock timeline becomes useful immediately",
          text: "The next useful screen is the unlock route: it shows what is still locked, what unlocks next, and when that batch actually becomes transferable.",
        },
        {
          eyebrow: "Fed forward",
          title: "The buy keeps feeding liquidity and controller-side state",
          text: "The 90% liquidity share has already entered the protocol liquidity path, while FourteenController can bind the buyer, record the verified purchase once per purchase ID, and settle ambassador-side reward accounting.",
        },
      ],
    },
    signingWallet: {
      eyebrow: "Execution Layer",
      title: "The Website Explains the Route. The Wallet Executes the Buy.",
      body:
        "The public site can explain the contract route, but the real purchase happens from a signing wallet inside the app. Watch-only mode is useful for reading balances, checking routes, and inspecting the system. It cannot sign the direct-buy transaction.\n\nTo buy, the user needs a wallet that can sign on TRON.",
      bullets: [
        "Watch-only wallets can inspect balances, routes, unlock states, and public contract data.",
        "Only a signing wallet can enter the live direct-buy route.",
        "TRX balance, Energy, Bandwidth, and transaction readiness are checked before signature.",
        "The wallet shows the expected 4TEEN amount and lock behavior before the user signs.",
      ],
      ctaTitle: "Install the Wallet and Run the Real Buy Flow",
      ctaText:
        "The site gives you the map. The wallet gives you execution: direct buy, resource check, Energy fallback, live contract price, purchase confirmation, and unlock tracking after the transaction.",
    },
    verification: {
      eyebrow: "Source Check",
      title: "The Claims Above Are Tied Back to Contracts and Code",
      body:
        "This page is grounded in the deployed FourteenToken contract, the controller architecture, the wallet direct-buy module, and the unlock route that follows after purchase.\n\nThe goal is simple: explain the actual mechanics clearly enough that a new user understands what happens before signing. Revolutionary concept, apparently.",
      tokenLabel: "FourteenToken",
      controllerLabel: "FourteenController",
      contractsRepoLabel: "Contracts repository",
      walletRepoLabel: "Wallet repository",
    },
    cta: {
      eyebrow: "Next Step",
      title: "Open the Wallet When You Are Ready for the Real Buy Flow",
      body:
        "The public site can explain the route. The real purchase, resource check, Energy fallback, live price read, transaction signature, and unlock follow-up all live inside the mobile wallet.\n\nInstall the wallet, connect a signing account, enter TRX, review the minted 4TEEN amount, confirm the 14-day lock, and sign only when the transaction details are clear.",
      openApp: "Install / Open Wallet App",
      openUnlock: "Open Unlock Timeline",
    },
  },
};

const buyContentRu: BuyPageContent = {
  metadata: {
    title: "Покупка",
    description:
      "Как устроена прямая покупка 4TEEN через контракт FourteenToken и мобильный кошелек: цена, 14-дневная блокировка, маршрут 90/7/3 и проверка сетевых ресурсов перед подтверждением.",
  },
  hero: {
    eyebrow: "FourteenToken",
    badge: "Маршрут прямой покупки",
    title:
      "Покупка — это основной вход в 4TEEN через контракт: вы отправляете TRX, получаете новую партию 4TEEN, она сразу уходит в 14-дневный лок, а распределение стоимости запускается в той же транзакции.",
    subtitle:
      "Это не обычный swap-виджет. Это прямой вход в 4TEEN через контракт и кошелек с подписью.",
    body: [
      "В кошельке этот маршрут выглядит так: вы вводите TRX, заранее видите, сколько 4TEEN будет выпущено, понимаете 14-дневный лок, видите, куда уходит TRX, проходите проверку ресурсов и только потом подписываете сделку.",
      "Если идея простая купить сейчас, дождаться unlock и уже потом решать, выходить ли в рынок, именно эта страница должна объяснять начало этого цикла.",
    ],
    stats: {
      directPrice: "Прямая цена",
      directPriceMeta: "Текущая контрактная цена входа за 4TEEN из публичного snapshot-слоя.",
      lockRule: "Правило лока",
      lockRuleValue: "14Д",
      lockRuleMeta: "У каждой прямой покупки свой собственный 14-дневный период блокировки.",
      trxSplit: "Разделение TRX",
      trxSplitValue: "90 / 7 / 3",
      trxSplitMeta: "Основная часть TRX идет в контур ликвидности, а доли контроллера и аирдропа уходят в той же покупке.",
      execution: "Исполнение",
      executionValue: "Кошелек + ресурсы",
      executionMeta: "Реальная покупка идет из кошелька с правом подписи, а перед подписью проверяются ресурсы.",
      priceFallback: "1.147500 TRX",
      priceUnavailable: "Живая цена сейчас недоступна. Показано последнее известное значение для прямой покупки.",
    },
  },
  sections: {
    executionRoute: {
      eyebrow: "Маршрут исполнения",
      title: "Что модуль покупки реально делает для пользователя",
      cards: [
        {
          eyebrow: "Выбранный кошелек",
          title: "Маршрут начинается только с кошелька, который умеет подписывать",
          text: "Watch-only режим позволяет смотреть баланс и читать маршруты, но не позволяет отправить транзакцию покупки. Живой сценарий начинается только с кошелька с правом подписи, потому что в конце идет реальный вызов контракта, а не декоративный предпросмотр на сайте.",
        },
        {
          eyebrow: "Подготовка",
          title: "Пользователь сначала видит вход в TRX",
          text: "Сначала человек задает сумму в TRX, а приложение заранее считает, сколько 4TEEN будет выпущено, какой будет лок и как именно разойдется стоимость. Поэтому экран покупки читается как понятный вход в позицию, а не как слепое подтверждение.",
        },
        {
          eyebrow: "Подтверждение",
          title: "Команда собирается до подтверждения",
          text: "Кнопка Continue открывает шаг подтверждения. На нем кошелек собирает реальную команду `buyTokens()`, проверяет ресурсы, показывает ожидаемый результат и только потом просит код или биометрию.",
        },
      ],
    },
    priceLogic: {
      eyebrow: "Логика основной цены",
      title: "В прямую покупку вы входите по цене контракта, а с рынком встречаетесь уже потом",
      cards: [
        {
          eyebrow: "База",
          title: "На старте 1 TRX = 1 4TEEN",
          text: "Стартовая цена прямой покупки зашита в FourteenToken как 1.000000 TRX за токен. Дальше она уже меняется по правилам контракта.",
        },
        {
          eyebrow: "Рост",
          title: "14.75% на каждый ценовой период",
          text: "Контракт хранит annualGrowthRate = 1475 базисных пунктов и продвигает tokenPrice вперед по формуле компаундинга, когда проходит очередной период.",
        },
        {
          eyebrow: "Интервал",
          title: "Шаг обновления — 90 дней",
          text: "Цена не меняется по желанию администратора. getCurrentPrice() пересчитывает ее строго по количеству прошедших 90-дневных периодов от lastPriceUpdate.",
        },
        {
          eyebrow: "Область действия",
          title: "Только для прямого выпуска",
          text: "Эта цена действует только для прямого выпуска через `buyTokens()`. Она ничего не обещает про DEX-цену или условия выхода позже, когда партия разблокируется и пользователь перейдет в рыночный маршрут.",
        },
      ],
      note:
        "Сайт показывает цену как публичный справочный слой. Но реальный маршрут все равно остается за кошельком: он совмещает цену контракта, выбранный кошелек, реальный баланс TRX и проверку ресурсов прямо перед подтверждением.",
    },
    lockLayer: {
      eyebrow: "14-дневный слой лока",
      title: "Каждая прямая покупка сразу начисляет токены и сразу их блокирует",
      bullets: [
        "Каждый вызов buyTokens() сразу начисляет 4TEEN на адрес покупателя.",
        "Та же транзакция создает новую запись блокировки с releaseTime = время блока + 14 дней.",
        "Блокировка ведется по каждой покупке отдельно, а не одним общим таймером на весь кошелек.",
        "transfer и transferFrom блокируются, если пользователь пытается потратить еще неразблокированный баланс.",
        "После покупки логичным следующим экраном становится unlock timeline в кошельке.",
      ],
      note:
        "Именно поэтому buy и swap — не одно и то же. Прямая покупка дает сначала протокольный выпуск, потом фиксированное ожидание, и только после unlock рыночный маршрут вообще становится актуальным.",
    },
    trxRouting: {
      eyebrow: "Куда уходит TRX",
      title: "Покупка не оставляет стоимость в одной куче. Она сразу раскладывает ее по правилам.",
      rows: [
        {
          share: "90%",
          title: "В ликвидность",
          text: "Самая большая доля уходит в контур ликвидности. Она не вываливается в рынок разово: дальше этот объем день за днем проходит через протокольную механику выпуска ликвидности.",
        },
        {
          share: "7%",
          title: "В контроллер",
          text: "Меньшая доля идет в FourteenController. Именно там живут протокольный учет, привязка покупателя к ambassador, запись verified purchase и логика расчета вознаграждений.",
        },
        {
          share: "3%",
          title: "В аирдроп",
          text: "Последняя доля уходит на адрес аирдропа, чтобы тот же маршрут прямой покупки продолжал подпитывать публичную систему распределения.",
        },
      ],
      note:
        "Это разделение происходит внутри самой транзакции покупки. И самое важное: доля ликвидности не исчезает в моменте, а продолжает работать дальше через ежедневную release-логику протокола.",
    },
    walletFlow: {
      eyebrow: "Поток кошелька",
      title: "Как реальный сценарий проходит путь от суммы до подписи",
      steps: [
        {
          eyebrow: "1. Подготовка",
          title: "Сначала выбирается кошелек, который реально будет покупать",
          text: "Приложение начинает с выбранного кошелька с правом подписи, подгружает его баланс TRX, цену контракта, текущий locked balance и адреса контрактов, а затем ограничивает поле суммы тем, что этот кошелек реально может покрыть.",
        },
        {
          eyebrow: "2. Проверка",
          title: "Объем 4TEEN и разделение 90 / 7 / 3 видны до подтверждения",
          text: "До подписи кошелек показывает ожидаемый объем 4TEEN, маршрут 90 / 7 / 3, момент следующего шага цены и время unlock для этой конкретной партии.",
        },
        {
          eyebrow: "3. Подтверждение",
          title: "Ресурсы проверяются до одобрения",
          text: "На шаге подтверждения кошелек измеряет Energy, Bandwidth и возможный дефицит ресурсов, чтобы человек видел реальную картину еще до ввода кода или биометрии.",
        },
        {
          eyebrow: "4. Продолжение",
          title: "Если не хватает ресурсов, кошелек может закрыть этот зазор заранее",
          text: "Если выбранному кошельку не хватает ресурсов на исполнение, приложение может показать аренду энергии и закрыть этот дефицит до отправки прямой покупки, а не оставлять пользователя один на один с фейлом.",
        },
        {
          eyebrow: "5. После покупки",
          title: "После сделки система начинает вести и unlock, и атрибуцию",
          text: "Как только покупка проходит, кошелек начинает вести таймер unlock по этой партии, а FourteenController при необходимости связывает покупателя с ambassador, пишет verified purchase и доводит состояние награды до финального статуса.",
        },
      ],
      note:
        "Сайт должен ясно объяснить этот путь, а потом передать человека в кошелек. Он не должен притворяться самим местом исполнения.",
    },
    resourceLayer: {
      eyebrow: "Готовность ресурсов",
      title: "Кошелек считает сетевую стоимость частью продукта, а не ловушкой в конце пути",
      cards: [
        {
          eyebrow: "Оценка",
          title: "Energy и bandwidth считаются до подписи",
          text: "Кошелек заранее оценивает, сколько ресурсов потребует команда `buyTokens()`, чтобы человек видел цену исполнения до финального подтверждения.",
        },
        {
          eyebrow: "Покрытие",
          title: "Ресурсы кошелька сравниваются с маршрутом",
          text: "Экран review показывает не только сумму в TRX, но и то, хватает ли выбранному кошельку ресурсов, чтобы провести сделку чисто прямо сейчас.",
        },
        {
          eyebrow: "Дефицит",
          title: "Если ресурсов не хватает, приложение помогает закрыть разницу",
          text: "Если кошельку не хватает ресурсов, приложение показывает дефицит прямо и может перевести пользователя в шаг аренды энергии еще до отправки покупки.",
        },
      ],
      note:
        "Это важно, потому что прямая покупка — не просто поле суммы. Это живой контрактный маршрут, и кошелек показывает, в каком ресурсном состоянии он реально находится.",
    },
    latestPurchases: {
      eyebrow: "Последние покупки",
      title: "Последние подтвержденные покупки из живой ленты контракта",
      headers: {
        wallet: "Кошелек",
        trxIn: "TRX In",
        minted: "Начислено",
        lockEnds: "Конец лока",
        transaction: "Транзакция",
        status: "Статус",
      },
      statusConfirmed: "Подтверждено",
      openTx: "Открыть tx",
      note:
        "Эти строки приходят из последних подтвержденных событий BuyTokens в FourteenToken. Здесь показана реальная активность контракта, а не декоративная статистика.",
      empty: "Последние события прямой покупки сейчас недоступны.",
      unknownTime: "Время недоступно",
      fallbackBody:
        "Последние прямые покупки временно скрыты на публичном сайте, пока маршрут стабилизируется. Основным местом исполнения остается мобильное приложение, а публичные ссылки для проверки по-прежнему доступны.",
      fallbackPrimaryCta: "Открыть маршрут в приложении",
      fallbackSecondaryCta: "Открыть контракт токена",
    },
    comparison: {
      eyebrow: "Buy — это не то же самое, что swap",
      title: "Актив один и тот же, но задачи у маршрутов разные",
      cards: [
        {
          eyebrow: "Buy",
          title: "Основной вход в 4TEEN",
          text: "Прямая покупка отправляет команду `buyTokens()`, выпускает новую партию 4TEEN по правилам контракта, ставит на нее 14-дневный лок и разводит входящий TRX по ликвидности, контроллеру и аирдропу.",
        },
        {
          eyebrow: "Swap",
          title: "Рыночный маршрут до или после unlock",
          text: "Swap — это торговля против уже существующей ликвидности на вторичном рынке. Он не выпускает новую партию, не создает лок прямой покупки и зависит от состояния маршрута, цены и DEX-ликвидности в момент сделки.",
        },
        {
          eyebrow: "Смысл",
          title: "Купить сейчас, рынок потом",
          text: "Если человеку нужен протокольный вход и понятное движение денег внутри системы, ему нужен buy. Когда партия разблокируется и нужен рыночный выход или повторный вход через ликвидность, уже включается swap.",
        },
      ],
    },
    afterPurchase: {
      eyebrow: "После покупки",
      title: "Что происходит сразу после того, как покупка прошла",
      steps: [
        {
          eyebrow: "Начислено",
          title: "4TEEN появляется сразу",
          text: "Токены начисляются в той же транзакции, которая принимает TRX. Это не отложенное backend-распределение.",
        },
        {
          eyebrow: "Залочено",
          title: "Купленная партия попадает в собственную 14-дневную блокировку",
          text: "Для этой конкретной партии создается отдельная запись блокировки. Позже кошелек показывает ее отдельной строкой в unlock timeline.",
        },
        {
          eyebrow: "Отслеживается",
          title: "Сразу после покупки полезным становится unlock timeline",
          text: "Следующий важный экран — unlock-маршрут: он показывает, что еще в локе, что разблокируется следующим и когда конкретная партия становится переводимой.",
        },
        {
          eyebrow: "Пошло дальше",
          title: "Покупка продолжает кормить ликвидность и контроллерный слой",
          text: "90% уже ушли в ликвидностный контур, а FourteenController при необходимости связывает покупателя с ambassador, пишет verified purchase один раз на purchase ID и закрывает reward-учет на своей стороне.",
        },
      ],
    },
    signingWallet: {
      eyebrow: "Нужен кошелек с подписью",
      title: "Сайт может объяснить маршрут. Исполнить его может только кошелек.",
      body:
        "Сайт может объяснять механику, но сама покупка происходит только из кошелька с правом подписи внутри мобильного приложения. Watch-only режим хорош для чтения состояния, но не для отправки команды `buyTokens()`.",
      bullets: [
        "Watch-only кошельки могут смотреть балансы и маршруты, но не могут купить напрямую.",
        "В живой buy-маршрут приложение входит только с кошельками, которые умеют подписывать.",
        "TRX-баланс и сетевые ресурсы проверяются именно у выбранного кошелька, а не у абстрактного профиля.",
      ],
    },
    verification: {
      eyebrow: "Проверка",
      title: "Эта страница опирается на живой продукт, а не на маркетинговую сказку",
      body:
        "Эта страница собрана по живому контракту FourteenToken, текущей логике FourteenController, реальной реализации прямой покупки в кошельке и unlock-маршруту, который идет сразу после сделки. Ее задача — описывать реальную механику, а не сглаженную выдумку.",
      tokenLabel: "FourteenToken",
      controllerLabel: "FourteenController",
      contractsRepoLabel: "Репозиторий контрактов",
      walletRepoLabel: "Репозиторий кошелька",
    },
    cta: {
      eyebrow: "Следующий шаг",
      title: "Открывайте кошелек, когда будете готовы пройти реальный сценарий покупки",
      body:
        "Публичный сайт может объяснить маршрут. Сама покупка, проверка ресурсов, шаг аренды энергии при необходимости и последующий unlock-flow происходят уже внутри мобильного кошелька.",
      openApp: "Открыть маршрут в приложении",
      openUnlock: "Открыть таймлайн разблокировки",
    },
  },
};

const buyContentByLocale: Partial<Record<SupportedSiteLocale, BuyPageContent>> = {
  en: buyContentEn,
  ru: buyContentRu,
};

export function getBuyPageContent(locale: SupportedSiteLocale) {
  return buyContentByLocale[locale] ?? buyContentEn;
}
