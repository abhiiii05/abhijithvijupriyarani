import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Karla } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhijith Viju Priya Rani — The Index",
  description:
    "Selected backend work: four services migrated at Wipro, production e-commerce for Vasco Foods, a multi-year Solarium contract, and queue, agent and on-chain systems.",
  openGraph: {
    title: "Abhijith Viju Priya Rani — The Index",
    description:
      "An editorial index of backend work and the systems behind it. Wipro, Vasco Foods, Solarium, and three independent builds.",
    type: "website",
    locale: "en_IN",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f4efe4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
