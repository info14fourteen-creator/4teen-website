"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

export const FOURTEEN_LOADER_EVENT = "fourteen:loader-start";

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

export function triggerFourteenLoader() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FOURTEEN_LOADER_EVENT));
}

export function navigateHard(href: string) {
  if (typeof window === "undefined") return;
  window.location.assign(href);
}

function isInternalStringHref(href: LinkProps["href"]): href is string {
  return typeof href === "string" && href.startsWith("/");
}

type LoaderLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    triggerLoader?: boolean;
  };

export function LoaderLink({
  children,
  onClick,
  href,
  target,
  triggerLoader = false,
  ...props
}: LoaderLinkProps) {
  if (isInternalStringHref(href)) {
    const internalHref: string = href;
    return (
      <a
        {...props}
        href={internalHref}
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
