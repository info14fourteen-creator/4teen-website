import type { SupportedSiteLocale } from "@/lib/site-locale";
import {
  officialDirectorName,
  officialDunsNumber,
  officialLegalAddress,
  officialLegalEntityName,
  officialLegalEntityShortName,
  officialRegistrationDate,
  officialRegistrationNumber,
  officialSupportPhoneDisplay,
  officialContractsRepoUrl,
  officialSocialUrls,
  officialSupportEmail,
  officialTaxId,
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
  download?: string;
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
  linksEyebrow?: string;
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
    phoneTitle: string;
    legalTitle: string;
    legalBody: string;
    securityTitle: string;
    securityBody: string;
  };
};

const privacyContentEn: PublicPageContent = {
  metadata: {
    title: "Privacy",
    description:
      "How 4teen.me, operated by AG PLUS LLC, handles website requests, support messages, public blockchain data, and third-party infrastructure.",
  },
  hero: {
    eyebrow: "Privacy",
    status: "Public policy",
    title:
      "4teen.me is operated by AG PLUS LLC, and the privacy policy should match the real product surface, the real support flow, and the public nature of blockchain data.",
    lead:
      `${officialLegalEntityShortName} operates the public website, support mailbox, and official communication routes for 4TEEN. The website is mainly informational, the wallet is non-custodial, and public chain data may be queried so balances, protocol state, and campaign context can be displayed without asking users to submit seed phrases or raw private keys through the site.`,
  },
  summaryCards: [
    {
      eyebrow: "Operator",
      title: "AG PLUS LLC is the legal operator",
      body:
        `${officialLegalEntityName} is registered in Uzbekistan under registration number ${officialRegistrationNumber}, taxpayer identification number ${officialTaxId}, and D-U-N-S® number ${officialDunsNumber}.`,
    },
    {
      eyebrow: "Blockchain",
      title: "Addresses are public by design",
      body:
        "Wallet addresses, transactions, balances, and contract interactions on TRON are public records. The site and app may read them to show protocol state, but they are not private data once they are on-chain.",
    },
    {
      eyebrow: "Infrastructure",
      title: "Support and hosting data may still be processed",
      body:
        "Routine request metadata, support messages, and third-party infrastructure logs may be processed by hosting, CDN, email, API, explorer, and messaging providers when you use the website or contact support.",
    },
  ],
  sections: [
    {
      eyebrow: "1. Legal operator",
      title: "Who operates 4teen.me",
      body:
        `${officialLegalEntityName} (${officialLegalEntityShortName}) operates 4teen.me as the public website and official support surface for the 4TEEN ecosystem. The company registration date is ${officialRegistrationDate}, the director is ${officialDirectorName}, and the registered address is ${officialLegalAddress}.`,
      bullets: [
        `Registered address: ${officialLegalAddress}`,
        `Support contact: ${officialSupportEmail} / ${officialSupportPhoneDisplay}`,
        `D-U-N-S® number: ${officialDunsNumber}`,
      ],
    },
    {
      eyebrow: "2. Data we may process",
      title: "What information may be processed when you use the site or contact support",
      body:
        "When you browse the site, open support channels, or ask a question, AG PLUS LLC and its service providers may process contact details you choose to provide and routine technical data needed to keep the website and support routes working.",
      bullets: [
        "Name, email address, phone number, or message content if you send them to support",
        "IP address, browser type, device information, timestamps, requested routes, and referral information in normal infrastructure logs",
        "Transaction hashes, wallet addresses, and screenshots if you intentionally provide them for support or verification",
      ],
      note:
        "Do not send seed phrases, raw private keys, or device unlock secrets through email, WhatsApp, Telegram, or any support form.",
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
        "The website and wallet can open TronScan, DEX routes, repositories, app stores, D&B verification surfaces, social channels, and messaging apps. Those services run under their own privacy and data-handling rules. Opening an external link means your request is handled by that third party, not only by 4TEEN or AG PLUS LLC.",
    },
    {
      eyebrow: "5. Retention and security",
      title: "How privacy expectations should stay realistic",
      body:
        "We aim to keep access to support information limited to people who need it, but no internet-facing system can promise absolute security. Public blockchain data is visible by design, and third-party infrastructure may keep its own logs according to its own retention policies.",
    },
    {
      eyebrow: "6. Your questions and rights",
      title: "How to contact the operator about privacy",
      body:
        `If you have a privacy question about the website, support routes, or how your message was handled, contact ${officialLegalEntityShortName} at ${officialSupportEmail} or ${officialSupportPhoneDisplay}. Include enough factual detail for us to identify the route, timeframe, and issue without sending sensitive wallet secrets.`,
    },
  ],
  links: [
    { label: "Official website", href: officialWebsiteUrl },
    { label: "Wallet app repository", href: officialWalletRepoUrl },
    { label: "Smart contracts repository", href: officialContractsRepoUrl },
  ],
  linksEyebrow: "Public Exits",
  footerNote: officialSupportEmail
    ? `Privacy questions can be directed to ${officialSupportEmail} or ${officialSupportPhoneDisplay}.`
    : "A dedicated public privacy mailbox is not published yet. Until it is, use the official support channels on the Support page and avoid sharing private keys or seed phrases there.",
};

