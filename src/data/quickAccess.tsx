import { UserPlus, Megaphone, FileText, Phone } from "lucide-react";
import type { QuickItem } from "./types";

// "দ্রুত প্রবেশ" — চারটি রঙিন কার্ড
export const quickItems: QuickItem[] = [
  {
    id: 1,
    icon: UserPlus,
    title: "ভর্তি",
    text: "নতুন শিক্ষাবর্ষে আবেদন করুন",
    action: "আবেদন করুন",
    colorClass: "bg-gradient-to-br from-blue-700 to-blue-500",
  },
  {
    id: 2,
    icon: Megaphone,
    title: "নোটিশ",
    text: "সর্বশেষ ঘোষণা জানুন",
    action: "সব দেখুন",
    colorClass: "bg-gradient-to-br from-emerald-700 to-emerald-500",
  },
  {
    id: 3,
    icon: FileText,
    title: "ফলাফল",
    text: "পরীক্ষার ফলাফল দেখুন",
    action: "ফলাফল দেখুন",
    colorClass: "bg-gradient-to-br from-orange-600 to-orange-400",
  },
  {
    id: 4,
    icon: Phone,
    title: "যোগাযোগ",
    text: "বিদ্যালয় অফিসে যোগাযোগ",
    action: "যোগাযোগ করুন",
    colorClass: "bg-gradient-to-br from-rose-700 to-rose-500",
  },
];
