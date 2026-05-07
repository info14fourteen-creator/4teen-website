import type { SupportedSiteLocale } from "@/lib/site-locale";

export type UnlockPageContent = {
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
      lockWindow: string;
      lockWindowMeta: string;
      lockedNow: string;
      lockedNowMeta: string;
      circulatingNow: string;
      circulatingNowMeta: string;
      priceFallback: string;
      priceUnavailable: string;
      readFailed: string;
      readRetry: string;
    };
  };
  sections: {
    unlockContext: {
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      openApp: string;
      openBuy: string;
    };
    liveLockMap: {
      eyebrow: string;
      title: string;
      rows: {
        totalSupply: string;
        activeLockBatches: string;
        currentlyLocked: string;
        vaultCustody: string;
        freelyCirculating: string;
        nextUnlock: string;
        snapshotUpdated: string;
      };
      note: string;
    };
    upcomingUnlocks: {
      eyebrow: string;
      title: string;
      headers: {
        buyer: string;
        amount: string;
        unlockAt: string;
        source: string;
      };
      openTx: string;
      empty: string;
      note: string;
    };
    vaultLayer: {
      eyebrow: string;
      title: string;
      body: string;
      note: string;
    };
    lockMechanics: {
      eyebrow: string;
      title: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
    };
    walletRoute: {
      eyebrow: string;
      title: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
      note: string;
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
      openBuy: string;
    };
  };
};