const termsContentEn: PublicPageContent = {
  metadata: {
    title: "Terms",
    description:
      "Base terms for using 4teen.me, official support routes, wallet routes, and public 4TEEN ecosystem surfaces operated by AG PLUS LLC.",
  },
  hero: {
    eyebrow: "Terms",
    status: "Public terms",
    title:
      "4teen.me is a public interface and information layer operated by AG PLUS LLC, not a custody service and not a promise of outcome.",
    lead:
      "These terms should be read in a practical way: company information, wallet approval, network state, deployed contract logic, and public blockchain rules define what actually happens. The site and app can help you reach those surfaces, but they do not remove on-chain risk, market risk, or user-side security responsibility.",
  },
  summaryCards: [
    {
      eyebrow: "Operator",
      title: "Operated by AG PLUS LLC",
      body:
        `${officialLegalEntityShortName} is the operator of 4teen.me and related public support routes. Legal entity details, contact data, and D-U-N-S® registration are part of the public trust layer for the website.`,
    },
    {
      eyebrow: "Nature",
      title: "Interface, not custody",
      body:
        "The website and wallet help you view, prepare, and sign blockchain actions. They do not become the owner of your assets just because they display a route.",
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
      eyebrow: "1. Operator identity",
      title: "Who these terms apply to",
      body:
        `${officialLegalEntityName} (${officialLegalEntityShortName}) operates 4teen.me, public support routes, and related official website content. The registered address is ${officialLegalAddress}. The company registration number is ${officialRegistrationNumber}, taxpayer identification number is ${officialTaxId}, and D-U-N-S® number is ${officialDunsNumber}.`,
    },
    {
      eyebrow: "2. Product nature",
      title: "The site and app are access layers",
      body:
        "4TEEN surfaces include informational pages, public protocol dashboards, mobile wallet routes, direct-buy flows, liquidity controls, airdrop views, and ambassador routes. These surfaces help you reach blockchain actions, but they are still interfaces layered on top of public networks and deployed contracts.",
    },
    {
      eyebrow: "3. Non-custodial and on-chain reality",
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
      eyebrow: "4. No investment promise",
      title: "Nothing here is financial advice",
      body:
        "4TEEN does not promise profit, token appreciation, guaranteed airdrop value, guaranteed ambassador income, or guaranteed liquidity results. Market behavior is external, and all participation remains at the user's own risk.",
    },
    {
      eyebrow: "5. User obligations and prohibited use",
      title: "Use the site lawfully and with accurate intent",
      body:
        "You agree not to misuse the website, support routes, smart-contract interfaces, or public communication channels for fraud, phishing, impersonation, illegal activity, infrastructure abuse, or attempts to trick other users into disclosing wallet secrets.",
      bullets: [
        "Do not impersonate AG PLUS LLC, 4TEEN team members, or official support channels",
        "Do not submit malware, spam, or abusive automated traffic through support or website routes",
        "Do not use the site to promote fake contract addresses, wallets, or unofficial claim routes",
      ],
    },
    {
      eyebrow: "6. Reward and campaign logic",
      title: "Eligibility is not a marketing slogan",
      body:
        "Airdrop, ambassador, and reward flows can depend on contract rules, campaign conditions, anti-abuse checks, verification logic, resource availability, or backend processing queues. Participation alone does not guarantee payout.",
    },
    {
      eyebrow: "7. External links and third parties",
      title: "Not every linked surface is controlled by 4TEEN",
      body:
        "Explorers, repositories, DEX routes, social channels, and store pages may be linked from the site or app. Those services operate under their own terms and uptime conditions. 4TEEN does not guarantee their availability or behavior.",
    },
    {
      eyebrow: "8. User responsibility",
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
      eyebrow: "9. Updates and contact",
      title: "The product can change over time",
      body:
        `Pages, wallet routes, protocol integrations, campaign logic, and public copy can change as the product evolves. Continued use of the website or app after changes means you are using the current version of the product, not an older expectation. Legal or support questions about these terms can be sent to ${officialSupportEmail} or ${officialSupportPhoneDisplay}.`,
    },
  ],
  links: [
    { label: "Open the mobile app page", href: "/app" },
    { label: "Open verification", href: "/verification" },
    { label: "Open smart contracts repository", href: officialContractsRepoUrl },
  ],
  linksEyebrow: "Public Exits",
  footerNote:
    `Read these terms together with contract addresses, explorer state, and the wallet confirmation screen. For operator details, contact ${officialLegalEntityShortName} at ${officialSupportEmail}.`,
};

