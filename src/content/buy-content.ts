import type { SupportedSiteLocale } from "@/lib/site-locale";

export type BuyPageContent = {
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
      cards: Array<{
        eyebrow: string;
        title: string;
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
      headers: {
        buyer: string;
        spent: string;
        minted: string;
        happened: string;
        verify: string;
      };
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
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
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
    title: "Buy",
    description:
      "Direct 4TEEN purchase explained from the real FourteenToken contract and the wallet execution flow: primary price logic, 14-day locks, 90/7/3 routing, and resource-aware confirmation.",
  },
  hero: {
    eyebrow: "FourteenToken",
    status: "Direct mint route",
    title:
      "Buy is the primary contract entry: send TRX, mint 4TEEN by rule, lock each batch for 14 days, and route value across the system in one transaction.",
    lead:
      "The website should not present direct buy as a generic swap form. In the real product, the wallet prepares the amount with a selected signing wallet, shows the estimated mint result, explains the 14-day lock, previews the 90 / 7 / 3 TRX routing, and only then hands off to confirmation, resource checks, and signature.",
    stats: {
      directPrice: "Direct Price",
      directPriceMeta: "Current primary-contract price per 4TEEN from the public snapshot layer.",
      lockRule: "Lock Rule",
      lockRuleValue: "14D",
      lockRuleMeta: "Every direct purchase creates its own fixed lock entry.",
      trxSplit: "TRX Split",
      trxSplitValue: "90 / 7 / 3",
      trxSplitMeta: "Liquidity, controller, and airdrop rails are routed atomically.",
      execution: "Execution",
      executionValue: "Wallet-side",
      executionMeta: "The real purchase flow runs from a signing wallet inside the mobile app.",
      priceFallback: "1.147500 TRX",
      priceUnavailable: "Live price unavailable right now. Fallback reflects the latest known direct route.",
    },
  },
  sections: {
    executionRoute: {
      eyebrow: "Execution Route",
      title: "What the wallet is actually doing when you buy",
      cards: [
        {
          eyebrow: "Selected wallet",
          title: "Direct buy needs a signing wallet",
          text: "The wallet excludes watch-only identities from direct buy execution. The route is built around the selected signing wallet because the final action is a real contract call, not a website quote toy.",
        },
        {
          eyebrow: "Prepare",
          title: "TRX amount first, signature later",
          text: "The app lets the user enter TRX first and computes the estimated 4TEEN output before anything is signed. That keeps the buy surface readable and stops it from behaving like a blind transaction prompt.",
        },
        {
          eyebrow: "Confirm",
          title: "The transaction is built before approval",
          text: "Continue opens the confirmation step. That is where the wallet prepares the real contract call, checks resources, shows the expected result, and only then asks for passcode or biometrics.",
        },
      ],
    },
    priceLogic: {
      eyebrow: "Primary Price Logic",
      title: "The direct route is governed by contract price, not market price",
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
          title: "Direct route only",
          text: "This contract price governs mint-on-purchase through buyTokens(). It is not a promise about DEX price, secondary market depth, or exit conditions elsewhere.",
        },
      ],
      note:
        "The site reads direct price as a public informational layer. The live wallet route still matters because it combines that contract price with the selected signing wallet, actual TRX balance, and confirmation-time resource checks.",
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
        "This is why direct buy and swap are different products. Direct buy carries a fixed lock discipline enforced on-chain, and the wallet surfaces that explicitly instead of hiding it in fine print.",
    },
    trxRouting: {
      eyebrow: "Value Routing",
      title: "TRX is split by hard rule inside the purchase transaction",
      rows: [
        {
          share: "90%",
          title: "Liquidity rail",
          text: "The largest share is forwarded to the configured liquidity pool path so protocol-side liquidity logic can continue to operate from actual purchase flow.",
        },
        {
          share: "7%",
          title: "Controller / owner rail",
          text: "A smaller share is forwarded to the owner layer, which in the current system is FourteenController. That is where protocol accounting, buyer binding, verified-purchase recording, and ambassador reward logic are anchored.",
        },
        {
          share: "3%",
          title: "Airdrop rail",
          text: "The final share is routed to the airdrop address, which is how the direct-buy route contributes to the public wave-based distribution system.",
        },
      ],
      note:
        "The contract forwards these rails atomically. It is not a later accounting guess and not a website-side explanation layer.",
    },
    walletFlow: {
      eyebrow: "Wallet Flow",
      title: "How the real product moves from amount entry to signature",
      steps: [
        {
          eyebrow: "1. Prepare",
          title: "Enter TRX with a selected signing wallet",
          text: "The app loads wallet balance, current direct price, current locked balance, and contract addresses first. The amount field is bounded by what the selected wallet can actually cover.",
        },
        {
          eyebrow: "2. Review",
          title: "See estimated 4TEEN and the split before action",
          text: "The wallet computes estimated minted amount, 90 / 7 / 3 routing, next price update timing, and lock release timing before the user commits.",
        },
        {
          eyebrow: "3. Confirm",
          title: "Check resources before asking for approval",
          text: "The confirmation layer measures Energy, Bandwidth, and any shortfall so the user sees execution reality before passcode or biometric approval.",
        },
        {
          eyebrow: "4. Continue",
          title: "Controller-side attribution clears after the buy",
          text: "After the buy lands, the system can bind that buyer to an ambassador, record a verified purchase once per purchase ID, and later finalize claimable reward state through FourteenController when operator-side allocation succeeds.",
        },
        {
          eyebrow: "5. Continue",
          title: "Use unlock timeline right after purchase",
          text: "As soon as a direct buy lands, the lock route becomes useful: per-batch unlock time, countdown, and transferability status are already part of the wallet flow.",
        },
      ],
      note:
        "The website keeps this route informational. It should explain the actual product path clearly, including controller-side attribution and reward settlement, then hand the user to the app instead of pretending to be the execution surface itself.",
    },
    resourceLayer: {
      eyebrow: "Resource Readiness",
      title: "The wallet treats network cost as part of the product, not an afterthought",
      cards: [
        {
          eyebrow: "Need now",
          title: "Required resources are estimated early",
          text: "The wallet estimates contract-call energy and bandwidth for buyTokens() before signature, so users are not walking into execution cost blindly.",
        },
        {
          eyebrow: "Available now",
          title: "Current wallet resources are compared against the route",
          text: "The direct buy review includes current wallet coverage, not only the desired TRX amount. That helps explain whether the wallet can execute cleanly right now.",
        },
        {
          eyebrow: "Missing",
          title: "Shortfall is surfaced directly",
          text: "If the signing wallet is missing resources, the product can explain the gap instead of leaving the user to decode a failed transaction after approval.",
        },
      ],
      note:
        "This matters because direct buy is not just a number field. It is a contract route, and the wallet already exposes the resource state that stands behind it.",
    },
    latestPurchases: {
      eyebrow: "Latest Purchases",
      title: "Recent confirmed direct buys from the live contract feed",
      headers: {
        buyer: "Buyer",
        spent: "Spent",
        minted: "Minted",
        happened: "Happened",
        verify: "Verify",
      },
      openTx: "Open tx",
      note:
        "These rows come from the latest confirmed BuyTokens events on FourteenToken. They show real contract activity, not mock volume.",
      empty: "Latest direct-buy events are unavailable right now.",
      unknownTime: "Time unavailable",
      fallbackBody:
        "Recent direct buys are temporarily hidden on the public site while the route is being stabilized. The mobile app remains the primary execution surface, and public verification links stay available.",
      fallbackPrimaryCta: "Open Mobile App Route",
      fallbackSecondaryCta: "Open Token Contract",
    },
    comparison: {
      eyebrow: "Why Buy != Swap",
      title: "These are different product routes with different consequences",
      cards: [
        {
          eyebrow: "Buy",
          title: "Primary mint route",
          text: "Direct buy calls buyTokens(), mints new 4TEEN by contract rule, creates a fresh 14-day lock batch, and routes TRX into liquidity, controller, and airdrop rails.",
        },
        {
          eyebrow: "Swap",
          title: "Secondary market route",
          text: "Swap is market-side trading against available liquidity. It does not mint new 4TEEN, does not create the same direct-buy lock batch, and depends on DEX-side quote conditions.",
        },
        {
          eyebrow: "Meaning",
          title: "Same asset, different system entry",
          text: "If a user wants protocol-native issuance and visible routing, direct buy is the route. If they want market-side execution later, swap is the route.",
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
          title: "Unlock timeline becomes the next useful screen",
          text: "The lock route tells the user what is still locked, what unlocks next, and when transferability actually begins.",
        },
        {
          eyebrow: "Attributed",
          title: "Ambassador linkage is settled on the controller side",
          text: "If the purchase belongs under an ambassador path, FourteenController can bind the buyer to that ambassador and record the verified purchase once per purchase ID. Claimable reward state appears only after the controller-side allocation write succeeds.",
        },
      ],
    },
    signingWallet: {
      eyebrow: "Signing Wallet Required",
      title: "Execution belongs to the wallet that can sign",
      body:
        "The website can explain the route, but the purchase itself belongs to a signing wallet inside the mobile app. Watch-only identity is useful for reading state, not for executing buyTokens().",
      bullets: [
        "Watch-only wallets can inspect balances and routes, but cannot execute direct buy.",
        "The app selects from signing wallets only when entering the live buy route.",
        "TRX balance and network resources are evaluated against the selected signing wallet, not against a generic user profile.",
      ],
    },
    verification: {
      eyebrow: "Verification",
      title: "Where the mechanics come from",
      body:
        "This page is based on the deployed FourteenToken contract, the current controller ownership model, the wallet direct-buy implementation, and the wallet unlock timeline route. It is meant to explain real mechanics, not invent a friendlier alternate version.",
      tokenLabel: "FourteenToken",
      controllerLabel: "FourteenController",
      contractsRepoLabel: "Contracts repository",
      walletRepoLabel: "Wallet repository",
    },
    cta: {
      eyebrow: "Next Step",
      title: "Use the wallet when you are ready for the real direct-buy flow",
      body:
        "The public site explains the route. The actual direct purchase flow, confirmation step, and unlock follow-up live inside the mobile wallet.",
      openApp: "Open Mobile App Route",
      openUnlock: "Open Unlock Timeline",
    },
  },
};

