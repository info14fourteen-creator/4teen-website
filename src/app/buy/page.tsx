import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import { getBuyPageContent } from "@/content/buy-content";
import {
  officialContractsRepoUrl,
  officialWalletRepoUrl,
} from "@/content/official-links";
import { defaultSiteLocale } from "@/lib/site-locale";

const metadataContent = getBuyPageContent(defaultSiteLocale);

export const metadata: Metadata = metadataContent.metadata;

const FOURTEEN_TOKEN_SCAN_URL =
  "https://tronscan.org/#/token20/TMLXiCW2ZAkvjmn79ZXa4vdHX5BE3n9x4A";
const FOURTEEN_CONTROLLER_SCAN_URL =
  "https://tronscan.org/#/contract/TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ";

export default async function BuyPage() {
  const locale = defaultSiteLocale;
  const content = getBuyPageContent(locale);

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-buy-page">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <article className="ft-card ft-card--strong ft-placeholder-hero">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                <span className="ft-status-pill live">{content.hero.status}</span>
              </div>

              <div className="ft-stack ft-stack--md">
                <h1 className="ft-title-lg">{content.hero.title}</h1>
                <p className="ft-lead">{content.hero.lead}</p>
              </div>

              <div className="ft-grid ft-grid--4 ft-buy-page__hero-stats">
                <article className="ft-price-card">
                  <p className="ft-price-label">{content.hero.stats.directPrice}</p>
                  <p className="ft-price-main">{content.hero.stats.priceFallback} TRX</p>
                  <p className="ft-price-sub">{content.hero.stats.directPriceMeta}</p>
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
              </div>
            </div>
          </article>

          <article className="ft-card ft-buy-page__panel">
            <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.executionRoute.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.executionRoute.title}</h2>
              </div>

              <div className="ft-grid ft-grid--3 ft-buy-page__execution-grid">
                {content.sections.executionRoute.cards.map((card) => (
                  <article
                    key={card.title}
                    className="ft-card ft-card--plain ft-buy-page__detail-card"
                  >
                    <p className="ft-card-title-top">{card.eyebrow}</p>
                    <h3 className="ft-card-title">{card.title}</h3>
                    <p className="ft-text">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article className="ft-card ft-buy-page__panel">
            <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.sections.latestPurchases.eyebrow}</p>
                <h2 className="ft-subtitle">{content.sections.latestPurchases.title}</h2>
              </div>
              <p className="ft-text">
                {content.sections.latestPurchases.fallbackBody}
              </p>
              <div className="ft-actions ft-actions--stack-mobile">
                <LoaderLink className="ft-btn ft-btn--primary" href="/app">
                  {content.sections.latestPurchases.fallbackPrimaryCta}
                </LoaderLink>
                <a
                  className="ft-btn ft-btn--secondary"
                  href={FOURTEEN_TOKEN_SCAN_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.sections.latestPurchases.fallbackSecondaryCta}
                </a>
              </div>
              <p className="ft-note">{content.sections.latestPurchases.note}</p>
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
                <h2 className="ft-subtitle">{content.sections.comparison.title}</h2>
              </div>

              <div className="ft-grid ft-grid--3 ft-buy-page__comparison-grid">
                {content.sections.comparison.cards.map((card) => (
                  <article
                    key={card.title}
                    className="ft-card ft-card--plain ft-buy-page__detail-card"
                  >
                    <p className="ft-card-title-top">{card.eyebrow}</p>
                    <h3 className="ft-card-title">{card.title}</h3>
                    <p className="ft-text">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-buy-page__section-grid">
            <article className="ft-card ft-buy-page__panel">
              <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.signingWallet.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.signingWallet.title}</h2>
                </div>

                <p className="ft-text">{content.sections.signingWallet.body}</p>

                <ul className="ft-list">
                  {content.sections.signingWallet.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="ft-card ft-card--plain ft-buy-page__panel">
              <div className="ft-stack ft-stack--md ft-buy-page__panel-stack">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.sections.verification.eyebrow}</p>
                  <h2 className="ft-subtitle">{content.sections.verification.title}</h2>
                </div>

                <p className="ft-text">{content.sections.verification.body}</p>

                <div className="ft-links">
                  <a
                    className="ft-link"
                    href={FOURTEEN_TOKEN_SCAN_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content.sections.verification.tokenLabel}
                  </a>
                  <a
                    className="ft-link"
                    href={FOURTEEN_CONTROLLER_SCAN_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content.sections.verification.controllerLabel}
                  </a>
                  <a
                    className="ft-link"
                    href={officialContractsRepoUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content.sections.verification.contractsRepoLabel}
                  </a>
                  <a
                    className="ft-link"
                    href={officialWalletRepoUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content.sections.verification.walletRepoLabel}
                  </a>
                </div>
              </div>
            </article>

            <article className="ft-card ft-card--strong ft-buy-page__cta-panel">
              <div className="ft-stack ft-stack--lg ft-buy-page__panel-stack">
                <div className="ft-stack ft-stack--sm">
                  <p className="ft-overline">{content.sections.cta.eyebrow}</p>
                  <h2 className="ft-title-md">{content.sections.cta.title}</h2>
                  <p className="ft-text">{content.sections.cta.body}</p>
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
