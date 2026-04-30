import Link from "next/link";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { FourteenTopbar } from "@/components/site/topbar";
import type { PlaceholderPageData } from "@/lib/site-pages";

export function PlaceholderPage({ page }: { page: PlaceholderPageData }) {
  return (
    <main className="ft-theme ft-page-main ft-page-main--chrome">
      <FourteenMobileShell />
      <FourteenTopbar />

      <section className="ft-section ft-section--hero ft-placeholder-route">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <div className="ft-stack ft-stack--xl">
            <article className="ft-card ft-card--strong ft-placeholder-hero">
              <div className="ft-stack ft-stack--lg">
                <div className="ft-cluster ft-cluster--sm">
                  <span className="ft-eyebrow">{page.eyebrow}</span>
                  <span className="ft-status-pill wait">{page.status}</span>
                </div>

                <div className="ft-stack ft-stack--md">
                  <h1 className="ft-title-lg">{page.title}</h1>
                  <p className="ft-lead">{page.description}</p>
                </div>

                <div className="ft-actions ft-actions--stack-mobile">
                  <Link className="ft-btn ft-btn--primary" href="/">
                    Back Home
                  </Link>
                  <Link className="ft-btn ft-btn--secondary" href="/buy">
                    Open Buy Surface
                  </Link>
                </div>
              </div>
            </article>

            <div className="ft-grid ft-grid--3 ft-placeholder-grid">
              {page.sections.map((section) => (
                <article key={section.title} className="ft-card ft-card--plain">
                  <p className="ft-card-title-top">{page.eyebrow}</p>
                  <h2 className="ft-card-title">{section.title}</h2>
                  <p className="ft-text">{section.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
