import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || "undefined"),
  keywords: [
    "vote",
    "poll",
    "simple vote",
    "simple poll",
    "easy vote",
    "easy poll",
    "vote no account",
    "vote no signup",
    "no signup",
    "no account",
  ],
  title: {
    default: "Simple Vote",
    template: "%s - Simple Vote",
  },
  description: "vote without signup required",
  openGraph: {
    title: "Simple Vote",
    siteName: "Simple Vote",
    type: "website",
    description: "vote without signup required",
    images: ["/simplevotelogo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-gray-100`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
