"use client";

import signalCoinLoop from "@/assets/lottie/signal-coin-loop.json";
import { AnimatedLottieIcon } from "@/components/site/animated-lottie-icon";

export function SignalPoints({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (!items.length) {
    return null;
  }

  return (
    <ul className={`ft-signal-points ${className ?? ""}`.trim()}>
      {items.map((item) => (
        <li key={item} className="ft-signal-points__item">
          <AnimatedLottieIcon
            animationData={signalCoinLoop}
            className="ft-signal-points__icon"
            loop
          />
          <span className="ft-signal-points__text">{item}</span>
        </li>
      ))}
    </ul>
  );
}
