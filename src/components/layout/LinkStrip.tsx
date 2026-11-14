// নোটিশের নিচের ছোট লিংকের সারি (ভর্তি তথ্য, ফলাফল, ফেসবুক...)
import { CalendarDays, ChartNoAxesColumn, Facebook, FileText } from "lucide-react";
import { LINK_STRIP } from "@/data/site";
import { useLanguage } from "@/lib/language";

const LINK_ICONS = [FileText, ChartNoAxesColumn, CalendarDays, Facebook];

export function LinkStrip() {
  const { t } = useLanguage();

  return (
    <div className="link-strip border-b bg-muted">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-1 px-4 py-2 text-sm font-semibold text-primary">
        {LINK_STRIP.map((l, index) => {
          const Icon = LINK_ICONS[index] ?? FileText;
          return (
            <a
              key={l.label}
              href={l.href}
              className="group inline-flex items-center gap-1.5 hover:text-secondary"
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <Icon className="icon-motion h-4 w-4" aria-hidden="true" /> {t(l.label)}
            </a>
          );
        })}
      </div>
    </div>
  );
}
