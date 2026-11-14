// নোটিশ বোর্ড — তারিখের রঙিন বক্স + শিরোনাম
import { CalendarDays, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { Notice } from "@/data/types";
import { useLanguage } from "@/lib/language";

// তারিখ বক্সের রঙ — একটার পর একটা ঘুরে ঘুরে বসবে
const TONES = ["bg-info", "bg-primary", "bg-accent text-accent-foreground", "bg-secondary"];

export function NoticeBoard({ notices }: { notices: Notice[] }) {
  const { t, localized } = useLanguage();

  return (
    <section id="notices" className="mx-auto max-w-7xl px-4 py-14">
      <SectionTitle title="নোটিশ বোর্ড" action="সব দেখুন" href="/notices" />
      <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
        {notices.map((n, k) => (
          <li key={n.id} className="border-b">
            <a href={`/notices/${n.id}`} className="group flex items-center gap-4 py-4">
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg text-primary-foreground ${TONES[k % TONES.length]}`}
              >
                <span className="text-center leading-none">
                  <b className="block text-xl">{t(n.day)}</b>
                  <span className="text-[10px] uppercase">{t(n.month)}</span>
                </span>
              </span>
              <span className="flex-1">
                <span className="block font-semibold group-hover:text-primary">
                  {localized(n.title, n.titleEn)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="icon-motion h-3 w-3" /> {t(n.day)} {t(n.month)}{" "}
                  {t("2026")}
                </span>
              </span>
              <ChevronRight className="icon-motion h-4 w-4 text-muted-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
