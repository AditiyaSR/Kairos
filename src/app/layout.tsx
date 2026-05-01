import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kairos AI — AI Automation for Dubai Real Estate",
  description:
    "Kairos AI helps Dubai real estate agencies stop lead leakage, qualify serious prospects instantly, and route deal-ready clients to agents in real-time with 24/7 AI workflows.",
  keywords: [
    "Kairos AI",
    "Dubai Real Estate",
    "AI Automation",
    "Lead Qualification",
    "WhatsApp AI",
    "Real Estate CRM",
    "UAE Property",
  ],
  authors: [{ name: "Kairos AI Automations" }],
  openGraph: {
    title: "Kairos AI — AI Automation for Dubai Real Estate",
    description:
      "Stop lead leakage. Qualify prospects instantly. Route deal-ready clients in real-time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
