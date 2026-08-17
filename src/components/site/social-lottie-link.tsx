"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatedLottieIcon,
  type AnimatedLottieIconApi,
  getLottieDurationMs,
} from "@/components/site/animated-lottie-icon";

type AnimationData = {
  fr?: number;
  ip?: number;
  op?: number;
} & Record<string, unknown>;

export function SocialLottieLink({
  animationData,
  animationUrl,
  href,
  label,
}: {
  animationData?: AnimationData;
  animationUrl?: string;
  href: string;
  label: string;
}) {
  const iconApiRef = useRef<AnimatedLottieIconApi | null>(null);
  const openingRef = useRef(false);
  const [loadedAnimation, setLoadedAnimation] = useState<AnimationData | null>(
    animationData ?? null,
  );
  const durationMs = useMemo(
    () => (loadedAnimation ? getLottieDurationMs(loadedAnimation) : 500),
    [loadedAnimation],
  );

  useEffect(() => {
    if (!animationUrl) return;

    let cancelled = false;
    void fetch(animationUrl)
      .then((response) => (response.ok ? response.json() : null))
      .then((animation) => {
        if (!cancelled && animation) {
          setLoadedAnimation(animation as AnimationData);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [animationUrl]);

  return (
    <button
      aria-label={`Open ${label}`}
      className="ft-site-footer__social"
      onClick={() => {
        if (openingRef.current) return;
        openingRef.current = true;

        iconApiRef.current?.playOnce();

        window.setTimeout(() => {
          window.open(href, "_blank", "noopener,noreferrer");
          iconApiRef.current?.reset();
          openingRef.current = false;
        }, durationMs);
      }}
      type="button"
    >
      <span className="ft-site-footer__social-icon">
        {loadedAnimation ? (
          <AnimatedLottieIcon
            animationData={loadedAnimation}
            apiRef={iconApiRef}
            playOnHover
          />
        ) : null}
      </span>
      <span className="ft-site-footer__social-label">{label}</span>
    </button>
  );
}
