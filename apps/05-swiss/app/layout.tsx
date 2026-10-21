import type { Metadata, Viewport } from "next";
import { Archivo, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-spline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhijith Viju Priya Rani — Backend systems, indexed",
  description:
    "Backend engineering work in a strict grid: four services migrated at Wipro, production e-commerce for Vasco Foods, a multi-year Solarium contract, and queue, agent and on-chain systems.",
  openGraph: {
    title: "Abhijith Viju Priya Rani — Backend systems, indexed",
    description:
      "Swiss-grid index of backend work: service migration, production e-commerce, a BullMQ pipeline, an agent loop and on-chain verification.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f1efe7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
