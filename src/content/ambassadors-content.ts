import type { SupportedSiteLocale } from "@/lib/site-locale";

type ActionLink = {
  href: string;
  label: string;
};

type FlowCard = {
  eyebrow: string;
  title: string;
  text: string;
};

export type AmbassadorsPageContent = {
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
      ambassadorsLabel: string;
      ambassadorsSubtext: string;
      claimedLabel: string;
      claimedSubtext: string;
      purchasesLabel: string;
      purchasesSubtext: string;
      buyersLabel: string;
      buyersSubtext: string;
    };
    noSnapshotTitle: string;
    noSnapshotText: string;
  };
  systemCounts: {
    eyebrow: string;
    title: string;
    note: string;
    rows: {
      totalAmbassadors: string;
      activeAmbassadors: string;
      boundBuyers: string;
      profilesOnChain: string;
      profilesActive: string;
      ambassadorsWithPurchases: string;
    };
  };
  rewardLedger: {
    eyebrow: string;
    title: string;
    noteTitle: string;
    noteText: string;
    rows: {
      trackedVolume: string;
      rewardsAccrued: string;
      rewardsClaimed: string;
      reservedRewards: string;
      ownerAvailable: string;
      unallocatedFunds: string;
    };
  };
  purchaseFootprint: {
    eyebrow: string;
    title: string;
    cards: {
      recordedPurchases: {
        title: string;
        text: string;
      };
      pendingReplay: {
        title: string;
        text: string;
      };
      withdrawalEvents: {
        title: string;
        text: string;
      };
      lastPurchaseSeen: {
        title: string;
        text: string;
      };
    };
    note: string;
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
  flow: {
    eyebrow: string;
    title: string;
    cards: FlowCard[];
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
      app: {
        eyebrow: string;
        title: string;
        text: string;
      };
    };
    updatedPrefix: string;
    actions: {
      contract: ActionLink;
      app: ActionLink;
    };
  };
};

