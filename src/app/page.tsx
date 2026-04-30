import Link from "next/link";
import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { FourteenTopbar } from "@/components/site/topbar";

const deviceCards = [
  {
    device: "Desktop",
    title: "Wide command center",
    text: "Max-width hero, dual-pane app canvas, more simultaneous context, and richer hover interactions.",
  },
  {
    device: "Laptop",
    title: "Dense but controlled",
    text: "The same product feeling compressed into cleaner lanes, tighter spacing, and shorter side rails.",
  },
  {
    device: "Tablet",
    title: "Stacked composition",
    text: "Cards move into a readable vertical rhythm with touch-safe controls and section-based navigation.",
  },
  {
    device: "Phone",
    title: "Shell-first mobile",
    text: "Fixed topbar, bottom action rail, simplified panels, and direct paths into wallet and ambassador flows.",
  },
];

const modules = [
  {
    title: "Wallet entry",
    copy: "Reserved space for wallet-kit connect, balances, network state, and action triggers coming from 4teen-wallet-app.",
  },
  {
    title: "Ambassador surface",
    copy: "Referral capture, attribution visibility, onboarding, and dashboard routes aligned with the migrated product logic.",
  },
  {
    title: "Product shell",
    copy: "One visual system for marketing, dashboard entry, and future account-aware experiences on the same stack.",
  },
];

const roadmap = [
  {
    step: "01",
    title: "Design system",
    text: "Tokens, grid, cards, actions, top chrome, and mobile shell across 4 device classes.",
  },
  {
    step: "02",
    title: "App routes",
    text: "Landing, app shell, health endpoint, and prepared modules for wallet and ambassador screens.",
  },
  {
    step: "03",
    title: "Integration layer",
    text: "Bring over wallet runtime, dashboard data contracts, and referral flows from 4teen-wallet-app.",
  },
];

const stackRows = [
  ["Runtime", "Cloudflare Workers + OpenNext"],
  ["Framework", "Next.js 16 app router"],
  ["Responsive target", "Desktop, laptop, tablet, phone"],
  ["Current domain state", "4teen.me and www.4teen.me live on the new worker"],
];

