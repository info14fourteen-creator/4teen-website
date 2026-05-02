import type { ReactNode } from "react";
import { CopyLinkRow } from "@/components/home/copy-link-row";
import { HomePriceCards } from "@/components/home/home-price-cards";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import type { SupportedSiteLocale } from "@/lib/site-locale";

const heroTools = [
  {
    href: "/buy",
    title: "Direct Buy",
    meta: "Prepare the real mint-on-purchase flow before confirmation",
  },
  {
    href: "/unlock",
    title: "Unlock Timeline",
    meta: "Read direct-buy events by wallet, countdown, and unlock state",
  },
  {
    href: "/liquidity",
    title: "Liquidity Controller",
    meta: "See threshold, release cadence, executors, and controller history",
  },
  {
    href: "/verification",
    title: "Info Route",
    meta: "Open contracts, vaults, asset wallets, and runtime readiness",
  },
] as const;

const bestWallets = [
  ["Binance Wallet", "Works • Balance visible"],
  ["Bitget Wallet", "Works • Balance visible"],
  ["OKX Wallet", "Works • Balance visible"],
  ["TokenPocket", "Works • Balance visible"],
] as const;

const compatibleWallets = [
  ["FoxWallet", "Works • Balance not displayed"],
  ["imToken", "Works • Balance not displayed"],
  ["MetaMask", "Works • Balance not displayed"],
  ["TronLink", "Works • Balance not displayed"],
  ["WalletConnect", "Works • Balance not displayed"],
  ["Trust Wallet", "Use desktop Chrome extension"],
] as const;

const trustLinks = [
  { label: "App", value: "Mobile Download", href: "/app" },
  {
    label: "Website",
    value: "Live Surfaces",
    href: "/buy",
  },
  {
    label: "Network",
    value: "TRON Mainnet",
    href: "https://tronscan.org",
    external: true,
  },
  {
    label: "Repo",
    value: "Wallet App",
    href: "https://github.com/info14fourteen-creator/4teen-wallet-app",
    external: true,
  },
  { label: "Docs", value: "Whitepaper", href: "/whitepaper" },
  { label: "Info", value: "Verification", href: "/verification" },
] as const;

const howItWorks = [
  {
    step: "1",
    title: "Prepare the direct buy inside the app",
    text: "The buy screen is a preparation step first. The selected signing wallet enters TRX, sees estimated 4TEEN, and only then moves into the confirmation layer where the app builds the real transaction and checks resources.",
  },
  {
    step: "2",
    title: "Track every locked batch by purchase",
    text: "Unlock Timeline is not generic history. It reads direct-buy events for the selected wallet, shows UTC unlock time, live countdown, lock status, and the Tronscan transaction behind each purchase row.",
  },
  {
    step: "3",
    title: "Open the controller when you need liquidity truth",
    text: "Liquidity execution is a real surface in the app. It shows the 100 TRX threshold, 6.43% daily release rule, executor split, contract links, and recent controller-side history instead of hiding that logic in copy.",
  },
] as const;

const whyCards = [
  {
    number: "01",
    title: "One hub already exists in the wallet app",
    text: "The app home is already the compact product hub: buy, unlock, liquidity, airdrop, ambassadors, and info are grouped as surfaces, not buried in one long explanation.",
    note: "The website should point people into those same surfaces instead of describing an older imaginary roadmap.",
  },
  {
    number: "02",
    title: "Wallet-aware state is real behavior now",
    text: "Watch-only versus signing wallet, claimable versus pending rewards, Telegram session state, and resource readiness all change what the user can actually do in the app.",
    note: "That means the homepage text should describe states and actions, not only contract theory.",
  },
  {
    number: "03",
    title: "Verification is already a working route",
    text: "Architecture, contract roles, vaults, executors, asset-wallet balances, and allocation replay readiness are no longer only whitepaper topics. The app already exposes them as one compact info screen.",
    note: "The site is strongest when it describes that info layer as live product, not as future documentation.",
  },
] as const;

