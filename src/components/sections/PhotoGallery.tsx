// ফটো গ্যালারি — ৪ কলামের গ্রিড
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/shared/SectionTitle";
import type { GalleryPhoto } from "@/data/types";
import { useLanguage } from "@/lib/language";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function PhotoGallery({
  photos,
  allPhotosHref,
}: {
  photos: GalleryPhoto[];
  allPhotosHref?: string;
}) {
  const { t, localized } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  const showPrevious = () => {
    setActiveIndex((index) =>
      index === null ? null : (index - 1 + photos.length) % photos.length,
    );
  };

  const showNext = () => {
    setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length));
  };

  return (
    <>
      <section id="gallery" className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle
          kicker="স্মৃতির অ্যালবাম"
          title="ফটো গ্যালারি"
          {...(allPhotosHref ? { action: "সব দেখুন", href: allPhotosHref } : {})}
        />
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {photos.map((photo, index) => (
            <figure
              key={photo.id}
              className="group relative overflow-hidden rounded-xl shadow-card"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${t("ছবি দেখুন")}: ${localized(photo.caption, photo.captionEn)}`}
                className="relative block w-full cursor-zoom-in text-left"
              >
                <img
                  src={photo.image}
                  alt={localized(photo.caption, photo.captionEn)}
                  loading="lazy"
                  width={640}
                  height={480}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8 text-left text-xs font-semibold text-white">
                  {localized(photo.caption, photo.captionEn)}
                </span>
              </button>
            </figure>
          ))}
        </div>
      </section>

      <Dialog
        open={activePhoto !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <DialogContent
          closeLabel={t("বন্ধ করুন")}
          className="w-[calc(100%-2rem)] max-w-5xl border-0 bg-black p-3 text-white sm:p-5"
        >
          {activePhoto && activeIndex !== null && (
            <>
              <DialogTitle className="sr-only">
                {localized(activePhoto.caption, activePhoto.captionEn)}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {t("ছবি")} {t(String(activeIndex + 1))} {t("এর মধ্যে")} {t(String(photos.length))}
              </DialogDescription>
              <div className="relative flex min-h-48 items-center justify-center">
                <img
                  src={activePhoto.image}
                  alt={localized(activePhoto.caption, activePhoto.captionEn)}
                  className="max-h-[75vh] max-w-full object-contain"
                />
                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      aria-label={t("আগের ছবি")}
                      className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white hover:bg-black/85"
                    >
                      <ChevronLeft aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label={t("পরের ছবি")}
                      className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white hover:bg-black/85"
                    >
                      <ChevronRight aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-center text-sm font-medium text-white">
                {localized(activePhoto.caption, activePhoto.captionEn)}
                <span className="ml-2 text-white/70">
                  ({t(String(activeIndex + 1))}/{t(String(photos.length))})
                </span>
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
