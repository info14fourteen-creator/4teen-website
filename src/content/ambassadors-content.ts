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

export type AmbassadorsPageContent = {
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
      profilesOnChain: HeroStatContent;
      boundBuyers: HeroStatContent;
      rewardsClaimed: HeroStatContent;
      pendingReplay: HeroStatContent;
      readFailed: string;
      readRetry: string;
    };
  };
  sections: {
    cabinetRoute: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
    };
    registration: {
      eyebrow: string;
      title: string;
      intro: string;
      mainCard: BulletCard;
      cards: SimpleCard[];
      note: string;
    };
    ledger: {
      eyebrow: string;
      title: string;
      note: string;
      rows: {
        totalAmbassadors: string;
        activeAmbassadors: string;
        boundBuyers: string;
        trackedVolume: string;
        rewardsAccrued: string;
        rewardsClaimed: string;
        reservedRewards: string;
        ownerAvailable: string;
        unallocatedFunds: string;
      };
    };
    runtime: {
      eyebrow: string;
      title: string;
      note: string;
      readyYes: string;
      readyNo: string;
      rows: {
        operatorWallet: string;
        readyNow: string;
        profilesOnChain: string;
        profilesActive: string;
        pendingReplay: string;
        lastPurchaseSeen: string;
        lastWithdrawalSeen: string;
        energyAvailable: string;
        bandwidthAvailable: string;
        needPerAllocation: string;
        safeFloorAfterRun: string;
      };
    };
    levels: {
      eyebrow: string;
      title: string;
      suffix: string;
    };
    proof: {
      eyebrow: string;
      title: string;
      cards: {
        recordedPurchases: {
          title: string;
          text: string;
        };
        ambassadorsWithPurchases: {
          title: string;
          text: string;
        };
        withdrawals: {
          title: string;
          text: string;
        };
        latestWithdrawal: {
          title: string;
          text: string;
        };
      };
      note: string;
    };
    route: {
      eyebrow: string;
      title: string;
      cards: {
        contract: {
          eyebrow: string;
          title: string;
          text: string;
        };
        walletRepo: {
          eyebrow: string;
          title: string;
          text: string;
        };
        app: {
          eyebrow: string;
          title: string;
          text: string;
        };
      };
      updatedPrefix: string;
    };
  };
};

