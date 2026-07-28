"use client";

import { LoaderLink } from "@/components/site/loader-link";
import {
  APP_RELEASE_DISPLAY_DATE,
  APP_RELEASE_STORES_LABEL,
  APP_RELEASE_TARGET_MS,
} from "@/lib/app-release";
import { useEffect, useState } from "react";

type ReleaseCountdownProps = {
  className?: string;
  description: string;
  eyebrow: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
  variant?: "home" | "app";
};

type CountdownState = {
  days: string;
  hours: string;
  isLive: boolean;
  minutes: string;
  seconds: string;
};

function toCountdownState(now: number): CountdownState {
  const diff = APP_RELEASE_TARGET_MS - now;

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      isLive: true,
      minutes: "00",
      seconds: "00",
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    isLive: false,
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

const FALLBACK_STATE: CountdownState = {
  days: "--",
  hours: "--",
  isLive: false,
  minutes: "--",
  seconds: "--",
};

export function ReleaseCountdown({
  className,
  description,
  eyebrow,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
  variant = "home",
}: ReleaseCountdownProps) {
  const [state, setState] = useState<CountdownState>(FALLBACK_STATE);

  useEffect(() => {
    const update = () => {
      setState(toCountdownState(Date.now()));
    };

    update();

    const intervalId = window.setInterval(update, 1000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  if (state.isLive) {
    return null;
  }

  return (
    <article
      className={[
        "ft-release-module",
        `ft-release-module--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="ft-stack ft-stack--md">
        <div className="ft-stack ft-stack--xs">
          <div className="ft-release-module__head">
            <span className="ft-release-module__eyebrow">{eyebrow}</span>
            <span className="ft-release-module__stores">{APP_RELEASE_STORES_LABEL}</span>
          </div>
          <h2 className="ft-release-module__title">{title}</h2>
          <p className="ft-release-module__description">{description}</p>
        </div>

        <div aria-live="polite" className="ft-release-module__timer">
          <div className="ft-release-module__cell">
            <span className="ft-release-module__value">{state.days}</span>
            <span className="ft-release-module__label">Days</span>
          </div>
          <div className="ft-release-module__cell">
            <span className="ft-release-module__value">{state.hours}</span>
            <span className="ft-release-module__label">Hours</span>
          </div>
          <div className="ft-release-module__cell">
            <span className="ft-release-module__value">{state.minutes}</span>
            <span className="ft-release-module__label">Minutes</span>
          </div>
          <div className="ft-release-module__cell">
            <span className="ft-release-module__value">{state.seconds}</span>
            <span className="ft-release-module__label">Seconds</span>
          </div>
        </div>

        <div className="ft-release-module__meta">
          <span className="ft-release-module__meta-label">Release target</span>
          <span className="ft-release-module__meta-value">{APP_RELEASE_DISPLAY_DATE}</span>
        </div>

        <div className="ft-release-module__actions">
          <LoaderLink className="ft-btn ft-btn--primary" href={primaryHref}>
            {primaryLabel}
          </LoaderLink>
          {secondaryHref && secondaryLabel ? (
            <LoaderLink className="ft-btn ft-btn--ghost" href={secondaryHref}>
              {secondaryLabel}
            </LoaderLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
