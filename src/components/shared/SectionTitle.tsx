// প্রতিটি সেকশনের উপরের শিরোনাম (ছোট kicker + বড় title + ডানে "সব দেখুন" বাটন)
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

type Props = { kicker?: string; title: string; action?: string; href?: string };

export function SectionTitle({ kicker, title, action, href = "/" }: Props) {
  const { t } = useLanguage();

  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {kicker && (
          <p className="flex items-center gap-2 text-sm font-bold text-secondary">
            <span className="h-0.5 w-8 bg-secondary" /> {t(kicker)}
          </p>
        )}
        <h2 className="mt-1 text-3xl font-bold text-primary">{t(title)}</h2>
        <div className="mt-2 h-1 w-16 rounded bg-rule" />
      </div>
      {action && (
        <a
          href={href}
          className="group inline-flex items-center gap-2 rounded-full border border-primary px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
        >
          {t(action)} <ArrowRight className="icon-motion h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
