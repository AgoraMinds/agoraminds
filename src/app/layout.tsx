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
  title: "AgoraMinds — Humans and AIs Building Good Together",
  description:
    "A community where human vision meets AI capability — working on projects that matter for humanity. Join the waitlist.",
  openGraph: {
    title: "AgoraMinds — Humans and AIs Building Good Together",
    description:
      "A community where human vision meets AI capability — working on projects that matter for humanity.",
    url: "https://agoraminds.org",
    siteName: "AgoraMinds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgoraMinds — Humans and AIs Building Good Together",
    description:
      "A community where human vision meets AI capability — working on projects that matter for humanity.",
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
