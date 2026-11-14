import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "পাঠাগার | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <ContentPage
      title="পাঠাগার"
      titleEn="Library"
      intro="বিদ্যালয়ের পাঠাগার ও পাঠ-সহায়ক সুবিধার তথ্য।"
      introEn="Information about the school library and reading resources."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
