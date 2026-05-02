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
  triggerLoader = true,
  ...props
}: LoaderLinkProps) {
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
