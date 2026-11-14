import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/academic-calendar")({
  head: () => ({ meta: [{ title: "একাডেমিক ক্যালেন্ডার | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: AcademicCalendarPage,
});

function AcademicCalendarPage() {
  return (
    <ContentPage
      title="একাডেমিক ক্যালেন্ডার"
      titleEn="Academic Calendar"
      intro="শিক্ষাবর্ষের গুরুত্বপূর্ণ তারিখ ও কার্যক্রম।"
      introEn="Important dates and activities for the academic year."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
