import type { SupportedSiteLocale } from "@/lib/site-locale";

export type WhitepaperSummaryCard = {
  label: string;
  value: string;
  text: string;
};

export type WhitepaperFactRow = {
  label: string;
  value: string;
};

export type WhitepaperCard = {
  eyebrow?: string;
  title: string;
  text: string;
};

export type WhitepaperSection = {
  id: string;
  eyebrow: string;
  title: string;
  body?: string[];
  bullets?: string[];
  cards?: WhitepaperCard[];
  table?: WhitepaperFactRow[];
  note?: string;
  highlight?: {
    title: string;
    body: string;
  };
};

export type WhitepaperVersion = {
  id: string;
  version: string;
  date: string;
  status: string;
  title: string;
  lead: string;
  summaryCards: WhitepaperSummaryCard[];
  sections: WhitepaperSection[];
};

export type WhitepaperPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    title: string;
    lead: string;
    summaryCards: WhitepaperSummaryCard[];
    archiveTitle: string;
    archiveBody: string;
    archiveCards: Array<{
      href: string;
      label: string;
      text: string;
    }>;
  };
  current: WhitepaperVersion;
  archive: {
    eyebrow: string;
    title: string;
    body: string;
    versions: WhitepaperVersion[];
  };
  links: {
    verificationTitle: string;
    verificationBody: string;
    explorer: string;
    contractsRepo: string;
    walletRepo: string;
    verificationRoute: string;
  };
};

