import { useState } from "react";
import { BarChart3, CalendarDays, GraduationCap, IdCard } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { ResultPoint } from "@/data/types";
import { useLanguage } from "@/lib/language";
import { SCHOOL } from "@/data/site";

export function ResultsChart({ results }: { results: Record<string, ResultPoint[]> }) {
  const { t } = useLanguage();
  const exams = Object.keys(results);
  const [selected, setExam] = useState("");
  // ডাটা পরে লোড হলেও প্রথম পরীক্ষাটা নিজে বেছে নেবে
  const exam = results[selected] ? selected : (exams[0] ?? "");
  const points = results[exam] ?? [];
  const schoolFacts = [
    { icon: IdCard, label: "ইআইআইএন নম্বর", value: SCHOOL.eiin },
    { icon: CalendarDays, label: "প্রতিষ্ঠাকাল", value: SCHOOL.established },
    { icon: GraduationCap, label: "শিক্ষার স্তর", value: "মাধ্যমিক" },
  ];

  return (
    <section id="results" className="dashboard-surface py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="এক নজরে" title="ফলাফল ও পরিসংখ্যান" />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <aside className="dashboard-panel p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <IdCard className="h-5 w-5" />
              </span>
              {t("প্রতিষ্ঠানের পরিচিতি")}
            </h3>
            <div className="mt-4 divide-y">
              {schoolFacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 text-sm text-muted-foreground">{t(label)}</span>
                  <strong className="text-base">{t(value)}</strong>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted p-4 text-sm">
              <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
              <span>{t("ঢাকা শিক্ষা বোর্ড")}</span>
            </div>
          </aside>

          <div className="dashboard-panel dashboard-panel-accent p-5 sm:p-6 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <BarChart3 className="h-5 w-5 text-primary" />
                {t("এসএসসি ফলাফল")}
              </h3>
              {exams.length > 0 && (
                <div className="flex rounded-xl bg-muted p-1">
                  {exams.map((key) => (
                    <button
                      key={key}
                      onClick={() => setExam(key)}
                      aria-pressed={exam === key}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold ${exam === key ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {points.length > 0 ? (
              <div className="mt-6 flex h-64 items-end gap-4 rounded-xl bg-muted/50 p-5">
                {points.map((point) => (
                  <div
                    key={point.year}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <strong className="text-sm text-primary">{t(`${point.percent}%`)}</strong>
                    <div
                      className="w-full max-w-16 rounded-t-md bg-primary"
                      style={{ height: `${point.percent * 0.8}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{t(point.year)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 p-6 text-center">
                <BarChart3 className="h-9 w-9 text-primary/70" />
                <p className="mt-3 font-semibold">
                  {t("যাচাইকৃত ফলাফলের পরিসংখ্যান এখনো যোগ করা হয়নি।")}
                </p>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  {t(
                    "ঢাকা বোর্ডের ফলাফল পোর্টালে পরীক্ষা হিসেবে এসএসসি, বোর্ড হিসেবে ঢাকা এবং ফলাফলের ধরন হিসেবে প্রতিষ্ঠানভিত্তিক ফলাফল নির্বাচন করে ইআইআইএন নম্বর ১১৪৩৯৮ লিখুন।",
                  )}
                </p>
                <a
                  href="https://eboardresults.com/v2/home?lang=bn"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
                >
                  {t("ফলাফল পোর্টালে যান")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