const unlockContentEn: UnlockPageContent = {
  metadata: {
    title: "Unlock 4TEEN | Lock Map And Release Timing",
    description:
      "Public 4TEEN unlock map with current locked supply, vault custody, freely circulating estimate, upcoming unlock batches, and wallet-side unlock timeline context.",
    openGraphTitle: "Unlock 4TEEN",
    openGraphDescription:
      "Read the public 4TEEN lock map: current locked supply, freely circulating estimate, upcoming unlock batches, and the wallet route for personal release tracking.",
  },
  hero: {
    eyebrow: "Unlock Timeline",
    badge: "Public lock topology",
    title: "Track 4TEEN Unlocks Before a Locked Batch Becomes Liquid",
    subtitle:
      "Every direct buy mints immediately, locks immediately, and becomes transferable only after its own 14-day timer expires.",
    body: [
      "The mobile wallet shows the personal unlock timeline for the selected signing wallet. The public site should show the system map: what is still locked, what is already liquid, and which direct-buy batches unlock next.",
      "That means no fake personal portfolio on the website. Just the public topology of release timing, reserve custody, and the batch-by-batch path from locked mint to movable balance.",
    ],
    primaryCta: "Open Unlock in App",
    secondaryCta: "Open Buy Route",
    ctaNote:
      "Personal unlock rows, countdowns, and address-specific availability still live in the mobile wallet. The site explains the release mechanics and the public lock map.",
    rotatingLines: [
      "Every Buy Gets Its Own Timer.",
      "Locked First. Liquid Later.",
      "Public Map. Wallet Timeline.",
      "Release Depends On The Batch.",
      "Transferability Starts After Unlock.",
    ],
    stats: {
      directPrice: "Direct Buy Price",
      directPriceMeta:
        "Current contract-side entry price per 4TEEN before the batch hits its own 14-day lock window.",
      lockWindow: "Lock Window",
      lockWindowMeta:
        "Each direct-buy batch stays frozen until its own release timestamp arrives.",
      lockedNow: "Locked Now",
      lockedNowMeta: "System-wide direct-buy batches still inside the 14-day lock window.",
      circulatingNow: "Freely Circulating",
      circulatingNowMeta: "Public estimate after removing active locks and vault custody from total supply.",
      priceFallback: "1.147500",
      priceUnavailable: "Live price unavailable right now. Fallback reflects the latest known direct route.",
      readFailed: "Live unlock read failed.",
      readRetry: "Try refreshing in a moment.",
    },
  },
  sections: {
    unlockContext: {
      eyebrow: "Wallet Context",
      title: "Personal unlock timeline lives inside the mobile wallet",
      body:
        "The website can explain the lock model and show public release topology, but the personal unlock timeline belongs to the app because it depends on the selected wallet address, direct-buy history for that wallet, and live on-chain reads for lockedBalanceOf(account).",
      bullets: [
        "Every direct buy creates its own lock batch with its own release timestamp.",
        "Wallet unlock timeline tracks only direct-buy history tied to the selected wallet, not generic swap history.",
        "Once a batch unlocks, the tokens become transferable and market routes like swap become relevant.",
      ],
      openApp: "Open Mobile App Route",
      openBuy: "Open Buy Route",
    },
    liveLockMap: {
      eyebrow: "Live Lock Map",
      title: "How much 4TEEN is locked and how much is actually liquid",
      rows: {
        totalSupply: "Total Supply",
        activeLockBatches: "Active Lock Batches",
        currentlyLocked: "Currently Locked",
        vaultCustody: "Vault Custody",
        freelyCirculating: "Freely Circulating",
        nextUnlock: "Next Unlock",
        snapshotUpdated: "Snapshot Updated",
      },
      note:
        "Freely circulating here is a public systems estimate: total supply minus active direct-buy locks minus tokens held in reserve vault contracts. It is intentionally stricter than a naive totalSupply view.",
    },
    upcomingUnlocks: {
      eyebrow: "Upcoming Unlocks",
      title: "Recent direct-buy batches that still have time left on their lock",
      headers: {
        buyer: "Buyer",
        amount: "Locked Batch",
        unlockAt: "Unlock At",
        source: "Source",
      },
      openTx: "Open tx",
      empty: "No active direct-buy lock batches are visible right now.",
      note:
        "This release map is built from confirmed BuyTokens events that still sit inside the 14-day lock window. It shows public batch timing, not a private wallet portfolio.",
    },
    vaultLayer: {
      eyebrow: "Vault Layer",
      title: "Reserve custody is not the same as free circulation",
      body:
        "The 4TEEN architecture keeps reserve allocations in dedicated contracts. FourteenVault holds liquidity reserve tokens, AirdropVault holds staged community distribution reserves, and TeamLockVault isolates the team allocation. These balances exist on-chain, but they should not be presented as freely circulating supply.",
      note:
        "AirdropVault also receives routed TRX on direct buy, but the token balance shown here is only the 4TEEN reserve actually parked in vault custody.",
    },
    lockMechanics: {
      eyebrow: "Lock Mechanics",
      title: "What the main token contract actually enforces",
      cards: [
        {
          eyebrow: "Mint",
          title: "Direct buy mints first",
          text: "buyTokens() mints 4TEEN in the same transaction that receives TRX. There is no off-chain fulfillment queue for the purchased amount.",
        },
        {
          eyebrow: "Batch",
          title: "Every purchase creates a separate lock entry",
          text: "The token contract appends a new LockInfo record per direct buy. Locks are not merged into one generic timer.",
        },
        {
          eyebrow: "Rule",
          title: "Transfers are blocked by lockedBalanceOf()",
          text: "transfer() and transferFrom() both require available balance after subtracting lockedBalanceOf(account). Locked tokens cannot be moved early.",
        },
      ],
    },
    walletRoute: {
      eyebrow: "Wallet Route",
      title: "How the app turns this contract state into a usable timeline",
      cards: [
        {
          eyebrow: "Balance",
          title: "Reads total, locked, and available balance",
          text: "The wallet combines balanceOf(account) with lockedBalanceOf(account) to show what is still frozen and what is already movable.",
        },
        {
          eyebrow: "History",
          title: "Builds rows from confirmed BuyTokens events",
          text: "Each direct-buy event becomes a visible unlock row with exact amount, unlock time, countdown, and Tronscan transaction path.",
        },
        {
          eyebrow: "Action",
          title: "Points the user to the next valid route",
          text: "Unlock timeline is the right route after buy. Swap becomes relevant only after the locked batch is released and actually transferable.",
        },
      ],
      note:
        "This is why the public site should explain unlock clearly, then send the user into the wallet for personal history instead of pretending to be the execution surface.",
    },
    verification: {
      eyebrow: "Verification",
      title: "Where the numbers and lock logic come from",
      body:
        "This page uses the deployed FourteenToken contract, the wallet unlock-timeline implementation, and the known reserve vault addresses. It explains live mechanics and custody structure instead of flattening everything into a generic token-supply chart.",
      tokenLabel: "FourteenToken",
      controllerLabel: "FourteenController",
      contractsRepoLabel: "Contracts repository",
      walletRepoLabel: "Wallet repository",
    },
    cta: {
      eyebrow: "Next Step",
      title: "Use the app when you need your personal unlock timeline",
      body:
        "The public site can show the protocol-wide lock map. The wallet is still the right surface for address-specific unlock rows, countdowns, and post-buy follow-up.",
      openApp: "Open Unlock in App",
      openBuy: "Open Buy Route",
    },
  },
};

const unlockContentByLocale: Partial<Record<SupportedSiteLocale, UnlockPageContent>> = {
  en: unlockContentEn,
};

export function getUnlockPageContent(locale: SupportedSiteLocale) {
  return unlockContentByLocale[locale] ?? unlockContentEn;
}
