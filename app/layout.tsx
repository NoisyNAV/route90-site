import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans, Martian_Mono } from "next/font/google";
import { LenisProvider } from "@/components/shared/LenisProvider";
import "./globals.css";

// Type system — locked in CLAUDE.md (Phase 2, "Interstate").
// Display: Anton (condensed, ultra-bold, all-caps signage).
// Body:    Public Sans (clean, neutral, DOT-adjacent).
// Mono:    Martian Mono (blocky/stencil-adjacent — numbers, CHAPTER tags, metadata).
// Self-hosted via next/font — no layout shift, no external request at runtime.

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://route90digital.ca"),
  title: { default: "Route90 Digital Solutions", template: "%s · Route90 Digital" },
  description:
    "Winnipeg design and development studio. Websites, apps, print, and digital support for small businesses.",
  openGraph: {
    type: "website",
    title: "Route90 Digital Solutions",
    description: "Design and development for Winnipeg small businesses.",
    images: [{ url: "/brand/route90-og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Route90 Digital Solutions",
    description: "Design and development for Winnipeg small businesses.",
    images: ["/brand/route90-og.jpg"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#11100f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
