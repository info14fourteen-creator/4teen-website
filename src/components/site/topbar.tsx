import Link from "next/link";

const marketingLinks = [
  { href: "#adaptive", label: "Adaptive" },
  { href: "#modules", label: "Modules" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#stack", label: "Stack" },
];

const appLinks = [
  { href: "/app", label: "Overview" },
  { href: "#wallet", label: "Wallet" },
  { href: "#ambassadors", label: "Ambassadors" },
  { href: "#activity", label: "Activity" },
];

export function FourteenTopbar({ appMode = false }: { appMode?: boolean }) {
  const links = appMode ? appLinks : marketingLinks;

  return (
    <header className="ft-topbar">
      <div className="ft-brand">
        <span className="ft-brand-mark">4TEEN</span>
        <span className="ft-brand-sub">
          {appMode ? "Application shell" : "App-like website foundation"}
        </span>
      </div>

      <nav className="ft-nav">
        {links.map((link) =>
          link.href.startsWith("/") ? (
            <Link key={link.href} className="ft-nav-link" href={link.href}>
              {link.label}
            </Link>
          ) : (
            <a key={link.href} className="ft-nav-link" href={link.href}>
              {link.label}
            </a>
          ),
        )}
      </nav>

      <div className="ft-cluster ft-cluster--sm">
        <span className="ft-status-pill wait">Cloudflare live</span>
        <Link
          className="ft-btn ft-btn--primary ft-pulse-cta"
          href={appMode ? "/" : "/app"}
        >
          {appMode ? "Landing" : "Open app"}
        </Link>
      </div>
    </header>
  );
}
