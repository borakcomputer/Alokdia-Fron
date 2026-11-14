import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/rules")({
  head: () => ({ meta: [{ title: "নিয়মাবলি | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: RulesPage,
});

function RulesPage() {
  return (
    <ContentPage
      title="নিয়মাবলি"
      titleEn="School Rules"
      intro="শিক্ষার্থী ও অভিভাবকদের জন্য বিদ্যালয়ের নিয়মাবলি।"
      introEn="School rules for students and guardians."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
