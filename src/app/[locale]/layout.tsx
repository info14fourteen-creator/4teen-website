import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  getSiteTextDirection,
  isSupportedSiteLocale,
  supportedSiteLocales,
} from "@/lib/site-locale";

type LocaleLayoutParams = {
  locale: string;
};

export function generateStaticParams() {
  return supportedSiteLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<LocaleLayoutParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  return (
    <div data-site-dir={getSiteTextDirection(locale)} data-site-locale={locale} dir={getSiteTextDirection(locale)} lang={locale}>
      {children}
    </div>
  );
}
