import type { EventItem } from "./types";
import { culturalGuests, treePlanting, computerClass, parade, exam, procession } from "./photos";

// "সংবাদ ও অনুষ্ঠান" সেকশনের ফিল্টার বাটন (প্রথমটা = সব দেখাবে)
export const EVENT_CATEGORIES = ["সব", "সাধারণ", "একাডেমিক", "ক্রীড়া", "সাংস্কৃতিক"];

export const events: EventItem[] = [
  { id: 1, image: culturalGuests, category: "সাংস্কৃতিক", title: "বার্ষিক সাংস্কৃতিক অনুষ্ঠান ও পুরস্কার বিতরণ", text: "অতিথিদের উপস্থিতিতে বর্ণাঢ্য আয়োজনে অনুষ্ঠিত হলো বার্ষিক সাংস্কৃতিক অনুষ্ঠান।" },
  { id: 2, image: treePlanting, day: "15", month: "Jul", category: "সাধারণ", title: "বৃক্ষরোপণ কর্মসূচি", text: "শিক্ষার্থীরা নিজ হাতে গাছ লাগিয়ে সবুজ ক্যাম্পাস গড়ার অঙ্গীকার করল।" },
  { id: 3, image: computerClass, category: "একাডেমিক", title: "কম্পিউটার ও আইসিটি ক্লাস", text: "ল্যাপটপে হাতে-কলমে আইসিটি শিক্ষা পাচ্ছে আমাদের শিক্ষার্থীরা।" },
  { id: 4, image: parade, category: "ক্রীড়া", title: "ক্রীড়া ও কুচকাওয়াজ প্রদর্শনী", text: "মাঠে শিক্ষার্থীদের শারীরিক কসরত ও কুচকাওয়াজ প্রদর্শনী।" },
  { id: 5, image: exam, category: "একাডেমিক", title: "শ্রেণিকক্ষে পরীক্ষা গ্রহণ", text: "শিক্ষকদের তত্ত্বাবধানে শান্ত পরিবেশে পরীক্ষা অনুষ্ঠিত হচ্ছে।" },
  { id: 6, image: procession, category: "সাধারণ", title: "শোভাযাত্রা ও শ্রদ্ধা নিবেদন", text: "ফুল হাতে শিক্ষার্থীদের সারিবদ্ধ শোভাযাত্রা।" },
];
