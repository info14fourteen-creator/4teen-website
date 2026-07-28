import { notFound, redirect } from "next/navigation";

import { isSupportedSiteLocale } from "@/lib/site-locale";

type LocalePageParams = {
  locale: string;
};

export const dynamic = "force-dynamic";

export default async function LocalizedGenesisPage({
  params,
}: {
  params: Promise<LocalePageParams>;
}) {
  const { locale } = await params;

  if (!isSupportedSiteLocale(locale)) {
    notFound();
  }

  redirect(`/${locale}/deck`);
}
