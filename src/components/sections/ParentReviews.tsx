// "অভিভাবকেরা যা বলেন"
import { Quote } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { logo } from "@/data/photos";
import type { ParentReview } from "@/data/types";
import { useLanguage } from "@/lib/language";

export function ParentReviews({ reviews }: { reviews: ParentReview[] }) {
  const { t, localized } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <SectionTitle kicker="মতামত" title="অভিভাবকেরা যা বলেন" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {reviews.map((p) => (
          <figure key={p.id} className="rounded-2xl border bg-card p-6 shadow-card">
            <Quote className="h-8 w-8 text-accent" />
            <blockquote className="mt-2 text-lg">{localized(p.quote, p.quoteEn)}</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <img src={logo} alt="" width={40} height={40} loading="lazy" className="h-10 w-10" />
              <span>
                <b className="block">{localized(p.name, p.nameEn)}</b>
                <span className="text-sm text-muted-foreground">{localized(p.role, p.roleEn)}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
