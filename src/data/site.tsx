// বিদ্যালয় সম্পর্কে প্রকাশিত তথ্য
import type { MenuItem } from "./types";

export const FACEBOOK_URL = "https://www.facebook.com/groups/260049548649455/";

export const SCHOOL = {
  nameBn: "আলোকদিয়া উচ্চ বিদ্যালয়",
  nameEn: "Alokdia High School",
  phone: "01309114398",
  phoneDisplay: "০১৩০৯১১৪৩৯৮",
  email: "ahs.114398@gmail.com",
  website: "https://www.alukdiahighschool.edu.bd",
  established: "১৯৯৫",
  eiin: "114398",
  address: "আলোকদিয়া, আলোকদিয়া ইউনিয়ন, মধুপুর, টাঙ্গাইল",
  addressEn: "Alokdia, Alokdia Union, Madhupur, Tangail",
  postCode: "১৯৯৬",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=H24X%2BRJF%2C+Sonkhula-Alokdia+Road",
  motto: "মাধ্যমিক বিদ্যালয় · মধুপুর, টাঙ্গাইল",
  mottoEn: "Secondary School · Madhupur, Tangail",
  about:
    "আলোকদিয়া উচ্চ বিদ্যালয় ১৯৯৫ সালে প্রতিষ্ঠিত একটি বেসরকারি মাধ্যমিক বিদ্যালয়। প্রতিষ্ঠানটি ঢাকা শিক্ষা বোর্ডের অধীন এবং ইআইআইএন ১১৪৩৯৮ দিয়ে শনাক্ত করা যায়।",
  aboutEn:
    "Alokdia High School is a private secondary school established in 1995. It is under the Dhaka Education Board and is identified by EIIN 114398.",
  footerText: "ঢাকা শিক্ষা বোর্ডের অধীন বেসরকারি মাধ্যমিক বিদ্যালয় · ইআইআইএন ১১৪৩৯৮",
  footerTextEn: "Private secondary school under Dhaka Education Board · EIIN 114398",
  copyright: "© ২০২৬ আলোকদিয়া উচ্চ বিদ্যালয়, মধুপুর, টাঙ্গাইল। সর্বস্বত্ব সংরক্ষিত।",
  copyrightEn: "© 2026 Alokdia High School, Madhupur, Tangail. All rights reserved.",
};

export const SCHOOL_SOURCES = [
  {
    label: "বিদ্যালয়ের পরিচিতি · টাঙ্গাইল ডট নেট",
    href: "https://tangail.net/business/alokdiya-high-school",
  },
  {
    label: "প্রতিষ্ঠানের প্রোফাইল · প্রতিষ্ঠান ডট বিডি",
    href: "https://institution.bd/eiin/114398",
  },
];

// উপরের মেনু বার
export const MENU: MenuItem[] = [
  { label: "হোম", href: "/#top" },
  {
    label: "আমাদের সম্পর্কে",
    href: "/about-us",
    sub: [
      { label: "প্রতিষ্ঠানের পরিচিতি", href: "/about-us#school-profile" },
      { label: "প্রশাসনিক তথ্য", href: "/about-us#leadership" },
    ],
  },
  {
    label: "একাডেমিক",
    href: "/academic-program",
    sub: [
      { label: "শিক্ষাক্রম", href: "/academic-program" },
      { label: "একাডেমিক ক্যালেন্ডার", href: "/academic-calendar" },
      { label: "নিয়মাবলি", href: "/rules" },
      { label: "ভর্তি", href: "/admission" },
      { label: "শিক্ষকবৃন্দ", href: "/teachers" },
      { label: "ফলাফল", href: "/results" },
    ],
  },
  { label: "নোটিশ", href: "/notices" },
  { label: "ক্লাব", href: "/clubs" },
  {
    label: "গ্যালারি",
    href: "/gallery",
    sub: [
      { label: "ফটো গ্যালারি", href: "/gallery" },
      { label: "ভিডিও গ্যালারি", href: "/video-gallery" },
    ],
  },
  {
    label: "সুবিধাসমূহ",
    href: "/facilities",
    sub: [
      { label: "পাঠাগার", href: "/library" },
      { label: "বিজ্ঞানাগার", href: "/science-lab" },
      { label: "খেলাধুলা", href: "/sports" },
    ],
  },
  { label: "যোগাযোগ", href: "/contact-us" },
];

// মেনুর নিচের ছোট লিংক স্ট্রিপ
export const LINK_STRIP = [
  { label: "ভর্তি তথ্য", href: "/admission" },
  { label: "পরীক্ষার ফলাফল", href: "/results" },
  { label: "ক্লাস রুটিন", href: "/class-routine" },
  { label: "ফেসবুক গ্রুপ", href: FACEBOOK_URL },
];

// ফুটারের "দ্রুত লিংক"
export const FOOTER_LINKS = [
  { label: "হোম", href: "/#top" },
  { label: "আমাদের সম্পর্কে", href: "/about-us" },
  { label: "ভর্তি", href: "/admission" },
  { label: "নোটিশ", href: "/notices" },
  { label: "সংবাদ ও অনুষ্ঠান", href: "/news-events" },
  { label: "যোগাযোগ", href: "/contact-us" },
];