const ambassadorsContentEn: AmbassadorsPageContent = {
  metadata: {
    title: "Public Ambassador Controller",
    description:
      "4TEEN public ambassador controller with live FourteenController totals, cabinet-backed registration flow, buyer binding proof, reward tracking, and runtime readiness.",
  },
  hero: {
    eyebrow: "FourteenController",
    badge: "Public ambassador controller",
    title: "A Public 4TEEN Ambassador Controller With a Real Cabinet Behind It",
    subtitle:
      "The website is the proof layer. Registration, slug ownership, buyer binding, reward accrual, and withdrawals still live in the wallet cabinet and settle against FourteenController.",
    body: [
      "This route should not pretend the public page is the working cabinet. The real flow starts in the wallet: a user registers an ambassador identity, claims a slug, syncs the on-chain profile, and then accumulates buyer-attributed volume and rewards.",
      "The public site has a different job. It should prove that the controller is live, cabinet profiles exist, buyer bindings are being tracked, purchases are being processed, and reward state stays visible instead of disappearing into a back office.",
    ],
    rotatingLines: [
      "REGISTER. BIND. VERIFY. WITHDRAW.",
      "PUBLIC PROOF. REAL CABINET.",
      "SLUG FIRST. REWARD FLOW LATER.",
    ],
    primaryCta: "Open Wallet Route",
    secondaryCta: "See Registration Flow",
    ctaNote:
      "Cabinet identity, referral link, buyer rows, pending replay, and withdrawals remain wallet-native. The website stays public, readable, and honest.",
    stats: {
      profilesOnChain: {
        label: "Profiles On Chain",
        meta: "Ambassador profiles already visible through the controller-backed cabinet layer.",
      },
      boundBuyers: {
        label: "Bound Buyers",
        meta: "Buyer identities already attached to ambassador profiles.",
      },
      rewardsClaimed: {
        label: "Rewards Claimed",
        meta: "TRX already withdrawn by ambassadors through the cabinet flow.",
      },
      pendingReplay: {
        label: "Pending Replay",
        meta: "Rows still waiting for resource-safe processing instead of being faked as complete.",
      },
      readFailed: "Live ambassador read failed.",
      readRetry: "Try refreshing in a moment.",
    },
  },
  sections: {
    cabinetRoute: {
      eyebrow: "Cabinet Route",
      title: "The public page is not the cabinet. It proves the cabinet exists.",
      intro:
        "That is the clean product split. The wallet owns identity, binding, replay, and withdrawal actions. The site explains the mechanics and shows whether the system is actually moving.",
      mainCard: {
        eyebrow: "Controller + Cabinet",
        title: "Registration and rewards stay wallet-native. Public proof stays open.",
        text:
          "The cabinet endpoint already merges on-chain dashboard state with database rows for buyers, purchases, and pending replay. That means the public site can speak truthfully about the flow without pretending it can replace the cabinet itself.",
        bullets: [
          "The cabinet resolves a referral link from the ambassador slug.",
          "Buyer-attributed purchases are persisted and replayed against the controller when resources allow it.",
          "Claimable reward state and withdrawal history are tracked alongside the on-chain profile.",
        ],
      },
      cards: [
        {
          eyebrow: "Slug ownership",
          title: "A wallet does not become an ambassador by marketing text alone",
          text:
            "The registration flow checks slug availability, prevents duplicate wallet registration, and expects a real on-chain ambassador profile before the route is considered complete.",
        },
        {
          eyebrow: "Buyer binding",
          title: "The earn route starts when purchases are actually attributed",
          text:
            "Bound buyers, attributed purchases, processed controller rows, and pending replay are all separate states. The cabinet does not flatten them into one decorative number.",
        },
      ],
      note:
        "That is why the page should describe a public ambassador controller with a real cabinet behind it, not a fake referral landing page with no operating state.",
    },
    registration: {
      eyebrow: "Registration Flow",
      title: "Registration starts in the wallet, then becomes an on-chain profile.",
      intro:
        "The registration screen is not a loose signup form. It is the point where slug selection, wallet identity, energy routing, and controller sync begin to matter.",
      mainCard: {
        eyebrow: "ambassador_registration",
        title: "The wallet can quote resources, validate the slug, and only then finalize registration.",
        text:
          "The API checks whether the slug is taken, whether the wallet is already registered, and whether the energy route is ready for the ambassador_registration purpose. After the transaction, the cabinet sync verifies that the on-chain profile really exists.",
        bullets: [
          "Slug availability is checked before the route confirms.",
          "Energy rental can be requested specifically for ambassador registration when needed.",
          "The cabinet sync verifies the stored slug hash and exposes the final referral link.",
        ],
      },
      cards: [
        {
          eyebrow: "Wallet identity",
          title: "Registration becomes a profile, not a one-time form fill",
          text:
            "Once synced, the ambassador has a wallet-bound profile with current level, reward percent, buyer count, volume, accrued rewards, claimed rewards, and claimable balance.",
        },
        {
          eyebrow: "Replay safety",
          title: "If the operator side is resource-starved, rows wait instead of lying",
          text:
            "Pending replay is part of the truth layer. The cabinet keeps it visible until operator resources are safe enough to process verified purchases cleanly.",
        },
      ],
      note:
        "So the registration sequence is not cosmetic. It is the doorway into the same cabinet that later holds referral state, purchase rows, and withdrawals.",
    },
    ledger: {
      eyebrow: "Public Ledger",
      title: "Controller totals stay public even when cabinet actions stay private.",
      note:
        "FourteenController exposes system-level counts and balances. The site should make that visible without pretending the public layer can sign cabinet transactions.",
      rows: {
        totalAmbassadors: "Total Ambassadors",
        activeAmbassadors: "Active Ambassadors",
        boundBuyers: "Bound Buyers",
        trackedVolume: "Tracked Volume",
        rewardsAccrued: "Rewards Accrued",
        rewardsClaimed: "Rewards Claimed",
        reservedRewards: "Reserved Rewards",
        ownerAvailable: "Owner Available",
        unallocatedFunds: "Unallocated Purchase Funds",
      },
    },
    runtime: {
      eyebrow: "Cabinet Runtime",
      title: "If resources are low, rows wait instead of pretending they cleared.",
      note:
        "The public runtime view matters because it explains why replay can legitimately queue. Low energy or bandwidth is not a silent failure anymore; it is visible system state.",
      readyYes: "Ready now",
      readyNo: "Needs top-up",
      rows: {
        operatorWallet: "Operator Wallet",
        readyNow: "Ready Now",
        profilesOnChain: "Profiles On Chain",
        profilesActive: "Profiles Active",
        pendingReplay: "Pending Replay",
        lastPurchaseSeen: "Last Purchase Seen",
        lastWithdrawalSeen: "Last Withdrawal Seen",
        energyAvailable: "Energy Available",
        bandwidthAvailable: "Bandwidth Available",
        needPerAllocation: "Need per Allocation",
        safeFloorAfterRun: "Safe Floor After Run",
      },
    },
    levels: {
      eyebrow: "Level Ladder",
      title: "Buyer growth changes the reward share.",
      suffix: "% reward share on qualified flow.",
    },
    proof: {
      eyebrow: "Proof Layer",
      title: "The public side should still show what the cabinet has already processed.",
      cards: {
        recordedPurchases: {
          title: "Recorded Purchases",
          text: "Purchases already written into the cabinet footprint, across processed and pending rows.",
        },
        ambassadorsWithPurchases: {
          title: "Ambassadors With Purchases",
          text: "Profiles that already have purchase attribution moving through the earn route.",
        },
        withdrawals: {
          title: "Withdrawal Events",
          text: "Reward withdrawal rows already captured by the backend and cabinet sync.",
        },
        latestWithdrawal: {
          title: "Latest Withdrawal Seen",
          text: "Most recent recorded ambassador reward withdrawal timestamp.",
        },
      },
      note:
        "This keeps the website grounded in actual cabinet evidence: purchases, replay queue, and withdrawals all leave a visible public footprint.",
    },
    route: {
      eyebrow: "Proof Routes",
      title: "Use the public layer to inspect the controller, the wallet implementation, and the live app.",
      cards: {
        contract: {
          eyebrow: "Contract",
          title: "Open FourteenController",
          text: "Inspect the live controller that holds ambassador system stats and balances.",
        },
        walletRepo: {
          eyebrow: "Wallet Files",
          title: "Open the wallet repo",
          text: "See the cabinet, resource routing, registration logic, and replay flow that power the real product.",
        },
        app: {
          eyebrow: "Wallet Route",
          title: "Open the app route",
          text: "Registration, cabinet state, referral link, and withdrawals belong to the wallet experience.",
        },
      },
      updatedPrefix: "Snapshot updated",
    },
  },
};

const ambassadorsContentByLocale: Record<
  SupportedSiteLocale,
  AmbassadorsPageContent
> = {
  en: ambassadorsContentEn,
  ru: ambassadorsContentEn,
  uz: ambassadorsContentEn,
};

export function getAmbassadorsPageContent(
  locale: SupportedSiteLocale,
): AmbassadorsPageContent {
  return ambassadorsContentByLocale[locale] ?? ambassadorsContentEn;
}