const tools = [
  ["Open", "Mobile App", "Open the dedicated mobile-app route with store download options and a clean fallback back into the web surfaces.", "/app"],
  ["Live", "Buy 4TEEN", "Open the direct-buy preparation screen with amount input, estimate, split context, and confirmation path.", "/buy"],
  ["Track", "Unlock Timeline", "Read direct-buy event rows by wallet, unlock timestamp, live countdown, and transaction source.", "/unlock"],
  ["Track", "Liquidity Controller", "Follow threshold, 6.43% daily release, executors, recent controller events, and execution readiness.", "/liquidity"],
  ["Live", "Airdrop Status", "See Telegram live-claim state, watch-only restrictions, bot session state, and on-chain reward state.", "/airdrop"],
  ["Manage", "Ambassador Cabinet", "Move from one-time registration into cabinet mode with slug, buyers, purchases, pending rows, and rewards.", "/ambassadors"],
  ["Verify", "Info Route", "Open the compact architecture screen for contracts, asset wallets, runtime health, and public proof links.", "/verification"],
] as const;

const contractLinks = [
  ["Core", "FourteenToken", "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A"],
  ["Core", "FourteenController", "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ"],
  ["Core", "FourteenLiquidityController", "https://tronscan.org/#/contract/TVKBLwg222skKnZ3F3boTiH35KC7nvYEuZ"],
  ["Vault", "FourteenVault", "https://tronscan.org/#/contract/TNwkuHA727RZGtpbowH7q5B1yZWk2JEZTq"],
  ["Vault", "TeamLockVault", "https://tronscan.org/#/contract/TYBfbgvMW6awPdZfSSwWoEX3nJjrKWZS3h"],
  ["Vault", "AirdropVault", "https://tronscan.org/#/contract/TV6eXKWCsZ15c3Svz39mRQWtBsqvNNBwpQ"],
  ["Execution", "LiquidityBootstrapper", "https://tronscan.org/#/contract/TWfUee6qFV91t7KbFdYLEfpi8nprUaJ7dc"],
  ["Execution", "LiquidityExecutorSunV3", "https://tronscan.org/#/contract/TU8EwEWg4K594zwThvhTZxqzEuEYuR46xh"],
  ["Execution", "LiquidityExecutorJustMoney", "https://tronscan.org/#/contract/TWrz68MRTf1m9vv8xpcdMD4z9kjBxiHw7F"],
] as const;

const repoLinks = [
  ["Repo", "4teen-smart-contracts", "https://github.com/info14fourteen-creator/4teen-smart-contracts"],
  ["Repo", "4teen-wallet-app", "https://github.com/info14fourteen-creator/4teen-wallet-app"],
  ["Repo", "4teen-ambassador-system", "https://github.com/info14fourteen-creator/4teen-ambassador-system"],
  ["Repo", "liquidity-bootstrapper-cron", "https://github.com/info14fourteen-creator/liquidity-bootstrapper-cron"],
  ["Repo", "4teen-telegram-airdrop-bot", "https://github.com/info14fourteen-creator/4teen-telegram-airdrop-bot"],
] as const;

const faqItems = [
  [
    "Why does 4TEEN need a direct-buy screen instead of only a swap?",
    "Because the app treats direct buy as a separate contract-side surface. It prepares a mint-on-purchase flow, shows the estimate, explains the 14-day lock, and then moves to the real confirmation step.",
  ],
  [
    "What exactly does Unlock Timeline track?",
    "Only direct-buy events tied to the selected wallet. Each row shows the amount, UTC unlock time, live countdown, current lock state, and the Tronscan transaction behind that purchase event.",
  ],
  [
    "Why do some routes care whether the wallet is watch-only?",
    "Because the app now enforces behavior by wallet type. Watch-only wallets can read state, but cannot register as ambassadors, withdraw rewards, or execute signing flows like direct buy or liquidity actions.",
  ],
  [
    "Is the airdrop page just a promo page now?",
    "No. It is already a stateful screen. Telegram is the live route, and the card combines local wallet state, current bot session state, and on-chain claim state before deciding what action is available next.",
  ],
  [
    "What does the info route verify that the website alone cannot?",
    "It brings contracts, vaults, liquidity executors, asset-wallet balances, and operator-side readiness into one compact operational screen. That makes verification part of the product flow, not only a docs page.",
  ],
] as const;

function SmartLink({
  href,
  className,
  children,
  external = false,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <LoaderLink className={className} href={href}>
      {children}
    </LoaderLink>
  );
}

