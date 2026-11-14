import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, FileText } from "lucide-react";
import { ContentPage } from "@/components/shared/ContentPage";
import { notices as defaultNotices } from "@/data/notices";
import type { Notice } from "@/data/types";
import { useCollection } from "@/lib/admin-store";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/notices/$id")({
  head: () => ({ meta: [{ title: "নোটিশ | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: NoticeDetailPage,
});

function NoticeDetailPage() {
  const { id } = Route.useParams();
  const notices = useCollection<Notice>("notices", defaultNotices);
  const { t, localized } = useLanguage();
  const notice = notices.find((item) => item.id === Number(id));

  return (
    <ContentPage
      title={notice ? localized(notice.title, notice.titleEn) : "নোটিশ পাওয়া যায়নি"}
      titleEn={notice?.titleEn ?? "Notice Not Found"}
      intro="বিদ্যালয়ের নোটিশ"
      introEn="School notice"
    >
      {notice ? (
        <section className="dashboard-surface px-4 py-12 sm:py-16">
          <article className="dashboard-panel mx-auto max-w-4xl p-6 sm:p-10">
            <p className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {t(notice.day)} {t(notice.month)}
            </p>
            <div className="mt-6 flex items-start gap-4 rounded-xl border border-dashed p-5">
              <FileText className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-muted-foreground">
                {t("নোটিশের মূল কপি বা বিস্তারিত তথ্য এখনো যোগ করা হয়নি।")}
              </p>
            </div>
            <a
              href="/notices"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("সকল নোটিশে ফিরুন")}
            </a>
          </article>
        </section>
      ) : (
        <div className="mx-auto max-w-4xl px-4 py-8">
          <a href="/notices" className="font-semibold text-primary">
            {t("সকল নোটিশে ফিরুন")}
          </a>
        </div>
      )}
    </ContentPage>
  );
}
