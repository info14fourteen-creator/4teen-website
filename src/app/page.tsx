import Link from "next/link";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { FourteenTopbar } from "@/components/site/topbar";

const heroPoints = [
  "Direct buy price is not the same as DEX price.",
  "Every protocol purchase is minted and locked for 14 days.",
  "Liquidity is released by visible on-chain rules, not random manual action.",
];

const heroStats = [
  ["Entry Path", "Direct via FourteenToken"],
  ["Issuance", "Mint on Purchase"],
  ["Lock Logic", "14 Days Fixed"],
  ["Liquidity", "Daily Rule-Based Release"],
];

const heroQuickTools = [
  {
    title: "Liquidity Controller",
    meta: "Track rule-based releases",
    href: "/liquidity",
  },
  {
    title: "Unlock Timeline",
    meta: "View lock and unlock flow",
    href: "/unlock",
  },
  {
    title: "Airdrop",
    meta: "Explore distribution structure",
    href: "/airdrop",
  },
  {
    title: "Ambassador Program",
    meta: "Join and track referrals",
    href: "/ambassadors",
  },
];

const walletBest = [
  ["Binance Wallet", "Works / Balance visible"],
  ["Bitget Wallet", "Works / Balance visible"],
  ["OKX Wallet", "Works / Balance visible"],
  ["TokenPocket", "Works / Balance visible"],
];

const walletWorks = [
  ["FoxWallet", "Works / Balance not displayed"],
  ["imToken", "Works / Balance not displayed"],
  ["MetaMask", "Works / Balance not displayed"],
  ["TronLink", "Works / Balance not displayed"],
  ["WalletConnect", "Works / Balance not displayed"],
  ["Trust Wallet", "Use desktop Chrome extension"],
];

const trustLinks = [
  ["Network", "TRON Mainnet", "https://tronscan.org"],
  [
    "Contract",
    "FourteenToken",
    "https://tronscan.org/#/contract/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
  ],
  ["Tool", "Liquidity Rules", "/liquidity"],
  ["Docs", "Whitepaper", "/whitepaper"],
  [
    "Repo",
    "Wallet App",
    "https://github.com/info14fourteen-creator/4teen-wallet-app",
  ],
  [
    "Repo",
    "Wallet Kit",
    "https://github.com/info14fourteen-creator/4teen-wallet-kit",
  ],
];

const howSteps = [
  {
    step: "1",
    title: "Buy Through the Protocol",
    text:
      "The entry starts when a user sends TRX into FourteenToken. This is not the same as buying directly from a DEX pool.",
  },
  {
    step: "2",
    title: "Mint on Purchase",
    text:
      "4TEEN is issued by contract logic at the moment of entry. The protocol creates the position instead of routing you into open-market inventory.",
  },
  {
    step: "3",
    title: "Lock for 14 Days",
    text:
      "Purchased tokens are locked for a fixed 14-day period. That changes the post-buy behavior and reduces immediate sell pressure from direct entry.",
  },
  {
    step: "4",
    title: "Route TRX by Rule",
    text:
      "Incoming TRX is split automatically across the protocol structure instead of being handled as one opaque balance.",
    split: [
      ["90%", "Liquidity Controller"],
      ["7%", "Controller"],
      ["3%", "Airdrop Vault"],
    ],
  },
  {
    step: "5",
    title: "Release Liquidity Daily, Unlock Later",
    text:
      "Liquidity is released by FourteenLiquidityController once per UTC day using fixed contract logic. The controller releases 6.43% of its current balance, then routes execution across supported DEX paths. User tokens unlock only after the full 14-day lock period.",
    full: true,
  },
];

const architectureFacts = [
  [
    "Liquidity",
    "Release timing, reserve storage, bootstrap prep, and DEX execution are isolated into dedicated contracts.",
  ],
  [
    "Ambassadors",
    "Level progression and reward percent are tied to real buyer count and verified purchase allocation.",
  ],
  [
    "Airdrop",
    "The community route is wave-based, multi-platform, and already live through Telegram operations.",
  ],
  [
    "Why it matters",
    "4TEEN behaves like a system of separated roles, not one overloaded contract blob.",
  ],
];

const rewardLadder = [
  ["Bronze", "0-9 buyers", "10%"],
  ["Silver", "10-99 buyers", "25%"],
  ["Gold", "100-999 buyers", "50%"],
  ["Platinum", "1000+ buyers", "75%"],
];

const whyCards = [
  {
    id: "01",
    title: "Reduced Immediate Sell Pressure",
    text:
      "Direct protocol purchases do not behave like instant open-market inventory. Purchased tokens enter a fixed 14-day lock, which changes what happens right after entry.",
    why: "Entry is structured first, then unlock happens later.",
  },
  {
    id: "02",
    title: "Visible Liquidity Behavior",
    text:
      "Liquidity is not injected randomly. Release timing follows controller rules, bootstrap preparation, and executor-specific paths that can be tracked as part of the on-chain system.",
    why: "Users can observe release logic instead of guessing at hidden manual actions.",
  },
  {
    id: "03",
    title: "Separated Contract Roles",
    text:
      "Token issuance, control, ambassador rewards, airdrop distribution, reserve handling, bootstrap preparation, and DEX execution are split into dedicated layers instead of one overloaded contract.",
    why: "The system is easier to read, verify, and reason about.",
  },
];