const ambassadorsContentEn: AmbassadorsPageContent = {
  metadata: {
    title: "Ambassadors",
    description:
      "Public 4TEEN ambassador view with live controller totals, buyer growth, reward flow, cabinet readiness, and proof routes.",
  },
  hero: {
    eyebrow: "FourteenController",
    status: "Public earn snapshot",
    title:
      "A growth route built for real buyer capture, visible reward flow, and a cabinet that can scale with the network.",
    lead:
      "The wallet route begins with ambassador identity and grows into a cabinet with tracked buyers, verified purchases, reward progression, and controlled withdrawals. The website keeps that story public without pretending to be the cabinet itself.",
    stats: {
      ambassadorsLabel: "Total Ambassadors",
      ambassadorsSubtext: "active on-chain right now.",
      claimedLabel: "Rewards Claimed",
      claimedSubtext: "TRX already withdrawn by ambassadors.",
      purchasesLabel: "Verified Purchases",
      purchasesSubtext: "Purchases already processed into the earn flow.",
      buyersLabel: "Bound Buyers",
      buyersSubtext: "Buyer identities currently tied to ambassadors.",
    },
    noSnapshotTitle: "Live earn snapshot unavailable.",
    noSnapshotText: "Try refreshing in a moment.",
  },
  systemCounts: {
    eyebrow: "System Counts",
    title: "Who is already inside the ambassador footprint",
    note:
      "This combines public controller totals with cabinet-side profile and purchase footprint from the wallet backend. That keeps the website useful without pretending to be the working cabinet.",
    rows: {
      totalAmbassadors: "Total Ambassadors",
      activeAmbassadors: "Active Ambassadors",
      boundBuyers: "Bound Buyers",
      profilesOnChain: "Profiles On Chain",
      profilesActive: "Profiles Marked Active",
      ambassadorsWithPurchases: "Ambassadors With Purchases",
    },
  },
  rewardLedger: {
    eyebrow: "Reward Ledger",
    title: "What the controller shows about reward motion",
    noteTitle: "Why this matters",
    noteText:
      "claimed rewards show what ambassadors have already withdrawn, reserved rewards show what is still ring-fenced for them, and tracked volume shows how much verified purchase flow has already passed through the controller.",
    rows: {
      trackedVolume: "Tracked Volume",
      rewardsAccrued: "Rewards Accrued",
      rewardsClaimed: "Rewards Claimed",
      reservedRewards: "Reserved Rewards",
      ownerAvailable: "Owner Available",
      unallocatedFunds: "Unallocated Purchase Funds",
    },
  },
  purchaseFootprint: {
    eyebrow: "Purchase Footprint",
    title: "What the growth pipeline has already processed",
    cards: {
      recordedPurchases: {
        title: "Recorded Purchases",
        text: "Purchases tied to ambassadors across processed and pending rows.",
      },
      pendingReplay: {
        title: "Pending Replay",
        text: "Rows still waiting for controller-side processing or operator readiness.",
      },
      withdrawalEvents: {
        title: "Withdrawal Events",
        text: "Confirmed reward withdrawal rows already written by the backend.",
      },
      lastPurchaseSeen: {
        title: "Last Purchase Seen",
        text: "Latest ambassador-attributed purchase timestamp.",
      },
    },
    note:
      "Purchases and withdrawals are counted from the same backend ledger the wallet cabinet already uses. That gives the website a clean public proof layer without needing wallet connection.",
  },
  runtime: {
    eyebrow: "Runtime Readiness",
    title: "Can the operator side process reward rows now",
    note:
      "This is the public version of the same idea the wallet uses: if resources are not safe, reward rows queue instead of pretending everything completed.",
    readyYes: "Yes",
    readyNo: "Needs top-up",
    rows: {
      operatorWallet: "Operator Wallet",
      readyNow: "Ready Now",
      energyAvailable: "Energy Available",
      bandwidthAvailable: "Bandwidth Available",
      needPerAllocation: "Need per Allocation",
      safeFloorAfterRun: "Safe Floor After Run",
    },
  },
  levels: {
    eyebrow: "Level Ladder",
    title: "Buyer growth changes the reward share",
    suffix: "% reward share on qualified flow.",
  },
  flow: {
    eyebrow: "Earn Flow",
    title: "How the product moves from identity to withdrawal",
    cards: [
      {
        eyebrow: "Register",
        title: "Identity first",
        text: "The wallet route begins with ambassador registration, slug ownership, and cabinet identity. The public website does not fake this step as a generic referral form.",
      },
      {
        eyebrow: "Bind",
        title: "Buyer attribution",
        text: "Purchases are not counted from loose traffic guesses. A buyer is bound, the purchase is verified, and only then the controller tracks reward state.",
      },
      {
        eyebrow: "Accrue",
        title: "Reward reservation",
        text: "The controller separates accrued rewards, claimed rewards, owner balance, and reserved rewards, so the cabinet can explain what belongs to ambassadors and what is still waiting.",
      },
      {
        eyebrow: "Withdraw",
        title: "Claimable cabinet",
        text: "The same route later becomes the cabinet: purchases, level progress, pending replay, and withdrawable reward balance live in one place.",
      },
    ],
  },
  route: {
    eyebrow: "Public Route",
    title: "Useful exits from the public layer",
    cards: {
      contract: {
        eyebrow: "Contract",
        title: "Open FourteenController",
        text: "Inspect the live contract on TronScan with the same address this page reads.",
      },
      app: {
        eyebrow: "Wallet Route",
        title: "See the mobile app",
        text: "Registration, cabinet, and withdrawal UX live in the wallet product.",
      },
    },
    updatedPrefix: "Snapshot updated",
    actions: {
      contract: {
        href: "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ",
        label: "Open FourteenController",
      },
      app: {
        href: "/app",
        label: "See the mobile app",
      },
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
