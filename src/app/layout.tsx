import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi/Satoshi-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Medium.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://phzipcodes.com"),
  title:
    "Philippines ZIP Code Lookup - Postal Codes for All Regions, Provinces & Cities",
  description:
    "Complete Philippines ZIP code directory. Find postal codes for Metro Manila, provinces, municipalities, and barangays. Fast search for Philippine addresses and mailing.",
  keywords:
    "Philippines ZIP code, postal code Philippines, Filipino postal code, Philippine addresses, Metro Manila ZIP, province postal codes, municipality codes",
  authors: [{ name: "Philippines ZIP Codes" }],
  robots: "index, follow",
  openGraph: {
    title: "Philippines ZIP Code Lookup - Complete Postal Code Directory",
    description:
      "Complete Philippines ZIP code directory. Find postal codes for Metro Manila, provinces, municipalities, and barangays.",
    type: "website",
    locale: "en_PH",
    siteName: "Philippines ZIP Codes",
  },
  twitter: {
    card: "summary",
    title: "Philippines ZIP Code Lookup",
    description:
      "Complete Philippines ZIP code directory. Find postal codes for all locations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${satoshi.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Philippines ZIP Code Lookup",
              description:
                "Complete Philippines ZIP code directory for all regions, provinces, and municipalities",
              url: "https://phzipcodes.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://phzipcodes.com/?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Philippines ZIP Codes",
              },
            }),
          }}
        />
        <meta name="theme-color" content="#2563eb" />
        <meta name="geo.region" content="PH" />
        <meta name="geo.country" content="Philippines" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5638349874631535"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-inter" style={{ overscrollBehaviorX: "auto" }}>
        <Header />
        <main className="container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