const blogContentEn: PublicPageContent = {
  metadata: {
    title: "Blog",
    description:
      "The 4TEEN publishing layer for launches, protocol reading, ecosystem updates, and investor-facing product narratives.",
  },
  hero: {
    eyebrow: "Blog",
    status: "Publishing layer",
    title:
      "The blog is where 4TEEN can speak in a market voice without flattening the product into banners and slogans.",
    lead:
      "Whitepaper is the long-form structural document. Verification is the proof layer. The blog is where launches, route updates, ecosystem context, and investor-facing narratives should live in a lighter format that can later expand into multiple languages.",
  },
  summaryCards: [
    {
      eyebrow: "Role",
      title: "Narrative layer",
      body:
        "Use blog for launches, updates, explainers, and momentum-building writing that does not belong inside product routes.",
    },
    {
      eyebrow: "Audience",
      title: "New users and investors",
      body:
        "This route should reduce friction for people who want a faster read before they open the app, buy route, or whitepaper.",
    },
    {
      eyebrow: "Format",
      title: "Translation-ready",
      body:
        "Posts should be able to grow into multilingual publishing without rewriting the whole shell or changing the route model.",
    },
  ],
  sections: [
    {
      eyebrow: "1. What belongs here",
      title: "Publishing that creates interest without lying",
      body:
        "The blog is the right surface for launch notes, product milestones, route explainers, ecosystem partnerships, market-facing stories, and readable breakdowns of what changed in the app or on-chain stack.",
    },
    {
      eyebrow: "2. What does not belong here",
      title: "Not a substitute for proof",
      body:
        "Blog should not replace contract links, verification pages, or whitepaper sections. If a claim needs proof, the post should point to the proof layer instead of pretending narrative is enough.",
      bullets: [
        "Whitepaper stays the long-form structural reading route",
        "Verification stays the proof route",
        "Blog stays the publishing and momentum route",
      ],
    },
    {
      eyebrow: "3. Why this route matters",
      title: "The site needs a flexible growth surface",
      body:
        "Home cannot hold every story, and whitepaper should not carry campaign writing. Blog gives the website a cleaner way to attract, educate, and update people without bloating the main routes.",
      note:
        "This is also the easiest place to grow a future multilingual publishing flow one article at a time.",
    },
  ],
  links: [
    { label: "Open the app", href: "/app" },
    { label: "Open buy", href: "/buy" },
    { label: "Read whitepaper", href: "/whitepaper" },
  ],
  linksEyebrow: "Next Routes",
  footerNote:
    "The current route is a clean shell for future publishing, not a fake feed. When articles land, they should stay aligned with the proof and product layers.",
};

const supportContentEn: SupportPageContent = {
  metadata: {
    title: "Support",
    description:
      "Official 4TEEN support scope, legal operator contacts, response expectations, and what the team can and cannot help with.",
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
      note: `Business support line at ${officialSupportPhoneDisplay}. Use it only through the official number published by ${officialLegalEntityShortName}.`,
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
      `If a support route is not linked from the official site, wallet, or official social list, verify it before trusting it. 4teen.me is operated by ${officialLegalEntityShortName}, and fake support is a common attack pattern in crypto products.`,
    emailTitle: "Support email",
    emailMissing:
      "A dedicated public support mailbox is not published in the current repositories. Until one is published, use the official channels below and never share secret recovery material there.",
    phoneTitle: "Support phone / WhatsApp",
    legalTitle: "Legal operator",
    legalBody:
      `${officialLegalEntityName}. Registration No. ${officialRegistrationNumber}. Tax ID ${officialTaxId}. D-U-N-S® ${officialDunsNumber}. Registered address: ${officialLegalAddress}.`,
    securityTitle: "Security reminder",
    securityBody:
      "No support channel should ask for your seed phrase, raw private key, or full device unlock secrets. If that happens, treat it as unsafe.",
  },
  links: [
    { label: "Open the mobile app page", href: "/app" },
    { label: "Open privacy", href: "/privacy" },
    { label: "Open terms", href: "/terms" },
  ],
  linksEyebrow: "Public Exits",
  footerNote:
    "For release links, contract references, or public state pages, start from the official website or the official wallet repository so you do not drift into unofficial mirrors.",
};

