import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CertificatesGrid from "@/components/certificates/CertificatesGrid";

export const metadata: Metadata = {
  title: "Certificates & Registration",
  description:
    "Discovery Pathway's official credentials — government registration, ECAN membership, authorized university partnerships with Far East University and Gimhae University, and certified counselor training. Licensed education consultancy in Banepa, Nepal.",
  alternates: { canonical: "/certificates" },
};

export default function CertificatesPage() {
  return (
    <div className="section-pad bg-paper">
      <Container>
        <Breadcrumbs items={[{ label: "Certificates" }]} />
        <div className="mt-6 max-w-2xl">
          <SectionHeading
            eyebrow="Verified & Licensed"
            title="Registered, recognized, and accountable."
            description="From our government permit and ECAN membership to direct partnerships with universities abroad and certified staff training — every credential here is real. Click any certificate to view the full document."
          />
        </div>
        <div className="mt-12">
          <CertificatesGrid />
        </div>
      </Container>
    </div>
  );
}