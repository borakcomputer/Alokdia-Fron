import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ChartNoAxesColumn,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  House,
  IdCard,
  Images,
  Landmark,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Phone,
  Quote,
  School,
  Trophy,
  User,
  UsersRound,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { alumni as defaultAlumni } from "@/data/alumni";
import { EVENT_CATEGORIES, events as defaultEvents } from "@/data/events";
import { getIcon } from "@/data/icons";
import { galleryPhotos as defaultGalleryPhotos } from "@/data/gallery";
import { leaders as defaultLeaders } from "@/data/leaders";
import { notices as defaultNotices } from "@/data/notices";
import { parentReviews as defaultParentReviews } from "@/data/parents";
import { defaultAchievementRows, defaultQuickRows, defaultResultRows } from "@/data/serializable";
import { LINK_STRIP, MENU, SCHOOL, SCHOOL_SOURCES, FACEBOOK_URL, FOOTER_LINKS } from "@/data/site";
import { slides as defaultSlides } from "@/data/slides";
import type {
  Achievement,
  Alumnus,
  EventItem,
  GalleryPhoto,
  Leader,
  Notice,
  ParentReview,
  QuickItem,
  ResultPoint,
  Slide,
} from "@/data/types";
import { useCollection } from "@/lib/admin-store";
import { ThemeToggle, useLanguage } from "@/lib/language";
import { building, logo, treePlantingGroup } from "@/data/photos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "আলোকদিয়া উচ্চ বিদ্যালয় | Alokdia High School, Madhupur, Tangail" },
      {
        name: "description",
        content:
          "আলোকদিয়া উচ্চ বিদ্যালয়, মধুপুর, টাঙ্গাইল — নোটিশ, ভর্তি, শিক্ষক, ফলাফল ও অনুষ্ঠানের খবর।",
      },
      { property: "og:title", content: "আলোকদিয়া উচ্চ বিদ্যালয়, মধুপুর, টাঙ্গাইল" },
      {
        property: "og:description",
        content: "Alokdia High School official website — notices, admission, events and results.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { language } = useLanguage();
  const notices = useCollection<Notice>("notices", defaultNotices);
  const slides = useCollection<Slide>("slides", defaultSlides);
  const leaders = useCollection<Leader>("leaders", defaultLeaders);
  const alumni = useCollection<Alumnus>("alumni", defaultAlumni);
  const parentReviews = useCollection<ParentReview>("parents", defaultParentReviews);
  const events = useCollection<EventItem>("events", defaultEvents);
  const galleryPhotos = useCollection<GalleryPhoto>("gallery", defaultGalleryPhotos);
  const achievementRows = useCollection("achievements", defaultAchievementRows);
  const quickRows = useCollection("quick", defaultQuickRows);
  const resultRows = useCollection("results", defaultResultRows);

  const achievementItems = useMemo<Achievement[]>(
    () => achievementRows.map((item) => ({ ...item, icon: getIcon(item.icon) })),
    [achievementRows],
  );
  const quickItems = useMemo<QuickItem[]>(
    () => quickRows.map((item) => ({ ...item, icon: getIcon(item.icon) })),
    [quickRows],
  );
  const results = useMemo(() => {
    const output: Record<string, ResultPoint[]> = {};
    resultRows.forEach((row) => {
      const exam = language === "en" && row.examEn?.trim() ? row.examEn : row.exam;
      (output[exam] ??= []).push({ year: row.year, percent: Number(row.percent) });
    });
    return output;
  }, [resultRows, language]);

  return (
    <div id="top" className="min-h-screen bg-background font-sans">
      <HomeTopBar />
      <HomeSiteHeader leaders={leaders} />
      <HomeNoticeTicker notices={notices} />
      <HomeLinkStrip />

      <main>
        <HomeHeroSlider slides={slides} />
        <HomeNoticeBoard notices={notices} />
        <HomeLeaders leaders={leaders} />
        <HomeWelcomeBanner />
        <HomeAbout />
        <HomeAlumni alumni={alumni} />
        <HomeParentReviews reviews={parentReviews} />
        <HomeNewsEvents events={events} categories={EVENT_CATEGORIES} />
        <HomePhotoGallery photos={galleryPhotos} />
        <HomeAchievements items={achievementItems} />
        <HomeResultsChart results={results} />
        <HomeQuickAccess items={quickItems} />
      </main>

      <HomeFooter />
    </div>
  );
}

