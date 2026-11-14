import { CalendarDays, IdCard, BookOpen, Landmark } from "lucide-react";
import type { Achievement } from "./types";

// যাচাইকৃত প্রতিষ্ঠানের তথ্য
export const achievements: Achievement[] = [
  { id: 1, icon: CalendarDays, number: "১৯৯৫", label: "প্রতিষ্ঠাকাল" },
  { id: 2, icon: IdCard, number: "114398", label: "EIIN নম্বর" },
  { id: 3, icon: BookOpen, number: "মাধ্যমিক", label: "শিক্ষার স্তর" },
  { id: 4, icon: Landmark, number: "ঢাকা", label: "শিক্ষা বোর্ড" },
];
