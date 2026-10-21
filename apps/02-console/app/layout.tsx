import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhijith Viju Priya Rani — Console",
  description:
    "A terminal portfolio: four services migrated at Wipro, production e-commerce for Vasco Foods, a multi-year Solarium contract, and queue, agent and on-chain systems. Browse the work with ls, cat and open.",
  openGraph: {
    title: "Abhijith Viju Priya Rani — Console",
    description:
      "An interactive terminal over a virtual filesystem, with the same record in a typeset plain view.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#141210",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
