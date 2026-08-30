// @ts-nocheck
// Ported from a JS prototype; not yet typed for this project's strict tsconfig.
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  CONTENT — three full Academic Reading passages, 40 questions       */
/* ------------------------------------------------------------------ */

const SECTION_1 = {
  id: 1,
  label: "Section 1",
  passage: {
    title: "The Return of the Urban Beehive",
    paragraphs: [
      { label: "A", text: "For most of the twentieth century, beekeeping was pushed steadily out of towns and cities. Municipal codes in many countries classified hives as agricultural equipment, and agriculture, by definition, belonged in the countryside. Bees became associated with rural life, and the skills needed to keep them thinned out among city dwellers with each passing decade. Yet in the last fifteen years the trend has sharply reversed. Rooftops in Paris, London, New York and Tokyo now host thousands of hives, and waiting lists for beginner beekeeping courses in major cities routinely stretch past a year." },
      { label: "B", text: "The revival did not begin with environmentalists but with chefs and hoteliers. One well-known Parisian hotel, unable to find a rooftop garden supplier it trusted, cited the building's height and privacy as ideal for a hive that would not disturb pedestrians below. The honey, sold in the hotel restaurant as a novelty, sparked interest from other high-end establishments, and within a decade a modest network of hotel rooftop apiaries had formed across the city, largely unnoticed by the wider public and unconnected to any organised environmental campaign." },
      { label: "C", text: "What changed public perception was a series of reports, beginning around the mid-2000s, describing a mysterious collapse of honeybee colonies across North America and Europe. Beekeepers opened hives to find them almost empty, worker bees simply gone, with no dead bodies to explain the disappearance. The phenomenon, termed colony collapse disorder, was never traced to a single cause; researchers pointed to a combination of pesticide exposure, parasitic mites, viral disease and habitat loss. The uncertainty itself proved persuasive. Newspapers ran alarmed headlines about the possible loss of pollination services, and city dwellers, many of whom had never given a bee a second thought, began to see hive-keeping as a small, practical act of environmental repair." },
      { label: "D", text: "Urban environments turn out to offer bees several advantages over farmland, a fact that surprised many early researchers. Cities are typically two to three degrees warmer than surrounding rural areas, extending the foraging season at both ends. Municipal parks, private gardens and even roadside verges provide a far greater diversity of flowering plants across the year than a single-crop farm, where one plant species may bloom for only a few weeks before the field is bare. Urban areas also tend to use fewer broad-spectrum pesticides than intensive agricultural land, since spraying near homes and schools is heavily restricted. Studies comparing colony health in one English city and its surrounding countryside found that urban colonies survived winter at notably higher rates than their rural counterparts." },
      { label: "E", text: "The boom has not been without friction. As hive numbers climbed in several major cities, some ecologists warned that the honeybee, itself a managed livestock species rather than a wild animal, was being promoted at the expense of solitary and wild bee species that perform much of the pollination work in urban parks and gardens. A single well-stocked hive can contain fifty thousand foraging bees, and where hive density is high, these can out-compete wild pollinators for limited nectar and pollen, particularly in early spring when flowers are scarce. Several cities have since introduced permit systems that cap the number of hives per rooftop and require applicants to demonstrate that nearby green space can support the additional foraging pressure, a regulatory approach that was almost unheard of a decade ago." },
      { label: "F", text: "Whether urban beekeeping ultimately proves to be a meaningful contribution to pollinator conservation or a well-intentioned distraction from it remains an open question among ecologists. What is not in dispute is its effect on public engagement. Beekeeping associations in several countries report that the majority of their new members now come from cities rather than rural areas, reversing a pattern that had held for most of the previous century. For a growing number of urban residents, a rooftop hive has become their first sustained encounter with an ecological system whose workings they had previously read about only in passing." }
    ]
  },
  questions: [
    { n: 1, type: "tfng", skill: "Fact-checking / scanning", prompt: "Beekeeping was legally treated as a rural activity in many places for most of the 1900s.", answer: "TRUE", explanation: "Paragraph A states hives were classified as agricultural equipment, which by definition belonged in the countryside." },
    { n: 2, type: "tfng", skill: "Fact-checking / scanning", prompt: "The hotel mentioned in the passage began keeping bees as part of a citywide environmental campaign.", answer: "FALSE", explanation: "Paragraph B says the hotel's hive was unconnected to any organised environmental campaign." },
    { n: 3, type: "tfng", skill: "Distinguishing FALSE from NOT GIVEN", prompt: "Scientists eventually identified a single definite cause of colony collapse disorder.", answer: "FALSE", explanation: "Paragraph C explicitly says the phenomenon was never traced to a single cause." },
    { n: 4, type: "tfng", skill: "Distinguishing FALSE from NOT GIVEN", prompt: "Colony collapse disorder has since been eliminated through improved pesticide regulation.", answer: "NOT GIVEN", explanation: "The passage discusses possible causes but never states the disorder has been eliminated." },
    { n: 5, type: "tfng", skill: "Fact-checking / scanning", prompt: "The English city study found lower winter survival rates for urban colonies than rural ones.", answer: "FALSE", explanation: "Paragraph D says urban colonies survived winter at notably higher rates — the opposite of the statement." },
    { n: 6, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph B", answer: "ii" },
    { n: 7, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph C", answer: "iv" },
    { n: 8, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph D", answer: "i" },
    { n: 9, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph E", answer: "iii" },
    { n: 10, type: "mcq", skill: "Understanding argument / detail", prompt: "According to paragraph D, one reason urban areas suit bees is that:", options: ["A. cities plant far more crops than rural farms do.", "B. cities offer a wider variety of flowering plants across more of the year.", "C. urban bees are immune to common pesticides.", "D. rural areas have banned pesticide use entirely."], answer: "B", explanation: "The paragraph contrasts the diversity of urban flowering plants across the year with a single-crop farm that blooms briefly." },
    { n: 11, type: "mcq", skill: "Understanding argument / detail", prompt: "The permit systems described in paragraph E were introduced mainly to:", options: ["A. increase honey production in cities.", "B. protect hotels from complaints about hives.", "C. limit competition between managed honeybees and wild pollinators.", "D. encourage more residents to take up beekeeping."], answer: "C", explanation: "The paragraph explains hive caps followed concerns that honeybees were out-competing wild pollinators." },
    { n: 12, type: "completion", skill: "Precise word-for-word matching", prompt: "The unexplained disappearance of worker bees from hives is known as colony ______ disorder.", answer: "collapse", explanation: "Paragraph C names the phenomenon \"colony collapse disorder.\"" },
    { n: 13, type: "completion", skill: "Precise word-for-word matching", prompt: "Beekeeping associations report that most new members now come from ______ rather than rural areas.", answer: "cities", explanation: "Paragraph F states new members now come from cities rather than rural areas." }
  ],
  headings: [
    "i. A surprising benefit of city conditions over farmland",
    "ii. An unexpected origin story involving the hospitality trade",
    "iii. Growing caution and the rise of official limits",
    "iv. A scientific mystery that changed public opinion",
    "v. Declining interest among younger farmers",
    "vi. A shift in who joins beekeeping organisations",
    "vii. The financial cost of maintaining a rooftop hive"
  ]
};

const SECTION_2 = {
  id: 2,
  label: "Section 2",
  passage: {
    title: "The Silent Rise of Vertical Farming",
    paragraphs: [
      { label: "A", text: "Vertical farming, the practice of growing crops in stacked layers inside climate-controlled buildings, has been presented for over a decade as a solution to land scarcity and the carbon cost of transporting fresh produce long distances. The first large-scale facilities emerged not in countries with abundant farmland but in places where it was in short supply, most notably Japan and Singapore in the early 2010s, where planners saw stacked indoor farms as a way to grow food without competing for scarce land." },
      { label: "B", text: "The efficiency claims are striking. Because water recirculates in a closed loop rather than draining into soil, vertical farms typically use up to 95 percent less water than open-field agriculture, and are entirely unaffected by rainfall. Controlled indoor climates also remove the constraint of a single growing season: leafy greens grown vertically can be harvested as often as fifteen times a year, compared with one to three harvests for the same crop grown in an open field." },
      { label: "C", text: "The central weakness of the model lies in energy. Replacing sunlight with LED lighting and maintaining a stable indoor climate both require substantial and continuous electricity. Unless that electricity comes from renewable sources, the emissions saved by cutting transport distances can be offset, or even outweighed, by the emissions generated to power the farm. This is why the economics of vertical farming currently favour high-value, fast-growing produce such as herbs and leafy greens, rather than staple crops like wheat or rice, which require far more energy relative to their market price to justify growing indoors." },
      { label: "D", text: "The gap between early enthusiasm and operating reality became apparent in the mid-2020s, when several prominent vertical farming companies, some of which had raised large sums from investors, filed for bankruptcy or sharply scaled back operations. Reaching profitability at a large scale proved harder than initial projections had suggested, and the setbacks prompted a period of reassessment across the industry about which crops, and which scales of operation, could actually sustain a viable business." },
      { label: "E", text: "Proponents argue this is a temporary setback rather than a fundamental limit. They point to the falling cost of renewable electricity and continuing efficiency gains in LED technology, along with research facilities already experimenting with vertical wheat and rice production, as evidence that a broader range of crops will eventually become viable indoors. Sceptics are less convinced, arguing that vertical farming will likely remain a niche supplement to open-field agriculture, useful chiefly for perishable greens grown close to urban markets, rather than a genuine replacement for staple crop production at scale." }
    ]
  },
  questions: [
    { n: 14, type: "tfng", skill: "Fact-checking / scanning", prompt: "Vertical farming first emerged as a large-scale industry in countries with abundant agricultural land.", answer: "FALSE", explanation: "Paragraph A says the first large facilities emerged in places where land was in short supply, such as Japan and Singapore." },
    { n: 15, type: "tfng", skill: "Fact-checking / scanning", prompt: "Vertical farms typically use significantly less water than traditional field agriculture.", answer: "TRUE", explanation: "Paragraph B states vertical farms use up to 95% less water than open-field agriculture." },
    { n: 16, type: "tfng", skill: "Distinguishing FALSE from NOT GIVEN", prompt: "All crop types are currently equally profitable to grow in vertical farms.", answer: "FALSE", explanation: "Paragraph C says the economics currently favour leafy greens and herbs over staple crops, not all crops equally." },
    { n: 17, type: "tfng", skill: "Distinguishing FALSE from NOT GIVEN", prompt: "Every vertical farming company launched in the 2010s has since become profitable.", answer: "FALSE", explanation: "Paragraph D describes several prominent companies going bankrupt or scaling back, contradicting the claim that every one became profitable." },
    { n: 18, type: "matching_info", skill: "Locating specific information", prompt: "A comparison of harvest frequency between vertical and field-grown crops.", answer: "B" },
    { n: 19, type: "matching_info", skill: "Locating specific information", prompt: "An explanation of why leafy greens are currently more commercially viable indoors than staple crops.", answer: "C" },
    { n: 20, type: "matching_info", skill: "Locating specific information", prompt: "A mention of businesses closing down despite earlier investor enthusiasm.", answer: "D" },
    { n: 21, type: "completion", skill: "Precise phrase matching (max 2 words)", prompt: "The main technology used to replace sunlight in vertical farms is ______.", answer: "LED lighting", explanation: "Paragraph C refers to \"LED lighting\" as the replacement for sunlight." },
    { n: 22, type: "completion", skill: "Precise phrase matching (max 2 words)", prompt: "Falling renewable electricity costs might eventually make it viable to grow ______ crops such as wheat and rice indoors.", answer: "staple crops", explanation: "Paragraphs C and E both refer to \"staple crops\" such as wheat and rice." },
    { n: 23, type: "completion", skill: "Precise phrase matching (max 2 words)", prompt: "Sceptics believe vertical farming will likely remain a ______ to open-field agriculture.", answer: "niche supplement", explanation: "Paragraph E states sceptics see it remaining \"a niche supplement to open-field agriculture.\"" },
    { n: 24, type: "mcq", skill: "Understanding argument / detail", prompt: "According to paragraph B, one advantage of vertical farms is that they:", options: ["A. depend heavily on seasonal rainfall.", "B. can be harvested far more often per year than field crops.", "C. require no water at all.", "D. only grow staple grain crops."], answer: "B", explanation: "Paragraph B says leafy greens can be harvested up to fifteen times a year versus one to three for field crops." },
    { n: 25, type: "mcq", skill: "Understanding argument / detail", prompt: "The main criticism of vertical farming raised in paragraph C is that:", options: ["A. LED lights are too dim for healthy plant growth.", "B. electricity use can offset the environmental benefits gained from cutting transport emissions.", "C. hydroponic systems use more water than traditional farms.", "D. urban land is too expensive for large facilities."], answer: "B", explanation: "Paragraph C explains that emissions from powering the farm can offset or outweigh emissions saved on transport." },
    { n: 26, type: "mcq", skill: "Understanding argument / detail", prompt: "What does paragraph D suggest about the vertical farming industry in the mid-2020s?", options: ["A. It expanded faster than investors expected.", "B. Several companies found it difficult to operate profitably at scale.", "C. Government subsidies solved most cost problems.", "D. Consumer demand for the produce collapsed."], answer: "B", explanation: "Paragraph D describes bankruptcies and scaled-back operations as profitability at scale proved harder than projected." }
  ]
};

const SECTION_3 = {
  id: 3,
  label: "Section 3",
  passage: {
    title: "Rethinking Sleep: A History of the Night",
    paragraphs: [
      { label: "A", text: "Historical documents from pre-industrial Europe and colonial America describe a pattern of nighttime rest that looks unfamiliar today: a first sleep of several hours, a period of quiet wakefulness in the middle of the night, and then a second sleep until morning. References to this two-part pattern turn up so consistently across diaries, medical texts and household records from the period that historians now regard it as the ordinary way most people slept, not an unusual exception." },
      { label: "B", text: "The evidence behind this claim comes from an analysis of several hundred historical documents spanning multiple centuries and countries, in which researchers found hundreds of references to what contemporary writers called a \"first sleep\" and \"second sleep.\" The waking interval between them, sometimes lasting an hour or more, was apparently used for a range of quiet activities: prayer, reflection, low-key conversation with a bed partner, or even short visits to neighbours, none of which were treated as unusual or worth remarking on at length." },
      { label: "C", text: "This segmented pattern did not survive the spread of artificial lighting. As street lighting and, later, electric lighting in homes became widespread across the nineteenth century, bedtimes shifted later and the middle-of-night waking period gradually disappeared from ordinary experience. Within a couple of generations, the practice had faded from living memory almost entirely, and the single, unbroken block of sleep that most people now consider normal had quietly become the assumed default." },
      { label: "D", text: "The disappearance of segmented sleep came with a shift in attitude, not just habit. Earlier centuries treated the middle-of-night waking period as unremarkable and, in some accounts, quietly useful. Modern medicine, by contrast, has tended to treat any waking in the middle of the night as a symptom requiring explanation, often labelling it as a form of insomnia to be corrected rather than a variation to be expected." },
      { label: "E", text: "Whether this represents a lost biological rhythm or simply an old habit shaped by darkness remains genuinely disputed among sleep scientists. Some researchers who have placed volunteers in extended periods of darkness without artificial light, mimicking pre-industrial nights, report that a tendency toward two distinct sleep periods reappears within a few weeks. Other researchers are unconvinced, pointing to small sample sizes, short study durations and the difficulty of separating any biological tendency from decades of modern lifestyle habits that participants bring into the laboratory. No consensus has been reached." },
      { label: "F", text: "A further complication is commercial. The market for sleep-tracking apps, specialised mattresses and sleep supplements is worth billions of dollars worldwide, and its marketing overwhelmingly promotes a single, uninterrupted block of sleep as the standard every user should be aiming for. Historical patterns of segmented sleep are rarely, if ever, mentioned in this marketing. Critics argue that commercial incentives, more than biological evidence, are what currently shape public assumptions about what a normal night's sleep should look like." }
    ]
  },
  headings: [
    "i. An unproven hypothesis about ancient artificial lighting",
    "ii. A pattern of nighttime sleep documented across many cultures",
    "iii. The evidence behind a forgotten sleep pattern",
    "iv. The disappearance of a once-common sleep pattern",
    "v. A change in attitudes towards wakefulness during the night",
    "vi. Conflicting views among sleep scientists today",
    "vii. The commercial forces shaping sleep advice",
    "viii. A period of rest once considered strange rather than normal"
  ],
  wordBank: ["lighting", "consolidated", "remedy", "tendency", "medication", "fragmented", "urban", "expensive"],
  questions: [
    { n: 27, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph B (Paragraph A has been done for you as an example: ii)", answer: "iii" },
    { n: 28, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph C", answer: "iv" },
    { n: 29, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph D", answer: "v" },
    { n: 30, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph E", answer: "vi" },
    { n: 31, type: "heading", skill: "Identifying main idea per paragraph", prompt: "Paragraph F", answer: "vii" },
    { n: 32, type: "tfng", labels: ["YES", "NO", "NOT GIVEN"], skill: "Identifying writer's views (Yes/No/Not Given)", prompt: "The writer suggests that pre-industrial sleep patterns were considered unusual at the time.", answer: "NO", explanation: "Paragraph A says this pattern was the ordinary way most people slept, not an unusual exception." },
    { n: 33, type: "tfng", labels: ["YES", "NO", "NOT GIVEN"], skill: "Identifying writer's views (Yes/No/Not Given)", prompt: "The writer argues that sleep science has reached a consensus on whether segmented sleep is biologically natural.", answer: "NO", explanation: "Paragraph E explicitly states no consensus has been reached." },
    { n: 34, type: "tfng", labels: ["YES", "NO", "NOT GIVEN"], skill: "Identifying writer's views (Yes/No/Not Given)", prompt: "According to the writer, commercial interests have influenced public assumptions about what counts as normal sleep.", answer: "YES", explanation: "Paragraph F states critics argue commercial incentives shape public assumptions about normal sleep." },
    { n: 35, type: "tfng", labels: ["YES", "NO", "NOT GIVEN"], skill: "Identifying writer's views (Yes/No/Not Given)", prompt: "The writer believes segmented sleep should be reintroduced as standard medical advice.", answer: "NOT GIVEN", explanation: "No recommendation of this kind is made anywhere in the passage." },
    { n: 36, type: "bank", skill: "Summary completion from a word bank", prompt: "Historical documents suggest that before the spread of artificial ______, many people slept in two distinct blocks separated by a period of quiet wakefulness.", answer: "lighting", explanation: "Paragraph C: \"the spread of artificial lighting.\"" },
    { n: 37, type: "bank", skill: "Summary completion from a word bank", prompt: "This pattern gradually disappeared and was replaced by the expectation of a single, ______ block of sleep.", answer: "consolidated", explanation: "This paraphrases the \"single, unbroken block of sleep\" described in paragraph C." },
    { n: 38, type: "bank", skill: "Summary completion from a word bank", prompt: "Today, some researchers see occasional night waking as a natural ______ rather than a disorder, though this view remains contested.", answer: "tendency", explanation: "Paragraph E refers to \"a tendency toward two distinct sleep periods.\"" },
    { n: 39, type: "mcq", skill: "Understanding argument / detail", prompt: "According to paragraph E, researchers who placed volunteers in extended darkness found that:", options: ["A. participants disliked the experience and asked to stop.", "B. a tendency towards two sleep periods reappeared without artificial light.", "C. the pattern only appeared in participants over sixty.", "D. artificial light had no effect on sleep patterns at all."], answer: "B", explanation: "Paragraph E says a tendency toward two distinct sleep periods reappears within a few weeks in such studies." },
    { n: 40, type: "mcq", skill: "Understanding argument / detail", prompt: "The main purpose of paragraph F is to:", options: ["A. recommend specific products for improving sleep.", "B. describe how a historical sleep pattern was scientifically disproven.", "C. suggest that commercial interests may shape ideas about normal sleep.", "D. argue that sleep tracking apps are inaccurate."], answer: "C", explanation: "Paragraph F argues commercial incentives shape public assumptions about normal sleep, more than biological evidence does." }
  ]
};

const SECTIONS = [SECTION_1, SECTION_2, SECTION_3];
const ALL_QUESTIONS = SECTIONS.flatMap((s) => s.questions.map((q) => ({ ...q, sectionId: s.id })));
const TOTAL_SECONDS = 60 * 60;

/* Approximate published raw-score-to-band conversion for a 40-question Academic Reading test. */
const BAND_TABLE = [
  { min: 39, band: 9 }, { min: 37, band: 8.5 }, { min: 35, band: 8 }, { min: 33, band: 7.5 },
  { min: 30, band: 7 }, { min: 27, band: 6.5 }, { min: 23, band: 6 }, { min: 19, band: 5.5 },
  { min: 15, band: 5 }, { min: 13, band: 4.5 }, { min: 10, band: 4 }, { min: 8, band: 3.5 },
  { min: 6, band: 3 }, { min: 4, band: 2.5 }, { min: 0, band: 2 }
];
function bandFromRaw(raw) {
  const hit = BAND_TABLE.find((row) => raw >= row.min);
  return hit ? hit.band : 2;
}

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function normalise(s) { return (s || "").trim().toLowerCase().replace(/[.\s]+$/g, ""); }
function isCorrect(q, given) { if (!given) return false; return normalise(given) === normalise(q.answer); }
function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function romanFromHeadingLine(line) { return line.split(".")[0]; }

function localFeedback(wrongQs, raw) {
  if (wrongQs.length === 0) {
    return { estimatedBand: 9.0, summary: "A clean sweep across all three sections — every answer matched the passages precisely.", tips: [], strengths: ["Scanning for specific facts", "Matching paragraph content to headings", "Locating exact words and phrases for completion answers"] };
  }
  const tips = wrongQs.map((q) => ({ questionNumber: q.n, skill: q.skill, tip: q.explanation || "Re-read the relevant paragraph closely and compare it word-for-word with the statement." }));
  const bySkill = {};
  wrongQs.forEach((q) => { bySkill[q.skill] = (bySkill[q.skill] || 0) + 1; });
  const topSkill = Object.entries(bySkill).sort((a, b) => b[1] - a[1])[0][0];
  return {
    estimatedBand: bandFromRaw(raw),
    summary: `${wrongQs.length} of 40 answers didn't match the passages. The pattern suggests it's worth slowing down on "${topSkill.toLowerCase()}" in particular.`,
    tips,
    strengths: ["Completed the full test within the time limit"]
  };
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function ReadingSection({ onBack }) {
  const [activeSection, setActiveSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [aiState, setAiState] = useState({ status: "idle", data: null });
  const timerRef = useRef(null);

  useEffect(() => {
    if (submitted) return;
    timerRef.current = setInterval(() => {
      setSeconds((s) => { if (s <= 1) { clearInterval(timerRef.current); return 0; } return s - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [submitted]);

  useEffect(() => { if (seconds === 0 && !submitted) handleSubmit(); /* eslint-disable-next-line */ }, [seconds]);

  const setAnswer = (n, val) => { if (submitted) return; setAnswers((a) => ({ ...a, [n]: val })); };

  const answeredCount = Object.keys(answers).filter((k) => answers[k]).length;
  const results = ALL_QUESTIONS.map((q) => ({ ...q, given: answers[q.n] || "", correct: isCorrect(q, answers[q.n]) }));
  const score = results.filter((r) => r.correct).length;
  const wrongQs = results.filter((r) => !r.correct);
  const band = bandFromRaw(score);

  const fetchAiFeedback = useCallback(async () => {
    setAiState({ status: "loading", data: null });
    try {
      const detail = results.map((r) => `Q${r.n} [section ${r.sectionId}, type ${r.type}, skill: ${r.skill}] — student answered "${r.given || "(blank)"}", correct answer "${r.answer}", ${r.correct ? "CORRECT" : "INCORRECT"}.`).join("\n");
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1400,
          messages: [{
            role: "user",
            content: `You are an IELTS Academic Reading examiner giving feedback on a full 40-question, three-passage practice test (True/False/Not Given, Yes/No/Not Given, matching headings, matching information, multiple choice, and completion questions). Raw score: ${score}/40. Here is the marking detail:\n\n${detail}\n\nReturn ONLY valid JSON, no markdown fences, no preamble, in exactly this shape:\n{"estimatedBand": <number 2.0-9.0, one decimal, your own estimate based on the pattern of errors, it does not need to match a standard table exactly>, "summary": "<3-4 sentence overall summary of performance across all three sections, encouraging but honest, noting which section(s) were strongest/weakest>", "tips": [{"questionNumber": <int>, "skill": "<short skill name>", "tip": "<one specific, actionable sentence>"}], "strengths": ["<short phrase>", "..."]}\nOnly include "tips" entries for questions the student got wrong, and prioritise the most instructive 10-12 if there are many. Keep the whole response concise.`
          }]
        })
      });
      const data = await response.json();
      const text = (data.content || []).map((b) => b.text || "").join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setAiState({ status: "done", data: parsed });
    } catch (err) {
      setAiState({ status: "done", data: localFeedback(wrongQs, score), fallback: true });
    }
    // eslint-disable-next-line
  }, [results, score]);

  const handleSubmit = () => { clearInterval(timerRef.current); setSubmitted(true); fetchAiFeedback(); };
  const handleReset = () => { setAnswers({}); setSubmitted(false); setSeconds(TOTAL_SECONDS); setAiState({ status: "idle", data: null }); setActiveSection(1); };

  const timeLow = seconds <= 300 && seconds > 0;
  const section = SECTIONS.find((s) => s.id === activeSection);
  const sectionAnsweredCount = section.questions.filter((q) => answers[q.n]).length;

  const renderQuestionInput = (q) => {
    if (q.type === "tfng") {
      const labels = q.labels || ["TRUE", "FALSE", "NOT GIVEN"];
      return (
        <div className="q-options">
          {labels.map((opt) => (
            <label className="q-option" key={opt}>
              <input type="radio" name={`q${q.n}`} checked={answers[q.n] === opt} onChange={() => setAnswer(q.n, opt)} />
              {opt}
            </label>
          ))}
        </div>
      );
    }
    if (q.type === "mcq") {
      return (
        <div className="q-options">
          {q.options.map((opt) => {
            const letter = opt[0];
            return (
              <label className="q-option" key={letter}>
                <input type="radio" name={`q${q.n}`} checked={answers[q.n] === letter} onChange={() => setAnswer(q.n, letter)} />
                {opt}
              </label>
            );
          })}
        </div>
      );
    }
    if (q.type === "heading") {
      return (
        <select className="q-fill" value={answers[q.n] || ""} onChange={(e) => setAnswer(q.n, e.target.value)}>
          <option value="">Choose heading…</option>
          {section.headings.map((h) => { const roman = romanFromHeadingLine(h); return <option key={roman} value={roman}>{h}</option>; })}
        </select>
      );
    }
    if (q.type === "matching_info") {
      return (
        <select className="q-fill" value={answers[q.n] || ""} onChange={(e) => setAnswer(q.n, e.target.value)}>
          <option value="">Choose paragraph…</option>
          {section.passage.paragraphs.map((p) => <option key={p.label} value={p.label}>Paragraph {p.label}</option>)}
        </select>
      );
    }
    if (q.type === "bank") {
      return (
        <select className="q-fill" value={answers[q.n] || ""} onChange={(e) => setAnswer(q.n, e.target.value)}>
          <option value="">Choose word…</option>
          {section.wordBank.map((w) => <option key={w} value={w}>{w}</option>)}
        </select>
      );
    }
    return <input className="q-fill" type="text" placeholder="Type your answer…" value={answers[q.n] || ""} onChange={(e) => setAnswer(q.n, e.target.value)} />;
  };

  const groupTitleFor = (type, sectionId) => {
    const map = {
      tfng: sectionId === 3 ? "Yes / No / Not Given" : "True / False / Not Given",
      heading: "Match each paragraph to a heading",
      matching_info: "Which paragraph contains the following information?",
      mcq: "Multiple choice",
      completion: "Sentence completion",
      bank: "Summary completion — choose from the word bank"
    };
    return map[type] || "";
  };

  let lastType = null;

  return (
    <div className="ielts-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .ielts-root { --paper:#EFEAE0; --paper-raised:#F8F5EE; --ink:#1D2B3A; --ink-soft:#4A5A6A; --rule:#C9C0AC; --stamp:#A3323E; --gold:#9C7A44; --correct:#3A6B4C; --correct-bg:#E4EEE4; --wrong-bg:#F6E4E1; font-family:'IBM Plex Sans',sans-serif; color:var(--ink); background:var(--paper); min-height:100%; width:100%; }
        .ielts-root * { box-sizing: border-box; }
        .ielts-shell { max-width: 1180px; margin: 0 auto; padding: 0 0 40px; }
        .ielts-header { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; border-bottom:2px solid var(--ink); background:var(--paper-raised); }
        .ielts-brand { display:flex; flex-direction:column; gap:2px; }
        .back-link { align-self:flex-start; font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.05em; color:var(--ink-soft); background:none; border:none; cursor:pointer; padding:0 0 4px; }
        .back-link:hover { color:var(--gold); }
        .ielts-brand .eyebrow { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); }
        .ielts-brand h1 { font-family:'Lora',serif; font-size:22px; margin:0; font-weight:600; }
        .ielts-timer { font-family:'IBM Plex Mono',monospace; font-size:26px; font-weight:600; padding:6px 16px; border:2px solid var(--ink); border-radius:4px; background:var(--paper); min-width:96px; text-align:center; transition:color .3s,border-color .3s; }
        .ielts-timer.low { color:var(--stamp); border-color:var(--stamp); }
        .ielts-progress-bar { height:4px; background:var(--rule); width:100%; }
        .ielts-progress-fill { height:100%; background:var(--gold); transition:width .3s ease; }
        .ielts-instructions { padding:14px 24px; background:#E3DCC9; border-bottom:1px solid var(--rule); font-size:14px; color:var(--ink-soft); }
        .ielts-instructions b { color:var(--ink); }
        .ielts-body { display:grid; grid-template-columns:1fr 1fr; gap:0; }
        @media (max-width: 860px) { .ielts-body { grid-template-columns:1fr; } }
        .ielts-passage { padding:28px 30px; border-right:1px solid var(--rule); max-height:66vh; overflow-y:auto; background:var(--paper-raised); }
        .ielts-passage h2 { font-family:'Lora',serif; font-size:20px; margin:0 0 18px; }
        .ielts-para { margin-bottom:16px; font-family:'Lora',serif; font-size:15px; line-height:1.7; color:var(--ink); }
        .ielts-para .para-label { font-family:'IBM Plex Mono',monospace; font-weight:600; color:var(--gold); margin-right:8px; font-size:13px; }
        .ielts-questions { padding:28px 30px; max-height:66vh; overflow-y:auto; }
        .q-block { margin-bottom:26px; padding-bottom:22px; border-bottom:1px dashed var(--rule); }
        .q-block:last-child { border-bottom:none; }
        .q-group-title { font-family:'IBM Plex Mono',monospace; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:var(--gold); margin:22px 0 12px; font-weight:600; }
        .q-group-title:first-child { margin-top:0; }
        .q-num { display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border:1.5px solid var(--ink); border-radius:3px; font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:600; margin-right:10px; flex-shrink:0; }
        .q-prompt { font-size:14.5px; line-height:1.5; display:flex; align-items:flex-start; margin-bottom:10px; }
        .q-options { display:flex; flex-direction:column; gap:6px; margin-left:34px; }
        .q-option { display:flex; align-items:center; gap:8px; font-size:14px; cursor:pointer; padding:4px 6px; border-radius:4px; }
        .q-option:hover { background:rgba(0,0,0,0.03); }
        .q-option input { accent-color:var(--gold); width:15px; height:15px; }
        .q-fill { margin-left:34px; padding:6px 10px; border:none; border-bottom:2px solid var(--ink); background:transparent; font-family:'IBM Plex Sans',sans-serif; font-size:14px; width:220px; color:var(--ink); }
        .q-fill:focus { outline:none; border-color:var(--gold); }
        .heading-list, .bank-list { margin: 0 0 16px; font-size:13px; color:var(--ink-soft); line-height:1.7; background:rgba(0,0,0,0.03); padding:10px 14px; border-radius:6px; }
        .bank-list span { display:inline-block; margin:0 8px 4px 0; padding:2px 8px; background:var(--paper-raised); border:1px solid var(--rule); border-radius:10px; }
        .result-tag { font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600; padding:2px 8px; border-radius:10px; margin-left:10px; }
        .result-tag.correct { background:var(--correct-bg); color:var(--correct); }
        .result-tag.wrong { background:var(--wrong-bg); color:var(--stamp); }
        .q-block.marked.correct { background:var(--correct-bg); border-radius:6px; padding:14px; margin:0 0 16px; border-bottom:none; }
        .q-block.marked.wrong { background:var(--wrong-bg); border-radius:6px; padding:14px; margin:0 0 16px; border-bottom:none; }
        .correct-answer-note { margin-left:34px; margin-top:6px; font-size:13px; color:var(--ink-soft); font-style:italic; }
        .section-nav { display:flex; align-items:center; justify-content:center; gap:10px; padding:14px 24px; border-top:1px solid var(--rule); background:var(--paper-raised); }
        .nav-btn { border:1.5px solid var(--ink); background:var(--paper); width:32px; height:32px; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; }
        .nav-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .tab-btn { font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:600; padding:7px 16px; border-radius:4px; border:1.5px solid var(--ink); background:var(--paper); cursor:pointer; color:var(--ink); display:flex; flex-direction:column; align-items:center; gap:2px; line-height:1.2; }
        .tab-btn .sub { font-size:10px; font-weight:400; color:var(--ink-soft); }
        .tab-btn.active { background:var(--ink); color:var(--paper); }
        .tab-btn.active .sub { color:var(--paper); opacity:0.75; }
        .ielts-footer { display:flex; align-items:center; justify-content:space-between; padding:16px 24px; border-top:2px solid var(--ink); background:var(--paper-raised); }
        .ielts-footer .status { font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--ink-soft); }
        .btn { font-family:'IBM Plex Sans',sans-serif; font-weight:600; font-size:14px; padding:10px 22px; border-radius:4px; border:2px solid var(--ink); cursor:pointer; background:var(--ink); color:var(--paper); transition:transform .1s ease; }
        .btn:hover { transform:translateY(-1px); }
        .btn.secondary { background:transparent; color:var(--ink); }
        .report { margin:26px 24px 0; padding:26px; border:2px solid var(--ink); border-radius:6px; background:var(--paper-raised); position:relative; overflow:hidden; }
        .stamp { position:absolute; top:18px; right:24px; transform:rotate(-8deg); border:3px solid var(--stamp); color:var(--stamp); border-radius:8px; padding:8px 18px; font-family:'IBM Plex Mono',monospace; font-weight:700; text-align:center; opacity:0.9; }
        .stamp .band-label { font-size:10px; letter-spacing:0.1em; }
        .stamp .band-num { font-size:30px; line-height:1; }
        .report h3 { font-family:'Lora',serif; font-size:19px; margin:0 0 4px; }
        .report .score-line { font-family:'IBM Plex Mono',monospace; font-size:14px; color:var(--ink-soft); margin-bottom:16px; }
        .report .summary { font-size:14.5px; line-height:1.6; max-width:680px; margin-bottom:18px; }
        .report .strengths { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
        .chip { background:var(--correct-bg); color:var(--correct); font-size:12.5px; padding:4px 10px; border-radius:12px; }
        .tip-row { display:flex; gap:10px; padding:10px 0; border-top:1px solid var(--rule); font-size:13.5px; }
        .tip-row .tip-q { font-family:'IBM Plex Mono',monospace; font-weight:600; color:var(--stamp); flex-shrink:0; width:44px; }
        .tip-row .tip-skill { color:var(--gold); font-weight:600; margin-right:4px; }
        .loading-line { font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--ink-soft); display:flex; gap:8px; align-items:center; }
        .dot { width:6px; height:6px; border-radius:50%; background:var(--gold); animation:pulse 1.1s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay:.15s; } .dot:nth-child(3) { animation-delay:.3s; }
        @keyframes pulse { 0%,80%,100% { opacity:.25; } 40% { opacity:1; } }
        .fallback-note { font-size:11.5px; color:var(--ink-soft); margin-top:14px; font-style:italic; }
        .band-note { font-size:11.5px; color:var(--ink-soft); margin-top:6px; }
      `}</style>

      <div className="ielts-shell">
        <div className="ielts-header">
          <div className="ielts-brand">
            <button className="back-link" onClick={onBack}>← All skills</button>
            <span className="eyebrow">Academic Reading · Full Test — 3 Sections</span>
            <h1>{section.passage.title}</h1>
          </div>
          <div className={`ielts-timer ${timeLow ? "low" : ""}`}>{formatTime(seconds)}</div>
        </div>
        <div className="ielts-progress-bar"><div className="ielts-progress-fill" style={{ width: `${(answeredCount / 40) * 100}%` }} /></div>
        <div className="ielts-instructions">
          <b>{section.label}</b> — Questions {section.questions[0].n}–{section.questions[section.questions.length - 1].n}. Read the passage on the left and answer every question on the right, then use the section tabs below to move between passages. You have <b>60 minutes</b> for all three sections combined.
        </div>

        <div className="ielts-body">
          <div className="ielts-passage">
            <h2>{section.passage.title}</h2>
            {section.passage.paragraphs.map((p) => (
              <p className="ielts-para" key={p.label}><span className="para-label">{p.label}</span>{p.text}</p>
            ))}
          </div>

          <div className="ielts-questions">
            {!submitted && section.questions.map((q, idx) => {
              const showGroupTitle = q.type !== lastType;
              lastType = q.type;
              return (
                <div key={q.n}>
                  {showGroupTitle && (
                    <div>
                      <p className="q-group-title">{groupTitleFor(q.type, section.id)}</p>
                      {q.type === "heading" && idx === section.questions.findIndex((qq) => qq.type === "heading") && (
                        <div className="heading-list">{section.headings.map((h) => <div key={h}>{h}</div>)}</div>
                      )}
                      {q.type === "bank" && idx === section.questions.findIndex((qq) => qq.type === "bank") && (
                        <div className="bank-list">{section.wordBank.map((w) => <span key={w}>{w}</span>)}</div>
                      )}
                    </div>
                  )}
                  <div className="q-block">
                    <div className="q-prompt"><span className="q-num">{q.n}</span>{q.prompt}</div>
                    {renderQuestionInput(q)}
                  </div>
                </div>
              );
            })}

            {submitted && results.filter((r) => r.sectionId === section.id).map((r) => (
              <div className={`q-block marked ${r.correct ? "correct" : "wrong"}`} key={r.n}>
                <div className="q-prompt">
                  <span className="q-num">{r.n}</span>
                  {(r.type === "heading" || r.type === "matching_info") ? r.prompt : r.prompt}
                  <span className={`result-tag ${r.correct ? "correct" : "wrong"}`}>{r.correct ? "Correct" : "Incorrect"}</span>
                </div>
                <div className="correct-answer-note">
                  Your answer: <b>{r.given || "(blank)"}</b>
                  {!r.correct && <> · Correct answer: <b>{r.answer}</b></>}
                  {r.explanation && <> — {r.explanation}</>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-nav">
          <button className="nav-btn" disabled={activeSection === 1} onClick={() => setActiveSection((s) => s - 1)}>◀</button>
          {SECTIONS.map((s) => (
            <button key={s.id} className={`tab-btn ${activeSection === s.id ? "active" : ""}`} onClick={() => setActiveSection(s.id)}>
              {s.label}
              <span className="sub">{submitted ? `${results.filter((r) => r.sectionId === s.id && r.correct).length}/${s.questions.length} correct` : `${s.questions.filter((q) => answers[q.n]).length}/${s.questions.length}`}</span>
            </button>
          ))}
          <button className="nav-btn" disabled={activeSection === 3} onClick={() => setActiveSection((s) => s + 1)}>▶</button>
        </div>

        <div className="ielts-footer">
          <span className="status">{answeredCount} / 40 answered · {section.label}: {sectionAnsweredCount}/{section.questions.length}</span>
          {!submitted ? <button className="btn" onClick={handleSubmit}>Submit test</button> : <button className="btn secondary" onClick={handleReset}>Try again</button>}
        </div>

        {submitted && (
          <div className="report">
            <div className="stamp"><div className="band-label">RAW SCORE</div><div className="band-num">{score}/40</div></div>
            <h3>AI Examiner Feedback</h3>
            <div className="score-line">
              Approximate band (published conversion): {band.toFixed(1)}
              {aiState.status === "done" && aiState.data && <> · AI examiner estimate: {aiState.data.estimatedBand?.toFixed ? aiState.data.estimatedBand.toFixed(1) : aiState.data.estimatedBand}</>}
            </div>
            {aiState.status === "loading" && (
              <div className="loading-line"><span className="dot" /><span className="dot" /><span className="dot" />Reading your answers across all three sections…</div>
            )}
            {aiState.status === "done" && aiState.data && (
              <>
                <p className="summary">{aiState.data.summary}</p>
                {aiState.data.strengths?.length > 0 && <div className="strengths">{aiState.data.strengths.map((s, i) => <span className="chip" key={i}>{s}</span>)}</div>}
                {aiState.data.tips?.map((t, i) => (
                  <div className="tip-row" key={i}><span className="tip-q">Q{t.questionNumber}</span><span><span className="tip-skill">{t.skill}:</span>{t.tip}</span></div>
                ))}
                {aiState.fallback && <div className="fallback-note">Generated locally — the live AI examiner was unreachable, so this is a rule-based summary instead.</div>}
                <div className="band-note">Band figures are approximate — real IELTS scoring depends on the specific test version's official conversion table.</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LISTENING — content, real text-to-speech audio, 4 parts, 40 Qs     */
/* ------------------------------------------------------------------ */

function splitSentences(text) {
  const parts = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  return parts ? parts.map((s) => s.trim()).filter(Boolean) : [text];
}

const LISTENING_PARTS = [
  {
    id: 1,
    label: "Part 1",
    context: "A phone conversation: a caller signs up for a pottery class at a community centre.",
    lines: [
      { speaker: "A", text: "Good morning, Riverside Community Centre, how can I help you?" },
      { speaker: "B", text: "Hi, I'd like to sign up for the evening pottery class, please." },
      { speaker: "A", text: "Of course. Can I take your full name first?" },
      { speaker: "B", text: "Yes, it's Maria Delgado — that's D, E, L, G, A, D, O." },
      { speaker: "A", text: "Great, thank you. And could I get a contact phone number?" },
      { speaker: "B", text: "Sure, it's oh-seven-one-two, four-four-five, nine-oh-eight." },
      { speaker: "A", text: "Perfect. Now, the pottery class runs every Wednesday evening, from six thirty to eight thirty." },
      { speaker: "B", text: "That works for me." },
      { speaker: "A", text: "The course fee is ninety-five pounds for the full ten-week term, and there's a refundable deposit of twenty pounds for the equipment." },
      { speaker: "B", text: "Okay, and when does it start?" },
      { speaker: "A", text: "The next term begins on the fourteenth of March." },
      { speaker: "B", text: "And where exactly is it held?" },
      { speaker: "A", text: "It's in Studio 3, on the second floor of the Arts Building." },
      { speaker: "B", text: "Do I need to bring any materials myself?" },
      { speaker: "A", text: "No, everything's provided, but we do recommend wearing an old apron." },
      { speaker: "B", text: "Great. Is there anything else I need to do to confirm my place?" },
      { speaker: "A", text: "Just send a confirmation email to pottery at riversidecentre dot org, with your name and the course date, and quote the reference code R C, two oh four, in the subject line." },
      { speaker: "B", text: "Perfect, thank you so much for your help." },
      { speaker: "A", text: "You're welcome, enjoy the course!" }
    ],
    questions: [
      { n: 1, type: "text", label: "Name: Maria ______", answer: "Delgado" },
      { n: 2, type: "text", label: "Phone number: ______", answer: "07124459 08".replace(" ", ""), match: ["0712445908", "0712 445 908"] },
      { n: 3, type: "text", label: "Day of the class: ______ evenings", answer: "Wednesday" },
      { n: 4, type: "text", label: "Course fee: £______", answer: "95" },
      { n: 5, type: "text", label: "Deposit: £______", answer: "20" },
      { n: 6, type: "text", label: "Start date: ______ March", answer: "14th", match: ["14th", "14", "fourteenth"] },
      { n: 7, type: "text", label: "Location: Studio 3, ______ floor, Arts Building", answer: "second" },
      { n: 8, type: "text", label: "Recommended to bring: an old ______", answer: "apron" },
      { n: 9, type: "text", label: "Confirmation email: ______", answer: "pottery@riversidecentre.org" },
      { n: 10, type: "text", label: "Reference code to quote: ______", answer: "RC-204", match: ["rc-204", "rc204", "rc 204"] }
    ]
  },
  {
    id: 2,
    label: "Part 2",
    context: "A monologue: a guide gives an orientation talk about a public library's facilities.",
    lines: [
      { speaker: "N", text: "Good afternoon everyone, and welcome to Milbrook Public Library." },
      { speaker: "N", text: "Before I show you around, let me give you a quick overview of what's on each floor." },
      { speaker: "N", text: "The ground floor houses the main lending collection, along with the reception desk and a small café that opens at eight in the morning and closes at six in the evening, an hour earlier than the rest of the building." },
      { speaker: "N", text: "If you head up to the first floor, you'll find the reference section, which cannot be borrowed from, and six group study rooms that can be booked online up to two weeks in advance, for a maximum of three hours per booking." },
      { speaker: "N", text: "The second floor is reserved for quiet study only — no conversation is permitted there at all, not even in the small booths near the windows." },
      { speaker: "N", text: "Our newest addition is the media lab on the third floor, which has twelve computers, two 3-D printers, and a recording booth for podcasting." },
      { speaker: "N", text: "Access to the media lab requires a separate membership card, which you can apply for at the reception desk for a one-off fee of twelve pounds." },
      { speaker: "N", text: "The library as a whole is open from eight in the morning until nine at night on weekdays, but closes earlier, at five, on Saturdays, and is closed completely on Sundays." },
      { speaker: "N", text: "Membership itself is free for local residents, but visitors from outside the district pay an annual fee of twenty-five pounds." },
      { speaker: "N", text: "Finally, a reminder that the annual book sale will take place in the main hall on the twenty-second of this month, with all proceeds going towards the library's outreach programme for local schools." }
    ],
    questions: [
      { n: 11, type: "mcq", label: "Where is the café located?", options: ["A. First floor", "B. Ground floor", "C. Second floor", "D. Third floor"], answer: "B" },
      { n: 12, type: "mcq", label: "What is NOT allowed on the second floor?", options: ["A. Studying quietly", "B. Reading reference books", "C. Talking", "D. Using laptops"], answer: "C" },
      { n: 13, type: "mcq", label: "How far in advance can group study rooms be booked?", options: ["A. One week", "B. Two weeks", "C. One month", "D. Three days"], answer: "B" },
      { n: 14, type: "mcq", label: "What is required to access the media lab?", options: ["A. A separate membership card", "B. A teacher's permission", "C. An appointment only", "D. Nothing extra"], answer: "A" },
      { n: 15, type: "mcq", label: "On which day is the library completely closed?", options: ["A. Saturday", "B. Friday", "C. Sunday", "D. Monday"], answer: "C" },
      { n: 16, type: "text", label: "The café closes at ______ in the evening.", answer: "six", match: ["six", "6"] },
      { n: 17, type: "text", label: "Group study rooms can be booked for a maximum of ______ hours.", answer: "three", match: ["three", "3"] },
      { n: 18, type: "text", label: "The media lab has ______ computers.", answer: "twelve", match: ["twelve", "12"] },
      { n: 19, type: "text", label: "Visitors from outside the district pay an annual fee of £______.", answer: "25", match: ["25", "twenty-five", "twenty five"] },
      { n: 20, type: "text", label: "The annual book sale takes place on the ______ of this month.", answer: "22nd", match: ["22nd", "22", "twenty-second", "twenty second"] }
    ]
  },
  {
    id: 3,
    label: "Part 3",
    context: "A conversation between two students, Tom and Priya, discussing their joint research project.",
    lines: [
      { speaker: "A", text: "So Priya, how's the data collection going for our urban fox project?" },
      { speaker: "B", text: "Slower than I expected, to be honest. We've only logged sightings in about half of the neighbourhoods on our list." },
      { speaker: "A", text: "Same here. I thought the citizen-reporting app would make it much faster." },
      { speaker: "B", text: "I did too, but I think the issue is that most people only report foxes they find unusual or exciting, so common daytime sightings probably go unrecorded." },
      { speaker: "A", text: "That's a fair point. Should we switch to camera traps instead, then?" },
      { speaker: "B", text: "I'd actually keep both methods running side by side rather than replacing one with the other. The app data still tells us something about public awareness, even if it underrepresents actual fox numbers." },
      { speaker: "A", text: "Okay, that makes sense. What about our supervisor's suggestion to focus only on parks rather than residential streets?" },
      { speaker: "B", text: "I disagree with that, actually. Most of our sightings so far have come from gardens and back alleys, not parks, so narrowing the focus that way might miss where the foxes actually are." },
      { speaker: "A", text: "I was leaning that way too, for the sake of simplicity, but you've convinced me otherwise." },
      { speaker: "B", text: "There's also the writing side of things. Have you started the literature review yet?" },
      { speaker: "A", text: "Only the introduction. I found it harder than I expected to find recent studies specifically on urban foxes, rather than urban wildlife in general." },
      { speaker: "B", text: "I had the same problem. I ended up broadening the search terms and that helped a lot." },
      { speaker: "A", text: "Good idea, I'll try that. Should we split the remaining sections, then? You take methodology, I'll take discussion?" },
      { speaker: "B", text: "Sounds fair. Let's aim to have a full draft finished by the end of next week, so we still have time for feedback from our supervisor." },
      { speaker: "A", text: "Agreed. I'll also chase up permission for the camera traps in the meantime, since that's been sitting unanswered for a while." },
      { speaker: "B", text: "Great, let's check in again on Friday." }
    ],
    questions: [
      { n: 21, type: "mcq", label: "How does Priya feel about the progress of data collection?", options: ["A. Satisfied", "B. Surprised it is slower than expected", "C. Confident it will speed up", "D. Unconcerned"], answer: "B" },
      { n: 22, type: "mcq", label: "What does Priya think is a weakness of the citizen-reporting app?", options: ["A. It is too difficult to use", "B. It costs too much to run", "C. People mostly report unusual sightings", "D. It only works in parks"], answer: "C" },
      { n: 23, type: "mcq", label: "What do Tom and Priya decide about their research methods?", options: ["A. Replace the app with camera traps entirely", "B. Use both the app and camera traps together", "C. Stop using the app", "D. Wait for their supervisor's decision"], answer: "B" },
      { n: 24, type: "mcq", label: "What is Priya's opinion of the supervisor's suggestion to focus only on parks?", options: ["A. She fully agrees with it", "B. She disagrees with it", "C. She has no opinion", "D. She suggests focusing only on residential streets"], answer: "B" },
      { n: 25, type: "mcq", label: "Why does Priya disagree with focusing only on parks?", options: ["A. Parks are too large to study", "B. Most sightings have come from gardens and alleys, not parks", "C. Parks are difficult to access", "D. Foxes avoid parks entirely"], answer: "B" },
      { n: 26, type: "mcq", label: "How did Tom initially feel about narrowing the focus to parks, before talking to Priya?", options: ["A. Strongly opposed", "B. Leaning towards agreeing, for simplicity", "C. Completely indifferent", "D. Already decided against it"], answer: "B" },
      { n: 27, type: "mcq", label: "What problem did Tom have with the literature review?", options: ["A. There were too many recent studies to read", "B. Sources were written in a different language", "C. Few recent studies focus specifically on urban foxes", "D. His supervisor rejected his sources"], answer: "C" },
      { n: 28, type: "mcq", label: "How did Priya solve the same literature review problem?", options: ["A. She asked her supervisor for a reading list", "B. She broadened her search terms", "C. She used only older studies", "D. She skipped the literature review section"], answer: "B" },
      { n: 29, type: "mcq", label: "How do Tom and Priya plan to divide the remaining writing work?", options: ["A. Priya will write the whole report", "B. Tom takes methodology, Priya takes discussion", "C. Priya takes methodology, Tom takes discussion", "D. They will write every section together"], answer: "C" },
      { n: 30, type: "mcq", label: "What does Tom agree to do before their next meeting?", options: ["A. Finish the whole literature review", "B. Chase up permission for the camera traps", "C. Rewrite the introduction", "D. Contact their supervisor for feedback"], answer: "B" }
    ]
  },
  {
    id: 4,
    label: "Part 4",
    context: "A short academic lecture on the ecology of kelp forests. Complete the notes as you listen.",
    lines: [
      { speaker: "N", text: "Today I want to introduce you to one of the ocean's most productive ecosystems: kelp forests." },
      { speaker: "N", text: "Kelp is a type of large brown algae that grows in cold, nutrient-rich coastal waters, and under the right conditions it can grow astonishingly quickly, sometimes as much as half a metre in a single day." },
      { speaker: "N", text: "Dense stands of kelp form underwater forests that provide shelter and food for an enormous range of marine species, from small invertebrates right up to seals and sharks." },
      { speaker: "N", text: "One of the most important relationships in this ecosystem involves sea otters. Sea otters prey on sea urchins, which in turn feed on kelp." },
      { speaker: "N", text: "When otter populations decline, whether through hunting or disease, urchin numbers can rise sharply, and large groups of urchins can strip a kelp forest bare within a few years, creating what ecologists call an urchin barren." },
      { speaker: "N", text: "This relationship is a classic example of what is known as a trophic cascade, where a change at one level of a food chain produces significant effects further down the chain." },
      { speaker: "N", text: "Kelp forests are also under pressure from rising ocean temperatures. Kelp generally prefers cooler water, and marine heatwaves in recent decades have caused significant die-offs in several regions, most notably along parts of the Californian and Tasmanian coastlines." },
      { speaker: "N", text: "In some of these areas, kelp forests have been replaced almost entirely by barren, rocky seafloor with little biodiversity." },
      { speaker: "N", text: "Restoration efforts are now underway in a number of countries, including projects that involve transplanting young kelp onto artificial reefs, and in some cases, reintroducing sea otters to areas where they had disappeared, specifically to help control urchin populations naturally rather than relying on human intervention." },
      { speaker: "N", text: "Beyond their ecological value, kelp forests also play a role in carbon storage, absorbing carbon dioxide from the water as they grow, though scientists are still debating exactly how much of this carbon remains stored long-term once the kelp dies or is eaten." },
      { speaker: "N", text: "Understanding kelp forests, in short, means understanding an ecosystem shaped as much by a handful of key predator-prey relationships as by the physical conditions of the water itself." }
    ],
    questions: [
      { n: 31, type: "text", label: "Kelp: a type of large brown ______ that grows in cold, nutrient-rich water.", answer: "algae" },
      { n: 32, type: "text", label: "Can grow up to half a ______ per day.", answer: "metre", match: ["metre", "meter"] },
      { n: 33, type: "text", label: "Key relationship: sea ______ eat sea urchins, which eat kelp.", answer: "otters" },
      { n: 34, type: "text", label: "If otter numbers fall, urchins can create an urchin ______.", answer: "barren" },
      { n: 35, type: "text", label: "This kind of chain reaction is called a trophic ______.", answer: "cascade" },
      { n: 36, type: "text", label: "Kelp is also threatened by rising ocean ______.", answer: "temperatures" },
      { n: 37, type: "text", label: "Badly affected regions include the Californian and ______ coastlines.", answer: "Tasmanian" },
      { n: 38, type: "text", label: "Restoration methods include transplanting young kelp onto artificial ______.", answer: "reefs" },
      { n: 39, type: "text", label: "Some projects reintroduce sea ______ to control urchins naturally.", answer: "otters" },
      { n: 40, type: "text", label: "Kelp forests also help store ______ absorbed from the water.", answer: "carbon" }
    ]
  }
];

const ALL_LISTENING_QUESTIONS = LISTENING_PARTS.flatMap((p) => p.questions.map((q) => ({ ...q, partId: p.id })));
const LISTENING_TOTAL_SECONDS = 40 * 60;

function listeningIsCorrect(q, given) {
  if (!given) return false;
  const g = normalise(given);
  if (q.match) return q.match.some((m) => normalise(m) === g);
  return normalise(q.answer) === g;
}

function ListeningSection({ onBack }) {
  const [activePart, setActivePart] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(LISTENING_TOTAL_SECONDS);
  const [aiState, setAiState] = useState({ status: "idle", data: null });
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playedParts, setPlayedParts] = useState({});
  const [rate, setRate] = useState(0.95);
  const [ttsSupported, setTtsSupported] = useState(true);
  const keepAliveRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setTtsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    };
  }, []);

  useEffect(() => {
    if (submitted) return;
    timerRef.current = setInterval(() => {
      setSeconds((s) => { if (s <= 1) { clearInterval(timerRef.current); return 0; } return s - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [submitted]);

  useEffect(() => { if (seconds === 0 && !submitted) handleSubmit(); /* eslint-disable-next-line */ }, [seconds]);

  const part = LISTENING_PARTS.find((p) => p.id === activePart);

  const stopSpeaking = () => {
    try { window.speechSynthesis.cancel(); } catch (e) {}
    if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    setSpeaking(false);
    setPaused(false);
  };

  const playPart = (p) => {
    if (!ttsSupported) return;
    try { window.speechSynthesis.cancel(); } catch (e) {}
    const voices = window.speechSynthesis.getVoices();
    p.lines.forEach((line, idx) => {
      const utt = new SpeechSynthesisUtterance(line.text);
      utt.rate = rate;
      utt.pitch = line.speaker === "B" ? 1.15 : 1;
      if (voices.length) {
        const voiceIdx = line.speaker === "B" ? Math.min(1, voices.length - 1) : 0;
        utt.voice = voices[voiceIdx];
      }
      if (idx === p.lines.length - 1) {
        utt.onend = () => {
          setSpeaking(false);
          setPlayedParts((pp) => ({ ...pp, [p.id]: true }));
          if (keepAliveRef.current) clearInterval(keepAliveRef.current);
        };
      }
      window.speechSynthesis.speak(utt);
    });
    setSpeaking(true);
    setPaused(false);
    // Chrome occasionally halts long speech queues after ~15s; nudge it to keep going.
    keepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 4000);
  };

  const togglePause = () => {
    if (!speaking) return;
    if (paused) { window.speechSynthesis.resume(); setPaused(false); }
    else { window.speechSynthesis.pause(); setPaused(true); }
  };

  const setAnswer = (n, val) => { if (submitted) return; setAnswers((a) => ({ ...a, [n]: val })); };

  const answeredCount = Object.keys(answers).filter((k) => answers[k]).length;
  const results = ALL_LISTENING_QUESTIONS.map((q) => ({ ...q, given: answers[q.n] || "", correct: listeningIsCorrect(q, answers[q.n]) }));
  const score = results.filter((r) => r.correct).length;
  const wrongQs = results.filter((r) => !r.correct);
  const band = bandFromRaw(score);

  const fetchAiFeedback = useCallback(async () => {
    setAiState({ status: "loading", data: null });
    try {
      const detail = results.map((r) => `Q${r.n} [part ${r.partId}, type ${r.type}] — student answered "${r.given || "(blank)"}", correct answer "${r.answer}", ${r.correct ? "CORRECT" : "INCORRECT"}.`).join("\n");
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1200,
          messages: [{
            role: "user",
            content: `You are an IELTS Listening examiner giving feedback on a full 40-question, four-part practice test (Part 1: form completion from a phone call, Part 2: multiple choice and note completion from a monologue, Part 3: multiple choice from a student conversation, Part 4: note completion from an academic lecture). Raw score: ${score}/40. Marking detail:\n\n${detail}\n\nReturn ONLY valid JSON, no markdown fences, no preamble, in exactly this shape:\n{"estimatedBand": <number 2.0-9.0, one decimal>, "summary": "<3-4 sentence overall summary across all four parts, encouraging but honest, noting which part(s) were strongest/weakest>", "tips": [{"questionNumber": <int>, "skill": "<short skill name>", "tip": "<one specific, actionable sentence>"}], "strengths": ["<short phrase>", "..."]}\nOnly include "tips" for wrong answers, prioritise the most instructive 10-12 if there are many. Keep it concise.`
          }]
        })
      });
      const data = await response.json();
      const text = (data.content || []).map((b) => b.text || "").join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setAiState({ status: "done", data: parsed });
    } catch (err) {
      setAiState({ status: "done", data: localFeedback(wrongQs, score), fallback: true });
    }
    // eslint-disable-next-line
  }, [results, score]);

  const handleSubmit = () => { clearInterval(timerRef.current); stopSpeaking(); setSubmitted(true); fetchAiFeedback(); };
  const handleReset = () => {
    stopSpeaking();
    setAnswers({}); setSubmitted(false); setSeconds(LISTENING_TOTAL_SECONDS);
    setAiState({ status: "idle", data: null }); setActivePart(1); setPlayedParts({});
  };

  const timeLow = seconds <= 300 && seconds > 0;
  const partAnsweredCount = part.questions.filter((q) => answers[q.n]).length;

  return (
    <div className="listen-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .listen-root { --paper:#EFEAE0; --paper-raised:#F8F5EE; --ink:#1D2B3A; --ink-soft:#4A5A6A; --rule:#C9C0AC; --stamp:#A3323E; --gold:#9C7A44; --correct:#3A6B4C; --correct-bg:#E4EEE4; --wrong-bg:#F6E4E1; font-family:'IBM Plex Sans',sans-serif; color:var(--ink); background:var(--paper); min-height:100%; width:100%; }
        .listen-root * { box-sizing:border-box; }
        .listen-shell { max-width:1180px; margin:0 auto; padding:0 0 40px; }
        .listen-header { display:flex; align-items:center; justify-content:space-between; padding:18px 24px; border-bottom:2px solid var(--ink); background:var(--paper-raised); }
        .listen-brand { display:flex; flex-direction:column; gap:2px; }
        .back-link { align-self:flex-start; font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.05em; color:var(--ink-soft); background:none; border:none; cursor:pointer; padding:0 0 4px; }
        .back-link:hover { color:var(--gold); }
        .listen-brand .eyebrow { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); }
        .listen-brand h1 { font-family:'Lora',serif; font-size:22px; margin:0; font-weight:600; }
        .listen-timer { font-family:'IBM Plex Mono',monospace; font-size:26px; font-weight:600; padding:6px 16px; border:2px solid var(--ink); border-radius:4px; background:var(--paper); min-width:96px; text-align:center; }
        .listen-timer.low { color:var(--stamp); border-color:var(--stamp); }
        .listen-progress-bar { height:4px; background:var(--rule); width:100%; }
        .listen-progress-fill { height:100%; background:var(--gold); transition:width .3s ease; }
        .listen-instructions { padding:14px 24px; background:#E3DCC9; border-bottom:1px solid var(--rule); font-size:14px; color:var(--ink-soft); }
        .listen-instructions b { color:var(--ink); }
        .listen-body { display:grid; grid-template-columns:0.85fr 1.15fr; gap:0; }
        @media (max-width:860px) { .listen-body { grid-template-columns:1fr; } }
        .audio-panel { padding:28px 30px; border-right:1px solid var(--rule); background:var(--paper-raised); }
        .audio-panel h2 { font-family:'Lora',serif; font-size:19px; margin:0 0 10px; }
        .audio-context { font-size:13.5px; color:var(--ink-soft); line-height:1.6; margin-bottom:22px; }
        .audio-console { border:2px solid var(--ink); border-radius:8px; padding:22px; background:var(--paper); text-align:center; }
        .audio-visual { display:flex; align-items:center; justify-content:center; gap:4px; height:44px; margin-bottom:16px; }
        .bar { width:4px; background:var(--gold); border-radius:2px; opacity:0.35; }
        .bar.on { opacity:1; animation:eq 0.9s infinite ease-in-out; }
        .bar:nth-child(1){height:14px;} .bar:nth-child(2){height:26px;animation-delay:.1s;} .bar:nth-child(3){height:38px;animation-delay:.2s;} .bar:nth-child(4){height:22px;animation-delay:.3s;} .bar:nth-child(5){height:32px;animation-delay:.15s;} .bar:nth-child(6){height:16px;animation-delay:.25s;}
        @keyframes eq { 0%,100% { transform:scaleY(0.5); } 50% { transform:scaleY(1); } }
        .audio-buttons { display:flex; gap:10px; justify-content:center; margin-bottom:14px; flex-wrap:wrap; }
        .audio-btn { font-family:'IBM Plex Sans',sans-serif; font-weight:600; font-size:13.5px; padding:9px 18px; border-radius:4px; border:2px solid var(--ink); cursor:pointer; background:var(--ink); color:var(--paper); }
        .audio-btn.secondary { background:transparent; color:var(--ink); }
        .audio-btn:disabled { opacity:0.35; cursor:not-allowed; }
        .rate-select { font-family:'IBM Plex Mono',monospace; font-size:12px; padding:5px 8px; border-radius:4px; border:1.5px solid var(--rule); background:var(--paper); color:var(--ink); }
        .audio-note { font-size:12px; color:var(--ink-soft); margin-top:12px; line-height:1.5; }
        .unsupported-note { font-size:13px; color:var(--stamp); background:var(--wrong-bg); border-radius:6px; padding:10px 12px; margin-top:14px; }
        .played-badge { display:inline-block; margin-top:12px; font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--correct); background:var(--correct-bg); padding:3px 10px; border-radius:10px; }
        .transcript { margin-top:20px; padding-top:16px; border-top:1px dashed var(--rule); }
        .transcript p { font-family:'Lora',serif; font-size:14px; line-height:1.7; margin:0 0 6px; }
        .transcript .sp { font-family:'IBM Plex Mono',monospace; font-weight:600; color:var(--gold); margin-right:6px; font-size:12px; }
        .listen-questions { padding:28px 30px; max-height:66vh; overflow-y:auto; }
        .q-block { margin-bottom:22px; padding-bottom:20px; border-bottom:1px dashed var(--rule); }
        .q-block:last-child { border-bottom:none; }
        .q-num { display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border:1.5px solid var(--ink); border-radius:3px; font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:600; margin-right:10px; flex-shrink:0; }
        .q-prompt { font-size:14.5px; line-height:1.5; display:flex; align-items:flex-start; margin-bottom:10px; }
        .q-options { display:flex; flex-direction:column; gap:6px; margin-left:34px; }
        .q-option { display:flex; align-items:center; gap:8px; font-size:14px; cursor:pointer; padding:4px 6px; border-radius:4px; }
        .q-option:hover { background:rgba(0,0,0,0.03); }
        .q-option input { accent-color:var(--gold); width:15px; height:15px; }
        .q-fill { margin-left:34px; padding:6px 10px; border:none; border-bottom:2px solid var(--ink); background:transparent; font-family:'IBM Plex Sans',sans-serif; font-size:14px; width:220px; color:var(--ink); }
        .q-fill:focus { outline:none; border-color:var(--gold); }
        .result-tag { font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600; padding:2px 8px; border-radius:10px; margin-left:10px; }
        .result-tag.correct { background:var(--correct-bg); color:var(--correct); }
        .result-tag.wrong { background:var(--wrong-bg); color:var(--stamp); }
        .q-block.marked.correct { background:var(--correct-bg); border-radius:6px; padding:14px; margin:0 0 16px; border-bottom:none; }
        .q-block.marked.wrong { background:var(--wrong-bg); border-radius:6px; padding:14px; margin:0 0 16px; border-bottom:none; }
        .correct-answer-note { margin-left:34px; margin-top:6px; font-size:13px; color:var(--ink-soft); font-style:italic; }
        .section-nav { display:flex; align-items:center; justify-content:center; gap:10px; padding:14px 24px; border-top:1px solid var(--rule); background:var(--paper-raised); }
        .nav-btn { border:1.5px solid var(--ink); background:var(--paper); width:32px; height:32px; border-radius:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; }
        .nav-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .tab-btn { font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:600; padding:7px 16px; border-radius:4px; border:1.5px solid var(--ink); background:var(--paper); cursor:pointer; color:var(--ink); display:flex; flex-direction:column; align-items:center; gap:2px; line-height:1.2; }
        .tab-btn .sub { font-size:10px; font-weight:400; color:var(--ink-soft); }
        .tab-btn.active { background:var(--ink); color:var(--paper); }
        .tab-btn.active .sub { color:var(--paper); opacity:0.75; }
        .listen-footer { display:flex; align-items:center; justify-content:space-between; padding:16px 24px; border-top:2px solid var(--ink); background:var(--paper-raised); }
        .listen-footer .status { font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--ink-soft); }
        .btn { font-family:'IBM Plex Sans',sans-serif; font-weight:600; font-size:14px; padding:10px 22px; border-radius:4px; border:2px solid var(--ink); cursor:pointer; background:var(--ink); color:var(--paper); }
        .btn.secondary { background:transparent; color:var(--ink); }
        .report { margin:26px 24px 0; padding:26px; border:2px solid var(--ink); border-radius:6px; background:var(--paper-raised); position:relative; overflow:hidden; }
        .stamp { position:absolute; top:18px; right:24px; transform:rotate(-8deg); border:3px solid var(--stamp); color:var(--stamp); border-radius:8px; padding:8px 18px; font-family:'IBM Plex Mono',monospace; font-weight:700; text-align:center; opacity:0.9; }
        .stamp .band-label { font-size:10px; letter-spacing:0.1em; }
        .stamp .band-num { font-size:30px; line-height:1; }
        .report h3 { font-family:'Lora',serif; font-size:19px; margin:0 0 4px; }
        .report .score-line { font-family:'IBM Plex Mono',monospace; font-size:14px; color:var(--ink-soft); margin-bottom:16px; }
        .report .summary { font-size:14.5px; line-height:1.6; max-width:680px; margin-bottom:18px; }
        .report .strengths { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
        .chip { background:var(--correct-bg); color:var(--correct); font-size:12.5px; padding:4px 10px; border-radius:12px; }
        .tip-row { display:flex; gap:10px; padding:10px 0; border-top:1px solid var(--rule); font-size:13.5px; }
        .tip-row .tip-q { font-family:'IBM Plex Mono',monospace; font-weight:600; color:var(--stamp); flex-shrink:0; width:44px; }
        .tip-row .tip-skill { color:var(--gold); font-weight:600; margin-right:4px; }
        .loading-line { font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--ink-soft); display:flex; gap:8px; align-items:center; }
        .dot { width:6px; height:6px; border-radius:50%; background:var(--gold); animation:pulse 1.1s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay:.15s; } .dot:nth-child(3) { animation-delay:.3s; }
        @keyframes pulse { 0%,80%,100% { opacity:.25; } 40% { opacity:1; } }
        .fallback-note { font-size:11.5px; color:var(--ink-soft); margin-top:14px; font-style:italic; }
        .band-note { font-size:11.5px; color:var(--ink-soft); margin-top:6px; }
      `}</style>

      <div className="listen-shell">
        <div className="listen-header">
          <div className="listen-brand">
            <button className="back-link" onClick={onBack}>← All skills</button>
            <span className="eyebrow">Listening · Full Test — 4 Parts, real audio</span>
            <h1>{part.label}</h1>
          </div>
          <div className={`listen-timer ${timeLow ? "low" : ""}`}>{formatTime(seconds)}</div>
        </div>
        <div className="listen-progress-bar"><div className="listen-progress-fill" style={{ width: `${(answeredCount / 40) * 100}%` }} /></div>
        <div className="listen-instructions">
          <b>{part.label}</b> — Questions {part.questions[0].n}–{part.questions[part.questions.length - 1].n}. Press play, listen carefully, and answer as you go. You have <b>40 minutes</b> for all four parts combined.
        </div>

        <div className="listen-body">
          <div className="audio-panel">
            <h2>{part.label}</h2>
            <p className="audio-context">{part.context}</p>

            {ttsSupported ? (
              <div className="audio-console">
                <div className="audio-visual">
                  {[0, 1, 2, 3, 4, 5].map((i) => <span className={`bar ${speaking && !paused ? "on" : ""}`} key={i} />)}
                </div>
                <div className="audio-buttons">
                  <button className="audio-btn" onClick={() => playPart(part)} disabled={speaking}>
                    {playedParts[part.id] ? "▶ Replay" : "▶ Play audio"}
                  </button>
                  <button className="audio-btn secondary" onClick={togglePause} disabled={!speaking}>{paused ? "Resume" : "Pause"}</button>
                  <button className="audio-btn secondary" onClick={stopSpeaking} disabled={!speaking}>Stop</button>
                </div>
                <select className="rate-select" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} disabled={speaking}>
                  <option value="0.85">Speed: 0.85×</option>
                  <option value="0.95">Speed: 0.95× (default)</option>
                  <option value="1.1">Speed: 1.1×</option>
                </select>
                <div className="audio-note">
                  Audio is generated with your browser's built-in text-to-speech voice. In the real exam, each part plays only once — try answering as it plays before using Replay.
                </div>
                {playedParts[part.id] && <div className="played-badge">Played</div>}
              </div>
            ) : (
              <div className="unsupported-note">Your browser doesn't support built-in text-to-speech playback. Try this in a recent version of Chrome, Edge, or Safari.</div>
            )}

            {submitted && (
              <div className="transcript">
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold)" }}>Transcript</p>
                {part.lines.map((l, i) => (
                  <p key={i}>{l.speaker !== "N" && <span className="sp">{l.speaker}</span>}{l.text}</p>
                ))}
              </div>
            )}
          </div>

          <div className="listen-questions">
            {!submitted && part.questions.map((q) => (
              <div className="q-block" key={q.n}>
                {q.type === "mcq" ? (
                  <>
                    <div className="q-prompt"><span className="q-num">{q.n}</span>{q.label}</div>
                    <div className="q-options">
                      {q.options.map((opt) => {
                        const letter = opt[0];
                        return (
                          <label className="q-option" key={letter}>
                            <input type="radio" name={`q${q.n}`} checked={answers[q.n] === letter} onChange={() => setAnswer(q.n, letter)} />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="q-prompt"><span className="q-num">{q.n}</span>{q.label}</div>
                    <input className="q-fill" type="text" placeholder="Type your answer…" value={answers[q.n] || ""} onChange={(e) => setAnswer(q.n, e.target.value)} />
                  </>
                )}
              </div>
            ))}

            {submitted && results.filter((r) => r.partId === part.id).map((r) => (
              <div className={`q-block marked ${r.correct ? "correct" : "wrong"}`} key={r.n}>
                <div className="q-prompt">
                  <span className="q-num">{r.n}</span>{r.label}
                  <span className={`result-tag ${r.correct ? "correct" : "wrong"}`}>{r.correct ? "Correct" : "Incorrect"}</span>
                </div>
                <div className="correct-answer-note">
                  Your answer: <b>{r.given || "(blank)"}</b>
                  {!r.correct && <> · Correct answer: <b>{r.answer}</b></>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-nav">
          <button className="nav-btn" disabled={activePart === 1} onClick={() => { stopSpeaking(); setActivePart((s) => s - 1); }}>◀</button>
          {LISTENING_PARTS.map((p) => (
            <button key={p.id} className={`tab-btn ${activePart === p.id ? "active" : ""}`} onClick={() => { stopSpeaking(); setActivePart(p.id); }}>
              {p.label}
              <span className="sub">{submitted ? `${results.filter((r) => r.partId === p.id && r.correct).length}/${p.questions.length} correct` : `${p.questions.filter((q) => answers[q.n]).length}/${p.questions.length}`}</span>
            </button>
          ))}
          <button className="nav-btn" disabled={activePart === 4} onClick={() => { stopSpeaking(); setActivePart((s) => s + 1); }}>▶</button>
        </div>

        <div className="listen-footer">
          <span className="status">{answeredCount} / 40 answered · {part.label}: {partAnsweredCount}/{part.questions.length}</span>
          {!submitted ? <button className="btn" onClick={handleSubmit}>Submit test</button> : <button className="btn secondary" onClick={handleReset}>Try again</button>}
        </div>

        {submitted && (
          <div className="report">
            <div className="stamp"><div className="band-label">RAW SCORE</div><div className="band-num">{score}/40</div></div>
            <h3>AI Examiner Feedback</h3>
            <div className="score-line">
              Approximate band (published conversion): {band.toFixed(1)}
              {aiState.status === "done" && aiState.data && <> · AI examiner estimate: {aiState.data.estimatedBand?.toFixed ? aiState.data.estimatedBand.toFixed(1) : aiState.data.estimatedBand}</>}
            </div>
            {aiState.status === "loading" && (
              <div className="loading-line"><span className="dot" /><span className="dot" /><span className="dot" />Reviewing your answers across all four parts…</div>
            )}
            {aiState.status === "done" && aiState.data && (
              <>
                <p className="summary">{aiState.data.summary}</p>
                {aiState.data.strengths?.length > 0 && <div className="strengths">{aiState.data.strengths.map((s, i) => <span className="chip" key={i}>{s}</span>)}</div>}
                {aiState.data.tips?.map((t, i) => (
                  <div className="tip-row" key={i}><span className="tip-q">Q{t.questionNumber}</span><span><span className="tip-skill">{t.skill}:</span>{t.tip}</span></div>
                ))}
                {aiState.fallback && <div className="fallback-note">Generated locally — the live AI examiner was unreachable, so this is a rule-based summary instead.</div>}
                <div className="band-note">Band figures are approximate — real IELTS scoring depends on the specific test version's official conversion table. Transcripts for each part are now shown on the left for review.</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HOME / NAV / FOOTER                                                */
/* ------------------------------------------------------------------ */

const SKILLS = [
  {
    id: "listening",
    name: "Listening",
    tagline: "Four parts, real audio, forty questions.",
    status: "ready",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><path d="M21 14a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h3z" /><path d="M3 14a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H3z" /></svg>
    )
  },
  {
    id: "reading",
    name: "Reading",
    tagline: "Three passages, forty questions, one hour.",
    status: "ready",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H9a4 4 0 0 1 3 1.5A4 4 0 0 1 15 2h4.5A2.5 2.5 0 0 1 22 4.5v13A2.5 2.5 0 0 1 19.5 20H15a4 4 0 0 0-3 1.5A4 4 0 0 0 9 20H4.5A2.5 2.5 0 0 1 2 17.5z" /><path d="M12 3.5v17" /></svg>
    )
  },
  {
    id: "writing",
    name: "Writing",
    tagline: "Task 1 and Task 2, marked closely.",
    status: "soon",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
    )
  },
  {
    id: "speaking",
    name: "Speaking",
    tagline: "Three parts, spoken aloud, examined fairly.",
    status: "soon",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v1a7 7 0 0 0 14 0v-1" /><path d="M12 18v4" /><path d="M8 22h8" /></svg>
    )
  }
];

function SkillCard({ skill, onOpen }) {
  const ready = skill.status === "ready";
  return (
    <button className={`skill-card ${ready ? "ready" : "soon"}`} onClick={() => onOpen(skill)}>
      <span className={`corner-stamp ${ready ? "ready" : "soon"}`}>{ready ? "Available" : "Coming soon"}</span>
      <span className="skill-icon">{skill.icon}</span>
      <span className="skill-name">{skill.name}</span>
      <span className="skill-tagline">{skill.tagline}</span>
      <span className="skill-cta">{ready ? "Start section →" : "Notify me later"}</span>
    </button>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>
        Made by{" "}
        <a href="https://rachitpokhrel.com.np" target="_blank" rel="noopener noreferrer">Rachit Pokhrel</a>
      </span>
    </footer>
  );
}

function Home({ onSelect }) {
  const [soonSkill, setSoonSkill] = useState(null);
  const handleOpen = (skill) => {
    if (skill.status === "ready") onSelect(skill.id);
    else setSoonSkill(skill);
  };
  return (
    <div className="home-wrap">
      <nav className="nav-bar">
        <div className="nav-brand">
          <span className="nav-mark">IB</span>
          <span className="nav-title">IELTS Bench</span>
        </div>
        <span className="nav-sub">Practice hub</span>
      </nav>

      <main className="home-main">
        <div className="hero">
          <span className="hero-eyebrow">Four skills · One test</span>
          <h1>Choose a section to begin</h1>
          <p>Full-length, timed practice with instant marking and AI examiner feedback. Start with Reading — the rest are on the way.</p>
        </div>

        <div className="skill-grid">
          {SKILLS.map((s) => <SkillCard key={s.id} skill={s} onOpen={handleOpen} />)}
        </div>
      </main>

      {soonSkill && (
        <div className="modal-backdrop" onClick={() => setSoonSkill(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <span className="corner-stamp soon large">Coming soon</span>
            <h3>{soonSkill.name} practice is on its way</h3>
            <p>{soonSkill.tagline} This section hasn't launched yet — Reading is ready right now if you'd like to start there instead.</p>
            <div className="modal-actions">
              <button className="btn secondary" onClick={() => setSoonSkill(null)}>Close</button>
              <button className="btn" onClick={() => { setSoonSkill(null); onSelect("reading"); }}>Go to Reading</button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .home-wrap { --paper:#EFEAE0; --paper-raised:#F8F5EE; --ink:#1D2B3A; --ink-soft:#4A5A6A; --rule:#C9C0AC; --gold:#9C7A44; --stamp:#A3323E; --correct:#3A6B4C; --correct-bg:#E4EEE4;
          font-family:'IBM Plex Sans',sans-serif; background:var(--paper); color:var(--ink); min-height:100vh; display:flex; flex-direction:column; }
        .home-wrap * { box-sizing:border-box; }
        .nav-bar { display:flex; align-items:center; justify-content:space-between; padding:16px 32px; border-bottom:2px solid var(--ink); background:var(--paper-raised); }
        .nav-brand { display:flex; align-items:center; gap:10px; }
        .nav-mark { font-family:'IBM Plex Mono',monospace; font-weight:700; font-size:13px; border:2px solid var(--ink); border-radius:4px; width:30px; height:30px; display:flex; align-items:center; justify-content:center; }
        .nav-title { font-family:'Lora',serif; font-size:19px; font-weight:600; }
        .nav-sub { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--gold); }
        .home-main { flex:1; max-width:1080px; margin:0 auto; padding:56px 32px 40px; width:100%; }
        .hero { max-width:620px; margin-bottom:48px; }
        .hero-eyebrow { font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); }
        .hero h1 { font-family:'Lora',serif; font-size:38px; font-weight:600; margin:10px 0 14px; line-height:1.15; }
        .hero p { font-size:15px; line-height:1.6; color:var(--ink-soft); }
        .skill-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        @media (max-width:920px) { .skill-grid { grid-template-columns:repeat(2,1fr); } .hero h1 { font-size:30px; } }
        @media (max-width:560px) { .skill-grid { grid-template-columns:1fr; } }
        .skill-card { position:relative; text-align:left; border:2px solid var(--ink); border-radius:8px; background:var(--paper-raised); padding:26px 20px 22px; cursor:pointer; font-family:inherit; color:var(--ink); display:flex; flex-direction:column; gap:10px; min-height:190px; transition:transform .15s ease, box-shadow .15s ease; overflow:hidden; }
        .skill-card.ready:hover { transform:translateY(-4px); box-shadow:6px 6px 0 var(--gold); }
        .skill-card.soon { opacity:0.82; }
        .skill-card.soon:hover { transform:translateY(-2px); }
        .corner-stamp { position:absolute; top:14px; right:-30px; transform:rotate(35deg); font-family:'IBM Plex Mono',monospace; font-size:9.5px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; padding:3px 34px; }
        .corner-stamp.ready { background:var(--correct-bg); color:var(--correct); }
        .corner-stamp.soon { background:rgba(0,0,0,0.06); color:var(--ink-soft); }
        .corner-stamp.large { position:static; transform:rotate(-4deg); display:inline-block; border:2px solid var(--ink-soft); border-radius:6px; margin-bottom:14px; padding:4px 12px; }
        .skill-icon { color:var(--gold); }
        .skill-name { font-family:'Lora',serif; font-size:19px; font-weight:600; }
        .skill-tagline { font-size:13px; color:var(--ink-soft); line-height:1.5; flex:1; }
        .skill-cta { font-family:'IBM Plex Mono',monospace; font-size:11.5px; font-weight:600; color:var(--ink); margin-top:auto; padding-top:8px; border-top:1px dashed var(--rule); }
        .skill-card.soon .skill-cta { color:var(--ink-soft); }
        .modal-backdrop { position:fixed; inset:0; background:rgba(29,43,58,0.45); display:flex; align-items:center; justify-content:center; padding:20px; z-index:50; }
        .modal-card { background:var(--paper-raised); border:2px solid var(--ink); border-radius:8px; padding:28px; max-width:380px; width:100%; }
        .modal-card h3 { font-family:'Lora',serif; font-size:20px; margin:0 0 10px; }
        .modal-card p { font-size:14px; line-height:1.6; color:var(--ink-soft); margin:0 0 20px; }
        .modal-actions { display:flex; gap:10px; justify-content:flex-end; }
        .btn { font-family:'IBM Plex Sans',sans-serif; font-weight:600; font-size:14px; padding:9px 18px; border-radius:4px; border:2px solid var(--ink); cursor:pointer; background:var(--ink); color:var(--paper); }
        .btn.secondary { background:transparent; color:var(--ink); }
        .site-footer { text-align:center; padding:18px; border-top:1px solid var(--rule); font-size:12.5px; color:var(--ink-soft); font-family:'IBM Plex Mono',monospace; }
        .site-footer a { color:var(--gold); text-decoration:none; font-weight:600; }
        .site-footer a:hover { text-decoration:underline; }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP ROOT                                                           */
/* ------------------------------------------------------------------ */

export default function IeltsReadingPractice() {
  const [page, setPage] = useState("home");
  if (page === "reading") return <ReadingSection onBack={() => setPage("home")} />;
  if (page === "listening") return <ListeningSection onBack={() => setPage("home")} />;
  return <Home onSelect={(id) => setPage(id)} />;
}
