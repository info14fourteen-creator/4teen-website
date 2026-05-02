import type { Metadata } from "next";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import {
  officialContractsRepoUrl,
  officialWalletRepoUrl,
} from "@/content/official-links";
import {
  getWhitepaperPageContent,
  type WhitepaperSection,
  type WhitepaperVersion,
} from "@/content/whitepaper-content";
import { defaultSiteLocale } from "@/lib/site-locale";

const metadataContent = getWhitepaperPageContent(defaultSiteLocale);

export const metadata: Metadata = metadataContent.metadata;

function WhitepaperSectionBlock({
  section,
  compact = false,
}: {
  section: WhitepaperSection;
  compact?: boolean;
}) {
  return (
    <article
      className={`ft-card ${compact ? "ft-card--plain" : "ft-card--strong"} ft-whitepaper-page__section-card`}
      id={section.id}
    >
      <div className="ft-stack ft-stack--md">
        <div className="ft-stack ft-stack--xs">
          <p className="ft-overline">{section.eyebrow}</p>
          <h2 className="ft-subtitle">{section.title}</h2>
        </div>

        {section.highlight ? (
          <div className="ft-highlight">
            <strong>{section.highlight.title}</strong>
            <br />
            {section.highlight.body}
          </div>
        ) : null}

        {section.table?.length ? (
          <table className="ft-mini-table ft-whitepaper-page__table">
            <tbody>
              {section.table.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  <td className="ft-right">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {section.body?.map((paragraph) => (
          <p key={paragraph} className="ft-text">
            {paragraph}
          </p>
        ))}

        {section.bullets?.length ? (
          <ul className="ft-list ft-whitepaper-page__list">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}

        {section.cards?.length ? (
          <div className="ft-grid ft-grid--2-even ft-whitepaper-page__cards-grid">
            {section.cards.map((card) => (
              <article
                key={`${card.title}:${card.text}`}
                className="ft-card ft-card--plain ft-whitepaper-page__detail-card"
              >
                {card.eyebrow ? <p className="ft-card-title-top">{card.eyebrow}</p> : null}
                <h3 className="ft-card-title">{card.title}</h3>
                <p className="ft-text">{card.text}</p>
              </article>
            ))}
          </div>
        ) : null}

        {section.note ? <p className="ft-note">{section.note}</p> : null}
      </div>
    </article>
  );
}

function VersionArticle({
  version,
  compact = false,
}: {
  version: WhitepaperVersion;
  compact?: boolean;
}) {
  return (
    <section className="ft-stack ft-stack--lg" id={version.id}>
      <article className="ft-card ft-card--strong ft-whitepaper-page__version-hero">
        <div className="ft-stack ft-stack--lg">
          <div className="ft-cluster ft-cluster--sm">
            <span className="ft-eyebrow">4TEEN Whitepaper</span>
            <span className={`ft-status-pill ${compact ? "idle" : "live"}`}>
              {version.version} • {version.date}
            </span>
            <span className="ft-status-pill">{version.status}</span>
          </div>

          <div className="ft-stack ft-stack--sm">
            <h2 className={compact ? "ft-title-md" : "ft-title-lg"}>{version.title}</h2>
            <p className="ft-lead">{version.lead}</p>
          </div>

          <div className="ft-grid ft-grid--4 ft-whitepaper-page__summary-grid">
            {version.summaryCards.map((card) => (
              <article
                key={`${version.version}:${card.label}`}
                className="ft-price-card ft-whitepaper-page__summary-card"
              >
                <p className="ft-price-label">{card.label}</p>
                <p className="ft-price-main">{card.value}</p>
                <p className="ft-price-sub">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </article>

      {!compact ? (
        <article className="ft-card ft-card--plain ft-whitepaper-page__toc-panel">
          <div className="ft-stack ft-stack--sm">
            <p className="ft-overline">Table of Contents</p>
            <div className="ft-whitepaper-page__toc">
              {version.sections.map((section) => (
                <a key={section.id} className="ft-link" href={`#${section.id}`}>
                  {section.eyebrow}
                </a>
              ))}
            </div>
          </div>
        </article>
      ) : null}

      <div className="ft-stack ft-stack--lg">
        {version.sections.map((section) => (
          <WhitepaperSectionBlock
            key={`${version.version}:${section.id}`}
            compact={compact}
            section={section}
          />
        ))}
      </div>
    </section>
  );
}

export default function WhitepaperPage() {
  const locale = defaultSiteLocale;
  const content = getWhitepaperPageContent(locale);

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome ft-whitepaper-page">
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

              <div className="ft-grid ft-grid--4 ft-whitepaper-page__summary-grid">
                {content.hero.summaryCards.map((card) => (
                  <article
                    key={`hero:${card.label}`}
                    className="ft-price-card ft-whitepaper-page__summary-card"
                  >
                    <p className="ft-price-label">{card.label}</p>
                    <p className="ft-price-main">{card.value}</p>
                    <p className="ft-price-sub">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-whitepaper-page__archive-panel">
            <div className="ft-stack ft-stack--md">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.hero.archiveTitle}</p>
                <h2 className="ft-subtitle">Current document plus preserved history</h2>
              </div>

              <p className="ft-text">{content.hero.archiveBody}</p>

              <div className="ft-grid ft-grid--4 ft-whitepaper-page__archive-grid">
                {content.hero.archiveCards.map((card) => (
                  <a
                    key={card.href}
                    className="ft-card ft-card--plain ft-whitepaper-page__archive-card"
                    href={card.href}
                  >
                    <p className="ft-card-title-top">{card.label}</p>
                    <h3 className="ft-card-title">{card.text}</h3>
                  </a>
                ))}
              </div>
            </div>
          </article>

          <VersionArticle version={content.current} />

          <section className="ft-stack ft-stack--lg" id="wp-history">
            <article className="ft-card ft-card--plain ft-whitepaper-page__history-intro">
              <div className="ft-stack ft-stack--sm">
                <p className="ft-overline">{content.archive.eyebrow}</p>
                <h2 className="ft-title-md">{content.archive.title}</h2>
                <p className="ft-text">{content.archive.body}</p>
              </div>
            </article>

            {content.archive.versions.map((version) => (
              <VersionArticle key={version.id} compact version={version} />
            ))}
          </section>

          <article className="ft-card ft-card--plain ft-whitepaper-page__links-panel">
            <div className="ft-stack ft-stack--sm">
              <p className="ft-overline">{content.links.verificationTitle}</p>
              <p className="ft-text">{content.links.verificationBody}</p>

              <div className="ft-actions ft-actions--stack-mobile">
                <LoaderLink className="ft-btn ft-btn--primary" href="/verification">
                  {content.links.explorer}
                </LoaderLink>
                <a
                  className="ft-btn ft-btn--secondary"
                  href={officialContractsRepoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.links.contractsRepo}
                </a>
                <a
                  className="ft-btn ft-btn--secondary"
                  href={officialWalletRepoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.links.walletRepo}
                </a>
                <LoaderLink className="ft-btn ft-btn--ghost" href="/buy">
                  {content.links.verificationRoute}
                </LoaderLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
