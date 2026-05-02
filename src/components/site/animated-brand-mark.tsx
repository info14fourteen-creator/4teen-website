"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Spring = {
  x: number;
  v: number;
};

type BarState = {
  main: Spring;
  trail1: Spring;
  trail2: Spring;
  opacityMain: Spring;
  opacityTrail1: Spring;
  opacityTrail2: Spring;
};

type VisualBar = {
  main: number;
  trail1: number;
  trail2: number;
  opacityMain: number;
  opacityTrail1: number;
  opacityTrail2: number;
};

type VisualState = {
  bar1: VisualBar;
  bar2: VisualBar;
  bar3: VisualBar;
};

type Phase =
  | { kind: "idle" }
  | { kind: "main"; startAt: number }
  | { kind: "settle" };

const START = { bar1: 0, bar2: 0, bar3: 0 } as const;

const BAR1_PATH = "M 104.480003 47 L 104 319";
const BAR1_CAP =
  "M 83.997139 47.513885 C 83.997803 38.204559 90.574348 30.192169 99.704796 28.376617 C 108.83535 26.561096 117.976776 31.44809 121.538788 40.04895 C 125.100807 48.649811 122.091301 58.569 114.350647 63.74057 C 106.609993 68.91217 96.29406 67.895508 89.711746 61.312561 C 86.052391 57.65271 83.996773 52.689362 83.997139 47.513885 Z";

const BAR2_PATH = "M 249.998886 182 L 250.999298 318";
const BAR2_TOP_CAP =
  "M 230.997131 182.513885 C 230.997803 173.204559 237.574356 165.192169 246.704788 163.376617 C 255.835342 161.561096 264.976776 166.44809 268.538788 175.04895 C 272.1008 183.649811 269.091309 193.569 261.350647 198.74057 C 253.610001 203.91217 243.294067 202.895508 236.711746 196.312561 C 233.052383 192.65271 230.99678 187.689362 230.997131 182.513885 Z";
const BAR2_BOTTOM_CAP =
  "M 230.997131 318.513855 C 230.997803 309.20459 237.574356 301.192139 246.704788 299.376617 C 255.835342 297.561096 264.976776 302.44809 268.538788 311.04895 C 272.1008 319.649841 269.091309 329.569 261.350647 334.740601 C 253.610001 339.91217 243.294067 338.895508 236.711746 332.312561 C 233.052383 328.65271 230.99678 323.689362 230.997131 318.513855 Z";

const BAR3_PATH = "M 395.997894 182 L 395.519989 454";
const BAR3_CAP =
  "M 375.997131 454.513855 C 375.997803 445.20459 382.574341 437.192169 391.704803 435.376617 C 400.835358 433.561096 409.976776 438.44809 413.538788 447.04895 C 417.1008 455.649811 414.091309 465.569 406.350647 470.74057 C 398.609985 475.91217 388.294067 474.895508 381.711761 468.312561 C 378.052399 464.65271 375.996765 459.689362 375.997131 454.513855 Z";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function createSpring(initial: number): Spring {
  return { x: initial, v: 0 };
}

function stepSpring(spring: Spring, target: number, stiffness: number, damping: number, dt: number) {
  const force = (target - spring.x) * stiffness;
  spring.v += force * dt;
  spring.v *= Math.pow(damping, dt * 60);
  spring.x += spring.v * dt;
}

function createBarState(): BarState {
  return {
    main: createSpring(0),
    trail1: createSpring(0),
    trail2: createSpring(0),
    opacityMain: createSpring(1),
    opacityTrail1: createSpring(0),
    opacityTrail2: createSpring(0),
  };
}

function createMotionState() {
  return {
    bar1: createBarState(),
    bar2: createBarState(),
    bar3: createBarState(),
  };
}

function captureVisual(state: ReturnType<typeof createMotionState>): VisualState {
  return {
    bar1: {
      main: state.bar1.main.x,
      trail1: state.bar1.trail1.x,
      trail2: state.bar1.trail2.x,
      opacityMain: clamp(state.bar1.opacityMain.x, 0, 1),
      opacityTrail1: clamp(state.bar1.opacityTrail1.x, 0, 1),
      opacityTrail2: clamp(state.bar1.opacityTrail2.x, 0, 1),
    },
    bar2: {
      main: state.bar2.main.x,
      trail1: state.bar2.trail1.x,
      trail2: state.bar2.trail2.x,
      opacityMain: clamp(state.bar2.opacityMain.x, 0, 1),
      opacityTrail1: clamp(state.bar2.opacityTrail1.x, 0, 1),
      opacityTrail2: clamp(state.bar2.opacityTrail2.x, 0, 1),
    },
    bar3: {
      main: state.bar3.main.x,
      trail1: state.bar3.trail1.x,
      trail2: state.bar3.trail2.x,
      opacityMain: clamp(state.bar3.opacityMain.x, 0, 1),
      opacityTrail1: clamp(state.bar3.opacityTrail1.x, 0, 1),
      opacityTrail2: clamp(state.bar3.opacityTrail2.x, 0, 1),
    },
  };
}

