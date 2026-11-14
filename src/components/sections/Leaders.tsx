// নেতৃত্ব ও প্রশাসন-সংক্রান্ত যাচাইকৃত তথ্য
import { User } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { Leader } from "@/data/types";
import { useLanguage } from "@/lib/language";

export function Leaders({ leaders }: { leaders: Leader[] }) {
  const { t, localized } = useLanguage();

  return (
    <section id="leaders" className="bg-card py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="তথ্য যাচাই" title="প্রশাসনিক তথ্য" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {leaders.map((m) => (
            <article
              key={m.id}
              className={`rounded-2xl border border-t-4 bg-background p-6 text-center shadow-card ${m.borderClass}`}
            >
              <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-muted">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm font-bold text-secondary">{localized(m.tag, m.tagEn)}</p>
              <h3 className="text-xl font-bold">{localized(m.name, m.nameEn)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{localized(m.text, m.textEn)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
