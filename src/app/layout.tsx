import type { Metadata } from "next";
import "./globals.css";
import Ticker from "@/components/Ticker";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Ali Badshah: Storyteller & Builder",
  description: "Portfolio & Booking Site for Ali Badshah: AI-native product designer, #1 bestselling author, and Oscar-nominated storyteller.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preload" href="/fonts/COOPBL.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <Ticker />
        {children}
      </body>
    </html>
  );
}