const buyContentRu: BuyPageContent = {
  metadata: {
    title: "Покупка",
    description:
      "Прямая покупка 4TEEN через реальный контракт FourteenToken и кошелек: логика основной цены, 14-дневные локи, маршрутизация 90/7/3 и подтверждение с учетом сетевых ресурсов.",
  },
  hero: {
    eyebrow: "FourteenToken",
    status: "Прямой маршрут минта",
    title:
      "Покупка — это основной вход в контракт: отправка TRX, минт 4TEEN по правилам, лок каждого батча на 14 дней и маршрутизация стоимости по системе в одной транзакции.",
    lead:
      "Сайт не должен показывать direct buy как обычную форму свопа. В реальном продукте кошелек сначала готовит сумму через выбранный signing wallet, показывает ожидаемый объем минта, объясняет 14-дневный лок, заранее раскрывает маршрутизацию 90 / 7 / 3 по TRX и только потом передает пользователя к подтверждению, проверке ресурсов и подписи.",
    stats: {
      directPrice: "Прямая цена",
      directPriceMeta: "Текущая цена основного контракта за 4TEEN из публичного snapshot-слоя.",
      lockRule: "Правило лока",
      lockRuleValue: "14Д",
      lockRuleMeta: "Каждая прямая покупка создает собственную фиксированную запись лока.",
      trxSplit: "Разделение TRX",
      trxSplitValue: "90 / 7 / 3",
      trxSplitMeta: "Маршруты ликвидности, контроллера и аирдропа проводятся атомарно.",
      execution: "Исполнение",
      executionValue: "На стороне кошелька",
      executionMeta: "Реальный сценарий покупки запускается из signing wallet внутри мобильного приложения.",
      priceFallback: "1.147500 TRX",
      priceUnavailable: "Живая цена сейчас недоступна. Показано последнее известное значение прямого маршрута.",
    },
  },
  sections: {
    executionRoute: {
      eyebrow: "Маршрут исполнения",
      title: "Что именно делает кошелек, когда пользователь покупает",
      cards: [
        {
          eyebrow: "Выбранный кошелек",
          title: "Прямая покупка требует signing wallet",
          text: "Кошелек исключает watch-only идентичности из исполнения direct buy. Весь маршрут строится вокруг выбранного signing wallet, потому что финальное действие — это реальный вызов контракта, а не игрушечная котировка на сайте.",
        },
        {
          eyebrow: "Подготовка",
          title: "Сначала сумма TRX, потом подпись",
          text: "Приложение дает пользователю сначала ввести TRX и вычисляет ожидаемый выход 4TEEN до любой подписи. Это делает экран покупки читаемым и не превращает его в слепой transaction prompt.",
        },
        {
          eyebrow: "Подтверждение",
          title: "Транзакция собирается до одобрения",
          text: "Кнопка Continue открывает шаг подтверждения. Именно там кошелек готовит реальный вызов контракта, проверяет ресурсы, показывает ожидаемый результат и только потом просит passcode или биометрию.",
        },
      ],
    },
    priceLogic: {
      eyebrow: "Логика основной цены",
      title: "Прямой маршрут управляется ценой контракта, а не рыночной ценой",
      cards: [
        {
          eyebrow: "База",
          title: "1 TRX = 1 4TEEN на момент деплоя",
          text: "Стартовая цена прямой покупки зашита в FourteenToken как 1.000000 TRX за токен до того, как последующие периоды компаундинга начнут двигать ее дальше.",
        },
        {
          eyebrow: "Рост",
          title: "14.75% роста на каждый ценовой период",
          text: "Контракт хранит annualGrowthRate = 1475 базисных пунктов и двигает tokenPrice вперед через compounding всякий раз, когда проходит достаточно времени.",
        },
        {
          eyebrow: "Интервал",
          title: "Каждые 90 дней",
          text: "Обновления цены — это не произвольные admin edits. getCurrentPrice() продвигает сохраненную цену токена на основе прошедших 90-дневных периодов от lastPriceUpdate.",
        },
        {
          eyebrow: "Область действия",
          title: "Только прямой маршрут",
          text: "Эта контрактная цена управляет mint-on-purchase через buyTokens(). Это не обещание о DEX-цене, глубине вторичного рынка или условиях выхода в других местах.",
        },
      ],
      note:
        "Сайт читает прямую цену как публичный информационный слой. Живой маршрут кошелька все равно остается ключевым, потому что он совмещает цену контракта с выбранным signing wallet, реальным TRX-балансом и проверками ресурсов в момент подтверждения.",
    },
    lockLayer: {
      eyebrow: "14-дневный слой лока",
      title: "Каждая прямая покупка сразу минтит и сразу лочит",
      bullets: [
        "Каждый вызов buyTokens() сразу минтит 4TEEN на адрес покупателя.",
        "Та же транзакция добавляет новую запись лока с releaseTime = block timestamp + 14 дней.",
        "Локи ведутся по отдельным batch-покупкам, а не одним общим таймером на весь кошелек.",
        "Transfers и transferFrom блокируются, если запрошенная сумма затрагивает еще залоченный баланс.",
        "Маршрут unlock timeline в кошельке — естественное продолжение после покупки.",
      ],
      note:
        "Именно поэтому direct buy и swap — это разные продукты. Прямая покупка несет фиксированную дисциплину лока, принудительно заданную on-chain, и кошелек показывает это открыто, а не прячет в мелком тексте.",
    },
    trxRouting: {
      eyebrow: "Маршрутизация стоимости",
      title: "TRX делится по жесткому правилу внутри транзакции покупки",
      rows: [
        {
          share: "90%",
          title: "Рельса ликвидности",
          text: "Самая большая доля уходит в настроенный путь ликвидности, чтобы protocol-side логика ликвидности продолжала жить от реального покупательского потока.",
        },
        {
          share: "7%",
          title: "Рельса контроллера / owner",
          text: "Меньшая доля уходит в owner-layer, которым в текущей системе выступает FourteenController. Именно там закреплены protocol accounting, buyer binding, verified-purchase recording и ambassador reward logic.",
        },
        {
          share: "3%",
          title: "Рельса аирдропа",
          text: "Последняя доля уходит на airdrop address — так direct-buy маршрут подпитывает публичную wave-based систему распределения.",
        },
      ],
      note:
        "Контракт пересылает эти рельсы атомарно. Это не поздняя догадка бухгалтерии и не просто объяснение на стороне сайта.",
    },
    walletFlow: {
      eyebrow: "Поток кошелька",
      title: "Как реальный продукт идет от ввода суммы до подписи",
      steps: [
        {
          eyebrow: "1. Подготовка",
          title: "Ввод TRX через выбранный signing wallet",
          text: "Приложение сначала загружает баланс кошелька, текущую прямую цену, текущий залоченный баланс и адреса контрактов. Поле суммы ограничено тем, что выбранный кошелек действительно может покрыть.",
        },
        {
          eyebrow: "2. Проверка",
          title: "Ожидаемый объем 4TEEN и split видны до действия",
          text: "Кошелек заранее вычисляет ожидаемый объем минта, маршрутизацию 90 / 7 / 3, время следующего обновления цены и время снятия лока до того, как пользователь подтвердит действие.",
        },
        {
          eyebrow: "3. Подтверждение",
          title: "Ресурсы проверяются до запроса на одобрение",
          text: "Слой подтверждения измеряет Energy, Bandwidth и возможный дефицит, чтобы пользователь видел реальную картину исполнения до passcode или biometric approval.",
        },
        {
          eyebrow: "4. Продолжение",
          title: "Controller-side attribution закрывается уже после покупки",
          text: "После того как покупка проходит, система может привязать этого buyer к ambassador, записать verified purchase один раз на purchase ID и позже финализировать claimable reward state через FourteenController, когда operator-side allocation успешно выполнен.",
        },
        {
          eyebrow: "5. Продолжение",
          title: "Сразу после покупки используется unlock timeline",
          text: "Как только direct buy проходит, маршрут лока становится практичным: время разблокировки по каждому batch, countdown и статус transferability уже входят в поток кошелька.",
        },
      ],
      note:
        "Сайт оставляет этот маршрут информационным. Он должен ясно объяснять реальный путь продукта, включая controller-side attribution и reward settlement, а затем передавать пользователя в приложение, а не притворяться самой execution surface.",
    },
    resourceLayer: {
      eyebrow: "Готовность ресурсов",
      title: "Кошелек считает сетевую стоимость частью продукта, а не запоздалой деталью",
      cards: [
        {
          eyebrow: "Нужно сейчас",
          title: "Требуемые ресурсы оцениваются заранее",
          text: "Кошелек оценивает contract-call energy и bandwidth для buyTokens() до подписи, чтобы пользователь не шел в исполнение вслепую.",
        },
        {
          eyebrow: "Доступно сейчас",
          title: "Текущие ресурсы кошелька сравниваются с маршрутом",
          text: "Экран review для direct buy показывает текущее покрытие кошелька, а не только желаемую сумму TRX. Это помогает понять, может ли кошелек чисто выполнить маршрут прямо сейчас.",
        },
        {
          eyebrow: "Не хватает",
          title: "Дефицит выводится напрямую",
          text: "Если у signing wallet не хватает ресурсов, продукт объясняет разницу сразу, а не оставляет пользователя расшифровывать неудачную транзакцию уже после approve.",
        },
      ],
      note:
        "Это важно, потому что direct buy — не просто поле с числом. Это контрактный маршрут, и кошелек уже раскрывает ресурсное состояние, которое за ним стоит.",
    },
    latestPurchases: {
      eyebrow: "Последние покупки",
      title: "Недавние подтвержденные direct buy из живой ленты контракта",
      headers: {
        buyer: "Покупатель",
        spent: "Потрачено",
        minted: "Начислено",
        happened: "Когда",
        verify: "Проверка",
      },
      openTx: "Открыть tx",
      note:
        "Эти строки приходят из последних подтвержденных событий BuyTokens в FourteenToken. Здесь показана реальная активность контракта, а не выдуманный объем.",
      empty: "Последние события direct buy сейчас недоступны.",
      unknownTime: "Время недоступно",
      fallbackBody:
        "Недавние прямые покупки временно скрыты на публичном сайте, пока маршрут стабилизируется. Мобильное приложение остается основной execution surface, а публичные verification links по-прежнему доступны.",
      fallbackPrimaryCta: "Открыть маршрут мобильного приложения",
      fallbackSecondaryCta: "Открыть контракт токена",
    },
    comparison: {
      eyebrow: "Почему Buy != Swap",
      title: "Это разные продуктовые маршруты с разными последствиями",
      cards: [
        {
          eyebrow: "Buy",
          title: "Основной маршрут минта",
          text: "Direct buy вызывает buyTokens(), минтит новый 4TEEN по правилам контракта, создает свежий 14-дневный batch-лок и направляет TRX в рельсы ликвидности, контроллера и аирдропа.",
        },
        {
          eyebrow: "Swap",
          title: "Маршрут вторичного рынка",
          text: "Swap — это market-side торговля против доступной ликвидности. Он не минтит новый 4TEEN, не создает тот же batch-лок direct buy и зависит от DEX-side условий котировки.",
        },
        {
          eyebrow: "Смысл",
          title: "Один актив, но разные входы в систему",
          text: "Если пользователю нужен protocol-native выпуск и видимая маршрутизация, ему нужен direct buy. Если позже нужен market-side execution, нужен swap.",
        },
      ],
    },
    afterPurchase: {
      eyebrow: "После покупки",
      title: "Что происходит дальше, когда покупка уже прошла",
      steps: [
        {
          eyebrow: "Начислено",
          title: "4TEEN появляется сразу",
          text: "Объем токенов минтится в той же транзакции, которая принимает TRX. Это не отложенное backend-распределение.",
        },
        {
          eyebrow: "Залочено",
          title: "Купленный batch входит в собственный 14-дневный лок",
          text: "Для этой конкретной партии создается новая запись лока. Позже кошелек может показать ее отдельной строкой в unlock timeline.",
        },
        {
          eyebrow: "Отслеживается",
          title: "Unlock timeline становится следующим полезным экраном",
          text: "Маршрут лока показывает пользователю, что еще залочено, что разблокируется следующим и когда вообще начинается transferability.",
        },
        {
          eyebrow: "Атрибутировано",
          title: "Связка с ambassador закрывается на стороне контроллера",
          text: "Если покупка должна идти по ambassador-path, FourteenController может привязать buyer к ambassador и записать verified purchase один раз на purchase ID. Claimable reward state появляется только после успешной controller-side allocation write.",
        },
      ],
    },
    signingWallet: {
      eyebrow: "Нужен signing wallet",
      title: "Исполнение принадлежит кошельку, который умеет подписывать",
      body:
        "Сайт может объяснять маршрут, но сама покупка принадлежит signing wallet внутри мобильного приложения. Watch-only identity полезна для чтения состояния, но не для исполнения buyTokens().",
      bullets: [
        "Watch-only кошельки могут смотреть балансы и маршруты, но не могут исполнять direct buy.",
        "При входе в живой маршрут покупки приложение выбирает только из signing wallets.",
        "TRX-баланс и сетевые ресурсы сравниваются с выбранным signing wallet, а не с абстрактным профилем пользователя.",
      ],
    },
    verification: {
      eyebrow: "Проверка",
      title: "Откуда берется эта механика",
      body:
        "Эта страница основана на задеплоенном контракте FourteenToken, текущей модели ownership у контроллера, реализации direct buy в кошельке и маршруте unlock timeline в кошельке. Ее задача — объяснять реальную механику, а не придумывать более дружелюбную альтернативную версию.",
      tokenLabel: "FourteenToken",
      controllerLabel: "FourteenController",
      contractsRepoLabel: "Репозиторий контрактов",
      walletRepoLabel: "Репозиторий кошелька",
    },
    cta: {
      eyebrow: "Следующий шаг",
      title: "Используйте кошелек, когда будете готовы к реальному direct-buy сценарию",
      body:
        "Публичный сайт объясняет маршрут. Сам прямой сценарий покупки, шаг подтверждения и дальнейший unlock-flow живут внутри мобильного кошелька.",
      openApp: "Открыть маршрут приложения",
      openUnlock: "Открыть unlock timeline",
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
