"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FourteenLoader } from "@/components/site/fourteen-loader";
import { FOURTEEN_LOADER_EVENT } from "@/components/site/loader-link";

const TRANSITION_DURATION_MS = 760;
const LEAVE_DURATION_MS = 220;

export function PageLoaderOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const mountedRef = useRef(false);
  const firstPathRef = useRef(true);
  const activeTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  function clearTimers() {
    if (activeTimerRef.current) {
      window.clearTimeout(activeTimerRef.current);
      activeTimerRef.current = null;
    }

    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }

  function showLoader(durationMs: number) {
    clearTimers();
    setVisible(true);
    setActive(true);

    activeTimerRef.current = window.setTimeout(() => {
      setActive(false);
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, LEAVE_DURATION_MS);
    }, durationMs);
  }

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (firstPathRef.current) {
      firstPathRef.current = false;
      return;
    }

    showLoader(240);
  }, [pathname]);

  useEffect(() => {
    const handleStart = () => {
      showLoader(TRANSITION_DURATION_MS);
    };

    window.addEventListener(FOURTEEN_LOADER_EVENT, handleStart);
    return () => {
      window.removeEventListener(FOURTEEN_LOADER_EVENT, handleStart);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`ft-page-loader ${active ? "is-active" : "is-leaving"}`}
    >
      <div className="ft-page-loader__scrim" />
      <div className="ft-page-loader__core">
        <FourteenLoader />
      </div>
    </div>
  );
}
