import type { Metadata } from "next";
import { PageLoaderOverlay } from "@/components/site/page-loader-overlay";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteMotionPack } from "@/components/site/site-motion-pack";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4teen.me"),
  title: {
    default: "4TEEN",
    template: "%s | 4TEEN",
  },
  description:
    "Modern app-like web platform for the 4TEEN ecosystem, wallet flows, ambassador onboarding, and product discovery.",
  openGraph: {
    title: "4TEEN",
    description:
      "Modern app-like web platform for the 4TEEN ecosystem, wallet flows, ambassador onboarding, and product discovery.",
    siteName: "4TEEN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full antialiased">
        <SiteMotionPack />
        <PageLoaderOverlay />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
