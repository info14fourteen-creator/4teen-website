import type { Metadata } from "next";

import { BuyLatestEvents } from "@/components/site/buy-latest-events";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { ProgressiveAnimatedMedia } from "@/components/site/progressive-animated-media";
import { LoaderLink } from "@/components/site/loader-link";
import { SignalPoints } from "@/components/site/signal-points";
import { SiteSnapshotRefresh } from "@/components/site/site-snapshot-refresh";
import { FourteenTopbar } from "@/components/site/topbar";
import { getBuyPageContent } from "@/content/buy-content";
import {
  officialContractsRepoUrl,
  officialWalletRepoUrl,
} from "@/content/official-links";
import {
  defaultSiteLocale,
  type SupportedSiteLocale,
} from "@/lib/site-locale";
import { buildPageMetadata } from "@/lib/site-metadata";
import { formatCompactMetric } from "@/lib/site-format";
import { getServerSiteSnapshot } from "@/lib/server-site-snapshot";

export function getBuyPageMetadata(
  locale: SupportedSiteLocale = defaultSiteLocale,
): Metadata {
  const metadata = getBuyPageContent(locale).metadata;
  return buildPageMetadata({ ...metadata, locale, pathname: "/buy" });
}

export const metadata: Metadata = getBuyPageMetadata();

const FOURTEEN_TOKEN_SCAN_URL =
  "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A";
const FOURTEEN_CONTROLLER_SCAN_URL =
  "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ";

function accentizeTitle(text: string) {
  if (text.includes("4TEEN")) {
    const [before, after] = text.split("4TEEN");
    return (
      <>
        {before}
        <span className="ft-accent">4TEEN</span>
        {after}
      </>
    );
  }

  return text;
}

function renderComparisonTitle(text: string) {
  if (text === "Direct Buy Is the Entry Route. Swap Is the Market Route.") {
    return (
      <>
        <span className="ft-accent">Direct Buy</span> Is the Entry Route.{" "}
        <span className="ft-meta-green">Swap</span> Is the Market Route.
      </>
    );
  }

  return text;
}

function renderExecutionTitle(text: string) {
  if (text === "The Website Explains the Route. The Wallet Executes the Buy.") {
    return (
      <>
        The <span className="ft-accent">Website</span> Explains the Route. The{" "}
        <span className="ft-meta-green">Wallet</span> Executes the Buy.
      </>
    );
  }

  return text;
}

