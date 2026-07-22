import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { footerLinks } from "@/data/navigation";
import { siteConfig } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="border-b border-paper/10 bg-ink-soft py-6">
        <Container className="flex flex-col items-center gap-4 text-center">
          <p className="mono-label text-paper/60">Accreditations</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-paper">
                <Image
                  src="/images/brand/government-registration-logo.jpg"
                  alt="Government of Nepal, Bagmati Province"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <span className="text-sm text-paper/80">Approved by Ministry of Education</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-paper">
                <Image
                  src="/images/partners/ecan.jpeg"
                  alt="ECAN — Education Consultancy Association of Nepal"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <span className="text-sm text-paper/80">Member of ECAN</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-paper">
                <Image
                  src="/images/partners/kecan.png"
                  alt="KECAN"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <span className="text-sm text-paper/80">Member of KECAN</span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="section-pad">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center" aria-label="Discovery Pathway — home">
              <Image
                src="/images/brand/logo-full-white.png"
                alt="Discovery Pathway"
                width={352}
                height={80}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              {siteConfig.tagline} An international education consultancy based in Banepa, guiding
              Nepali students through admissions and visas for eight study destinations.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 transition-colors hover:border-brass hover:text-brass-light"
              >
                <Facebook size={18} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 transition-colors hover:border-brass hover:text-brass-light"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="mono-label mb-4 text-paper/50">Services</p>
            <ul className="space-y-3">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-paper/75 transition-colors hover:text-brass-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label mb-4 text-paper/50">Resources</p>
            <ul className="space-y-3">
              {footerLinks.resources.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-paper/75 transition-colors hover:text-brass-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label mb-4 text-paper/50">Contact</p>
            <ul className="space-y-3 text-sm text-paper/75">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brass-light" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-brass-light" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-brass-light">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-brass-light" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brass-light">{siteConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-8 sm:flex-row">
          <p className="text-xs text-paper/50">
            © {new Date().getFullYear()} Discovery Pathway. All rights reserved.
            <span className="mx-2 text-paper/20">|</span>
            Designed & developed by{" "}
            
              <a href="https://www.rachitpokhrel.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brass-light"
            >
              Rachit Pokhrel
            </a>
          </p>
          <div className="flex gap-6">
            {footerLinks.company.slice(3).map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-paper/50 hover:text-brass-light">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}