import type { SupportedSiteLocale } from "@/lib/site-locale";
import {
  officialContractsRepoUrl,
  officialSocialUrls,
  officialSupportEmail,
  officialWalletRepoUrl,
  officialWebsiteUrl,
} from "@/content/official-links";

export type PublicPageCard = {
  eyebrow: string;
  title: string;
  body: string;
};

export type PublicPageSection = {
  eyebrow: string;
  title: string;
  body?: string;
  bullets?: string[];
  note?: string;
};

export type PublicPageLink = {
  label: string;
  href: string;
};

export type PublicPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    title: string;
    lead: string;
  };
  summaryCards: PublicPageCard[];
  sections: PublicPageSection[];
  links?: PublicPageLink[];
  footerNote?: string;
};

export type SupportPageContent = PublicPageContent & {
  channelPanel: {
    eyebrow: string;
    title: string;
    routeLabel: string;
  };
  scopePanel: {
    eyebrow: string;
    title: string;
    canHelp: string;
    cannotHelp: string;
  };
  channels: Array<{
    label: string;
    href: string;
    note: string;
  }>;
  supportScope: {
    canHelp: string[];
    cannotHelp: string[];
  };
  contactPanel: {
    eyebrow: string;
    title: string;
    body: string;
    emailTitle: string;
    emailMissing: string;
    securityTitle: string;
    securityBody: string;
  };
};

const privacyContentEn: PublicPageContent = {
  metadata: {
    title: "Privacy",
    description:
      "How the 4TEEN website and wallet handle public blockchain data, local wallet state, external links, and privacy questions.",
  },
  hero: {
    eyebrow: "Privacy",
    status: "Public policy",
    title:
      "4TEEN is built around public blockchain state and non-custodial wallet behavior, so the privacy story needs to stay simple and truthful.",
    lead:
      "The public website is mainly informational. The mobile wallet is non-custodial. Public chain data may be queried so balances, resources, protocol state, and campaign status can be displayed, but seed phrases and private keys are not meant to be sent through this site.",
  },
  summaryCards: [
    {
      eyebrow: "Website",
      title: "No wallet secrets here",
      body:
        "The current public site does not ask you to enter a seed phrase or raw private key. If you ever see that on a public website, stop and verify the source first.",
    },
    {
      eyebrow: "Blockchain",
      title: "Addresses are public by design",
      body:
        "Wallet addresses, transactions, balances, and contract interactions on TRON are public records. The site and app may read them to show protocol state, but they are not private data once they are on-chain.",
    },
    {
      eyebrow: "Infrastructure",
      title: "Basic request logs may still exist",
      body:
        "Even without a dedicated third-party analytics tracker in the current web build, normal hosting, CDN, API, and explorer infrastructure can still process routine request data such as IP address, browser, time, and requested route.",
    },
  ],
  sections: [
    {
      eyebrow: "1. Public Website",
      title: "What this website is designed to do",
      body:
        "The 4TEEN website is used to present protocol information, release pages, public contract links, airdrop state, ambassador state, price reads, and download routes for the mobile app. It is not intended to custody funds or collect secret wallet credentials.",
      bullets: [
        "Display public protocol and contract information",
        "Read public market, vault, controller, and route snapshots",
        "Link out to explorers, repositories, stores, and official social channels",
      ],
    },
    {
      eyebrow: "2. Mobile Wallet",
      title: "What the app may keep locally on device",
      body:
        "The mobile wallet already supports local wallet labels, language preference, display currency, security settings, watch-only flows, and cache management. Based on the code paths currently visible, these kinds of settings can be stored locally on the device to make the app usable, while private signing material is meant to stay under user control rather than being stored on a 4TEEN website server.",
      note:
        "If you import, create, or unlock a wallet, treat the mobile device and your backup practices as the real security boundary.",
    },
    {
      eyebrow: "3. Public Blockchain Reads",
      title: "What may be queried to show balances or protocol state",
      body:
        "To render balances, resources, airdrop status, ambassador state, price information, or other public protocol views, 4TEEN services may query blockchain infrastructure, explorer endpoints, proxy endpoints, or 4TEEN-operated snapshot routes. Those reads can involve a public wallet address or public contract state, but they do not require a private key.",
      bullets: [
        "Public wallet addresses you intentionally view or paste",
        "Contract addresses and contract storage values",
        "Transaction hashes and public event history",
      ],
    },
    {
      eyebrow: "4. External Services",
      title: "What happens when you leave 4TEEN surfaces",
      body:
        "The website and wallet can open TronScan, DEX routes, repositories, social channels, and app-store pages. Those external services run under their own privacy and data-handling rules. Opening an external link means your request is handled by that third party, not only by 4TEEN.",
    },
    {
      eyebrow: "5. No false privacy promises",
      title: "What we are not claiming",
      body:
        "This policy does not claim KYC processing, custody services, compliance certifications, or invisible privacy guarantees that are not clearly enforced by the current code and product behavior. If a behavior depends on public blockchain state or third-party infrastructure, we say so directly.",
    },
  ],
  links: [
    { label: "Official website", href: officialWebsiteUrl },
    { label: "Wallet app repository", href: officialWalletRepoUrl },
    { label: "Smart contracts repository", href: officialContractsRepoUrl },
  ],
  footerNote: officialSupportEmail
    ? `Privacy questions can be directed to ${officialSupportEmail}.`
    : "A dedicated public privacy mailbox is not published yet. Until it is, use the official support channels on the Support page and avoid sharing private keys or seed phrases there.",
};