const privacyContentRu: PublicPageContent = {
  ...privacyContentEn,
  metadata: {
    title: "Конфиденциальность",
    description:
      "Как 4teen.me, управляемый AG PLUS LLC, обрабатывает запросы к сайту, сообщения в поддержку, публичные blockchain-данные и стороннюю инфраструктуру.",
  },
  hero: {
    eyebrow: "Конфиденциальность",
    status: "Публичная политика",
    title:
      "4teen.me управляется AG PLUS LLC, и политика конфиденциальности должна соответствовать реальной поверхности продукта, реальному support flow и публичной природе blockchain-данных.",
    lead:
      `${officialLegalEntityShortName} управляет публичным сайтом, support mailbox и официальными каналами коммуникации 4TEEN.`,
  },
  summaryCards: [
    {
      eyebrow: "Оператор",
      title: "AG PLUS LLC — юридический оператор",
      body:
        `${officialLegalEntityName} зарегистрирована в Узбекистане под номером ${officialRegistrationNumber}, ИНН ${officialTaxId} и D-U-N-S® номером ${officialDunsNumber}.`,
    },
    {
      eyebrow: "Блокчейн",
      title: "Адреса публичны по своей природе",
      body:
        "Адреса кошельков, транзакции, балансы и взаимодействия с контрактами в TRON являются публичными данными.",
    },
    {
      eyebrow: "Инфраструктура",
      title: "Данные поддержки и хостинга все равно могут обрабатываться",
      body:
        "Технические логи запросов, support-сообщения и данные сторонней инфраструктуры могут обрабатываться при использовании сайта или связи с поддержкой.",
    },
  ],
  linksEyebrow: "Публичные выходы",
  footerNote: officialSupportEmail
    ? `Вопросы по конфиденциальности можно направлять на ${officialSupportEmail} или ${officialSupportPhoneDisplay}.`
    : privacyContentEn.footerNote,
};

const termsContentRu: PublicPageContent = {
  ...termsContentEn,
  metadata: {
    title: "Условия",
    description:
      "Базовые условия использования 4teen.me, официальных support-маршрутов, wallet routes и публичных поверхностей экосистемы 4TEEN под управлением AG PLUS LLC.",
  },
  hero: {
    eyebrow: "Условия",
    status: "Публичные условия",
    title:
      "4teen.me — это публичный интерфейс и информационный слой под управлением AG PLUS LLC, а не custody-сервис и не обещание результата.",
    lead:
      "Эти условия нужно читать практически: что реально происходит, определяют данные компании, подтверждение кошелька, состояние сети, логика задеплоенных контрактов и публичные blockchain-правила.",
  },
  summaryCards: [
    {
      eyebrow: "Оператор",
      title: "Управляется AG PLUS LLC",
      body:
        `${officialLegalEntityShortName} является оператором 4teen.me и связанных публичных support routes.`,
    },
    {
      eyebrow: "Природа",
      title: "Интерфейс, а не custody",
      body:
        "Сайт и кошелек помогают просматривать, подготавливать и подписывать blockchain-действия, но не становятся владельцем ваших активов.",
    },
    {
      eyebrow: "Ответственность",
      title: "Действие подтверждаешь ты",
      body:
        "Если ты подписываешь транзакцию, вставляешь адрес или взаимодействуешь с контрактом, ответственность за проверку маршрута, актива, суммы и адресата остается на тебе.",
    },
  ],
  linksEyebrow: "Публичные выходы",
  footerNote:
    `Читай эти условия вместе с адресами контрактов, состоянием explorer и экраном подтверждения в кошельке. По вопросам обращайся в ${officialSupportEmail}.`,
};

