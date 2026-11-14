import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/sports")({
  head: () => ({ meta: [{ title: "খেলাধুলা | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: SportsPage,
});

function SportsPage() {
  return (
    <ContentPage
      title="খেলাধুলা"
      titleEn="Sports"
      intro="বিদ্যালয়ের খেলাধুলা ও ক্রীড়া কার্যক্রম।"
      introEn="School sports and athletic activities."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
