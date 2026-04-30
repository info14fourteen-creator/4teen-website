import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import { getHomePageContent } from "@/content/home-content";
import type { SupportedSiteLocale } from "@/lib/site-locale";

function SmartLink({
  href,
  label,
  external,
  className,
}: {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
}) {
  if (external) {
    return (
      <a
        className={className}
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {label}
      </a>
    );
  }

  return (
    <LoaderLink className={className} href={href}>
      {label}
    </LoaderLink>
  );
}

export function HomePage({
  locale,
}: {
  locale: SupportedSiteLocale;
}) {
  const content = getHomePageContent(locale);

  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--tight ft-home-hero" id="home-hero">
        <div className="ft-container--wide">
          <div className="ft-home-hero__grid">
            <div className="ft-home-hero__copy">
              <div className="ft-stack ft-stack--lg">
                <div className="ft-stack ft-stack--sm">
                  <span className="ft-eyebrow">{content.hero.eyebrow}</span>
                  <h1 className="ft-title-xl ft-home-hero__title">
                    {content.hero.title}
                  </h1>
                  <p className="ft-lead ft-home-hero__lead">{content.hero.lead}</p>
                  <p className="ft-text ft-home-hero__body">{content.hero.body}</p>
                </div>

                <div className="ft-home-hero__actions">
                  {content.hero.actions.map((action) => (
                    <LoaderLink
                      key={action.href}
                      className={
                        action.href === "/buy"
                          ? "ft-btn ft-btn--primary"
                          : "ft-btn ft-btn--secondary"
                      }
                      href={action.href}
                    >
                      {action.label}
                    </LoaderLink>
                  ))}
                </div>

                <div className="ft-home-hero__points">
                  {content.hero.points.map((point) => (
                    <div key={point} className="ft-home-hero__point">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="ft-card ft-card--strong ft-home-hero__rail">
              <div className="ft-stack ft-stack--lg">
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-overline">{content.hero.railEyebrow}</p>
                  <h2 className="ft-subtitle">{content.hero.railTitle}</h2>
                  <p className="ft-text">{content.hero.railText}</p>
                </div>

                <div className="ft-home-hero__stats">
                  {content.hero.railStats.map((stat) => (
                    <div key={stat.label} className="ft-home-hero__stat">
                      <span className="ft-home-hero__stat-label">{stat.label}</span>
                      <span className="ft-home-hero__stat-value">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="ft-home-hero__trust">
                  {content.hero.trustLinks.map((link) => (
                    <SmartLink
                      key={link.href}
                      className="ft-home-hero__trust-link"
                      external={"external" in link}
                      href={link.href}
                      label={link.label}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact">
        <div className="ft-container--wide">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <span className="ft-eyebrow">{content.difference.eyebrow}</span>
              <h2 className="ft-title-md">{content.difference.title}</h2>
              <p className="ft-text">{content.difference.description}</p>
            </div>

            <div className="ft-home-diff-grid">
              {content.difference.cards.map((card) => (
                <article key={card.title} className="ft-card ft-home-diff-card">
                  <div className="ft-stack ft-stack--sm">
                    <p className="ft-overline">{card.kicker}</p>
                    <h3 className="ft-subtitle">{card.title}</h3>
                    <p className="ft-text">{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact">
        <div className="ft-container--wide">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <span className="ft-eyebrow">{content.system.eyebrow}</span>
              <h2 className="ft-title-md">{content.system.title}</h2>
              <p className="ft-text">{content.system.description}</p>
            </div>

            <div className="ft-home-system-grid">
              {content.system.paths.map((path) => (
                <article key={path.title} className="ft-card ft-home-system-card">
                  <div className="ft-stack ft-stack--md">
                    <div className="ft-home-system-card__head">
                      <span className="ft-home-system-card__share">{path.share}</span>
                      <div className="ft-stack ft-stack--xs">
                        <h3 className="ft-subtitle">{path.title}</h3>
                        <p className="ft-text">{path.text}</p>
                      </div>
                    </div>

                    <div className="ft-home-system-card__list">
                      {path.points.map((point) => (
                        <div key={point} className="ft-home-system-card__item">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact">
        <div className="ft-container--wide">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <span className="ft-eyebrow">{content.surfaces.eyebrow}</span>
              <h2 className="ft-title-md">{content.surfaces.title}</h2>
              <p className="ft-text">{content.surfaces.description}</p>
            </div>

            <div className="ft-home-surface-grid">
              {content.surfaces.cards.map((card) => (
                <LoaderLink
                  key={card.href}
                  className="ft-home-surface-card"
                  href={card.href}
                >
                  <span className="ft-home-surface-card__meta">{card.meta}</span>
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

      <section className="ft-section ft-section--compact">
        <div className="ft-container">
          <div className="ft-card ft-card--plain ft-home-wallets">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-stack ft-stack--sm">
                <span className="ft-eyebrow">{content.wallets.eyebrow}</span>
                <h2 className="ft-title-md">{content.wallets.title}</h2>
                <p className="ft-text">{content.wallets.description}</p>
              </div>

              <div className="ft-home-wallets__grid">
                <div className="ft-card ft-home-wallets__card">
                  <div className="ft-stack ft-stack--sm">
                    <p className="ft-overline">{content.wallets.recommendedTitle}</p>
                    <div className="ft-home-wallets__list">
                      {content.wallets.recommended.map((wallet) => (
                        <div key={wallet} className="ft-home-wallets__row">
                          {wallet}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ft-card ft-home-wallets__card">
                  <div className="ft-stack ft-stack--sm">
                    <p className="ft-overline">{content.wallets.compatibleTitle}</p>
                    <div className="ft-home-wallets__list">
                      {content.wallets.compatible.map((wallet) => (
                        <div key={wallet} className="ft-home-wallets__row">
                          {wallet}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ft-note">{content.wallets.note}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact">
        <div className="ft-container--wide">
          <div className="ft-stack ft-stack--lg">
            <div className="ft-stack ft-stack--sm">
              <span className="ft-eyebrow">{content.verification.eyebrow}</span>
              <h2 className="ft-title-md">{content.verification.title}</h2>
              <p className="ft-text">{content.verification.description}</p>
            </div>

            <div className="ft-home-verify-grid">
              {content.verification.groups.map((group) => (
                <article
                  key={group.title}
                  className="ft-card ft-home-verify-card"
                >
                  <div className="ft-stack ft-stack--md">
                    <p className="ft-overline">{group.title}</p>
                    <div className="ft-home-verify-card__links">
                      {group.links.map((link) => (
                        <SmartLink
                          key={link.href}
                          className="ft-home-verify-card__link"
                          external={"external" in link}
                          href={link.href}
                          label={link.label}
                        />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact">
        <div className="ft-container--wide">
          <div className="ft-home-faq-grid">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-stack ft-stack--sm">
                <span className="ft-eyebrow">{content.faq.eyebrow}</span>
                <h2 className="ft-title-md">{content.faq.title}</h2>
                <p className="ft-text">{content.faq.description}</p>
              </div>

              <div className="ft-faq-list">
                {content.faq.items.map((item, index) => (
                  <details
                    key={item.question}
                    className="ft-faq-item"
                    open={index === 0}
                  >
                    <summary className="ft-faq-question">
                      {item.question}
                    </summary>
                    <div className="ft-faq-answer">
                      <p className="ft-text">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <aside className="ft-card ft-card--soft ft-home-risk-card">
              <div className="ft-stack ft-stack--md">
                <p className="ft-overline">Risk / disclosure</p>
                <h3 className="ft-subtitle">{content.faq.riskTitle}</h3>
                <p className="ft-text">{content.faq.riskText}</p>
                <ul className="ft-list">
                  {content.faq.riskBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--tight">
        <div className="ft-container">
          <div className="ft-card ft-card--strong ft-home-cta">
            <div className="ft-stack ft-stack--lg">
              <div className="ft-stack ft-stack--sm">
                <span className="ft-eyebrow">{content.cta.eyebrow}</span>
                <h2 className="ft-title-lg">{content.cta.title}</h2>
                <p className="ft-lead">{content.cta.lead}</p>
              </div>

              <div className="ft-actions ft-actions--stack-mobile">
                {content.cta.actions.map((action, index) => (
                  <LoaderLink
                    key={action.href}
                    className={
                      index === 0
                        ? "ft-btn ft-btn--primary"
                        : index === 1
                          ? "ft-btn ft-btn--secondary"
                          : "ft-btn ft-btn--ghost"
                    }
                    href={action.href}
                  >
                    {action.label}
                  </LoaderLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
