// একদম উপরের গাঢ় বার: ফোন, ইমেইল, স্থাপিত সাল, EIIN
import { Phone, Mail, Landmark, IdCard } from "lucide-react";
import { SCHOOL } from "@/data/site";
import { ThemeToggle, useLanguage } from "@/lib/language";

export function TopBar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="site-topbar bg-topbar text-sm text-topbar-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <div className="flex flex-wrap gap-4">
          <a href={`tel:${SCHOOL.phone}`} className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-accent" /> {t(SCHOOL.phoneDisplay)}
          </a>
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-accent" /> {SCHOOL.email}
          </span>
        </div>
        <div className="hidden gap-4 sm:flex">
          <span className="flex items-center gap-1.5">
            <Landmark className="h-3.5 w-3.5 text-accent" /> {t("স্থাপিত:")} {t(SCHOOL.established)}
          </span>
          <span className="flex items-center gap-1.5">
            <IdCard className="h-3.5 w-3.5 text-accent" /> {t("ইআইআইএন:")} {t(SCHOOL.eiin)}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div
            className="flex items-center rounded-full border border-current/30 p-0.5"
            aria-label={t("নির্বাচন করুন")}
          >
            <button
              type="button"
              onClick={() => setLanguage("bn")}
              aria-pressed={language === "bn"}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${language === "bn" ? "bg-accent text-accent-foreground" : ""}`}
            >
              {t("বাংলা")}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${language === "en" ? "bg-accent text-accent-foreground" : ""}`}
            >
              {t("ইংরেজি")}
            </button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
