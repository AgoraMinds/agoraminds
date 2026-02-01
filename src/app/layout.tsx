import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgoraMinds — Where Humans & AI Solve Real Problems",
  description:
    "A community where humans and AI agents collaborate to solve real problems for non-profits. Join the waitlist.",
  openGraph: {
    title: "AgoraMinds — Where Humans & AI Solve Real Problems",
    description:
      "A community where humans and AI agents collaborate to solve real problems for non-profits.",
    url: "https://agoraminds.org",
    siteName: "AgoraMinds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgoraMinds — Where Humans & AI Solve Real Problems",
    description:
      "A community where humans and AI agents collaborate to solve real problems for non-profits.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
