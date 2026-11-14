import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  IdCard,
  MapPin,
  Phone,
  UserRoundCheck,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { LinkStrip } from "@/components/layout/LinkStrip";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { leaders as defaultLeaders } from "@/data/leaders";
import { useCollection } from "@/lib/admin-store";
import { SCHOOL } from "@/data/site";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/admission")({
  head: () => ({
    meta: [
      { title: "ভর্তি | আলোকদিয়া উচ্চ বিদ্যালয়" },
      {
        name: "description",
        content: "আলোকদিয়া উচ্চ বিদ্যালয়ের ভর্তি-সংক্রান্ত তথ্য ও যোগাযোগের উপায়।",
      },
    ],
  }),
  component: AdmissionPage,
});

function AdmissionPage() {
  const leaders = useCollection("leaders", defaultLeaders);
  const { t } = useLanguage();
  const documents = [
    { icon: FileCheck2, text: "শিক্ষার্থীর জন্মনিবন্ধনের অনুলিপি" },
    { icon: IdCard, text: "শিক্ষার্থী ও অভিভাবকের পরিচয়পত্রের অনুলিপি" },
    { icon: BookOpenCheck, text: "আগের বিদ্যালয়ের ছাড়পত্র ও ফলাফলের কাগজ (প্রযোজ্য হলে)" },
    { icon: UserRoundCheck, text: "শিক্ষার্থীর সাম্প্রতিক পাসপোর্ট সাইজের ছবি" },
    { icon: ClipboardList, text: "বিদ্যালয় থেকে সংগ্রহ করা পূরণকৃত ভর্তি ফরম" },
  ];
  const steps = [
    {
      icon: Phone,
      number: "০১",
      title: "বিদ্যালয়ে যোগাযোগ",
      text: "শ্রেণিভিত্তিক আসন, ভর্তি সময় ও ফরম সংগ্রহের নিয়ম বিদ্যালয় অফিস থেকে জেনে নিন।",
    },
    {
      icon: ClipboardList,
      number: "০২",
      title: "ফরম পূরণ ও কাগজপত্র",
      text: "বিদ্যালয়ের নির্দেশনা অনুযায়ী ভর্তি ফরম পূরণ করে প্রয়োজনীয় কাগজপত্র জমা দিন।",
    },
    {
      icon: GraduationCap,
      number: "০৩",
      title: "যাচাই ও পরবর্তী নির্দেশনা",
      text: "আবেদন যাচাই, মূল্যায়ন বা সাক্ষাৎকারের প্রয়োজন হলে বিদ্যালয় থেকে সময়সূচি জেনে নিন।",
    },
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
            <p className="text-sm font-semibold text-accent">{t("ভর্তি")}</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{t("নতুন শিক্ষাবর্ষে ভর্তি")}</h1>
            <p className="mt-3 max-w-2xl text-base opacity-85">
              {t(
                "আলোকদিয়া উচ্চ বিদ্যালয়ে ভর্তির তথ্য, প্রয়োজনীয় কাগজপত্র ও যোগাযোগের উপায় জানুন।",
              )}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm opacity-75">
              <a href="/">{t("হোম")}</a>
              <ArrowRight className="h-4 w-4" />
              <span>{t("ভর্তি")}</span>
            </div>
          </div>
        </section>

        <section className="dashboard-surface px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-secondary">
                  {t("ভর্তির প্রস্তুতি")}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-primary">
                  {t("আবেদনের আগে যা জেনে নেবেন")}
                </h2>
                <p className="mt-3 text-muted-foreground">
                  {t(
                    "ভর্তি-সংক্রান্ত শ্রেণি, সময়সীমা, আসন ও ফি বিদ্যালয় থেকে সরাসরি নিশ্চিত করুন।",
                  )}
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {documents.map(({ icon: Icon, text }, index) => (
                    <article key={text} className="dashboard-panel flex gap-4 p-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="text-xs font-bold tracking-wider text-secondary">
                          {t("প্রয়োজনীয় কাগজপত্র")} {t(String(index + 1).padStart(2, "0"))}
                        </span>
                        <p className="mt-1 font-semibold">{t(text)}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/5 p-4 text-sm text-muted-foreground">
                  {t(
                    "এটি সাধারণ প্রস্তুতির তালিকা; শ্রেণি ও শিক্ষাবর্ষ অনুযায়ী প্রয়োজনীয় কাগজপত্র বিদ্যালয় থেকে নিশ্চিত করুন।",
                  )}
                </p>
              </div>

              <aside className="dashboard-panel dashboard-panel-accent h-fit p-6 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-2xl font-bold">{t("ভর্তি বিষয়ে জানতে চান?")}</h2>
                <p className="mt-2 text-muted-foreground">
                  {t(
                    "ভর্তি ফরম, আসন, প্রয়োজনীয় কাগজপত্র ও অফিস সময় জানতে বিদ্যালয়ের সঙ্গে যোগাযোগ করুন।",
                  )}
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href={`tel:${SCHOOL.phone}`}
                    className="flex items-center gap-3 rounded-xl bg-muted p-4 font-semibold"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    {t(SCHOOL.phoneDisplay)}
                  </a>
                  <a
                    href={SCHOOL.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-muted p-4 font-semibold"
                  >
                    <MapPin className="h-5 w-5 text-primary" />
                    {t("বিদ্যালয়ের ঠিকানা ও মানচিত্র")}
                  </a>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  {t(
                    "ফোন নম্বর অনলাইন ডিরেক্টরি থেকে নেওয়া; যোগাযোগের আগে বিদ্যালয় থেকে যাচাই করুন।",
                  )}
                </p>
                <a
                  href="/contact-us"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
                >
                  {t("যোগাযোগ পেজে যান")} <ArrowRight className="h-4 w-4" />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-card px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">
              {t("ভর্তির ধাপ")}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-primary">{t("সহজভাবে ভর্তি প্রক্রিয়া")}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {steps.map(({ icon: Icon, number, title, text }) => (
                <article key={number} className="dashboard-panel p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-3xl font-bold text-primary/20">{t(number)}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{t(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(text)}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              {t(
                "প্রক্রিয়া ও সময়সূচি শিক্ষাবর্ষভেদে পরিবর্তিত হতে পারে; সর্বশেষ তথ্য বিদ্যালয় থেকে জেনে নিন।",
              )}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