const liveMetricCards = [
  {
    label: "Direct Price",
    main: "Syncing",
    sub: "Protocol quote wiring is next.",
  },
  {
    label: "DEX Reference",
    main: "Syncing",
    sub: "DEX quote wiring is next.",
  },
  {
    label: "Unlock Cycle",
    main: "14 Days",
    sub: "Fixed lock for direct purchases",
  },
  {
    label: "Daily Liquidity Rule",
    main: "6.43%",
    sub: "Released once per UTC day by controller logic",
  },
];

const tools = [
  {
    status: "Next",
    tone: "wait",
    title: "Buy 4TEEN",
    text: "Enter through the protocol from the direct-buy surface built from the wallet flow.",
    href: "/buy",
  },
  {
    status: "Track",
    tone: "live",
    title: "Liquidity Controller",
    text: "Review the rule-based liquidity path and execution logic from the architecture layer.",
    href: "/liquidity",
  },
  {
    status: "Track",
    tone: "live",
    title: "Unlock Timeline",
    text: "See how the 14-day lock cycle moves toward token unlock.",
    href: "/unlock",
  },
  {
    status: "Next",
    tone: "wait",
    title: "Swap Surface",
    text: "Prepare the market-side access and comparison flow inside the new app shell.",
    href: "/swap",
  },
  {
    status: "Live",
    tone: "live",
    title: "Airdrop Layer",
    text: "Explore the distribution structure, live reward routes, and staged waves.",
    href: "/airdrop",
  },
  {
    status: "Join",
    tone: "wait",
    title: "Ambassador Registration",
    text: "Create your ambassador identity, connect a wallet, and start the referral path.",
    href: "/ambassadors",
  },
  {
    status: "Manage",
    tone: "wait",
    title: "Ambassador Cabinet",
    text: "Track buyers, reward percent, level progress, and claimable rewards from the new app shell.",
    href: "/ambassadors",
  },
];

const contractLinks = [
  [
    "Core",
    "FourteenToken",
    "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A",
  ],
  [
    "Core",
    "FourteenController",
    "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ",
  ],
  [
    "Core",
    "FourteenLiquidityController",
    "https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ",
  ],
  [
    "Vault",
    "FourteenVault",
    "https://tronscan.org/#/contract/TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq",
  ],
  [
    "Vault",
    "TeamLockVault",
    "https://tronscan.org/#/contract/TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h",
  ],
  [
    "Vault",
    "AirdropVault",
    "https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ",
  ],
  [
    "Execution",
    "LiquidityBootstrapper",
    "https://tronscan.org/#/contract/TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc",
  ],
  [
    "Execution",
    "LiquidityExecutorSunV3",
    "https://tronscan.org/#/contract/TU8EwEWg4K594zwThvhTZxqzEuEYuR46xh",
  ],
  [
    "Execution",
    "LiquidityExecutorJustMoney",
    "https://tronscan.org/#/contract/TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F",
  ],
];

const repoLinks = [
  [
    "Repo",
    "4teen-smart-contracts",
    "https://github.com/info14fourteen-creator/4teen-smart-contracts",
  ],
  [
    "Repo",
    "4teen-wallet-app",
    "https://github.com/info14fourteen-creator/4teen-wallet-app",
  ],
  [
    "Repo",
    "4teen-wallet-kit",
    "https://github.com/info14fourteen-creator/4teen-wallet-kit",
  ],
  [
    "Repo",
    "liquidity-bootstrapper-cron",
    "https://github.com/info14fourteen-creator/liquidity-bootstrapper-cron",
  ],
  [
    "Repo",
    "4teen-telegram-airdrop-bot",
    "https://github.com/info14fourteen-creator/4teen-telegram-airdrop-bot",
  ],
];

const docsLinks = [
  ["Docs", "Whitepaper", "/whitepaper"],
  ["Docs", "Verification", "/verification"],
  ["Docs", "Blog", "/blog"],
];

const hubLinks = [
  ["Hub", "Airdrop Hub", "/airdrop"],
  ["Hub", "Ambassador Program", "/ambassadors"],
];

