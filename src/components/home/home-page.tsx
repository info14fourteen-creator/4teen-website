import type { ReactNode } from "react";
import { getHomePageContent } from "@/content/home-content";
import { CopyLinkRow } from "@/components/home/copy-link-row";
import { HomePriceCards } from "@/components/home/home-price-cards";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import type { SupportedSiteLocale } from "@/lib/site-locale";

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
      <LoaderLink
        className={className}
        href={href}
        rel="noreferrer"
        showLinkIcon
        target="_blank"
      >
        {children}
      </LoaderLink>
    );
  }

  return (
    <LoaderLink className={className} href={href} showLinkIcon>
      {children}
    </LoaderLink>
  );
}

export function HomePage({ locale }: { locale: SupportedSiteLocale }) {
  const content = getHomePageContent(locale);

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
                    <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                    <span className="ft-meta-green">{content.hero.meta}</span>
                  </div>

                  <div className="ft-stack ft-stack--md">
                    <h1 className="ft-title-xl ft-hero-title">{content.hero.title}</h1>
                    <p className="ft-lead ft-hero-lead">{content.hero.lead}</p>
                  </div>

                  <div className="ft-stack ft-stack--sm ft-hero-points" aria-label={content.ui.aria.heroPoints}>
                    {content.hero.points.map((point) => (
                      <div key={point} className="ft-hero-point">
                        {point}
                      </div>
                    ))}
                  </div>

                  <div className="ft-hero-actions">
                    <LoaderLink className="ft-btn ft-btn--primary" href={content.hero.actions[0].href}>{content.hero.actions[0].label}</LoaderLink>
                    <LoaderLink className="ft-btn ft-btn--secondary" href={content.hero.actions[1].href}>{content.hero.actions[1].label}</LoaderLink>
                  </div>
                </div>
              </div>

              <aside className="ft-card ft-card--strong ft-hero-side-panel">
                <div className="ft-stack ft-stack--lg">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.hero.sideEyebrow}</p>
                    <h3 className="ft-subtitle">{content.hero.sideTitle}</h3>
                  </div>

                  <div className="ft-stack ft-stack--sm">
                    {content.hero.sideStats.map((stat) => (
                      <div key={stat.label} className="ft-hero-stat-row">
                        <span className="ft-hero-stat-label">{stat.label}</span>
                        <span className="ft-hero-stat-value">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ft-highlight ft-hero-highlight">
                    <strong>{content.hero.sideHighlightTitle}</strong>
                    <br />
                    {content.hero.sideHighlightText}
                  </div>
                </div>
              </aside>
            </div>

            <div className="ft-price-strip ft-price-strip--hero" aria-label={content.ui.aria.livePriceSummary}>
              <HomePriceCards copy={content.ui.marketStrip} />
            </div>

            <div className="ft-hero-tools" aria-label={content.ui.aria.quickLinks}>
              {content.hero.tools.map((tool) => (
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
                  <span className="ft-eyebrow">{content.wallets.eyebrow}</span>
                </div>
                <h2 className="ft-title-md">{content.wallets.title}</h2>
                <p className="ft-text">{content.wallets.description}</p>
              </div>

              <div className="ft-grid ft-grid--2-even">
                <div className="ft-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-cluster ft-cluster--sm">
                      <span className="ft-status-pill live">{content.wallets.bestStatus}</span>
                    </div>

                    <div className="ft-wallet-list">
                      {content.wallets.bestItems.map((item) => (
                        <div key={item.name} className="ft-wallet-row">
                          <span className="ft-wallet-name">{item.name}</span>
                          <span className="ft-wallet-note">{item.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ft-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-cluster ft-cluster--sm">
                      <span className="ft-status-pill wait">{content.wallets.compatibleStatus}</span>
                    </div>

                    <div className="ft-wallet-list">
                      {content.wallets.compatibleItems.map((item) => (
                        <div key={item.name} className="ft-wallet-row">
                          <span className="ft-wallet-name">{item.name}</span>
                          <span className="ft-wallet-note">{item.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ft-highlight">
                <strong>{content.wallets.highlightTitle}</strong>
                <br />
                {content.wallets.highlightText}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="trust-strip">
        <div className="ft-container">
          <div className="ft-card ft-card--plain ft-trust-strip">
            <span className="ft-eyebrow">{content.trust.eyebrow}</span>
            <div className="ft-trust-strip__inner">
              <div className="ft-trust-strip__intro">
                <h2 className="ft-subtitle">{content.trust.title}</h2>
              </div>

              <div className="ft-trust-strip__links" aria-label={content.ui.aria.verificationLinks}>
                {content.trust.links.map((link) => (
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
                <span className="ft-eyebrow">{content.howItWorks.eyebrow}</span>
              </div>
              <h2 className="ft-title-md">{content.howItWorks.title}</h2>
              <p className="ft-text">{content.howItWorks.description}</p>
            </div>

            <div className="ft-grid ft-grid--2-even ft-how-grid">
              {content.howItWorks.steps.map((item) => (
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
                  <div className="ft-step-num">{content.howItWorks.airdropStep.step}</div>
                  <div className="ft-stack ft-stack--xs">
                    <h3 className="ft-subtitle">{content.howItWorks.airdropStep.title}</h3>
                    <p className="ft-text">{content.howItWorks.airdropStep.text}</p>

                    <div className="ft-how-split">
                      {content.howItWorks.airdropStep.items.map((item) => (
                        <div key={item.value} className="ft-how-split__item">
                          <span className="ft-how-split__value">{item.value}</span>
                          <span className="ft-how-split__label">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              <article className="ft-card ft-how-card ft-how-card--full">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-step-num">{content.howItWorks.cabinetStep.step}</div>
                  <div className="ft-stack ft-stack--xs">
                    <h3 className="ft-subtitle">{content.howItWorks.cabinetStep.title}</h3>
                    <p className="ft-text">{content.howItWorks.cabinetStep.text}</p>
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
                <span className="ft-eyebrow">{content.architecture.eyebrow}</span>
              </div>
              <h2 className="ft-title-md">{content.architecture.title}</h2>
              <p className="ft-text">{content.architecture.description}</p>
            </div>

            <div className="ft-card ft-card--plain ft-arch-seq">
              <div className="ft-stack ft-stack--lg">
                <div className="ft-arch-seq-head">
                  <div className="ft-arch-seq-node">
                    <span className="ft-arch-seq-node__label">{content.architecture.entry.label}</span>
                    <strong className="ft-arch-seq-node__title">{content.architecture.entry.title}</strong>
                    <span className="ft-arch-seq-node__text">{content.architecture.entry.text}</span>
                  </div>

                  <div className="ft-arch-seq-line" aria-hidden="true" />

                  <div className="ft-arch-seq-node ft-arch-seq-node--accent">
                    <span className="ft-arch-seq-node__label">{content.architecture.core.label}</span>
                    <strong className="ft-arch-seq-node__title">{content.architecture.core.title}</strong>
                    <span className="ft-arch-seq-node__text">{content.architecture.core.text}</span>
                  </div>
                </div>

                <div className="ft-arch-core-note">
                  {content.architecture.core.pills.map((pill) => (
                    <div key={pill} className="ft-arch-core-note__item">{pill}</div>
                  ))}
                </div>

                <div className="ft-stack ft-stack--md">
                  <article className="ft-card ft-arch-path ft-arch-path--primary">
                    <div className="ft-stack ft-stack--md">
                      <div className="ft-stack ft-stack--xs">
                        <p className="ft-overline">{content.architecture.liquidity.eyebrow}</p>
                        <h3 className="ft-subtitle">{content.architecture.liquidity.title}</h3>
                        <p className="ft-text">{content.architecture.liquidity.text}</p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">{content.architecture.liquidity.controller.label}</span>
                          <strong className="ft-arch-mini-box__title">{content.architecture.liquidity.controller.title}</strong>
                          <span className="ft-arch-mini-box__text">{content.architecture.liquidity.controller.text}</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">{content.architecture.liquidity.vault.label}</span>
                          <strong className="ft-arch-mini-box__title">{content.architecture.liquidity.vault.title}</strong>
                          <span className="ft-arch-mini-box__text">{content.architecture.liquidity.vault.text}</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box ft-arch-mini-box--accent">
                          <span className="ft-arch-mini-box__label">{content.architecture.liquidity.bootstrapper.label}</span>
                          <strong className="ft-arch-mini-box__title">{content.architecture.liquidity.bootstrapper.title}</strong>
                          <span className="ft-arch-mini-box__text">{content.architecture.liquidity.bootstrapper.text}</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-executor-grid">
                          {content.architecture.liquidity.executors.map((executor) => (
                            <div key={executor.title} className="ft-arch-mini-box">
                              <span className="ft-arch-mini-box__label">{executor.label}</span>
                              <strong className="ft-arch-mini-box__title">{executor.title}</strong>
                              <span className="ft-arch-mini-box__text">{executor.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="ft-card ft-arch-path">
                    <div className="ft-stack ft-stack--md">
                      <div className="ft-stack ft-stack--xs">
                        <p className="ft-overline">{content.architecture.ambassadors.eyebrow}</p>
                        <h3 className="ft-subtitle">{content.architecture.ambassadors.title}</h3>
                        <p className="ft-text">{content.architecture.ambassadors.text}</p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">{content.architecture.ambassadors.controller.label}</span>
                          <strong className="ft-arch-mini-box__title">{content.architecture.ambassadors.controller.title}</strong>
                          <span className="ft-arch-mini-box__text">{content.architecture.ambassadors.controller.text}</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">{content.architecture.ambassadors.flow.label}</span>
                          <strong className="ft-arch-mini-box__title">{content.architecture.ambassadors.flow.title}</strong>
                          <span className="ft-arch-mini-box__text">{content.architecture.ambassadors.flow.text}</span>
                        </div>

                        <div className="ft-arch-reward-ladder">
                          <div className="ft-arch-reward-ladder__head">{content.architecture.ambassadors.ladderTitle}</div>
                          {content.architecture.ambassadors.ladder.map((row) => (
                            <div key={row.level} className="ft-arch-reward-ladder__row">
                              <span className="ft-arch-reward-ladder__level">{row.level}</span>
                              <span className="ft-arch-reward-ladder__buyers">{row.buyers}</span>
                              <span className="ft-arch-reward-ladder__percent">{row.percent}</span>
                            </div>
                          ))}
                        </div>

                        <div className="ft-note">
                          <strong>{content.architecture.ambassadors.noteTitle}:</strong> {content.architecture.ambassadors.noteText}
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="ft-card ft-arch-path">
                    <div className="ft-stack ft-stack--md">
                      <div className="ft-stack ft-stack--xs">
                        <p className="ft-overline">{content.architecture.airdrop.eyebrow}</p>
                        <h3 className="ft-subtitle">{content.architecture.airdrop.title}</h3>
                        <p className="ft-text">{content.architecture.airdrop.text}</p>
                      </div>

                      <div className="ft-arch-path-flow">
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">{content.architecture.airdrop.vault.label}</span>
                          <strong className="ft-arch-mini-box__title">{content.architecture.airdrop.vault.title}</strong>
                          <span className="ft-arch-mini-box__text">{content.architecture.airdrop.vault.text}</span>
                        </div>
                        <div className="ft-arch-connector" aria-hidden="true" />
                        <div className="ft-arch-mini-box">
                          <span className="ft-arch-mini-box__label">{content.architecture.airdrop.model.label}</span>
                          <strong className="ft-arch-mini-box__title">{content.architecture.airdrop.model.title}</strong>
                          <span className="ft-arch-mini-box__text">{content.architecture.airdrop.model.text}</span>
                        </div>
                        <div className="ft-arch-wave-pills">
                          {content.architecture.airdrop.pills.map((pill) => (
                            <span
                              key={pill.label}
                              className={`ft-status-pill ${pill.tone}`}
                            >
                              {pill.label}
                            </span>
                          ))}
                        </div>
                        <div className="ft-arch-mini-box ft-arch-mini-box--accent">
                          <span className="ft-arch-mini-box__label">{content.architecture.airdrop.liveRoute.label}</span>
                          <strong className="ft-arch-mini-box__title">{content.architecture.airdrop.liveRoute.title}</strong>
                          <span className="ft-arch-mini-box__text">{content.architecture.airdrop.liveRoute.text}</span>
                          <LoaderLink className="ft-link" href={content.architecture.airdrop.liveRoute.action.href} showLinkIcon>{content.architecture.airdrop.liveRoute.action.label}</LoaderLink>
                        </div>
                        <div className="ft-arch-snapshot">
                          <div className="ft-arch-snapshot__head">{content.architecture.airdrop.snapshotTitle}</div>
                          {content.architecture.airdrop.snapshotRows.map((row) => (
                            <div key={row.label} className="ft-arch-snapshot__row"><span className="ft-arch-snapshot__label">{row.label}</span><span className="ft-arch-snapshot__value">{row.value}</span></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="ft-arch-facts">
                  {content.architecture.facts.map((fact) => (
                    <div key={fact.label} className="ft-arch-fact"><span className="ft-arch-fact__label">{fact.label}</span><span className="ft-arch-fact__text">{fact.text}</span></div>
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
                <span className="ft-eyebrow">{content.why.eyebrow}</span>
              </div>
              <h2 className="ft-title-md">{content.why.title}</h2>
              <p className="ft-text">{content.why.description}</p>
            </div>

            <div className="ft-grid ft-grid--3 ft-why-grid">
              {content.why.cards.map((card) => (
                <article key={card.number} className="ft-card ft-why-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-why-icon">{card.number}</div>
                    <div className="ft-stack ft-stack--xs">
                      <h3 className="ft-subtitle">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </div>
                    <div className="ft-highlight ft-why-highlight">
                      <strong>{content.why.notePrefix}:</strong>
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
                <span className="ft-eyebrow">{content.liveMetrics.eyebrow}</span>
              </div>
              <h2 className="ft-title-md">{content.liveMetrics.title}</h2>
              <p className="ft-text">{content.liveMetrics.description}</p>
            </div>

            <div className="ft-grid ft-grid--4 ft-metrics-top">
              <HomePriceCards copy={content.ui.marketStrip} includeDailyRule />
            </div>

            <div className="ft-grid ft-grid--3 ft-metrics-grid">
              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs ft-metric-panel__head">
                    <p className="ft-overline">{content.liveMetrics.liquidity.eyebrow}</p>
                    <h3 className="ft-subtitle">{content.liveMetrics.liquidity.title}</h3>
                  </div>

                  <div className="ft-metric-panel__body">
                    <table className="ft-mini-table">
                      <tbody>
                        {content.liveMetrics.liquidity.rows.map((row) => (
                          <tr key={row.label}><th>{row.label}</th><td className="ft-right">{row.value}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="ft-note ft-metric-panel__foot">
                    {content.liveMetrics.liquidity.note}
                  </div>
                </div>
              </article>

              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs ft-metric-panel__head">
                    <p className="ft-overline">{content.liveMetrics.ambassadors.eyebrow}</p>
                    <h3 className="ft-subtitle">{content.liveMetrics.ambassadors.title}</h3>
                  </div>

                  <div className="ft-metric-panel__body">
                    <div className="ft-metric-ladder">
                      {content.liveMetrics.ambassadors.ladder.map((row) => (
                        <div key={row.level} className="ft-metric-ladder__row"><span className="ft-metric-ladder__level">{row.level}</span><span className="ft-metric-ladder__meta">{row.meta}</span><span className="ft-metric-ladder__value">{row.value}</span></div>
                      ))}
                    </div>
                  </div>

                  <div className="ft-note ft-metric-panel__foot">
                    {content.liveMetrics.ambassadors.note}
                  </div>
                </div>
              </article>

              <article className="ft-card ft-metric-panel">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs ft-metric-panel__head">
                    <p className="ft-overline">{content.liveMetrics.airdrop.eyebrow}</p>
                    <h3 className="ft-subtitle">{content.liveMetrics.airdrop.title}</h3>
                  </div>

                  <div className="ft-metric-panel__body">
                    <table className="ft-mini-table">
                      <tbody>
                        {content.liveMetrics.airdrop.rows.map((row) => (
                          <tr key={row.label}><th>{row.label}</th><td className="ft-right">{row.tone === "live" ? <span className="ft-status-pill live">{row.value}</span> : row.tone === "wait" ? <span className="ft-status-pill wait">{row.value}</span> : row.tone === "strong" ? <strong>{row.value}</strong> : row.value}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="ft-actions ft-actions--stack-mobile ft-metric-panel__foot">
                    <LoaderLink className="ft-btn ft-btn--secondary" href={content.liveMetrics.airdrop.action.href}>{content.liveMetrics.airdrop.action.label}</LoaderLink>
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
                <span className="ft-eyebrow">{content.tools.eyebrow}</span>
              </div>
              <h2 className="ft-title-md">{content.tools.title}</h2>
              <p className="ft-text">{content.tools.description}</p>
            </div>

            <div className="ft-grid ft-grid--4 ft-tools-grid">
              {content.tools.cards.map((card) => (
                <LoaderLink key={card.href} className="ft-tool-card" href={card.href}>
                  <span className={`ft-tool-card__status ft-status-pill ${card.tone}`}>{card.status}</span>
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">{card.title}</h3>
                    <p className="ft-text">{card.text}</p>
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
                <span className="ft-eyebrow">{content.verification.eyebrow}</span>
              </div>
              <h2 className="ft-title-md">{content.verification.title}</h2>
              <p className="ft-text">{content.verification.description}</p>
            </div>

            <div className="ft-grid ft-grid--2-even ft-verify-main-grid">
              <article className="ft-card ft-verify-card ft-verify-card--contracts">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.verification.contracts.eyebrow}</p>
                    <h3 className="ft-subtitle">{content.verification.contracts.title}</h3>
                  </div>

                  <div className="ft-verify-list">
                    {content.verification.contracts.links.map((link) => (
                      <CopyLinkRow key={link.href} href={link.href} label={link.label} value={link.value} />
                    ))}
                  </div>
                </div>
              </article>

              <article className="ft-card ft-verify-card">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.verification.repositories.eyebrow}</p>
                    <h3 className="ft-subtitle">{content.verification.repositories.title}</h3>
                  </div>

                  <div className="ft-verify-list">
                    {content.verification.repositories.links.map((link) => (
                      <CopyLinkRow key={link.href} href={link.href} label={link.label} value={link.value} />
                    ))}
                  </div>
                </div>
              </article>
            </div>

            <div className="ft-grid ft-grid--2-even ft-verify-secondary-grid">
              <article className="ft-card ft-verify-card">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.verification.docs.eyebrow}</p>
                    <h3 className="ft-subtitle">{content.verification.docs.title}</h3>
                  </div>

                  <div className="ft-verify-list">
                    {content.verification.docs.links.map((link) => (
                      <LoaderLink key={link.href} className="ft-verify-link" href={link.href} showLinkIcon><span className="ft-verify-link__copy"><span className="ft-verify-link__label">{link.label}</span><span className="ft-verify-link__value">{link.value}</span></span></LoaderLink>
                    ))}
                  </div>
                </div>
              </article>

              <article className="ft-card ft-verify-card">
                <div className="ft-stack ft-stack--md">
                  <div className="ft-stack ft-stack--xs">
                    <p className="ft-overline">{content.verification.hubs.eyebrow}</p>
                    <h3 className="ft-subtitle">{content.verification.hubs.title}</h3>
                  </div>

                  <div className="ft-verify-list">
                    {content.verification.hubs.links.map((link) => (
                      <LoaderLink key={link.href} className="ft-verify-link" href={link.href} showLinkIcon><span className="ft-verify-link__copy"><span className="ft-verify-link__label">{link.label}</span><span className="ft-verify-link__value">{link.value}</span></span></LoaderLink>
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
                <span className="ft-eyebrow">{content.faq.eyebrow}</span>
              </div>
              <h2 className="ft-title-md">{content.faq.title}</h2>
              <p className="ft-text">{content.faq.description}</p>
            </div>

            <div className="ft-faq-list">
              {content.faq.items.map((item, index) => (
                <details key={item.question} className="ft-faq-item" open={index === 0}>
                  <summary className="ft-faq-question">{item.question}</summary>
                  <div className="ft-faq-answer">
                    <p className="ft-text">{item.answer}</p>
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
                  <span className="ft-eyebrow">{content.risk.eyebrow}</span>
                </div>
                <h2 className="ft-title-md">{content.risk.title}</h2>
                <p className="ft-text">{content.risk.description}</p>
              </div>

              <div className="ft-grid ft-grid--2-even ft-risk-grid">
                <div className="ft-card ft-card--soft">
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">{content.risk.understandTitle}</h3>
                    <ul className="ft-list">
                      {content.risk.understandItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="ft-card ft-card--soft">
                  <div className="ft-stack ft-stack--sm">
                    <h3 className="ft-subtitle">{content.risk.actionTitle}</h3>
                    <ul className="ft-list">
                      {content.risk.actionItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ft-note">
                <strong>{content.risk.noteTitle}:</strong> {content.risk.noteText}
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
                  <span className="ft-eyebrow">{content.cta.eyebrow}</span>
                </div>
                <h2 className="ft-title-lg">{content.cta.title}</h2>
                <p className="ft-lead">{content.cta.lead}</p>
              </div>

              <div className="ft-grid ft-grid--4 ft-final-cta__grid">
                {content.cta.cards.map((card) => (
                  <LoaderLink key={card.href} className="ft-final-cta__card" href={card.href}>
                    <span className="ft-status-pill live">{card.status}</span>
                    <div className="ft-stack ft-stack--sm">
                      <h3 className="ft-subtitle">{card.title}</h3>
                      <p className="ft-text">{card.text}</p>
                    </div>
                  </LoaderLink>
                ))}
              </div>

              <div className="ft-actions ft-actions--stack-mobile ft-final-cta__actions">
                <LoaderLink className="ft-btn ft-btn--primary" href={content.cta.actions[0].href}>{content.cta.actions[0].label}</LoaderLink>
                <LoaderLink className="ft-btn ft-btn--secondary" href={content.cta.actions[1].href}>{content.cta.actions[1].label}</LoaderLink>
                <LoaderLink className="ft-btn ft-btn--ghost" href={content.cta.actions[2].href}>{content.cta.actions[2].label}</LoaderLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
