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

const swapContentByLocale: Partial<Record<SupportedSiteLocale, SwapPageContent>> =
  {
    en: swapContentEn,
  };

export function getSwapPageContent(locale: SupportedSiteLocale) {
  return swapContentByLocale[locale] ?? swapContentEn;
}
