// "দ্রুত প্রবেশ" — চারটি রঙিন কার্ড
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { QuickItem } from "@/data/types";
import { useLanguage } from "@/lib/language";

export function QuickAccess({ items }: { items: QuickItem[] }) {
  const { t, localized } = useLanguage();

  return (
    <section id="quick" className="dashboard-surface border-y py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle kicker="সেবা" title="দ্রুত প্রবেশ" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((q) => (
            <a
              key={q.id}
              href={
                q.href
                  ? q.href
                  : q.title === "ভর্তি"
                    ? "/admission"
                    : q.title === "নোটিশ"
                      ? "/notices"
                      : q.title === "ফলাফল"
                        ? "/results"
                        : "/contact-us"
              }
              className={`group rounded-2xl p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${q.colorClass}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:scale-110">
                <q.icon className="icon-motion h-6 w-6" />
              </span>
              <h3 className="mt-3 text-xl font-bold">{localized(q.title, q.titleEn)}</h3>
              <p className="mt-1 text-sm text-white/90">{localized(q.text, q.textEn)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                {localized(q.action, q.actionEn)} <ArrowRight className="icon-motion h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
