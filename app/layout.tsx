import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DisclaimerBar } from "@/components/ui/DisclaimerBar";

// Fonty hostowane LOKALNIE (public/fonts) — brak zapytań do Google Fonts.
// To naprawia build offline i jest zgodne z RODO (żadnego wycieku IP do Google).
// Wszystkie pliki zawierają polskie znaki (latin-ext).

const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../public/fonts/Spectral-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Spectral-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Spectral-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Spectral-MediumItalic.ttf", weight: "500", style: "italic" },
  ],
});

const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../public/fonts/Lato-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Lato-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    { path: "../public/fonts/IBMPlexMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/IBMPlexMono-Medium.ttf", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Audyt gotowości na AI Act — wprawny.ai",
  description:
    "Sprawdź w kilka minut, jak AI Act dotyczy Twojej organizacji. Klasyfikacja ryzyka, lista obowiązków i raport PDF.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-texture">
        {children}
        <DisclaimerBar />
      </body>
    </html>
  );
}
