"use client";

import Lottie from "lottie-react";
import { useCallback, useEffect, useMemo, useRef, type MutableRefObject } from "react";

type AnimationData = {
  fr?: number;
  ip?: number;
  op?: number;
} & Record<string, unknown>;

type LottieRuntimeHandle = {
  setDirection?: (direction: number) => void;
  playSegments?: (segments: [number, number], forceFlag?: boolean) => void;
  goToAndStop?: (value: number, isFrame?: boolean) => void;
  play?: () => void;
};

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
  const lottieRef = useRef<LottieRuntimeHandle | null>(null);
  const startFrame = animationData.ip ?? 0;
  const endFrame = useMemo(
    () => Math.max(startFrame + 1, animationData.op ?? startFrame + (animationData.fr ?? 60)),
    [animationData.fr, animationData.op, startFrame],
  );

  const playOnce = useCallback(() => {
    lottieRef.current?.setDirection?.(1);
    lottieRef.current?.playSegments?.([startFrame, endFrame], true);
  }, [endFrame, startFrame]);

  const reset = useCallback(() => {
    lottieRef.current?.goToAndStop?.(startFrame, true);
  }, [startFrame]);

  useEffect(() => {
    if (!apiRef) return;

    apiRef.current = { playOnce, reset };

    return () => {
      apiRef.current = null;
    };
  }, [apiRef, playOnce, reset]);

  useEffect(() => {
    if (loop) {
      lottieRef.current?.play?.();
      return;
    }

    reset();
  }, [loop, reset]);

  return (
    <div
      aria-hidden="true"
      className={`ft-lottie-icon ${className ?? ""}`}
      onMouseEnter={playOnHover && !loop ? playOnce : undefined}
      onMouseLeave={playOnHover && !loop ? reset : undefined}
    >
      <Lottie
        animationData={animationData}
        autoplay={loop}
        loop={loop}
        lottieRef={lottieRef as never}
        onDOMLoaded={loop ? undefined : reset}
      />
    </div>
  );
}