const blogContentRu: PublicPageContent = {
  ...blogContentEn,
  metadata: {
    title: "Блог",
    description:
      "Публикационный слой 4TEEN для запусков, чтения протокола, обновлений экосистемы и продуктовых narratives для инвесторов.",
  },
  hero: {
    eyebrow: "Блог",
    status: "Publishing layer",
    title:
      "Блог — это место, где 4TEEN может говорить рыночным голосом, не сводя продукт к баннерам и лозунгам.",
    lead:
      "Whitepaper — это длинный структурный документ. Verification — proof-слой. Блог — место для запусков, обновлений маршрутов, контекста экосистемы и investor-facing narratives в более легком формате.",
  },
  summaryCards: [
    {
      eyebrow: "Роль",
      title: "Нарративный слой",
      body:
        "Используй блог для запусков, обновлений, explainers и текстов, которые не должны жить внутри продуктовых маршрутов.",
    },
    {
      eyebrow: "Аудитория",
      title: "Новые пользователи и инвесторы",
      body:
        "Этот маршрут должен снижать трение для людей, которым нужен быстрый контекст перед открытием app, buy route или whitepaper.",
    },
    {
      eyebrow: "Формат",
      title: "Готов к переводам",
      body:
        "Посты должны расти в мультиязычную публикацию без переписывания всей оболочки и без смены модели маршрута.",
    },
  ],
  linksEyebrow: "Следующие маршруты",
  footerNote:
    "Текущий маршрут — это чистая оболочка для будущих публикаций, а не фальшивая лента.",
};

const supportContentRu: SupportPageContent = {
  ...supportContentEn,
  metadata: {
    title: "Поддержка",
    description:
      "Официальный scope поддержки 4TEEN, контакты юридического оператора, ожидания по ответам и то, с чем команда может и не может помочь.",
  },
  hero: {
    eyebrow: "Поддержка",
    status: "Официальные каналы",
    title:
      "Поддержка должна помогать тебе попасть на правильный маршрут, понять публичную систему и проверить, что произошло, не притворяясь, что кто-то может откатить реальность блокчейна.",
    lead:
      "Используй официальные каналы 4TEEN для вопросов по сайту, кошельку, релизам и публичному протоколу.",
  },
  summaryCards: [
    {
      eyebrow: "Лучше всего для",
      title: "Помощь с маршрутизацией и верификацией",
      body:
        "Поддержка может помочь найти правильную официальную страницу, wallet surface, ссылку на контракт или публичный статус-маршрут.",
    },
    {
      eyebrow: "Подготовь",
      title: "Полезные факты",
      body:
        "Самый быстрый путь — факты: адрес кошелька, tx hash, URL страницы, скриншот, время и короткое описание ожидания и фактического результата.",
    },
    {
      eyebrow: "Никогда не отправляй",
      title: "Никаких recovery secrets",
      body:
        "Не отправляй seed phrase, raw private key или passcode устройства ни в один support-канал.",
    },
  ],
  channelPanel: {
    eyebrow: "Официальные каналы",
    title: "Проверь официальный выход до того, как доверять поддержке.",
    routeLabel: "Официальный маршрут",
  },
  scopePanel: {
    eyebrow: "Объем поддержки",
    title: "Поддержка должна объяснять, проверять и направлять. Она не должна выдумывать полномочия, которых у нее нет.",
    canHelp: "Может помочь",
    cannotHelp: "Не может помочь",
  },
  contactPanel: {
    ...supportContentEn.contactPanel,
    eyebrow: "Контакт",
    title: "Используй только официальные выходы 4TEEN",
    emailTitle: "Email поддержки",
    phoneTitle: "Телефон поддержки / WhatsApp",
    legalTitle: "Юридический оператор",
    securityTitle: "Напоминание по безопасности",
  },
  linksEyebrow: "Публичные выходы",
  footerNote:
    "Для релизных ссылок, ссылок на контракты и публичных state pages начинай с официального сайта или официального wallet repository.",
};

