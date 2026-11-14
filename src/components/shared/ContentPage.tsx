import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { LinkStrip } from "@/components/layout/LinkStrip";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { leaders as defaultLeaders } from "@/data/leaders";
import { useCollection } from "@/lib/admin-store";
import { useLanguage } from "@/lib/language";

type Props = {
  title: string;
  titleEn: string;
  intro: string;
  introEn: string;
  children: ReactNode;
};

export function ContentPage({ title, titleEn, intro, introEn, children }: Props) {
  const leaders = useCollection("leaders", defaultLeaders);
  const { t, localized } = useLanguage();

  return (
    <div id="top" className="min-h-screen bg-background font-sans">
      <TopBar />
      <SiteHeader leaders={leaders} />
      <LinkStrip />
      <main>
        <section className="relative overflow-hidden bg-navbar px-4 py-14 text-topbar-foreground sm:py-20">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-accent">{t("আলোকদিয়া উচ্চ বিদ্যালয়")}</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{localized(title, titleEn)}</h1>
            <p className="mt-3 max-w-2xl text-base opacity-85">{localized(intro, introEn)}</p>
            <div className="mt-5 flex items-center gap-2 text-sm opacity-75">
              <a href="/">{t("হোম")}</a>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <span>{localized(title, titleEn)}</span>
            </div>
          </div>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}
