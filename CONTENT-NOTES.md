# Content notes — read before publishing

## A. Five problems in `Company_Profile.pdf`

I did not carry these into the new page. You should fix them in the PDF too, since
it's presumably still being sent to students and partners.

**1. Another company's name, twice.**
The Director's message says the mission is one *"we embrace at Global"* — "Global"
is not your company. And under *Follow-up & Securing Admission*:
*"HELLO SUCCESS EDUCATION CONSULTANCY's success rate in admissions is 100%."*
Both are leftovers from whatever template the document was built from. This is the
most damaging thing in the PDF — a partner institution who notices it will assume
the whole document was copied.

**2. "Our services are limited to English-speaking regions only."**
Directly contradicted two pages later, where the PDF lists South Korea, Japan and
Germany as destinations. Delete the sentence.

**3. "100% admission success rate."**
An absolute claim that is unverifiable and reads as a red flag to regulators and
admissions offices. The new page states 97.9% visa success, matching `siteConfig`.

**4. Attribution mismatch.**
The PDF letter is signed by **Amit Neupane** as *Managing Director*, but
`data/team.ts` lists him as **Chief Executive Officer** and **Suman Kumar Gautam**
as Managing Director. I used CEO on page 13. Decide which is right and make the
PDF, `team.ts` and this page agree.

**5. Australia's population is given as 23 million.** It's roughly 27 million now.

## B. Two facts I had to choose between

**Email.** The PDF gives `discoverypathway2023@gmail.com`; `siteConfig.email` gives
`info@discoverypathway.edu.np`. The page renders `siteConfig.email`, so it stays in
sync with the rest of the site. Change `siteConfig` if the Gmail address is the one
you actually monitor.

**Destination count.** `siteConfig.stats.destinations` is `16`, and the homepage
boarding pass says "16 destinations" — but you have eight destination pages, and
the homepage section heading says "Eight destinations. One process." The profile
says **8**. Worth reconciling `siteConfig` either way, because the two numbers
currently sit on the same homepage.

## C. Site-wide TOPIK cleanup

You said you don't do TOPIK. The new page has none. But TOPIK appears in **17 places
across 10 files** elsewhere on the site, and they split into two different kinds —
only the first kind is wrong.

### Claims that you teach or coach TOPIK — these need changing

| File | Line | What it says |
|---|---|---|
| `components/home/WhyChooseUs.tsx` | 17 | "IELTS, TOPIK, and Japanese language instruction happen in-house" |
| `data/process.ts` | 24 | "Structured coaching in IELTS, TOPIK, or Japanese language fundamentals" |
| `data/faqs.ts` | 16 | "IELTS/TOPIK/language test preparation" |
| `data/gallery.ts` | 18 | caption: "TOPIK preparation workshop" |
| `app/events/page.tsx` | 10 | page description mentions "TOPIK scholarships" |
| `app/layout.tsx` | 59–60 | keywords `"TOPIK Nepal"`, `"TOPIK classes Banepa"` |

In the first three, `TOPIK` → `PTE` reads naturally and matches your PDF.

### Factual statements about Korea's system — probably fine to keep

These don't claim you teach TOPIK; they describe how Korean admissions and
scholarships work, which is accurate and useful to students:

| File | Line |
|---|---|
| `data/destinations.ts` | 24, 43, 50, 75, 77 (scholarship tiers, visa checklist, FAQ) |
| `data/faqs.ts` | 30, 51 (approval rates, GPA-gated scholarships) |
| `data/team.ts` | 57 (Reewaz Adhikari handles "TOPIK-linked scholarship applications") |
| `data/testimonials.ts` | 31 (a student's own words about their TOPIK scholarship) |

Your call — but I'd keep these. Helping a student apply for a TOPIK-linked
scholarship is not the same as running TOPIK classes, and removing them would make
your Korea pages noticeably thinner.

## D. Unverified claim carried over

Page 3 says *"Several have visited the campuses they recommend"* — from the PDF's
*"visited respective nation's universities and colleges."* Keep it only if it's
still true of your current counsellors.
