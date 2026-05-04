import type { SupportedSiteLocale } from "@/lib/site-locale";
import { whitepaperCurrentDocumentEn } from "@/content/whitepaper-v1-4";

export type WhitepaperVersionSlug = "v1-3" | "v1-2" | "v1-1" | "v1-0";

export type WhitepaperCurrentDocument = {
  href: string;
  version: string;
  date: string;
  status: string;
  title: string;
  lead: string;
  document: string;
};

export type WhitepaperVersionDocument = {
  slug: WhitepaperVersionSlug;
  href: string;
  version: string;
  date: string;
  status: string;
  title: string;
  lead: string;
  document: string;
};

export type WhitepaperPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  ui: {
    brandSubtitle: string;
    whitepaperLabel: string;
    currentLabel: string;
    historicalLabel: string;
    buyLabel: string;
    routesLabel: string;
    tableColumnPrefix: string;
  };
  current: WhitepaperCurrentDocument;
  note: {
    eyebrow: string;
    title: string;
    body: string;
  };
  switcher: {
    eyebrow: string;
    title: string;
    body: string;
  };
  document: {
    eyebrow: string;
    body: string;
  };
  versions: Record<WhitepaperVersionSlug, WhitepaperVersionDocument>;
};

export const whitepaperVersionOrder: WhitepaperVersionSlug[] = ["v1-3", "v1-2", "v1-1", "v1-0"];

