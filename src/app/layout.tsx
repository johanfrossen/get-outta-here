import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400"],
});

export const metadata: Metadata = {
  title: "Get Outta Here — Mediterranean Flight Escapes",
  description:
    "Find spontaneous Mediterranean escape flights. Search, discover, and book your next getaway.",
  openGraph: {
    title: "Get Outta Here",
    description:
      "Spontaneous Mediterranean escape flights. Search and discover your next getaway.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Outta Here",
    description: "Spontaneous Mediterranean escape flights.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-text-primary font-mono">
        {children}
      </body>
    </html>
  );
}
