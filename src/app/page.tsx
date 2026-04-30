import { HomePage } from "@/components/home/home-page";
import { defaultSiteLocale } from "@/lib/site-locale";

export default function Home() {
  return <HomePage locale={defaultSiteLocale} />;
}
