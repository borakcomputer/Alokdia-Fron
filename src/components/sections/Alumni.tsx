// প্রাক্তন শিক্ষার্থী — পাশে স্ক্রল করা কার্ড
import { User } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { Alumnus } from "@/data/types";
import { useLanguage } from "@/lib/language";

export function Alumni({ alumni }: { alumni: Alumnus[] }) {
  const { t, localized } = useLanguage();

  return (
    <section className="bg-card py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="গর্বিত প্রাক্তন শিক্ষার্থী" title="আলোকদিয়ার তারকারা" />
        <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-3">
          {alumni.map((a) => (
            <article
              key={a.id}
              className="w-56 shrink-0 snap-start rounded-2xl border bg-background p-5 text-center shadow-card"
            >
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-muted">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-3 font-bold">
                {localized(a.name, a.nameEn).replace(/ \d+$/, "")}{" "}
                {localized(a.name, a.nameEn).match(/ \d+$/)?.[0] ?? ""}
              </h3>
              <p className="text-sm text-muted-foreground">{localized(a.university, a.universityEn)}</p>
              <p className="mt-1 text-xs font-semibold text-secondary">
                {localized("ব্যাচ", "Batch")} {localized(a.batch, a.batchEn).match(/\d+$/)?.[0] ?? ""}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