function getMainCarrier(t: number) {
  const p1 = Math.sin(t * 2.65) * 0.5 + 0.5;
  const p2 = Math.sin(t * 2.65 + Math.PI * 0.72) * 0.5 + 0.5;
  const p3 = Math.sin(t * 2.65 + Math.PI * 1.34) * 0.5 + 0.5;

  return {
    bar1: lerp(0, 135, p1),
    bar2: lerp(-135, 135, p2),
    bar3: lerp(-154, 0, p3),
  };
}

function nowMs() {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
}

type BarTargets = {
  bar1: number;
  bar2: number;
  bar3: number;
};

function isSettled(state: ReturnType<typeof createMotionState>) {
  return (
    Math.abs(state.bar1.main.x - START.bar1) < 0.45 &&
    Math.abs(state.bar2.main.x - START.bar2) < 0.45 &&
    Math.abs(state.bar3.main.x - START.bar3) < 0.45 &&
    Math.abs(state.bar1.trail1.x) < 0.45 &&
    Math.abs(state.bar1.trail2.x) < 0.45 &&
    Math.abs(state.bar2.trail1.x) < 0.45 &&
    Math.abs(state.bar2.trail2.x) < 0.45 &&
    Math.abs(state.bar3.trail1.x) < 0.45 &&
    Math.abs(state.bar3.trail2.x) < 0.45 &&
    state.bar1.opacityTrail1.x < 0.02 &&
    state.bar1.opacityTrail2.x < 0.02 &&
    state.bar2.opacityTrail1.x < 0.02 &&
    state.bar2.opacityTrail2.x < 0.02 &&
    state.bar3.opacityTrail1.x < 0.02 &&
    state.bar3.opacityTrail2.x < 0.02 &&
    Math.abs(state.bar1.main.v) < 0.02 &&
    Math.abs(state.bar2.main.v) < 0.02 &&
    Math.abs(state.bar3.main.v) < 0.02
  );
}

function getStrokeColor(tone: "soft" | "mid" | "main") {
  if (tone === "soft") {
    return "rgba(255,105,0,0.22)";
  }

  if (tone === "mid") {
    return "rgba(255,105,0,0.55)";
  }

  return "#ff6900";
}

function BrandBar({
  path,
  cap,
  capBottom,
  y,
  opacity,
  tone,
}: {
  path: string;
  cap: string;
  capBottom?: string;
  y: number;
  opacity: number;
  tone: "soft" | "mid" | "main";
}) {
  return (
    <g className="ft-brand-mark__layer" transform={`translate(0 ${y})`} opacity={opacity}>
      <path
        d={path}
        fill="none"
        stroke={getStrokeColor(tone)}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="75"
      />
      <path d={cap} fill="#f2f2f2" />
      {capBottom ? <path d={capBottom} fill="#f2f2f2" /> : null}
    </g>
  );
}

