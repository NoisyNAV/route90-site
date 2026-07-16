import type { Metadata } from "next";
import { Anton, Public_Sans, Martian_Mono } from "next/font/google";
import { LenisProvider } from "@/components/shared/LenisProvider";
import "./globals.css";

// Type system — locked in CLAUDE.md (Phase 2, "Interstate").
// Display: Anton (condensed, ultra-bold, all-caps signage).
// Body:    Public Sans (clean, neutral, DOT-adjacent).
// Mono:    Martian Mono (blocky/stencil-adjacent — numbers, CHAPTER tags, metadata).
// Self-hosted via next/font — no layout shift, no external request at runtime.

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
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
  title: "Route90 Digital Solutions",
  description:
    "Winnipeg design and development studio. Websites and tools for small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${publicSans.variable} ${martianMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
