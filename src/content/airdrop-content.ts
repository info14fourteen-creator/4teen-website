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
    status: "Live on-chain distribution surface",
    title: "The airdrop is not a promo button. It is a wave-based vault with live route logic.",
    lead:
      "The mobile wallet already treats airdrop as a real product surface: Telegram session state, wallet-aware claim state, and on-chain vault state are read together. This page mirrors the vault side of that system and shows the actual wave, balance, unlocked quota, and route model in real time, but the live claim flow itself belongs to the wallet app.",
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

const airdropContentByLocale: Partial<Record<SupportedSiteLocale, AirdropPageContent>> = {
  en: airdropContentEn,
};

export function getAirdropPageContent(locale: SupportedSiteLocale) {
  return airdropContentByLocale[locale] ?? airdropContentEn;
}
