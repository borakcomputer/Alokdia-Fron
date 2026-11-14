// হোমপেজের বড় ছবির স্লাইডার (৫ সেকেন্ড পর পর নিজে বদলায়)
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { Slide } from "@/data/types";
import { useLanguage } from "@/lib/language";

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const { t, localized } = useLanguage();

  // d = -1 (আগের) অথবা +1 (পরের)
  const go = (d: number) => setCurrent((v) => (v + d + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden bg-topbar sm:aspect-[21/9]">
      {slides.map((s, k) => (
        <img
          key={s.id}
          src={s.image}
          alt={localized(s.title, s.titleEn)}
          width={1280}
          height={720}
          style={{ objectPosition: s.position }}
          className={`hero-slide absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${k === current ? "hero-slide-active opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 flex items-end bg-gradient-to-r from-black/65 via-black/20 to-transparent px-6 pb-8 pt-16 sm:px-10 sm:pb-12">
        <div className="mx-auto w-full max-w-7xl text-primary-foreground">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent sm:text-base">
            {t("শিক্ষা, মূল্যবোধ ও ভবিষ্যৎ")}
          </p>
          <h2 className="mt-2 max-w-2xl text-2xl font-bold md:text-4xl">
            {slides[current] ? localized(slides[current].title, slides[current].titleEn) : ""}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
            {t("আলোকদিয়া উচ্চ বিদ্যালয়ে শেখা, বিকাশ ও এগিয়ে চলার একসঙ্গে পথচলা।")}
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
