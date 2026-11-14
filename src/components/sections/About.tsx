// "আমাদের সম্পর্কে" — ভবনের ছবি + পরিচিতি + তিনটি সংখ্যার বক্স
import {
  ArrowRight,
  Building2,
  CalendarDays,
  GraduationCap,
  IdCard,
  MapPin,
  School,
} from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { SCHOOL, SCHOOL_SOURCES } from "@/data/site";
import { building } from "@/data/photos";
import { useLanguage } from "@/lib/language";

export function About() {
  const { t, localized } = useLanguage();
  const facts = [
    { icon: CalendarDays, label: "প্রতিষ্ঠাকাল", value: `${SCHOOL.established} সাল` },
    { icon: IdCard, label: "ইআইআইএন নম্বর", value: SCHOOL.eiin },
    { icon: GraduationCap, label: "শিক্ষার স্তর", value: "মাধ্যমিক" },
    { icon: Building2, label: "ব্যবস্থাপনা", value: "বেসরকারি" },
    { icon: School, label: "শিক্ষা বোর্ড", value: "ঢাকা" },
    { icon: MapPin, label: "অবস্থান", value: "আলোকদিয়া, মধুপুর, টাঙ্গাইল" },
  ];

  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2"
    >
      <img
        src={building}
        alt={t("আলোকদিয়ার উচ্চ বিদ্যালয়ের ভবন")}
        loading="lazy"
        width={1280}
        height={720}
        className="aspect-video w-full rounded-2xl object-cover shadow-card"
      />
      <div>
        <SectionTitle kicker="আমাদের সম্পর্কে" title="আলোকদিয়ায় স্বাগতম" />
        <p className="mt-5 text-muted-foreground">{localized(SCHOOL.about, SCHOOL.aboutEn)}</p>
        <h3 className="mt-6 font-bold text-primary">{t("প্রতিষ্ঠানের পরিচিতি")}</h3>
        <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {facts.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <span className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="icon-motion h-5 w-5" aria-hidden="true" />
              </span>
              <dt className="text-sm text-muted-foreground">{t(label)}</dt>
              <dd className="mt-1 font-semibold">{t(value)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 rounded-xl border border-secondary/30 bg-secondary/5 p-4 text-sm">
          <h3 className="font-bold text-primary">{t("যাচাই-সংক্রান্ত নোট")}</h3>
          <p className="mt-1 text-muted-foreground">
            {t(
              "বর্তমান প্রধান শিক্ষক, প্রতিষ্ঠাতা, ম্যানেজিং কমিটি, শিক্ষক-শিক্ষার্থী সংখ্যা এবং সাম্প্রতিক এসএসসি ফলাফলের নির্ভরযোগ্য হালনাগাদ তথ্য পাওয়া যায়নি। অনলাইন ডিরেক্টরিতে এমপিওভুক্তির উল্লেখ থাকলেও তা বিদ্যালয় থেকে নিশ্চিত করা প্রয়োজন।",
            )}
          </p>
          <p className="mt-2 text-muted-foreground">
            {t(
              "২০১১ সালের একটি প্রতিবেদনে তৎকালীন প্রধান শিক্ষক হিসেবে মোঃ আবুল কালাম আজাদের নাম উল্লেখ আছে; এটি বর্তমান দায়িত্বের নিশ্চয়তা নয়।",
            )}
          </p>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {t("তথ্যসূত্র:")}{" "}
          {SCHOOL_SOURCES.map((source, index) => (
            <span key={source.href}>
              {index > 0 && " · "}
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {t(source.label)}
              </a>
            </span>
          ))}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {t(
            "যোগাযোগের অনলাইন তালিকায় নম্বরের অমিল রয়েছে; ফোন ও ওয়েবসাইট আগে বিদ্যালয় থেকে যাচাই করুন।",
          )}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#welcome"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
          >
            {t("আরও জানুন")} <ArrowRight className="icon-motion h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={SCHOOL.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 font-semibold text-primary"
          >
            <MapPin className="icon-motion h-4 w-4" aria-hidden="true" />
            {t("মানচিত্রে দেখুন")}
          </a>
        </div>
      </div>
    </section>
  );
}
