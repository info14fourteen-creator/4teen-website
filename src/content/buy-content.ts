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

const buyContentByLocale: Partial<Record<SupportedSiteLocale, BuyPageContent>> = {
  en: buyContentEn,
};

export function getBuyPageContent(locale: SupportedSiteLocale) {
  return buyContentByLocale[locale] ?? buyContentEn;
}
