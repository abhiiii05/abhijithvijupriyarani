import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhijith Viju Priya Rani — Backend systems, drawn",
  description:
    "Backend engineering work drawn as system diagrams: a four-service migration at Wipro, production e-commerce for Vasco Foods, a multi-year Solarium contract, and queue, agent and on-chain systems.",
  openGraph: {
    title: "Abhijith Viju Priya Rani — Backend systems, drawn",
    description:
      "Interactive system drawings: service migration, production e-commerce, a BullMQ pipeline simulation, an agent loop and on-chain verification.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f2eee2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