const termsContentEn: PublicPageContent = {
  metadata: {
    title: "Terms",
    description:
      "Base terms for using the 4TEEN website, wallet routes, public protocol pages, and on-chain ecosystem surfaces.",
  },
  hero: {
    eyebrow: "Terms",
    status: "Public terms",
    title:
      "4TEEN is an interface layer around public blockchain systems, wallet execution, and on-chain contracts, not a promise of outcome.",
    lead:
      "These terms should be read in a practical way: code, wallet approval, network state, and smart-contract rules define what actually happens. The site and app can help you reach those surfaces, but they do not remove on-chain risk or market risk.",
  },
  summaryCards: [
    {
      eyebrow: "Nature",
      title: "Interface, not custody",
      body:
        "The website and wallet help you view, prepare, and sign blockchain actions. They do not become the owner of your assets just because they display a route.",
    },
    {
      eyebrow: "Risk",
      title: "No market guarantee",
      body:
        "Token price, liquidity, release timing, reward outcomes, and campaign results can change. Nothing on the site should be read as a guaranteed return or guaranteed allocation.",
    },
    {
      eyebrow: "Responsibility",
      title: "You approve the action",
      body:
        "If you sign a transaction, paste an address, or interact with a contract, you remain responsible for checking the route, asset, amount, and destination.",
    },
  ],
  sections: [
    {
      eyebrow: "1. Product Nature",
      title: "The site and app are access layers",
      body:
        "4TEEN surfaces include informational pages, public protocol dashboards, mobile wallet routes, direct-buy flows, liquidity controls, airdrop views, and ambassador routes. These surfaces help you reach blockchain actions, but they are still interfaces layered on top of public networks and deployed contracts.",
    },
    {
      eyebrow: "2. Non-custodial and on-chain reality",
      title: "The protocol is defined by contracts and user signatures",
      body:
        "If a behavior is enforced by contract code, wallet approval, or visible resource checks, it is real. If something is only implied by copy and not backed by execution logic, do not treat it as a guarantee.",
      bullets: [
        "Transactions are irreversible once confirmed on-chain",
        "Network congestion, fees, energy, and bandwidth can affect execution",
        "Contract behavior depends on deployed code and current state",
      ],
    },
    {
      eyebrow: "3. No investment promise",
      title: "Nothing here is financial advice",
      body:
        "4TEEN does not promise profit, token appreciation, guaranteed airdrop value, guaranteed ambassador income, or guaranteed liquidity results. Market behavior is external, and all participation remains at the user's own risk.",
    },
    {
      eyebrow: "4. Reward and campaign logic",
      title: "Eligibility is not a marketing slogan",
      body:
        "Airdrop, ambassador, and reward flows can depend on contract rules, campaign conditions, anti-abuse checks, verification logic, resource availability, or backend processing queues. Participation alone does not guarantee payout.",
    },
    {
      eyebrow: "5. External links and third parties",
      title: "Not every linked surface is controlled by 4TEEN",
      body:
        "Explorers, repositories, DEX routes, social channels, and store pages may be linked from the site or app. Those services operate under their own terms and uptime conditions. 4TEEN does not guarantee their availability or behavior.",
    },
    {
      eyebrow: "6. User responsibility",
      title: "You still need to verify what you are doing",
      bullets: [
        "Check contract addresses and asset symbols before signing",
        "Protect your seed phrase, private key, and device access",
        "Verify destination addresses and transaction amounts",
        "Use only official channels when checking releases or support",
      ],
      note:
        "Loss caused by wrong addresses, compromised devices, leaked recovery phrases, or misunderstood contract behavior remains a user-side risk.",
    },
    {
      eyebrow: "7. Updates",
      title: "The product can change over time",
      body:
        "Pages, wallet routes, protocol integrations, campaign logic, and public copy can change as the product evolves. Continued use of the website or app after changes means you are using the current version of the product, not an older expectation.",
    },
  ],
  links: [
    { label: "Open the mobile app page", href: "/app" },
    { label: "Open verification", href: "/verification" },
    { label: "Open smart contracts repository", href: officialContractsRepoUrl },
  ],
  footerNote:
    "Read these terms together with contract addresses, explorer state, and the wallet confirmation screen. Those surfaces define reality more strongly than any marketing sentence.",
};

