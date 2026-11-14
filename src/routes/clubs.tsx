import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/clubs")({
  head: () => ({ meta: [{ title: "ক্লাব | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: ClubsPage,
});

function ClubsPage() {
  return (
    <ContentPage
      title="ক্লাব"
      titleEn="Clubs"
      intro="শিক্ষার্থীদের সহশিক্ষা কার্যক্রম ও ক্লাবের তথ্য।"
      introEn="Information about student clubs and extracurricular activities."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
