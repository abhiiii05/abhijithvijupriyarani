import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhijith Viju Priya Rani — Desktop",
  description:
    "A windowed portfolio: four services migrated at Wipro, production e-commerce for Vasco Foods, a multi-year Solarium contract, and queue, agent and on-chain builds.",
  openGraph: {
    title: "Abhijith Viju Priya Rani — Desktop",
    description:
      "Open the windows: backend work in production, the systems behind it, and how to get in touch.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#d8d3c5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
