import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/class-routine")({
  head: () => ({ meta: [{ title: "ক্লাস রুটিন | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: ClassRoutinePage,
});

function ClassRoutinePage() {
  return (
    <ContentPage
      title="ক্লাস রুটিন"
      titleEn="Class Routine"
      intro="শ্রেণিভিত্তিক ক্লাসের সময়সূচি।"
      introEn="Class schedules by grade."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
