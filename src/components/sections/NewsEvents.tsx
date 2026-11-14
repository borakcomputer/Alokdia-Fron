// "সংবাদ ও অনুষ্ঠান" — ক্যাটাগরি বাটন দিয়ে ফিল্টার করা কার্ড
import { useState } from "react";
import { ArrowRight, CalendarDays, Filter } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { EventItem } from "@/data/types";
import { useLanguage } from "@/lib/language";

type Props = { events: EventItem[]; categories: string[] };

export function NewsEvents({ events, categories }: Props) {
  const [category, setCategory] = useState("সব");
  const { t, localized } = useLanguage();
  const shown = events.filter((e) => category === "সব" || e.category === category);

  return (
    <section className="bg-card py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          kicker="ক্যাম্পাস লাইফ"
          title="সংবাদ ও অনুষ্ঠান"
          action="সব দেখুন"
          href="/news-events"
        />

        {/* ফিল্টার বাটন */}
        <div
          className="mt-6 flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("বিভাগ")}
        >
          <Filter className="h-4 w-4 text-secondary" aria-hidden="true" />
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${category === c ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary"}`}
            >
              {t(c)}
            </button>
          ))}
        </div>

        {/* কার্ড */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {shown.map((e) => (
            <article
              key={e.id}
              className="overflow-hidden rounded-2xl border bg-background shadow-card"
            >
              <div className="relative">
                <img
                  src={e.image}
                  alt={localized(e.title, e.titleEn)}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="aspect-video w-full object-cover"
                />
                {e.day && (
                  <span className="absolute left-3 top-3 rounded-lg bg-card px-2 py-1 text-center leading-none shadow">
                    <CalendarDays
                      className="mx-auto mb-1 h-3 w-3 text-primary"
                      aria-hidden="true"
                    />
                    <b className="block text-lg text-primary">{t(e.day)}</b>
                    <span className="text-[10px] uppercase">{t(e.month ?? "")}</span>
                  </span>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {localized(e.category, e.categoryEn)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold">{localized(e.title, e.titleEn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{localized(e.text, e.textEn)}</p>
                <a
                  href={`/news-events/${e.id}`}
                  className="group mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  {t("আরও পড়ুন")} <ArrowRight className="icon-motion h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
