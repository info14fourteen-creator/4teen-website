"use client";

import externalLinkHover from "@/assets/lottie/link-external-share-hover.json";
import internalLinkHover from "@/assets/lottie/link-internal-share-hover.json";
import {
  AnimatedLottieIcon,
  type AnimatedLottieIconApi,
  getLottieDurationMs,
} from "@/components/site/animated-lottie-icon";
import Link, { type LinkProps } from "next/link";
import {
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

export const FOURTEEN_LOADER_EVENT = "fourteen:loader-start";
export const FOURTEEN_LOADER_DONE_EVENT = "fourteen:loader-done";

function shouldIgnoreClick(
  event: MouseEvent<HTMLAnchorElement>,
  target?: string,
) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    Boolean(target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

function shouldIgnoreAnimatedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function triggerFourteenLoader() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FOURTEEN_LOADER_EVENT));
}

export function resolveFourteenLoader() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FOURTEEN_LOADER_DONE_EVENT));
}

export function navigateHard(href: string) {
  if (typeof window === "undefined") return;
  window.location.assign(href);
}

function isInternalStringHref(href: LinkProps["href"]): href is string {
  return typeof href === "string" && href.startsWith("/");
}

function isStringHref(href: LinkProps["href"]): href is string {
  return typeof href === "string";
}

function resolveExternalNavigation(href: string, target?: string) {
  if (typeof window === "undefined") return;

  if (target === "_blank") {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.assign(href);
}

type LoaderLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    triggerLoader?: boolean;
    showLinkIcon?: boolean;
  };

export function LoaderLink({
  children,
  onClick,
  href,
  target,
  triggerLoader = false,
  showLinkIcon = false,
  ...props
}: LoaderLinkProps) {
  const iconApiRef = useRef<AnimatedLottieIconApi | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isPending, setIsPending] = useState(false);
  const isInternal = isInternalStringHref(href);
  const isString = isStringHref(href);
  const animationData = isInternal ? internalLinkHover : externalLinkHover;
  const durationMs = useMemo(() => getLottieDurationMs(animationData), [animationData]);

  function handleAnimatedNavigation(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (!isString || !showLinkIcon || shouldIgnoreAnimatedClick(event)) {
      if (triggerLoader && !shouldIgnoreClick(event, target)) {
        triggerFourteenLoader();
      }
      return;
    }

    event.preventDefault();

    if (isPending) {
      return;
    }

    if (triggerLoader) {
      triggerFourteenLoader();
    }

    setIsPending(true);
    iconApiRef.current?.playOnce();

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (isInternal) {
        navigateHard(href);
      } else {
        resolveExternalNavigation(href, target);
      }

      iconApiRef.current?.reset();
      setIsPending(false);
      timeoutRef.current = null;
    }, durationMs);
  }

  function renderAnimatedChildren() {
    if (!showLinkIcon) {
      return children;
    }

    return (
      <>
        <span className="ft-link__content">{children}</span>
        <AnimatedLottieIcon
          animationData={animationData}
          apiRef={iconApiRef}
          className="ft-link__icon"
          playOnHover={!isPending}
        />
      </>
    );
  }

  if (isString) {
    return (
      <a
        {...props}
        className={`${props.className ?? ""}${isPending ? " is-pending" : ""}`.trim()}
        href={href}
        onClick={handleAnimatedNavigation}
        target={target}
      >
        {renderAnimatedChildren()}
      </a>
    );
  }

  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);

        if (!triggerLoader || shouldIgnoreClick(event, target)) {
          return;
        }

        triggerFourteenLoader();
      }}
      target={target}
    >
      {children}
    </Link>
  );
}