const supportContentEn: SupportPageContent = {
  metadata: {
    title: "Support",
    description:
      "Official 4TEEN support scope, contact routes, response expectations, and what the team can and cannot help with.",
  },
  hero: {
    eyebrow: "Support",
    status: "Official channels",
    title:
      "Support should help you reach the right route, understand the public system, and verify what happened, without pretending anyone can reverse blockchain reality for you.",
    lead:
      "Use official 4TEEN channels for website, wallet, release, or public protocol questions. For anything transaction-related, bring specific facts like wallet address, transaction hash, screenshots, route name, device type, and app build if relevant.",
  },
  summaryCards: [
    {
      eyebrow: "Best for",
      title: "Routing and verification help",
      body:
        "Support can help you find the right official page, wallet surface, contract link, or public status route and understand what those surfaces are showing.",
    },
    {
      eyebrow: "Bring",
      title: "Useful evidence",
      body:
        "The fastest path is factual: wallet address, tx hash, page URL, screenshot, timestamp, and short description of what you expected versus what happened.",
    },
    {
      eyebrow: "Never send",
      title: "No recovery secrets",
      body:
        "Do not send seed phrases, raw private keys, or device passcodes to any support channel. Official support should never need them.",
    },
  ],
  sections: [
    {
      eyebrow: "1. Support scope",
      title: "What support is meant to cover",
      body:
        "Support is for route guidance, factual troubleshooting, official link verification, public protocol information, wallet-surface clarification, release-page help, and identifying which contract or product layer is relevant to your issue.",
    },
    {
      eyebrow: "2. Limits of support",
      title: "What support cannot promise",
      body:
        "Support cannot reverse confirmed blockchain transactions, recover a lost seed phrase, guarantee token price outcome, guarantee future rewards, or manually override public contract rules just because a result was not what you wanted.",
    },
    {
      eyebrow: "3. Response quality",
      title: "How to get a faster answer",
      bullets: [
        "Include the exact route or page where the issue appeared",
        "If it is on-chain, include the wallet address and tx hash",
        "If it is app-related, include device, OS, and app build details",
        "If it is visual, include a screenshot or short screen recording",
      ],
      note:
        "Support quality improves when the report is factual and reproducible, not only emotional. That helps the team verify what actually happened.",
    },
  ],
  channels: [
    {
      label: "Telegram",
      href: officialSocialUrls.telegram,
      note: "Fastest public community route for announcements and basic guidance.",
    },
    {
      label: "Discord",
      href: officialSocialUrls.discord,
      note: "Useful for structured discussion, troubleshooting context, and follow-up messages.",
    },
    {
      label: "X",
      href: officialSocialUrls.x,
      note: "Best for public release visibility, but not ideal for sensitive issue details.",
    },
    {
      label: "WhatsApp",
      href: officialSocialUrls.whatsapp,
      note: "Useful if a direct support handoff is needed and the official number is appropriate for your region.",
    },
    {
      label: "GitHub",
      href: officialWalletRepoUrl,
      note: "Useful for code, release, and repository-level issues when the problem is clearly technical.",
    },
  ],
  channelPanel: {
    eyebrow: "Official channels",
    title: "Use official exits before trusting support.",
    routeLabel: "Official route",
  },
  scopePanel: {
    eyebrow: "Support scope",
    title:
      "Support should clarify, verify, and route. It should not invent powers it does not have.",
    canHelp: "Can help",
    cannotHelp: "Cannot help",
  },
  supportScope: {
    canHelp: [
      "Official route verification and public page guidance",
      "App download, release-page, and website troubleshooting",
      "Contract, explorer, or public status-page orientation",
      "Basic factual triage for airdrop, ambassador, or wallet-route issues",
    ],
    cannotHelp: [
      "Recover lost seed phrases, private keys, or device passcodes",
      "Undo confirmed on-chain transactions",
      "Guarantee price outcome, token performance, or reward eligibility",
      "Act as a custodian or take control of user funds",
    ],
  },
  contactPanel: {
    eyebrow: "Contact",
    title: "Use only official 4TEEN exits",
    body:
      "If a support route is not linked from the official site, wallet, or official social list, verify it before trusting it. Fake support is a common attack pattern in crypto products.",
    emailTitle: "Support email",
    emailMissing:
      "A dedicated public support mailbox is not published in the current repositories. Until one is published, use the official channels below and never share secret recovery material there.",
    securityTitle: "Security reminder",
    securityBody:
      "No support channel should ask for your seed phrase, raw private key, or full device unlock secrets. If that happens, treat it as unsafe.",
  },
  links: [
    { label: "Open the mobile app page", href: "/app" },
    { label: "Open privacy", href: "/privacy" },
    { label: "Open terms", href: "/terms" },
  ],
  footerNote:
    "For release links, contract references, or public state pages, start from the official website or the official wallet repository so you do not drift into unofficial mirrors.",
};

const publicPagesContentByLocale: Partial<
  Record<
    SupportedSiteLocale,
    {
      privacy: PublicPageContent;
      terms: PublicPageContent;
      support: SupportPageContent;
    }
  >
> = {
  en: {
    privacy: privacyContentEn,
    terms: termsContentEn,
    support: supportContentEn,
  },
};

export function getPublicPagesContent(locale: SupportedSiteLocale) {
  return publicPagesContentByLocale[locale] ?? publicPagesContentByLocale.en!;
}
