import type { Metadata } from "next";
import { NotFoundExperience } from "@/components/site/not-found-experience";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | 4TEEN",
  description: "The page you are looking for is unavailable.",
};

export default function GlobalNotFound() {
  return (
    <html dir="ltr" lang="en" className="h-full scroll-smooth">
      <body className="min-h-full antialiased" data-site-dir="ltr" data-site-locale="en">
        <NotFoundExperience />
      </body>
    </html>
  );
}
