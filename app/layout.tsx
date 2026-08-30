import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import StickyConsultCTA from "@/components/layout/StickyConsultCTA";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { siteConfig } from "@/lib/utils";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Study Abroad Consultancy in Banepa, Nepal`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Discovery Pathway",
    "Discovery Pathway Banepa",
    "Best consultancy in Banepa",
    "Best education consultancy in Banepa",
    "Banepa education consultancy",
    "Verified education consultancy Banepa",
    "Government registered consultancy Banepa",
    "ECAN registered consultancy Banepa",
    "Trusted consultancy Banepa",
    "Education consultancy Kavrepalanchok",
    "study abroad Nepal",
    "study abroad consultancy Nepal",
    "overseas education consultancy Nepal",
    "visa consultancy Nepal",
    "South Korea visa Nepal",
    "South Korea student visa Banepa",
    "D-2 visa Nepal",
    "D-4 visa Nepal",
    "study in South Korea from Nepal",
    "Korean language classes Banepa",
    "Gimhae University Nepal",
    "Japan student visa Nepal",
    "study in Japan from Nepal",
    "Japanese language classes Banepa",
    "Australia student visa Nepal",
    "study in Australia from Nepal",
    "Australia visa consultancy Banepa",
    "USA student visa Nepal",
    "UK student visa Nepal",
    "Canada study visa Nepal",
    "Germany study visa Nepal",
    "Finland study visa Nepal",
    "IELTS Banepa",
    "IELTS classes Banepa",
    "British Council IELTS Banepa",
    "IDP IELTS Banepa",
    "PTE classes Banepa",
    "scholarship consultancy Nepal",
    "university admission consultancy Nepal",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — Study Abroad Consultancy in Banepa, Nepal`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Study Abroad Consultancy in Banepa, Nepal`,
    description: siteConfig.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/og-image.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tindobato Margh",
      addressLocality: "Banepa",
      addressRegion: "Kavrepalanchok",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.630841,
      longitude: 85.5190126,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "17:00",
      },
    ],
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.tiktok],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Government Registration",
        name: "Government Registered Consultancy",
        recognizedBy: { "@type": "Organization", name: "Bagmati Province Government" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Membership",
        name: "ECAN Registered Consultancy",
        recognizedBy: { "@type": "Organization", name: "Education Consultancy Association of Nepal (ECAN)" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "University Partnership",
        name: "Far East University — Authorized Recruitment Partner",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "Far East University" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "University Partnership",
        name: "Gimhae University — Authorized Representative",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "Gimhae University" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Test Centre Authorization",
        name: "Authorised British Council IELTS Registration Centre",
        recognizedBy: { "@type": "Organization", name: "British Council" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Partner Recognition",
        name: "IDP IELTS — Top Performing Partner for Banepa",
        recognizedBy: { "@type": "Organization", name: "IDP Education" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Staff Training",
        name: "Educational Counselor Training — Amit Neupane",
        recognizedBy: { "@type": "Organization", name: "TITI (Training Institute for Technical Instruction)" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Staff Training",
        name: "Educational Counselor Training — Manju Timalsina",
        recognizedBy: { "@type": "Organization", name: "TITI (Training Institute for Technical Instruction)" },
      },
    ],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="pt-[var(--header-height)]">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <StickyConsultCTA />
        <ScrollToTop />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}