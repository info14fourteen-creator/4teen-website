"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function createToast(message: string) {
  let wrap = document.querySelector<HTMLElement>(".ft-toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "ft-toast-wrap";
    document.body.appendChild(wrap);
  }

  const toast = document.createElement("div");
  toast.className = "ft-toast";
  toast.textContent = message;
  wrap.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 260);
  }, 1800);
}

function initReveal(prefersReducedMotion: boolean) {
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(
      [
        ".ft-card",
        ".ft-price-card",
        ".ft-step",
        ".ft-highlight",
        ".ft-note",
        ".ft-home-surface-card",
        ".ft-home-verify-card__link",
        ".ft-site-footer__social",
      ].join(","),
    ),
  );

  if (!targets.length) return () => {};

  targets.forEach((element, index) => {
    element.classList.add("ft-reveal");
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 40}ms`;
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("is-visible"));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  targets.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}

function initCounters(prefersReducedMotion: boolean) {
  const counters = Array.from(
    document.querySelectorAll<HTMLElement>("[data-counter]"),
  );

  if (!counters.length) return () => {};

  function animateCounter(element: HTMLElement) {
    if (element.dataset.counterDone === "1") return;
    element.dataset.counterDone = "1";

    const raw = element.dataset.counter ?? "";
    const target = Number(raw);
    const duration = Number(element.dataset.counterDuration ?? 1400);

    if (!Number.isFinite(target)) return;

    const decimals = raw.includes(".") ? raw.split(".")[1]?.length ?? 0 : 0;
    const start = performance.now();

    function frame(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      element.textContent = current.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
      });

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        element.textContent = target.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: decimals,
        });
      }
    }

    requestAnimationFrame(frame);
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}

function initAccordion() {
  const accordions = Array.from(
    document.querySelectorAll<HTMLElement>("[data-accordion]"),
  );

  const disposers = accordions.map((item) => {
    const toggle = item.querySelector<HTMLElement>(".ft-accordion-toggle");
    const panel = item.querySelector<HTMLElement>(".ft-accordion-panel");

    if (!toggle || !panel) return () => {};

    const isOpenDefault = item.hasAttribute("data-open");
    if (isOpenDefault) item.classList.add("is-open");

    toggle.setAttribute("aria-expanded", isOpenDefault ? "true" : "false");

    if (!panel.id) {
      panel.id = `ft-accordion-panel-${Math.random().toString(36).slice(2, 9)}`;
    }

    toggle.setAttribute("aria-controls", panel.id);

    const handleClick = () => {
      const isOpen = item.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    toggle.addEventListener("click", handleClick);
    return () => toggle.removeEventListener("click", handleClick);
  });

  return () => {
    disposers.forEach((dispose) => dispose());
  };
}

function initGlow(prefersReducedMotion: boolean) {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover || prefersReducedMotion) return () => {};

  const glowTargets = Array.from(
    document.querySelectorAll<HTMLElement>(
      [
        ".ft-card",
        ".ft-price-card",
        ".ft-highlight",
        ".ft-home-surface-card",
        ".ft-home-verify-card__link",
        ".ft-header-app-link",
        ".ft-locale-switcher__button",
        ".ft-locale-switcher__option",
        ".ft-mobile-menu-link",
        ".ft-mobile-dock-link",
      ].join(","),
    ),
  );

  const cleanups = glowTargets.map((element) => {
    element.classList.add("ft-glow");
    element.style.setProperty("--ft-glow-x", "50%");
    element.style.setProperty("--ft-glow-y", "50%");

    let frame = 0;

    const handleMove = (event: MouseEvent) => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        element.style.setProperty("--ft-glow-x", `${x}%`);
        element.style.setProperty("--ft-glow-y", `${y}%`);
      });
    };

    const handleLeave = () => {
      element.style.setProperty("--ft-glow-x", "50%");
      element.style.setProperty("--ft-glow-y", "50%");
    };

    element.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseleave", handleLeave);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", handleLeave);
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initActiveAnchors() {
  const anchorLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
  ).filter((link) => (link.getAttribute("href")?.length ?? 0) > 1);

  if (!anchorLinks.length || !("IntersectionObserver" in window)) {
    return () => {};
  }

  const ids = [...new Set(anchorLinks.map((link) => link.getAttribute("href")))];
  const sections = ids
    .map((id) => (id ? document.querySelector(id) : null))
    .filter(Boolean) as HTMLElement[];

  if (!sections.length) return () => {};

  const map = new Map<string, HTMLAnchorElement[]>();
  anchorLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    map.set(href, [...(map.get(href) ?? []), link]);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = `#${(entry.target as HTMLElement).id}`;
        const links = map.get(id) ?? [];
        if (entry.isIntersecting) {
          anchorLinks.forEach((link) => link.classList.remove("is-active-anchor"));
          links.forEach((link) => link.classList.add("is-active-anchor"));
        }
      });
    },
    {
      threshold: 0.32,
      rootMargin: "-10% 0px -55% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}

function initPulseCta() {
  const buttons = Array.from(
    document.querySelectorAll<HTMLElement>("[data-pulse-cta]"),
  );
  buttons.forEach((button) => button.classList.add("ft-pulse-cta"));
  return () => {};
}

export function SiteMotionPack() {
  const pathname = usePathname();
  const isWhitepaperRoute = pathname.startsWith("/whitepaper");

  useEffect(() => {
    if (isWhitepaperRoute) {
      return () => {};
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanups = [
      initReveal(prefersReducedMotion),
      initCounters(prefersReducedMotion),
      initAccordion(),
      initGlow(prefersReducedMotion),
      initActiveAnchors(),
      initPulseCta(),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [isWhitepaperRoute, pathname]);

  useEffect(() => {
    if (isWhitepaperRoute) {
      return () => {};
    }

    const handleCopyClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest(".ft-copy-btn");
      if (!button) return;

      const wrap = button.closest<HTMLElement>("[data-copy]");
      const value = wrap?.dataset.copy ?? "";
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        createToast("Copied");
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        createToast("Copied");
      }
    };

    const handleQrClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("[data-qr-zoom]");
      if (!target) return;

      const img = target as HTMLImageElement;
      const src = img.getAttribute("src");
      if (!src) return;

      let modal = document.querySelector<HTMLElement>(".ft-modal");
      if (!modal) {
        modal = document.createElement("div");
        modal.className = "ft-modal";
        modal.innerHTML = `
          <div class="ft-modal__backdrop"></div>
          <div class="ft-modal__dialog">
            <button class="ft-modal__close" type="button" aria-label="Close">✕</button>
            <div class="ft-modal__img-wrap"></div>
          </div>
        `;
        document.body.appendChild(modal);
      }

      const imgWrap = modal.querySelector<HTMLElement>(".ft-modal__img-wrap");
      if (!imgWrap) return;

      const alt = img.getAttribute("alt") || "QR code";
      imgWrap.innerHTML = `<img src="${src}" alt="${alt.replace(/"/g, "&quot;")}">`;
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    const handleModalClose = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        !target?.closest(".ft-modal__close") &&
        !target?.classList.contains("ft-modal__backdrop")
      ) {
        return;
      }

      const modal = document.querySelector<HTMLElement>(".ft-modal");
      if (!modal) return;

      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      const imgWrap = modal.querySelector<HTMLElement>(".ft-modal__img-wrap");
      if (imgWrap) imgWrap.innerHTML = "";
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const modal = document.querySelector<HTMLElement>(".ft-modal.is-open");
      if (!modal) return;
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      const imgWrap = modal.querySelector<HTMLElement>(".ft-modal__img-wrap");
      if (imgWrap) imgWrap.innerHTML = "";
    };

    document.addEventListener("click", handleCopyClick);
    document.addEventListener("click", handleQrClick);
    document.addEventListener("click", handleModalClose);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleCopyClick);
      document.removeEventListener("click", handleQrClick);
      document.removeEventListener("click", handleModalClose);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isWhitepaperRoute]);

  return null;
}
