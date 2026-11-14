import { createFileRoute } from "@tanstack/react-router";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { ContentPage } from "@/components/shared/ContentPage";
import { useCollection } from "@/lib/admin-store";
import { galleryPhotos as defaultGalleryPhotos } from "@/data/gallery";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "ফটো গ্যালারি | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: GalleryPage,
});

function GalleryPage() {
  const photos = useCollection("gallery", defaultGalleryPhotos);
  const { t } = useLanguage();

  return (
    <ContentPage
      title="ফটো গ্যালারি"
      titleEn="Photo Gallery"
      intro="বিদ্যালয়ের ছবি ও কার্যক্রমের মুহূর্তগুলো দেখুন।"
      introEn="Browse photos and moments from school activities."
    >
      <div className="dashboard-surface">
        {photos.length ? (
          <PhotoGallery photos={photos} />
        ) : (
          <p className="mx-auto max-w-7xl px-4 py-12 text-center text-muted-foreground">
            {t("ছবি পরে যোগ করা হবে।")}
          </p>
        )}
      </div>
    </ContentPage>
  );
}
