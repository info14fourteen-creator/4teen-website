"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FourteenLoader } from "@/components/site/fourteen-loader";
import {
  FOURTEEN_LOADER_DONE_EVENT,
  FOURTEEN_LOADER_EVENT,
} from "@/components/site/loader-link";

const LEAVE_DURATION_MS = 220;
const MAX_WAIT_DURATION_MS = 4000;

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

  function showLoader() {
    clearTimers();
    setVisible(true);
    setActive(true);

    activeTimerRef.current = window.setTimeout(() => {
      finishLoader();
    }, MAX_WAIT_DURATION_MS);
  }

  function finishLoader() {
    if (!visible && !active) return;

    if (activeTimerRef.current) {
      window.clearTimeout(activeTimerRef.current);
      activeTimerRef.current = null;
    }

    setActive(false);

    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      hideTimerRef.current = null;
    }, LEAVE_DURATION_MS);
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

    finishLoader();
  }, [pathname]);

  useEffect(() => {
    const handleStart = () => {
      showLoader();
    };

    const handleDone = () => {
      finishLoader();
    };

    window.addEventListener(FOURTEEN_LOADER_EVENT, handleStart);
    window.addEventListener(FOURTEEN_LOADER_DONE_EVENT, handleDone);
    return () => {
      window.removeEventListener(FOURTEEN_LOADER_EVENT, handleStart);
      window.removeEventListener(FOURTEEN_LOADER_DONE_EVENT, handleDone);
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
