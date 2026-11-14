import type { GalleryPhoto } from "./types";
import {
  building, assembly, treePlantingGroup, classroom, classHall, girlsAlpona,
  boysAlpona, prize1, prize2, prize3, prize4, prize5,
} from "./photos";

// ফটো গ্যালারি — নতুন ছবি যোগ করলে নিচে একটা লাইন বাড়ান
export const galleryPhotos: GalleryPhoto[] = [
  { id: 1, image: building, caption: "বিদ্যালয় ভবন" },
  { id: 2, image: assembly, caption: "প্রাতঃকালীন সমাবেশ" },
  { id: 3, image: treePlantingGroup, caption: "বৃক্ষরোপণে শিক্ষক ও শিক্ষার্থী" },
  { id: 4, image: classroom, caption: "শ্রেণিকক্ষ" },
  { id: 5, image: classHall, caption: "ক্লাস চলছে" },
  { id: 6, image: girlsAlpona, caption: "আলপনা আঁকা — ছাত্রীরা" },
  { id: 7, image: boysAlpona, caption: "আলপনা আঁকা — ছাত্ররা" },
  { id: 8, image: prize1, caption: "পুরস্কার বিতরণ" },
  { id: 9, image: prize2, caption: "অতিথিদের পুষ্পার্ঘ্য" },
  { id: 10, image: prize3, caption: "পুরস্কার গ্রহণ" },
  { id: 11, image: prize4, caption: "পুরস্কার বিতরণ" },
  { id: 12, image: prize5, caption: "বার্ষিক সাংস্কৃতিক অনুষ্ঠান" },
];