export function HomePage({ locale: _locale }: { locale: SupportedSiteLocale }) {
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
                    <span className="ft-eyebrow">4TEEN Mobile App</span>
                    <span className="ft-meta-green">TRON • Direct Buy • Unlock • Liquidity • Growth</span>
                  </div>

                  <div className="ft-stack ft-stack--md">
                    <h1 className="ft-title-xl ft-hero-title">
                      One place for <span className="ft-accent">buy</span>, lock visibility, and liquidity flow.
                    </h1>

                    <p className="ft-lead ft-hero-lead">
                      The wallet app is already the operating layer of the system. Direct buy, unlock timeline, liquidity controller,
                      Telegram claim state, ambassador cabinet, and the compact info route already exist as real screens with real state instead of promises in copy.
                    </p>
                  </div>

                  <div className="ft-stack ft-stack--sm ft-hero-points" aria-label="Protocol highlights">
                    <div className="ft-hero-point">Prepare the real direct-buy flow with estimate, split context, and confirmation before signing.</div>
                    <div className="ft-hero-point">Track each locked purchase event by countdown, unlock state, and source transaction.</div>
                    <div className="ft-hero-point">Use one info route for contracts, asset wallets, executors, and runtime readiness.</div>
                  </div>

                  <div className="ft-hero-actions">
                    <LoaderLink className="ft-btn ft-btn--primary" href="/app">Get App</LoaderLink>
                    <LoaderLink className="ft-btn ft-btn--secondary" href="/buy">Open Direct Buy</LoaderLink>
                  </div>
                </div>
              </div>

              <aside className="ft-card ft-card--strong ft-hero-side-panel">
                <div className="ft-stack ft-stack--lg">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">Wallet surfaces</p>
                    <h3 className="ft-subtitle">The app now carries the live product work.</h3>
                  </div>

                  <div className="ft-stack ft-stack--sm">
                    <div className="ft-hero-stat-row">
                      <span className="ft-hero-stat-label">Primary sale</span>
                      <span className="ft-hero-stat-value">Prepare → Confirm</span>
                    </div>
                    <div className="ft-hero-stat-row">
                      <span className="ft-hero-stat-label">Visibility</span>
                      <span className="ft-hero-stat-value">Unlock events</span>
                    </div>
                    <div className="ft-hero-stat-row">
                      <span className="ft-hero-stat-label">Execution</span>
                      <span className="ft-hero-stat-value">Controller state</span>
                    </div>
                    <div className="ft-hero-stat-row">
                      <span className="ft-hero-stat-label">Verification</span>
                      <span className="ft-hero-stat-value">Info route</span>
                    </div>
                  </div>

                  <div className="ft-highlight ft-hero-highlight">
                    <strong>Clean product hub.</strong>
                    <br />
                    Buy, lock visibility, controller truth, growth rails, and verification now connect through one wallet-style flow.
                  </div>
                </div>
              </aside>
            </div>

            <div className="ft-price-strip ft-price-strip--hero" aria-label="Live price summary">
              <HomePriceCards />
            </div>

            <div className="ft-hero-tools" aria-label="Quick links">
              {heroTools.map((tool) => (
                <LoaderLink key={tool.href} className="ft-hero-tool" href={tool.href}>
                  <span className="ft-hero-tool__title">{tool.title}</span>
                  <span className="ft-hero-tool__meta">{tool.meta}</span>
                </LoaderLink>
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
                <h2 className="ft-title-md">Wallet support matters because the app now reflects wallet state across live surfaces.</h2>
                <p className="ft-text">
                  Direct buy, unlock rows, cabinet actions, and Telegram claim state all change depending on whether the selected wallet can sign, whether it is watch-only, and whether balance and resource state resolve cleanly in the flow.
                </p>
              </div>

              <div className="ft-grid ft-grid--2-even">
                <div className="ft-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-cluster ft-cluster--sm">
                      <span className="ft-status-pill live">Best mobile experience</span>
                    </div>

                    <div className="ft-wallet-list">
                      {bestWallets.map(([name, note]) => (
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
                      <span className="ft-status-pill wait">Works in mobile browser</span>
                    </div>

                    <div className="ft-wallet-list">
                      {compatibleWallets.map(([name, note]) => (
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
                <strong>Recommended for app + buy flow:</strong>
                <br />
                Binance Wallet, Bitget Wallet, OKX Wallet, and TokenPocket give the smoothest experience because they
                correctly display balances and make the wallet-aware surfaces easier to trust.
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
                <h2 className="ft-subtitle">The wallet app, website surfaces, repos, and chain should all point to the same truth.</h2>
              </div>

              <div className="ft-trust-strip__links" aria-label="Verification links">
                {trustLinks.map((link) => (
                  <SmartLink
                    key={link.href}
                    className="ft-trust-link"
                    external={"external" in link && !!link.external}
                    href={link.href}
                  >
                    <span className="ft-trust-link__label">{link.label}</span>
                    <span className="ft-trust-link__value">{link.value}</span>
                  </SmartLink>
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
              <h2 className="ft-title-md">What the operating surfaces now cover.</h2>
              <p className="ft-text">
                The app is no longer just a shell around links. It already handles explanation, wallet-aware gating,
                confirmation flow, surface-specific history, controller state, reward routing, and social-claim state.
              </p>
            </div>

            <div className="ft-grid ft-grid--2-even ft-how-grid">
              {howItWorks.map((item) => (
                <article key={item.step} className="ft-card ft-how-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-step-num">{item.step}</div>
                    <div className="ft-stack ft-stack--xs">
                      <h3 className="ft-subtitle">{item.title}</h3>
                      <p className="ft-text">{item.text}</p>
                    </div>
                  </div>
                </article>
              ))}

              <article className="ft-card ft-how-card">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-step-num">4</div>
                  <div className="ft-stack ft-stack--xs">
                    <h3 className="ft-subtitle">Read social airdrop state as a real screen</h3>
                    <p className="ft-text">
                      The airdrop page combines three checks at once instead of pretending every social route is live.
                    </p>

                    <div className="ft-how-split">
                      <div className="ft-how-split__item">
                        <span className="ft-how-split__value">Wallet</span>
                        <span className="ft-how-split__label">Signing or watch-only state changes whether the claim flow can continue</span>
                      </div>
                      <div className="ft-how-split__item">
                        <span className="ft-how-split__value">Session</span>
                        <span className="ft-how-split__label">Telegram bot session decides whether the card is available, verify-now, or session-live</span>
                      </div>
                      <div className="ft-how-split__item">
                        <span className="ft-how-split__value">Chain</span>
                        <span className="ft-how-split__label">On-chain claim state can already show received, queued, or legacy-used</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <article className="ft-card ft-how-card ft-how-card--full">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-step-num">5</div>
                  <div className="ft-stack ft-stack--xs">
                    <h3 className="ft-subtitle">Use one cabinet for registration, buyers, purchases, pending rows, and rewards</h3>
                    <p className="ft-text">
                      Ambassador flow is no longer a dead-end sign-up page. The same route starts with one-time slug registration and then becomes a working cabinet where referral identity,
                      tracked purchases, claimable rewards, claimed totals, and pending allocation replay are visible together.
                    </p>
                  </div>
                </div>
              </article>
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
              <h2 className="ft-title-md">How the info route explains the system on-chain.</h2>
              <p className="ft-text">
                The compact info route in the app now ties contracts, routing, vaults, executors, asset wallets, and runtime checks together.
                The website can still show the map, but it should reflect that this architecture already has a working product screen behind it.
              </p>
            </div>

            <div className="ft-card ft-card--plain ft-arch-seq">
              <div className="ft-stack ft-stack--lg">
                <div className="ft-arch-seq-head">
                  <div className="ft-arch-seq-node">
                    <span className="ft-arch-seq-node__label">Entry</span>
                    <strong className="ft-arch-seq-node__title">User TRX</strong>
                    <span className="ft-arch-seq-node__text">Direct protocol buy enters the system</span>
                  </div>

                  <div className="ft-arch-seq-line" aria-hidden="true" />

                  <div className="ft-arch-seq-node ft-arch-seq-node--accent">
                    <span className="ft-arch-seq-node__label">Core Contract</span>
                    <strong className="ft-arch-seq-node__title">FourteenToken</strong>
                    <span className="ft-arch-seq-node__text">Mint on purchase + 14-day lock + automatic TRX split</span>
                  </div>
                </div>

                <div className="ft-arch-core-note">
                  <div className="ft-arch-core-note__item">Mint on purchase</div>
                  <div className="ft-arch-core-note__item">14-day lock</div>
                  <div className="ft-arch-core-note__item">TRX split: 90% / 7% / 3%</div>
                </div>

                <div className="ft-stack ft-stack--md">
                  <article className="ft-card ft-arch-path ft-arch-path--primary">
                    <div className="ft-stack ft-stack--md">
                      <div className="ft-stack ft-stack--xs">
                        <p className="ft-overline">90% TRX Path</p>
                        <h3 className="ft-subtitle">Liquidity Execution Layer</h3>
                        <p className="ft-text">
                          The largest share moves into a dedicated liquidity system. Release timing, reserve storage,
                          bootstrap preparation, and DEX execution are isolated into separate roles.
                        </p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Controller</span>
                          <strong className="ft-arch-mini-box__title">FourteenLiquidityController</strong>
                          <span className="ft-arch-mini-box__text">Releases 6.43% once per UTC day and controls when liquidity can move</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Reserve Vault</span>
                          <strong className="ft-arch-mini-box__title">FourteenVault</strong>
                          <span className="ft-arch-mini-box__text">Stores the 4TEEN reserve used specifically for liquidity provisioning</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box ft-arch-mini-box--accent">
                          <span className="ft-arch-mini-box__label">Preparation Layer</span>
                          <strong className="ft-arch-mini-box__title">LiquidityBootstrapper</strong>
                          <span className="ft-arch-mini-box__text">Calculates required token amounts, pulls from FourteenVault, supplies executors, and triggers execution flow</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-executor-grid">
                          <div className="ft-arch-mini-box">
                            <span className="ft-arch-mini-box__label">50%</span>
                            <strong className="ft-arch-mini-box__title">LiquidityExecutorJustMoney</strong>
                            <span className="ft-arch-mini-box__text">DEX-specific execution path for JustMoney</span>
                          </div>
                          <div className="ft-arch-mini-box">
                            <span className="ft-arch-mini-box__label">50%</span>
                            <strong className="ft-arch-mini-box__title">LiquidityExecutorSunV3</strong>
                            <span className="ft-arch-mini-box__text">DEX-specific execution path for Sun.io V3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="ft-card ft-arch-path">
                    <div className="ft-stack ft-stack--md">
                      <div className="ft-stack ft-stack--xs">
                        <p className="ft-overline">7% TRX Path</p>
                        <h3 className="ft-subtitle">Control + Ambassador Reward Layer</h3>
                        <p className="ft-text">
                          This path stays outside token issuance and liquidity execution. It combines protocol control with referral attribution,
                          verified purchase allocation, level progression, and claimable ambassador rewards.
                        </p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Controller</span>
                          <strong className="ft-arch-mini-box__title">FourteenController</strong>
                          <span className="ft-arch-mini-box__text">Owns FourteenToken, manages owner functions, operator logic, reward accounting, purchase allocation, and controlled withdrawals.</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Ambassador Flow</span>
                          <strong className="ft-arch-mini-box__title">Registration → Binding → Verified Purchase → Reward</strong>
                          <span className="ft-arch-mini-box__text">Wallet registration, public slug identity, buyer binding, verified purchase recording, claimable reward accrual, and reward withdrawal.</span>
                        </div>

                        <div className="ft-arch-reward-ladder">
                          <div className="ft-arch-reward-ladder__head">Ambassador Reward Ladder</div>
                          <div className="ft-arch-reward-ladder__row">
                            <span className="ft-arch-reward-ladder__level">Bronze</span>
                            <span className="ft-arch-reward-ladder__buyers">0–9 buyers</span>
                            <span className="ft-arch-reward-ladder__percent">10%</span>
                          </div>
                          <div className="ft-arch-reward-ladder__row">
                            <span className="ft-arch-reward-ladder__level">Silver</span>
                            <span className="ft-arch-reward-ladder__buyers">10–99 buyers</span>
                            <span className="ft-arch-reward-ladder__percent">25%</span>
                          </div>
                          <div className="ft-arch-reward-ladder__row">
                            <span className="ft-arch-reward-ladder__level">Gold</span>
                            <span className="ft-arch-reward-ladder__buyers">100–999 buyers</span>
                            <span className="ft-arch-reward-ladder__percent">50%</span>
                          </div>
                          <div className="ft-arch-reward-ladder__row">
                            <span className="ft-arch-reward-ladder__level">Platinum</span>
                            <span className="ft-arch-reward-ladder__buyers">1000+ buyers</span>
                            <span className="ft-arch-reward-ladder__percent">75%</span>
                          </div>
                        </div>

                        <div className="ft-note">
                          <strong>Allocation logic:</strong> ambassador reward is calculated from the purchase owner share during verified purchase allocation.
                          Level override is supported, and rewards move into claimable balance before withdrawal.
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
                          This path feeds the live airdrop structure. Distribution is staged by waves and expanded across multiple social routes instead of being treated like a one-off giveaway.
                        </p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Vault</span>
                          <strong className="ft-arch-mini-box__title">AirdropVault</strong>
                          <span className="ft-arch-mini-box__text">Community and growth reserve used for staged ecosystem distribution, wallet-linked reward flows, and live campaign routes</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">Distribution Model</span>
                          <strong className="ft-arch-mini-box__title">1,500,000 4TEEN • 6 Fixed Waves</strong>
                          <span className="ft-arch-mini-box__text">Wave-based release structure with one live route today and more campaign routes added over time</span>
                        </div>
                        <div className="ft-arch-wave-pills">
                          <span className="ft-status-pill live">Telegram Live</span>
                          <span className="ft-status-pill wait">X Soon</span>
                          <span className="ft-status-pill wait">Instagram Soon</span>
                          <span className="ft-status-pill wait">More Socials Ahead</span>
                        </div>
                        <div className="ft-arch-mini-box ft-arch-mini-box--accent">
                          <span className="ft-arch-mini-box__label">Current Live Route</span>
                          <strong className="ft-arch-mini-box__title">Telegram Campaign</strong>
                          <span className="ft-arch-mini-box__text">Current public route inside the live airdrop infrastructure</span>
                          <LoaderLink className="ft-link" href="/airdrop">Open current live route</LoaderLink>
                        </div>
                        <div className="ft-arch-snapshot">
                          <div className="ft-arch-snapshot__head">Live Airdrop Snapshot</div>
                          <div className="ft-arch-snapshot__row"><span className="ft-arch-snapshot__label">Status</span><span className="ft-arch-snapshot__value">Live Now</span></div>
                          <div className="ft-arch-snapshot__row"><span className="ft-arch-snapshot__label">Reward Range</span><span className="ft-arch-snapshot__value">1–5 4TEEN</span></div>
                          <div className="ft-arch-snapshot__row"><span className="ft-arch-snapshot__label">Verification</span><span className="ft-arch-snapshot__value">Required</span></div>
                          <div className="ft-arch-snapshot__row"><span className="ft-arch-snapshot__label">Wallet Needed</span><span className="ft-arch-snapshot__value">TRON Wallet</span></div>
                          <div className="ft-arch-snapshot__row"><span className="ft-arch-snapshot__label">Reward Delivery</span><span className="ft-arch-snapshot__value">On-Chain</span></div>
                          <div className="ft-arch-snapshot__row"><span className="ft-arch-snapshot__label">Claim Type</span><span className="ft-arch-snapshot__value">platformBit = 4</span></div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="ft-arch-facts">
                  <div className="ft-arch-fact"><span className="ft-arch-fact__label">Liquidity</span><span className="ft-arch-fact__text">Release timing, reserve storage, bootstrap prep, and DEX execution are isolated into dedicated contracts.</span></div>
                  <div className="ft-arch-fact"><span className="ft-arch-fact__label">Ambassadors</span><span className="ft-arch-fact__text">Level progression and reward percent are tied to real buyer count and verified purchase allocation.</span></div>
                  <div className="ft-arch-fact"><span className="ft-arch-fact__label">Airdrop</span><span className="ft-arch-fact__text">The community route is wave-based, multi-platform, and already live through Telegram.</span></div>
                  <div className="ft-arch-fact"><span className="ft-arch-fact__label">Why it matters</span><span className="ft-arch-fact__text">4TEEN behaves like a system of separated roles, not one overloaded contract blob.</span></div>
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
              <h2 className="ft-title-md">The product layer is finally catching up with the protocol layer.</h2>
              <p className="ft-text">
                Contracts always had separated roles. What changed is that the app now exposes those roles as readable, wallet-aware screens instead of leaving users with only raw on-chain ideas and scattered links.
              </p>
            </div>

            <div className="ft-grid ft-grid--3 ft-why-grid">
              {whyCards.map((card) => (
                <article key={card.number} className="ft-card ft-why-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-why-icon">{card.number}</div>
                    <div className="ft-stack ft-stack--xs">
                      <h3 className="ft-subtitle">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </div>
                    <div className="ft-highlight ft-why-highlight">
                      <strong>Why it matters:</strong>
                      <br />
                      {card.note}
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
              <h2 className="ft-title-md">A live read of entry, liquidity, rewards, and operational state.</h2>
              <p className="ft-text">
                These cards should mirror what the user can actually open in the app: direct-buy context, unlock and controller-side state,
                cabinet reward flow, and the current Telegram-first social distribution route.
              </p>
            </div>

            <div className="ft-grid ft-grid--4 ft-metrics-top">
              <HomePriceCards includeDailyRule />
            </div>

            <div className="ft-grid ft-grid--3 ft-metrics-grid">
              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs ft-metric-panel__head">
                    <p className="ft-overline">Liquidity Engine</p>
                    <h3 className="ft-subtitle">Rule-Based Liquidity Flow</h3>
                  </div>

                  <div className="ft-metric-panel__body">
                    <table className="ft-mini-table">
                      <tbody>
                        <tr><th>Controller</th><td className="ft-right">FourteenLiquidityController</td></tr>
                        <tr><th>Reserve Vault</th><td className="ft-right">FourteenVault</td></tr>
                        <tr><th>Preparation Layer</th><td className="ft-right">LiquidityBootstrapper</td></tr>
                        <tr><th>Execution Split</th><td className="ft-right">50% / 50%</td></tr>
                        <tr><th>DEX Paths</th><td className="ft-right">JustMoney + Sun.io V3</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="ft-note ft-metric-panel__foot">
                    In the app this shows up as threshold checks, next release context, executor split, contract links, and controller-side history instead of one opaque “liquidity” sentence.
                  </div>
                </div>
              </article>

              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs ft-metric-panel__head">
                    <p className="ft-overline">Ambassador Layer</p>
                    <h3 className="ft-subtitle">Cabinet reward flow</h3>
                  </div>

                  <div className="ft-metric-panel__body">
                    <div className="ft-metric-ladder">
                      <div className="ft-metric-ladder__row"><span className="ft-metric-ladder__level">Bronze</span><span className="ft-metric-ladder__meta">0–9 buyers</span><span className="ft-metric-ladder__value">10%</span></div>
                      <div className="ft-metric-ladder__row"><span className="ft-metric-ladder__level">Silver</span><span className="ft-metric-ladder__meta">10–99 buyers</span><span className="ft-metric-ladder__value">25%</span></div>
                      <div className="ft-metric-ladder__row"><span className="ft-metric-ladder__level">Gold</span><span className="ft-metric-ladder__meta">100–999 buyers</span><span className="ft-metric-ladder__value">50%</span></div>
                      <div className="ft-metric-ladder__row"><span className="ft-metric-ladder__level">Platinum</span><span className="ft-metric-ladder__meta">1000+ buyers</span><span className="ft-metric-ladder__value">75%</span></div>
                    </div>
                  </div>

                  <div className="ft-note ft-metric-panel__foot">
                    In the app this route combines on-chain cabinet state with backend attribution rows, so claimable now, claimed total, and pending replay live together in one place.
                  </div>
                </div>
              </article>

              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs ft-metric-panel__head">
                    <p className="ft-overline">Airdrop Layer</p>
                    <h3 className="ft-subtitle">Live social distribution snapshot</h3>
                  </div>

                  <div className="ft-metric-panel__body">
                    <table className="ft-mini-table">
                      <tbody>
                      <tr><th>Total Allocation</th><td className="ft-right"><strong>1,500,000 4TEEN</strong></td></tr>
                      <tr><th>Wave Structure</th><td className="ft-right">6 Fixed Waves</td></tr>
                      <tr><th>Current Live Route</th><td className="ft-right"><span className="ft-status-pill live">Telegram</span></td></tr>
                      <tr><th>Other Socials</th><td className="ft-right"><span className="ft-status-pill wait">Read-only placeholders</span></td></tr>
                      <tr><th>Reward Delivery</th><td className="ft-right">On-Chain</td></tr>
                    </tbody>
                  </table>
                  </div>

                  <div className="ft-actions ft-actions--stack-mobile ft-metric-panel__foot">
                    <LoaderLink className="ft-btn ft-btn--secondary" href="/airdrop">Open Live Telegram Route</LoaderLink>
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
              <h2 className="ft-title-md">Open the same surfaces the app already exposes.</h2>
              <p className="ft-text">
                These are not placeholder menu items anymore. They map directly to routes and behaviors that already exist in the wallet-style product flow and already carry live wallet state.
              </p>
            </div>

            <div className="ft-grid ft-grid--4 ft-tools-grid">
              {tools.map(([status, title, text, href]) => (
                <LoaderLink key={href} className="ft-tool-card" href={href}>
                  <span className={`ft-tool-card__status ft-status-pill ${status === "Verify" ? "wait" : "live"}`}>{status}</span>
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">{title}</h3>
                    <p className="ft-text">{text}</p>
                  </div>
                </LoaderLink>
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
              <h2 className="ft-title-md">Verify the protocol across contracts, repos, docs, and the app hub.</h2>
              <p className="ft-text">
                The public story is stronger now because the wallet app already acts as an operating layer on top of those contracts, repos, docs, asset-wallet checks, and live surfaces.
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
                      <CopyLinkRow key={href} href={href} label={label} value={value} />
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
                      <CopyLinkRow key={href} href={href} label={label} value={value} />
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
                    <LoaderLink className="ft-verify-link" href="/whitepaper"><span className="ft-verify-link__label">Docs</span><span className="ft-verify-link__value">Whitepaper</span></LoaderLink>
                    <LoaderLink className="ft-verify-link" href="/verification"><span className="ft-verify-link__label">Docs</span><span className="ft-verify-link__value">Verification</span></LoaderLink>
                    <LoaderLink className="ft-verify-link" href="/blog"><span className="ft-verify-link__label">Docs</span><span className="ft-verify-link__value">Blog</span></LoaderLink>
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
                    <LoaderLink className="ft-verify-link" href="/airdrop"><span className="ft-verify-link__label">Hub</span><span className="ft-verify-link__value">Airdrop Hub</span></LoaderLink>
                    <LoaderLink className="ft-verify-link" href="/ambassadors"><span className="ft-verify-link__label">Hub</span><span className="ft-verify-link__value">Ambassador Program</span></LoaderLink>
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
              <h2 className="ft-title-md">Clear answers before you open the live surfaces.</h2>
              <p className="ft-text">
                The right questions are changing. Users now need clarity about what each route actually does, which actions depend on wallet type, and which growth or verification flows are already live in the app.
              </p>
            </div>

            <div className="ft-faq-list">
              {faqItems.map(([question, answer], index) => (
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
                <h2 className="ft-title-md">Structured mechanics do not remove market risk.</h2>
                <p className="ft-text">
                  4TEEN is an on-chain token protocol with visible rules, separated contract roles, and public verification paths.
                  That makes the system easier to inspect, but it does not turn token participation into a guaranteed-return product.
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
                <strong>Important:</strong> 4TEEN is built around observable on-chain behavior, not guaranteed outcomes.
                Users should verify the system themselves and act only with risk they understand.
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
                <h2 className="ft-title-lg">Choose the Surface You Need</h2>
                <p className="ft-lead">
                  Get the mobile app, prepare a direct buy, verify the compact architecture route, or go straight into the live growth and tracking surfaces.
                </p>
              </div>

              <div className="ft-grid ft-grid--4 ft-final-cta__grid">
                <LoaderLink className="ft-final-cta__card" href="/app">
                  <span className="ft-status-pill live">Open</span>
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">Get the App</h3>
                    <p className="ft-text">Start from the mobile-app route with store download options and a clean handoff into the wallet product.</p>
                  </div>
                </LoaderLink>
                <LoaderLink className="ft-final-cta__card" href="/buy">
                  <span className="ft-status-pill live">Buy</span>
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">Open Direct Buy</h3>
                    <p className="ft-text">Go straight into the contract-side entry flow with amount preview, confirmation, and wallet-aware gating.</p>
                  </div>
                </LoaderLink>
                <LoaderLink className="ft-final-cta__card" href="/verification">
                  <span className="ft-status-pill live">Track</span>
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">Open Verification</h3>
                    <p className="ft-text">Use the public proof layer for contracts, repos, liquidity logic, and the architecture map behind the app surfaces.</p>
                  </div>
                </LoaderLink>
                <LoaderLink className="ft-final-cta__card" href="/ambassadors">
                  <span className="ft-status-pill live">Manage</span>
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">Open Ambassador Cabinet</h3>
                    <p className="ft-text">Register, inspect referral identity, track purchases, and work with live reward state in one route.</p>
                  </div>
                </LoaderLink>
              </div>

              <div className="ft-actions ft-actions--stack-mobile ft-final-cta__actions">
                <LoaderLink className="ft-btn ft-btn--primary" href="/app">Get App</LoaderLink>
                <LoaderLink className="ft-btn ft-btn--secondary" href="/buy">Open Direct Buy</LoaderLink>
                <LoaderLink className="ft-btn ft-btn--ghost" href="/airdrop">Open Live Telegram Route</LoaderLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
