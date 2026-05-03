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
      "4TEEN swap overview with live route ranking, broader token coverage inside the wallet, allowance and minimum-receive protection, and a cleaner path into the mobile app.",
  },
  hero: {
    eyebrow: "Swap Route",
    status: "Wallet-first execution rail",
    title:
      "Swap already works like a real wallet product: choose a target asset, compare ranked routes, review protection rules, and sign only when the path still looks right.",
    lead:
      "The site should create confidence, not cosplay a DEX. In the wallet, route discovery is tied to a real signing wallet, a broader target-asset list, automatic route ranking, minimum-receive protection, allowance checks, and network-resource readiness. The website keeps only a small public preview of that engine and points the user to the app when it is time to act.",
    stats: {
      sampleAmount: "Sample Quote Size",
      sampleAmountMeta: "Read-only route samples below are refreshed for the same 4TEEN amount.",
      supportedTargets: "Public Sample Routes",
      supportedTargetsMeta: "The website keeps only anchor routes public. The wallet can browse a much broader target set when router liquidity exists.",
      remainderGuard: "Protected Remainder",
      remainderGuardMeta: "The wallet keeps a minimal 4TEEN remainder instead of draining the balance flat.",
      routerState: "Router State",
      routerStateMeta: "A fast signal for whether public route sampling is responding right now.",
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
      title: "The app is where interest turns into action",
      body:
        "The swap experience is intentionally split in two. First comes asset choice and route discovery. Then comes the confirmation step that checks approvals, protected minimum receive, network resources, and final signing readiness before anything is sent.",
      bullets: [
        "The quote screen is for comparing opportunity, not blind submission.",
        "Target assets are not limited to two website tokens; the wallet can browse a much broader TRON asset universe when routes exist.",
        "A watch-only wallet can inspect the route, but only a signing wallet can pass allowance and final confirmation.",
      ],
      openApp: "Open Mobile App Route",
      openUnlock: "Open Unlock Route",
    },
    liveRoutes: {
      eyebrow: "Live Route Samples",
      title: "A small public window into the live routing engine",
      body:
        "These cards are a preview, not the full product. They show what the public router is returning right now for a sample 4TEEN amount, which is enough to show how the route behaves without flattening the whole experience into a fake website swap form.",
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
        "Inside the wallet, routes are sorted by expected output and refreshed against the currently selected target token. This public layer keeps only a small sample visible and leaves full route choice to the app.",
    },
    convenience: {
      eyebrow: "Convenience Layer",
      title: "Why the wallet route feels lighter than a generic DEX screen",
      cards: [
        {
          eyebrow: "Target Assets",
          title: "The route starts from a broader wallet asset list",
          text: "The target picker is not boxed into one promotional pair. The wallet can work with TRX, stable assets, and user-managed token entries when router liquidity exists.",
        },
        {
          eyebrow: "Route Review",
          title: "The user sees ranked options, not one opaque path",
          text: "Routes are sorted from highest output to lowest, so the user can review what actually wins before the app asks for a signature.",
        },
        {
          eyebrow: "Protected Minimum",
          title: "Minimum receive is visible before signing",
          text: "The wallet carries slippage protection into confirmation, so the user sees the protected floor before the swap leaves the account.",
        },
      ],
      note:
        "That is the real convenience story: broader token choice, less guesswork, less hidden friction, and a cleaner path from curiosity to action.",
    },
    discipline: {
      eyebrow: "Execution Discipline",
      title: "What keeps the route trustworthy when conditions move",
      cards: [
        {
          eyebrow: "Allowance Check",
          title: "Approval is checked before the route goes live",
          text: "If approval is missing, the wallet surfaces the extra step first instead of dumping the user into a failing swap attempt.",
        },
        {
          eyebrow: "Resource Picture",
          title: "Energy and Bandwidth are part of the review",
          text: "Approval cost and swap cost are estimated separately, extra headroom is added, and burn exposure is shown before the final tap.",
        },
        {
          eyebrow: "Remainder Guard",
          title: "A tiny 4TEEN remainder stays behind on purpose",
          text: "That protected dust unit keeps the wallet from ending in a brittle zero-balance edge case and makes later route handling calmer.",
        },
      ],
      note:
        "A route only becomes real when the wallet can still sign it cleanly with the current account state, allowance state, and network resources.",
    },
    verification: {
      eyebrow: "Verification",
      title: "Where this route story comes from",
      body:
        "This page follows the real wallet implementation: live route reads, route ranking, target-token switching, allowance checks, and final swap execution through the same router family behind the app.",
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
        "The site should make the opportunity understandable. The mobile wallet is where the broader target list, ranked route choices, approval checks, protection rules, and final signature all come together.",
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
