export const whitepaperCurrentDocumentEn = {
  href: "/whitepaper",
  version: "Version 1.4",
  date: "May 4, 2026",
  status: "Current",
  title: "Current Protocol State Across Contracts, Wallet Flows, and Operating Layers",
  lead:
    "The current 4TEEN system is broader than a single token contract. It now combines direct mint logic, controller-side ownership, scheduled liquidity execution, vault custody, wallet-driven confirmation flows, and an operator-assisted ambassador settlement layer.",
  document: `# 4TEEN Whitepaper

**Version:** 1.4 • **Date:** May 4, 2026

# Current Protocol State Across Contracts, Wallet Flows, and Operating Layers

4TEEN is a TRON protocol built around direct contract minting, per-purchase token locks, controller-side ownership, scheduled liquidity execution, and an operator-assisted ambassador settlement flow. This document is based on the current smart-contract repository, the current wallet app repository, and the public protocol routes as they stand on May 4, 2026.

---

## Summary

### Token

**4TEEN**

TRC-20 token on TRON with 6 decimals and direct contract minting.

### Primary Entry

**Buy**

Users send TRX into the token contract and receive newly minted 4TEEN under a fixed 14-day lock.

### Controller

**FourteenController**

Acts as the owner-side control layer for token administration, referral state, buyer binding, and reward accounting.

### Liquidity Rule

**6.43%**

FourteenLiquidityController can release 6.43% of its balance at most once per UTC day, subject to a 100 TRX minimum threshold.

### Wallet Surface

**Broader than 4TEEN only**

The current wallet app is not a single-purpose buy screen. It includes portfolio, custom-token management, history, swap, unlock, liquidity, ambassador, and protocol-information surfaces.

---

## Table of Contents

### Read the current system in one pass

- [Abstract](#wp-abstract)
- [Introduction](#wp-introduction)
- [Scope and Sources](#scope-and-sources)
- [Token Overview](#wp-token)
- [Direct Buy Flow](#direct-buy-flow)
- [Price Logic](#wp-price)
- [Token Locking and Unlock Visibility](#token-locking-and-unlock-visibility)
- [TRX Routing and Controller Ownership](#trx-routing-and-controller-ownership)
- [Liquidity Architecture](#wp-liquidity)
- [Liquidity Execution and Bootstrap](#liquidity-execution-and-bootstrap)
- [Wallet Application Surface](#wallet-application-surface)
- [Swap Surface and Asset Coverage](#swap-surface-and-asset-coverage)
- [Ambassador Attribution and Settlement](#ambassador-attribution-and-settlement)
- [Vault Architecture](#wp-vaults)
- [Governance and Operating Controls](#wp-governance)
- [Frontend, API, and Source of Truth](#frontend-api-and-source-of-truth)
- [Verification](#wp-verify)
- [Security and Risk](#wp-security)
- [What 4TEEN Is Not](#wp-not)

---

## Abstract

### The 4TEEN system now spans contract rules, wallet flows, and controlled operating layers.

4TEEN started as a direct-buy token with a fixed lock and fixed TRX routing. In its current form, that base still exists, but the active system around it is more structured. The protocol now combines a token contract, a controller contract, a liquidity controller, DEX-specific executors, purpose-separated vaults, a wallet application, and a backend settlement layer for ambassador processing.

The key distinction is important:

- contract rules still define minting, locking, routing, ownership, and liquidity timing
- the wallet app defines how users review, confirm, and inspect those rules
- the operating layer helps attribution and settlement continue when blockchain resources are constrained

This document describes the system as it currently exists across those connected layers. It is not a price promise and it is not an investment claim.

> The 4TEEN token itself does not generate profit. Market price depends on liquidity, demand, and external market behavior. The contract purchase price applies only to direct buys through the token contract.

---

## 1. Introduction

### The protocol should be inspected as a system, not as a slogan.

4TEEN is not just a landing page, a token ticker, or a direct-buy button. The current architecture is a modular TRON system with deliberately separated responsibilities.

At the center sits the token contract. Around it sit the controller layer, the liquidity release layer, DEX-specific execution contracts, reserve vaults, and the wallet application that exposes those mechanics to users. On top of that, the ambassador flow now includes a real settlement pipeline that bridges first-touch attribution, backend verification, resource gating, and final controller-side reward accrual.

That broader shape matters because reading only the token contract no longer gives the full operational picture. The token is still the protocol entry point, but it is no longer the whole protocol surface.

---

## 2. Scope and Sources

### This version is based on repositories and current operating code, not only on older public copy.

This whitepaper is written from the current repository state as of **May 4, 2026**.

Primary sources used:

- current smart contracts repository
- current wallet app repository
- current public protocol site routes

This document intentionally distinguishes between three categories of truth:

### 1. Contract-enforced rules

These are the mechanics that execute or revert on-chain:

- direct minting
- transfer locks
- TRX routing
- controller ownership functions
- liquidity release conditions
- controller-side reward accrual

### 2. Wallet-enforced transaction preparation

These are user-facing steps in the wallet app:

- active wallet selection
- contract-state reads before confirmation
- quote building
- allowance detection
- resource estimation
- minimum-received preview

### 3. Operating-layer continuity

These are backend and operator workflows:

- referral candidate resolution
- purchase reconciliation
- resource-floor checks
- deferred replay when allocation resources are insufficient

When these categories differ, contract state remains the final authority for balances, locks, routing, processed purchases, and reward accrual.

---

## 3. Token Overview

### Fourteen Token (4TEEN)

| Parameter | Value |
|---|---|
| Name | Fourteen Token |
| Symbol | 4TEEN |
| Blockchain | TRON |
| Standard | TRC-20 |
| Decimals | 6 |
| Issuing Time | November 23, 2025 (UTC) |

4TEEN is a transferable on-chain token implemented as a TRC-20 asset on TRON.

The token contract is intentionally narrow in purpose:

- issue new tokens on direct purchase
- track balances and allowances
- enforce per-purchase locks
- route incoming TRX by fixed purchase rules

### Initial supply and ongoing minting

The current contract repository shows an initial deployment mint of **10,102,022 4TEEN** to the owner side of the system. Beyond that, new supply is created only when users call \`buyTokens()\` and send TRX into the direct-buy route.

There are no periodic emissions, no staking rewards, no yield minting, and no burn model in the current contract layer.

> Total supply and circulating usability are not the same thing. Tokens may exist on-chain while still being locked or held in reserve vaults.

---

## 4. Direct Buy Flow

### The buy route is a real contract interaction, not a generic swap screen.

The current wallet app treats direct buy as a dedicated product flow.

Before execution, the wallet reads and prepares:

- token contract address
- current token price
- annual growth rate
- price-update interval
- contract owner
- liquidity pool address
- airdrop address
- buyer locked-balance state
- wallet TRX balance
- estimated token output
- estimated resource usage and potential burn

After review, the wallet sends a payable call to:

\`buyTokens()\`

That transaction does three things atomically when successful:

1. mints new 4TEEN
2. creates a fresh 14-day lock entry for that purchase
3. routes incoming TRX by the fixed protocol split

The wallet app also exposes confirmation-specific context that matters in practice:

- estimated minted amount
- 90 / 7 / 3 routing preview
- next price-update time
- locked token balance already held by the buyer
- resource coverage and burn estimates when energy or bandwidth are low

This means the buy flow is no longer just “send TRX and hope.” The current wallet surface explains the contract state before signing.

---

## 5. Price Logic

### The direct-buy price is deterministic and time-based.

Base deployment price:

**1 TRX = 1 4TEEN**

The token contract stores:

- \`tokenPrice\`
- \`annualGrowthRate\`
- \`lastPriceUpdate\`
- \`priceUpdateInterval\`

The current repositories show:

- annual growth rate: **1475 bps**
- interval: **90 days**

The price update model is compounded by elapsed periods. The token contract exposes \`getCurrentPrice()\`, while the controller contract exposes a read-side preview path for current price calculation without needing to rewrite stored state first.

This mechanism affects only direct contract minting. It does not set or guarantee DEX market price.

---

## 6. Token Locking and Unlock Visibility

### Locks are created per purchase and enforced at transfer time.

Every direct buy creates a separate lock entry with:

- token amount
- release timestamp

Each lock lasts **14 days** from purchase time.

Transferability is enforced through the available-balance rule:

\`available balance = total balance − locked balance\`

If a transfer exceeds the unlocked portion, it reverts.

### How the current product exposes this

The current wallet app does more than hold the lock silently. It includes unlock visibility surfaces that read:

- total balance
- locked balance
- available balance
- unlock timeline data
- per-batch progression and countdown

That matters because the protocol is intentionally split between the contract rule and the user’s ability to inspect the rule.

---

## 7. TRX Routing and Controller Ownership

### Direct-buy TRX is routed by fixed percentages.

The current architecture documents this split:

- **90%** → FourteenLiquidityController
- **7%** → FourteenController
- **3%** → AirdropVault

The older single-contract interpretation of “7% to owner” is now expressed through controller ownership. In the current architecture described by the smart-contract repository, the token contract is not owned by an externally operated wallet. It is owned by **FourteenController**.

That distinction matters because it changes what the 7% rail means in practice:

- it is no longer just a generic owner wallet share
- it becomes controller-side protocol funds
- those funds are later divided between reserved referral rewards and owner-available balance by controller logic

The controller contract explicitly tracks:

- \`unallocatedPurchaseFunds\`
- \`ownerAvailableBalance\`
- \`totalReservedRewards\`

So the direct-buy rail now feeds not only administration, but also the current ambassador accounting model.

---

## 8. Liquidity Architecture

### Liquidity is scheduled, not instantly market-injected.

The current contracts repository describes a two-stage liquidity model.

### Layer One — FourteenToken

- receives purchase TRX
- forwards the liquidity share to FourteenLiquidityController
- does not add liquidity directly

### Layer Two — FourteenLiquidityController

- stores liquidity-side TRX
- allows execution only once per UTC day
- requires at least **100 TRX** balance
- releases **6.43%** of controller balance when conditions are met
- splits the released TRX equally between executor contracts

This means “liquidity exists” and “liquidity executes now” are separate states.

Liquidity timing is therefore rule-bounded, not user-impulsive.

---

## 9. Liquidity Execution and Bootstrap

### Bootstrap first, execute second.

The current system does not send raw TRX into DEX contracts blindly.

The execution path is:

1. **LiquidityBootstrapper** checks whether execution is available
2. it calculates the token-side amounts needed by each DEX executor
3. it pulls 4TEEN from **FourteenVault**
4. it prepares executor balances
5. it triggers **FourteenLiquidityController**
6. controller releases TRX and splits it 50 / 50

Current execution targets:

- **LiquidityExecutorJustMoney**
- **LiquidityExecutorSunV3**

The bootstrapper exists because the DEXes do not share the same liquidity format:

- JustMoney uses reserve-based AMM behavior
- Sun.io V3 uses concentrated-liquidity pricing behavior

The separation keeps DEX-specific logic out of the token core.

### Permissionless, but not unconstrained

The liquidity path is permissionless in the sense that execution does not depend on a privileged wallet alone.

It is still bounded by on-chain conditions:

- once per UTC day
- minimum controller balance
- current controller balance percentage rule
- bootstrap readiness before execution

Automation may trigger this flow, but automation does not define those rules.

---

## 10. Wallet Application Surface

### The wallet app is broader than a single-token companion.

The current wallet repository shows a larger TRON wallet surface around 4TEEN, not just a protocol microsite in app form.

Current wallet-side capabilities include:

- wallet selection and signing context
- portfolio and market-value display
- transaction history
- token details
- unlock visibility
- direct buy
- swap
- liquidity controller execution screen
- ambassador program and reward views
- manage-crypto and custom-token flows

The manage-crypto layer is especially important because it shows that the app is not built as “4TEEN only.” The wallet stores default visible assets such as TRX, 4TEEN, and USDT, but also supports a broader custom-token catalog and history-derived token fallback handling.

That broader asset behavior is part of the current product reality.

---

## 11. Swap Surface and Asset Coverage

### The current swap implementation is quote-driven and route-aware.

The current wallet app exposes a dedicated swap route that:

- chooses the active signing wallet
- lets the user select token input context
- builds quotes through the current Sun.io routing layer
- ranks routes by expected output
- calculates minimum received after slippage
- checks allowance before execution
- separates approval from swap submission when required

The current swap service uses:

- Sun.io routing
- route-path metadata
- minimum-received logic
- allowance checks
- resource estimation for approval and execution

The dedicated 4TEEN-focused path currently centers on exit routes such as **4TEEN → TRX** and **4TEEN → USDT**. At the same time, the broader wallet asset layer proves that the product itself is not limited to one token.

This distinction matters:

- the **protocol** remains 4TEEN-specific
- the **wallet product** is broader than 4TEEN-only

That is a real product advantage and should be described as such.

---

## 12. Ambassador Attribution and Settlement

### The current ambassador system is not only a referral link. It is a multi-layer settlement workflow.

The current controller contract contains ambassador state directly on-chain:

- self-registration
- manual assignment
- slug ownership
- buyer binding
- processed purchase IDs
- reward accrual
- reward withdrawals
- auto-level or override-level logic

Reward ladder:

- Bronze → **10%**
- Silver → **25%**
- Gold → **50%**
- Platinum → **75%**

Buyer thresholds:

- 0–9 buyers → Bronze
- 10–99 buyers → Silver
- 100–999 buyers → Gold
- 1000+ buyers → Platinum

### The operating layer around it is now explicit

The current wallet app backend shows a more advanced purchase-reconciliation model than earlier whitepapers described.

Current flow in practice:

1. a direct-buy transaction is detected from token events
2. a purchase ID is derived from tx hash and buyer wallet
3. referral candidate data can be resolved from slug capture
4. existing buyer binding is checked on-chain
5. the backend checks whether allocation resources are above a safe floor
6. if resources are sufficient, it calls \`recordVerifiedPurchase()\`
7. if resources are insufficient, the purchase can remain preserved for replay
8. a later replay flow can allocate the purchase once resources recover

This is a crucial distinction:

- attribution continuity can be preserved off-chain
- final reward settlement still happens through **FourteenController**
- double-processing is blocked by \`processedPurchases\`

In other words, the current system is operationally safer than a naive “must settle immediately or lose attribution” model.

---

## 13. Vault Architecture

### Reserve custody is separated by purpose.

Current vault contracts:

| Vault | Role |
|---|---|
| FourteenVault | liquidity token reserve |
| AirdropVault | community distribution reserve |
| TeamLockVault | team allocation lock custody |

Repository funding references currently document:

- **2,000,000 4TEEN** to FourteenVault
- **1,500,000 4TEEN** to AirdropVault
- **3,000,000 4TEEN** to TeamLockVault

The role of these vaults is custody and separation, not policy invention. They do not define minting, buy pricing, or liquidity timing. They keep reserve functions partitioned.

---

## 14. Governance and Operating Controls

### Administrative power exists, but it is narrower than arbitrary control.

The current controller layer can:

- set annual growth rate
- update liquidity pool address
- update airdrop address
- transfer token ownership
- sync token price state
- manage operators
- pause controller-side program actions
- enable or disable self-registration
- manage ambassador records and reward flows

The current system does **not** expose a clean arbitrary-mint function in the controller layer, and it does not expose a user-lock bypass in the token-transfer rule set.

Important distinction:

- there is still admin power
- there is not unrestricted hidden balance editing in the current described architecture

Governance in 4TEEN means contract-defined operational control, not token-holder voting.

---

## 15. Frontend, API, and Source of Truth

### The website, wallet app, and API do not have the same role.

The current system has three public-facing layers:

### Website

- public information
- public protocol snapshots
- whitepaper and archive reading
- public route explanations

### Wallet app

- signing context
- direct transaction preparation
- resource estimation
- portfolio and asset management
- swap and buy confirmation
- unlock visibility

### API and operator services

- purchase reconciliation
- slug resolution
- pending allocation replay
- cabinet-side statistics
- resource-floor checks before controller settlement

When these layers disagree, the order of truth should be read like this:

1. on-chain contracts
2. verified on-chain events
3. operator/API state used for continuity
4. frontend presentation

The frontend is useful. It is not authoritative over token state.

---

## 16. Verification

### The current system is meant to be checked from more than one angle.

### Core contracts

| Component | Link |
|---|---|
| FourteenToken | [FourteenToken](https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A) |
| FourteenController | [FourteenController](https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ) |
| FourteenLiquidityController | [FourteenLiquidityController](https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ) |
| LiquidityBootstrapper | [LiquidityBootstrapper](https://tronscan.org/#/contract/TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc) |
| LiquidityExecutorSunV3 | [LiquidityExecutorSunV3](https://tronscan.org/#/contract/TU8EwEWg4K594zwThvhTZxqzEuEYuR46xh) |
| LiquidityExecutorJustMoney | [LiquidityExecutorJustMoney](https://tronscan.org/#/contract/TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F) |
| FourteenVault | [FourteenVault](https://tronscan.org/#/contract/TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq) |
| AirdropVault | [AirdropVault](https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ) |
| TeamLockVault | [TeamLockVault](https://tronscan.org/#/contract/TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h) |

### Primary repositories

- [4teen-smart-contracts](https://github.com/info14fourteen-creator/4teen-smart-contracts)
- [4teen-wallet-app](https://github.com/info14fourteen-creator/4teen-wallet-app)
- [4teen-ambassador-system](https://github.com/info14fourteen-creator/4teen-ambassador-system)
- [liquidity-bootstrapper-cron](https://github.com/info14fourteen-creator/liquidity-bootstrapper-cron)
- [4teen-telegram-airdrop-bot](https://github.com/info14fourteen-creator/4teen-telegram-airdrop-bot)

### Verification principle

The stronger reading of 4TEEN is this:

- inspect the contracts
- inspect the wallet implementation
- inspect the reconciliation behavior
- inspect the public routes
- compare all of that against actual on-chain state

If a behavior is not visible in code or in verified contract state, it should not be treated as guaranteed protocol behavior.

---

## 17. Security and Risk

### Separation reduces coupling, but it does not erase risk.

Current strengths in the design:

- token, controller, liquidity, executors, vaults, and wallet flows are separated
- direct-buy routing is explicit
- transfer locks are enforced at the token level
- liquidity release timing is bounded on-chain
- processed purchase IDs reduce duplicate settlement risk
- resource gating reduces failed ambassador allocation attempts during low-resource periods

Remaining risks still exist:

- smart contract bugs
- DEX integration risk
- TRON infrastructure instability
- operator resource shortages
- automation or replay interruptions
- market volatility
- liquidity mismatch between direct-buy price and secondary market conditions

This document should not be read as a claim of zero risk or guaranteed uptime.

---

## 18. What 4TEEN Is Not

### Important clarifications

4TEEN is not:

- a guaranteed-profit product
- a passive-yield token
- a promise that direct-buy price and market price will match
- a claim that the entire ambassador workflow is settled instantly at every moment
- a claim that the wallet app is only a single-purpose 4TEEN shell

It is better described as:

- a direct-mint TRON token protocol
- with fixed purchase locks
- controller-side ownership
- scheduled liquidity release
- separated reserve custody
- and a wallet + operating stack that has grown around those mechanics

> Final principle: if a behavior is not enforced by deployed contracts or clearly implemented in the current operating code, it should not be represented as a protocol guarantee.`,
};
