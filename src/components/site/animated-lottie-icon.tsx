"use client";

import Lottie, { type LottieRef } from "lottie-react";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";

type AnimationData = {
  fr?: number;
  ip?: number;
  op?: number;
} & Record<string, unknown>;

export type AnimatedLottieIconApi = {
  playOnce: () => void;
  reset: () => void;
};

export function getLottieDurationMs(animationData: AnimationData) {
  const frameRate = animationData.fr ?? 60;
  const startFrame = animationData.ip ?? 0;
  const endFrame = animationData.op ?? startFrame + frameRate;
  const durationMs = ((endFrame - startFrame) / frameRate) * 1000;

  return Math.max(260, Math.min(durationMs, 900));
}

export function AnimatedLottieIcon({
  animationData,
  apiRef,
  className,
  loop = false,
  playOnHover = false,
}: {
  animationData: AnimationData;
  apiRef?: MutableRefObject<AnimatedLottieIconApi | null>;
  className?: string;
  loop?: boolean;
  playOnHover?: boolean;
}) {
  const lottieRef = useRef<LottieRef["current"]>(null);
  const startFrame = animationData.ip ?? 0;
  const endFrame = useMemo(
    () => Math.max(startFrame + 1, animationData.op ?? startFrame + (animationData.fr ?? 60)),
    [animationData.fr, animationData.op, startFrame],
  );

  function playOnce() {
    lottieRef.current?.setDirection(1);
    lottieRef.current?.playSegments([startFrame, endFrame], true);
  }

  function reset() {
    lottieRef.current?.goToAndStop(startFrame, true);
  }

  useEffect(() => {
    if (!apiRef) return;

    apiRef.current = { playOnce, reset };

    return () => {
      apiRef.current = null;
    };
  }, [apiRef, endFrame, startFrame]);

  useEffect(() => {
    if (loop) {
      lottieRef.current?.play();
      return;
    }

    reset();
  }, [loop, startFrame]);

  return (
    <span
      aria-hidden="true"
      className={`ft-lottie-icon ${className ?? ""}`}
      onMouseEnter={playOnHover && !loop ? playOnce : undefined}
      onMouseLeave={playOnHover && !loop ? reset : undefined}
    >
      <Lottie
        animationData={animationData}
        autoplay={loop}
        loop={loop}
        lottieRef={lottieRef}
        onDOMLoaded={loop ? undefined : reset}
      />
    </span>
  );
}
