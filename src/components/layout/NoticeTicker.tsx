// মেনুর নিচে চলমান নোটিশ (marquee)
import { ArrowRight, Megaphone } from "lucide-react";
import type { Notice } from "@/data/types";
import { useLanguage } from "@/lib/language";

export function NoticeTicker({ notices }: { notices: Notice[] }) {
  const { localized, t } = useLanguage();

  return (
    <div className="notice-ticker border-b bg-card">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
        <span className="group flex shrink-0 items-center gap-1.5 rounded bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
          <Megaphone className="icon-motion h-3.5 w-3.5" /> {t("নোটিশ")}
        </span>
        <div className="notice-ticker-track overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block font-medium">
            {/* প্রথম ৫টি নোটিশ চলবে — সংখ্যা বদলাতে 5 পাল্টান */}
            {notices.slice(0, 5).map((n) => (
              <span key={n.id} className="mx-6">
                <ArrowRight className="mr-1 inline h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                {localized(n.title, n.titleEn)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
