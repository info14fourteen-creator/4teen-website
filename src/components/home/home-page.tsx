import type { ReactNode } from "react";

import { HomePriceCards } from "@/components/home/home-price-cards";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import { getHomePageContent } from "@/content/home-content";
import {
  officialContractsRepoUrl,
  officialWalletRepoUrl,
} from "@/content/official-links";
import type { SupportedSiteLocale } from "@/lib/site-locale";

type RouteCard = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  tone?: "live" | "wait";
};

const primaryRoutes: RouteCard[] = [
  {
    eyebrow: "Entry",
    title: "Buy",
    text: "Contract-native TRX entry: mint a fresh 4TEEN batch, create its own 14-day lock, and route value by rule.",
    href: "/buy",
    tone: "live",
  },
  {
    eyebrow: "Timer",
    title: "Unlock",
    text: "Public lock topology and wallet timeline context: each direct-buy batch has its own release point.",
    href: "/unlock",
    tone: "live",
  },
  {
    eyebrow: "90%",
    title: "Liquidity",
    text: "Controller-side liquidity route: threshold, daily release rule, bootstrapper, executors, and reserve custody.",
    href: "/liquidity",
    tone: "live",
  },
  {
    eyebrow: "Market",
    title: "Swap",
    text: "Secondary-market route after tokens are movable. Different machine, different risk, different timing.",
    href: "/swap",
    tone: "live",
  },
  {
    eyebrow: "3%",
    title: "Airdrop",
    text: "Wave-based growth vault with Telegram live today and a wallet-aware claim route inside the app.",
    href: "/airdrop",
    tone: "live",
  },
  {
    eyebrow: "7%",
    title: "Ambassadors",
    text: "Registration, buyer attribution, purchase verification, reward ladder, and claimable cabinet state.",
    href: "/ambassadors",
    tone: "live",
  },
];

const proofRoutes: RouteCard[] = [
  {
    eyebrow: "App",
    title: "Mobile Wallet",
    text: "The site explains the map. The app executes: signing wallet, resources, confirmation, unlock follow-up.",
    href: "/app",
    tone: "live",
  },
  {
    eyebrow: "Proof",
    title: "Verification",
    text: "Contracts, vaults, repos, controller truth, asset wallets, and public source links in one route.",
    href: "/verification",
    tone: "live",
  },
  {
    eyebrow: "Docs",
    title: "Whitepaper",
    text: "The current May 4, 2026 paper plus preserved archive versions for technical diligence.",
    href: "/whitepaper",
  },
  {
    eyebrow: "Capital",
    title: "Investor Deck",
    text: "A direct deck page for investors and partners who need the thesis, product surface, and contact route.",
    href: "/deck",
    tone: "live",
  },
];

const splitCards = [
  {
    share: "90%",
    title: "Liquidity side",
    text: "The largest part of incoming TRX feeds the liquidity system and later market route.",
    href: "/liquidity",
  },
  {
    share: "7%",
    title: "Controller side",
    text: "Controller/accounting side connected to administration, verified purchases, and ambassador rewards.",
    href: "/ambassadors",
  },
  {
    share: "3%",
    title: "Airdrop side",
    text: "Growth distribution route that keeps public claim campaigns connected to the live system.",
    href: "/airdrop",
  },
];

const verificationLinks = [
  { label: "FourteenToken", href: "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A" },
  { label: "FourteenController", href: "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ" },
  { label: "Contracts repo", href: officialContractsRepoUrl },
  { label: "Wallet repo", href: officialWalletRepoUrl },
];

