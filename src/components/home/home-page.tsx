import type { ReactNode } from "react";

import { HomePriceCards } from "@/components/home/home-price-cards";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { ReleaseCountdown } from "@/components/site/release-countdown";
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
    text: "The protocol-native entry route: send TRX from a signing wallet, mint a fresh 4TEEN batch, and start its own 14-day timer.",
    href: "/buy",
    tone: "live",
  },
  {
    eyebrow: "Timer",
    title: "Unlock",
    text: "Every direct-buy batch has a separate release point. The page explains the public topology; the wallet shows the personal timeline.",
    href: "/unlock",
    tone: "live",
  },
  {
    eyebrow: "90%",
    title: "Liquidity",
    text: "The largest TRX route. It explains controller balance, release windows, bootstrapper logic, and how liquidity can be executed.",
    href: "/liquidity",
    tone: "live",
  },
  {
    eyebrow: "Market",
    title: "Swap",
    text: "The secondary-market route after tokens are movable. It is not the same machine as direct buy, and users should know the difference.",
    href: "/swap",
    tone: "live",
  },
  {
    eyebrow: "3%",
    title: "Airdrop",
    text: "The public distribution side of the system: wave logic, growth surface, and wallet-aware claim context.",
    href: "/airdrop",
    tone: "live",
  },
  {
    eyebrow: "7%",
    title: "Ambassadors",
    text: "The referral and proof cabinet: registration, buyer attribution, purchase verification, reward ladder, and claims.",
    href: "/ambassadors",
    tone: "live",
  },
];

const proofRoutes: RouteCard[] = [
  {
    eyebrow: "App",
    title: "Mobile Wallet",
    text: "Execution lives here: signing wallet, resource checks, direct buy, unlock state, ambassador cabinet, and app routes.",
    href: "/app",
    tone: "live",
  },
  {
    eyebrow: "Utility",
    title: "TRON Energy Desk",
    text: "QuickShooters calculates and rents TRON Energy plus Bandwidth before USDT TRC20 transfers, so users do not burn TRX blindly.",
    href: "https://quickshooters.com/?utm_source=4teen&utm_medium=homepage&utm_campaign=energy_desk",
    tone: "live",
  },
  {
    eyebrow: "Proof",
    title: "Verification",
    text: "The audit surface for contracts, vaults, repos, controller truth, wallet links, and public source references.",
    href: "/verification",
    tone: "live",
  },
  {
    eyebrow: "Docs",
    title: "Whitepaper",
    text: "The current May 4, 2026 document and preserved historical versions, separated cleanly for diligence.",
    href: "/whitepaper",
  },
  {
    eyebrow: "Capital",
    title: "Investor Deck",
    text: "A shareable investor route with the thesis, product surface, proof stack, and genesis@4teen.me contact path.",
    href: "/deck",
    tone: "live",
  },
];

const splitCards = [
  {
    share: "90%",
    title: "Liquidity side",
    text: "The largest share feeds the liquidity side that supports the later market route after unlock.",
    href: "/liquidity",
  },
  {
    share: "7%",
    title: "Controller side",
    text: "Controller and accounting layer connected to verified purchases, ambassador attribution, and reward settlement.",
    href: "/ambassadors",
  },
  {
    share: "3%",
    title: "Airdrop side",
    text: "Growth distribution route that keeps public claim campaigns tied to the same live buy flow.",
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
  const isExternal = card.href.startsWith("http");

  return (
    <LoaderLink
      className="ft-home-surface-card"
      href={card.href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      showLinkIcon={isExternal}
      target={isExternal ? "_blank" : undefined}
    >
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
                  <span className="ft-home-hero__proofitem">App release · Jul 25</span>
                  <span className="ft-home-hero__proofitem">Wallet execution</span>
                </div>

                <div className="ft-stack ft-stack--md">
                  <h1 className="ft-home-hero__title">
                    <AccentTitle>4TEEN is the TRON wallet route for buy, lock, liquidity, and proof.</AccentTitle>
                  </h1>
                  <p className="ft-lead ft-home-hero__lead">
                    Start with the contract-native buy route, track the 14-day
                    lock, understand where TRX flows, and follow the mobile
                    app rollout as it moves through App Store and Google Play.
                  </p>
                </div>

                <ReleaseCountdown
                  className="ft-home-hero__release-mobile"
                  description="The homepage stays the ecosystem map. The app page carries the release route, store rollout, and the wallet-side product view."
                  eyebrow="App Release Window"
                  primaryHref="/app"
                  primaryLabel="Open App Page"
                  secondaryHref="/app#app-download"
                  secondaryLabel="See Download Route"
                  title="The 4TEEN mobile app lands on July 25, 2026."
                  variant="home"
                />

                <div className="ft-stack ft-stack--sm ft-home-hero__body">
                  <p>
                    The homepage should do one job fast: route a new user to
                    the right machine. Buy explains entry, Unlock explains
                    timing, Liquidity explains the 90% side, Swap explains the
                    market route, and Verification ties the claims back to code.
                  </p>
                  <p>
                    The product path is simple enough to remember: install the
                    wallet, enter through direct buy, wait for the batch unlock,
                    then decide whether to hold or move through market
                    liquidity. No fake dashboard fog, just the route.
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
                  <div className="ft-home-hero__point">Direct buy mints a fresh batch and locks it.</div>
                  <div className="ft-home-hero__point">Each batch carries its own 14-day timer.</div>
                  <div className="ft-home-hero__point">Incoming TRX is routed by contract rule: 90% / 7% / 3%.</div>
                  <div className="ft-home-hero__point">The site explains. The wallet signs and executes.</div>
                </div>
              </div>
            </article>

            <aside className="ft-home-hero__rail ft-card">
              <div className="ft-stack ft-stack--lg">
                <ReleaseCountdown
                  description="The homepage stays the ecosystem map. The app page carries the release route, store rollout, and the wallet-side product view."
                  eyebrow="App Release Window"
                  primaryHref="/app"
                  primaryLabel="Open App Page"
                  secondaryHref="/app#app-download"
                  secondaryLabel="See Download Route"
                  title="The 4TEEN mobile app lands on July 25, 2026."
                  variant="home"
                />

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
                Start from the route that matches the decision in front of you.
              </>
            }
          >
            A serious homepage is not a brochure maze. It should push people
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
            directly, wait through the lock, and later buys keep feeding
            liquidity, controller accounting, and public distribution.
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
            route to verify it. That is why the homepage links directly to the
            whitepaper, verification route, repositories, blog context, and
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