const whitepaperContentEn: WhitepaperPageContent = {
  metadata: {
    title: "4TEEN Whitepaper 1.4",
    description:
      whitepaperCurrentDocumentEn.lead,
  },
  ui: {
    brandSubtitle: "Whitepaper",
    whitepaperLabel: "Whitepaper",
    currentLabel: "V1-4",
    historicalLabel: "History",
    buyLabel: "Buy",
    routesLabel: "Whitepaper routes",
    tableColumnPrefix: "Column",
  },
  current: whitepaperCurrentDocumentEn,
  note: {
    eyebrow: "Historical Archive",
    title: "Earlier versions stay readable and separate from the current document.",
    body:
      "The current route now serves the May 4, 2026 whitepaper. Earlier versions remain preserved on their own routes so the historical record stays intact, readable, and easier to localize later.",
  },
  switcher: {
    eyebrow: "Version Timeline",
    title: "Current first, historical versions kept beside it.",
    body:
      "V1.4 is the current whitepaper. V1.3, V1.2, V1.1, and V1.0 remain available as preserved historical documents on their own routes.",
  },
  document: {
    eyebrow: "Whitepaper Document",
    body:
      "The text below is rendered as a reading document. Current and historical versions stay separate so we can update the live document without rewriting the archive.",
  },
  versions: {
    "v1-3": {
      slug: "v1-3",
      href: "/whitepaper/v1-3",
      version: "Version 1.3",
      date: "March 28, 2026",
      status: "Historical",
      title: "Vision, Technology, Economics, and On-Chain Mechanics",
      lead:
        "Expanded protocol paper with liquidity automation, ambassador operations, and a wider systems view across contracts and operating layers.",
      document: `# 4TEEN Whitepaper

**Version:** 1.3 • **Date:** March 28, 2026

# Vision, Technology, Economics, and On-Chain Mechanics

4TEEN is a modular TRON token protocol built around mint-on-purchase issuance, a fixed 14-day lock, controller-based ownership, scheduled liquidity execution, GitHub Actions–based liquidity automation, and a full-stack ambassador operations system.

---

## Summary

### Token

**4TEEN**

TRC-20 token on TRON with 6 decimals.

### Primary Entry

**Mint**

New tokens are created only through direct contract purchases.

### Lock Rule

**14D**

Every direct purchase is locked for a fixed 14-day period.

### Liquidity Rule

**6.43%**

Daily controller release, at most once per UTC day.

---

## Table of Contents

### Read the protocol in one pass

- [Abstract](#wp-abstract)
- [Introduction](#wp-introduction)
- [Token Overview](#wp-token)
- [Supply Model](#wp-supply)
- [Price Logic](#wp-price)
- [Token Locking](#wp-locks)
- [TRX Flow on Purchase](#wp-trx-flow)
- [Liquidity Architecture](#wp-liquidity)
- [Liquidity Execution Logic](#wp-execution)
- [DEX Executors](#wp-dex)
- [Liquidity Automation](#wp-automation)
- [Ambassador System](#wp-ambassadors)
- [Vault Architecture](#wp-vaults)
- [Governance & Permissions](#wp-governance)
- [Frontend Disclaimer](#wp-frontend)
- [Security Considerations](#wp-security)
- [What 4TEEN Is Not](#wp-not)
- [Verification](#wp-verify)

---

## Abstract

### A modular on-chain token system with explicit rules and separated operating layers.

4TEEN is a TRON-based token protocol designed around transparent, mechanical behavior. Its core rules are enforced by smart contracts, not by discretionary interpretation.

The system combines a TRC-20 token contract, a dedicated liquidity controller, DEX-specific executor contracts, purpose-separated vaults, GitHub Actions–based liquidity automation, and a full-stack ambassador reward system centered around controller-side settlement.

Supply follows a hybrid model: an initial owner allocation minted at deployment, plus mint-on-purchase issuance triggered only by direct user buys. If users do not buy through the token contract, no new tokens are created.

Every direct purchase creates a separate on-chain lock for 14 days. These locks are additive, deterministic, and cannot be bypassed or manually released by an administrative role.

**Scope of this document**

This whitepaper describes the current deployed state of the 4TEEN system. It is a technical and structural specification, not a promise of market outcome.

> The 4TEEN token itself does not generate profit. Market price depends on liquidity and demand. Algorithmic price growth applies only to direct contract purchases and does not control secondary market trading.

---

## 1. Introduction

### The protocol is built to be inspectable, not interpreted.

4TEEN is an on-chain token mechanism with deliberately narrow and explicit functionality. Its purpose is not to simulate a financial product. Its purpose is to create a transparent, verifiable framework for token issuance, transfer restriction, liquidity formation, attribution, and staged ecosystem distribution, all enforced by code.

Unlike custodial or off-chain systems, 4TEEN does not rely on vague promises, hidden bookkeeping, or informal operator discretion for its core behavior. Token minting, direct purchase pricing, purchase locks, fund routing, liquidity scheduling, and reward allocation logic are all defined at the smart contract or infrastructure layer and can be independently inspected.

This document describes the system as it exists in its currently deployed form. Features, guarantees, or assumptions not explicitly enforced by the code are outside the scope of the protocol.

4TEEN does not solve price discovery, market stability, or investment performance. Secondary market behavior remains external to the protocol and is determined by participants interacting with TRON market infrastructure.

---

## 2. Token Overview

### Fourteen Token (4TEEN)

| Parameter | Value |
|---|---|
| Name | Fourteen Token |
| Symbol | 4TEEN |
| Blockchain | TRON |
| Standard | TRC-20 |
| Decimals | 6 |
| Issuing Time | November 23, 2025 (UTC) |

4TEEN is a transferable on-chain token implemented under the TRC-20 standard. It does not represent equity, debt, governance power, dividends, or claims on off-chain assets.

The token contract remains intentionally focused. It handles issuance, balances, allowances, transfer restrictions, available-balance validation, and deterministic TRX routing. It does not directly execute DEX interactions or attempt to control market price.

### What the token does

- Issues tokens on deployment and on direct purchase.
- Tracks balances and transfer allowances.
- Creates and enforces per-purchase locks.
- Routes incoming TRX according to hardcoded split rules.

### What the token does not do

- It does not interact with DEXes directly.
- It does not depend on price oracles.
- It does not manage liquidity positions.
- It does not guarantee market price behavior.

---

## 3. Supply Model

### Hybrid supply with on-demand expansion

### 3.1 Initial Supply

At deployment, 10,102,022 4TEEN were minted to the owner side of the system. This initial supply is visible on-chain and was created only once.

There are no hidden allocations or deferred minting schedules beyond what is visible in the deployed system.

### 3.2 Mint-on-Purchase Issuance

New 4TEEN are minted only when a user calls \`buyTokens()\` and sends TRX to the token contract. The mint amount is determined by the current contract purchase price at execution time.

If no direct purchases occur, no new tokens are created.

### 3.3 No Emissions, No Burn

- No periodic emissions
- No staking rewards
- No yield-based minting
- No burn mechanism

### 3.4 Circulating Supply Clarification

Explorer-visible total supply does not automatically mean all tokens are immediately transferable or liquid. Locked balances and vault-reserved balances may still be visible on-chain while remaining mechanically restricted by protocol logic.

> Supply integrity is contract-enforced. The system does not allow arbitrary owner minting, retroactive balance edits, or silent redistribution of user-held tokens.

---

## 4. Price Logic

### Primary sale price only

**Base purchase price at deployment:**

**1 TRX = 1 4TEEN**

### 4.1 Algorithmic Growth

The direct purchase price is subject to deterministic on-chain growth:

- Annualized growth rate: 14.75%
- Compounding interval: 90 days
- Updates are applied lazily when queried or when a purchase occurs

### 4.2 Scope

This mechanism affects only the amount of 4TEEN minted through the contract purchase flow. It does not set, stabilize, or predict secondary market price.

Market price on DEXes remains independent and depends on liquidity, trading activity, and demand.

> The algorithmic purchase price is a deterministic contract calculation. It is not a guarantee of appreciation, yield, or financial outcome.

---

## 5. Token Locking Mechanism

### Per-purchase locks enforced on-chain

### 5.1 Lock Creation

Every direct purchase through \`buyTokens()\` creates a separate lock entry for the buyer address. Locks are additive and independent. They are not merged, netted, or rewritten by later purchases.

### 5.2 Lock Duration

Each lock lasts for a fixed 14 days from the block timestamp of the purchase.

### 5.3 Transfer Enforcement

The contract validates transferable balance every time a transfer or delegated transfer is attempted.

\`available balance = total balance − locked balance\`

If a transfer exceeds the unlocked amount, the transaction reverts.

### No administrative override

- No early owner unlock
- No emergency unlock function
- No privileged role with lock-control power

### Locking clarification

The lock applies only to tokens minted through direct purchase. Tokens received later through transfers are not retroactively locked by this rule.

---

## 6. TRX Flow on Purchase

### Every direct buy routes value atomically by rule

### 90% TRX

#### Liquidity System

Forwarded to FourteenLiquidityController for scheduled release and DEX execution flow.

### 7% TRX

#### Controller Layer

Forwarded to FourteenController for control, attribution, reward accounting, and ambassador settlement logic.

### 3% TRX

#### Airdrop Layer

Forwarded to AirdropVault for staged ecosystem distribution and campaign infrastructure.

This split is hardcoded and enforced inside the purchase transaction itself. If a required transfer fails, the transaction reverts and no tokens are minted.

The token contract does not treat purchase proceeds as one undifferentiated balance. The protocol separates liquidity, control, and community-distribution value at the point of entry.

---

## 7. Liquidity Architecture

### A two-layer liquidity model

### Layer One — FourteenToken

- Receives TRX from direct purchases
- Routes 90% to the liquidity system
- Does not store liquidity funds long-term
- Does not interact with DEXes directly

### Layer Two — FourteenLiquidityController

- Accumulates TRX forwarded by the token contract
- Releases liquidity at most once per UTC day
- Calculates release amount from current balance
- Dispatches funds to DEX executors

> Liquidity formation is permissionless, but not automatic and not unconditional. All liquidity actions require an explicit on-chain execution that still satisfies controller-side rules.

---

## 8. Liquidity Execution Logic

### Daily release with hard conditions

### Execution conditions

- Execution has not already occurred for the current UTC day
- Controller balance meets the minimum threshold of 100 TRX
- A valid on-chain execution call is made

### Release formula

**Daily release amount:**

**6.43% of the controller’s current TRX balance**

Because the release is percentage-based, the absolute liquidity amount adjusts as controller balance changes.

### Single-execution protection

The controller enforces a once-per-UTC-day execution boundary. This means liquidity cannot be accelerated by repeated calls inside the same day.

### Dispatch split

Released TRX is split equally between the two executor contracts: 50% to JustMoney and 50% to Sun.io V3.

---

## 9. DEX Executors

### Exchange-specific execution, isolated from core logic

### LiquidityExecutorSunV3

- Reads current pool price from Sun.io V3
- Calculates token amount dynamically
- Adds liquidity in a concentrated-liquidity format
- Manages execution through Sun-compatible concentrated liquidity flow

### LiquidityExecutorJustMoney

- Reads reserve balances from the pool
- Calculates proportional token amount
- Adds liquidity through the AMM router
- Handles JustMoney-specific pool interaction logic

> Executors do not decide timing or release size. They implement already-approved liquidity through DEX-specific market infrastructure.

---

## 10. Liquidity Automation

### Automation keeps the system moving. The contract still decides what is allowed.

The 4TEEN liquidity automation repository is the external execution layer responsible for running the daily liquidity operation. It does not define policy and it does not loosen contract-side constraints. Its role is operational: detect when execution is available, submit the transaction, wait for confirmation, and publish the result.

The actual rules remain on-chain inside the liquidity infrastructure. The automation can trigger execution, but it cannot bypass controller-side timing limits, minimum-balance requirements, or permanent execution recording. That separation keeps the system active without turning the automation layer into a source of arbitrary power.

### On-chain execution layer

- Execution can occur only once per UTC day.
- Execution requires the controller to satisfy minimum balance conditions.
- All successful execution results are recorded permanently on-chain.
- If contract conditions are not met, execution does not occur.

### Automation layer

- Checks execution availability.
- Calls \`bootstrapAndExecute()\` on the Liquidity Bootstrapper contract.
- Waits for transaction confirmation.
- Collects execution data and publishes the result to notification surfaces.

### Operational model

The automation runs through GitHub Actions. This provides a continuous execution layer without forcing the protocol to rely on daily manual interaction.

Even so, the system remains permissionless at the execution edge. If the daily operation has not yet occurred and the contract conditions are satisfied, anyone may still trigger it manually. That fallback matters because it keeps continuity decentralized even if the automation layer is temporarily interrupted.

### Execution flow

- Connect to TRON through TronGrid.
- Trigger \`bootstrapAndExecute()\`.
- Wait for transaction confirmation.
- Collect and publish the execution result.

**Transparency**

Every successful execution remains publicly verifiable through transaction data and public market explorers. The automation improves continuity, but verification still lives on-chain.

~~~json
{
  "ok": true,
  "result": "SUCCESS",
  "txid": "transaction_hash",
  "tronscan": "https://tronscan.org/#/transaction/..."
}
~~~

> **Positioning:** liquidity automation is part of the operating infrastructure, not part of the rule-making layer. It triggers the routine. The contract determines whether the routine is valid.

---

## 11. Ambassador System

### A full-stack acquisition, attribution, and reward settlement system.

The 4TEEN Ambassador System is not a lightweight referral add-on. In its current form, it is a multi-layer operating system for ambassador identity, first-touch attribution, purchase verification, backend allocation, cabinet visibility, and on-chain reward settlement.

Its most accurate current description is a TRON-based full-stack ambassador platform built around first-touch referral capture, on-chain registration, a cabinet/dashboard layer, and a resource-aware backend worker that can defer settlement safely when blockchain resources are limited.

### Frontend and cabinet layer

- Captures \`?r=slug\` on first touch and stores it for the configured TTL window.
- Validates and normalizes slug identity before registration.
- Registers ambassadors on-chain through Tron wallet connection.
- Submits attribution after successful purchase.
- Presents cabinet data such as rewards, pending sync state, processing requests, purchase counts, and withdrawal history.

### Worker and settlement layer

- Verifies purchase data and attribution integrity.
- Decides whether to allocate immediately or defer safely.
- Preserves verified purchase data off-chain when Energy or Bandwidth is insufficient.
- Prepares ambassador withdrawals and replays deferred purchases later.
- Runs daily maintenance, queue processing, and recovery workflows.

### Business model and attribution logic

The current architecture follows a first-touch attribution model before the buyer’s first successful purchase. Referral source can be captured before the buy, verified purchase data can be preserved off-chain first, and the blockchain acts as the final reward settlement layer.

This makes the system operationally safer than a naive immediate-write model. If resources are available, allocation may happen eagerly. If resources are constrained, verified purchase state can remain preserved and be finalized later without losing attribution continuity.

### Why the cabinet matters

The cabinet is not decoration and it is not a marketing-only dashboard. It is the ambassador-facing operational surface that connects identity, reward state, pending processing, withdrawal preparation, and visible settlement history into one continuous workflow.

> In practical terms, the system continues after registration. Registration opens the path. Cabinet and worker logic keep that path alive.

### On-chain controller settlement

The final settlement layer is implemented through **FourteenController**. The contract supports ambassador registration, slug ownership, buyer binding, verified purchase allocation, level management, reward accrual, and reward withdrawal.

It also supports both auto-derived levels and manual override logic, which keeps the reward layer flexible without making it unreadable or hidden.

### Ambassador reward ladder

- Bronze: 0–9 buyers → 10%
- Silver: 10–99 buyers → 25%
- Gold: 100–999 buyers → 50%
- Platinum: 1000+ buyers → 75%

**Claim-first strategy**

The ambassador system is built for operational safety, not only for immediate settlement. Verified purchases may be accepted and stored first, then settled on-chain later when resource conditions allow.

> **Positioning:** this system is best understood as four connected layers working together — frontend referral capture and registration, ambassador cabinet, backend allocation worker, and on-chain controller settlement. It is not just a referral helper, not just a dashboard, and not just a worker.

---

## 12. Vault Architecture

### Purpose-separated reserve custody

### FourteenVault

Stores tokens reserved for liquidity provisioning and keeps them separate from team and airdrop reserves. The documented liquidity reserve funding reference is 2,000,000 4TEEN.

### TeamLockVault

Stores team allocation under separate custody and lock-oriented logic rather than mixing it with operational balances. The documented team funding reference is 3,000,000 4TEEN.

### AirdropVault

Stores community and growth reserves for staged ecosystem distribution campaigns. The documented community allocation reference is 1,500,000 4TEEN.

Vaults do not mint tokens, rewrite balances, or override price and lock rules. Their role is reserve custody, separation of allocation logic, and reduction of unnecessary coupling between protocol layers.

---

## 13. Governance & Permissions

### Administrative powers are explicit and limited

### What ownership can do

- Update annual purchase price growth rate
- Update liquidity-related addresses
- Update designated airdrop address
- Perform explicitly allowed operational maintenance

### What ownership cannot do

- Mint tokens arbitrarily
- Force-unlock user locks
- Edit user balances retroactively
- Manipulate secondary market prices

> Holding 4TEEN does not confer governance rights. Governance in this system means contract-defined admin permissions only.

---

## 14. Frontend Disclaimer

### The frontend is an interface, not the source of truth

### Frontend may display

- balances
- locked and available amounts
- countdown timers
- estimated conversion rates
- transaction history and live state summaries

### Frontend cannot

- unlock tokens
- change contract rules
- guarantee liquidity execution
- guarantee price behavior
- alter balances or supply

> If frontend output and on-chain state ever differ, on-chain state is authoritative.

---

## 15. Security Considerations

### Security by separation, constraints, and deterministic execution

- Critical operations are deterministic and either execute fully or revert.
- External-call paths that handle value use protection against reentrancy patterns.
- Token, controller, executors, vaults, and operating layers are intentionally separated.
- Permissionless execution still remains bounded by timing and balance rules.
- There are no hidden admin backdoors for arbitrary minting or silent balance editing.
- DEX interaction risk is isolated away from the core token logic wherever practical.

> Smart contracts, automation, and DEX integrations still carry risk. No absolute security guarantee is implied.

---

## 16. What 4TEEN Is Not

### Clarifications against misreading

### Not an investment product

4TEEN does not promise returns, guaranteed appreciation, profit sharing, or exposure to off-chain revenue.

### Not yield-bearing

There are no staking rewards, no interest, and no passive income mechanics tied to simply holding the token.

### Not price-controlled

The protocol does not stabilize secondary market price. DEX price remains external to contract purchase logic.

### Not risk-free

Users still face smart contract risk, market volatility, liquidity limitations, and external protocol dependency risk.

---

## 17. Verification

### The system is strongest when it can be checked from multiple angles.

4TEEN is not meant to be trusted through design language alone. Its contract architecture, repositories, operational infrastructure, and public documentation form a verification surface that can be inspected independently.

### Core verification routes

- Public TRON explorer pages for token, controller, liquidity, and vault contracts
- Open repositories for smart contracts, wallet kit, ambassador system, liquidity automation, and Telegram airdrop bot
- Whitepaper, tokenomics, and blog as the public reading layer

### Verification philosophy

A serious protocol should become stronger the moment a user leaves the landing page to inspect it. 4TEEN is designed around that principle: outward verification, separated system layers, and observable behavior.

> **Final principle:** if a behavior is not explicitly described here and not enforced by deployed code, it is not defined by the 4TEEN protocol.`,
    },
    "v1-2": {
      slug: "v1-2",
      href: "/whitepaper/v1-2",
      version: "Version 1.2",
      date: "February 9, 2026",
      status: "Historical",
      title: "Vision, Technology, Economics, and On-Chain Mechanics",
      lead:
        "Protocol-style whitepaper that pulled token rules, controller execution, vaults, and verification into one long-form document.",
      document: `# 4TEEN Whitepaper

**Version:** 1.2 • **Date:** February 9, 2026

# Vision, Technology, Economics, and On-Chain Mechanics

4TEEN is a modular TRON token protocol built around mint-on-purchase issuance, a fixed 14-day lock, controller-based ownership, and scheduled liquidity execution. This document describes the system as it exists on-chain today.

---

## Summary

### Token

**4TEEN**

TRC-20 token on TRON with 6 decimals.

### Primary Entry

**Mint**

New tokens are created only through direct contract purchases.

### Lock Rule

**14D**

Every direct purchase is locked for a fixed 14-day period.

### Liquidity Rule

**6.43%**

Daily controller release, at most once per UTC day.

---

## Table of Contents

### Read the protocol in one pass

- [Abstract](#wp-abstract)
- [Introduction](#wp-introduction)
- [Token Overview](#wp-token)
- [Supply Model](#wp-supply)
- [Price Logic](#wp-price)
- [Token Locking](#wp-locks)
- [TRX Flow on Purchase](#wp-trx-flow)
- [Liquidity Architecture](#wp-liquidity)
- [Liquidity Execution](#wp-execution)
- [DEX Executors](#wp-dex)
- [Vault Architecture](#wp-vaults)
- [Governance](#wp-governance)
- [Frontend Disclaimer](#wp-frontend)
- [Security Considerations](#wp-security)
- [What 4TEEN Is Not](#wp-not)
- [Verification](#wp-verify)

---

## Abstract

### A modular on-chain token system with explicit rules.

4TEEN is a TRON-based token protocol designed around transparent, mechanical behavior. Its core rules are enforced by smart contracts, not by off-chain discretion.

The system combines a TRC-20 token contract, a dedicated liquidity controller, DEX-specific executor contracts, purpose-separated vaults, and controller-side ambassador reward logic.

Supply follows a hybrid model: an initial owner allocation minted at deployment, plus mint-on-purchase issuance triggered only by direct user buys. If users do not buy through the token contract, no new tokens are created.

Every direct purchase creates a separate on-chain lock for 14 days. These locks are additive, deterministic, and cannot be bypassed or manually released by any administrative role.

**Scope of this document**

This whitepaper describes the current deployed state of the 4TEEN system. It is a technical and structural specification, not a promise of market outcome.

> The 4TEEN token itself does not generate profit. Market price depends on liquidity and demand. The algorithmic purchase price affects only direct contract purchases, not secondary market trading.

---

## 1. Introduction

### The protocol is built to be inspectable, not interpreted.

4TEEN is an on-chain token mechanism with deliberately limited and explicit functionality. Its purpose is to provide a transparent framework for token issuance, transfer restrictions, and liquidity formation enforced entirely by smart contracts.

Unlike custodial or off-chain financial products, 4TEEN does not depend on discretionary management for its core behavior. Token minting, purchase pricing, locking, fund routing, and liquidity scheduling are all defined at the contract level and can be independently verified on-chain.

This document focuses only on what is deployed and enforceable by code. Features, assumptions, or guarantees not explicitly implemented in the contracts are intentionally excluded.

The protocol does not solve price discovery or guarantee market stability. Market price, trading volume, and secondary market demand remain external to the system.

---

## 2. Token Overview

### Fourteen Token (4TEEN)

| Parameter | Value |
|---|---|
| Name | Fourteen Token |
| Symbol | 4TEEN |
| Blockchain | TRON |
| Standard | TRC-20 |
| Decimals | 6 |
| Issuing Time | November 23, 2025 (UTC) |

4TEEN is a transferable on-chain token implemented under the TRC-20 standard. It does not represent equity, debt, governance power, dividends, or claims on off-chain assets.

The token contract stays intentionally narrow in scope. It handles issuance, balances, transfer restrictions, available-balance validation, and deterministic TRX forwarding. It does not directly execute DEX operations or read market prices.

### What the token does

- Issues tokens on deployment and on direct purchase.
- Tracks balances and transfer allowances.
- Creates and enforces per-purchase locks.
- Routes incoming TRX according to hardcoded split rules.

### What the token does not do

- It does not interact with DEXes directly.
- It does not depend on price oracles.
- It does not manage liquidity positions.
- It does not guarantee market price behavior.

---

## 3. Supply Model

### Hybrid supply with on-demand expansion

### 3.1 Initial Supply

At deployment, 10,102,022 4TEEN were minted to the owner side of the system. This initial supply is visible on-chain and was created only once.

There are no hidden allocations or deferred minting schedules beyond what is visible on-chain.

### 3.2 Mint-on-Purchase Issuance

New 4TEEN are minted only when a user calls \`buyTokens()\` and sends TRX to the token contract. Mint amount is determined by the contract purchase price at the time of execution.

If no direct purchases occur, no new tokens are created.

### 3.3 No Emissions, No Burn

- No periodic emissions
- No staking rewards
- No yield-based minting
- No burn mechanism

### 3.4 Circulating Supply Clarification

Explorer-visible total supply does not automatically mean all tokens are immediately liquid or transferable. Vault balances and locked balances may still appear on-chain while remaining mechanically restricted by contract logic.

> Supply integrity is contract-enforced. The system does not allow arbitrary owner minting, forced balance edits, or silent redistribution of user-held tokens.

---

## 4. Price Logic

### Primary sale price only

**Base purchase price at deployment:**

**1 TRX = 1 4TEEN**

### 4.1 Algorithmic Growth

The purchase price is subject to deterministic on-chain growth:

- Annualized growth rate: 14.75%
- Compounding interval: 90 days
- Updates are applied lazily when queried or when a purchase occurs

### 4.2 Scope

This mechanism affects only the amount of 4TEEN minted through the contract purchase flow. It does not set, stabilize, or predict secondary market price.

Market price on DEXes remains independent and depends on trading activity and liquidity conditions.

> The algorithmic purchase price is a deterministic contract calculation. It is not a guarantee of market appreciation, yield, or profit.

---

## 5. Token Locking Mechanism

### Per-purchase locks enforced on-chain

### 5.1 Lock Creation

Every direct purchase through \`buyTokens()\` creates a separate lock entry for the buyer address. Locks are additive and independent. They are not merged or rewritten.

### 5.2 Lock Duration

Each lock lasts for a fixed 14 days from the block timestamp of the purchase.

### 5.3 Transfer Enforcement

The contract validates transferable balance at the time of every transfer or delegated transfer.

\`available balance = total balance − locked balance\`

If a transfer exceeds the unlocked amount, the transaction reverts.

### No administrative override

- No early owner unlock
- No emergency unlock function
- No privileged role with lock-control power

### Locking clarification

The lock applies only to tokens minted through direct purchase. Tokens received through later transfers are not retroactively locked by this rule.

---

## 6. TRX Flow on Purchase

### Every buy routes funds atomically by rule

### 90% TRX

#### Liquidity System

Forwarded to FourteenLiquidityController for scheduled release.

### 7% TRX

#### Controller Layer

Forwarded to FourteenController for control, attribution, and reward accounting.

### 3% TRX

#### Airdrop Layer

Forwarded to AirdropVault for staged ecosystem distribution.

This split is hardcoded and enforced within the purchase transaction itself. If any required transfer fails, the transaction reverts and no tokens are minted.

No TRX remains idle in the token contract as a result of a successful purchase.

---

## 7. Liquidity Architecture

### A two-layer liquidity model

### Layer One — FourteenToken

- Receives TRX from direct purchases
- Routes 90% to the liquidity system
- Does not store liquidity funds long-term
- Does not interact with DEXes directly

### Layer Two — FourteenLiquidityController

- Accumulates TRX forwarded by the token contract
- Releases liquidity at most once per UTC day
- Calculates release amount from current balance
- Dispatches funds to DEX executors

> Liquidity formation is not automatic. It is permissionless but still requires an explicit on-chain call that satisfies controller-side conditions.

---

## 8. Liquidity Execution Logic

### Daily release with hard conditions

### Execution conditions

- Execution has not already occurred for the current UTC day
- Controller balance meets minimum threshold
- A valid on-chain execution call is made

### Release formula

**Daily release amount:**

**6.43% of the controller’s current TRX balance**

The absolute release amount changes as controller balance changes.

### Single-execution protection

Execution is restricted to once per UTC day, and the controller records the execution day before external calls are made.

### Dispatch split

Released TRX is split equally between the two executor contracts: 50% to JustMoney and 50% to Sun.io V3.

---

## 9. DEX Executors

### Exchange-specific execution, isolated from core logic

### LiquidityExecutorSunV3

- Reads current pool price from Sun.io V3
- Calculates token amount dynamically
- Adds liquidity in a concentrated-liquidity format
- Operates with a 0.3% fee tier and a narrow tick range

### LiquidityExecutorJustMoney

- Reads reserve balances from the pool
- Calculates proportional token amount
- Adds liquidity through the AMM router
- Applies slippage protection

> Executors do not decide timing or release amounts. They only apply already released liquidity according to DEX-specific logic.

---

## 10. Vault Architecture

### Purpose-separated reserve custody

### FourteenVault

Stores tokens reserved for liquidity provisioning and keeps them separate from team and airdrop reserves.

### TeamLockVault

Stores team allocation under separate custody and lock-oriented logic rather than mixing it with operational balances.

### AirdropVault

Stores community and growth reserves for staged ecosystem distribution campaigns.

Vaults do not mint tokens, modify balances, or override pricing and lock rules. Their role is custody and separation of allocation functions.

---

## 11. Governance & Permissions

### Administrative powers are explicit and limited

### What ownership can do

- Update annual purchase price growth rate
- Update liquidity-related addresses
- Update designated airdrop address
- Perform explicitly allowed operational maintenance

### What ownership cannot do

- Mint tokens arbitrarily
- Force-unlock user locks
- Edit user balances retroactively
- Manipulate secondary market prices

> Holding 4TEEN does not confer governance rights. Governance in this system means contract-defined admin permissions only.

---

## 12. Frontend Disclaimer

### The frontend is an interface, not the source of truth

### Frontend may display

- balances
- locked and available amounts
- countdown timers
- estimated conversion rates
- transaction history and live state summaries

### Frontend cannot

- unlock tokens
- change contract rules
- guarantee liquidity execution
- guarantee price behavior
- alter balances or supply

> If frontend output and on-chain state ever differ, on-chain state is authoritative.

---

## 13. Security Considerations

### Security by separation, constraints, and deterministic execution

- Critical operations are deterministic and either execute fully or revert.
- External-call paths that handle value use protection against reentrancy patterns.
- Token, controller, executors, and vaults are intentionally separated.
- Permissionless execution still remains bounded by timing and balance rules.
- There are no hidden admin backdoors for arbitrary minting or balance editing.
- DEX interaction risk is isolated away from the core token logic.

> Smart contracts and DEX integrations still carry risk. No absolute security guarantee is implied.

---

## 14. What 4TEEN Is Not

### Clarifications against misreading

### Not an investment product

4TEEN does not promise returns, guaranteed appreciation, profit sharing, or exposure to off-chain revenue.

### Not yield-bearing

There are no staking rewards, no interest, and no passive income mechanics tied to simply holding the token.

### Not price-controlled

The protocol does not stabilize secondary market price. DEX price remains external to contract purchase logic.

### Not risk-free

Users still face smart contract risk, market volatility, liquidity limitations, and external protocol dependency risk.

---

## 15. On-Chain Components & Verification

### Main contracts and verification surface

These are the public components users can inspect directly through TRON explorers and the open repositories behind the product.

### Contract Links

| Category | Component | Link |
|---|---|---|
| Core | FourteenToken | [FourteenToken](https://tronscan.org/#/contract/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A/code) |
| Core | FourteenController | [FourteenController](https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ/code) |
| Core | FourteenLiquidityController | [FourteenLiquidityController](https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ/code) |
| Vault | FourteenVault | [FourteenVault](https://tronscan.org/#/address/TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq) |
| Vault | TeamLockVault | [TeamLockVault](https://tronscan.org/#/address/TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h) |
| Vault | AirdropVault | [AirdropVault](https://tronscan.org/#/address/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ) |
| Execution | LiquidityBootstrapper | [LiquidityBootstrapper](https://tronscan.org/#/address/TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc) |
| Execution | LiquidityExecutorSunV3 | [LiquidityExecutorSunV3](https://tronscan.org/#/contract/TChPBPCEUbwHgsoxG5qqF1KpFbYvaF1Zxa/code) |
| Execution | LiquidityExecutorJustMoney | [LiquidityExecutorJustMoney](https://tronscan.org/#/contract/TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F/code) |

### Public repositories

- [4teen-smart-contracts](https://github.com/info14fourteen-creator/4teen-smart-contracts)
- [4teen-wallet-kit](https://github.com/info14fourteen-creator/4teen-wallet-kit)
- [4teen-ambassador-system](https://github.com/info14fourteen-creator/4teen-ambassador-system)
- [liquidity-bootstrapper-cron](https://github.com/info14fourteen-creator/liquidity-bootstrapper-cron)
- [4teen-telegram-airdrop-bot](https://github.com/info14fourteen-creator/4teen-telegram-airdrop-bot)

### Final note

4TEEN should be read as a structured on-chain system. If a behavior is not defined by deployed code, it is not defined by the protocol.

- [Back to top](#wp-top)
- [Open Direct Buy](https://4teen.me/bt)`,
    },
    "v1-1": {
      slug: "v1-1",
      href: "/whitepaper/v1-1",
      version: "Version 1.1",
      date: "January 3, 2026",
      status: "Historical",
      title: "Rule-Based Demand, Locks, and Liquidity Controller Growth",
      lead:
        "Bridge version between the first tokenomics paper and the later protocol-style whitepapers.",
      document: `**Version:** 1.1 · **Date:** JAN 3, 2026

[Version: 1.0 · Date: Nov 30, 2025](https://4teen.me/wp-1.0)

---

## 1. Introduction

**4TEEN** is a modern TRON-based DeFi token designed around **predictable growth, transparent mechanics, and real on-chain liquidity**.

The project removes complexity commonly found in DeFi systems — such as hidden pricing formulas, opaque supply emissions, manual liquidity control, and privileged entry conditions — and replaces them with a **simple, rule-based economic model** that is fully enforced by smart contracts.

4TEEN is built for users who value:

- Mechanical fairness
- Clear time-based rules
- Capital-backed liquidity
- Predictable market behavior

---

## 2. Core Concept: Demand-Driven Supply

4TEEN does **not** have a fixed maximum supply.

Tokens are minted **only when real TRX is sent to the contract**.

There is no pre-mint, no reserve supply, no private allocation, and no hidden emission schedule.

This creates a **pure demand-driven model**:

- No tokens exist without capital
- Supply expands only through participation
- Every token is backed by real economic activity

---

## 3. Fixed Entry Price Model

All purchases of 4TEEN enter at a **fixed base price** at the time of purchase:

# **1 TRX = 1 4TEEN**

[*](#schedule)

There are:

- No early buyer discounts
- No tiered pricing
- No slippage-based bonding curves

Every participant enters under the same conditions.

The only variable is **time**, not privilege.

---

## 4. 14-Day Lock Cycle

Each purchase follows a strict on-chain lifecycle:

### 01

Tokens are minted instantly

### 02

Tokens are locked for **14 days**

### 03

During the lock period, tokens cannot be transferred or sold

### 04

After 14 days, tokens become fully transferable

This mechanism:

- Prevents immediate sell pressure
- Aligns participant behavior into predictable cycles
- Stabilizes liquidity growth

The lock duration is enforced entirely at the smart contract level.

---

## 5. TRX Distribution & Liquidity Flow

When users purchase 4TEEN, **100% of incoming TRX is processed on-chain** according to predefined rules.

### Initial TRX Routing

- **90% of all incoming TRX is immediately forwarded** to a dedicated **Liquidity Controller smart contract**
- The remaining **10%** is distributed to operational and ecosystem wallets

This design separates **capital collection** from **liquidity execution**, ensuring controlled, time-based liquidity growth instead of instant market impact.

### Liquidity Controller Logic

The Liquidity Controller contract accumulates TRX and executes liquidity operations **once per day**, enforcing strict timing and percentage rules.

Key mechanics:

- Liquidity execution can occur **only once per 24 hours**
- A fixed **6.43% of the controller’s TRX balance** is used per day
- Execution requires a minimum balance of **100 TRX**
- Funds are split **50 / 50** between two executor contracts
- All actions are recorded via on-chain events

This creates a **smooth, predictable liquidity expansion curve** without spikes or manual interference.

### On-Chain Enforcement

- No TRX is injected instantly into liquidity pools
- No human-triggered partial execution
- No accelerated withdrawal of liquidity funds

All liquidity growth follows **deterministic, contract-enforced rules**.

| Destination | Allocation |
|---|---|
| Liquidity Controller Smart Contract | 90% of incoming TRX |
| Operations Wallet | 7% of incoming TRX |
| Community & Airdrop Wallet | 3% of incoming TRX |

**Liquidity Controller Execution Rules**

| Parameter | Value |
|---|---|
| Execution Frequency | Once per 24 hours |
| Daily Execution Rate | 6.43% of controller balance |
| Minimum Balance Required | 100 TRX |
| Liquidity Split | 50% / 50% between two executors |
| Execution Method | On-chain smart contract call |

---

## Liquidity Model

4TEEN’s liquidity structure is built on three principles:

### 1. REAL TRX-ONLY LIQUIDITY

Liquidity is always backed by real TRX from real buyers.

### 2. AUTOMATIC DISTRIBUTION

Liquidity allocation happens inside the smart contract every time someone buys 4TEEN.

### 3. INCREASING MARKET DEPTH

More buyers → more TRX → deeper liquidity → stronger price support.

---

## 6. Automatic Price Growth Mechanism

4TEEN implements a **time-based, on-chain price growth mechanism** governing the base mint price for direct token purchases.

### How the mechanism works

- The base mint price increases **every 90 days**
- Each increase applies a fixed growth coefficient defined in the smart contract
- The growth step is **+14.75% per 90-day period**
- Price updates are applied automatically during contract interaction, e.g. before minting
- If multiple periods have elapsed, price growth is **compounded accordingly**

The mechanism operates entirely on-chain and does not rely on manual execution, external oracles, or discretionary governance actions.

### Key Characteristics

- Deterministic and time-driven
- Fully transparent and verifiable on-chain
- Identical rules for all participants
- Compounded growth when periods are skipped

Price evolution depends strictly on **time and code**, not on market intervention or privileged access.

### Economic Rationale

This structure is designed to:

- **Reward early participation** with lower historical entry prices
- **Create sustained upward pressure** on the base mint price
- **Preserve fairness**, ensuring that timing — not influence — defines entry conditions

### Price Growth Schedule (Direct Purchase)

**Issuing Time:** 2025-11-23 02:37:45 (UTC)

**Initial Price:** 1 TRX = 1 4TEEN

**Adjustment Interval:** every 90 days

**Growth per period:** +14.75%

| Phase | Effective Date (UTC) | Mint Price (TRX per 4TEEN) |
|---|---|---:|
| Phase 0 | 2025-11-23 02:37:45 | 1.0000 |
| Phase 1 | 2026-02-21 02:37:45 | 1.1475 |
| Phase 2 | 2026-05-22 02:37:45 | 1.3168 |
| Phase 3 | 2026-08-20 02:37:45 | 1.5110 |
| Phase 4 | 2026-11-18 02:37:45 | 1.7350 |

---

## 7. Smart Contract Architecture

The 4TEEN token is implemented as a **TRC-20 compliant smart contract** on the TRON network.

Key features include:

- Mint-on-purchase logic
- Time-based token locking
- Automated liquidity forwarding
- Adjustable governance parameters
- Transparent on-chain event logging

All core mechanics are executed on-chain and are publicly verifiable.

---

## 8. Governance & Control

Certain parameters, such as operational wallets or adjustment values, are governed by the [contract owner](https://tronscan.org/#/address/TN95o1fsA7mNwJGYGedvf3y7DJZKLH6TCT).

This allows:

- Long-term protocol maintenance
- Infrastructure upgrades
- Ecosystem expansion

No parameter changes affect existing locked tokens retroactively.

---

## 9. Risk Disclosure

Participation in 4TEEN involves inherent risks, including but not limited to:

- Market volatility
- Liquidity fluctuations
- Smart contract vulnerabilities
- Loss of private keys
- Regulatory uncertainty

Nothing in this document constitutes financial or investment advice.

Users are solely responsible for their decisions.

---

## 10. Conclusion

4TEEN represents a **clean, rule-based DeFi token model** built on transparency and predictability.

Its design emphasizes:

- Fixed and fair entry pricing
- Demand-driven supply creation
- Short, enforceable lock cycles
- Automated liquidity growth
- Time-based price appreciation

There are no hidden mechanisms — only code, time, and participation.

---

## Useful On-Chain Links

All core components of the 4TEEN protocol are publicly verifiable on-chain via Tronscan.

These links provide direct access to ownership, smart contract code, and liquidity execution infrastructure.

| Component | Tronscan Link |
|---|---|
| Issuer / Contract Owner | [TN95o1fsA7mNwJGYGedvf3y7DJZKLH6TCT](https://tronscan.org/#/address/TN95o1fsA7mNwJGYGedvf3y7DJZKLH6TCT) |
| 4TEEN Token Contract | [View Smart Contract Code](https://tronscan.org/#/contract/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A/code) |
| Liquidity Executor (SunSwap V3) | [LiquidityExecutorSunV3](https://tronscan.org/#/contract/TChPBPCEUbwHgsoxG5qqF1KpFbYvaF1Zxa/code) |
| Liquidity Executor (JustMoney) | [LiquidityExecutorJustMoney](https://tronscan.org/#/contract/TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F/code) |
| Liquidity Controller Contract | [FourteenLiquidityController](https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ/code) |

> All listed contracts are deployed on the TRON mainnet. Liquidity operations, price updates, and token minting rules are fully enforced by smart contracts and can be independently verified via Tronscan.`,
    },
    "v1-0": {
      slug: "v1-0",
      href: "/whitepaper/v1-0",
      version: "Version 1.0",
      date: "November 30, 2025",
      status: "Historical",
      title: "Short-Cycle Price Expansion and Liquidity-Driven Tokenomics",
      lead:
        "The first published tokenomics paper centered on fixed entry, demand-driven supply, short lock cycles, and automatic liquidity forwarding.",
      document: `**Version:** 1.0

**Date:** Nov 30, 2025

---

## Summary

4TEEN is a TRON-based token built for short-cycle price expansion, transparent liquidity flow, and fair on-chain mechanics. Its economy is structured around a fixed entry price, dynamic supply, time-locked tokens, and an automated liquidity distribution model. The goal of 4TEEN is to create a predictable, transparent, and self-reinforcing growth mechanism suited for DeFi participants who understand on-chain liquidity and incentive flows.

---

## 1. Introduction

4TEEN is a demand-driven token with **no fixed total supply**, where tokens are minted exclusively when real TRX enters the system. The project is built for speed, transparency, and sustainable liquidity growth. A short **14-day lock period** ensures market stability, while continuous liquidity forwarding strengthens the token’s market depth over time.

4TEEN is designed for DeFi users who value **clean tokenomics**, **real liquidity**, and **mechanics that cannot be manipulated manually**.

---

## 2. How 4TEEN Works

### 01. Fixed Entry Price

4TEEN uses a constant entry rate of:

**1 TRX = 1 4TEEN**

This eliminates slippage, arbitrary pricing, and early-stage volatility.

Every buyer enters at the exact same price.

---

### 02. Mint-On-Purchase

4TEEN does not have a preset supply.

New tokens are minted *only* at the moment a buyer sends TRX to the contract.

No pre-minting. No hidden allocations. No private rounds.

This makes 4TEEN fully **demand-driven**: supply grows only when real TRX flows in.

---

### 03. 14-Day Lock Period

Every purchase initiates a **14-day lock** for the minted tokens.

During the lock period, tokens cannot be transferred or sold.

The purpose:

- Prevent instant dumping

- Create short, predictable holding cycles

- Support natural liquidity and price formation

After 14 days, tokens unlock automatically and become available for transfers or trading.

---

## 3. Liquidity & TRX Flow

When users buy 4TEEN, the incoming TRX is distributed automatically:

| Destination | Percentage | Purpose |
|---|---:|---|
| Liquidity Pool | 90% | Strengthens price backing & market depth |
| Owner Wallet | 7% | Operations & development |
| Airdrop Address | 3% | Community incentives & growth |

This structure ensures that **most** of the TRX goes directly into liquidity, increasing long-term stability.

---

## Liquidity Model

4TEEN’s liquidity structure is built on three principles:

### 1. REAL TRX-ONLY LIQUIDITY

Liquidity is always backed by real TRX from real buyers.

### 2. AUTOMATIC DISTRIBUTION

Liquidity allocation happens inside the smart contract every time someone buys 4TEEN.

### 3. INCREASING MARKET DEPTH

More buyers → more TRX → deeper liquidity → stronger price support.

---

## 4. Dynamic Supply Model

**4TEEN** does **not** have a max supply.

The supply is **fully dynamic** and expands only when purchases occur.

**Dynamic supply = no inflation without demand.**

This creates a natural balance:

- When activity is high → supply expands

- When activity is low → supply stops expanding

- Liquidity continues to strengthen as long as purchases happen

This prevents oversupply and aligns the token economy directly with user demand.

---

## 5. Automated Price Growth

**4TEEN** includes a quarterly price-growth mechanism:

Every **90 days**, the token’s minting price adjusts upward based on a preset growth rate, default: **14.75% annualized**.

Meaning:

- Early buyers mint at a lower price

- Later buyers mint at a higher price

- Price grows automatically with time and demand

This creates a built-in incentive for early adoption.

---

## 6. Smart Contract Architecture

The 4TEEN contract includes:

### • TRC-20 Standard Compatibility

Fully compliant with TRON’s token standard.

### • Mint-on-buy Mechanism

Direct minting based on incoming TRX.

### • 14-Day Vesting Logic

Locks are tracked individually per user.

### • Reentrancy Protection

Prevents malicious recursive calls during TRX forwarding.

### • Owner Governance

Only the owner can update:

- annual growth rate

- liquidityPool address

- airdrop address

### • Transparent Events

Events for every buy, price update, transfer, and approval.

---

## 7. Smart Contract Architecture

| Component | Value |
|---|---|
| Token Name | 4teen |
| Symbol | 4TEEN |
| Decimals | 6 |
| Entry Price | 1 TRX = 1 4TEEN |
| Supply Type | Dynamic |
| Lock Duration | 14 days |
| Liquidity Allocation | 90% of TRX |
| Airdrop Allocation | 3% |
| Operational Allocation | 7% |
| Price Growth Interval | Every 90 days |
| Price Model | Time-based compounding |

---

## 8. Risk Statement

4TEEN is a decentralized smart-contract system deployed on the TRON blockchain.

Participation involves risk, including but not limited to:

- Market volatility

- Liquidity fluctuations

- Smart contract vulnerabilities

- Loss of private keys

- Regulatory uncertainty

Nothing in this document constitutes financial advice.

Users should evaluate their own risk tolerance before interacting with the 4TEEN token or related products.

---

## 9. Conclusion

4TEEN introduces a short-cycle, liquidity-driven token model designed for transparent growth, fair participation, and predictable price behavior.

With a fixed entry price, dynamic minting, enforced lock periods, and automatic liquidity forwarding, 4TEEN aligns incentives across all market participants.

The combination of real TRX backing, dynamic supply, and structured liquidity distribution positions 4TEEN as a modern DeFi-native asset built for a new generation of on-chain liquidity engines.`,
    },
  },
};

export function getWhitepaperPageContent(
  _locale: SupportedSiteLocale,
): WhitepaperPageContent {
  return whitepaperContentEn;
}

export function getCurrentWhitepaperDocument(
  locale: SupportedSiteLocale,
): WhitepaperCurrentDocument {
  return getWhitepaperPageContent(locale).current;
}

export function getWhitepaperArchivePageContent(
  locale: SupportedSiteLocale,
): WhitepaperPageContent {
  return getWhitepaperPageContent(locale);
}

export function getWhitepaperVersionDocument(
  locale: SupportedSiteLocale,
  slug: WhitepaperVersionSlug,
): WhitepaperVersionDocument {
  return getWhitepaperPageContent(locale).versions[slug];
}
