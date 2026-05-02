import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { LoaderLink } from "@/components/site/loader-link";
import { FourteenTopbar } from "@/components/site/topbar";
import {
  getWhitepaperPageContent,
  getWhitepaperVersionDocument,
  whitepaperVersionOrder,
  type WhitepaperVersionSlug,
} from "@/content/whitepaper-content";
import { defaultSiteLocale } from "@/lib/site-locale";

export function WhitepaperVersionPage({
  slug,
}: {
  slug: WhitepaperVersionSlug;
}) {
  const locale = defaultSiteLocale;
  const content = getWhitepaperPageContent(locale);
  const document = getWhitepaperVersionDocument(locale, slug);

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
                <span className={`ft-status-pill ${slug === "v1-3" ? "live" : ""}`}>
                  {document.version}
                </span>
                <span className="ft-status-pill">{document.date}</span>
                <span className="ft-status-pill">{document.status}</span>
              </div>

              <div className="ft-stack ft-stack--md">
                <h1 className="ft-title-lg">{document.title}</h1>
                <p className="ft-lead">{document.lead}</p>
              </div>
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-whitepaper-page__switcher-panel">
            <div className="ft-stack ft-stack--md">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.versionPicker.eyebrow}</p>
                <h2 className="ft-subtitle">{content.versionPicker.title}</h2>
              </div>

              <p className="ft-text">{content.versionPicker.body}</p>

              <div className="ft-grid ft-grid--4 ft-whitepaper-page__switcher-grid">
                {whitepaperVersionOrder.map((versionSlug) => {
                  const version = content.versions[versionSlug];
                  const active = versionSlug === slug;

                  return (
                    <LoaderLink
                      key={version.slug}
                      className={`ft-card ft-card--plain ft-whitepaper-page__switcher-card${active ? " is-active" : ""}`}
                      href={version.href}
                    >
                      <p className="ft-card-title-top">{version.version}</p>
                      <h3 className="ft-card-title">{version.date}</h3>
                      <p className="ft-text">{version.lead}</p>
                    </LoaderLink>
                  );
                })}
              </div>
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-whitepaper-page__document-card">
            <div className="ft-stack ft-stack--md">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-overline">{content.document.eyebrow}</p>
                <h2 className="ft-subtitle">
                  {document.version} • {document.title}
                </h2>
              </div>

              <p className="ft-text">{content.document.body}</p>

              <pre className="ft-whitepaper-page__document-pre">{document.rawDocument}</pre>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
