import type { ReactNode } from "react";

import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import type { PublicPageCard, PublicPageContent, PublicPageSection } from "@/content/public-pages-content";

function SummaryCard({ card }: { card: PublicPageCard }) {
  return (
    <article className="ft-price-card">
      <p className="ft-price-label">{card.eyebrow}</p>
      <p className="ft-price-main">{card.title}</p>
      <p className="ft-price-sub">{card.body}</p>
    </article>
  );
}

function SectionBlock({ section }: { section: PublicPageSection }) {
  return (
    <article className="ft-card ft-public-page__panel">
      <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
        <div className="ft-stack ft-stack--xs">
          <p className="ft-overline">{section.eyebrow}</p>
          <h2 className="ft-subtitle">{section.title}</h2>
        </div>

        {section.body ? <p className="ft-text">{section.body}</p> : null}

        {section.bullets?.length ? (
          <ul className="ft-list ft-public-page__list">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}

        {section.note ? <p className="ft-note">{section.note}</p> : null}
      </div>
    </article>
  );
}

export function PublicPageShell({
  pageClassName,
  content,
  children,
}: {
  pageClassName: string;
  content: PublicPageContent;
  children?: ReactNode;
}) {
  return (
    <main className={`ft-theme ft-page-main ft-page-main--chrome ft-public-page ${pageClassName}`}>
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

              <div className="ft-grid ft-grid--3 ft-public-page__hero-stats">
                {content.summaryCards.map((card) => (
                  <SummaryCard key={`${card.eyebrow}:${card.title}`} card={card} />
                ))}
              </div>
            </div>
          </article>

          <div className="ft-grid ft-grid--2-even ft-public-page__section-grid">
            {content.sections.map((section) => (
              <SectionBlock key={`${section.eyebrow}:${section.title}`} section={section} />
            ))}
          </div>

          {children}

          {content.links?.length ? (
            <article className="ft-card ft-card--plain ft-public-page__links-panel">
              <div className="ft-stack ft-stack--sm">
                {content.linksEyebrow ? (
                  <p className="ft-overline">{content.linksEyebrow}</p>
                ) : null}
                <div className="ft-actions ft-actions--stack-mobile ft-public-page__links-actions">
                  {content.links.map((link) =>
                    link.href.startsWith("/") ? (
                      <LoaderLink key={link.label} className="ft-btn ft-btn--secondary" href={link.href}>
                        {link.label}
                      </LoaderLink>
                    ) : (
                      <LoaderLink
                        key={link.label}
                        className="ft-btn ft-btn--ghost"
                        href={link.href}
                        rel="noopener noreferrer"
                        showLinkIcon
                        target="_blank"
                      >
                        {link.label}
                      </LoaderLink>
                    ),
                  )}
                </div>
                {content.footerNote ? <p className="ft-note">{content.footerNote}</p> : null}
              </div>
            </article>
          ) : null}
        </div>
      </section>
    </main>
  );
}
