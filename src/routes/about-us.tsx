import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  HeartHandshake,
  Landmark,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { LinkStrip } from "@/components/layout/LinkStrip";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { leaders as defaultLeaders } from "@/data/leaders";
import { useCollection } from "@/lib/admin-store";
import { SCHOOL, SCHOOL_SOURCES } from "@/data/site";
import { building, classroom, treePlantingGroup } from "@/data/photos";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "আমাদের সম্পর্কে | আলোকদিয়া উচ্চ বিদ্যালয়" },
      {
        name: "description",
        content: "আলোকদিয়া উচ্চ বিদ্যালয়ের পরিচিতি, অবস্থান ও প্রাতিষ্ঠানিক তথ্য।",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const leaders = useCollection("leaders", defaultLeaders);
  const { t, localized } = useLanguage();
  const facts = [
    { icon: CalendarDays, label: "প্রতিষ্ঠাকাল", value: "১৯৯৫" },
    { icon: Landmark, label: "ব্যবস্থাপনা", value: "বেসরকারি মাধ্যমিক বিদ্যালয়" },
    { icon: BookOpen, label: "শিক্ষা বোর্ড", value: "ঢাকা শিক্ষা বোর্ড" },
    { icon: MapPin, label: "অবস্থান", value: SCHOOL.address, valueEn: SCHOOL.addressEn },
  ];
  const campusImages = [
    { image: building, caption: "বিদ্যালয় ভবন" },
    { image: classroom, caption: "শ্রেণিকক্ষ" },
    { image: treePlantingGroup, caption: "বৃক্ষরোপণে শিক্ষক ও শিক্ষার্থী" },
  ];

  return (
    <div id="top" className="min-h-screen bg-background font-sans">
      <TopBar />
      <SiteHeader leaders={leaders} />
      <LinkStrip />

      <main>
        <section className="relative overflow-hidden bg-navbar px-4 py-14 text-topbar-foreground sm:py-20">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-accent">{t("আমাদের সম্পর্কে")}</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{t("আমাদের বিদ্যালয়")}</h1>
            <p className="mt-3 max-w-2xl text-base opacity-85">
              {localized(SCHOOL.about, SCHOOL.aboutEn)}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm opacity-75">
              <a href="/">{t("হোম")}</a>
              <ArrowRight className="h-4 w-4" />
              <span>{t("আমাদের সম্পর্কে")}</span>
            </div>
          </div>
        </section>

        <section className="dashboard-surface px-4 py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
            <img
              src={building}
              alt={t("আলোকদিয়ার উচ্চ বিদ্যালয়ের ভবন")}
              width={1280}
              height={720}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
            />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-secondary">
                {t("প্রতিষ্ঠানের পরিচিতি")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-primary">
                {t("শিক্ষা, মূল্যবোধ ও এগিয়ে চলা")}
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                {localized(SCHOOL.about, SCHOOL.aboutEn)}
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                {t(
                  "আলোকদিয়া ইউনিয়নের শিক্ষার্থীদের মাধ্যমিক শিক্ষার সুযোগ দেওয়ার লক্ষ্যে বিদ্যালয়টি কাজ করছে। বিদ্যালয়ের ইতিহাস ও কার্যক্রম সম্পর্কে আরও তথ্য বিদ্যালয় কর্তৃপক্ষের কাছ থেকে জানা যাবে।",
                )}
              </p>
              <a
                href="/admission"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
              >
                {t("ভর্তি সম্পর্কে জানুন")} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="school-profile" className="bg-card px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">
              {t("এক নজরে")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-primary">{t("প্রতিষ্ঠানের পরিচিতি")}</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(({ icon: Icon, label, value, valueEn }) => (
                <article key={label} className="dashboard-panel p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm text-muted-foreground">{t(label)}</p>
                  <h3 className="mt-1 font-bold">{localized(value, valueEn)}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dashboard-surface px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">
              {t("বিদ্যালয় জীবন")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-primary">{t("শেখা ও অংশগ্রহণ")}</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {campusImages.map(({ image, caption }) => (
                <figure key={caption} className="dashboard-panel group overflow-hidden">
                  <img
                    src={image}
                    alt={t(caption)}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="p-4 font-semibold">{t(caption)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="leadership" className="bg-card px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">
              {t("নেতৃত্ব")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-primary">{t("প্রশাসনিক তথ্য")}</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              {t(
                "বর্তমান প্রধান শিক্ষক ও ম্যানেজিং কমিটির তথ্য নিশ্চিত করা যায়নি। নিচের পুরোনো তথ্যটি ২০১১ সালের প্রতিবেদনভিত্তিক।",
              )}
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {leaders.slice(0, 2).map((leader) => (
                <article key={leader.id} className="dashboard-panel p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <HeartHandshake className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-secondary">
                        {localized(leader.tag, leader.tagEn)}
                      </p>
                      <h3 className="mt-1 text-xl font-bold">
                        {localized(leader.name, leader.nameEn)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {localized(leader.text, leader.textEn)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dashboard-surface px-4 py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <article className="dashboard-panel p-6 sm:p-8">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <h2 className="mt-4 text-2xl font-bold">{t("আমাদের অঙ্গীকার")}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {t("জ্ঞান, নৈতিকতা ও দেশপ্রেমে আলোকিত প্রজন্ম গড়াই বিদ্যালয়ের লক্ষ্য।")}
              </p>
            </article>
            <article className="dashboard-panel dashboard-panel-accent p-6 sm:p-8">
              <h2 className="text-2xl font-bold">{t("আরও জানতে চান?")}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {t(
                  "বিদ্যালয়ের পরিচিতি ও যোগাযোগের তথ্যসূত্র দেখুন, অথবা ভর্তি-সংক্রান্ত তথ্যের জন্য বিদ্যালয়ে যোগাযোগ করুন।",
                )}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {SCHOOL_SOURCES.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {t(source.label)}
                  </a>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