const faqs = [
  [
    "How is direct price different from DEX price?",
    "The direct price comes from protocol logic inside the 4TEEN system. The DEX price comes from open-market trading and liquidity conditions. They are related to the same token, but they are not the same source of pricing.",
  ],
  [
    "Why are tokens locked for 14 days?",
    "Direct purchases enter a fixed 14-day lock so entry does not behave like instantly sellable open-market inventory. The lock changes post-buy behavior and is part of the protocol structure, not an optional setting.",
  ],
  [
    "What exactly happens with TRX after purchase?",
    "The protocol splits incoming TRX by rule: 90% goes into the liquidity path, 7% goes into the controller and ambassador reward layer, and 3% goes into the airdrop distribution layer. These flows are separated instead of mixed into one opaque balance.",
  ],
  [
    "Can liquidity be verified on-chain?",
    "Yes. The liquidity path is structured through FourteenLiquidityController, FourteenVault, LiquidityBootstrapper, and executor contracts. That means the logic is not just described on the website - it exists as a public on-chain flow.",
  ],
  [
    "What happens after unlock?",
    "After the 14-day lock period ends, the purchased tokens are no longer locked by that entry rule. Unlock means the lock condition ends; it does not guarantee any specific market outcome or exit price.",
  ],
  [
    "Can I sell before unlock?",
    "No. A direct purchase enters the fixed lock cycle first. The unlock condition has to complete before those purchased tokens move out of that lock state.",
  ],
  [
    "Is 4TEEN audited?",
    "What is public today is the contract structure, repositories, and verification surface. The strongest current path is to inspect the contracts, repos, docs, and live routes directly rather than assume an external audit exists unless one is explicitly published.",
  ],
  [
    "What wallet do I need?",
    "For the smoothest mobile flow, use a supported TRON-compatible wallet browser that works well with the 4TEEN interface. The best experience is with the wallets that correctly display balances inside the product flow.",
  ],
  [
    "Does the protocol guarantee profit?",
    "No. 4TEEN is a structured on-chain token protocol, not a guaranteed-return product. Direct pricing, lock mechanics, liquidity release, and market price are all part of the system, but none of that guarantees profit or exit conditions.",
  ],
];

const finalPaths = [
  ["Buy", "Buy Direct", "Enter through the protocol from the direct-buy surface.", "/buy"],
  [
    "Verify",
    "Verify Contracts",
    "Check the on-chain contracts, repos, and public documentation in one technical route.",
    "/verification",
  ],
  [
    "Track",
    "Explore Metrics",
    "Read prices, liquidity logic, reward ladders, and distribution status from dedicated protocol pages.",
    "/liquidity",
  ],
  [
    "Join",
    "Become an Ambassador",
    "Register, build your referral path, and grow into the reward ladder.",
    "/ambassadors",
  ],
];