function HomeTopBar() {
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

const MENU_ICONS = [House, School, BookOpen, Bell, UsersRound, Images, Trophy, Phone];

function HomeSiteHeader({ leaders }: { leaders: Leader[] }) {
  const [open, setOpen] = useState(false);
  const { t, localized } = useLanguage();

  return (
    <>
      <header className="site-header bg-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt={t("আলোকদিয়া উচ্চ বিদ্যালয় লোগো")}
              width={80}
              height={80}
              className="h-16 w-16 transition-transform duration-500 hover:rotate-6 hover:scale-105 md:h-20 md:w-20"
            />
            <div>
              <h1 className="text-xl font-bold leading-tight text-primary md:text-4xl">
                {localized(SCHOOL.nameBn, SCHOOL.nameEn)}
              </h1>
              <p className="text-sm font-medium text-secondary md:text-base">
                {localized(SCHOOL.motto, SCHOOL.mottoEn)}
              </p>
            </div>
          </div>
          <div className="hidden gap-2 lg:flex">
            {leaders.map((leader) => (
              <a
                key={leader.id}
                href="/#leaders"
                className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold shadow-sm hover:border-primary"
              >
                <User className="h-4 w-4 text-primary" />
                {localized(leader.tag, leader.tagEn)}
              </a>
            ))}
          </div>
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={t("মেনু")}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-7 w-7 text-primary transition-transform duration-200" />
            ) : (
              <Menu className="h-7 w-7 text-primary transition-transform duration-200" />
            )}
          </button>
        </div>
      </header>

      <nav className="site-navigation sticky top-0 z-30 bg-navbar text-topbar-foreground">
        <ul
          className={`mx-auto max-w-7xl justify-center gap-1 px-4 py-1 lg:flex ${open ? "flex flex-col" : "hidden"}`}
        >
          {MENU.map((item, index) => {
            const ItemIcon = MENU_ICONS[index] ?? School;
            return (
              <li key={item.label} className="group relative">
                <a
                  href={item.href ?? "/"}
                  className="flex items-center gap-1 rounded-md px-3 py-2.5 text-[15px] font-medium hover:bg-primary-foreground/15"
                >
                  <ItemIcon className="icon-motion h-4 w-4 shrink-0" />
                  {t(item.label)}
                  {item.sub && (
                    <ChevronDown className="icon-motion h-4 w-4 group-hover:rotate-180" />
                  )}
                </a>
                {item.sub && (
                  <ul className="z-40 hidden min-w-52 rounded-md bg-card py-1 text-foreground shadow-card group-hover:block group-focus-within:block lg:absolute lg:left-0 lg:top-full">
                    {item.sub.map((subItem) => (
                      <li key={subItem.label}>
                        <a
                          href={subItem.href}
                          className="group flex items-center gap-1 px-4 py-2 text-sm hover:bg-muted hover:text-primary"
                        >
                          <ChevronRight className="icon-motion h-3.5 w-3.5" aria-hidden="true" />
                          {t(subItem.label)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <div className="h-1 bg-rule" />
      </nav>
    </>
  );
}

function HomeNoticeTicker({ notices }: { notices: Notice[] }) {
  const { localized, t } = useLanguage();

  return (
    <div className="notice-ticker border-b bg-card">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
        <span className="group flex shrink-0 items-center gap-1.5 rounded bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
          <Megaphone className="icon-motion h-3.5 w-3.5" /> {t("নোটিশ")}
        </span>
        <div className="notice-ticker-track overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block font-medium">
            {notices.slice(0, 5).map((notice) => (
              <span key={notice.id} className="mx-6">
                <ArrowRight className="mr-1 inline h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                {localized(notice.title, notice.titleEn)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const LINK_ICONS = [FileText, ChartNoAxesColumn, CalendarDays, Facebook];

function HomeLinkStrip() {
  const { t } = useLanguage();

  return (
    <div className="link-strip border-b bg-muted">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-1 px-4 py-2 text-sm font-semibold text-primary">
        {LINK_STRIP.map((link, index) => {
          const Icon = LINK_ICONS[index] ?? FileText;
          return (
            <a
              key={link.label}
              href={link.href}
              className="group inline-flex items-center gap-1.5 hover:text-secondary"
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <Icon className="icon-motion h-4 w-4" aria-hidden="true" /> {t(link.label)}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function HomeHeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const { t, localized } = useLanguage();
  const go = (direction: number) =>
    setCurrent((value) => (value + direction + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((value) => (value + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden bg-topbar sm:aspect-[21/9]">
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.image}
          alt={localized(slide.title, slide.titleEn)}
          width={1280}
          height={720}
          style={{ objectPosition: slide.position }}
          className={`hero-slide absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === current ? "hero-slide-active opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 flex items-end bg-gradient-to-r from-black/65 via-black/20 to-transparent px-6 pb-8 pt-16 sm:px-10 sm:pb-12">
        <div
          key={current}
          className="hero-copy mx-auto w-full max-w-7xl text-primary-foreground"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent sm:text-base">
            {t("শিক্ষা, মূল্যবোধ ও ভবিষ্যৎ")}
          </p>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold md:text-4xl">
            {slides[current] ? localized(slides[current].title, slides[current].titleEn) : ""}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
            {t("আলোকদিয়া উচ্চ বিদ্যালয়ে শেখা, বিকাশ ও এগিয়ে চলার একসঙ্গে পথচলা।")}
          </p>
          <a
            href="/admission"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-bold text-accent-foreground shadow-lg transition hover:-translate-y-0.5"
          >
            {t("ভর্তি সম্পর্কে জানুন")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <button
        onClick={() => go(-1)}
        aria-label={t("আগের স্লাইড")}
        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/80 text-primary hover:bg-card"
      >
        <ChevronLeft className="icon-motion" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label={t("পরের স্লাইড")}
        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/80 text-primary hover:bg-card"
      >
        <ChevronRight className="icon-motion" />
      </button>
    </section>
  );
}

function HomeSectionTitle({
  kicker,
  title,
  action,
  href = "/",
}: {
  kicker?: string;
  title: string;
  action?: string;
  href?: string;
}) {
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

const NOTICE_TONES = ["bg-info", "bg-primary", "bg-accent text-accent-foreground", "bg-secondary"];

function HomeNoticeBoard({ notices }: { notices: Notice[] }) {
  const { t, localized } = useLanguage();

  return (
    <section id="notices" className="mx-auto max-w-7xl px-4 py-14">
      <HomeSectionTitle title="নোটিশ বোর্ড" action="সব দেখুন" href="/notices" />
      <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
        {notices.map((notice, index) => (
          <li key={notice.id} className="border-b">
            <a href={`/notices/${notice.id}`} className="group flex items-center gap-4 py-4">
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg text-primary-foreground ${NOTICE_TONES[index % NOTICE_TONES.length]}`}
              >
                <span className="text-center leading-none">
                  <b className="block text-xl">{t(notice.day)}</b>
                  <span className="text-[10px] uppercase">{t(notice.month)}</span>
                </span>
              </span>
              <span className="flex-1">
                <span className="block font-semibold group-hover:text-primary">
                  {localized(notice.title, notice.titleEn)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="icon-motion h-3 w-3" /> {t(notice.day)} {t(notice.month)}{" "}
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

function HomeLeaders({ leaders }: { leaders: Leader[] }) {
  const { localized } = useLanguage();

  return (
    <section id="leaders" className="bg-card py-14">
      <div className="mx-auto max-w-7xl px-4">
        <HomeSectionTitle kicker="তথ্য যাচাই" title="প্রশাসনিক তথ্য" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {leaders.map((leader) => (
            <article
              key={leader.id}
              className={`rounded-2xl border border-t-4 bg-background p-6 text-center shadow-card ${leader.borderClass}`}
            >
              <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-muted">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm font-bold text-secondary">
                {localized(leader.tag, leader.tagEn)}
              </p>
              <h3 className="text-xl font-bold">{localized(leader.name, leader.nameEn)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {localized(leader.text, leader.textEn)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeWelcomeBanner() {
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
        <h2 className="mt-1 text-3xl font-bold md:text-5xl">
          {localized(SCHOOL.nameBn, SCHOOL.nameEn)}
        </h2>
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

function HomeAbout() {
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
        <HomeSectionTitle kicker="আমাদের সম্পর্কে" title="আলোকদিয়ায় স্বাগতম" />
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
              "বর্তমান প্রধান শিক্ষক, প্রতিষ্ঠাতা, ম্যানেজিং কমিটি, শিক্ষক-শিক্ষার্থী সংখ্যা এবং সাম্প্রতিক এসএসসি ফলাফলের নির্ভরযোগ্য হালনাগাদ তথ্য পাওয়া যায়নি। অনলাইন ডিরেক্টরিতে এমপিওভুক্তির উল্লেখ থাকলেও তা বিদ্যালয় থেকে নিশ্চিত করা প্রয়োজন।",
            )}
          </p>
          <p className="mt-2 text-muted-foreground">
            {t(
              "২০১১ সালের একটি প্রতিবেদনে তৎকালীন প্রধান শিক্ষক হিসেবে মোঃ আবুল কালাম আজাদের নাম উল্লেখ আছে; এটি বর্তমান দায়িত্বের নিশ্চয়তা নয়।",
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
            "যোগাযোগের অনলাইন তালিকায় নম্বরের অমিল রয়েছে; ফোন ও ওয়েবসাইট আগে বিদ্যালয় থেকে যাচাই করুন।",
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

function HomeAlumni({ alumni }: { alumni: Alumnus[] }) {
  const { localized } = useLanguage();

  return (
    <section className="bg-card py-14">
      <div className="mx-auto max-w-7xl px-4">
        <HomeSectionTitle kicker="গর্বিত প্রাক্তন শিক্ষার্থী" title="আলোকদিয়ার তারকারা" />
        <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-3">
          {alumni.map((item) => (
            <article
              key={item.id}
              className="w-56 shrink-0 snap-start rounded-2xl border bg-background p-5 text-center shadow-card"
            >
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-muted">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-3 font-bold">
                {localized(item.name, item.nameEn).replace(/ \d+$/, "")}{" "}
                {localized(item.name, item.nameEn).match(/ \d+$/)?.[0] ?? ""}
              </h3>
              <p className="text-sm text-muted-foreground">
                {localized(item.university, item.universityEn)}
              </p>
              <p className="mt-1 text-xs font-semibold text-secondary">
                {localized("ব্যাচ", "Batch")}{" "}
                {localized(item.batch, item.batchEn).match(/\d+$/)?.[0] ?? ""}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeParentReviews({ reviews }: { reviews: ParentReview[] }) {
  const { localized } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <HomeSectionTitle kicker="মতামত" title="অভিভাবকেরা যা বলেন" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <figure key={review.id} className="rounded-2xl border bg-card p-6 shadow-card">
            <Quote className="h-8 w-8 text-accent" />
            <blockquote className="mt-2 text-lg">
              {localized(review.quote, review.quoteEn)}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <img src={logo} alt="" width={40} height={40} loading="lazy" className="h-10 w-10" />
              <span>
                <b className="block">{localized(review.name, review.nameEn)}</b>
                <span className="text-sm text-muted-foreground">
                  {localized(review.role, review.roleEn)}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function HomeNewsEvents({ events, categories }: { events: EventItem[]; categories: string[] }) {
  const [category, setCategory] = useState("সব");
  const { t, localized } = useLanguage();
  const shown = events.filter((event) => category === "সব" || event.category === category);

  return (
    <section className="bg-card py-14">
      <div className="mx-auto max-w-7xl px-4">
        <HomeSectionTitle
          kicker="ক্যাম্পাস লাইফ"
          title="সংবাদ ও অনুষ্ঠান"
          action="সব দেখুন"
          href="/news-events"
        />
        <div
          className="mt-6 flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t("বিভাগ")}
        >
          <Filter className="h-4 w-4 text-secondary" aria-hidden="true" />
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${category === item ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary"}`}
            >
              {t(item)}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {shown.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-2xl border bg-background shadow-card"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={localized(event.title, event.titleEn)}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="aspect-video w-full object-cover"
                />
                {event.day && (
                  <span className="absolute left-3 top-3 rounded-lg bg-card px-2 py-1 text-center leading-none shadow">
                    <CalendarDays
                      className="mx-auto mb-1 h-3 w-3 text-primary"
                      aria-hidden="true"
                    />
                    <b className="block text-lg text-primary">{t(event.day)}</b>
                    <span className="text-[10px] uppercase">{t(event.month ?? "")}</span>
                  </span>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {localized(event.category, event.categoryEn)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold">{localized(event.title, event.titleEn)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {localized(event.text, event.textEn)}
                </p>
                <a
                  href={`/news-events/${event.id}`}
                  className="group mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  {t("আরও পড়ুন")} <ArrowRight className="icon-motion h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const { t, localized } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];
  const showPrevious = () =>
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + photos.length) % photos.length,
    );
  const showNext = () =>
    setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length));

  return (
    <>
      <section id="gallery" className="mx-auto max-w-7xl px-4 py-14">
        <HomeSectionTitle
          kicker="স্মৃতির অ্যালবাম"
          title="ফটো গ্যালারি"
          action="সব দেখুন"
          href="/gallery"
        />
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {photos.map((photo, index) => (
            <figure
              key={photo.id}
              className="group relative overflow-hidden rounded-xl shadow-card"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${t("ছবি দেখুন")}: ${localized(photo.caption, photo.captionEn)}`}
                className="relative block w-full cursor-zoom-in text-left"
              >
                <img
                  src={photo.image}
                  alt={localized(photo.caption, photo.captionEn)}
                  loading="lazy"
                  width={640}
                  height={480}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8 text-left text-xs font-semibold text-white">
                  {localized(photo.caption, photo.captionEn)}
                </span>
              </button>
            </figure>
          ))}
        </div>
      </section>
      <Dialog
        open={activePhoto !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <DialogContent
          closeLabel={t("বন্ধ করুন")}
          className="w-[calc(100%-2rem)] max-w-5xl border-0 bg-black p-3 text-white sm:p-5"
        >
          {activePhoto && activeIndex !== null && (
            <>
              <DialogTitle className="sr-only">
                {localized(activePhoto.caption, activePhoto.captionEn)}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {t("ছবি")} {t(String(activeIndex + 1))} {t("এর মধ্যে")} {t(String(photos.length))}
              </DialogDescription>
              <div className="relative flex min-h-48 items-center justify-center">
                <img
                  src={activePhoto.image}
                  alt={localized(activePhoto.caption, activePhoto.captionEn)}
                  className="max-h-[75vh] max-w-full object-contain"
                />
                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      aria-label={t("আগের ছবি")}
                      className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white hover:bg-black/85"
                    >
                      <ChevronLeft aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label={t("পরের ছবি")}
                      className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white hover:bg-black/85"
                    >
                      <ChevronRight aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-center text-sm font-medium text-white">
                {localized(activePhoto.caption, activePhoto.captionEn)}
                <span className="ml-2 text-white/70">
                  ({t(String(activeIndex + 1))}/{t(String(photos.length))})
                </span>
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function HomeAchievements({ items }: { items: Achievement[] }) {
  const { t, localized } = useLanguage();

  return (
    <section className="bg-navbar py-14 text-topbar-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-sm font-semibold tracking-widest text-accent">
          প্রতিষ্ঠানের সংক্ষিপ্ত পরিচিতি
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-primary-foreground/10 p-6 text-center">
              <item.icon className="mx-auto h-8 w-8 text-accent" />
              <div className="mt-3 text-3xl font-bold">{t(item.number)}</div>
              <div className="text-sm opacity-85">{localized(item.label, item.labelEn)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeResultsChart({ results }: { results: Record<string, ResultPoint[]> }) {
  const { t } = useLanguage();
  const exams = Object.keys(results);
  const [selected, setExam] = useState("");
  const exam = results[selected] ? selected : (exams[0] ?? "");
  const points = results[exam] ?? [];
  const schoolFacts = [
    { icon: IdCard, label: "ইআইআইএন নম্বর", value: SCHOOL.eiin },
    { icon: CalendarDays, label: "প্রতিষ্ঠাকাল", value: SCHOOL.established },
    { icon: GraduationCap, label: "শিক্ষার স্তর", value: "মাধ্যমিক" },
  ];

  return (
    <section id="results" className="dashboard-surface py-14">
      <div className="mx-auto max-w-7xl px-4">
        <HomeSectionTitle kicker="এক নজরে" title="ফলাফল ও পরিসংখ্যান" />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <aside className="dashboard-panel p-5">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <IdCard className="h-5 w-5" />
              </span>
              {t("প্রতিষ্ঠানের পরিচিতি")}
            </h3>
            <div className="mt-4 divide-y">
              {schoolFacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 text-sm text-muted-foreground">{t(label)}</span>
                  <strong className="text-base">{t(value)}</strong>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted p-4 text-sm">
              <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
              <span>{t("ঢাকা শিক্ষা বোর্ড")}</span>
            </div>
          </aside>
          <div className="dashboard-panel dashboard-panel-accent p-5 sm:p-6 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <BarChart3 className="h-5 w-5 text-primary" />
                {t("এসএসসি ফলাফল")}
              </h3>
              {exams.length > 0 && (
                <div className="flex rounded-xl bg-muted p-1">
                  {exams.map((key) => (
                    <button
                      key={key}
                      onClick={() => setExam(key)}
                      aria-pressed={exam === key}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold ${exam === key ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {points.length > 0 ? (
              <div className="mt-6 flex h-64 items-end gap-4 rounded-xl bg-muted/50 p-5">
                {points.map((point) => (
                  <div
                    key={`${exam}-${point.year}`}
                    className="bar-col flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <strong className="text-sm text-primary">{t(`${point.percent}%`)}</strong>
                    <div
                      className="bar-grow w-full max-w-16 rounded-t-md"
                      style={{ height: `${point.percent * 0.8}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{t(point.year)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 p-6 text-center">
                <BarChart3 className="h-9 w-9 text-primary/70" />
                <p className="mt-3 font-semibold">
                  {t("যাচাইকৃত ফলাফলের পরিসংখ্যান এখনো যোগ করা হয়নি।")}
                </p>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  {t(
                    "ঢাকা বোর্ডের ফলাফল পোর্টালে পরীক্ষা হিসেবে এসএসসি, বোর্ড হিসেবে ঢাকা এবং ফলাফলের ধরন হিসেবে প্রতিষ্ঠানভিত্তিক ফলাফল নির্বাচন করে ইআইআইএন নম্বর ১১৪৩৯৮ লিখুন।",
                  )}
                </p>
                <a
                  href="https://eboardresults.com/v2/home?lang=bn"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
                >
                  {t("ফলাফল পোর্টালে যান")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeQuickAccess({ items }: { items: QuickItem[] }) {
  const { localized } = useLanguage();

  return (
    <section id="quick" className="dashboard-surface border-y py-14">
      <div className="mx-auto max-w-7xl px-4">
        <HomeSectionTitle kicker="সেবা" title="দ্রুত প্রবেশ" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={
                item.href
                  ? item.href
                  : item.title === "ভর্তি"
                    ? "/admission"
                    : item.title === "নোটিশ"
                      ? "/notices"
                      : item.title === "ফলাফল"
                        ? "/results"
                        : "/contact-us"
              }
              className={`group rounded-2xl p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${item.colorClass}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:scale-110">
                <item.icon className="icon-motion h-6 w-6" />
              </span>
              <h3 className="mt-3 text-xl font-bold">{localized(item.title, item.titleEn)}</h3>
              <p className="mt-1 text-sm text-white/90">{localized(item.text, item.textEn)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                {localized(item.action, item.actionEn)}
                <ArrowRight className="icon-motion h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeFooter() {
  const { t, localized } = useLanguage();

  return (
    <footer id="contact" className="bg-topbar text-topbar-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 rounded-full bg-card p-1"
            />
            <div>
              <b className="block text-lg">{localized(SCHOOL.nameBn, SCHOOL.nameEn)}</b>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-75">
            {localized(SCHOOL.footerText, SCHOOL.footerTextEn)}
          </p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-4 inline-flex items-center gap-2 font-semibold text-accent"
          >
            <Facebook className="icon-motion h-4 w-4" aria-hidden="true" />{" "}
            {t("ফেসবুক গ্রুপে যোগ দিন")}
          </a>
        </div>
        <div>
          <h4 className="font-bold text-accent">{t("দ্রুত লিংক")}</h4>
          <ul className="mt-3 space-y-1.5 text-sm opacity-85">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="group inline-flex items-center gap-1.5">
                  <ArrowRight className="icon-motion h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {t(link.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-accent">{t("যোগাযোগ")}</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-85">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0" />{" "}
              <a href={SCHOOL.mapUrl} target="_blank" rel="noreferrer">
                {localized(SCHOOL.address, SCHOOL.addressEn)}, {t("পোস্ট কোড")} {t(SCHOOL.postCode)}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0" />{" "}
              <a href={`tel:${SCHOOL.phone}`}> {t(SCHOOL.phoneDisplay)}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0" />{" "}
              <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>
            </li>
            <li className="flex gap-2">
              <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />{" "}
              <a href={SCHOOL.website} target="_blank" rel="noreferrer">
                {SCHOOL.website.replace("https://www.", "")}
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs opacity-70">
            {t(
              "ফোন ও ওয়েবসাইটের তথ্য অনলাইন ডিরেক্টরি থেকে নেওয়া; যোগাযোগের আগে বিদ্যালয় থেকে যাচাই করুন।",
            )}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-accent">{t("প্রতিষ্ঠানের তথ্য")}</h4>
          <div className="mt-3 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5 px-4">
            <div className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="opacity-75">{t("ইআইআইএন নম্বর")}</span>
              <strong>{t("114398")}</strong>
            </div>
            <div className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="opacity-75">{t("প্রতিষ্ঠাকাল")}</span>
              <strong>{t("১৯৯৫")}</strong>
            </div>
            <div className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="opacity-75">{t("শিক্ষার স্তর")}</span>
              <strong>{t("মাধ্যমিক")}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-rule" />
      <div className="flex flex-col items-center justify-between gap-1 px-10 py-4 text-center text-xs opacity-70 sm:flex-row sm:gap-2">
        <p>{localized(SCHOOL.copyright, SCHOOL.copyrightEn)}</p>
        <span className="hidden sm:inline" aria-hidden="true">
          ·
        </span>
        <p>
          Developed by{" "}
          <a
            href="https://mahedi-portfolio-v2.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-accent underline-offset-4 hover:underline"
          >
            Mahedi Hasan
          </a>
        </p>
      </div>
    </footer>
  );
}



// ====old======>>

// import { createFileRoute } from "@tanstack/react-router";
// import { useEffect, useMemo, useState } from "react";
// import {
//   ArrowRight,
//   BarChart3,
//   Bell,
//   BookOpen,
//   BookOpenText,
//   Building2,
//   CalendarDays,
//   ChartNoAxesColumn,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Facebook,
//   FileText,
//   Filter,
//   Globe,
//   GraduationCap,
//   House,
//   IdCard,
//   Images,
//   Landmark,
//   Mail,
//   MapPin,
//   Megaphone,
//   Menu,
//   Phone,
//   Quote,
//   School,
//   Trophy,
//   User,
//   UsersRound,
//   X,
// } from "lucide-react";
// import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
// import { alumni as defaultAlumni } from "@/data/alumni";
// import { EVENT_CATEGORIES, events as defaultEvents } from "@/data/events";
// import { getIcon } from "@/data/icons";
// import { galleryPhotos as defaultGalleryPhotos } from "@/data/gallery";
// import { leaders as defaultLeaders } from "@/data/leaders";
// import { notices as defaultNotices } from "@/data/notices";
// import { parentReviews as defaultParentReviews } from "@/data/parents";
// import { defaultAchievementRows, defaultQuickRows, defaultResultRows } from "@/data/serializable";
// import { LINK_STRIP, MENU, SCHOOL, SCHOOL_SOURCES, FACEBOOK_URL, FOOTER_LINKS } from "@/data/site";
// import { slides as defaultSlides } from "@/data/slides";
// import type {
//   Achievement,
//   Alumnus,
//   EventItem,
//   GalleryPhoto,
//   Leader,
//   Notice,
//   ParentReview,
//   QuickItem,
//   ResultPoint,
//   Slide,
// } from "@/data/types";
// import { useCollection } from "@/lib/admin-store";
// import { ThemeToggle, useLanguage } from "@/lib/language";
// import { building, logo, treePlantingGroup } from "@/data/photos";

// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "আলোকদিয়া উচ্চ বিদ্যালয় | Alokdia High School, Madhupur, Tangail" },
//       {
//         name: "description",
//         content:
//           "আলোকদিয়া উচ্চ বিদ্যালয়, মধুপুর, টাঙ্গাইল — নোটিশ, ভর্তি, শিক্ষক, ফলাফল ও অনুষ্ঠানের খবর।",
//       },
//       { property: "og:title", content: "আলোকদিয়া উচ্চ বিদ্যালয়, মধুপুর, টাঙ্গাইল" },
//       {
//         property: "og:description",
//         content: "Alokdia High School official website — notices, admission, events and results.",
//       },
//     ],
//   }),
//   component: HomePage,
// });

// function HomePage() {
//   const { language } = useLanguage();
//   const notices = useCollection<Notice>("notices", defaultNotices);
//   const slides = useCollection<Slide>("slides", defaultSlides);
//   const leaders = useCollection<Leader>("leaders", defaultLeaders);
//   const alumni = useCollection<Alumnus>("alumni", defaultAlumni);
//   const parentReviews = useCollection<ParentReview>("parents", defaultParentReviews);
//   const events = useCollection<EventItem>("events", defaultEvents);
//   const galleryPhotos = useCollection<GalleryPhoto>("gallery", defaultGalleryPhotos);
//   const achievementRows = useCollection("achievements", defaultAchievementRows);
//   const quickRows = useCollection("quick", defaultQuickRows);
//   const resultRows = useCollection("results", defaultResultRows);

//   const achievementItems = useMemo<Achievement[]>(
//     () => achievementRows.map((item) => ({ ...item, icon: getIcon(item.icon) })),
//     [achievementRows],
//   );
//   const quickItems = useMemo<QuickItem[]>(
//     () => quickRows.map((item) => ({ ...item, icon: getIcon(item.icon) })),
//     [quickRows],
//   );
//   const results = useMemo(() => {
//     const output: Record<string, ResultPoint[]> = {};
//     resultRows.forEach((row) => {
//       const exam = language === "en" && row.examEn?.trim() ? row.examEn : row.exam;
//       (output[exam] ??= []).push({ year: row.year, percent: Number(row.percent) });
//     });
//     return output;
//   }, [resultRows, language]);

//   return (
//     <div id="top" className="min-h-screen bg-background font-sans">
//       <HomeTopBar />
//       <HomeSiteHeader leaders={leaders} />
//       <HomeNoticeTicker notices={notices} />
//       <HomeLinkStrip />

//       <main>
//         <HomeHeroSlider slides={slides} />
//         <HomeNoticeBoard notices={notices} />
//         <HomeLeaders leaders={leaders} />
//         <HomeWelcomeBanner />
//         <HomeAbout />
//         <HomeAlumni alumni={alumni} />
//         <HomeParentReviews reviews={parentReviews} />
//         <HomeNewsEvents events={events} categories={EVENT_CATEGORIES} />
//         <HomePhotoGallery photos={galleryPhotos} />
//         <HomeAchievements items={achievementItems} />
//         <HomeResultsChart results={results} />
//         <HomeQuickAccess items={quickItems} />
//       </main>

//       <HomeFooter />
//     </div>
//   );
// }

// function HomeTopBar() {
//   const { language, setLanguage, t } = useLanguage();

//   return (
//     <div className="site-topbar bg-topbar text-sm text-topbar-foreground">
//       <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
//         <div className="flex flex-wrap gap-4">
//           <a href={`tel:${SCHOOL.phone}`} className="flex items-center gap-1.5">
//             <Phone className="h-3.5 w-3.5 text-accent" /> {t(SCHOOL.phoneDisplay)}
//           </a>
//           <span className="flex items-center gap-1.5">
//             <Mail className="h-3.5 w-3.5 text-accent" /> {SCHOOL.email}
//           </span>
//         </div>
//         <div className="hidden gap-4 sm:flex">
//           <span className="flex items-center gap-1.5">
//             <Landmark className="h-3.5 w-3.5 text-accent" /> {t("স্থাপিত:")} {t(SCHOOL.established)}
//           </span>
//           <span className="flex items-center gap-1.5">
//             <IdCard className="h-3.5 w-3.5 text-accent" /> {t("ইআইআইএন:")} {t(SCHOOL.eiin)}
//           </span>
//         </div>
//         <div className="ml-auto flex items-center gap-2">
//           <div
//             className="flex items-center rounded-full border border-current/30 p-0.5"
//             aria-label={t("নির্বাচন করুন")}
//           >
//             <button
//               type="button"
//               onClick={() => setLanguage("bn")}
//               aria-pressed={language === "bn"}
//               className={`rounded-full px-2.5 py-1 text-xs font-semibold ${language === "bn" ? "bg-accent text-accent-foreground" : ""}`}
//             >
//               {t("বাংলা")}
//             </button>
//             <button
//               type="button"
//               onClick={() => setLanguage("en")}
//               aria-pressed={language === "en"}
//               className={`rounded-full px-2.5 py-1 text-xs font-semibold ${language === "en" ? "bg-accent text-accent-foreground" : ""}`}
//             >
//               {t("ইংরেজি")}
//             </button>
//           </div>
//           <ThemeToggle />
//         </div>
//       </div>
//     </div>
//   );
// }

// const MENU_ICONS = [House, School, BookOpen, Bell, UsersRound, Images, Trophy, Phone];

// function HomeSiteHeader({ leaders }: { leaders: Leader[] }) {
//   const [open, setOpen] = useState(false);
//   const { t, localized } = useLanguage();

//   return (
//     <>
//       <header className="site-header bg-header">
//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
//           <div className="flex items-center gap-4">
//             <img
//               src={logo}
//               alt={t("আলোকদিয়া উচ্চ বিদ্যালয় লোগো")}
//               width={80}
//               height={80}
//               className="h-16 w-16 transition-transform duration-500 hover:rotate-6 hover:scale-105 md:h-20 md:w-20"
//             />
//             <div>
//               <h1 className="text-xl font-bold leading-tight text-primary md:text-4xl">
//                 {localized(SCHOOL.nameBn, SCHOOL.nameEn)}
//               </h1>
//               <p className="text-sm font-medium text-secondary md:text-base">
//                 {localized(SCHOOL.motto, SCHOOL.mottoEn)}
//               </p>
//             </div>
//           </div>
//           <div className="hidden gap-2 lg:flex">
//             {leaders.map((leader) => (
//               <a
//                 key={leader.id}
//                 href="/#leaders"
//                 className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold shadow-sm hover:border-primary"
//               >
//                 <User className="h-4 w-4 text-primary" />
//                 {localized(leader.tag, leader.tagEn)}
//               </a>
//             ))}
//           </div>
//           <button
//             className="lg:hidden"
//             onClick={() => setOpen(!open)}
//             aria-label={t("মেনু")}
//             aria-expanded={open}
//           >
//             {open ? (
//               <X className="h-7 w-7 text-primary transition-transform duration-200" />
//             ) : (
//               <Menu className="h-7 w-7 text-primary transition-transform duration-200" />
//             )}
//           </button>
//         </div>
//       </header>

//       <nav className="site-navigation sticky top-0 z-30 bg-navbar text-topbar-foreground">
//         <ul
//           className={`mx-auto max-w-7xl justify-center gap-1 px-4 py-1 lg:flex ${open ? "flex flex-col" : "hidden"}`}
//         >
//           {MENU.map((item, index) => {
//             const ItemIcon = MENU_ICONS[index] ?? School;
//             return (
//               <li key={item.label} className="group relative">
//                 <a
//                   href={item.href ?? "/"}
//                   className="flex items-center gap-1 rounded-md px-3 py-2.5 text-[15px] font-medium hover:bg-primary-foreground/15"
//                 >
//                   <ItemIcon className="icon-motion h-4 w-4 shrink-0" />
//                   {t(item.label)}
//                   {item.sub && (
//                     <ChevronDown className="icon-motion h-4 w-4 group-hover:rotate-180" />
//                   )}
//                 </a>
//                 {item.sub && (
//                   <ul className="z-40 hidden min-w-52 rounded-md bg-card py-1 text-foreground shadow-card group-hover:block group-focus-within:block lg:absolute lg:left-0 lg:top-full">
//                     {item.sub.map((subItem) => (
//                       <li key={subItem.label}>
//                         <a
//                           href={subItem.href}
//                           className="group flex items-center gap-1 px-4 py-2 text-sm hover:bg-muted hover:text-primary"
//                         >
//                           <ChevronRight className="icon-motion h-3.5 w-3.5" aria-hidden="true" />
//                           {t(subItem.label)}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//         <div className="h-1 bg-rule" />
//       </nav>
//     </>
//   );
// }

// function HomeNoticeTicker({ notices }: { notices: Notice[] }) {
//   const { localized, t } = useLanguage();

//   return (
//     <div className="notice-ticker border-b bg-card">
//       <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
//         <span className="group flex shrink-0 items-center gap-1.5 rounded bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
//           <Megaphone className="icon-motion h-3.5 w-3.5" /> {t("নোটিশ")}
//         </span>
//         <div className="notice-ticker-track overflow-hidden whitespace-nowrap">
//           <div className="animate-marquee inline-block font-medium">
//             {notices.slice(0, 5).map((notice) => (
//               <span key={notice.id} className="mx-6">
//                 <ArrowRight className="mr-1 inline h-3.5 w-3.5 text-secondary" aria-hidden="true" />
//                 {localized(notice.title, notice.titleEn)}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const LINK_ICONS = [FileText, ChartNoAxesColumn, CalendarDays, Facebook];

// function HomeLinkStrip() {
//   const { t } = useLanguage();

//   return (
//     <div className="link-strip border-b bg-muted">
//       <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-1 px-4 py-2 text-sm font-semibold text-primary">
//         {LINK_STRIP.map((link, index) => {
//           const Icon = LINK_ICONS[index] ?? FileText;
//           return (
//             <a
//               key={link.label}
//               href={link.href}
//               className="group inline-flex items-center gap-1.5 hover:text-secondary"
//               {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
//             >
//               <Icon className="icon-motion h-4 w-4" aria-hidden="true" /> {t(link.label)}
//             </a>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function HomeHeroSlider({ slides }: { slides: Slide[] }) {
//   const [current, setCurrent] = useState(0);
//   const { t, localized } = useLanguage();
//   const go = (direction: number) =>
//     setCurrent((value) => (value + direction + slides.length) % slides.length);

//   useEffect(() => {
//     const timer = setInterval(() => setCurrent((value) => (value + 1) % slides.length), 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <section className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden bg-topbar sm:aspect-[21/9]">
//       {slides.map((slide, index) => (
//         <img
//           key={slide.id}
//           src={slide.image}
//           alt={localized(slide.title, slide.titleEn)}
//           width={1280}
//           height={720}
//           style={{ objectPosition: slide.position }}
//           className={`hero-slide absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === current ? "hero-slide-active opacity-100" : "opacity-0"}`}
//         />
//       ))}
//       <div className="absolute inset-0 flex items-end bg-gradient-to-r from-black/65 via-black/20 to-transparent px-6 pb-8 pt-16 sm:px-10 sm:pb-12">
//         <div className="mx-auto w-full max-w-7xl text-primary-foreground">
//           <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent sm:text-base">
//             {t("শিক্ষা, মূল্যবোধ ও ভবিষ্যৎ")}
//           </p>
//           <h2 className="mt-2 max-w-2xl text-2xl font-bold md:text-4xl">
//             {slides[current] ? localized(slides[current].title, slides[current].titleEn) : ""}
//           </h2>
//           <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
//             {t("আলোকদিয়া উচ্চ বিদ্যালয়ে শেখা, বিকাশ ও এগিয়ে চলার একসঙ্গে পথচলা।")}
//           </p>
//           <a
//             href="/admission"
//             className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-bold text-accent-foreground shadow-lg transition hover:-translate-y-0.5"
//           >
//             {t("ভর্তি সম্পর্কে জানুন")} <ArrowRight className="h-4 w-4" />
//           </a>
//         </div>
//       </div>
//       <button
//         onClick={() => go(-1)}
//         aria-label={t("আগের স্লাইড")}
//         className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/80 text-primary hover:bg-card"
//       >
//         <ChevronLeft className="icon-motion" />
//       </button>
//       <button
//         onClick={() => go(1)}
//         aria-label={t("পরের স্লাইড")}
//         className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/80 text-primary hover:bg-card"
//       >
//         <ChevronRight className="icon-motion" />
//       </button>
//     </section>
//   );
// }

// function HomeSectionTitle({
//   kicker,
//   title,
//   action,
//   href = "/",
// }: {
//   kicker?: string;
//   title: string;
//   action?: string;
//   href?: string;
// }) {
//   const { t } = useLanguage();

//   return (
//     <div className="flex items-end justify-between gap-4">
//       <div>
//         {kicker && (
//           <p className="flex items-center gap-2 text-sm font-bold text-secondary">
//             <span className="h-0.5 w-8 bg-secondary" /> {t(kicker)}
//           </p>
//         )}
//         <h2 className="mt-1 text-3xl font-bold text-primary">{t(title)}</h2>
//         <div className="mt-2 h-1 w-16 rounded bg-rule" />
//       </div>
//       {action && (
//         <a
//           href={href}
//           className="group inline-flex items-center gap-2 rounded-full border border-primary px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
//         >
//           {t(action)} <ArrowRight className="icon-motion h-4 w-4" aria-hidden="true" />
//         </a>
//       )}
//     </div>
//   );
// }

// const NOTICE_TONES = ["bg-info", "bg-primary", "bg-accent text-accent-foreground", "bg-secondary"];

// function HomeNoticeBoard({ notices }: { notices: Notice[] }) {
//   const { t, localized } = useLanguage();

//   return (
//     <section id="notices" className="mx-auto max-w-7xl px-4 py-14">
//       <HomeSectionTitle title="নোটিশ বোর্ড" action="সব দেখুন" href="/notices" />
//       <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
//         {notices.map((notice, index) => (
//           <li key={notice.id} className="border-b">
//             <a href={`/notices/${notice.id}`} className="group flex items-center gap-4 py-4">
//               <span
//                 className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg text-primary-foreground ${NOTICE_TONES[index % NOTICE_TONES.length]}`}
//               >
//                 <span className="text-center leading-none">
//                   <b className="block text-xl">{t(notice.day)}</b>
//                   <span className="text-[10px] uppercase">{t(notice.month)}</span>
//                 </span>
//               </span>
//               <span className="flex-1">
//                 <span className="block font-semibold group-hover:text-primary">
//                   {localized(notice.title, notice.titleEn)}
//                 </span>
//                 <span className="flex items-center gap-1 text-xs text-muted-foreground">
//                   <CalendarDays className="icon-motion h-3 w-3" /> {t(notice.day)} {t(notice.month)}{" "}
//                   {t("2026")}
//                 </span>
//               </span>
//               <ChevronRight className="icon-motion h-4 w-4 text-muted-foreground" />
//             </a>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// function HomeLeaders({ leaders }: { leaders: Leader[] }) {
//   const { t, localized } = useLanguage();

//   return (
//     <section id="leaders" className="bg-card py-14">
//       <div className="mx-auto max-w-7xl px-4">
//         <HomeSectionTitle kicker="তথ্য যাচাই" title="প্রশাসনিক তথ্য" />
//         <div className="mt-8 grid gap-6 md:grid-cols-2">
//           {leaders.map((leader) => (
//             <article
//               key={leader.id}
//               className={`rounded-2xl border border-t-4 bg-background p-6 text-center shadow-card ${leader.borderClass}`}
//             >
//               <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-muted">
//                 <User className="h-12 w-12 text-muted-foreground" />
//               </div>
//               <p className="mt-4 text-sm font-bold text-secondary">
//                 {localized(leader.tag, leader.tagEn)}
//               </p>
//               <h3 className="text-xl font-bold">{localized(leader.name, leader.nameEn)}</h3>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 {localized(leader.text, leader.textEn)}
//               </p>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function HomeWelcomeBanner() {
//   const { t, localized } = useLanguage();

//   return (
//     <section
//       id="welcome"
//       className="relative overflow-hidden py-24 text-center text-primary-foreground"
//     >
//       <img
//         src={treePlantingGroup}
//         alt=""
//         loading="lazy"
//         width={1280}
//         height={720}
//         className="absolute inset-0 h-full w-full object-cover"
//       />
//       <div className="absolute inset-0 bg-topbar/75" />
//       <div className="relative mx-auto max-w-3xl px-4">
//         <p className="text-lg opacity-90">{t("স্বাগতম")}</p>
//         <h2 className="mt-1 text-3xl font-bold md:text-5xl">
//           {localized(SCHOOL.nameBn, SCHOOL.nameEn)}
//         </h2>
//         <p className="mt-3 text-lg text-accent">{localized(SCHOOL.motto, SCHOOL.mottoEn)}</p>
//         <a
//           href="#about"
//           className="mt-7 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-secondary-foreground hover:opacity-90"
//         >
//           {t("আমাদের গল্প জানুন")} <ArrowRight className="h-4 w-4" />
//         </a>
//       </div>
//     </section>
//   );
// }

// function HomeAbout() {
//   const { t, localized } = useLanguage();
//   const facts = [
//     { icon: CalendarDays, label: "প্রতিষ্ঠাকাল", value: `${SCHOOL.established} সাল` },
//     { icon: IdCard, label: "ইআইআইএন নম্বর", value: SCHOOL.eiin },
//     { icon: GraduationCap, label: "শিক্ষার স্তর", value: "মাধ্যমিক" },
//     { icon: Building2, label: "ব্যবস্থাপনা", value: "বেসরকারি" },
//     { icon: School, label: "শিক্ষা বোর্ড", value: "ঢাকা" },
//     { icon: MapPin, label: "অবস্থান", value: "আলোকদিয়া, মধুপুর, টাঙ্গাইল" },
//   ];

//   return (
//     <section
//       id="about"
//       className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2"
//     >
//       <img
//         src={building}
//         alt={t("আলোকদিয়ার উচ্চ বিদ্যালয়ের ভবন")}
//         loading="lazy"
//         width={1280}
//         height={720}
//         className="aspect-video w-full rounded-2xl object-cover shadow-card"
//       />
//       <div>
//         <HomeSectionTitle kicker="আমাদের সম্পর্কে" title="আলোকদিয়ায় স্বাগতম" />
//         <p className="mt-5 text-muted-foreground">{localized(SCHOOL.about, SCHOOL.aboutEn)}</p>
//         <h3 className="mt-6 font-bold text-primary">{t("প্রতিষ্ঠানের পরিচিতি")}</h3>
//         <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
//           {facts.map(({ icon: Icon, label, value }) => (
//             <div
//               key={label}
//               className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50"
//             >
//               <span className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
//                 <Icon className="icon-motion h-5 w-5" aria-hidden="true" />
//               </span>
//               <dt className="text-sm text-muted-foreground">{t(label)}</dt>
//               <dd className="mt-1 font-semibold">{t(value)}</dd>
//             </div>
//           ))}
//         </dl>
//         <div className="mt-5 rounded-xl border border-secondary/30 bg-secondary/5 p-4 text-sm">
//           <h3 className="font-bold text-primary">{t("যাচাই-সংক্রান্ত নোট")}</h3>
//           <p className="mt-1 text-muted-foreground">
//             {t(
//               "বর্তমান প্রধান শিক্ষক, প্রতিষ্ঠাতা, ম্যানেজিং কমিটি, শিক্ষক-শিক্ষার্থী সংখ্যা এবং সাম্প্রতিক এসএসসি ফলাফলের নির্ভরযোগ্য হালনাগাদ তথ্য পাওয়া যায়নি। অনলাইন ডিরেক্টরিতে এমপিওভুক্তির উল্লেখ থাকলেও তা বিদ্যালয় থেকে নিশ্চিত করা প্রয়োজন।",
//             )}
//           </p>
//           <p className="mt-2 text-muted-foreground">
//             {t(
//               "২০১১ সালের একটি প্রতিবেদনে তৎকালীন প্রধান শিক্ষক হিসেবে মোঃ আবুল কালাম আজাদের নাম উল্লেখ আছে; এটি বর্তমান দায়িত্বের নিশ্চয়তা নয়।",
//             )}
//           </p>
//         </div>
//         <p className="mt-4 text-xs text-muted-foreground">
//           {t("তথ্যসূত্র:")}{" "}
//           {SCHOOL_SOURCES.map((source, index) => (
//             <span key={source.href}>
//               {index > 0 && " · "}
//               <a
//                 href={source.href}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="underline underline-offset-4"
//               >
//                 {t(source.label)}
//               </a>
//             </span>
//           ))}
//         </p>
//         <p className="mt-2 text-xs text-muted-foreground">
//           {t(
//             "যোগাযোগের অনলাইন তালিকায় নম্বরের অমিল রয়েছে; ফোন ও ওয়েবসাইট আগে বিদ্যালয় থেকে যাচাই করুন।",
//           )}
//         </p>
//         <div className="mt-6 flex flex-wrap gap-3">
//           <a
//             href="#welcome"
//             className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
//           >
//             {t("আরও জানুন")} <ArrowRight className="icon-motion h-4 w-4" aria-hidden="true" />
//           </a>
//           <a
//             href={SCHOOL.mapUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="group inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 font-semibold text-primary"
//           >
//             <MapPin className="icon-motion h-4 w-4" aria-hidden="true" />
//             {t("মানচিত্রে দেখুন")}
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// function HomeAlumni({ alumni }: { alumni: Alumnus[] }) {
//   const { t, localized } = useLanguage();

//   return (
//     <section className="bg-card py-14">
//       <div className="mx-auto max-w-7xl px-4">
//         <HomeSectionTitle kicker="গর্বিত প্রাক্তন শিক্ষার্থী" title="আলোকদিয়ার তারকারা" />
//         <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-3">
//           {alumni.map((item) => (
//             <article
//               key={item.id}
//               className="w-56 shrink-0 snap-start rounded-2xl border bg-background p-5 text-center shadow-card"
//             >
//               <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-muted">
//                 <User className="h-10 w-10 text-muted-foreground" />
//               </div>
//               <h3 className="mt-3 font-bold">
//                 {localized(item.name, item.nameEn).replace(/ \d+$/, "")}{" "}
//                 {localized(item.name, item.nameEn).match(/ \d+$/)?.[0] ?? ""}
//               </h3>
//               <p className="text-sm text-muted-foreground">
//                 {localized(item.university, item.universityEn)}
//               </p>
//               <p className="mt-1 text-xs font-semibold text-secondary">
//                 {localized("ব্যাচ", "Batch")}{" "}
//                 {localized(item.batch, item.batchEn).match(/\d+$/)?.[0] ?? ""}
//               </p>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function HomeParentReviews({ reviews }: { reviews: ParentReview[] }) {
//   const { localized } = useLanguage();

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-14">
//       <HomeSectionTitle kicker="মতামত" title="অভিভাবকেরা যা বলেন" />
//       <div className="mt-8 grid gap-6 md:grid-cols-2">
//         {reviews.map((review) => (
//           <figure key={review.id} className="rounded-2xl border bg-card p-6 shadow-card">
//             <Quote className="h-8 w-8 text-accent" />
//             <blockquote className="mt-2 text-lg">
//               {localized(review.quote, review.quoteEn)}
//             </blockquote>
//             <figcaption className="mt-4 flex items-center gap-3">
//               <img src={logo} alt="" width={40} height={40} loading="lazy" className="h-10 w-10" />
//               <span>
//                 <b className="block">{localized(review.name, review.nameEn)}</b>
//                 <span className="text-sm text-muted-foreground">
//                   {localized(review.role, review.roleEn)}
//                 </span>
//               </span>
//             </figcaption>
//           </figure>
//         ))}
//       </div>
//     </section>
//   );
// }

// function HomeNewsEvents({ events, categories }: { events: EventItem[]; categories: string[] }) {
//   const [category, setCategory] = useState("সব");
//   const { t, localized } = useLanguage();
//   const shown = events.filter((event) => category === "সব" || event.category === category);

//   return (
//     <section className="bg-card py-14">
//       <div className="mx-auto max-w-7xl px-4">
//         <HomeSectionTitle
//           kicker="ক্যাম্পাস লাইফ"
//           title="সংবাদ ও অনুষ্ঠান"
//           action="সব দেখুন"
//           href="/news-events"
//         />
//         <div
//           className="mt-6 flex flex-wrap items-center gap-2"
//           role="group"
//           aria-label={t("বিভাগ")}
//         >
//           <Filter className="h-4 w-4 text-secondary" aria-hidden="true" />
//           {categories.map((item) => (
//             <button
//               key={item}
//               onClick={() => setCategory(item)}
//               aria-pressed={category === item}
//               className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${category === item ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary"}`}
//             >
//               {t(item)}
//             </button>
//           ))}
//         </div>
//         <div className="mt-6 grid gap-6 md:grid-cols-3">
//           {shown.map((event) => (
//             <article
//               key={event.id}
//               className="overflow-hidden rounded-2xl border bg-background shadow-card"
//             >
//               <div className="relative">
//                 <img
//                   src={event.image}
//                   alt={localized(event.title, event.titleEn)}
//                   loading="lazy"
//                   width={1280}
//                   height={720}
//                   className="aspect-video w-full object-cover"
//                 />
//                 {event.day && (
//                   <span className="absolute left-3 top-3 rounded-lg bg-card px-2 py-1 text-center leading-none shadow">
//                     <CalendarDays
//                       className="mx-auto mb-1 h-3 w-3 text-primary"
//                       aria-hidden="true"
//                     />
//                     <b className="block text-lg text-primary">{t(event.day)}</b>
//                     <span className="text-[10px] uppercase">{t(event.month ?? "")}</span>
//                   </span>
//                 )}
//                 <span className="absolute right-3 top-3 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
//                   {localized(event.category, event.categoryEn)}
//                 </span>
//               </div>
//               <div className="p-5">
//                 <h3 className="font-bold">{localized(event.title, event.titleEn)}</h3>
//                 <p className="mt-2 text-sm text-muted-foreground">
//                   {localized(event.text, event.textEn)}
//                 </p>
//                 <a
//                   href={`/news-events/${event.id}`}
//                   className="group mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
//                 >
//                   {t("আরও পড়ুন")} <ArrowRight className="icon-motion h-4 w-4" aria-hidden="true" />
//                 </a>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function HomePhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
//   const { t, localized } = useLanguage();
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const activePhoto = activeIndex === null ? null : photos[activeIndex];
//   const showPrevious = () =>
//     setActiveIndex((index) =>
//       index === null ? null : (index - 1 + photos.length) % photos.length,
//     );
//   const showNext = () =>
//     setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length));

//   return (
//     <>
//       <section id="gallery" className="mx-auto max-w-7xl px-4 py-14">
//         <HomeSectionTitle
//           kicker="স্মৃতির অ্যালবাম"
//           title="ফটো গ্যালারি"
//           action="সব দেখুন"
//           href="/gallery"
//         />
//         <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
//           {photos.map((photo, index) => (
//             <figure
//               key={photo.id}
//               className="group relative overflow-hidden rounded-xl shadow-card"
//             >
//               <button
//                 type="button"
//                 onClick={() => setActiveIndex(index)}
//                 aria-label={`${t("ছবি দেখুন")}: ${localized(photo.caption, photo.captionEn)}`}
//                 className="relative block w-full cursor-zoom-in text-left"
//               >
//                 <img
//                   src={photo.image}
//                   alt={localized(photo.caption, photo.captionEn)}
//                   loading="lazy"
//                   width={640}
//                   height={480}
//                   className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8 text-left text-xs font-semibold text-white">
//                   {localized(photo.caption, photo.captionEn)}
//                 </span>
//               </button>
//             </figure>
//           ))}
//         </div>
//       </section>
//       <Dialog
//         open={activePhoto !== null}
//         onOpenChange={(open) => {
//           if (!open) setActiveIndex(null);
//         }}
//       >
//         <DialogContent
//           closeLabel={t("বন্ধ করুন")}
//           className="w-[calc(100%-2rem)] max-w-5xl border-0 bg-black p-3 text-white sm:p-5"
//         >
//           {activePhoto && activeIndex !== null && (
//             <>
//               <DialogTitle className="sr-only">
//                 {localized(activePhoto.caption, activePhoto.captionEn)}
//               </DialogTitle>
//               <DialogDescription className="sr-only">
//                 {t("ছবি")} {t(String(activeIndex + 1))} {t("এর মধ্যে")} {t(String(photos.length))}
//               </DialogDescription>
//               <div className="relative flex min-h-48 items-center justify-center">
//                 <img
//                   src={activePhoto.image}
//                   alt={localized(activePhoto.caption, activePhoto.captionEn)}
//                   className="max-h-[75vh] max-w-full object-contain"
//                 />
//                 {photos.length > 1 && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={showPrevious}
//                       aria-label={t("আগের ছবি")}
//                       className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white hover:bg-black/85"
//                     >
//                       <ChevronLeft aria-hidden="true" />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={showNext}
//                       aria-label={t("পরের ছবি")}
//                       className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white hover:bg-black/85"
//                     >
//                       <ChevronRight aria-hidden="true" />
//                     </button>
//                   </>
//                 )}
//               </div>
//               <p className="text-center text-sm font-medium text-white">
//                 {localized(activePhoto.caption, activePhoto.captionEn)}
//                 <span className="ml-2 text-white/70">
//                   ({t(String(activeIndex + 1))}/{t(String(photos.length))})
//                 </span>
//               </p>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// function HomeAchievements({ items }: { items: Achievement[] }) {
//   const { t, localized } = useLanguage();

//   return (
//     <section className="bg-navbar py-14 text-topbar-foreground">
//       <div className="mx-auto max-w-7xl px-4">
//         <p className="text-center text-sm font-semibold tracking-widest text-accent">
//           প্রতিষ্ঠানের সংক্ষিপ্ত পরিচিতি
//         </p>
//         <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
//           {items.map((item) => (
//             <div key={item.id} className="rounded-2xl bg-primary-foreground/10 p-6 text-center">
//               <item.icon className="mx-auto h-8 w-8 text-accent" />
//               <div className="mt-3 text-3xl font-bold">{t(item.number)}</div>
//               <div className="text-sm opacity-85">{localized(item.label, item.labelEn)}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function HomeResultsChart({ results }: { results: Record<string, ResultPoint[]> }) {
//   const { t } = useLanguage();
//   const exams = Object.keys(results);
//   const [selected, setExam] = useState("");
//   const exam = results[selected] ? selected : (exams[0] ?? "");
//   const points = results[exam] ?? [];
//   const schoolFacts = [
//     { icon: IdCard, label: "ইআইআইএন নম্বর", value: SCHOOL.eiin },
//     { icon: CalendarDays, label: "প্রতিষ্ঠাকাল", value: SCHOOL.established },
//     { icon: GraduationCap, label: "শিক্ষার স্তর", value: "মাধ্যমিক" },
//   ];

//   return (
//     <section id="results" className="dashboard-surface py-14">
//       <div className="mx-auto max-w-7xl px-4">
//         <HomeSectionTitle kicker="এক নজরে" title="ফলাফল ও পরিসংখ্যান" />
//         <div className="mt-8 grid gap-5 lg:grid-cols-3">
//           <aside className="dashboard-panel p-5">
//             <h3 className="flex items-center gap-2 text-lg font-bold">
//               <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
//                 <IdCard className="h-5 w-5" />
//               </span>
//               {t("প্রতিষ্ঠানের পরিচিতি")}
//             </h3>
//             <div className="mt-4 divide-y">
//               {schoolFacts.map(({ icon: Icon, label, value }) => (
//                 <div key={label} className="flex items-center gap-3 py-4">
//                   <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-primary">
//                     <Icon className="h-5 w-5" />
//                   </span>
//                   <span className="flex-1 text-sm text-muted-foreground">{t(label)}</span>
//                   <strong className="text-base">{t(value)}</strong>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted p-4 text-sm">
//               <GraduationCap className="h-5 w-5 shrink-0 text-primary" />
//               <span>{t("ঢাকা শিক্ষা বোর্ড")}</span>
//             </div>
//           </aside>
//           <div className="dashboard-panel dashboard-panel-accent p-5 sm:p-6 lg:col-span-2">
//             <div className="flex flex-wrap items-center justify-between gap-3">
//               <h3 className="flex items-center gap-2 text-lg font-bold">
//                 <BarChart3 className="h-5 w-5 text-primary" />
//                 {t("এসএসসি ফলাফল")}
//               </h3>
//               {exams.length > 0 && (
//                 <div className="flex rounded-xl bg-muted p-1">
//                   {exams.map((key) => (
//                     <button
//                       key={key}
//                       onClick={() => setExam(key)}
//                       aria-pressed={exam === key}
//                       className={`rounded-lg px-4 py-2 text-sm font-semibold ${exam === key ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}
//                     >
//                       {t(key)}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {points.length > 0 ? (
//               <div className="mt-6 flex h-64 items-end gap-4 rounded-xl bg-muted/50 p-5">
//                 {points.map((point) => (
//                   <div
//                     key={point.year}
//                     className="flex h-full flex-1 flex-col items-center justify-end gap-2"
//                   >
//                     <strong className="text-sm text-primary">{t(`${point.percent}%`)}</strong>
//                     <div
//                       className="w-full max-w-16 rounded-t-md bg-primary"
//                       style={{ height: `${point.percent * 0.8}%` }}
//                     />
//                     <span className="text-xs text-muted-foreground">{t(point.year)}</span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 p-6 text-center">
//                 <BarChart3 className="h-9 w-9 text-primary/70" />
//                 <p className="mt-3 font-semibold">
//                   {t("যাচাইকৃত ফলাফলের পরিসংখ্যান এখনো যোগ করা হয়নি।")}
//                 </p>
//                 <p className="mt-2 max-w-xl text-sm text-muted-foreground">
//                   {t(
//                     "ঢাকা বোর্ডের ফলাফল পোর্টালে পরীক্ষা হিসেবে এসএসসি, বোর্ড হিসেবে ঢাকা এবং ফলাফলের ধরন হিসেবে প্রতিষ্ঠানভিত্তিক ফলাফল নির্বাচন করে ইআইআইএন নম্বর ১১৪৩৯৮ লিখুন।",
//                   )}
//                 </p>
//                 <a
//                   href="https://eboardresults.com/v2/home?lang=bn"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
//                 >
//                   {t("ফলাফল পোর্টালে যান")}
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function HomeQuickAccess({ items }: { items: QuickItem[] }) {
//   const { localized } = useLanguage();

//   return (
//     <section id="quick" className="dashboard-surface border-y py-14">
//       <div className="mx-auto max-w-7xl px-4">
//         <HomeSectionTitle kicker="সেবা" title="দ্রুত প্রবেশ" />
//         <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {items.map((item) => (
//             <a
//               key={item.id}
//               href={
//                 item.href
//                   ? item.href
//                   : item.title === "ভর্তি"
//                     ? "/admission"
//                     : item.title === "নোটিশ"
//                       ? "/notices"
//                       : item.title === "ফলাফল"
//                         ? "/results"
//                         : "/contact-us"
//               }
//               className={`group rounded-2xl p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${item.colorClass}`}
//             >
//               <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:scale-110">
//                 <item.icon className="icon-motion h-6 w-6" />
//               </span>
//               <h3 className="mt-3 text-xl font-bold">{localized(item.title, item.titleEn)}</h3>
//               <p className="mt-1 text-sm text-white/90">{localized(item.text, item.textEn)}</p>
//               <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
//                 {localized(item.action, item.actionEn)}
//                 <ArrowRight className="icon-motion h-4 w-4" />
//               </span>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function HomeFooter() {
//   const { t, localized } = useLanguage();

//   return (
//     <footer id="contact" className="bg-topbar text-topbar-foreground">
//       <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
//         <div>
//           <div className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt=""
//               width={56}
//               height={56}
//               loading="lazy"
//               className="h-14 w-14 rounded-full bg-card p-1"
//             />
//             <div>
//               <b className="block text-lg">{localized(SCHOOL.nameBn, SCHOOL.nameEn)}</b>
//             </div>
//           </div>
//           <p className="mt-4 text-sm opacity-75">
//             {localized(SCHOOL.footerText, SCHOOL.footerTextEn)}
//           </p>
//           <a
//             href={FACEBOOK_URL}
//             target="_blank"
//             rel="noreferrer"
//             className="group mt-4 inline-flex items-center gap-2 font-semibold text-accent"
//           >
//             <Facebook className="icon-motion h-4 w-4" aria-hidden="true" />{" "}
//             {t("ফেসবুক গ্রুপে যোগ দিন")}
//           </a>
//         </div>
//         <div>
//           <h4 className="font-bold text-accent">{t("দ্রুত লিংক")}</h4>
//           <ul className="mt-3 space-y-1.5 text-sm opacity-85">
//             {FOOTER_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a href={link.href} className="group inline-flex items-center gap-1.5">
//                   <ArrowRight className="icon-motion h-3.5 w-3.5 text-accent" aria-hidden="true" />
//                   {t(link.label)}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-bold text-accent">{t("যোগাযোগ")}</h4>
//           <ul className="mt-3 space-y-2 text-sm opacity-85">
//             <li className="flex gap-2">
//               <MapPin className="h-4 w-4 shrink-0" />{" "}
//               <a href={SCHOOL.mapUrl} target="_blank" rel="noreferrer">
//                 {localized(SCHOOL.address, SCHOOL.addressEn)}, {t("পোস্ট কোড")} {t(SCHOOL.postCode)}
//               </a>
//             </li>
//             <li className="flex gap-2">
//               <Phone className="h-4 w-4 shrink-0" />{" "}
//               <a href={`tel:${SCHOOL.phone}`}> {t(SCHOOL.phoneDisplay)}</a>
//             </li>
//             <li className="flex gap-2">
//               <Mail className="h-4 w-4 shrink-0" />{" "}
//               <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>
//             </li>
//             <li className="flex gap-2">
//               <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />{" "}
//               <a href={SCHOOL.website} target="_blank" rel="noreferrer">
//                 {SCHOOL.website.replace("https://www.", "")}
//               </a>
//             </li>
//           </ul>
//           <p className="mt-3 text-xs opacity-70">
//             {t(
//               "ফোন ও ওয়েবসাইটের তথ্য অনলাইন ডিরেক্টরি থেকে নেওয়া; যোগাযোগের আগে বিদ্যালয় থেকে যাচাই করুন।",
//             )}
//           </p>
//         </div>
//         <div>
//           <h4 className="font-bold text-accent">{t("প্রতিষ্ঠানের তথ্য")}</h4>
//           <div className="mt-3 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5 px-4">
//             <div className="flex items-center justify-between gap-3 py-3 text-sm">
//               <span className="opacity-75">{t("ইআইআইএন নম্বর")}</span>
//               <strong>{t("114398")}</strong>
//             </div>
//             <div className="flex items-center justify-between gap-3 py-3 text-sm">
//               <span className="opacity-75">{t("প্রতিষ্ঠাকাল")}</span>
//               <strong>{t("১৯৯৫")}</strong>
//             </div>
//             <div className="flex items-center justify-between gap-3 py-3 text-sm">
//               <span className="opacity-75">{t("শিক্ষার স্তর")}</span>
//               <strong>{t("মাধ্যমিক")}</strong>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="h-1 bg-rule" />
//       <div className="flex flex-col items-center justify-between gap-1 px-10 py-4 text-center text-xs opacity-70 sm:flex-row sm:gap-2">
//         <p>{localized(SCHOOL.copyright, SCHOOL.copyrightEn)}</p>
//         <span className="hidden sm:inline" aria-hidden="true">
//           ·
//         </span>
//         <p>
//           Developed by{" "}
//           <a
//             href="https://mahedi-portfolio-v2.vercel.app"
//             target="_blank"
//             rel="noreferrer"
//             className="font-semibold text-accent underline-offset-4 hover:underline"
//           >
//             Mahedi
//           </a>
//         </p>
//       </div>
//     </footer>
//   );
// }
