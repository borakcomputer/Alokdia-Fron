// ছবির উপর "স্বাগতম" ব্যানার
import { ArrowRight } from "lucide-react";
import { SCHOOL } from "@/data/site";
import { treePlantingGroup } from "@/data/photos";
import { useLanguage } from "@/lib/language";

export function WelcomeBanner() {
  const { t, localized } = useLanguage();

  return (
    <section
      id="welcome"
      className="relative overflow-hidden py-24 text-center text-primary-foreground"
    >
      <img
        src={treePlantingGroup}
        alt=""
        loading="lazy"
        width={1280}
        height={720}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-topbar/75" />
      <div className="relative mx-auto max-w-3xl px-4">
        <p className="text-lg opacity-90">{t("স্বাগতম")}</p>
        <h2 className="mt-1 text-3xl font-bold md:text-5xl">{localized(SCHOOL.nameBn, SCHOOL.nameEn)}</h2>
        <p className="mt-3 text-lg text-accent">{localized(SCHOOL.motto, SCHOOL.mottoEn)}</p>
        <a
          href="#about"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground hover:opacity-90"
        >
          {t("আমাদের গল্প জানুন")} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
