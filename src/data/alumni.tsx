import type { Alumnus } from "./types";

// প্রাক্তন শিক্ষার্থী — আসল নাম ও প্রতিষ্ঠান দিয়ে বদলান
const universities = [
  "ঢাকা বিশ্ববিদ্যালয়",
  "মেডিকেল কলেজ",
  "বুয়েট",
  "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
  "পলিটেকনিক ইনস্টিটিউট",
  "সরকারি কলেজ",
];

export const alumni: Alumnus[] = universities.map((university, i) => ({
  id: i + 1,
  name: `প্রাক্তন শিক্ষার্থীর নাম ${i + 1}`,
  university,
  batch: `ব্যাচ ${2018 + i}`,
}));