export async function BuyPageView({
  locale = defaultSiteLocale,
}: {
  locale?: SupportedSiteLocale;
}) {
  const content = getBuyPageContent(locale);
  const marketSnapshot = await getServerSiteSnapshot<{
    direct?: {
      trx?: string;
    };
    updatedAt?: string;
  }>("market-price");
  const directPrice = marketSnapshot?.direct?.trx?.trim() || content.hero.stats.priceFallback;
  const directPriceMeta = marketSnapshot?.updatedAt
    ? content.hero.stats.directPriceMeta
    : content.hero.stats.priceUnavailable;
  const heroSignals = content.hero.rotatingLines ?? [];
  const heroStats = (
    <>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.directPrice}</p>
        <p className="ft-price-main">{formatCompactMetric(directPrice)} TRX</p>
        <p className="ft-price-sub">{directPriceMeta}</p>
      </article>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.lockRule}</p>
        <p className="ft-price-main">{content.hero.stats.lockRuleValue}</p>
        <p className="ft-price-sub">{content.hero.stats.lockRuleMeta}</p>
      </article>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.trxSplit}</p>
        <p className="ft-price-main">{content.hero.stats.trxSplitValue}</p>
        <p className="ft-price-sub">{content.hero.stats.trxSplitMeta}</p>
      </article>
      <article className="ft-price-card">
        <p className="ft-price-label">{content.hero.stats.execution}</p>
        <p className="ft-price-main">{content.hero.stats.executionValue}</p>
        <p className="ft-price-sub">{content.hero.stats.executionMeta}</p>
      </article>
    </>
  );

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-buy-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-placeholder-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-buy-page__hero-layout">
                <div className="ft-stack ft-stack--md ft-buy-page__hero-copy">
                  <div className="ft-cluster ft-cluster--sm">
                    <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                    <span className="ft-status-pill live">{content.hero.badge}</span>
                    <SiteSnapshotRefresh snapshotKeys={["market-price", "buy-latest"]} />
                  </div>
                  <h1 className="ft-title-lg">{accentizeTitle(content.hero.title)}</h1>
                  {content.hero.subtitle ? (
                    <p className="ft-lead">{content.hero.subtitle}</p>
                  ) : null}
                  <div className="ft-stack ft-stack--sm">
                    {content.hero.body.map((paragraph) => (
                      <p key={paragraph} className="ft-text">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {heroSignals.length ? (
                    <SignalPoints
                      className="ft-buy-page__signal-lines ft-buy-page__signal-lines--lead"
                      items={heroSignals}
                    />
                  ) : null}
                  <div className="ft-grid ft-buy-page__hero-stats ft-buy-page__hero-stats--desktop">
                    {heroStats}
                  </div>
                </div>
                <div className="ft-buy-page__hero-side">
                  <div className="ft-stack ft-stack--md ft-buy-page__hero-side-inner">
                    <div className="ft-buy-page__hero-media">
                      <ProgressiveAnimatedMedia
                        alt="4TEEN wallet direct buy flow preview"
                        animatedSrc="/media/buy-demo.gif"
                        className="ft-buy-page__hero-media-image"
                        height={2220}
                        imageClassName="ft-buy-page__hero-media-image"
                        posterSrc="/media/buy-demo.png"
                        priority
                        width={1080}
                      />
                    </div>

                    {content.hero.primaryCta || content.hero.secondaryCta ? (
                      <div className="ft-actions ft-actions--stack-mobile ft-buy-page__hero-side-actions">
                        {content.hero.primaryCta ? (
                          <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                            {content.hero.primaryCta}
                          </LoaderLink>
                        ) : null}
                        {content.hero.secondaryCta ? (
                          <LoaderLink className="ft-btn ft-btn--secondary" href="#buy-live-feed">
                            {content.hero.secondaryCta}
                          </LoaderLink>
                        ) : null}
                      </div>
                    ) : null}

                    {content.hero.ctaNote ? (
                      <p className="ft-note ft-buy-page__hero-note ft-buy-page__hero-note--desktop">
                        {content.hero.ctaNote}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {content.hero.ctaNote ? (
                <p className="ft-note ft-buy-page__hero-note ft-buy-page__hero-note--mobile">
                  {content.hero.ctaNote}
                </p>
              ) : null}

              <div className="ft-grid ft-grid--4 ft-buy-page__hero-stats ft-buy-page__hero-stats--mobile">
                {heroStats}
              </div>

            </div>
          </article>

          <article className="ft-card ft-buy-page__panel">
            <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.executionRoute.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.executionRoute.title}</h2>
              </div>

              {content.sections.executionRoute.intro ? (
                <p className="ft-text">{content.sections.executionRoute.intro}</p>
              ) : null}

              <div className="ft-grid ft-grid--3 ft-buy-page__execution-grid">
                {content.sections.executionRoute.cards.map((card) => (
                  <article
                    key={card.title}
                    className="ft-card ft-card--plain ft-buy-page__detail-card"
                  >
                    <p className="ft-card-title-top">{card.eyebrow}</p>
                    <h3 className="ft-card-title">{card.title}</h3>
                    {card.subtitle ? (
                      <p className="ft-buy-page__card-subtitle">{card.subtitle}</p>
                    ) : null}
                    <div className="ft-stack ft-stack--xs">
                      {card.text.split("\n\n").map((paragraph) => (
                        <p key={paragraph} className="ft-text">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article className="ft-card ft-buy-page__panel">
            <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.trxRouting.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.trxRouting.title}</h2>
              </div>

              <div className="ft-grid ft-grid--3 ft-buy-page__routing-grid">
                {content.sections.trxRouting.rows.map((row) => (
                  <article
                    key={row.title}
                    className="ft-card ft-card--plain ft-buy-page__routing-card"
                  >
                    <p className="ft-price-label">{row.share}</p>
                    <h3 className="ft-card-title">{row.title}</h3>
                    <p className="ft-text">{row.text}</p>
                    {row.linkLabel && row.linkHref ? (
                      <LoaderLink className="ft-link" href={row.linkHref} showLinkIcon>
                        {row.linkLabel}
                      </LoaderLink>
                    ) : null}
                  </article>
                ))}
              </div>

              <p className="ft-note">{content.sections.trxRouting.note}</p>
            </div>
          </article>

          <article className="ft-card ft-buy-page__panel">
            <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.comparison.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {renderComparisonTitle(content.sections.comparison.title)}
                </h2>
              </div>

              {content.sections.comparison.intro ? (
                <p className="ft-text">{content.sections.comparison.intro}</p>
              ) : null}

              <div className="ft-grid ft-grid--3 ft-buy-page__comparison-grid">
                {content.sections.comparison.cards.map((card) => (
                  <article
                    key={card.title}
                    className="ft-card ft-card--plain ft-buy-page__detail-card ft-buy-page__comparison-card"
                  >
                    <p className="ft-card-title-top">{card.eyebrow}</p>
                    <h3 className="ft-card-title">{card.title}</h3>
                    {card.subtitle ? (
                      <p className="ft-buy-page__card-subtitle">{card.subtitle}</p>
                    ) : null}
                    <div className="ft-stack ft-stack--xs ft-buy-page__comparison-copy">
                      {card.text.split("\n\n").map((paragraph) => (
                        <p key={paragraph} className="ft-text">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {card.footerLabel && card.footerText ? (
                      <div className="ft-stack ft-stack--2xs ft-buy-page__detail-footer ft-buy-page__comparison-footer">
                        <p className="ft-card-title-top">{card.footerLabel}</p>
                        <p className="ft-text">{card.footerText}</p>
                      </div>
                    ) : (
                      <div
                        aria-hidden="true"
                        className="ft-buy-page__comparison-footer-spacer"
                      />
                    )}
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article id="buy-live-feed" className="ft-card ft-buy-page__panel">
            <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.latestPurchases.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.latestPurchases.title}</h2>
              </div>
              {content.sections.latestPurchases.intro ? (
                <p className="ft-text">{content.sections.latestPurchases.intro}</p>
              ) : null}
              <BuyLatestEvents
                content={content.sections.latestPurchases}
                locale={locale}
              />
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-buy-page__section-grid">
            <article className="ft-card ft-buy-page__panel">
              <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.signingWallet.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {renderExecutionTitle(content.sections.signingWallet.title)}
                </h2>
              </div>

                <div className="ft-stack ft-stack--xs">
                  {content.sections.signingWallet.body.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="ft-text">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <ul className="ft-list">
                  {content.sections.signingWallet.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                {content.sections.signingWallet.ctaTitle ||
                content.sections.signingWallet.ctaText ? (
                  <div className="ft-card ft-card--plain">
                    <div className="ft-stack ft-stack--xs">
                      {content.sections.signingWallet.ctaTitle ? (
                        <h3 className="ft-card-title">
                          {content.sections.signingWallet.ctaTitle}
                        </h3>
                      ) : null}
                      {content.sections.signingWallet.ctaText ? (
                        <p className="ft-text">{content.sections.signingWallet.ctaText}</p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </article>

            <article className="ft-card ft-card--plain ft-buy-page__panel">
              <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.verification.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.verification.title}</h2>
                </div>

                <div className="ft-stack ft-stack--xs">
                  {content.sections.verification.body.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="ft-text">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="ft-links">
                  <LoaderLink
                    className="ft-link"
                    href={FOURTEEN_TOKEN_SCAN_URL}
                    showLinkIcon
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content.sections.verification.tokenLabel}
                  </LoaderLink>
                  <LoaderLink
                    className="ft-link"
                    href={FOURTEEN_CONTROLLER_SCAN_URL}
                    showLinkIcon
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content.sections.verification.controllerLabel}
                  </LoaderLink>
                  <LoaderLink
                    className="ft-link"
                    href={officialContractsRepoUrl}
                    showLinkIcon
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content.sections.verification.contractsRepoLabel}
                  </LoaderLink>
                  <LoaderLink
                    className="ft-link"
                    href={officialWalletRepoUrl}
                    showLinkIcon
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content.sections.verification.walletRepoLabel}
                  </LoaderLink>
                </div>
              </div>
            </article>

            <article className="ft-card ft-card--strong ft-buy-page__cta-panel">
              <div className="ft-stack ft-stack--lg ft-buy-page__panel-stack">
                <div className="ft-stack ft-stack--sm">
                  <p className="ft-overline">{content.sections.cta.eyebrow}</p>
                  <h2 className="ft-title-md">{content.sections.cta.title}</h2>
                  <div className="ft-stack ft-stack--xs">
                    {content.sections.cta.body.split("\n\n").map((paragraph) => (
                      <p key={paragraph} className="ft-text">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="ft-actions ft-actions--stack-mobile">
                  <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                    {content.sections.cta.openApp}
                  </LoaderLink>
                  <LoaderLink className="ft-btn ft-btn--secondary" href="/unlock">
                    {content.sections.cta.openUnlock}
                  </LoaderLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function BuyPage() {
  return <BuyPageView />;
}
