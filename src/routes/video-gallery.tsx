import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/shared/ContentPage";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder";

export const Route = createFileRoute("/video-gallery")({
  head: () => ({ meta: [{ title: "ভিডিও গ্যালারি | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: VideoGalleryPage,
});

function VideoGalleryPage() {
  return (
    <ContentPage
      title="ভিডিও গ্যালারি"
      titleEn="Video Gallery"
      intro="বিদ্যালয়ের অনুষ্ঠান ও কার্যক্রমের ভিডিও।"
      introEn="Videos of school events and activities."
    >
      <PagePlaceholder />
    </ContentPage>
  );
}