export default function Home() {
  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--tight" id="home-hero">
        <div className="ft-container">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-grid ft-grid--hero-top">
              <div className="ft-card ft-card--plain ft-hero-info">
                <div className="ft-stack ft-stack--lg">
                  <div className="ft-cluster ft-cluster--sm ft-hero-topline">
                    <span className="ft-eyebrow">4TEEN Protocol</span>
                    <span className="ft-meta-green">
                      TRON / Mint-on-Purchase / 14-Day Lock
                    </span>
                  </div>

                  <div className="ft-stack ft-stack--md">
                    <h1 className="ft-title-xl ft-hero-title">
                      Enter 4TEEN <span className="ft-accent">Before</span> the
                      Market Does
                    </h1>

                    <p className="ft-lead ft-hero-lead">
                      Buy directly through the protocol, lock your entry for 14
                      days, and watch direct price logic, liquidity flow, and
                      market price move as separate forces.
                    </p>
                  </div>

                  <div className="ft-stack ft-stack--sm ft-hero-points">
                    {heroPoints.map((point) => (
                      <div key={point} className="ft-hero-point">
                        {point}
                      </div>
                    ))}
                  </div>

                  <div className="ft-hero-actions">
                    <Link className="ft-btn ft-btn--primary" href="/buy">
                      Buy 4TEEN
                    </Link>
                    <Link className="ft-btn ft-btn--secondary" href="/verification">
                      Verification
                    </Link>
                  </div>
                </div>
              </div>

              <aside className="ft-card ft-card--strong ft-hero-side-panel">
                <div className="ft-stack ft-stack--lg">
                  <div className="ft-stack ft-stack--xs">
                    <span className="ft-badge ft-badge--soft">Structured entry</span>
                    <h2 className="ft-subtitle">This is not just a market buy.</h2>
                  </div>

                  <div className="ft-stack ft-stack--sm">
                    {heroStats.map(([label, value]) => (
                      <div key={label} className="ft-hero-stat-row">
                        <span className="ft-hero-stat-label">{label}</span>
                        <span className="ft-hero-stat-value">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ft-highlight ft-hero-highlight">
                    <strong>Structured on-chain entry.</strong>
                    <br />
                    Not hype. Not instant unlock. Not blind market chasing.
                  </div>
                </div>
              </aside>
            </div>

            <div className="ft-price-strip ft-price-strip--hero">
              <article className="ft-price-card">
                <div className="ft-price-label">Direct Price</div>
                <div className="ft-price-main">Syncing</div>
                <div className="ft-price-sub">Protocol quote wiring is next</div>
              </article>

              <article className="ft-price-card">
                <div className="ft-price-label">DEX Price</div>
                <div className="ft-price-main">Syncing</div>
                <div className="ft-price-sub">DEX quote wiring is next</div>
              </article>

              <article className="ft-price-card">
                <div className="ft-price-label">Unlock Cycle</div>
                <div className="ft-price-main">14 Days</div>
                <div className="ft-price-sub">Direct purchase lock period</div>
              </article>
            </div>

            <div className="ft-hero-tools">
              {heroQuickTools.map((tool) => (
                <a key={tool.title} className="ft-hero-tool" href={tool.href}>
                  <span className="ft-hero-tool__title">{tool.title}</span>
                  <span className="ft-hero-tool__meta">{tool.meta}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="wallet-compatibility">
        <div className="ft-container">
          <div className="ft-card ft-card--plain">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-stack ft-stack--sm">
                <div className="ft-cluster ft-cluster--sm">
                  <span className="ft-eyebrow">Wallet Support</span>
                </div>

                <h2 className="ft-title-md">
                  Supported mobile wallet browsers can open the 4TEEN DeFi flow.
                </h2>
                <p className="ft-text">
                  For the best experience, use wallets that also correctly
                  display balances inside the 4TEEN interface.
                </p>
              </div>

              <div className="ft-grid ft-grid--2-even">
                <div className="ft-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-cluster ft-cluster--sm">
                      <span className="ft-status-pill live">
                        Best mobile experience
                      </span>
                    </div>

                    <div className="ft-wallet-list">
                      {walletBest.map(([name, note]) => (
                        <div key={name} className="ft-wallet-row">
                          <span className="ft-wallet-name">{name}</span>
                          <span className="ft-wallet-note">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ft-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-cluster ft-cluster--sm">
                      <span className="ft-status-pill wait">
                        Works in mobile browser
                      </span>
                    </div>

                    <div className="ft-wallet-list">
                      {walletWorks.map(([name, note]) => (
                        <div key={name} className="ft-wallet-row">
                          <span className="ft-wallet-name">{name}</span>
                          <span className="ft-wallet-note">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ft-highlight">
                <strong>Recommended for mobile direct buy:</strong>
                <br />
                Binance Wallet, Bitget Wallet, OKX Wallet, and TokenPocket give
                the smoothest experience because they correctly display balances
                inside the 4TEEN interface.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="trust-strip">
        <div className="ft-container">
          <div className="ft-card ft-card--plain ft-trust-strip">
            <span className="ft-eyebrow">Verify the Protocol</span>

            <div className="ft-trust-strip__inner">
              <div className="ft-trust-strip__intro">
                <h2 className="ft-subtitle">
                  Verify the mechanics where they actually live.
                </h2>
              </div>

              <div className="ft-trust-strip__links">
                {trustLinks.map(([label, value, href]) => (
                  <a
                    key={value}
                    className="ft-trust-link"
                    href={href}
                    rel="noreferrer"
                    target={href.startsWith("http") ? "_blank" : undefined}
                  >
                    <span className="ft-trust-link__label">{label}</span>
                    <span className="ft-trust-link__value">{value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="how-it-works">
        <div className="ft-container">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">How It Works</span>
              </div>

              <h2 className="ft-title-md">
                A 4TEEN buy does more than a normal market entry.
              </h2>
              <p className="ft-text">
                When users enter through the protocol, the flow does not stop at
                purchase. The system mints tokens, applies a fixed lock, routes
                incoming TRX by contract rules, and releases liquidity on a
                daily schedule.
              </p>
            </div>

            <div className="ft-grid ft-grid--2-even ft-how-grid">
              {howSteps.map((item) => (
                <article
                  key={item.step}
                  className={`ft-card ft-how-card ${item.full ? "ft-how-card--full" : ""}`}
                >
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-step-num">{item.step}</div>
                    <div className="ft-stack ft-stack--xs">
                      <h3 className="ft-subtitle">{item.title}</h3>
                      <p className="ft-text">{item.text}</p>

                      {item.split ? (
                        <div className="ft-how-split">
                          {item.split.map(([value, label]) => (
                            <div key={label} className="ft-how-split__item">
                              <span className="ft-how-split__value">{value}</span>
                              <span className="ft-how-split__label">{label}</span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="architecture-diagram">
        <div className="ft-container">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">Architecture Diagram</span>
              </div>

              <h2 className="ft-title-md">
                How the 4TEEN protocol moves value on-chain.
              </h2>
              <p className="ft-text">
                A direct buy does not stop at token issuance. The protocol
                splits value into separate operational paths for liquidity,
                ambassador rewards, and staged community distribution.
              </p>
            </div>

            <div className="ft-card ft-card--plain ft-arch-seq">
              <div className="ft-stack ft-stack--lg">
                <div className="ft-arch-seq-head">
                  <div className="ft-arch-seq-node">
                    <span className="ft-arch-seq-node__label">Entry</span>
                    <strong className="ft-arch-seq-node__title">User TRX</strong>
                    <span className="ft-arch-seq-node__text">
                      Direct protocol buy enters the system
                    </span>
                  </div>

                  <div className="ft-arch-seq-line" aria-hidden="true"></div>

                  <div className="ft-arch-seq-node ft-arch-seq-node--accent">
                    <span className="ft-arch-seq-node__label">Core Contract</span>
                    <strong className="ft-arch-seq-node__title">
                      FourteenToken
                    </strong>
                    <span className="ft-arch-seq-node__text">
                      Mint on purchase, 14-day lock, and automatic TRX split
                    </span>
                  </div>
                </div>

                <div className="ft-arch-core-note">
                  <div className="ft-arch-core-note__item">Mint on purchase</div>
                  <div className="ft-arch-core-note__item">14-day lock</div>
                  <div className="ft-arch-core-note__item">TRX split: 90 / 7 / 3</div>
                </div>

                <div className="ft-stack ft-stack--md">
                  <article className="ft-card ft-arch-path ft-arch-path--primary">
                    <div className="ft-stack ft-stack--md">
                      <div className="ft-stack ft-stack--xs">
                        <p className="ft-overline">90% TRX Path</p>
                        <h3 className="ft-subtitle">Liquidity Execution Layer</h3>
                        <p className="ft-text">
                          The largest share moves into a dedicated liquidity
                          system. Release timing, reserve storage, bootstrap
                          preparation, and DEX execution are isolated into
                          separate roles.
                        </p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector"></div>
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Controller</span>
                          <strong className="ft-arch-mini-box__title">
                            FourteenLiquidityController
                          </strong>
                          <span className="ft-arch-mini-box__text">
                            Releases 6.43% once per UTC day and controls when
                            liquidity can move.
                          </span>
                        </div>
                        <div className="ft-arch-connector"></div>
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Reserve Vault</span>
                          <strong className="ft-arch-mini-box__title">
                            FourteenVault
                          </strong>
                          <span className="ft-arch-mini-box__text">
                            Stores the 4TEEN reserve used specifically for
                            liquidity provisioning.
                          </span>
                        </div>
                        <div className="ft-arch-connector"></div>
                        <div className="ft-arch-mini-box ft-arch-mini-box--accent">
                          <span className="ft-arch-mini-box__label">
                            Preparation Layer
                          </span>
                          <strong className="ft-arch-mini-box__title">
                            LiquidityBootstrapper
                          </strong>
                          <span className="ft-arch-mini-box__text">
                            Calculates required token amounts, pulls from
                            FourteenVault, supplies executors, and triggers the
                            execution flow.
                          </span>
                        </div>
                        <div className="ft-arch-connector"></div>
                        <div className="ft-arch-executor-grid">
                          <div className="ft-arch-mini-box">
                            <span className="ft-arch-mini-box__label">50%</span>
                            <strong className="ft-arch-mini-box__title">
                              LiquidityExecutorJustMoney
                            </strong>
                            <span className="ft-arch-mini-box__text">
                              DEX-specific execution path for JustMoney.
                            </span>
                          </div>
                          <div className="ft-arch-mini-box">
                            <span className="ft-arch-mini-box__label">50%</span>
                            <strong className="ft-arch-mini-box__title">
                              LiquidityExecutorSunV3
                            </strong>
                            <span className="ft-arch-mini-box__text">
                              DEX-specific execution path for Sun.io V3.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="ft-card ft-arch-path">
                    <div className="ft-stack ft-stack--md">
                      <div className="ft-stack ft-stack--xs">
                        <p className="ft-overline">7% TRX Path</p>
                        <h3 className="ft-subtitle">
                          Control and Ambassador Reward Layer
                        </h3>
                        <p className="ft-text">
                          This path stays outside token issuance and liquidity
                          execution. It combines protocol control with referral
                          attribution, verified purchase allocation, level
                          progression, and claimable ambassador rewards.
                        </p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector"></div>
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Controller</span>
                          <strong className="ft-arch-mini-box__title">
                            FourteenController
                          </strong>
                          <span className="ft-arch-mini-box__text">
                            Owns FourteenToken, manages privileged owner
                            functions, operator logic, reward accounting,
                            purchase allocation, and controlled withdrawals.
                          </span>
                        </div>
                        <div className="ft-arch-connector"></div>
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">
                            Ambassador Flow
                          </span>
                          <strong className="ft-arch-mini-box__title">
                            Registration to Reward
                          </strong>
                          <span className="ft-arch-mini-box__text">
                            Wallet registration, public slug identity,
                            buyer-to-ambassador binding, verified purchase
                            recording, claimable reward accrual, and reward
                            withdrawal.
                          </span>
                        </div>

                        <div className="ft-arch-reward-ladder">
                          <div className="ft-arch-reward-ladder__head">
                            Ambassador Reward Ladder
                          </div>
                          {rewardLadder.map(([level, buyers, percent]) => (
                            <div key={level} className="ft-arch-reward-ladder__row">
                              <span className="ft-arch-reward-ladder__level">
                                {level}
                              </span>
                              <span className="ft-arch-reward-ladder__buyers">
                                {buyers}
                              </span>
                              <span className="ft-arch-reward-ladder__percent">
                                {percent}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="ft-note">
                          <strong>Allocation logic:</strong> ambassador reward is
                          calculated from the purchase owner share during verified
                          purchase allocation. Level override is supported, and
                          rewards move into claimable balance before withdrawal.
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="ft-card ft-arch-path">
                    <div className="ft-stack ft-stack--md">
                      <div className="ft-stack ft-stack--xs">
                        <p className="ft-overline">3% TRX Path</p>
                        <h3 className="ft-subtitle">Community Distribution Layer</h3>
                        <p className="ft-text">
                          This path feeds the live airdrop structure.
                          Distribution is staged by waves and expanded across
                          multiple social routes instead of being treated like a
                          one-off giveaway.
                        </p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector"></div>
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Vault</span>
                          <strong className="ft-arch-mini-box__title">
                            AirdropVault
                          </strong>
                          <span className="ft-arch-mini-box__text">
                            Community and growth reserve used for staged ecosystem
                            distribution, wallet-linked reward flows, and live
                            campaign routes.
                          </span>
                        </div>
                        <div className="ft-arch-connector"></div>
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">
                            Distribution Model
                          </span>
                          <strong className="ft-arch-mini-box__title">
                            1,500,000 4TEEN / 6 Fixed Waves
                          </strong>
                          <span className="ft-arch-mini-box__text">
                            Wave-based release structure with one live route
                            today and more campaign routes added over time.
                          </span>
                        </div>

                        <div className="ft-arch-wave-pills">
                          <span className="ft-status-pill live">Telegram Live</span>
                          <span className="ft-status-pill wait">X Next</span>
                          <span className="ft-status-pill wait">Instagram Next</span>
                          <span className="ft-status-pill wait">More Socials Ahead</span>
                        </div>

                        <div className="ft-arch-mini-box ft-arch-mini-box--accent">
                          <span className="ft-arch-mini-box__label">
                            Current Live Route
                          </span>
                          <strong className="ft-arch-mini-box__title">
                            Telegram Campaign
                          </strong>
                          <span className="ft-arch-mini-box__text">
                            Current public route inside the live airdrop
                            infrastructure.
                          </span>
                        </div>

                        <div className="ft-arch-snapshot">
                          <div className="ft-arch-snapshot__head">
                            Live Airdrop Snapshot
                          </div>
                          {[
                            ["Status", "Live Now"],
                            ["Reward Range", "1-5 4TEEN"],
                            ["Verification", "Required"],
                            ["Wallet Needed", "TRON Wallet"],
                            ["Reward Delivery", "On-Chain"],
                            ["Claim Type", "platformBit = 4"],
                          ].map(([label, value]) => (
                            <div key={label} className="ft-arch-snapshot__row">
                              <span className="ft-arch-snapshot__label">{label}</span>
                              <span className="ft-arch-snapshot__value">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="ft-arch-facts">
                  {architectureFacts.map(([label, text]) => (
                    <div key={label} className="ft-arch-fact">
                      <span className="ft-arch-fact__label">{label}</span>
                      <span className="ft-arch-fact__text">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="why-structure-matters">
        <div className="ft-container">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">Why This Structure Matters</span>
              </div>

              <h2 className="ft-title-md">
                4TEEN is built to make behavior more structured, visible, and
                verifiable.
              </h2>
              <p className="ft-text">
                The protocol does not treat entry, liquidity, rewards, and
                distribution as one mixed balance. Each layer has a role, and
                that changes how users read the system.
              </p>
            </div>

            <div className="ft-grid ft-grid--3 ft-why-grid">
              {whyCards.map((card) => (
                <article key={card.id} className="ft-card ft-why-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-why-icon">{card.id}</div>
                    <div className="ft-stack ft-stack--xs">
                      <h3 className="ft-subtitle">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </div>
                    <div className="ft-highlight ft-why-highlight">
                      <strong>Why it matters:</strong>
                      <br />
                      {card.why}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="live-protocol-metrics">
        <div className="ft-container">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">Live Protocol Metrics</span>
              </div>

              <h2 className="ft-title-md">
                A live read of entry, liquidity, rewards, and distribution.
              </h2>
              <p className="ft-text">
                This section is not about theory. It shows the key numbers and
                operating rules that shape how 4TEEN behaves right now.
              </p>
            </div>

            <div className="ft-grid ft-grid--4 ft-metrics-top">
              {liveMetricCards.map((card) => (
                <article key={card.label} className="ft-price-card">
                  <div className="ft-price-label">{card.label}</div>
                  <div className="ft-price-main">{card.main}</div>
                  <div className="ft-price-sub">{card.sub}</div>
                </article>
              ))}
            </div>

            <div className="ft-grid ft-grid--3 ft-metrics-grid">
              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">Liquidity Engine</p>
                    <h3 className="ft-subtitle">Rule-Based Liquidity Flow</h3>
                  </div>

                  <table className="ft-mini-table">
                    <tbody>
                      {[
                        ["Controller", "FourteenLiquidityController"],
                        ["Reserve Vault", "FourteenVault"],
                        ["Preparation Layer", "LiquidityBootstrapper"],
                        ["Execution Split", "50% / 50%"],
                        ["DEX Paths", "JustMoney + Sun.io V3"],
                      ].map(([label, value]) => (
                        <tr key={label}>
                          <th>{label}</th>
                          <td className="ft-right">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="ft-note">
                    Daily release is controlled, token reserve is separate, and
                    execution is split by DEX path instead of merged into one
                    opaque action.
                  </div>
                </div>
              </article>

              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">Ambassador Layer</p>
                    <h3 className="ft-subtitle">Live Reward Ladder</h3>
                  </div>

                  <div className="ft-metric-ladder">
                    {rewardLadder.map(([level, buyers, percent]) => (
                      <div key={level} className="ft-metric-ladder__row">
                        <span className="ft-metric-ladder__level">{level}</span>
                        <span className="ft-metric-ladder__meta">{buyers}</span>
                        <span className="ft-metric-ladder__value">{percent}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ft-note">
                    Registration, referral capture, verified purchase
                    attribution, reward percent, and claimable withdrawals are
                    all handled in the controller-side ambassador flow.
                  </div>
                </div>
              </article>

              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">Airdrop Layer</p>
                    <h3 className="ft-subtitle">Live Distribution Snapshot</h3>
                  </div>

                  <table className="ft-mini-table">
                    <tbody>
                      <tr>
                        <th>Total Allocation</th>
                        <td className="ft-right">
                          <strong>1,500,000 4TEEN</strong>
                        </td>
                      </tr>
                      <tr>
                        <th>Wave Structure</th>
                        <td className="ft-right">6 Fixed Waves</td>
                      </tr>
                      <tr>
                        <th>Current Live Route</th>
                        <td className="ft-right">
                          <span className="ft-status-pill live">Telegram</span>
                        </td>
                      </tr>
                      <tr>
                        <th>Next Routes</th>
                        <td className="ft-right">
                          <span className="ft-status-pill wait">
                            More Socials Ahead
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>Reward Delivery</th>
                        <td className="ft-right">On-Chain</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="ft-actions ft-actions--stack-mobile">
                    <Link className="ft-btn ft-btn--secondary" href="/airdrop">
                      Open Distribution Layer
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="tools">
        <div className="ft-container">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">Tools</span>
              </div>

              <h2 className="ft-title-md">
                Use the protocol, track the flow, and access the ecosystem
                tools.
              </h2>
              <p className="ft-text">
                4TEEN is not just a token page. It already has live logic for
                entry, liquidity tracking, unlock visibility, distribution, and
                ambassador operations, and this new site is the shared entry
                layer for those routes.
              </p>
            </div>

            <div className="ft-grid ft-grid--4 ft-tools-grid">
              {tools.map((tool) => (
                <a key={tool.title} className="ft-tool-card" href={tool.href}>
                  <span className={`ft-tool-card__status ft-status-pill ${tool.tone}`}>
                    {tool.status}
                  </span>
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">{tool.title}</h3>
                    <p className="ft-text">{tool.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="verification-contracts">
        <div className="ft-container">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">Verification / Contracts</span>
              </div>

              <h2 className="ft-title-md">
                Verify the protocol across contracts, repos, docs, and public
                hubs.
              </h2>
              <p className="ft-text">
                The 4TEEN system is split into public layers. Core contracts are
                deployed on TRON mainnet, infra repos are open, and the reading
                layer stays separate from the live hubs.
              </p>
            </div>

            <div className="ft-grid ft-grid--2-even ft-verify-main-grid">
              <article className="ft-card ft-verify-card ft-verify-card--contracts">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">On-Chain Contracts</p>
                    <h3 className="ft-subtitle">Mainnet deployment layer</h3>
                  </div>

                  <div className="ft-verify-list">
                    {contractLinks.map(([label, value, href]) => (
                      <a
                        key={value}
                        className="ft-verify-link"
                        href={href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span className="ft-verify-link__label">{label}</span>
                        <span className="ft-verify-link__value">{value}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>

              <article className="ft-card ft-verify-card">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">Repositories</p>
                    <h3 className="ft-subtitle">Public infra and operating code</h3>
                  </div>

                  <div className="ft-verify-list">
                    {repoLinks.map(([label, value, href]) => (
                      <a
                        key={value}
                        className="ft-verify-link"
                        href={href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span className="ft-verify-link__label">{label}</span>
                        <span className="ft-verify-link__value">{value}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            <div className="ft-grid ft-grid--2-even ft-verify-secondary-grid">
              <article className="ft-card ft-verify-card">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">Docs</p>
                    <h3 className="ft-subtitle">Public reading layer</h3>
                  </div>

                  <div className="ft-verify-list">
                    {docsLinks.map(([label, value, href]) => (
                      <a key={value} className="ft-verify-link" href={href}>
                        <span className="ft-verify-link__label">{label}</span>
                        <span className="ft-verify-link__value">{value}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>

              <article className="ft-card ft-verify-card">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">Hubs</p>
                    <h3 className="ft-subtitle">Public ecosystem entry points</h3>
                  </div>

                  <div className="ft-verify-list">
                    {hubLinks.map(([label, value, href]) => (
                      <a key={value} className="ft-verify-link" href={href}>
                        <span className="ft-verify-link__label">{label}</span>
                        <span className="ft-verify-link__value">{value}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="faq">
        <div className="ft-container">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">FAQ</span>
              </div>

              <h2 className="ft-title-md">
                Clear answers before you enter the protocol.
              </h2>
              <p className="ft-text">
                4TEEN is easier to understand when the mechanics are stated
                directly. This section answers the questions that usually create
                hesitation before buying, verifying, or joining the ecosystem.
              </p>
            </div>

            <div className="ft-faq-list">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="ft-faq-item" open={index === 0}>
                  <summary className="ft-faq-question">{question}</summary>
                  <div className="ft-faq-answer">
                    <p className="ft-text">{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="risk-disclosure">
        <div className="ft-container">
          <div className="ft-card ft-card--plain ft-risk-card">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-stack ft-stack--sm">
                <div className="ft-cluster ft-cluster--sm">
                  <span className="ft-eyebrow">Risk / Disclosure</span>
                </div>

                <h2 className="ft-title-md">
                  Structured mechanics do not remove market risk.
                </h2>
                <p className="ft-text">
                  4TEEN is an on-chain token protocol with visible rules,
                  separated contract roles, and public verification paths. That
                  makes the system easier to inspect, but it does not turn token
                  participation into a guaranteed-return product.
                </p>
              </div>

              <div className="ft-grid ft-grid--2-even ft-risk-grid">
                <div className="ft-card ft-card--soft">
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">What users should understand</h3>
                    <ul className="ft-list">
                      <li>Direct protocol price is not the same as open-market DEX price.</li>
                      <li>A 14-day unlock changes timing, but does not guarantee a favorable exit.</li>
                      <li>Liquidity rules describe release behavior, not future market outcomes.</li>
                      <li>Ambassador rewards and airdrop routes are structured layers, not guaranteed income.</li>
                    </ul>
                  </div>
                </div>

                <div className="ft-card ft-card--soft">
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">What users should do</h3>
                    <ul className="ft-list">
                      <li>Verify contracts, repos, and public documentation before acting.</li>
                      <li>Understand the lock, reward, and distribution mechanics before buying.</li>
                      <li>Use supported wallets and check live routes carefully.</li>
                      <li>Make independent decisions instead of treating protocol structure as a profit promise.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ft-note">
                <strong>Important:</strong> 4TEEN is built around observable
                on-chain behavior, not guaranteed outcomes. Users should verify
                the system themselves and act only with risk they understand.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--tight" id="final-cta">
        <div className="ft-container">
          <div className="ft-card ft-card--strong ft-final-cta">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-stack ft-stack--sm ft-final-cta__head">
                <div className="ft-cluster ft-cluster--sm">
                  <span className="ft-eyebrow">Final CTA</span>
                </div>

                <h2 className="ft-title-lg">Choose Your Path Into 4TEEN</h2>
                <p className="ft-lead">
                  Buy direct, verify the mechanics, track the live protocol, or
                  enter through the ambassador and airdrop layers.
                </p>
              </div>

              <div className="ft-grid ft-grid--4 ft-final-cta__grid">
                {finalPaths.map(([status, title, text, href]) => (
                  <a key={title} className="ft-final-cta__card" href={href}>
                    <span className={`ft-status-pill ${status === "Track" ? "live" : "wait"}`}>
                      {status}
                    </span>
                    <div className="ft-stack ft-stack--sm">
                      <h3 className="ft-subtitle">{title}</h3>
                      <p className="ft-text">{text}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="ft-actions ft-actions--stack-mobile ft-final-cta__actions">
                <Link className="ft-btn ft-btn--primary" href="/buy">
                  Buy 4TEEN
                </Link>
                <Link className="ft-btn ft-btn--secondary" href="/verification">
                  Verify On-Chain
                </Link>
                <Link className="ft-btn ft-btn--ghost" href="/airdrop">
                  Open Airdrop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