const privacyContentUz: PublicPageContent = {
  ...privacyContentEn,
  metadata: {
    title: "Maxfiylik",
    description:
      "AG PLUS LLC tomonidan boshqariladigan 4teen.me sayt so'rovlari, support xabarlari, public blockchain ma'lumotlari va uchinchi tomon infratuzilmasini qanday ishlatishini tushuntiradi.",
  },
  hero: {
    eyebrow: "Maxfiylik",
    status: "Ochiq siyosat",
    title:
      "4teen.me AG PLUS LLC tomonidan boshqariladi va maxfiylik siyosati real product surface, real support flow va blockchain ma'lumotlarining public tabiatiga mos bo'lishi kerak.",
    lead: `${officialLegalEntityShortName} 4TEEN uchun public website, support mailbox va rasmiy aloqa yo'llarini boshqaradi.`,
  },
  linksEyebrow: "Ochiq chiqishlar",
};

const termsContentUz: PublicPageContent = {
  ...termsContentEn,
  metadata: {
    title: "Shartlar",
    description:
      "AG PLUS LLC boshqaruvidagi 4teen.me, rasmiy support yo'llari, wallet route'lar va 4TEEN ekotizimining ochiq yuzalaridan foydalanish bo'yicha asosiy shartlar.",
  },
  hero: {
    eyebrow: "Shartlar",
    status: "Ochiq shartlar",
    title:
      "4teen.me — AG PLUS LLC tomonidan boshqariladigan public interface va information layer, custody xizmati emas va natija va'dasi ham emas.",
    lead:
      "Bu shartlarni amaliy o'qish kerak: kompaniya ma'lumotlari, wallet tasdig'i, network state, deployed contract logic va public blockchain qoidalari haqiqatda nima bo'lishini belgilaydi.",
  },
  linksEyebrow: "Ochiq chiqishlar",
};

const blogContentUz: PublicPageContent = {
  ...blogContentEn,
  metadata: {
    title: "Blog",
    description:
      "4TEEN publishing layer: launch'lar, protocol reading, ecosystem update'lar va investor-facing product narratives uchun.",
  },
  hero: {
    eyebrow: "Blog",
    status: "Publishing layer",
    title:
      "Blog — 4TEEN product'ni banner va slogan'largacha tekislab yubormasdan, bozor tilida gapira oladigan joy.",
    lead:
      "Whitepaper uzun strukturaviy hujjat. Verification — proof qatlami. Blog esa launch, route update, ecosystem context va investor-facing narratives uchun engilroq formatdir.",
  },
  linksEyebrow: "Keyingi route'lar",
};

const supportContentUz: SupportPageContent = {
  ...supportContentEn,
  metadata: {
    title: "Yordam",
    description:
      "4TEEN rasmiy support scope'i, yuridik operator kontaktlari, javob kutishlari va jamoa nimaga yordam bera olishi yoki bera olmasligi.",
  },
  hero: {
    eyebrow: "Yordam",
    status: "Rasmiy kanallar",
    title:
      "Support sizni to'g'ri route'ga olib borishi, public system'ni tushuntirishi va nima bo'lganini tekshirishga yordam berishi kerak — blockchain haqiqatini ortga qaytara oladigandek ko'rinmasdan.",
    lead:
      "Website, wallet, release yoki public protocol savollari uchun 4TEEN rasmiy kanallaridan foydalaning.",
  },
  channelPanel: {
    eyebrow: "Rasmiy kanallar",
    title: "Support'ga ishonishdan oldin rasmiy chiqishlarni tekshiring.",
    routeLabel: "Rasmiy route",
  },
  scopePanel: {
    eyebrow: "Support doirasi",
    title: "Support tushuntirishi, tekshirishi va yo'naltirishi kerak. Unda yo'q vakolatlarni uydirmasligi kerak.",
    canHelp: "Yordam bera oladi",
    cannotHelp: "Yordam bera olmaydi",
  },
  linksEyebrow: "Ochiq chiqishlar",
};

const publicPagesContentByLocale: Partial<
  Record<
    SupportedSiteLocale,
    {
      privacy: PublicPageContent;
      terms: PublicPageContent;
      blog: PublicPageContent;
      support: SupportPageContent;
    }
  >
> = {
  en: {
    privacy: privacyContentEn,
    terms: termsContentEn,
    blog: blogContentEn,
    support: supportContentEn,
  },
  ru: {
    privacy: privacyContentRu,
    terms: termsContentRu,
    blog: blogContentRu,
    support: supportContentRu,
  },
  uz: {
    privacy: privacyContentUz,
    terms: termsContentUz,
    blog: blogContentUz,
    support: supportContentUz,
  },
};

export function getPublicPagesContent(locale: SupportedSiteLocale) {
  return publicPagesContentByLocale[locale] ?? publicPagesContentByLocale.en!;
}
