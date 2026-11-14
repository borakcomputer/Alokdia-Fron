import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/academic-program")({
  head: () => ({ meta: [{ title: "শিক্ষাক্রম | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: AcademicProgramPage,
});

function AcademicProgramPage() {
  return (
    <ContentPage
      title="শিক্ষাক্রম"
      titleEn="Curriculum"
      intro="বিদ্যালয়ের শিক্ষাক্রমের বিস্তারিত তথ্য।"
      introEn="Information about the school's curriculum."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
