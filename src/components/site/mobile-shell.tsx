"use client";

import Link from "next/link";
import { useState } from "react";

const sectionLinks = [
  { href: "#adaptive", label: "Devices" },
  { href: "#modules", label: "Modules" },
  { href: "#roadmap", label: "Roadmap" },
];

const appLinks = [
  { href: "/", label: "Home", active: false },
  { href: "/app", label: "App", active: true },
  { href: "#adaptive", label: "Modes", active: false },
];

export function FourteenMobileShell({
  appMode = false,
}: {
  appMode?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = appMode ? appLinks : sectionLinks;

  return (
    <div data-fourteen-mobile-shell>
      <div className="mobile-shell">
        {menuOpen ? (
          <>
            <button
              aria-label="Close mobile menu"
              className="ms-overlay"
              onClick={() => setMenuOpen(false)}
              type="button"
            />

            <div className="ms-menu-panel">
              {links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    className="ms-menu-link"
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="ft-device-label">Open</span>
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    className="ms-menu-link"
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="ft-device-label">Jump</span>
                  </a>
                ),
              )}
            </div>
          </>
        ) : null}

        <div className="ms-topbar">
          <div className="ft-brand">
            <span className="ft-brand-mark">4TEEN</span>
            <span className="ft-brand-sub">
              {appMode ? "App shell" : "Adaptive web"}
            </span>
          </div>

          <div className="ms-top-actions">
            <button
              aria-expanded={menuOpen}
              aria-label="Open mobile menu"
              className="ms-burger"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              {menuOpen ? "×" : "≡"}
            </button>
          </div>
        </div>

        <div className="ms-bottombar">
          {links.map((link) => {
            const isActive = "active" in link ? link.active : false;

            return link.href.startsWith("/") ? (
              <Link
                key={link.href}
                className={`ms-bottom-link ${isActive ? "is-active" : ""}`}
                href={link.href}
              >
                <span>{link.label}</span>
              </Link>
            ) : (
              <a
                key={link.href}
                className={`ms-bottom-link ${isActive ? "is-active" : ""}`}
                href={link.href}
              >
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
