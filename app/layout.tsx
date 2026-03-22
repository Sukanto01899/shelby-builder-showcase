import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FingerprintProviderClient from "@/components/FingerprintProviderClient";
import LoadingBarProvider from "@/components/LoadingBarProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shelby Builder Showcase",
    template: "%s | Shelby Builder Showcase",
  },
  description:
    "Discover Shelby-powered projects and the builders behind them. Explore storage apps, tools, and experiences on Shelby.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Shelby Builder Showcase",
    description:
      "Discover Shelby-powered projects and the builders behind them. Explore storage apps, tools, and experiences on Shelby.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Shelby Builder Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shelby Builder Showcase",
    description:
      "Discover Shelby-powered projects and the builders behind them. Explore storage apps, tools, and experiences on Shelby.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="shelby-dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" data-theme="shelby-dark">
        <Suspense fallback={null}>
          <LoadingBarProvider>
            <FingerprintProviderClient>{children}</FingerprintProviderClient>
          </LoadingBarProvider>
        </Suspense>
        <div id="modal-root" />
      </body>
    </html>
  );
}
