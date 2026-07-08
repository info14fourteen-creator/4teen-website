"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const visibleRef = useRef(false);
  const activeRef = useRef(false);
  const activeTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const setVisibleState = useCallback((nextVisible: boolean) => {
    visibleRef.current = nextVisible;
    setVisible(nextVisible);
  }, []);

  const setActiveState = useCallback((nextActive: boolean) => {
    activeRef.current = nextActive;
    setActive(nextActive);
  }, []);

  const clearTimers = useCallback(() => {
    if (activeTimerRef.current) {
      window.clearTimeout(activeTimerRef.current);
      activeTimerRef.current = null;
    }

    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const finishLoader = useCallback(() => {
    if (!visibleRef.current && !activeRef.current) return;

    if (activeTimerRef.current) {
      window.clearTimeout(activeTimerRef.current);
      activeTimerRef.current = null;
    }

    setActiveState(false);

    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = window.setTimeout(() => {
      setVisibleState(false);
      hideTimerRef.current = null;
    }, LEAVE_DURATION_MS);
  }, [setActiveState, setVisibleState]);

  const showLoader = useCallback(() => {
    clearTimers();
    setVisibleState(true);
    setActiveState(true);

    activeTimerRef.current = window.setTimeout(() => {
      finishLoader();
    }, MAX_WAIT_DURATION_MS);
  }, [clearTimers, finishLoader, setActiveState, setVisibleState]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (firstPathRef.current) {
      firstPathRef.current = false;
      return;
    }

    finishLoader();
  }, [finishLoader, pathname]);

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
  }, [finishLoader, showLoader]);

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
