import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/providers";
import { PWARegister } from "@/components/pwa-register";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { OfflineIndicator } from "@/components/offline-indicator";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SentryInit } from "@/components/sentry-init";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "NotiFetch — Never Miss Another Delivery",
    template: "%s · NotiFetch",
  },
  description:
    "NotiFetch brings every delivery notification into one beautiful, real-time feed. No passwords, no APIs, no credentials — just one permission. Works with 119+ delivery platforms worldwide.",
  keywords: [
    "delivery notifications",
    "delivery aggregator",
    "gig worker app",
    "delivery driver app",
    "notification listener",
    "multi-platform delivery",
    "Swiggy Zomato Uber Eats DoorDash",
    "delivery rider tools",
  ],
  authors: [{ name: "Yashas K", url: "https://notifetch.in" }],
  creator: "Yashas K",
  publisher: "Yashas K",
  manifest: "/manifest.json",
  applicationName: "NotiFetch",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NotiFetch",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: true,
  },
  openGraph: {
    title: "NotiFetch — Never Miss Another Delivery",
    description:
      "Every delivery notification in one beautiful feed. No passwords, no APIs, just one permission. Works with 119+ delivery platforms worldwide.",
    siteName: "NotiFetch",
    type: "website",
    url: "https://notifetch.in",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NotiFetch — Never miss another delivery",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NotiFetch — Never Miss Another Delivery",
    description:
      "Every delivery notification in one beautiful feed. No passwords, no APIs, just one permission.",
    creator: "@notifetch",
    site: "@notifetch",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://notifetch.in"),
  alternates: {
    canonical: "https://notifetch.in",
  },
  category: "technology",
  other: {
    "contact:email": "notifetch@notifetch.in",
    "application-name": "NotiFetch",
    "apple-mobile-web-app-title": "NotiFetch",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="google-site-verification" content="google3343fb98372e9164" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SoftwareApplication",
                  "name": "NotiFetch",
                  "url": "https://notifetch.in",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Android 8.0+",
                  "description": "NotiFetch brings every delivery notification into one beautiful, real-time feed. No passwords, no APIs, just one permission.",
                  "author": {
                    "@type": "Person",
                    "name": "Yashas K",
                    "jobTitle": "Founder & Developer",
                    "url": "https://notifetch.in",
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR",
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "10",
                  },
                },
                {
                  "@type": "Organization",
                  "name": "NotiFetch",
                  "url": "https://notifetch.in",
                  "email": "notifetch@notifetch.in",
                  "founder": {
                    "@type": "Person",
                    "name": "Yashas K",
                  },
                },
                {
                  "@type": "WebSite",
                  "name": "NotiFetch",
                  "url": "https://notifetch.in",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://notifetch.in/platforms/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <OfflineIndicator />
            <SentryInit />
            {children}
            <Toaster />
            <PWARegister />
            <PWAInstallPrompt />
            <Analytics />
            <SpeedInsights />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
