"use client";

import { useMemo, useRef } from "react";
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
  href,
  label,
}: {
  animationData: AnimationData;
  href: string;
  label: string;
}) {
  const iconApiRef = useRef<AnimatedLottieIconApi | null>(null);
  const openingRef = useRef(false);
  const durationMs = useMemo(() => getLottieDurationMs(animationData), [animationData]);

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
        <AnimatedLottieIcon
          animationData={animationData}
          apiRef={iconApiRef}
          playOnHover
        />
      </span>
      <span className="ft-site-footer__social-label">{label}</span>
    </button>
  );
}
