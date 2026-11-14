// লোগো + স্কুলের নাম + মেনু বার।
// মোবাইলের মেনু খোলা/বন্ধ (open) এখানেই সামলানো হয়।
// দুটো আলাদা <header> ও <nav> ফ্র্যাগমেন্টে রাখা হয়েছে যাতে nav "sticky" থাকে।
import { useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  House,
  Images,
  Menu,
  Phone,
  School,
  Trophy,
  User,
  UsersRound,
  X,
} from "lucide-react";
import { SCHOOL, MENU } from "@/data/site";
import { logo } from "@/data/photos";
import type { Leader } from "@/data/types";
import { useLanguage } from "@/lib/language";

const MENU_ICONS = [House, School, BookOpen, Bell, UsersRound, Images, Trophy, Phone];

export function SiteHeader({ leaders }: { leaders: Leader[] }) {
  const [open, setOpen] = useState(false);
  const { t, localized } = useLanguage();

  return (
    <>
      {/* লোগো ও নাম */}
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
            {leaders.map((l) => (
              <a
                key={l.id}
                href="/#leaders"
                className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold shadow-sm hover:border-primary"
              >
                <User className="h-4 w-4 text-primary" /> {localized(l.tag, l.tagEn)}
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

      {/* মেনু বার (ড্রপডাউনসহ) */}
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
                    {item.sub.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          className="group flex items-center gap-1 px-4 py-2 text-sm hover:bg-muted hover:text-primary"
                        >
                          <ChevronRight className="icon-motion h-3.5 w-3.5" aria-hidden="true" />
                          {t(s.label)}
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
