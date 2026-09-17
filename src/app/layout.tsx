import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Microinformatics (Pvt.) Ltd | Bio-IT & Healthcare AI Startup",
    template: "%s | Microinformatics",
  },
  description: "Microinformatics bridges life sciences and advanced computing. Offering bioinformatics training, AI/ML courses, genomics analysis, and healthcare AI research. Incubated at NIC Faisalabad & Beaconhouse.",
  keywords: ["bioinformatics", "genomics", "AI", "machine learning", "NGS", "Python", "R", "computational biology", "drug discovery", "healthcare AI"],
  authors: [{ name: "Microinformatics (Pvt.) Ltd" }],
  creator: "Microinformatics",
  publisher: "Microinformatics",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://microinformatics.pk",
    siteName: "Microinformatics",
    title: "Microinformatics (Pvt.) Ltd | Bio-IT & Healthcare AI Startup",
    description: "Bridging life sciences and advanced computing. Bioinformatics training, AI/ML courses, genomics analysis, and healthcare AI research.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Microinformatics - Bio-IT & Healthcare AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Microinformatics (Pvt.) Ltd",
    description: "Bridging life sciences and advanced computing. Bioinformatics training, AI/ML courses, genomics analysis, and healthcare AI research.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Providers>
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}