import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ContentPage } from "@/components/shared/ContentPage";
import { events as defaultEvents } from "@/data/events";
import type { EventItem } from "@/data/types";
import { useCollection } from "@/lib/admin-store";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/news-events/$id")({
  head: () => ({ meta: [{ title: "সংবাদ ও অনুষ্ঠান | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: EventDetailPage,
});

function EventDetailPage() {
  const { id } = Route.useParams();
  const events = useCollection<EventItem>("events", defaultEvents);
  const { t, localized } = useLanguage();
  const event = events.find((item) => item.id === Number(id));

  return (
    <ContentPage
      title={event ? localized(event.title, event.titleEn) : "সংবাদ পাওয়া যায়নি"}
      titleEn={event?.titleEn ?? "Story Not Found"}
      intro={event ? localized(event.category, event.categoryEn) : "সংবাদ ও অনুষ্ঠান"}
      introEn={event?.categoryEn ?? "News & Events"}
    >
      {event ? (
        <section className="dashboard-surface px-4 py-12 sm:py-16">
          <article className="dashboard-panel mx-auto max-w-4xl overflow-hidden">
            <img
              src={event.image}
              alt={localized(event.title, event.titleEn)}
              className="max-h-[34rem] w-full object-cover"
            />
            <div className="p-6 sm:p-10">
              {event.day && (
                <p className="text-sm font-semibold text-secondary">
                  {t(event.day)} {t(event.month ?? "")}
                </p>
              )}
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {localized(event.text, event.textEn)}
              </p>
              <a
                href="/news-events"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t("সব সংবাদ ও অনুষ্ঠানে ফিরুন")}
              </a>
            </div>
          </article>
        </section>
      ) : (
        <div className="mx-auto max-w-4xl px-4 py-8">
          <a href="/news-events" className="font-semibold text-primary">
            {t("সব সংবাদ ও অনুষ্ঠানে ফিরুন")}
          </a>
        </div>
      )}
    </ContentPage>
  );
}
