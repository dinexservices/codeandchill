import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
    default: "Code & Chill",
    template: "%s | Code & Chill"
  },
  description: "The ultimate platform for coding events, hackathons, and tech workshops. Join the community of innovators and builders.",
  keywords: ["hackathon", "coding events", "tech community", "programming", "developer", "startups"],
  authors: [{ name: "Code & Chill Team" }],
  creator: "Code & Chill",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codeandchill.com",
    siteName: "Code & Chill",
    title: "Code & Chill - Connect, Code, Create",
    description: "The ultimate platform for coding events, hackathons, and tech workshops.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Code & Chill Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code & Chill",
    description: "The ultimate platform for coding events and hackathons.",
    creator: "@codeandchill",
  },
  icons: {
    icon: "/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}
