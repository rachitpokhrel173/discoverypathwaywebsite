import type { Metadata } from "next";
import IeltsReadingPractice from "@/components/tools/IeltsReadingPractice";

export const metadata: Metadata = {
  title: "IELTS Reading Practice",
  description:
    "Full-length, timed IELTS Academic Reading practice with instant marking and AI examiner feedback.",
  alternates: { canonical: "/ielts-practice" },
};

export default function IeltsPracticePage() {
  return <IeltsReadingPractice />;
}