const currentVersion: WhitepaperVersion = {
  id: "wp-v13",
  version: "Version 1.3",
  date: "March 28, 2026",
  status: "Current release",
  title: "Vision, Technology, Economics, and On-Chain Mechanics",
  lead:
    "4TEEN is a modular TRON token protocol built around mint-on-purchase issuance, a fixed 14-day lock, controller-based ownership, scheduled liquidity execution, GitHub Actions-based liquidity automation, and a full-stack ambassador operations system.",
  summaryCards: [
    {
      label: "Token",
      value: "4TEEN",
      text: "TRC-20 token on TRON with 6 decimals.",
    },
    {
      label: "Primary Entry",
      value: "Mint",
      text: "New tokens are created only through direct contract purchases.",
    },
    {
      label: "Lock Rule",
      value: "14D",
      text: "Every direct purchase is locked for a fixed 14-day period.",
    },
    {
      label: "Liquidity Rule",
      value: "6.43%",
      text: "Daily controller release, at most once per UTC day.",
    },
  ],
  sections: [
    {
      id: "wp-abstract",
      eyebrow: "Abstract",
      title: "A modular on-chain token system with explicit rules and separated operating layers.",
      body: [
        "4TEEN is a TRON-based token protocol designed around transparent, mechanical behavior. Its core rules are enforced by smart contracts, not by discretionary interpretation.",
        "The system combines a TRC-20 token contract, a dedicated liquidity controller, DEX-specific executor contracts, purpose-separated vaults, GitHub Actions-based liquidity automation, and a full-stack ambassador reward system centered around controller-side settlement.",
        "Supply follows a hybrid model: an initial owner allocation minted at deployment, plus mint-on-purchase issuance triggered only by direct user buys. If users do not buy through the token contract, no new tokens are created.",
        "Every direct purchase creates a separate on-chain lock for 14 days. These locks are additive, deterministic, and cannot be bypassed or manually released by an administrative role.",
      ],
      highlight: {
        title: "Scope of this document",
        body:
          "This whitepaper describes the current deployed state of the 4TEEN system. It is a technical and structural specification, not a promise of market outcome.",
      },
      note:
        "The 4TEEN token itself does not generate profit. Market price depends on liquidity and demand. Algorithmic price growth applies only to direct contract purchases and does not control secondary market trading.",
    },
    {
      id: "wp-introduction",
      eyebrow: "1. Introduction",
      title: "The protocol is built to be inspectable, not interpreted.",
      body: [
        "4TEEN is an on-chain token mechanism with deliberately narrow and explicit functionality. Its purpose is not to simulate a financial product. Its purpose is to create a transparent, verifiable framework for token issuance, transfer restriction, liquidity formation, attribution, and staged ecosystem distribution, all enforced by code.",
        "Unlike custodial or off-chain systems, 4TEEN does not rely on vague promises, hidden bookkeeping, or informal operator discretion for its core behavior. Token minting, direct purchase pricing, purchase locks, fund routing, liquidity scheduling, and reward allocation logic are all defined at the smart contract or infrastructure layer and can be independently inspected.",
        "This document describes the system as it exists in its currently deployed form. Features, guarantees, or assumptions not explicitly enforced by the code are outside the scope of the protocol.",
        "4TEEN does not solve price discovery, market stability, or investment performance. Secondary market behavior remains external to the protocol and is determined by participants interacting with TRON market infrastructure.",
      ],
    },
    {
      id: "wp-token",
      eyebrow: "2. Token Overview",
      title: "Fourteen Token (4TEEN)",
      table: [
        { label: "Name", value: "Fourteen Token" },
        { label: "Symbol", value: "4TEEN" },
        { label: "Blockchain", value: "TRON" },
        { label: "Standard", value: "TRC-20" },
        { label: "Decimals", value: "6" },
        { label: "Issuing Time", value: "November 23, 2025 (UTC)" },
      ],
      body: [
        "4TEEN is a transferable on-chain token implemented under the TRC-20 standard. It does not represent equity, debt, governance power, dividends, or claims on off-chain assets.",
        "The token contract remains intentionally focused. It handles issuance, balances, allowances, transfer restrictions, available-balance validation, and deterministic TRX routing. It does not directly execute DEX interactions or attempt to control market price.",
      ],
      cards: [
        {
          title: "What the token does",
          text:
            "Issues tokens on deployment and on direct purchase. Tracks balances and transfer allowances. Creates and enforces per-purchase locks. Routes incoming TRX according to hardcoded split rules.",
        },
        {
          title: "What the token does not do",
          text:
            "It does not interact with DEXes directly. It does not depend on price oracles. It does not manage liquidity positions. It does not guarantee market price behavior.",
        },
      ],
    },
    {
      id: "wp-supply",
      eyebrow: "3. Supply Model",
      title: "Hybrid supply with on-demand expansion",
      cards: [
        {
          eyebrow: "3.1",
          title: "Initial supply",
          text:
            "At deployment, 10,102,022 4TEEN were minted to the owner side of the system. This initial supply is visible on-chain and was created only once. There are no hidden allocations or deferred minting schedules beyond what is visible in the deployed system.",
        },
        {
          eyebrow: "3.2",
          title: "Mint-on-purchase issuance",
          text:
            "New 4TEEN are minted only when a user calls buyTokens() and sends TRX to the token contract. The mint amount is determined by the current contract purchase price at execution time. If no direct purchases occur, no new tokens are created.",
        },
        {
          eyebrow: "3.3",
          title: "No emissions, no burn",
          text:
            "No periodic emissions, no staking rewards, no yield-based minting, and no burn mechanism.",
        },
        {
          eyebrow: "3.4",
          title: "Circulating supply clarification",
          text:
            "Explorer-visible total supply does not automatically mean all tokens are immediately transferable or liquid. Locked balances and vault-reserved balances may still be visible on-chain while remaining mechanically restricted by protocol logic.",
        },
      ],
      note:
        "Supply integrity is contract-enforced. The system does not allow arbitrary owner minting, retroactive balance edits, or silent redistribution of user-held tokens.",
    },
    {
      id: "wp-price",
      eyebrow: "4. Price Logic",
      title: "Primary sale price only",
      highlight: {
        title: "Base purchase price at deployment",
        body: "1 TRX = 1 4TEEN",
      },
      cards: [
        {
          eyebrow: "4.1",
          title: "Algorithmic growth",
          text:
            "The direct purchase price is subject to deterministic on-chain growth: annualized growth rate 14.75%, compounding interval 90 days, and updates applied lazily when queried or when a purchase occurs.",
        },
        {
          eyebrow: "4.2",
          title: "Scope",
          text:
            "This mechanism affects only the amount of 4TEEN minted through the contract purchase flow. It does not set, stabilize, or predict secondary market price. Market price on DEXes remains independent and depends on liquidity, trading activity, and demand.",
        },
      ],
      note:
        "The algorithmic purchase price is a deterministic contract calculation. It is not a guarantee of appreciation, yield, or financial outcome.",
    },
    {
      id: "wp-locks",
      eyebrow: "5. Token Locking Mechanism",
      title: "Per-purchase locks enforced on-chain",
      cards: [
        {
          eyebrow: "5.1",
          title: "Lock creation",
          text:
            "Every direct purchase through buyTokens() creates a separate lock entry for the buyer address. Locks are additive and independent. They are not merged, netted, or rewritten by later purchases.",
        },
        {
          eyebrow: "5.2",
          title: "Lock duration",
          text: "Each lock lasts for a fixed 14 days from the block timestamp of the purchase.",
        },
        {
          eyebrow: "5.3",
          title: "Transfer enforcement",
          text:
            "The contract validates transferable balance every time a transfer or delegated transfer is attempted. Available balance = total balance − locked balance. If a transfer exceeds the unlocked amount, the transaction reverts.",
        },
        {
          title: "No administrative override",
          text:
            "No early owner unlock, no emergency unlock function, and no privileged role with lock-control power.",
        },
        {
          title: "Locking clarification",
          text:
            "The lock applies only to tokens minted through direct purchase. Tokens received later through transfers are not retroactively locked by this rule.",
        },
      ],
    },
    {
      id: "wp-trx-flow",
      eyebrow: "6. TRX Flow on Purchase",
      title: "Every direct buy routes value atomically by rule",
      cards: [
        {
          eyebrow: "90% TRX",
          title: "Liquidity system",
          text:
            "Forwarded to FourteenLiquidityController for scheduled release and DEX execution flow.",
        },
        {
          eyebrow: "7% TRX",
          title: "Controller layer",
          text:
            "Forwarded to FourteenController for control, attribution, reward accounting, and ambassador settlement logic.",
        },
        {
          eyebrow: "3% TRX",
          title: "Airdrop layer",
          text:
            "Forwarded to AirdropVault for staged ecosystem distribution and campaign infrastructure.",
        },
      ],
      body: [
        "This split is hardcoded and enforced inside the purchase transaction itself. If a required transfer fails, the transaction reverts and no tokens are minted.",
        "The token contract does not treat purchase proceeds as one undifferentiated balance. The protocol separates liquidity, control, and community-distribution value at the point of entry.",
      ],
    },
    {
      id: "wp-liquidity",
      eyebrow: "7. Liquidity Architecture",
      title: "A two-layer liquidity model",
      cards: [
        {
          title: "Layer One — FourteenToken",
          text:
            "Receives TRX from direct purchases, routes 90% to the liquidity system, does not store liquidity funds long-term, and does not interact with DEXes directly.",
        },
        {
          title: "Layer Two — FourteenLiquidityController",
          text:
            "Accumulates TRX forwarded by the token contract, releases liquidity at most once per UTC day, calculates release amount from current balance, and dispatches funds to DEX executors.",
        },
      ],
      note:
        "Liquidity formation is permissionless, but not automatic and not unconditional. All liquidity actions require an explicit on-chain execution that still satisfies controller-side rules.",
    },
    {
      id: "wp-execution",
      eyebrow: "8. Liquidity Execution Logic",
      title: "Daily release with hard conditions",
      cards: [
        {
          title: "Execution conditions",
          text:
            "Execution has not already occurred for the current UTC day. Controller balance meets the minimum threshold of 100 TRX. A valid on-chain execution call is made.",
        },
        {
          title: "Release formula",
          text:
            "Daily release amount: 6.43% of the controller’s current TRX balance. Because the release is percentage-based, the absolute liquidity amount adjusts as controller balance changes.",
        },
        {
          title: "Single-execution protection",
          text:
            "The controller enforces a once-per-UTC-day execution boundary. Liquidity cannot be accelerated by repeated calls inside the same day.",
        },
        {
          title: "Dispatch split",
          text:
            "Released TRX is split equally between the two executor contracts: 50% to JustMoney and 50% to Sun.io V3.",
        },
      ],
    },
    {
      id: "wp-dex",
      eyebrow: "9. DEX Executors",
      title: "Exchange-specific execution, isolated from core logic",
      cards: [
        {
          title: "LiquidityExecutorSunV3",
          text:
            "Reads current pool price from Sun.io V3, calculates token amount dynamically, adds liquidity in a concentrated-liquidity format, and manages execution through Sun-compatible concentrated liquidity flow.",
        },
        {
          title: "LiquidityExecutorJustMoney",
          text:
            "Reads reserve balances from the pool, calculates proportional token amount, adds liquidity through the AMM router, and handles JustMoney-specific pool interaction logic.",
        },
      ],
      note:
        "Executors do not decide timing or release size. They implement already-approved liquidity through DEX-specific market infrastructure.",
    },
    {
      id: "wp-automation",
      eyebrow: "10. Liquidity Automation",
      title: "Automation keeps the system moving. The contract still decides what is allowed.",
      body: [
        "The 4TEEN liquidity automation repository is the external execution layer responsible for running the daily liquidity operation. It does not define policy and it does not loosen contract-side constraints. Its role is operational: detect when execution is available, submit the transaction, wait for confirmation, and publish the result.",
        "The actual rules remain on-chain inside the liquidity infrastructure. The automation can trigger execution, but it cannot bypass controller-side timing limits, minimum-balance requirements, or permanent execution recording. That separation keeps the system active without turning the automation layer into a source of arbitrary power.",
        "The automation runs through GitHub Actions. This provides a continuous execution layer without forcing the protocol to rely on daily manual interaction.",
        "Even so, the system remains permissionless at the execution edge. If the daily operation has not yet occurred and the contract conditions are satisfied, anyone may still trigger it manually. That fallback matters because it keeps continuity decentralized even if the automation layer is temporarily interrupted.",
      ],
      cards: [
        {
          title: "On-chain execution layer",
          text:
            "Execution can occur only once per UTC day, requires minimum balance conditions, records all successful execution results on-chain, and simply does not occur if contract conditions are not met.",
        },
        {
          title: "Automation layer",
          text:
            "Checks execution availability, calls bootstrapAndExecute() on the Liquidity Bootstrapper contract, waits for transaction confirmation, then collects and publishes the execution result.",
        },
        {
          title: "Execution flow",
          text:
            "Connect to TRON through TronGrid. Trigger bootstrapAndExecute(). Wait for transaction confirmation. Collect and publish the execution result.",
        },
      ],
      highlight: {
        title: "Transparency",
        body:
          "Every successful execution remains publicly verifiable through transaction data and public market explorers. The automation improves continuity, but verification still lives on-chain.",
      },
      note:
        "Liquidity automation is part of the operating infrastructure, not part of the rule-making layer. It triggers the routine. The contract determines whether the routine is valid.",
    },
    {
      id: "wp-ambassadors",
      eyebrow: "11. Ambassador System",
      title: "A full-stack acquisition, attribution, and reward settlement system.",
      body: [
        "The 4TEEN Ambassador System is not a lightweight referral add-on. In its current form, it is a multi-layer operating system for ambassador identity, first-touch attribution, purchase verification, backend allocation, cabinet visibility, and on-chain reward settlement.",
        "Its most accurate current description is a TRON-based full-stack ambassador platform built around first-touch referral capture, on-chain registration, a cabinet/dashboard layer, and a resource-aware backend worker that can defer settlement safely when blockchain resources are limited.",
        "The current architecture follows a first-touch attribution model before the buyer’s first successful purchase. Referral source can be captured before the buy, verified purchase data can be preserved off-chain first, and the blockchain acts as the final reward settlement layer.",
        "This makes the system operationally safer than a naive immediate-write model. If resources are available, allocation may happen eagerly. If resources are constrained, verified purchase state can remain preserved and be finalized later without losing attribution continuity.",
      ],
      cards: [
        {
          title: "Frontend and cabinet layer",
          text:
            "Captures ?r=slug on first touch and stores it for the configured TTL window. Validates slug identity, registers ambassadors on-chain, submits attribution after successful purchase, and presents cabinet data such as rewards, pending sync state, processing requests, purchase counts, and withdrawal history.",
        },
        {
          title: "Worker and settlement layer",
          text:
            "Verifies purchase data and attribution integrity, decides whether to allocate immediately or defer safely, preserves verified purchase data off-chain when Energy or Bandwidth is insufficient, prepares withdrawals, and replays deferred purchases later.",
        },
        {
          title: "On-chain controller settlement",
          text:
            "FourteenController supports ambassador registration, slug ownership, buyer binding, verified purchase allocation, level management, reward accrual, and reward withdrawal. It also supports both auto-derived levels and manual override logic.",
        },
        {
          title: "Ambassador reward ladder",
          text:
            "Bronze: 0–9 buyers → 10%. Silver: 10–99 buyers → 25%. Gold: 100–999 buyers → 50%. Platinum: 1000+ buyers → 75%.",
        },
      ],
      highlight: {
        title: "Claim-first strategy",
        body:
          "Verified purchases may be accepted and stored first, then settled on-chain later when resource conditions allow.",
      },
      note:
        "This system is best understood as four connected layers working together: frontend referral capture and registration, ambassador cabinet, backend allocation worker, and on-chain controller settlement.",
    },
    {
      id: "wp-vaults",
      eyebrow: "12. Vault Architecture",
      title: "Purpose-separated reserve custody",
      cards: [
        {
          title: "FourteenVault",
          text:
            "Stores tokens reserved for liquidity provisioning and keeps them separate from team and airdrop reserves. The documented liquidity reserve funding reference is 2,000,000 4TEEN.",
        },
        {
          title: "TeamLockVault",
          text:
            "Stores team allocation under separate custody and lock-oriented logic rather than mixing it with operational balances. The documented team funding reference is 3,000,000 4TEEN.",
        },
        {
          title: "AirdropVault",
          text:
            "Stores community and growth reserves for staged ecosystem distribution campaigns. The documented community allocation reference is 1,500,000 4TEEN.",
        },
      ],
      body: [
        "Vaults do not mint tokens, rewrite balances, or override price and lock rules. Their role is reserve custody, separation of allocation logic, and reduction of unnecessary coupling between protocol layers.",
      ],
    },
    {
      id: "wp-governance",
      eyebrow: "13. Governance & Permissions",
      title: "Administrative powers are explicit and limited",
      cards: [
        {
          title: "What ownership can do",
          text:
            "Update annual purchase price growth rate. Update liquidity-related addresses. Update designated airdrop address. Perform explicitly allowed operational maintenance.",
        },
        {
          title: "What ownership cannot do",
          text:
            "Mint tokens arbitrarily. Force-unlock user locks. Edit user balances retroactively. Manipulate secondary market prices.",
        },
      ],
      note:
        "Holding 4TEEN does not confer governance rights. Governance in this system means contract-defined admin permissions only.",
    },
    {
      id: "wp-frontend",
      eyebrow: "14. Frontend Disclaimer",
      title: "The frontend is an interface, not the source of truth",
      cards: [
        {
          title: "Frontend may display",
          text:
            "Balances, locked and available amounts, countdown timers, estimated conversion rates, and transaction history or live state summaries.",
        },
        {
          title: "Frontend cannot",
          text:
            "Unlock tokens, change contract rules, guarantee liquidity execution, guarantee price behavior, or alter balances or supply.",
        },
      ],
      note: "If frontend output and on-chain state ever differ, on-chain state is authoritative.",
    },
    {
      id: "wp-security",
      eyebrow: "15. Security Considerations",
      title: "Security by separation, constraints, and deterministic execution",
      bullets: [
        "Critical operations are deterministic and either execute fully or revert.",
        "External-call paths that handle value use protection against reentrancy patterns.",
        "Token, controller, executors, vaults, and operating layers are intentionally separated.",
        "Permissionless execution still remains bounded by timing and balance rules.",
        "There are no hidden admin backdoors for arbitrary minting or silent balance editing.",
        "DEX interaction risk is isolated away from the core token logic wherever practical.",
      ],
      note:
        "Smart contracts, automation, and DEX integrations still carry risk. No absolute security guarantee is implied.",
    },
    {
      id: "wp-not",
      eyebrow: "16. What 4TEEN Is Not",
      title: "Clarifications against misreading",
      cards: [
        {
          title: "Not an investment product",
          text:
            "4TEEN does not promise returns, guaranteed appreciation, profit sharing, or exposure to off-chain revenue.",
        },
        {
          title: "Not yield-bearing",
          text:
            "There are no staking rewards, no interest, and no passive income mechanics tied to simply holding the token.",
        },
        {
          title: "Not price-controlled",
          text:
            "The protocol does not stabilize secondary market price. DEX price remains external to contract purchase logic.",
        },
        {
          title: "Not risk-free",
          text:
            "Users still face smart contract risk, market volatility, liquidity limitations, and external protocol dependency risk.",
        },
      ],
    },
    {
      id: "wp-verify",
      eyebrow: "17. Verification",
      title: "The system is strongest when it can be checked from multiple angles.",
      body: [
        "4TEEN is not meant to be trusted through design language alone. Its contract architecture, repositories, operational infrastructure, and public documentation form a verification surface that can be inspected independently.",
      ],
      cards: [
        {
          title: "Core verification routes",
          text:
            "Public TRON explorer pages for token, controller, liquidity, and vault contracts. Open repositories for smart contracts, wallet app, ambassador system, liquidity automation, and Telegram airdrop bot. Whitepaper, tokenomics, and blog as the public reading layer.",
        },
        {
          title: "Verification philosophy",
          text:
            "A serious protocol should become stronger the moment a user leaves the landing page to inspect it. 4TEEN is designed around that principle: outward verification, separated system layers, and observable behavior.",
        },
      ],
      note:
        "Final principle: if a behavior is not explicitly described here and not enforced by deployed code, it is not defined by the 4TEEN protocol.",
    },
  ],
};

