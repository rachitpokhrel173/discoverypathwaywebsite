"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, X, ZoomIn } from "lucide-react";

export const credentials = [
  {
    title: "Government Registered Consultancy",
    detail: "Permit No. xx/xxx/xxx — Ministry of Social Development, Bagmati Province Government",
    image: "/images/certifications/government-registration.jpg",
  },
  {
    title: "ECAN Registered Consultancy",
    detail: "Membership No. 846/2080/06/23 — Educational Consultancy Association of Nepal",
    image: "/images/certifications/ecan-membership.jpg",
  },
  {
    title: "Far East University — Authorized Recruitment Partner",
    detail: "Certificate of Appointment, South Korea — valid June 2026 to May 2029",
    image: "/images/certifications/fareast-university-appointment.jpg",
  },
  {
    title: "Gimhae University — Authorized Representative",
    detail: "Official representative agency for Nepal — Delegation Period: March 2027 to March 2029",
    image: "/images/certifications/gimhae-authorized-representative.jpg",
  },
  {
    title: "Authorised British Council IELTS Registration Centre",
    detail: "Official IELTS Registration Centre for the British Council Nepal — valid until December 2026",
    image: "/images/certifications/british-council-ielts-centre.jpg",
  },
  {
    title: "IDP IELTS — Top Performing Partner for Banepa",
    detail: "7th Annual IELTS Partners' Recognition Meet, Nepal 2025 — awarded for outstanding IELTS business performance",
    image: "/images/certifications/idp-ielts-top-performer.jpg",
  },
  {
    title: "Educational Counselor Training — Amit Neupane",
    detail: "CTEVT / Training Institute for Technical Instruction (TITI), Bhaktapur — Feb 2025",
    image: "/images/certifications/titi-amit-neupane.jpg",
  },
  {
    title: "Educational Counselor Training — Manju Timalsina",
    detail: "CTEVT / Training Institute for Technical Instruction (TITI), Bhaktapur — Feb 2025",
    image: "/images/certifications/titi-manju-timalsina.jpg",
  },
];

export default function CertificatesGrid() {
  const [open, setOpen] = useState<string | null>(null);
  const active = credentials.find((c) => c.image === open);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((c) => (
          <button
            key={c.image}
            type="button"
            onClick={() => setOpen(c.image)}
            className="group text-left"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-pass border border-ink/10 bg-paper-dim shadow-stamp">
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/40">
                <ZoomIn
                  size={28}
                  className="text-paper opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </div>
            <div className="mt-3 flex items-start gap-2">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brass" />
              <div>
                <p className="text-sm font-semibold text-ink">{c.title}</p>
                <p className="mt-0.5 text-xs text-ink-60">{c.detail}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-pass bg-paper shadow-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur hover:bg-ink"
            >
              <X size={18} />
            </button>
            <div className="max-h-[85vh] overflow-y-auto p-4 sm:p-6">
              <p className="mono-label mb-3 text-ink-60">{active.title}</p>
              <div className="relative w-full overflow-hidden rounded-lg border border-ink/10">
                <Image
                  src={active.image}
                  alt={active.title}
                  width={1200}
                  height={850}
                  className="h-auto w-full object-contain"
                />
              </div>
              <p className="mt-3 text-sm text-ink-60">{active.detail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}