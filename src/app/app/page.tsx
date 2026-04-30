import { FourteenMobileShell } from "@/components/site/mobile-shell";
import { FourteenTopbar } from "@/components/site/topbar";

const sidebarItems = ["Overview", "Wallet", "Ambassadors", "Activity", "Settings"];

const metrics = [
  { label: "Wallet state", value: "Pending", tone: "ft-status-wait" },
  { label: "Ambassador module", value: "Prepared", tone: "ft-meta-green" },
  { label: "Activity feed", value: "Planned", tone: "ft-status-wait" },
];

export default function AppPreviewPage() {
  return (
    <main className="ft-theme">
      <FourteenMobileShell appMode />

      <section className="ft-section ft-section--hero">
        <div className="ft-container--wide ft-stack ft-stack--xl">
          <FourteenTopbar appMode />

          <div className="ft-grid ft-grid--shell">
            <aside className="ft-sidebar" id="wallet">
              <div className="ft-stack ft-stack--lg">
                <div>
                  <p className="ft-card-title-top">Application map</p>
                  <h1 className="ft-title-sm">4TEEN control room</h1>
                </div>

                <nav className="ft-sidebar-nav">
                  {sidebarItems.map((item, index) => (
                    <span
                      key={item}
                      className={`ft-sidebar-link ${index === 0 ? "is-active" : ""}`}
                    >
                      <span>{item}</span>
                      <span className="ft-device-label">v1</span>
                    </span>
                  ))}
                </nav>

                <div className="ft-note">
                  Mobile gets a fixed shell. Tablet collapses this rail into a
                  stacked block. Desktop and laptop keep it as a left command
                  lane.
                </div>
              </div>
            </aside>

            <section className="ft-screen">
              <article className="ft-card ft-card--soft ft-glow">
                <div className="ft-cluster ft-cluster--sm">
                  <span className="ft-status-pill live">New shell live</span>
                  <span className="ft-status-pill wait">Runtime integration next</span>
                </div>

                <div className="ft-stack ft-stack--md">
                  <h2 className="ft-title-lg">App surface prepared for real flows.</h2>
                  <p className="ft-lead">
                    This route is the product-facing shell where wallet state,
                    ambassador metrics, and activity will land after migration
                    from <code>4teen-wallet-app</code>.
                  </p>
                </div>
              </article>

              <div className="ft-screen-row">
                <article className="ft-card ft-card--strong" id="ambassadors">
                  <p className="ft-card-title-top">Wallet block</p>
                  <h3 className="ft-subtitle">Connect + balances + actions</h3>
                  <p className="ft-text">
                    Reserved for wallet-kit connect, address state, balances,
                    and the first app-level actions.
                  </p>
                </article>

                <article className="ft-card ft-card--plain" id="activity">
                  <p className="ft-card-title-top">Ambassador block</p>
                  <h3 className="ft-subtitle">Dashboard + referral state</h3>
                  <p className="ft-text">
                    Reserved for referrals, attribution visibility, dashboard
                    cards, and payout-adjacent status.
                  </p>
                </article>
              </div>

              <div className="ft-grid ft-grid--3">
                {metrics.map((metric) => (
                  <article key={metric.label} className="ft-card ft-card--plain">
                    <p className="ft-card-title-top">{metric.label}</p>
                    <p className={`ft-stat ${metric.tone}`}>{metric.value}</p>
                    <p className="ft-text">
                      Placeholder until the matching module is wired to real app
                      data.
                    </p>
                  </article>
                ))}
              </div>

              <article className="ft-card">
                <p className="ft-card-title-top">Responsive shell policy</p>
                <div className="ft-price-strip">
                  <div>
                    <p className="ft-price-label">Desktop</p>
                    <p className="ft-price-main">Full dual-pane</p>
                    <p className="ft-price-sub">Persistent sidebar and richer dashboard cards.</p>
                  </div>
                  <div>
                    <p className="ft-price-label">Tablet</p>
                    <p className="ft-price-main">Stacked rails</p>
                    <p className="ft-price-sub">Sidebar becomes a content block above the screen.</p>
                  </div>
                  <div>
                    <p className="ft-price-label">Phone</p>
                    <p className="ft-price-main">Mobile shell</p>
                    <p className="ft-price-sub">Bottom nav and top actions stay fixed for fast movement.</p>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