const archiveVersions: WhitepaperVersion[] = [
  {
    id: "wp-v12",
    version: "Version 1.2",
    date: "February 9, 2026",
    status: "Archive",
    title: "Vision, Technology, Economics, and On-Chain Mechanics",
    lead:
      "The first long-form structured whitepaper that pulled token, controller, executors, vaults, and verification into one reading surface.",
    summaryCards: [
      { label: "Position", value: "Structured", text: "Shifted from narrative copy to protocol sections." },
      { label: "Token", value: "4TEEN", text: "Documented hybrid supply and direct mint route." },
      { label: "Lock", value: "14D", text: "Per-purchase lock was already the central rule." },
      { label: "Liquidity", value: "6.43%", text: "Daily controller release logic was already explicit." },
    ],
    sections: [
      {
        id: "wp-v12-intro",
        eyebrow: "Structure at the time",
        title: "Version 1.2 turned the project into a protocol document.",
        body: [
          "This release moved the whitepaper away from short marketing prose and into a proper route-based technical reading surface. It described token scope, hybrid supply, price logic, locking, TRX routing, controller release rules, DEX executors, vault architecture, governance limits, frontend disclaimers, security notes, and on-chain verification links.",
          "It already made one important distinction clearly: direct contract purchase price is not the same thing as secondary market price.",
        ],
      },
      {
        id: "wp-v12-sections",
        eyebrow: "Main sections",
        title: "What v1.2 covered",
        bullets: [
          "Abstract and introduction focused on inspectability and contract-enforced behavior.",
          "Token overview documented Fourteen Token, TRC-20, 6 decimals, and November 23, 2025 issuing time.",
          "Supply model described the 10,102,022 initial mint and mint-on-purchase expansion.",
          "Price logic described 1 TRX = 1 4TEEN at deployment with 14.75% growth every 90 days.",
          "Locking described additive per-purchase locks and available-balance enforcement.",
          "TRX routing defined 90% liquidity, 7% controller, and 3% airdrop.",
          "Liquidity architecture separated FourteenToken from FourteenLiquidityController.",
          "Execution logic described once-per-UTC-day execution and 50 / 50 split between executors.",
          "Vault architecture separated FourteenVault, TeamLockVault, and AirdropVault.",
          "Verification collected explorer links and public repositories into one final proof layer.",
        ],
      },
      {
        id: "wp-v12-difference",
        eyebrow: "What changed later",
        title: "What v1.3 added on top",
        body: [
          "Version 1.3 expanded beyond the protocol core and documented two operating layers that were only lightly implied before: liquidity automation and the full-stack ambassador system.",
          "That newer version also tightened wording around separated operating layers and made the execution edge more explicit: automation helps continuity, but the contracts still decide what is valid.",
        ],
      },
    ],
  },
  {
    id: "wp-v11",
    version: "Version 1.1",
    date: "January 3, 2026",
    status: "Archive",
    title: "Vision · Architecture · Token Economics",
    lead:
      "The bridge version between the earliest simple paper and the later protocol-style document. It added stronger liquidity-controller language and a dated price schedule.",
    summaryCards: [
      { label: "Position", value: "Bridge", text: "Half narrative, half protocol specification." },
      { label: "Supply", value: "Demand-driven", text: "No fixed maximum supply." },
      { label: "Price", value: "Time-based", text: "Explicit 90-day steps and schedule were introduced." },
      { label: "Liquidity", value: "Controller", text: "Controller release rules became much clearer." },
    ],
    sections: [
      {
        id: "wp-v11-intro",
        eyebrow: "Introduction",
        title: "Version 1.1 framed 4TEEN as a modern TRON-based DeFi token.",
        body: [
          "This version positioned 4TEEN around predictable growth, transparent mechanics, and real on-chain liquidity. It explicitly rejected hidden pricing formulas, opaque emissions, manual liquidity control, and privileged entry conditions.",
          "It said the project was built for users who value mechanical fairness, clear time-based rules, capital-backed liquidity, and predictable market behavior.",
        ],
      },
      {
        id: "wp-v11-mechanics",
        eyebrow: "Core mechanics",
        title: "What v1.1 locked in",
        bullets: [
          "Demand-driven supply: no fixed maximum supply, tokens minted only when TRX is sent to the contract.",
          "Fixed entry price model: 1 TRX = 1 4TEEN with no early-buyer discounts, tiered pricing, or bonding curves.",
          "14-day lock cycle: minted instantly, locked for 14 days, then fully transferable after unlock.",
          "TRX distribution and liquidity flow: 90% to Liquidity Controller, 7% to operations, 3% to community and airdrop.",
          "Liquidity Controller execution rules: once per 24 hours, 6.43% daily execution rate, 100 TRX minimum, 50% / 50% split between two executors.",
          "Automatic price growth: +14.75% every 90 days with compounded growth when periods are skipped.",
        ],
      },
      {
        id: "wp-v11-schedule",
        eyebrow: "Price schedule",
        title: "This version published a concrete direct-purchase timeline.",
        bullets: [
          "Issuing time: 2025-11-23 02:37:45 UTC.",
          "Phase 0: 1.0000 TRX per 4TEEN.",
          "Phase 1: 2026-02-21 → 1.1475 TRX.",
          "Phase 2: 2026-05-22 → 1.3168 TRX.",
          "Phase 3: 2026-08-20 → 1.5110 TRX.",
          "Phase 4: 2026-11-18 → 1.7350 TRX.",
        ],
      },
      {
        id: "wp-v11-positioning",
        eyebrow: "Positioning",
        title: "How v1.1 still differed from the later protocol papers",
        body: [
          "Governance was still framed more loosely around long-term maintenance and ecosystem expansion, not yet as narrowly constrained admin powers.",
          "Verification was present through useful on-chain links, but the system was not yet described as a multi-layer protocol with automation, cabinet, worker, and proof-surface language.",
        ],
      },
    ],
  },
  {
    id: "wp-v10",
    version: "Version 1.0",
    date: "November 30, 2025",
    status: "Archive",
    title: "4TEEN Whitepaper",
    lead:
      "The earliest public framing: short-cycle price expansion, transparent liquidity flow, fixed entry price, dynamic supply, and a 14-day lock.",
    summaryCards: [
      { label: "Position", value: "Origin", text: "The first public tokenomics narrative." },
      { label: "Entry", value: "1 : 1", text: "Fixed entry price of 1 TRX = 1 4TEEN." },
      { label: "Supply", value: "Dynamic", text: "No preset supply, mint only on purchase." },
      { label: "Liquidity", value: "90%", text: "Most TRX routed toward liquidity backing." },
    ],
    sections: [
      {
        id: "wp-v10-summary",
        eyebrow: "Summary",
        title: "Version 1.0 introduced the project as a short-cycle liquidity engine.",
        body: [
          "This earliest paper described 4TEEN as a TRON-based token built for short-cycle price expansion, transparent liquidity flow, and fair on-chain mechanics.",
          "The goal was framed as a predictable, transparent, and self-reinforcing growth mechanism for DeFi participants who understand on-chain liquidity and incentive flows.",
        ],
      },
      {
        id: "wp-v10-core",
        eyebrow: "Core claims",
        title: "What v1.0 emphasized most",
        bullets: [
          "Fixed entry price: 1 TRX = 1 4TEEN, with no slippage, arbitrary pricing, or early-stage volatility.",
          "Mint-on-purchase: no preset supply, no pre-minting, no hidden allocations, and no private rounds.",
          "14-day lock period to prevent instant dumping, create short predictable holding cycles, and support natural liquidity and price formation.",
          "TRX routing: 90% to liquidity pool, 7% to owner wallet, 3% to airdrop address.",
          "Dynamic supply model: no max supply, expansion only when purchases occur.",
          "Automated price growth: every 90 days, the minting price adjusts upward using a default 14.75% annualized growth rate.",
        ],
      },
      {
        id: "wp-v10-contract",
        eyebrow: "Contract architecture",
        title: "The earliest contract explanation was simpler and more token-centric.",
        bullets: [
          "TRC-20 standard compatibility.",
          "Mint-on-buy mechanism.",
          "14-day vesting logic.",
          "Reentrancy protection.",
          "Owner governance for annual growth rate, liquidityPool address, and airdrop address.",
          "Transparent events for every buy, price update, transfer, and approval.",
        ],
      },
      {
        id: "wp-v10-risk",
        eyebrow: "Risk disclosure",
        title: "Even the first version was explicit about user risk.",
        body: [
          "Participation involved market volatility, liquidity fluctuations, smart contract vulnerabilities, loss of private keys, and regulatory uncertainty.",
          "It already said that nothing in the document constituted financial advice and that users should evaluate their own risk tolerance before interacting with the token or related products.",
        ],
      },
      {
        id: "wp-v10-conclusion",
        eyebrow: "Conclusion",
        title: "The first framing was growth-forward, not yet protocol-wide.",
        body: [
          "Version 1.0 concluded that 4TEEN aligned incentives across participants through fixed entry price, dynamic minting, enforced lock periods, and automatic liquidity forwarding.",
          "Compared with later versions, it talked much less about controller architecture, vault separation, executors, automation, ambassador settlement, and verification surfaces. Those layers came later as the product matured.",
        ],
      },
    ],
  },
];

