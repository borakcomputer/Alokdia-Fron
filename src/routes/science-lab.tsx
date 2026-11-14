import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/science-lab")({
  head: () => ({ meta: [{ title: "বিজ্ঞানাগার | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: ScienceLabPage,
});

function ScienceLabPage() {
  return (
    <ContentPage
      title="বিজ্ঞানাগার"
      titleEn="Science Lab"
      intro="বিজ্ঞান শিক্ষা ও ব্যবহারিক কাজের সুবিধা।"
      introEn="Facilities for science learning and practical work."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