function AccentTitle({ children }: { children: string }) {
  const parts = children.split("4TEEN");

  if (parts.length === 1) {
    return children;
  }

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}:${index}`}>
          {index > 0 ? <span className="ft-accent">4TEEN</span> : null}
          {part}
        </span>
      ))}
    </>
  );
}

function HomeRouteCard({ card }: { card: RouteCard }) {
  return (
    <LoaderLink className="ft-home-surface-card" href={card.href}>
      <span className={`ft-status-pill ${card.tone ?? "wait"}`}>
        {card.eyebrow}
      </span>
      <div className="ft-stack ft-stack--sm">
        <h3 className="ft-subtitle">{card.title}</h3>
        <p className="ft-text">{card.text}</p>
      </div>
    </LoaderLink>
  );
}

function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="ft-stack ft-stack--sm ft-home-section-head">
      <span className="ft-eyebrow">{eyebrow}</span>
      <h2 className="ft-title-md">{title}</h2>
      <p className="ft-text">{children}</p>
    </div>
  );
}

export function HomePage({ locale }: { locale: SupportedSiteLocale }) {
  const content = getHomePageContent(locale);

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-home-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-home-hero" id="home-hero">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <div className="ft-home-hero__grid">
            <article className="ft-home-hero__copy">
              <div className="ft-stack ft-stack--lg">
                <div className="ft-home-hero__proofstrip">
                  <span className="ft-home-hero__proofitem">4TEEN on TRON</span>
                  <span className="ft-home-hero__proofitem">Contract-native entry</span>
                  <span className="ft-home-hero__proofitem">Wallet execution</span>
                </div>

                <div className="ft-stack ft-stack--md">
                  <h1 className="ft-home-hero__title">
                    <AccentTitle>4TEEN is the wallet-first route into a structured TRON system.</AccentTitle>
                  </h1>
                  <p className="ft-lead ft-home-hero__lead">
                    Buy through the contract, wait through the lock, watch the
                    liquidity route, and use the wallet when it is time to act.
                  </p>
                </div>

                <div className="ft-stack ft-stack--sm ft-home-hero__body">
                  <p>
                    This homepage is the map. The inner pages carry the proof:
                    direct buy explains entry, unlock explains timing,
                    liquidity explains the 90% route, ambassadors and airdrop
                    explain growth, and verification ties claims back to
                    contracts and code.
                  </p>
                  <p>
                    The clean user path is simple: install the wallet, enter
                    through the contract-native buy route, track the 14-day
                    batch timer, then decide whether to hold or move through
                    market liquidity after unlock.
                  </p>
                </div>

                <div className="ft-home-hero__actions">
                  <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                    Install / Open Wallet
                  </LoaderLink>
                  <LoaderLink className="ft-btn ft-btn--secondary" href="/buy">
                    Start With Buy
                  </LoaderLink>
                  <LoaderLink className="ft-btn ft-btn--ghost" href="/deck">
                    Investor Deck
                  </LoaderLink>
                </div>

                <div className="ft-home-hero__points" aria-label="4TEEN route summary">
                  <div className="ft-home-hero__point">Direct buy mints a fresh locked batch.</div>
                  <div className="ft-home-hero__point">Every direct-buy batch has its own 14-day timer.</div>
                  <div className="ft-home-hero__point">Incoming TRX routes by contract rule: 90% / 7% / 3%.</div>
                  <div className="ft-home-hero__point">The wallet executes; the site explains and verifies.</div>
                </div>
              </div>
            </article>

            <aside className="ft-home-hero__rail ft-card">
              <div className="ft-stack ft-stack--lg">
                <div className="ft-home-hero__signal">
                  <div className="ft-home-hero__signal-head">
                    <span className="ft-home-hero__signal-kicker">Entry Cycle</span>
                    <span className="ft-home-hero__signal-note">Protocol map</span>
                  </div>
                  <div className="ft-home-hero__signal-grid">
                    {splitCards.map((card) => (
                      <LoaderLink key={card.share} className="ft-home-hero__signal-card" href={card.href}>
                        <span className="ft-home-hero__signal-share">{card.share}</span>
                        <span className="ft-home-hero__signal-label">{card.title}</span>
                      </LoaderLink>
                    ))}
                  </div>
                </div>

                <div className="ft-home-hero__stats">
                  <div className="ft-home-hero__stat">
                    <span className="ft-home-hero__stat-label">Entry</span>
                    <span className="ft-home-hero__stat-value">Buy → Mint → Lock</span>
                  </div>
                  <div className="ft-home-hero__stat">
                    <span className="ft-home-hero__stat-label">Lock rule</span>
                    <span className="ft-home-hero__stat-value">14 days per batch</span>
                  </div>
                  <div className="ft-home-hero__stat">
                    <span className="ft-home-hero__stat-label">Execution</span>
                    <span className="ft-home-hero__stat-value">Signing wallet + resources</span>
                  </div>
                  <div className="ft-home-hero__stat">
                    <span className="ft-home-hero__stat-label">Proof</span>
                    <span className="ft-home-hero__stat-value">Contracts + repos + whitepaper</span>
                  </div>
                </div>

                <div className="ft-home-hero__trust" aria-label="Proof links">
                  {verificationLinks.map((link) => (
                    <LoaderLink
                      key={link.label}
                      className="ft-home-hero__trust-link"
                      href={link.href}
                      rel="noopener noreferrer"
                      showLinkIcon
                      target="_blank"
                    >
                      {link.label}
                    </LoaderLink>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div className="ft-price-strip ft-price-strip--hero" aria-label={content.ui.aria.livePriceSummary}>
            <HomePriceCards copy={content.ui.marketStrip} includeDailyRule />
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact ft-home-proof" id="protocol-routes">
        <div className="ft-container--wide ft-stack ft-stack--lg">
          <SectionIntro
            eyebrow="Route Map"
            title={
              <>
                Start from the page that matches the decision in front of you.
              </>
            }
          >
            The homepage should not swallow the product. It should point users
            into the right live surface fast: entry, timer, liquidity, market,
            growth, cabinet, app, proof, docs, or capital route.
          </SectionIntro>

          <div className="ft-home-surface-grid">
            {[...primaryRoutes, ...proofRoutes].map((card) => (
              <HomeRouteCard key={card.href} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="trx-routing">
        <div className="ft-container--wide ft-stack ft-stack--lg">
          <SectionIntro
            eyebrow="90 / 7 / 3"
            title={
              <>
                Direct buy routes value into <span className="ft-accent">three</span> separate jobs.
              </>
            }
          >
            The strongest homepage story is the actual machine: users buy
            directly, wait through the lock, and while they wait later buys keep
            feeding liquidity, controller accounting, and public distribution.
          </SectionIntro>

          <div className="ft-home-system-grid">
            {splitCards.map((card) => (
              <article key={card.share} className="ft-card ft-home-system-card">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-home-system-card__head">
                    <span className="ft-home-system-card__share">{card.share}</span>
                    <div className="ft-stack ft-stack--xs">
                      <h3 className="ft-subtitle">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </div>
                  </div>
                  <LoaderLink className="ft-link" href={card.href} showLinkIcon>
                    Open {card.title}
                  </LoaderLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="proof-stack">
        <div className="ft-container--wide ft-stack ft-stack--lg">
          <SectionIntro
            eyebrow="Proof Stack"
            title={
              <>
                The public story should be backed by <span className="ft-meta-green">contracts</span>,{" "}
                <span className="ft-accent">code</span>, and wallet surfaces.
              </>
            }
          >
            A new visitor should understand the claim, then immediately have a
            route to verify it. That is why the homepage now links directly to
            the whitepaper, verification route, repositories, blog context, and
            investor deck.
          </SectionIntro>

          <div className="ft-home-proof__grid">
            <article className="ft-home-proof__card">
              <span className="ft-home-proof__index">01 / Contract</span>
              <h3 className="ft-subtitle">Read the mechanics before touching the button.</h3>
              <p className="ft-text">
                Buy, unlock, liquidity, and swap pages explain different parts
                of the route instead of pretending one CTA can explain the
                system.
              </p>
              <LoaderLink className="ft-link" href="/whitepaper" showLinkIcon>
                Read Whitepaper
              </LoaderLink>
            </article>

            <article className="ft-home-proof__card">
              <span className="ft-home-proof__index">02 / Wallet</span>
              <h3 className="ft-subtitle">The website is the map. The app is execution.</h3>
              <p className="ft-text">
                The wallet handles signing mode, resources, buy confirmation,
                unlock state, ambassador cabinet, and claim routes.
              </p>
              <LoaderLink className="ft-link" href="/app" showLinkIcon>
                Open App Route
              </LoaderLink>
            </article>

            <article className="ft-home-proof__card">
              <span className="ft-home-proof__index">03 / Capital</span>
              <h3 className="ft-subtitle">Investors need the thesis, not a maze.</h3>
              <p className="ft-text">
                The deck route exists for direct investor sharing, with
                genesis@4teen.me as the contact path.
              </p>
              <LoaderLink className="ft-link" href="/deck" showLinkIcon>
                Open Investor Deck
              </LoaderLink>
            </article>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--tight" id="home-final-cta">
        <div className="ft-container--wide">
          <article className="ft-card ft-card--strong ft-home-cta">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-stack ft-stack--sm">
                <span className="ft-eyebrow">Next Step</span>
                <h2 className="ft-title-lg">
                  Open the wallet, verify the route, then decide.
                </h2>
                <p className="ft-lead">
                  4TEEN is not strongest when the homepage says everything. It
                  is strongest when every claim sends the user to the correct
                  proof page, contract route, app surface, or investor context.
                </p>
              </div>

              <div className="ft-actions ft-actions--stack-mobile">
                <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                  Install / Open Wallet
                </LoaderLink>
                <LoaderLink className="ft-btn ft-btn--secondary" href="/verification">
                  Verify Protocol
                </LoaderLink>
                <LoaderLink className="ft-btn ft-btn--ghost" href="/blog">
                  Read Blog
                </LoaderLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
