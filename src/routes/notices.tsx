import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import { ContentPage } from "@/components/shared/ContentPage";
import { useCollection } from "@/lib/admin-store";
import { notices as defaultNotices } from "@/data/notices";
import type { Notice } from "@/data/types";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/notices")({
  head: () => ({ meta: [{ title: "সকল নোটিশ | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: NoticesPage,
});

function NoticesPage() {
  const notices = useCollection<Notice>("notices", defaultNotices);
  const { t, localized } = useLanguage();

  return (
    <ContentPage
      title="সকল নোটিশ"
      titleEn="All Notices"
      intro="বিদ্যালয়ের প্রকাশিত নোটিশগুলো দেখুন।"
      introEn="Browse the notices published by the school."
    >
      <section className="dashboard-surface px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          {notices.length ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {notices.map((notice) => (
                <li key={notice.id}>
                  <Link
                    to="/notices/$id"
                    params={{ id: String(notice.id) }}
                    className="dashboard-panel group flex h-full items-center gap-4 p-5 hover:border-primary"
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold group-hover:text-primary">
                        {localized(notice.title, notice.titleEn)}
                      </span>
                      <span className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                        {t(notice.day)} {t(notice.month)}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dashboard-panel p-8 text-center text-muted-foreground">
              {t("এখন কোনো নোটিশ প্রকাশিত নেই।")}
            </p>
          )}
        </div>
      </section>
    </ContentPage>
  );
}
