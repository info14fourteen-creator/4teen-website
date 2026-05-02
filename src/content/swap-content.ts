import type { SupportedSiteLocale } from "@/lib/site-locale";

export type SwapPageContent = {
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
      sampleAmount: string;
      sampleAmountMeta: string;
      supportedTargets: string;
      supportedTargetsMeta: string;
      remainderGuard: string;
      remainderGuardMeta: string;
      routerState: string;
      routerStateMeta: string;
      readFailed: string;
      readRetry: string;
    };
    states: {
      live: string;
      partial: string;
      offline: string;
    };
  };
  sections: {
    walletRoute: {
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      openApp: string;
      openUnlock: string;
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
      states: {
        executable: string;
        reviewOnly: string;
      };
      empty: string;
      note: string;
    };
    convenience: {
      eyebrow: string;
      title: string;
      cards: Array<{
        eyebrow: string;
        title: string;
        text: string;
      }>;
      note: string;
    };
    discipline: {
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
      "Public 4TEEN swap route map with live router samples, protected remainder rule, quote-to-confirmation flow, and wallet-side resource discipline.",
  },
  hero: {
    eyebrow: "Swap Route",
    status: "Wallet-first execution rail",
    title:
      "Swap is a real product surface in the wallet: quotes, route review, resource estimation, approval checks, and final signature are already separated cleanly.",
    lead:
      "The website should not pretend to be the execution screen. What it can do well is explain how 4TEEN swap is actually implemented, show which targets are supported, surface live sample routing from the same Sun.io router family, and make the confirmation discipline readable before a user opens the app.",
    stats: {
      sampleAmount: "Sample Quote Size",
      sampleAmountMeta: "Read-only route samples below are refreshed for the same 4TEEN amount.",
      supportedTargets: "Supported Targets",
      supportedTargetsMeta: "The wallet currently exposes direct 4TEEN routes toward TRX and USDT.",
      remainderGuard: "Protected Remainder",
      remainderGuardMeta: "The wallet keeps a minimal 4TEEN dust remainder instead of allowing a full drain.",
      routerState: "Router State",
      routerStateMeta: "Public route sampling checks whether the live router is responding right now.",
      readFailed: "Live swap routing read failed.",
      readRetry: "Try refreshing in a moment.",
    },
    states: {
      live: "Live",
      partial: "Partial",
      offline: "Offline",
    },
  },
  sections: {
    walletRoute: {
      eyebrow: "Wallet Route",
      title: "Execution belongs to the app because the second screen is where the real guarantees happen",
      body:
        "The swap screen in the wallet is intentionally split. The first screen builds quotes and route options. The confirmation screen re-checks allowance, calculates the protected minimum received value from slippage, estimates Energy and Bandwidth, shows burn exposure if resources are missing, and only then asks for passcode or biometrics.",
      bullets: [
        "The quote screen is route discovery, not blind submission.",
        "The confirmation screen can still reject a route if the wallet state or router conditions changed.",
        "A watch-only wallet cannot complete the route because swap still needs a real signer.",
      ],
      openApp: "Open Mobile App Route",
      openUnlock: "Open Unlock Route",
    },
    liveRoutes: {
      eyebrow: "Live Route Samples",
      title: "Read-only routing snapshot from the same router family used by the wallet",
      body:
        "These cards are informational. They are not promises, and they are not executable from the site. They simply show what the public router is returning right now for the sample 4TEEN amount, which helps explain why the wallet treats swap as a live route review surface rather than a static exchange form.",
      labels: {
        route: "Route",
        execution: "Execution",
        impact: "Impact",
        targets: "Targets",
        updated: "Updated",
        state: "State",
      },
      states: {
        executable: "Executable route",
        reviewOnly: "Review-only route",
      },
      empty: "No public route sample is available right now.",
      note:
        "A route can appear here and still be rejected later on confirmation if router conditions shift, the minimum received value no longer holds, or wallet resources are not sufficient at signing time.",
    },
    convenience: {
      eyebrow: "Convenience Layer",
      title: "What the wallet already makes easier for the user",
      cards: [
        {
          eyebrow: "Active Wallet",
          title: "Swap always starts from the currently selected signing wallet",
          text: "The screen does not treat wallets as an afterthought. It pulls the active wallet, reads the real token balance, and keeps watch-only wallets from pretending they can sign.",
        },
        {
          eyebrow: "Route Review",
          title: "The user sees routes instead of being forced into one opaque path",
          text: "Route rows are ranked by executability and expected output, and the first screen stays honest that it is only building options until the confirmation step validates the final route again.",
        },
        {
          eyebrow: "Protected Minimum",
          title: "Slippage is surfaced as a minimum receive boundary before signing",
          text: "The confirmation screen computes the protected output threshold from the current quote, so the user sees the trade-off instead of discovering it only after submission.",
        },
      ],
      note:
        "This is the real convenience story: not fake one-click magic, but fewer hidden assumptions between quote discovery and signature.",
    },
    discipline: {
      eyebrow: "Execution Discipline",
      title: "What keeps swap honest when the market or wallet state moves",
      cards: [
        {
          eyebrow: "Remainder Guard",
          title: "The wallet keeps 0.000001 4TEEN back instead of letting the balance go fully flat",
          text: "That tiny protected remainder is deliberate. The swap implementation stops a user from spending the final dust unit of 4TEEN, which keeps wallet state and later route handling more stable.",
        },
        {
          eyebrow: "Approval Check",
          title: "Allowance is checked again before execution",
          text: "The confirmation screen does not assume approval is already in place. If approval is missing, it shows the extra step before the swap and factors that into resource estimation.",
        },
        {
          eyebrow: "Resource Check",
          title: "Energy and Bandwidth are estimated before the final signature",
          text: "The app estimates approval and swap costs separately, adds headroom, and shows burn exposure if resources are short. That is why swap belongs in the wallet, not in a stateless website button.",
        },
      ],
      note:
        "That final point matters the most: a route is only real when the wallet can still sign it safely with the current account state and network resources.",
    },
    verification: {
      eyebrow: "Verification",
      title: "Where this page gets its shape from",
      body:
        "The narrative here is aligned with the wallet implementation and the public router path it already uses. The site reads live route samples from the same router family, then explains the quote-stage and confirmation-stage behavior without pretending the website itself can execute the swap.",
      labels: {
        router: "Smart router",
        token: "4TEEN token",
        walletRepo: "Wallet repository",
      },
    },
    cta: {
      eyebrow: "Open The Real Route",
      title: "Use the wallet when it is time to quote, review, and sign",
      body:
        "The public page is here to explain the route clearly. The execution surface is still the mobile wallet, where routing, approval, slippage protection, and resource checks can all happen against a real signing account.",
      openApp: "Open Mobile App",
      openBuy: "Open Buy Route",
    },
  },
};

const swapContentByLocale: Partial<Record<SupportedSiteLocale, SwapPageContent>> = {
  en: swapContentEn,
};

export function getSwapPageContent(locale: SupportedSiteLocale) {
  return swapContentByLocale[locale] ?? swapContentEn;
}
