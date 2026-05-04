import type { Metadata, Viewport } from "next";
import { HtmlLocaleSync } from "@/components/site/html-locale-sync";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteMotionPack } from "@/components/site/site-motion-pack";
import { SiteNoteAccents } from "@/components/site/site-note-accents";
import { PageLoaderOverlay } from "@/components/site/page-loader-overlay";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4teen.me"),
  applicationName: "4TEEN",
  title: {
    default: "4TEEN",
    template: "%s | 4TEEN",
  },
  description:
    "4TEEN app hub on TRON for direct buy, unlock timeline, liquidity controller, ambassador cabinet, airdrop state, and protocol verification.",
  keywords: [
    "4TEEN",
    "TRON",
    "direct buy",
    "unlock timeline",
    "liquidity controller",
    "airdrop",
    "ambassador",
    "protocol verification",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    title: "4TEEN",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "4TEEN",
    description:
      "4TEEN app hub on TRON for direct buy, unlock timeline, liquidity controller, ambassador cabinet, airdrop state, and protocol verification.",
    siteName: "4TEEN",
    type: "website",
    locale: "en_US",
    url: "https://4teen.me",
    images: [
      {
        url: "/icon.svg",
        width: 500,
        height: 500,
        alt: "4TEEN brand mark",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "4TEEN",
    description:
      "4TEEN app hub on TRON for direct buy, unlock timeline, liquidity controller, ambassador cabinet, airdrop state, and protocol verification.",
    images: ["/icon.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="ltr" lang="en" className="h-full scroll-smooth">
      <body className="min-h-full antialiased" data-site-dir="ltr" data-site-locale="en">
        <HtmlLocaleSync />
        <SiteMotionPack />
        <PageLoaderOverlay />
        <SiteNoteAccents />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
