"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Link2,
  List,
  Maximize2,
  Printer,
  LayoutGrid,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { siteConfig } from "@/lib/utils";
import {
  profileChips,
  profileCommitments,
  profileCtaChecks,
  profileDestinations,
  profileMessage,
  profileMessageMD,
  profileMeta,
  profileOutcomeChecks,
  profileOutcomes,
  profilePartners,
  profileRegulatory,
  profileSeals,
  profileServices,
  profileStages,
  profileStats,
  profileValues,
} from "@/data/companyProfile";

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */
const PAGE_W = 1050;
const PAGE_H = 742;

interface ProfilePage {
  title: string;
  section: string;
  node: React.ReactNode;
}

/* ------------------------------------------------------------------ *
 * Small building blocks
 * ------------------------------------------------------------------ */
function Stamp({ folio, dark = false }: { folio: string; dark?: boolean }) {
  return (
    <div className={dark ? "dpcp-stamp dpcp-stamp--dark" : "dpcp-stamp"}>
      <em>Discovery Pathway</em>
      <strong>{folio}</strong>
      <i>Banepa · NPL</i>
    </div>
  );
}

function PageShell({
  section,
  folio,
  note,
  dark = false,
  children,
}: {
  section: string;
  folio: string;
  note: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={dark ? "dpcp-page dpcp-page--dark" : "dpcp-page"}>
      <div className="dpcp-ph">
        <span className="dpcp-ph__eyebrow">{section}</span>
        <span className="dpcp-ph__brand">Discovery Pathway Pvt. Ltd.</span>
      </div>
      <div className="dpcp-pb">{children}</div>
      <div className="dpcp-pf">
        <span className="dpcp-pf__note">{note}</span>
        <Stamp folio={folio} dark={dark} />
      </div>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return <div className="dpcp-check">{children}</div>;
}

/* ------------------------------------------------------------------ *
 * The fourteen pages
 * ------------------------------------------------------------------ */
function buildPages(contents: { i: number; title: string }[]): ProfilePage[] {
  const pages: ProfilePage[] = [];

  /* 01 — Cover ---------------------------------------------------- */
  pages.push({
    title: "Cover",
    section: "Cover",
    node: (
      <div className="dpcp-page dpcp-page--dark dpcp-cover">
        <div className="dpcp-cover__grid">
          <div className="dpcp-cover__main">
            <div className="dpcp-wordmark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/logo-full-white.png" alt="Discovery Pathway" width={260} height={62} />
            </div>

            <h1 className="dpcp-cover__title">
              Company
              <br />
              <em>Profile.</em>
            </h1>
            <p className="dpcp-cover__sub">
              An international education consultancy in Banepa, Kavrepalanchok — taking Nepali students from the first
              free consultation to the boarding gate.
            </p>

            <div className="dpcp-pillrow">
              <span className="dpcp-pill">Registered with the Ministry of Education</span>
              <span className="dpcp-pill">ECAN Member</span>
              <span className="dpcp-pill">KECAN Member</span>
            </div>

            <div className="dpcp-cover__meta">
              <div>
                Telephone<b>{siteConfig.phone}</b>
              </div>
              <div>
                Office<b>Tindobato Margh, Banepa-8</b>
              </div>
              <div>
                Web<b>discoverypathway.edu.np</b>
              </div>
            </div>
          </div>

          <div className="dpcp-cover__stub">
            <div className="dpcp-stubrow">
              <em>From</em>
              <b>
                {profileMeta.originCode} <span>{profileMeta.originName}</span>
              </b>
            </div>
            <div className="dpcp-stubrow">
              <em>To</em>
              <b>
                Anywhere <span>8 destinations</span>
              </b>
            </div>
            <div className="dpcp-stubrow">
              <em>Established</em>
              <b>{profileMeta.established}</b>
            </div>
            <div className="dpcp-stubrow">
              <em>Class</em>
              <b>Your future</b>
            </div>
            <div className="dpcp-stubrow dpcp-stubrow--last">
              <em>Status</em>
              <b className="dpcp-approved">Approved</b>
            </div>
            <div className="dpcp-cover__edition">{profileMeta.edition}</div>
          </div>
        </div>
        <div className="dpcp-mrz">
          P&lt;NPLDISCOVERY&lt;&lt;PATHWAY&lt;&lt;PVT&lt;&lt;LTD&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          <br />
          BNP011665659NPL&lt;&lt;COMPANYPROFILE&lt;&lt;EST2023&lt;&lt;&lt;&lt;&lt;&lt;08
        </div>
      </div>
    ),
  });

  /* 02 — Contents ------------------------------------------------- */
  pages.push({
    title: "Contents",
    section: "Navigate",
    node: (
      <PageShell section="Navigate" folio="02" note="Registered with the Ministry of Education · ECAN · KECAN">
        <h2 className="dpcp-t2">Contents</h2>
        <div className="dpcp-rule" />
        <div className="dpcp-toc">
          {contents.map((entry, n) => (
            <div className="dpcp-toc__row" key={entry.i}>
              <i>{String(n + 1).padStart(2, "0")}</i>
              <b>{entry.title}</b>
              <u>{entry.i + 1}</u>
            </div>
          ))}
        </div>
      </PageShell>
    ),
  });

  /* 03 — About Us ------------------------------------------------- */
  pages.push({
    title: "About Us",
    section: "Who We Are",
    node: (
      <PageShell section="Who We Are" folio="03" note="Tindobato Margh, Banepa-8, Kavrepalanchok">
        <h2 className="dpcp-t2">
          An agency that treats your file <em>like it matters.</em>
        </h2>
        <div className="dpcp-cols2">
          <div>
            <p className="dpcp-lede">
              Discovery Pathway Pvt. Ltd. is an international education consultancy headquartered in Banepa,
              Kavrepalanchok. Established in 2023 and registered with the Ministry of Education, Science &amp;
              Technology, we hold the technical and certification requirements the sector demands.
            </p>
            <p className="dpcp-b">
              Our counsellors guide students into universities and colleges across South Korea, Japan, Australia, the
              United Kingdom, Canada, the United States, Germany and Finland. Several have visited the campuses they
              recommend, and IELTS, PTE and Japanese classes run in-house rather than being outsourced.
            </p>
            <p className="dpcp-b">
              Four years of practice has taught us that most refused applications are not refused for lack of merit.
              They are refused for lack of preparation — a thin financial file, an unexplained gap, an undeclared
              earlier refusal. Our process closes those gaps before anything is submitted.
            </p>
          </div>
          <div className="dpcp-stack">
            <div className="dpcp-note">
              <h4>Our purpose</h4>
              <p>
                To turn an ambition to study abroad into a documented, defensible application — and to be honest with a
                student when the answer should be &ldquo;not this country, not this year.&rdquo;
              </p>
            </div>
            <div className="dpcp-note dpcp-note--cyan">
              <h4>Who we serve</h4>
              <p>
                Students and families across Kavrepalanchok and the wider Bagmati province, and partner institutions
                abroad who need reliably prepared, verified applicant files from Nepal.
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    ),
  });

  /* 04 — At a Glance ---------------------------------------------- */
  pages.push({
    title: "At a Glance",
    section: "Who We Are",
    node: (
      <PageShell section="Who We Are" folio="04" note="Figures current as at 2026">
        <h2 className="dpcp-t2">Discovery Pathway at a glance</h2>
        <p className="dpcp-lede dpcp-lede--tight">Our record to date, across all destinations.</p>

        <div className="dpcp-stats">
          {profileStats.map((s) => (
            <div className="dpcp-stat" key={s.label}>
              <b>
                {s.value}
                {s.sup ? <sup>{s.sup}</sup> : null}
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="dpcp-chips">
          {profileChips.map((c) => (
            <div className="dpcp-chip" key={c.eyebrow}>
              <em>{c.eyebrow}</em>
              <b>{c.label}</b>
            </div>
          ))}
        </div>
      </PageShell>
    ),
  });

  /* 05 — Vision & Mission ----------------------------------------- */
  pages.push({
    title: "Vision & Mission",
    section: "Vision, Mission & Values",
    node: (
      <PageShell
        section="Vision, Mission & Values"
        folio="05"
        note="Registered with the Ministry of Education · ECAN · KECAN"
      >
        <h2 className="dpcp-t2">Vision &amp; Mission</h2>
        <div className="dpcp-rule" />
        <div className="dpcp-cols2 dpcp-cols2--even">
          <div>
            <p className="dpcp-kicker">I · Vision</p>
            <p className="dpcp-lede">
              To be the consultancy Nepali families trust with the decision, not just the paperwork — known for accurate
              advice, prepared files, and students who arrive abroad ready for what they find.
            </p>
          </div>
          <div>
            <p className="dpcp-kicker">II · Mission</p>
            <p className="dpcp-b">
              To match every student to a destination, institution and budget realistic for their profile, and to
              prepare each application to a standard that survives close scrutiny by an admissions office and an
              immigration officer alike.
            </p>
            <p className="dpcp-b">
              We deliver language and test preparation, documentation, admission and visa filing as one continuous
              service, and we tell students what a decision will actually cost them before they commit to it.
            </p>
          </div>
        </div>
        <div className="dpcp-note">
          <h4>The standard we hold ourselves to</h4>
          <p>
            No guaranteed outcomes, no hidden charges, and no application submitted that we would not be willing to
            defend line by line.
          </p>
        </div>
      </PageShell>
    ),
  });

  /* 06 — Our Values ----------------------------------------------- */
  pages.push({
    title: "Our Values",
    section: "Vision, Mission & Values",
    node: (
      <PageShell section="Vision, Mission & Values" folio="06" note="Integrity · Preparation · Transparency">
        <h2 className="dpcp-t2">Our values</h2>
        <p className="dpcp-lede dpcp-lede--tight">Six commitments that decide how we work when a case gets difficult.</p>
        <div className="dpcp-g3">
          {profileValues.map((v) => (
            <div className="dpcp-item dpcp-item--num" key={v.n}>
              <em>{v.n}</em>
              <h4>{v.title}</h4>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </PageShell>
    ),
  });

  /* 07 — Study Destinations --------------------------------------- */
  pages.push({
    title: "Study Destinations",
    section: "Where You Could Go",
    node: (
      <PageShell section="Where You Could Go" folio="07" note="Route availability varies by intake and profile">
        <h2 className="dpcp-t2">
          Eight destinations, <em>managed end to end.</em>
        </h2>
        <p className="dpcp-lede dpcp-lede--tight">
          Every route below is one we handle ourselves — from institution selection through to visa filing.
        </p>
        <div className="dpcp-dest">
          {profileDestinations.map((d) => (
            <div className={d.featured ? "dpcp-dcard dpcp-dcard--lead" : "dpcp-dcard"} key={d.code}>
              {d.featured ? <span className="dpcp-tag">Most requested</span> : null}
              <span className="dpcp-dcard__code">{d.code}</span>
              <h4>{d.name}</h4>
              <p>{d.route}</p>
            </div>
          ))}
        </div>
        <div className="dpcp-band">
          <div className="dpcp-band__k">Our deepest route</div>
          <p>
            South Korea is where our record is strongest — degree placement on the D-2 route and language-track study on
            D-4, backed by authorised representation for Gimhae University and Far East University and long-standing
            relationships across the Busan region.
          </p>
        </div>
      </PageShell>
    ),
  });

  /* 08 — What We Do ------------------------------------------------ */
  pages.push({
    title: "What We Do",
    section: "What We Provide",
    node: (
      <PageShell section="What We Provide" folio="08" note="All services delivered from the Banepa office">
        <h2 className="dpcp-t2">What we do</h2>
        <div className="dpcp-g2">
          {profileServices.map((s) => (
            <div className="dpcp-item" key={s.title}>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </PageShell>
    ),
  });

  /* 09 — Our Process ----------------------------------------------- */
  pages.push({
    title: "Our Process",
    section: "How We Work",
    node: (
      <PageShell section="How We Work" folio="09" note="Timelines vary by destination, intake and profile">
        <h2 className="dpcp-t2">Six stages. One destination.</h2>
        <p className="dpcp-lede dpcp-lede--tight">
          Indicative timelines. Each stage begins only once the previous one is genuinely complete.
        </p>
        <div className="dpcp-steps">
          {profileStages.map((s) => (
            <div className="dpcp-step" key={s.n}>
              <span className="dpcp-step__n">{s.n}</span>
              <h4>{s.title}</h4>
              <p className="dpcp-step__d">{s.duration}</p>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </PageShell>
    ),
  });

  /* 10 — Partners & Accreditation ---------------------------------- */
  pages.push({
    title: "Partners & Accreditation",
    section: "Our Network",
    node: (
      <PageShell section="Our Network" folio="10" note="Partner list indicative and subject to change">
        <h2 className="dpcp-t2">50+ institutional partners</h2>
        <p className="dpcp-lede dpcp-lede--tight">
          Direct relationships mean faster admission decisions and real scholarship access. A selection:
        </p>
        <div className="dpcp-plist">
          {profilePartners.map((group) => (
            <div className="dpcp-plist__group" key={group.region}>
              <h5>{group.region}</h5>
              {group.names.map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="dpcp-rule" />
        <p className="dpcp-kicker">Accreditation &amp; test partners</p>
        <div className="dpcp-seals">
          {profileSeals.map((s) => (
            <div className="dpcp-seal" key={s.eyebrow}>
              <em>{s.eyebrow}</em>
              <b>{s.label}</b>
            </div>
          ))}
        </div>
      </PageShell>
    ),
  });

  /* 11 — Student Outcomes ------------------------------------------ */
  pages.push({
    title: "Student Outcomes",
    section: "Outcomes",
    node: (
      <PageShell section="Outcomes" folio="11" note="Outcomes depend on individual profile and destination rules">
        <h2 className="dpcp-t2">What students go on to</h2>
        <div className="dpcp-cols2">
          <div>
            <div className="dpcp-g2 dpcp-g2--tight">
              {profileOutcomes.map((o) => (
                <div className="dpcp-item" key={o.title}>
                  <h4>{o.title}</h4>
                  <p>{o.body}</p>
                </div>
              ))}
            </div>
            <div className="dpcp-rule" />
            <p className="dpcp-b dpcp-b--last">
              Several of our own staff are former students who took these routes and returned to counsel the next
              intake — the clearest measure we have that the advice was sound.
            </p>
          </div>
          <div>
            <p className="dpcp-kicker">What students tell us matters most</p>
            <div className="dpcp-checks dpcp-checks--one">
              {profileOutcomeChecks.map((c) => (
                <Check key={c}>{c}</Check>
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    ),
  });

  /* 12 — Compliance ------------------------------------------------ */
  pages.push({
    title: "Compliance & Ethics",
    section: "Governance",
    node: (
      <PageShell section="Governance" folio="12" note="Registration and membership certificates available on request">
        <h2 className="dpcp-t2">Compliance &amp; recruitment ethics</h2>
        <p className="dpcp-lede dpcp-lede--tight">
          Discovery Pathway operates as a registered education consultancy under the Government of Nepal and works
          within the codes of the associations we belong to.
        </p>
        <div className="dpcp-cols2 dpcp-cols2--even">
          <div>
            <p className="dpcp-kicker">Regulatory position</p>
            <div className="dpcp-checks dpcp-checks--one">
              {profileRegulatory.map((r) => (
                <Check key={r}>{r}</Check>
              ))}
            </div>
          </div>
          <div>
            <p className="dpcp-kicker">Our commitments</p>
            <div className="dpcp-checks dpcp-checks--one">
              {profileCommitments.map((c) => (
                <Check key={c}>{c}</Check>
              ))}
            </div>
          </div>
        </div>
        <p className="dpcp-fineprint">
          This page summarises internal policy as at 2026 and is not legal advice. Registration details and full terms
          are set out in our service agreement and available on request.
        </p>
      </PageShell>
    ),
  });

  /* 13 — Message from the CEO -------------------------------------- */
  pages.push({
    title: "Message from the CEO",
    section: "Leadership",
    node: (
      <PageShell section="Leadership" folio="13" note="Banepa · Kavrepalanchok · Nepal">
        <h2 className="dpcp-t2">
          A message from our <em>Chief Executive Officer</em>
        </h2>
        <div className="dpcp-msg">
          <div className="dpcp-msg__body">
            {profileMessage.paragraphs.map((p, i) => (
              <p className="dpcp-b" key={i}>
                {p}
              </p>
            ))}
            <div className="dpcp-sig">
              <b>{profileMessage.author}</b>
              <span>{profileMessage.role}</span>
            </div>
          </div>
          <div>
            <div className="dpcp-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/team/amit-neupane.jpg" alt={profileMessage.author} />
            </div>
            <p className="dpcp-portrait__cap">{profileMessage.author}</p>
          </div>
        </div>
      </PageShell>
    ),
  });

  /* 14 — Message from the MD ---------------------------------------- */
  pages.push({
    title: "Message from the MD",
    section: "Leadership",
    node: (
      <PageShell section="Leadership" folio="14" note="Banepa · Kavrepalanchok · Nepal">
        <h2 className="dpcp-t2">
          A message from our <em>Managing Director</em>
        </h2>
        <div className="dpcp-msg">
          <div className="dpcp-msg__body">
            {profileMessageMD.paragraphs.map((p, i) => (
              <p className="dpcp-b" key={i}>
                {p}
              </p>
            ))}
            <div className="dpcp-sig">
              <b>{profileMessageMD.author}</b>
              <span>{profileMessageMD.role}</span>
            </div>
          </div>
          <div>
            <div className="dpcp-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/team/suman-gautam.jpg" alt={profileMessageMD.author} />
            </div>
            <p className="dpcp-portrait__cap">{profileMessageMD.author}</p>
          </div>
        </div>
      </PageShell>
    ),
  });

  /* 15 — Contact ---------------------------------------------------- */
  pages.push({
    title: "Contact",
    section: "Get in touch",
    node: (
      <PageShell
        section="Get in touch"
        folio="15"
        note={`© ${new Date().getFullYear()} Discovery Pathway Pvt. Ltd. · All rights reserved`}
        dark
      >
        <h2 className="dpcp-t2">
          Your consultation is free.
          <br />
          <em>Your future shouldn&rsquo;t wait.</em>
        </h2>
        <div className="dpcp-cta">
          <div>
            <p className="dpcp-lede">
              Walk into the Banepa office, call, or message on WhatsApp. Students, parents and partner institutions are
              equally welcome.
            </p>
            <div className="dpcp-contactlist">
              <div>
                <em>Telephone</em>
                <b>{siteConfig.phone}</b>
              </div>
              <div>
                <em>WhatsApp</em>
                <b>+977 985-1345539</b>
              </div>
              <div>
                <em>Email</em>
                <b>{siteConfig.email}</b>
              </div>
              <div>
                <em>Office</em>
                <b>
                  Tindobato Margh, Banepa-8
                  <br />
                  Kavrepalanchok, Nepal
                </b>
              </div>
            </div>
          </div>
          <div className="dpcp-boarding">
            <div className="dpcp-boarding__hd">
              <em>Boarding pass</em>
              <b>Confirmed</b>
            </div>
            <div className="dpcp-checks dpcp-checks--one">
              {profileCtaChecks.map((c) => (
                <Check key={c}>{c}</Check>
              ))}
            </div>
            <div className="dpcp-boarding__ft">BNP → Anywhere · Now boarding</div>
          </div>
        </div>
      </PageShell>
    ),
  });

  /* 16 — Back Cover --------------------------------------------------- */
  pages.push({
    title: "Back Cover",
    section: "Back Cover",
    node: (
      <div className="dpcp-page dpcp-page--dark dpcp-back">
        <div className="dpcp-back__grid">
          <div className="dpcp-wordmark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brand/logo-full-white.png" alt="Discovery Pathway" width={220} height={52} />
          </div>

          <div className="dpcp-back__mid">
            <p className="dpcp-back__line">
              Thank you for reading.
              <br />
              <em>We look forward to preparing your file.</em>
            </p>
            <div className="dpcp-pillrow">
              <span className="dpcp-pill">Registered with the Ministry of Education</span>
              <span className="dpcp-pill">ECAN Member</span>
              <span className="dpcp-pill">KECAN Member</span>
            </div>
          </div>

          <div className="dpcp-back__foot">
            <div className="dpcp-cover__meta">
              <div>
                Telephone<b>{siteConfig.phone}</b>
              </div>
              <div>
                Office<b>Tindobato Margh, Banepa-8</b>
              </div>
              <div>
                Web<b>discoverypathway.edu.np</b>
              </div>
            </div>
            <Stamp folio="16" dark />
          </div>
        </div>
        <div className="dpcp-mrz">
          P&lt;NPLDISCOVERY&lt;&lt;PATHWAY&lt;&lt;PVT&lt;&lt;LTD&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          <br />
          BNP011665659NPL&lt;&lt;COMPANYPROFILE&lt;&lt;EST2023&lt;&lt;&lt;&lt;&lt;&lt;16
        </div>
      </div>
    ),
  });

  return pages;
}

/* ------------------------------------------------------------------ *
 * Flipbook
 * ------------------------------------------------------------------ */
export default function CompanyProfileFlipbook() {
  const contents = useMemo(
    () => [
      { i: 2, title: "About Us" },
      { i: 3, title: "At a Glance" },
      { i: 4, title: "Vision & Mission" },
      { i: 5, title: "Our Values" },
      { i: 6, title: "Study Destinations" },
      { i: 7, title: "What We Do" },
      { i: 8, title: "Our Process" },
      { i: 9, title: "Partners & Accreditation" },
      { i: 10, title: "Student Outcomes" },
      { i: 11, title: "Compliance & Ethics" },
      { i: 12, title: "Message from the CEO" },
      { i: 13, title: "Message from the MD" },
      { i: 14, title: "Contact" },
    ],
    []
  );

  const pages = useMemo(() => buildPages(contents), [contents]);
  const total = pages.length;

  const leafPairs = useMemo(() => {
    const out: { front: ProfilePage; back: ProfilePage | null }[] = [];
    for (let i = 0; i < pages.length; i += 2) {
      const front = pages[i];
      if (!front) continue;
      out.push({ front, back: pages[i + 1] ?? null });
    }
    return out;
  }, [pages]);

  const leafCount = leafPairs.length;

  const leadPage = useCallback((s: number) => (s <= 0 ? 0 : Math.min(total - 1, 2 * s - 1)), [total]);
  const spreadOfPage = useCallback((p: number) => (p <= 0 ? 0 : Math.floor((p + 1) / 2)), []);

  const [view, setView] = useState({ spread: 0, page: 0 });
  const [flipping, setFlipping] = useState<number | null>(null);
  const [single, setSingle] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState(0.5);
  const [panel, setPanel] = useState<"none" | "thumbs" | "toc">("none");
  const [thumbsReady, setThumbsReady] = useState(false);
  const [toast, setToast] = useState("");
  const [supportsZoom, setSupportsZoom] = useState(false);

  /* CSS `zoom` renders text at its true final size instead of rasterizing
   * it full-size and photo-scaling it down (which is what makes the
   * shrunk-to-fit pages look blurry on small screens). Feature-detect it
   * since a few older browsers still don't support it. */
  useEffect(() => {
    setSupportsZoom(typeof window !== "undefined" && !!window.CSS?.supports?.("zoom", "1"));
  }, []);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* fit-to-viewport ------------------------------------------------- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const isSingle = window.innerWidth < 900;
      setSingle(isSingle);
      const w = Math.max(160, el.clientWidth - 32);
      const h = Math.max(160, el.clientHeight - 32);
      const bookW = isSingle ? PAGE_W : PAGE_W * 2;
      setFit(Math.max(0.1, Math.min(w / bookW, h / PAGE_H)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* deep link ------------------------------------------------------- */
  useEffect(() => {
    const m = /page=(\d+)/.exec(window.location.hash);
    if (!m || !m[1]) return;
    const p = Math.min(total, Math.max(1, parseInt(m[1], 10))) - 1;
    setView({ page: p, spread: spreadOfPage(p) });
  }, [total, spreadOfPage]);

  useEffect(() => {
    try {
      window.history.replaceState(null, "", `#page=${view.page + 1}`);
    } catch {
      /* sandboxed frame — ignore */
    }
  }, [view.page]);

  useEffect(
    () => () => {
      if (flipTimer.current) clearTimeout(flipTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const say = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1900);
  }, []);

  /* navigation ------------------------------------------------------ */
  const turn = useCallback(
    (dir: 1 | -1) => {
      setView((v) => {
        if (single) {
          const p = v.page + dir;
          if (p < 0 || p >= total) return v;
          return { page: p, spread: spreadOfPage(p) };
        }
        const s = v.spread + dir;
        if (s < 0 || s > leafCount) return v;
        const leaf = Math.min(v.spread, s);
        setFlipping(leaf);
        if (flipTimer.current) clearTimeout(flipTimer.current);
        flipTimer.current = setTimeout(() => setFlipping(null), 780);
        return { spread: s, page: leadPage(s) };
      });
    },
    [single, total, leafCount, leadPage, spreadOfPage]
  );

  const goTo = useCallback(
    (p: number) => {
      const clamped = Math.max(0, Math.min(total - 1, p));
      setFlipping(null);
      setView({ page: single ? clamped : leadPage(spreadOfPage(clamped)), spread: spreadOfPage(clamped) });
      setPanel("none");
    },
    [total, single, leadPage, spreadOfPage]
  );

  /* keyboard -------------------------------------------------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") turn(1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") turn(-1);
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(total - 1);
      else if (e.key === "Escape") setPanel("none");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn, goTo, total]);

  /* swipe ----------------------------------------------------------- */
  const drag = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? 1 : -1);
  };

  /* toolbar actions ------------------------------------------------- */
  const copyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(
        () => say(`Link to page ${view.page + 1} copied`),
        () => say("Copy blocked — use the address bar")
      );
    } else {
      say("Copy blocked — use the address bar");
    }
  };

  const goFullscreen = () => {
    const el = rootRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) void el.requestFullscreen();
      else void document.exitFullscreen();
    } catch {
      say("Full screen unavailable here");
    }
  };

  const openThumbs = () => {
    setThumbsReady(true);
    setPanel((p) => (p === "thumbs" ? "none" : "thumbs"));
  };

  /* derived --------------------------------------------------------- */
  const shift = single ? 0 : view.spread === 0 ? -PAGE_W / 2 : view.spread === leafCount ? PAGE_W / 2 : 0;
  const scale = fit * zoom;
  const currentPage = pages[view.page] ?? null;

  return (
    <div className="dpcp-root" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* toolbar */}
      <div className="dpcp-topbar">
        <div className="dpcp-brandmark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/icon-mark-white.png" alt="" width={26} height={26} aria-hidden="true" />
          <b>Discovery Pathway</b>
          <span>Company Profile</span>
        </div>

        <div className="dpcp-tools">
          <button className={`dpcp-tool${panel === "thumbs" ? " is-on" : ""}`} onClick={openThumbs} title="Thumbnails" aria-label="Thumbnails">
            <LayoutGrid size={18} />
          </button>
          <button
            className={`dpcp-tool${panel === "toc" ? " is-on" : ""}`}
            onClick={() => setPanel((p) => (p === "toc" ? "none" : "toc"))}
            title="Contents"
            aria-label="Contents"
          >
            <List size={18} />
          </button>

          <span className="dpcp-divider" />

          <button className="dpcp-tool" onClick={() => turn(-1)} title="Previous page" aria-label="Previous page">
            <ChevronLeft size={18} />
          </button>
          <span className="dpcp-counter">
            {view.page + 1} / {total}
          </span>
          <button className="dpcp-tool" onClick={() => turn(1)} title="Next page" aria-label="Next page">
            <ChevronRight size={18} />
          </button>

          <span className="dpcp-divider" />

          <button className="dpcp-tool" onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))} title="Zoom out" aria-label="Zoom out">
            <ZoomOut size={18} />
          </button>
          <button className="dpcp-tool" onClick={() => setZoom((z) => Math.min(2.4, z + 0.2))} title="Zoom in" aria-label="Zoom in">
            <ZoomIn size={18} />
          </button>
          <button className="dpcp-tool dpcp-tool--opt" onClick={copyLink} title="Copy link to this page" aria-label="Copy link to this page">
            <Link2 size={18} />
          </button>
          <button className="dpcp-tool dpcp-tool--opt" onClick={() => window.print()} title="Print or save as PDF" aria-label="Print or save as PDF">
            <Printer size={18} />
          </button>
          <button className="dpcp-tool" onClick={goFullscreen} title="Full screen" aria-label="Full screen">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* stage */}
      <div className="dpcp-stage" ref={stageRef} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {single ? (
          <div
            className="dpcp-solo"
            style={supportsZoom ? { zoom: scale } : { transform: `scale(${scale})` }}
            key={view.page}
          >
            {currentPage?.node}
          </div>
        ) : (
          <div className="dpcp-book" style={{ transform: `scale(${scale}) translateX(${shift}px)` }}>
            {leafPairs.map((leaf, i) => {
              const isTurned = i < view.spread;
              const z = flipping === i ? leafCount + 4 : isTurned ? i + 1 : leafCount - i;
              return (
                <div
                  className="dpcp-leaf"
                  key={i}
                  style={{ transform: `rotateY(${isTurned ? -180 : 0}deg)`, zIndex: z }}
                  aria-hidden={!isTurned && i !== view.spread && i !== view.spread - 1}
                >
                  <div className="dpcp-face dpcp-face--front">
                    {leaf.front.node}
                    <span className="dpcp-gutter dpcp-gutter--l" />
                  </div>
                  <div className="dpcp-face dpcp-face--back">
                    {leaf.back?.node}
                    <span className="dpcp-gutter dpcp-gutter--r" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button className="dpcp-edge dpcp-edge--prev" onClick={() => turn(-1)} aria-label="Previous page" />
        <button className="dpcp-edge dpcp-edge--next" onClick={() => turn(1)} aria-label="Next page" />
        <p className="dpcp-hint">Click the page edges, swipe, or use ← → to turn pages</p>
      </div>

      {/* panels */}
      <div className={`dpcp-scrim${panel !== "none" ? " is-on" : ""}`} onClick={() => setPanel("none")} />

      <aside className={`dpcp-panel${panel === "thumbs" ? " is-open" : ""}`} aria-label="Thumbnails">
        <div className="dpcp-panel__hd">
          <span>Thumbnails</span>
          <span>{total} pages</span>
        </div>
        <div className="dpcp-panel__body">
          <div className="dpcp-thumbs">
            {thumbsReady &&
              pages.map((p, i) => (
                <button
                  className={`dpcp-thumb${i === view.page ? " is-current" : ""}`}
                  key={p.title + i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${i + 1}: ${p.title}`}
                >
                  <span className="dpcp-thumb__inner">{p.node}</span>
                  <span className="dpcp-thumb__no">{i + 1}</span>
                </button>
              ))}
          </div>
        </div>
      </aside>

      <aside className={`dpcp-panel${panel === "toc" ? " is-open" : ""}`} aria-label="Contents">
        <div className="dpcp-panel__hd">
          <span>Contents</span>
          <span>Discovery Pathway</span>
        </div>
        <div className="dpcp-panel__body">
          {contents.map((entry, n) => (
            <button
              className={`dpcp-tocitem${entry.i === view.page ? " is-current" : ""}`}
              key={entry.i}
              onClick={() => goTo(entry.i)}
            >
              <i>{String(n + 1).padStart(2, "0")}</i>
              <b>{entry.title}</b>
              <u>{entry.i + 1}</u>
            </button>
          ))}
        </div>
      </aside>

      <div className={`dpcp-toast${toast ? " is-on" : ""}`}>{toast}</div>

      {/* print-only copy */}
      <div className="dpcp-print" aria-hidden="true">
        {pages.map((p, i) => (
          <div className="dpcp-print__page" key={`print-${i}`}>
            {p.node}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Styles — scoped under .dpcp-root
 * ------------------------------------------------------------------ */
const CSS = `
.dpcp-root{
  --pw:${PAGE_W}px; --ph:${PAGE_H}px;
  --ink:#0E1B2B; --ink-soft:#16273B; --ink-60:#5B6472;
  --paper:#F6F4EE; --paper-dim:#EDEAE0;
  --brand:#2453A5; --brand-light:#6E97DE; --brand-dark:#173B7D;
  --cyan:#45C4DD; --cyan-light:#8CDFEE; --cyan-dark:#2C9CB3;
  --rule:#D9D5C9;
  --display:var(--font-fraunces),Georgia,serif;
  --body:var(--font-inter),system-ui,sans-serif;
  --mono:var(--font-plex-mono),ui-monospace,monospace;
  position:fixed; inset:0; z-index:60; display:flex; flex-direction:column;
  background:radial-gradient(1100px 620px at 50% -12%,#1D3557 0%,transparent 62%),
             linear-gradient(180deg,#0B1522 0%,#0E1B2B 46%,#080F19 100%);
  color:#E9E5DB; font-family:var(--body);
}
.dpcp-root *{box-sizing:border-box}

/* ---- toolbar ---- */
.dpcp-topbar{flex:0 0 auto;display:flex;align-items:center;gap:16px;padding:11px 16px;
  border-bottom:1px solid rgba(255,255,255,.09);background:rgba(8,14,23,.55);backdrop-filter:blur(10px)}
.dpcp-brandmark{display:flex;align-items:center;gap:10px;min-width:0}
.dpcp-brandmark img{height:26px;width:auto;flex:0 0 auto}
.dpcp-brandmark b{font-family:var(--display);font-weight:500;font-size:16px;color:#F2EFE7;white-space:nowrap}
.dpcp-brandmark span{font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;
  color:#93A6BB;border-left:1px solid rgba(255,255,255,.16);padding-left:10px;white-space:nowrap}
@media (max-width:760px){.dpcp-brandmark span{display:none}}
.dpcp-tools{margin-left:auto;display:flex;align-items:center;gap:3px;overflow-x:auto;scrollbar-width:none;max-width:100%}
.dpcp-tools::-webkit-scrollbar{display:none}
.dpcp-tool{appearance:none;border:0;background:transparent;color:#9DAFC2;width:36px;height:36px;border-radius:9px;
  display:grid;place-items:center;cursor:pointer;transition:background .16s,color .16s;flex:0 0 auto}
.dpcp-tool:hover{background:rgba(255,255,255,.09);color:#F2EFE7}
.dpcp-tool.is-on{background:var(--brand);color:#fff}
.dpcp-counter{font-family:var(--mono);font-size:11px;letter-spacing:.09em;color:#93A6BB;padding:0 9px;white-space:nowrap;flex:0 0 auto}
.dpcp-divider{width:1px;height:20px;background:rgba(255,255,255,.14);margin:0 4px;flex:0 0 auto}
@media (max-width:520px){.dpcp-tool--opt{display:none}}
@media (max-width:400px){
  .dpcp-topbar{padding:9px 10px;gap:8px}
  .dpcp-brandmark b{font-size:14px}
  .dpcp-tool{width:32px;height:32px}
}

/* ---- stage / book ---- */
.dpcp-stage{flex:1 1 auto;position:relative;display:grid;place-items:center;overflow:auto;padding:16px;touch-action:pan-y}
.dpcp-book{position:relative;width:calc(var(--pw)*2);height:var(--ph);flex:0 0 auto;
  perspective:2600px;transition:transform .45s cubic-bezier(.22,.8,.28,1)}
.dpcp-solo{width:var(--pw);height:var(--ph);flex:0 0 auto;box-shadow:0 26px 60px -22px rgba(0,0,0,.75);
  animation:dpcp-in .3s cubic-bezier(.2,.8,.3,1)}
@keyframes dpcp-in{from{opacity:0;transform:scale(var(--s,1)) translateY(10px)}}
.dpcp-leaf{position:absolute;top:0;left:var(--pw);width:var(--pw);height:var(--ph);
  transform-style:preserve-3d;transform-origin:left center;
  transition:transform .72s cubic-bezier(.42,0,.28,1);will-change:transform}
.dpcp-face{position:absolute;inset:0;overflow:hidden;background:var(--paper);
  backface-visibility:hidden;-webkit-backface-visibility:hidden;
  box-shadow:0 26px 60px -24px rgba(0,0,0,.7),0 2px 8px rgba(0,0,0,.3)}
.dpcp-face--back{transform:rotateY(180deg)}
.dpcp-gutter{position:absolute;top:0;bottom:0;width:36px;pointer-events:none;z-index:6}
.dpcp-gutter--l{left:0;background:linear-gradient(90deg,rgba(14,27,43,.20),transparent)}
.dpcp-gutter--r{right:0;background:linear-gradient(270deg,rgba(14,27,43,.20),transparent)}

.dpcp-edge{position:absolute;top:0;bottom:0;width:12%;border:0;background:transparent;cursor:pointer;z-index:20;opacity:0;transition:opacity .2s}
.dpcp-edge--prev{left:0}
.dpcp-edge--next{right:0}
.dpcp-edge:hover{opacity:1;background:linear-gradient(90deg,rgba(255,255,255,.05),transparent)}
.dpcp-edge--next:hover{background:linear-gradient(270deg,rgba(255,255,255,.05),transparent)}
.dpcp-hint{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);margin:0;
  font-family:var(--mono);font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#7C8FA4;
  pointer-events:none;z-index:3;animation:dpcp-fade 7s forwards}
@keyframes dpcp-fade{0%,72%{opacity:1}100%{opacity:0}}

/* ---- panels ---- */
.dpcp-panel{position:absolute;top:0;bottom:0;left:0;width:min(340px,84vw);z-index:80;
  background:rgba(9,16,26,.96);backdrop-filter:blur(14px);border-right:1px solid rgba(255,255,255,.1);
  transform:translateX(-101%);transition:transform .3s cubic-bezier(.3,.9,.3,1);display:flex;flex-direction:column}
.dpcp-panel.is-open{transform:none}
.dpcp-panel__hd{padding:15px 17px;border-bottom:1px solid rgba(255,255,255,.09);display:flex;justify-content:space-between;
  font-family:var(--mono);font-size:10px;letter-spacing:.19em;text-transform:uppercase;color:#93A6BB}
.dpcp-panel__body{overflow:auto;padding:13px;flex:1}
.dpcp-thumbs{display:grid;grid-template-columns:1fr 1fr;gap:11px}
@media (max-width:900px){.dpcp-thumbs{grid-template-columns:1fr}}
.dpcp-thumb{appearance:none;padding:0;border:1px solid rgba(255,255,255,.12);background:#0B1421;border-radius:4px;
  overflow:hidden;cursor:pointer;position:relative;aspect-ratio:${PAGE_W}/${PAGE_H}}
.dpcp-thumb.is-current{border-color:var(--cyan);box-shadow:0 0 0 2px rgba(69,196,221,.35)}
.dpcp-thumb__inner{position:absolute;top:0;left:0;width:var(--pw);height:var(--ph);
  transform:scale(.142);transform-origin:0 0;pointer-events:none;display:block}
.dpcp-thumb__no{position:absolute;right:4px;bottom:3px;z-index:3;font-family:var(--mono);font-size:9px;color:#fff;
  background:rgba(14,27,43,.82);padding:1px 5px;border-radius:3px}
.dpcp-tocitem{display:flex;align-items:baseline;gap:10px;width:100%;text-align:left;appearance:none;border:0;
  background:transparent;cursor:pointer;padding:10px;border-radius:7px;color:#D3DDE8}
.dpcp-tocitem:hover{background:rgba(255,255,255,.07)}
.dpcp-tocitem.is-current{background:rgba(36,83,165,.35);color:#fff}
.dpcp-tocitem i{font-family:var(--mono);font-style:normal;font-size:10px;color:#8098AF;width:20px;flex:0 0 auto}
.dpcp-tocitem b{font-weight:500;font-size:14px;flex:1}
.dpcp-tocitem u{font-family:var(--mono);font-size:11px;color:#8098AF;text-decoration:none}
.dpcp-scrim{position:absolute;inset:0;background:rgba(4,8,14,.5);z-index:70;opacity:0;pointer-events:none;transition:opacity .3s}
.dpcp-scrim.is-on{opacity:1;pointer-events:auto}
.dpcp-toast{position:absolute;left:50%;bottom:24px;transform:translate(-50%,12px);background:#F2EFE7;color:#0E1B2B;
  font-size:13px;font-weight:500;padding:9px 16px;border-radius:99px;z-index:120;opacity:0;pointer-events:none;
  transition:opacity .25s,transform .25s}
.dpcp-toast.is-on{opacity:1;transform:translate(-50%,0)}

/* ================= PAGE ================= */
.dpcp-page{width:var(--pw);height:var(--ph);position:relative;overflow:hidden;background:var(--paper);color:var(--ink);
  display:flex;flex-direction:column;padding:44px 56px 38px}
.dpcp-page--dark{background:radial-gradient(880px 520px at 78% -10%,#22406B 0%,transparent 62%),
  linear-gradient(160deg,#0E1B2B 0%,#13253A 55%,#0A1421 100%);color:#EBE7DD}
.dpcp-page::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.5;
  background-image:radial-gradient(rgba(14,27,43,.045) .5px,transparent .5px);background-size:3px 3px}
.dpcp-page--dark::before{opacity:.32;background-image:radial-gradient(rgba(255,255,255,.05) .5px,transparent .5px)}

.dpcp-ph{display:flex;align-items:center;justify-content:space-between;flex:0 0 auto;padding-bottom:11px;
  border-bottom:1px solid var(--rule);position:relative;z-index:2}
.dpcp-page--dark .dpcp-ph{border-color:rgba(255,255,255,.16)}
.dpcp-ph__eyebrow{font-family:var(--mono);font-size:10px;letter-spacing:.21em;text-transform:uppercase;color:var(--brand)}
.dpcp-page--dark .dpcp-ph__eyebrow{color:var(--cyan)}
.dpcp-ph__brand{font-family:var(--mono);font-size:10px;letter-spacing:.17em;text-transform:uppercase;color:var(--ink-60)}
.dpcp-page--dark .dpcp-ph__brand{color:#93A6BB}
.dpcp-pb{flex:1 1 auto;min-height:0;padding-top:24px;position:relative;z-index:2;display:flex;flex-direction:column}
.dpcp-pf{flex:0 0 auto;display:flex;align-items:flex-end;justify-content:space-between;padding-top:12px;position:relative;z-index:2}
.dpcp-pf__note{font-family:var(--mono);font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:#94A1AE}
.dpcp-page--dark .dpcp-pf__note{color:#8397AC}

/* signature: entry stamp doubling as the folio */
.dpcp-stamp{transform:rotate(-6.5deg);color:var(--brand);border:2px solid currentColor;border-radius:5px;
  padding:5px 11px 4px;text-align:center;line-height:1.05;box-shadow:inset 0 0 0 1px currentColor;
  opacity:.9;mix-blend-mode:multiply;font-family:var(--mono);flex:0 0 auto}
.dpcp-stamp--dark{color:var(--cyan);mix-blend-mode:normal;opacity:.8}
.dpcp-stamp em{display:block;font-style:normal;font-size:7.5px;letter-spacing:.2em}
.dpcp-stamp strong{display:block;font-size:19px;font-weight:600;letter-spacing:.04em;margin:1px 0}
.dpcp-stamp i{display:block;font-style:normal;font-size:7px;letter-spacing:.17em;opacity:.85}

/* type */
.dpcp-t2{font-family:var(--display);font-weight:400;font-size:36px;line-height:1.08;letter-spacing:-.012em;margin:0 0 10px}
.dpcp-t2 em{font-style:italic;color:var(--brand)}
.dpcp-page--dark .dpcp-t2{color:#F2EFE7}
.dpcp-page--dark .dpcp-t2 em{color:var(--cyan-light)}
.dpcp-lede{font-size:15.5px;line-height:1.62;color:#32455B;max-width:76ch;margin:0 0 16px}
.dpcp-lede--tight{margin-bottom:20px}
.dpcp-page--dark .dpcp-lede{color:#C0CCD9}
.dpcp-b{font-size:14.2px;line-height:1.66;color:#3A4D62;margin:0 0 11px}
.dpcp-b--last{margin:0}
.dpcp-page--dark .dpcp-b{color:#B5C2D0}
.dpcp-kicker{font-family:var(--mono);font-size:10px;letter-spacing:.19em;text-transform:uppercase;color:var(--ink-60);margin:0 0 10px}
.dpcp-page--dark .dpcp-kicker{color:#93A6BB}
.dpcp-rule{height:1px;background:var(--rule);margin:15px 0}
.dpcp-fineprint{font-family:var(--mono);font-size:9px;line-height:1.65;letter-spacing:.02em;color:#8B97A4;margin:14px 0 0}

/* cover */
.dpcp-cover{padding:0;display:block}
.dpcp-cover__grid{position:relative;z-index:2;height:100%;display:grid;grid-template-columns:1.55fr .95fr}
.dpcp-cover__main{padding:50px 44px 40px 56px;display:flex;flex-direction:column}
.dpcp-cover__stub{border-left:2px dashed rgba(255,255,255,.24);padding:50px 38px 40px;display:flex;flex-direction:column;
  background:rgba(255,255,255,.03)}
.dpcp-wordmark{margin-bottom:auto}
.dpcp-wordmark img{height:56px;width:auto;display:block}
.dpcp-cover__title{font-family:var(--display);font-size:64px;line-height:1;font-weight:300;letter-spacing:-.022em;margin:0 0 16px;color:#F2EFE7}
.dpcp-cover__title em{font-style:italic;color:var(--cyan)}
.dpcp-cover__sub{font-size:16px;line-height:1.6;color:#BBC8D6;max-width:46ch;margin:0 0 24px}
.dpcp-pillrow{display:flex;flex-wrap:wrap;gap:8px}
.dpcp-pill{font-family:var(--mono);font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;
  border:1px solid rgba(255,255,255,.24);color:#D4DEEA;border-radius:99px;padding:5px 11px}
.dpcp-cover__meta{display:flex;gap:26px;flex-wrap:wrap;margin-top:22px;padding-bottom:56px}
.dpcp-cover__meta div{font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:#9BAEC2}
.dpcp-cover__meta div b{display:block;color:#EBE7DD;font-family:var(--body);font-size:13px;letter-spacing:0;font-weight:500;margin-top:3px}
.dpcp-stubrow{border-bottom:1px solid rgba(255,255,255,.14);padding:10px 0}
.dpcp-stubrow--last{border-bottom:0}
.dpcp-stubrow em{display:block;font-style:normal;font-family:var(--mono);font-size:8.5px;letter-spacing:.2em;
  text-transform:uppercase;color:#8BA0B5;margin-bottom:4px}
.dpcp-stubrow b{font-family:var(--display);font-size:22px;font-weight:400;display:block;line-height:1.1;color:#EBE7DD}
.dpcp-stubrow b span{font-size:12px;color:#9BAEC2;font-family:var(--body)}
.dpcp-approved{color:var(--cyan)!important}
.dpcp-cover__edition{margin-top:auto;font-family:var(--mono);font-size:9px;letter-spacing:.18em;color:#8BA0B5;
  text-transform:uppercase;padding-bottom:56px}
.dpcp-mrz{font-family:var(--mono);font-size:11.5px;letter-spacing:.09em;color:#91A5BA;background:rgba(255,255,255,.05);
  border-top:1px solid rgba(255,255,255,.12);padding:10px 56px;line-height:1.5;white-space:nowrap;overflow:hidden;
  position:absolute;left:0;right:0;bottom:0;z-index:3}

/* back cover */
.dpcp-back{padding:0;display:block}
.dpcp-back__grid{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;
  padding:50px 56px 40px;justify-content:space-between}
.dpcp-back__mid{display:flex;flex-direction:column;gap:20px;align-self:center;text-align:center;max-width:56ch}
.dpcp-back__line{font-family:var(--display);font-size:30px;line-height:1.28;font-weight:300;color:#F2EFE7;margin:0}
.dpcp-back__line em{font-style:italic;color:var(--cyan)}
.dpcp-back__mid .dpcp-pillrow{justify-content:center}
.dpcp-back__foot{display:flex;align-items:flex-end;justify-content:space-between;padding-bottom:56px}

/* contents */
.dpcp-toc{display:grid;grid-template-columns:1fr 1fr;gap:0 44px;align-content:start}
.dpcp-toc__row{display:flex;align-items:baseline;gap:12px;padding:10px 0;border-bottom:1px solid var(--rule)}
.dpcp-toc__row i{font-family:var(--mono);font-style:normal;font-size:10px;color:var(--brand);width:20px;flex:0 0 auto}
.dpcp-toc__row b{font-family:var(--display);font-size:18.5px;font-weight:400;flex:1}
.dpcp-toc__row u{font-family:var(--mono);font-size:11px;color:var(--ink-60);text-decoration:none}

/* layout helpers */
.dpcp-cols2{display:grid;grid-template-columns:1.12fr .88fr;gap:36px;flex:1;min-height:0}
.dpcp-cols2--even{grid-template-columns:1fr 1fr}
.dpcp-stack{display:flex;flex-direction:column;gap:16px}
.dpcp-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px 26px}
.dpcp-g2{display:grid;grid-template-columns:repeat(2,1fr);gap:17px 30px}
.dpcp-g2--tight{gap:16px 24px}

.dpcp-note{background:var(--paper-dim);border-left:3px solid var(--brand);padding:16px 18px}
.dpcp-note--cyan{border-left-color:var(--cyan)}
.dpcp-note h4{font-family:var(--display);font-size:18px;font-weight:500;margin:0 0 6px}
.dpcp-note p{font-size:13.2px;line-height:1.58;color:#41546A;margin:0}

.dpcp-item h4{font-family:var(--display);font-size:17px;font-weight:500;margin:0 0 4px;line-height:1.2}
.dpcp-item p{font-size:12.7px;line-height:1.54;color:#4A5C70;margin:0}
.dpcp-item--num{border-top:1px solid var(--rule);padding-top:11px}
.dpcp-item--num em{font-family:var(--mono);font-style:normal;font-size:10px;letter-spacing:.16em;color:var(--brand);display:block;margin-bottom:6px}

.dpcp-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.dpcp-stat{padding:19px 16px;border-right:1px solid var(--rule)}
.dpcp-stat:last-child{border-right:0}
.dpcp-stat b{display:block;font-family:var(--display);font-size:43px;font-weight:400;line-height:1;letter-spacing:-.02em}
.dpcp-stat b sup{font-size:20px;top:-.7em;position:relative;color:var(--cyan-dark)}
.dpcp-stat span{display:block;font-family:var(--mono);font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;color:var(--ink-60);margin-top:8px}

.dpcp-chips{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:24px}
.dpcp-chip{border:1px solid var(--rule);padding:13px 14px;background:#fff;display:flex;flex-direction:column;gap:4px}
.dpcp-chip em{font-family:var(--mono);font-style:normal;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:var(--brand)}
.dpcp-chip b{font-family:var(--display);font-size:16px;font-weight:500;line-height:1.22}

.dpcp-dest{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}
.dpcp-dcard{border:1px solid var(--rule);background:#fff;padding:13px;display:flex;flex-direction:column;gap:7px;position:relative}
.dpcp-dcard--lead{background:var(--ink);border-color:var(--ink);color:#EBE7DD}
.dpcp-dcard__code{font-family:var(--mono);font-size:10px;letter-spacing:.15em;border:1px solid var(--rule);border-radius:3px;
  padding:3px 7px;align-self:flex-start;color:var(--ink-60)}
.dpcp-dcard--lead .dpcp-dcard__code{border-color:rgba(255,255,255,.3);color:#C5D2DF}
.dpcp-dcard h4{font-family:var(--display);font-size:18px;font-weight:500;margin:0;line-height:1.15}
.dpcp-dcard p{font-family:var(--mono);font-size:9.5px;letter-spacing:.05em;line-height:1.5;color:var(--ink-60);margin:0}
.dpcp-dcard--lead p{color:#A8B9CA}
.dpcp-tag{position:absolute;top:-9px;right:11px;background:var(--cyan-dark);color:#fff;font-family:var(--mono);font-size:8px;
  letter-spacing:.15em;text-transform:uppercase;padding:3px 8px;border-radius:2px}

.dpcp-band{margin-top:18px;border:1px solid var(--rule);border-left:3px solid var(--cyan);background:var(--paper-dim);
  padding:14px 18px;display:flex;gap:22px;align-items:baseline}
.dpcp-band__k{font-family:var(--mono);font-size:9px;letter-spacing:.17em;text-transform:uppercase;color:var(--brand);
  white-space:nowrap;flex:0 0 auto}
.dpcp-band p{margin:0;font-size:13px;line-height:1.58;color:#41546A}

.dpcp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px 26px;flex:1;align-content:start}
.dpcp-step{border-top:2px solid var(--ink);padding-top:11px}
.dpcp-step__n{font-family:var(--mono);font-size:10px;letter-spacing:.17em;color:var(--brand)}
.dpcp-step h4{font-family:var(--display);font-size:18px;font-weight:500;margin:5px 0 3px;line-height:1.18}
.dpcp-step__d{font-family:var(--mono);font-size:9px;letter-spacing:.11em;text-transform:uppercase;color:var(--ink-60);margin:0 0 7px}
.dpcp-step p{font-size:12.5px;line-height:1.54;color:#4A5C70;margin:0}

.dpcp-plist{columns:4;column-gap:26px;font-size:12.5px;line-height:1.85;color:#3A4D62}
.dpcp-plist__group{break-inside:avoid}
.dpcp-plist__group div{padding-left:13px;position:relative;break-inside:avoid}
.dpcp-plist__group div::before{content:"";position:absolute;left:0;top:.72em;width:5px;height:5px;border:1px solid var(--cyan-dark);border-radius:50%}
.dpcp-plist h5{font-family:var(--mono);font-size:9px;letter-spacing:.17em;text-transform:uppercase;color:var(--brand);
  margin:0 0 3px;break-after:avoid}

.dpcp-seals{display:flex;gap:12px;flex-wrap:wrap}
.dpcp-seal{border:1.5px solid var(--brand-light);border-radius:4px;padding:10px 14px;background:#fff;flex:1 1 190px;max-width:250px}
.dpcp-seal em{display:block;font-style:normal;font-family:var(--mono);font-size:8.5px;letter-spacing:.17em;
  text-transform:uppercase;color:var(--brand);margin-bottom:4px}
.dpcp-seal b{font-family:var(--display);font-size:14px;font-weight:500;line-height:1.28;display:block}

.dpcp-checks{display:grid;gap:9px 26px}
.dpcp-checks--one{grid-template-columns:1fr}
.dpcp-check{font-size:12.8px;line-height:1.5;color:#3A4D62;padding-left:20px;position:relative}
.dpcp-check::before{content:"";position:absolute;left:0;top:5px;width:11px;height:7px;
  border-left:1.8px solid var(--cyan-dark);border-bottom:1.8px solid var(--cyan-dark);transform:rotate(-45deg)}
.dpcp-page--dark .dpcp-check{color:#C0CCD9}
.dpcp-page--dark .dpcp-check::before{border-color:var(--cyan)}

.dpcp-msg{display:grid;grid-template-columns:1fr .42fr;gap:40px;flex:1;min-height:0}
.dpcp-msg__body{display:flex;flex-direction:column}
.dpcp-sig{margin-top:auto;padding-top:16px;border-top:1px solid var(--rule)}
.dpcp-sig b{font-family:var(--display);font-size:21px;font-weight:500;display:block}
.dpcp-sig span{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-60)}
.dpcp-portrait{aspect-ratio:4/5;background:var(--paper-dim);border:1px solid var(--rule);overflow:hidden}
.dpcp-portrait img{width:100%;height:100%;object-fit:cover;display:block}
.dpcp-portrait__cap{font-family:var(--mono);font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:#94A1AE;margin:8px 0 0}

.dpcp-cta{display:grid;grid-template-columns:1.05fr .95fr;gap:42px;flex:1;min-height:0}
.dpcp-contactlist{display:flex;flex-direction:column;gap:14px;margin-top:18px}
.dpcp-contactlist div em{display:block;font-style:normal;font-family:var(--mono);font-size:8.5px;letter-spacing:.19em;
  text-transform:uppercase;color:#8BA0B5;margin-bottom:3px}
.dpcp-contactlist div b{font-family:var(--display);font-size:19px;font-weight:400;color:#EBE7DD}
.dpcp-boarding{border:1px dashed rgba(255,255,255,.28);padding:20px;display:flex;flex-direction:column;gap:13px;
  background:rgba(255,255,255,.04)}
.dpcp-boarding__hd{display:flex;justify-content:space-between;align-items:baseline;
  border-bottom:1px solid rgba(255,255,255,.16);padding-bottom:9px}
.dpcp-boarding__hd em{font-style:normal;font-family:var(--mono);font-size:9px;letter-spacing:.19em;text-transform:uppercase;color:#8BA0B5}
.dpcp-boarding__hd b{font-family:var(--display);font-size:17px;font-weight:400;color:var(--cyan)}
.dpcp-boarding__ft{margin-top:auto;font-family:var(--mono);font-size:9px;letter-spacing:.17em;text-transform:uppercase;
  color:#8BA0B5;border-top:1px solid rgba(255,255,255,.16);padding-top:11px}

/* print */
.dpcp-print{display:none}
@media print{
  @page{size:A4 landscape;margin:0}
  .dpcp-root{position:static!important;background:#fff!important;display:block!important}
  .dpcp-topbar,.dpcp-stage,.dpcp-panel,.dpcp-scrim,.dpcp-toast{display:none!important}
  .dpcp-print{display:block!important}
  .dpcp-print__page{break-after:page;page-break-after:always}
  .dpcp-print .dpcp-page{width:297mm;height:208mm;padding:13mm 15mm 11mm;box-shadow:none}
  .dpcp-print .dpcp-page::before{display:none}
  .dpcp-print .dpcp-page--dark{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}

@media (prefers-reduced-motion:reduce){
  .dpcp-leaf,.dpcp-book,.dpcp-panel,.dpcp-solo{transition:none!important;animation:none!important}
}
`;