export function AnimatedBrandMark({
  compact = false,
  autoplay = false,
}: {
  compact?: boolean;
  autoplay?: boolean;
}) {
  const phaseRef = useRef<Phase>({ kind: "idle" });
  const stateRef = useRef(createMotionState());
  const rafRef = useRef<number | null>(null);
  const lastNowRef = useRef(nowMs());
  const [visual, setVisual] = useState<VisualState>(() => captureVisual(stateRef.current));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!autoplay) {
      return;
    }

    phaseRef.current = { kind: "main", startAt: nowMs() };
    setIsActive(true);
    ensureRaf();
  }, [autoplay]);

  function ensureRaf() {
    if (rafRef.current !== null) {
      return;
    }

    const tick = (frameNow: number) => {
      const dt = clamp((frameNow - lastNowRef.current) / 1000, 0.001, 0.04);
      lastNowRef.current = frameNow;

      const phase = phaseRef.current;
      const current = stateRef.current;

      let targetY: BarTargets = {
        bar1: START.bar1,
        bar2: START.bar2,
        bar3: START.bar3,
      };

      let targetOpacity: BarTargets = {
        bar1: 1,
        bar2: 1,
        bar3: 1,
      };

      let trailOpacityFactor: BarTargets = {
        bar1: 0,
        bar2: 0,
        bar3: 0,
      };

      if (phase.kind === "main") {
        const t = (frameNow - phase.startAt) / 1000;
        const carrier = getMainCarrier(t);

        targetY.bar1 = carrier.bar1;
        targetY.bar2 = carrier.bar2;
        targetY.bar3 = carrier.bar3;

        trailOpacityFactor = {
          bar1: 1,
          bar2: 1,
          bar3: 1,
        };
      }

      stepSpring(current.bar1.main, targetY.bar1, 130, 0.79, dt);
      stepSpring(current.bar2.main, targetY.bar2, 120, 0.81, dt);
      stepSpring(current.bar3.main, targetY.bar3, 130, 0.79, dt);

      stepSpring(current.bar1.trail1, current.bar1.main.x, 84, 0.75, dt);
      stepSpring(current.bar1.trail2, current.bar1.trail1.x, 58, 0.69, dt);
      stepSpring(current.bar2.trail1, current.bar2.main.x, 78, 0.76, dt);
      stepSpring(current.bar2.trail2, current.bar2.trail1.x, 54, 0.7, dt);
      stepSpring(current.bar3.trail1, current.bar3.main.x, 84, 0.75, dt);
      stepSpring(current.bar3.trail2, current.bar3.trail1.x, 58, 0.69, dt);

      stepSpring(current.bar1.opacityMain, targetOpacity.bar1, 150, 0.78, dt);
      stepSpring(current.bar2.opacityMain, targetOpacity.bar2, 150, 0.78, dt);
      stepSpring(current.bar3.opacityMain, targetOpacity.bar3, 150, 0.78, dt);

      stepSpring(
        current.bar1.opacityTrail1,
        current.bar1.opacityMain.x * 0.32 * trailOpacityFactor.bar1,
        120,
        0.74,
        dt,
      );
      stepSpring(
        current.bar1.opacityTrail2,
        current.bar1.opacityMain.x * 0.13 * trailOpacityFactor.bar1,
        100,
        0.7,
        dt,
      );
      stepSpring(
        current.bar2.opacityTrail1,
        current.bar2.opacityMain.x * 0.25 * trailOpacityFactor.bar2,
        120,
        0.74,
        dt,
      );
      stepSpring(
        current.bar2.opacityTrail2,
        current.bar2.opacityMain.x * 0.1 * trailOpacityFactor.bar2,
        100,
        0.7,
        dt,
      );
      stepSpring(
        current.bar3.opacityTrail1,
        current.bar3.opacityMain.x * 0.32 * trailOpacityFactor.bar3,
        120,
        0.74,
        dt,
      );
      stepSpring(
        current.bar3.opacityTrail2,
        current.bar3.opacityMain.x * 0.13 * trailOpacityFactor.bar3,
        100,
        0.7,
        dt,
      );

      setVisual(captureVisual(current));

      if (phase.kind === "settle" && isSettled(current)) {
        phaseRef.current = { kind: "idle" };
        setIsActive(false);
        rafRef.current = null;
        return;
      }

      if (phase.kind === "idle") {
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    lastNowRef.current = nowMs();
    rafRef.current = requestAnimationFrame(tick);
  }

  function handlePointerEnter() {
    if (autoplay) {
      return;
    }

    phaseRef.current = { kind: "main", startAt: nowMs() };
    setIsActive(true);
    ensureRaf();
  }

  function handlePointerLeave() {
    if (autoplay) {
      return;
    }

    phaseRef.current = { kind: "settle" };
    ensureRaf();
  }

  const iconClassName = useMemo(() => {
    return `ft-brand-icon ${compact ? "is-compact" : ""} ${isActive ? "is-active" : ""}`;
  }, [compact, isActive]);

  return (
    <span
      className={iconClassName}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
    >
      <svg aria-hidden="true" className="ft-brand-mark" viewBox="0 0 500 500">
        <BrandBar
          cap={BAR1_CAP}
          path={BAR1_PATH}
          y={visual.bar1.trail2}
          opacity={visual.bar1.opacityTrail2}
          tone="soft"
        />
        <BrandBar
          cap={BAR1_CAP}
          path={BAR1_PATH}
          y={visual.bar1.trail1}
          opacity={visual.bar1.opacityTrail1}
          tone="mid"
        />
        <BrandBar
          cap={BAR1_CAP}
          path={BAR1_PATH}
          y={visual.bar1.main}
          opacity={visual.bar1.opacityMain}
          tone="main"
        />

        <BrandBar
          cap={BAR2_TOP_CAP}
          capBottom={BAR2_BOTTOM_CAP}
          path={BAR2_PATH}
          y={visual.bar2.trail2}
          opacity={visual.bar2.opacityTrail2}
          tone="soft"
        />
        <BrandBar
          cap={BAR2_TOP_CAP}
          capBottom={BAR2_BOTTOM_CAP}
          path={BAR2_PATH}
          y={visual.bar2.trail1}
          opacity={visual.bar2.opacityTrail1}
          tone="mid"
        />
        <BrandBar
          cap={BAR2_TOP_CAP}
          capBottom={BAR2_BOTTOM_CAP}
          path={BAR2_PATH}
          y={visual.bar2.main}
          opacity={visual.bar2.opacityMain}
          tone="main"
        />

        <BrandBar
          cap={BAR3_CAP}
          path={BAR3_PATH}
          y={visual.bar3.trail2}
          opacity={visual.bar3.opacityTrail2}
          tone="soft"
        />
        <BrandBar
          cap={BAR3_CAP}
          path={BAR3_PATH}
          y={visual.bar3.trail1}
          opacity={visual.bar3.opacityTrail1}
          tone="mid"
        />
        <BrandBar
          cap={BAR3_CAP}
          path={BAR3_PATH}
          y={visual.bar3.main}
          opacity={visual.bar3.opacityMain}
          tone="main"
        />
      </svg>
    </span>
  );
}
