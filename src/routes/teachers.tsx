import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/teachers")({
  head: () => ({ meta: [{ title: "শিক্ষকবৃন্দ | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: TeachersPage,
});

function TeachersPage() {
  return (
    <ContentPage
      title="শিক্ষকবৃন্দ"
      titleEn="Teachers"
      intro="বিদ্যালয়ের শিক্ষক ও কর্মীদের পরিচিতি।"
      introEn="Meet the school's teachers and staff."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
