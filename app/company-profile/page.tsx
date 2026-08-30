import type { Metadata } from "next";
import CompanyProfileFlipbook from "@/components/company-profile/CompanyProfileFlipbook";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "The Discovery Pathway Pvt. Ltd. company profile — established 2023 in Banepa, Kavrepalanchok and registered with the Ministry of Education, Science & Technology. Destinations, services, process, partners, accreditation and leadership.",
  alternates: { canonical: "/company-profile" },
  openGraph: {
    type: "article",
    url: `${siteConfig.url}/company-profile`,
    title: `Company Profile | ${siteConfig.name}`,
    description:
      "Eight destinations, one process. The full corporate profile of Discovery Pathway Pvt. Ltd., Banepa.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
};

export default function CompanyProfilePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Company Profile — ${siteConfig.name}`,
    url: `${siteConfig.url}/company-profile`,
    description: metadata.description,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    about: {
      "@type": "EducationalOrganization",
      name: "Discovery Pathway Pvt. Ltd.",
      foundingDate: "2023",
      url: siteConfig.url,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tindobato Margh",
        addressLocality: "Banepa",
        addressRegion: "Kavrepalanchok",
        addressCountry: "NP",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CompanyProfileFlipbook />
    </>
  );
}