const whitepaperContentEn: WhitepaperPageContent = {
  metadata: {
    title: "Whitepaper",
    description:
      "Read the current 4TEEN whitepaper and the full historical evolution from v1.0 to v1.3: token mechanics, liquidity controller rules, automation, ambassador system, vault architecture, and verification.",
  },
  hero: {
    eyebrow: "Whitepaper",
    status: "Current + archive",
    title: "The current protocol spec lives here, and the earlier whitepaper versions stay readable instead of disappearing into edits.",
    lead:
      "We now treat the whitepaper as a real reading surface: the current v1.3 specification is the main document, while v1.2, v1.1, and v1.0 remain on the page as a version archive so the system’s public narrative can be audited across time.",
    summaryCards: currentVersion.summaryCards,
    archiveTitle: "Version archive",
    archiveBody:
      "Read the current protocol spec first, then drop into the archive to see how 4TEEN moved from an early tokenomics paper into a more explicit multi-layer protocol document.",
    archiveCards: [
      { href: "#wp-v13", label: "v1.3", text: "Current structured protocol spec with automation and ambassador operations." },
      { href: "#wp-v12", label: "v1.2", text: "First fully structured protocol reading surface." },
      { href: "#wp-v11", label: "v1.1", text: "Bridge version with controller logic and dated price schedule." },
      { href: "#wp-v10", label: "v1.0", text: "Original tokenomics and growth narrative." },
    ],
  },
  current: currentVersion,
  archive: {
    eyebrow: "Historical Versions",
    title: "The older papers stay on-page as protocol history, not hidden edits.",
    body:
      "These versions are preserved in a unified format so the public reading layer keeps its own audit trail. The point is not nostalgia. The point is to show what was emphasized at each stage and how the architecture description expanded over time.",
    versions: archiveVersions,
  },
  links: {
    verificationTitle: "Public exits",
    verificationBody:
      "Use the current verification route and public repositories when you want the proof surface after the long-form reading layer.",
    explorer: "Open verification surface",
    contractsRepo: "Smart contracts repo",
    walletRepo: "Wallet app repo",
    verificationRoute: "Open buy route",
  },
};

export function getWhitepaperPageContent(
  _locale: SupportedSiteLocale,
): WhitepaperPageContent {
  return whitepaperContentEn;
}
