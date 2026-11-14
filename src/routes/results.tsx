import { createFileRoute } from "@tanstack/react-router";
import { ResultsChart } from "@/components/sections/ResultsChart";
import { ContentPage } from "@/components/shared/ContentPage";
import { defaultResultRows } from "@/data/serializable";
import type { ResultPoint } from "@/data/types";
import { useCollection } from "@/lib/admin-store";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "পরীক্ষার ফলাফল | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: ResultsPage,
});

function ResultsPage() {
  const rows = useCollection("results", defaultResultRows);
  const { language } = useLanguage();
  const results: Record<string, ResultPoint[]> = {};

  rows.forEach((row) => {
    const exam = language === "en" && row.examEn?.trim() ? row.examEn : row.exam;
    (results[exam] ??= []).push({ year: row.year, percent: Number(row.percent) });
  });

  return (
    <ContentPage
      title="পরীক্ষার ফলাফল"
      titleEn="Exam Results"
      intro="প্রতিষ্ঠানের যাচাইকৃত ফলাফলের তথ্য ও ফলাফল পোর্টালের লিংক।"
      introEn="Verified school result information and the official results portal."
    >
      <ResultsChart results={results} />
    </ContentPage>
  );
}
