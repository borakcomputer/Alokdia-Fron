import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContentPage } from "@/components/shared/ContentPage";
import { useCollection } from "@/lib/admin-store";
import { events as defaultEvents } from "@/data/events";
import type { EventItem } from "@/data/types";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/news-events")({
  head: () => ({ meta: [{ title: "সংবাদ ও অনুষ্ঠান | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: NewsEventsPage,
});

function NewsEventsPage() {
  const events = useCollection<EventItem>("events", defaultEvents);
  const { t, localized } = useLanguage();

  return (
    <ContentPage
      title="সংবাদ ও অনুষ্ঠান"
      titleEn="News & Events"
      intro="বিদ্যালয়ের কার্যক্রম ও অনুষ্ঠান সম্পর্কে প্রকাশিত তথ্য।"
      introEn="Updates about school activities and events."
    >
      <section className="dashboard-surface px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.length ? (
            events.map((event) => (
              <article key={event.id} className="dashboard-panel overflow-hidden">
                <img
                  src={event.image}
                  alt={localized(event.title, event.titleEn)}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-sm font-semibold text-secondary">
                    {localized(event.category, event.categoryEn)}
                    {event.day && ` · ${t(event.day)} ${t(event.month ?? "")}`}
                  </p>
                  <h2 className="mt-2 text-lg font-bold">
                    {localized(event.title, event.titleEn)}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {localized(event.text, event.textEn)}
                  </p>
                  <Link
                    to="/news-events/$id"
                    params={{ id: String(event.id) }}
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                  >
                    {t("বিস্তারিত")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className="dashboard-panel col-span-full p-8 text-center text-muted-foreground">
              {t("এখন কোনো সংবাদ বা অনুষ্ঠান নেই।")}
            </p>
          )}
        </div>
      </section>
    </ContentPage>
  );
}