export default function Home() {
  return (
    <main className="ft-theme">
      <FourteenMobileShell />

      <section className="ft-section ft-section--hero">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <FourteenTopbar />

          <div className="ft-grid ft-grid--hero">
            <div className="ft-hero-panel ft-stack ft-stack--xl ft-glow">
              <div className="ft-cluster ft-cluster--sm">
                <span className="ft-eyebrow">4teen.me live</span>
                <span className="ft-badge ft-badge--soft">Cloudflare edge</span>
                <span className="ft-badge ft-badge--soft">Next.js app-like site</span>
              </div>

              <div className="ft-stack ft-stack--lg">
                <h1 className="ft-title-xl">
                  New 4TEEN site foundation, rebuilt for product use and tuned
                  for all four device classes.
                </h1>

                <p className="ft-lead">
                  This is no longer a brochure layer over Creatium. It is now a
                  real product shell on Cloudflare, prepared for wallet flows,
                  ambassador logic, and a cleaner entry into the ecosystem.
                </p>
              </div>

              <div className="ft-actions ft-actions--stack-mobile">
                <Link className="ft-btn ft-btn--primary ft-pulse-cta" href="/app">
                  Open app shell
                </Link>
                <a className="ft-btn ft-btn--secondary" href="#adaptive">
                  Review device system
                </a>
                <a className="ft-btn ft-btn--ghost" href="#stack">
                  Inspect stack
                </a>
              </div>

              <div className="ft-kpi-grid">
                <div className="ft-kpi">
                  <p className="ft-overline">Domain</p>
                  <p className="ft-stat">4teen.me</p>
                  <p className="ft-text">Root traffic is now intercepted by the new worker route.</p>
                </div>

                <div className="ft-kpi">
                  <p className="ft-overline">Adaptive target</p>
                  <p className="ft-stat">4 modes</p>
                  <p className="ft-text">Desktop, laptop, tablet, and phone each get explicit layout behavior.</p>
                </div>

                <div className="ft-kpi">
                  <p className="ft-overline">Migration path</p>
                  <p className="ft-stat ft-meta-green">Ready</p>
                  <p className="ft-text">Next step is pulling real wallet and ambassador logic from the app repo.</p>
                </div>
              </div>
            </div>

            <div className="ft-device-frame">
              {deviceCards.map((card) => (
                <article
                  key={card.device}
                  className="ft-device-card ft-glow"
                  data-device={card.device}
                >
                  <h2 className="ft-title-sm">{card.title}</h2>
                  <p className="ft-text">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--tight" id="adaptive">
        <div className="ft-container ft-stack ft-stack--xl">
          <div className="ft-stack ft-stack--md">
            <span className="ft-eyebrow">Adaptive system</span>
            <h2 className="ft-title-lg">
              One visual language, four explicit layout behaviors.
            </h2>
            <p className="ft-lead">
              We are not treating responsive work as a single mobile breakpoint.
              The base is now tuned separately for desktop, laptop, tablet, and
              phone so the app can feel deliberate on every screen width.
            </p>
          </div>

          <div className="ft-grid ft-grid--device">
            {deviceCards.map((card) => (
              <article key={card.device} className="ft-card ft-card--plain ft-glow">
                <div className="ft-device-note">
                  <span className="ft-device-label">{card.device}</span>
                  <span className="ft-device-copy">{card.title}</span>
                </div>

                <p className="ft-text">{card.text}</p>

                <div className="ft-note">
                  {card.device === "Desktop" &&
                    "Best for split hero, richer visual density, and multi-panel product views."}
                  {card.device === "Laptop" &&
                    "Keeps the same app feeling while compressing rails, spacing, and hierarchy."}
                  {card.device === "Tablet" &&
                    "Moves into vertical sections and touch-safe cards without losing product structure."}
                  {card.device === "Phone" &&
                    "Switches to a dedicated mobile shell with top controls and bottom navigation."}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="modules">
        <div className="ft-container ft-grid ft-grid--3">
          {modules.map((module) => (
            <article key={module.title} className="ft-card ft-card--strong ft-glow">
              <p className="ft-card-title-top">Core module</p>
              <h2 className="ft-card-title">{module.title}</h2>
              <p className="ft-text">{module.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ft-section" id="roadmap">
        <div className="ft-container ft-grid ft-grid--2">
          <div className="ft-stack ft-stack--lg">
            <span className="ft-eyebrow">Implementation order</span>
            <h2 className="ft-title-lg">
              The base is live. Now the work moves into real product surfaces.
            </h2>
            <p className="ft-lead">
              First we lock the responsive system. Then we turn the app shell
              into actual wallet-aware and ambassador-aware screens.
            </p>

            <div className="ft-flow">
              {roadmap.map((item) => (
                <div key={item.step} className="ft-step">
                  <div className="ft-step-num">{item.step}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <span className="ft-text">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ft-app-canvas ft-stack ft-stack--lg">
            <div className="ft-cluster ft-cluster--sm">
              <span className="ft-status-pill live">Landing live</span>
              <span className="ft-status-pill wait">App shell next</span>
            </div>

            <div className="ft-app-layout">
              <aside className="ft-sidebar">
                <div className="ft-stack ft-stack--lg">
                  <div>
                    <p className="ft-card-title-top">Navigation</p>
                    <h3 className="ft-subtitle">Experience lanes</h3>
                  </div>

                  <nav className="ft-sidebar-nav">
                    {["Overview", "Wallet", "Ambassadors", "Activity", "Settings"].map(
                      (item, index) => (
                        <span
                          key={item}
                          className={`ft-sidebar-link ${index === 0 ? "is-active" : ""}`}
                        >
                          <span>{item}</span>
                          <span className="ft-device-label">v1</span>
                        </span>
                      ),
                    )}
                  </nav>
                </div>
              </aside>

              <div className="ft-screen">
                <div className="ft-screen-row">
                  <article className="ft-card ft-card--soft">
                    <p className="ft-card-title-top">Surface</p>
                    <h3 className="ft-subtitle">Adaptive dashboard shell</h3>
                    <p className="ft-text">
                      The shell is designed to host real wallet state, ambassador
                      metrics, and activity, not just decorative cards.
                    </p>
                  </article>

                  <article className="ft-card ft-card--plain">
                    <p className="ft-card-title-top">Bridge</p>
                    <h3 className="ft-subtitle">Migration target</h3>
                    <p className="ft-text">
                      Existing flows from <code>4teen-wallet-app</code> plug into
                      this UI instead of living inside an isolated old website.
                    </p>
                  </article>
                </div>

                <div className="ft-screen-grid">
                  {["Connect wallet", "Open dashboard", "Review referrals"].map(
                    (item) => (
                      <article key={item} className="ft-card ft-card--plain">
                        <p className="ft-card-title-top">Action</p>
                        <h3 className="ft-subtitle">{item}</h3>
                        <p className="ft-text">
                          Placeholder block waiting for real data and runtime hooks.
                        </p>
                      </article>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--compact" id="stack">
        <div className="ft-container ft-grid ft-grid--2-even">
          <article className="ft-card ft-card--strong">
            <p className="ft-card-title-top">Delivery stack</p>
            <h2 className="ft-card-title">Cloudflare-first, product-ready base.</h2>
            <p className="ft-text">
              The site now runs on a real deployment path: Next.js app router,
              OpenNext, Workers, and a single domain layer already switched away
              from the old website surface.
            </p>
          </article>

          <article className="ft-card ft-card--plain">
            <div className="ft-table-wrap">
              <table className="ft-mini-table">
                <tbody>
                  {stackRows.map(([label, value]) => (
                    <tr key={label}>
                      <th>{label}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
