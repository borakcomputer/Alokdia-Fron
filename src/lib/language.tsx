import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Language = "bn" | "en";
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
  localized: (bengali: string, english?: string) => string;
};

const translations: Record<string, string> = {
  "আলোকদিয়া উচ্চ বিদ্যালয়": "Alokdia High School",
  "আলোকদিয়ার উচ্চ বিদ্যালয়ের ভবন": "Alokdia High School building",
  "আলোকদিয়া উচ্চ বিদ্যালয় লোগো": "Alokdia High School logo",
  "আলোকদিয়া উচ্চ বিদ্যালয় — শিক্ষাই আলো": "Alokdia High School — A Beacon of Learning",
  "প্রতিদিনের প্রাতঃকালীন সমাবেশ": "Daily Morning Assembly",
  "বাংলা নাম": "Bangla Name",
  "মাধ্যমিক বিদ্যালয় · মধুপুর, টাঙ্গাইল": "Secondary School · Madhupur, Tangail",
  "ঢাকা শিক্ষা বোর্ডের অধীন বেসরকারি মাধ্যমিক বিদ্যালয় · ইআইআইএন ১১৪৩৯৮":
    "Private secondary school under Dhaka Education Board · EIIN 114398",
  বাংলা: "Bangla",
  "আলোকদিয়া, আলোকদিয়া ইউনিয়ন, মধুপুর, টাঙ্গাইল": "Alokdia, Alokdia Union, Madhupur, Tangail",
  "তথ্যসূত্র:": "Sources:",
  "বিদ্যালয়ের পরিচিতি · টাঙ্গাইল ডট নেট": "School Profile · Tangail.net",
  "প্রতিষ্ঠানের প্রোফাইল · প্রতিষ্ঠান ডট বিডি": "Institution Profile · Institution.bd",
  "০১৩০৯১১৪৩৯৮": "01309114398",
  "১৯৯৫": "1995",
  "১৯৯৫ সাল": "1995",
  "১৯৯৬": "1996",
  "আলোকদিয়া উচ্চ বিদ্যালয় ১৯৯৫ সালে প্রতিষ্ঠিত একটি বেসরকারি মাধ্যমিক বিদ্যালয়। প্রতিষ্ঠানটি ঢাকা শিক্ষা বোর্ডের অধীন এবং ইআইআইএন ১১৪৩৯৮ দিয়ে শনাক্ত করা যায়।":
    "Alokdia High School is a private secondary school established in 1995. It is under the Dhaka Education Board and is identified by EIIN 114398.",
  হোম: "Home",
  "আমাদের সম্পর্কে": "About Us",
  "প্রতিষ্ঠানের পরিচিতি": "School Profile",
  "প্রশাসনিক তথ্য": "Administration",
  একাডেমিক: "Academics",
  শিক্ষাক্রম: "Curriculum",
  "একাডেমিক ক্যালেন্ডার": "Academic Calendar",
  নিয়মাবলি: "Rules",
  ভর্তি: "Admission",
  শিক্ষকবৃন্দ: "Teachers",
  ফলাফল: "Results",
  নোটিশ: "Notice",
  ক্লাব: "Clubs",
  গ্যালারি: "Gallery",
  "ফটো গ্যালারি": "Photo Gallery",
  "ভিডিও গ্যালারি": "Video Gallery",
  সুবিধাসমূহ: "Facilities",
  পাঠাগার: "Library",
  বিজ্ঞানাগার: "Science Lab",
  খেলাধুলা: "Sports",
  যোগাযোগ: "Contact",
  "ভর্তি তথ্য": "Admission Information",
  "পরীক্ষার ফলাফল": "Exam Results",
  "ক্লাস রুটিন": "Class Routine",
  "ফেসবুক গ্রুপ": "Facebook Group",
  "সংবাদ ও অনুষ্ঠান": "News & Events",
  স্বাগতম: "Welcome",
  "আমাদের গল্প জানুন": "Discover Our Story",
  "নোটিশ বোর্ড": "Notice Board",
  "সব দেখুন": "View All",
  বিস্তারিত: "Details",
  "তথ্য শিগগির যোগ করা হবে": "Information will be added soon",
  "এই পৃষ্ঠার নির্ভুল তথ্য বিদ্যালয় থেকে সংগ্রহ করে পরে যোগ করা হবে। আপাতত তথ্যের জন্য বিদ্যালয়ের সঙ্গে যোগাযোগ করুন।":
    "Verified information for this page will be added later. Please contact the school for now.",
  "নোটিশের মূল কপি বা বিস্তারিত তথ্য এখনো যোগ করা হয়নি।":
    "The original notice or detailed information has not been added yet.",
  "এখন কোনো নোটিশ প্রকাশিত নেই।": "There are no notices published right now.",
  "এখন কোনো সংবাদ বা অনুষ্ঠান নেই।": "There are no news or events right now.",
  "এখন কোনো ছবি যোগ করা হয়নি।": "No photos have been added yet.",
  "ছবি পরে যোগ করা হবে।": "Photos will be added later.",
  "সকল নোটিশে ফিরুন": "Back to all notices",
  "সব সংবাদ ও অনুষ্ঠানে ফিরুন": "Back to all news and events",
  "হোম পেজে ফিরুন": "Back to Home",
  "আগের স্লাইড": "Previous slide",
  "পরের স্লাইড": "Next slide",
  "ছবি দেখুন": "View photo",
  "বন্ধ করুন": "Close",
  "আগের ছবি": "Previous photo",
  "পরের ছবি": "Next photo",
  ছবি: "Photo",
  "এর মধ্যে": "of",
  "আলোকদিয়ায় স্বাগতম": "Welcome to Alokdia",
  প্রতিষ্ঠাকাল: "Established",
  "ইআইআইএন নম্বর": "EIIN",
  "ঢাকা শিক্ষা বোর্ড": "Dhaka Education Board",
  "প্রতিষ্ঠানের তথ্য": "School Information",
  "এসএসসি ফলাফল": "SSC Results",
  "শিক্ষার স্তর": "Education Level",
  মাধ্যমিক: "Secondary",
  ব্যবস্থাপনা: "Management",
  বেসরকারি: "Private",
  "শিক্ষা বোর্ড": "Education Board",
  ঢাকা: "Dhaka",
  অবস্থান: "Location",
  "আলোকদিয়া, মধুপুর, টাঙ্গাইল": "Alokdia, Madhupur, Tangail",
  "যাচাই-সংক্রান্ত নোট": "Verification Note",
  "বর্তমান প্রধান শিক্ষক, প্রতিষ্ঠাতা, ম্যানেজিং কমিটি, শিক্ষক-শিক্ষার্থী সংখ্যা এবং সাম্প্রতিক এসএসসি ফলাফলের নির্ভরযোগ্য হালনাগাদ তথ্য পাওয়া যায়নি। অনলাইন ডিরেক্টরিতে এমপিওভুক্তির উল্লেখ থাকলেও তা বিদ্যালয় থেকে নিশ্চিত করা প্রয়োজন।":
    "Reliable, up-to-date information about the current head teacher, founder, managing committee, number of teachers and students, and recent SSC results was not available. Online directories mention MPO listing, but this should be confirmed with the school.",
  "২০১১ সালের একটি প্রতিবেদনে তৎকালীন প্রধান শিক্ষক হিসেবে মোঃ আবুল কালাম আজাদের নাম উল্লেখ আছে; এটি বর্তমান দায়িত্বের নিশ্চয়তা নয়।":
    "A 2011 report names Md. Abul Kalam Azad as the head teacher at that time; this does not confirm that he currently holds the position.",
  "যোগাযোগের অনলাইন তালিকায় নম্বরের অমিল রয়েছে; ফোন ও ওয়েবসাইট আগে বিদ্যালয় থেকে যাচাই করুন।":
    "Online directories list conflicting phone numbers. Please verify the phone number and website with the school.",
  "আরও জানুন": "Learn More",
  "মানচিত্রে দেখুন": "View Map",
  "তথ্য যাচাই": "Information",
  "তথ্য যাচাইাধীন": "To Be Confirmed",
  "তৎকালীন প্রধান শিক্ষক · ২০১১": "Head Teacher at the Time · 2011",
  "মোঃ আবুল কালাম আজাদ": "Md. Abul Kalam Azad",
  "২০১১ সালের একটি সংবাদ প্রতিবেদনে তাঁকে বিদ্যালয়ের তৎকালীন প্রধান শিক্ষক হিসেবে উল্লেখ করা হয়েছে। বর্তমান দায়িত্বে আছেন কি না, তা নিশ্চিত নয়।":
    "A 2011 news report identified him as the school's head teacher at the time. His current position has not been confirmed.",
  "বর্তমান প্রধান শিক্ষক": "Current Head Teacher",
  "বর্তমান প্রধান শিক্ষকের নির্ভরযোগ্য হালনাগাদ তথ্য অনলাইনে পাওয়া যায়নি।":
    "Reliable, up-to-date information about the current head teacher was not found online.",
  "সভাপতি ও ম্যানেজিং কমিটি": "Chairperson & Managing Committee",
  "সভাপতি ও বর্তমান ম্যানেজিং কমিটির নির্ভরযোগ্য হালনাগাদ তথ্য অনলাইনে পাওয়া যায়নি।":
    "Reliable, up-to-date information about the chairperson and current managing committee was not found online.",
  "প্রতিষ্ঠানের সংক্ষিপ্ত পরিচিতি": "School at a Glance",
  "এক নজরে": "At a Glance",
  "ফলাফল ও পরিসংখ্যান": "Results & Statistics",
  "যাচাইকৃত ফলাফলের পরিসংখ্যান এখনো যোগ করা হয়নি।":
    "Verified results statistics have not been added yet.",
  "ঢাকা বোর্ডের ফলাফল পোর্টালে পরীক্ষা হিসেবে এসএসসি, বোর্ড হিসেবে ঢাকা এবং ফলাফলের ধরন হিসেবে প্রতিষ্ঠানভিত্তিক ফলাফল নির্বাচন করে ইআইআইএন নম্বর ১১৪৩৯৮ লিখুন।":
    "On the Dhaka Board results portal, select Examination: SSC, Board: Dhaka, and Result Type: Institution Result, then enter EIIN 114398.",
  "ফলাফল পোর্টালে যান": "Open Results Portal",
  সেবা: "Services",
  "দ্রুত প্রবেশ": "Quick Access",
  "নতুন শিক্ষাবর্ষে আবেদন করুন": "Apply for the new academic year",
  "আবেদন করুন": "Apply Now",
  "সর্বশেষ ঘোষণা জানুন": "See the latest announcements",
  "ফলাফল দেখুন": "View Results",
  "বিদ্যালয় অফিসে যোগাযোগ": "Contact the school office",
  "যোগাযোগ করুন": "Contact Us",
  "শিক্ষাই জাতির মেরুদণ্ড।": "Education is the backbone of a nation.",
  "ক্যাম্পাস লাইফ": "Campus Life",
  বিভাগ: "Category",
  "আরও পড়ুন →": "Read More →",
  সব: "All",
  সাধারণ: "General",
  ক্রীড়া: "Sports",
  সাংস্কৃতিক: "Cultural",
  "গর্বিত প্রাক্তন শিক্ষার্থী": "Proud Alumni",
  "আলোকদিয়ার তারকারা": "Alokdia's Achievers",
  "প্রাক্তন শিক্ষার্থীর নাম": "Alumni Member",
  ব্যাচ: "Batch",
  "ঢাকা বিশ্ববিদ্যালয়": "University of Dhaka",
  "মেডিকেল কলেজ": "Medical College",
  বুয়েট: "BUET",
  "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়": "Jahangirnagar University",
  "পলিটেকনিক ইনস্টিটিউট": "Polytechnic Institute",
  "সরকারি কলেজ": "Government College",
  মতামত: "Testimonials",
  "অভিভাবকেরা যা বলেন": "What Parents Say",
  "অভিভাবকের নাম": "Parent",
  "দশম শ্রেণির অভিভাবক": "Parent of a Class 10 student",
  "অষ্টম শ্রেণির অভিভাবক": "Parent of a Class 8 student",
  "ক্লাসের পাশাপাশি শিক্ষকদের আন্তরিক যত্ন আমার সন্তানের পড়াশোনায় অনেক সাহায্য করেছে।":
    "Alongside classes, the teachers' thoughtful support has greatly helped my child with their studies.",
  "গ্রামের স্কুল হয়েও এখানে শৃঙ্খলা ও পড়ালেখার পরিবেশ খুব ভালো।":
    "Despite being a rural school, it has a very good environment for discipline and learning.",
  "অতিথিদের উপস্থিতিতে বর্ণাঢ্য আয়োজনে অনুষ্ঠিত হলো বার্ষিক সাংস্কৃতিক অনুষ্ঠান।":
    "The annual cultural program was held with a colorful celebration and distinguished guests.",
  "বৃক্ষরোপণ কর্মসূচি": "Tree Planting Program",
  "শিক্ষার্থীরা নিজ হাতে গাছ লাগিয়ে সবুজ ক্যাম্পাস গড়ার অঙ্গীকার করল।":
    "Students planted trees and pledged to build a greener campus.",
  "কম্পিউটার ও আইসিটি ক্লাস": "Computer & ICT Class",
  "ল্যাপটপে হাতে-কলমে আইসিটি শিক্ষা পাচ্ছে আমাদের শিক্ষার্থীরা।":
    "Students are learning ICT through hands-on activities using laptops.",
  "ক্রীড়া ও কুচকাওয়াজ প্রদর্শনী": "Sports & Parade Exhibition",
  "মাঠে শিক্ষার্থীদের শারীরিক কসরত ও কুচকাওয়াজ প্রদর্শনী।":
    "Students demonstrate physical exercises and parade drills on the field.",
  "শ্রেণিকক্ষে পরীক্ষা গ্রহণ": "Classroom Examination",
  "শিক্ষকদের তত্ত্বাবধানে শান্ত পরিবেশে পরীক্ষা অনুষ্ঠিত হচ্ছে।":
    "Examinations are being held in a calm environment under teachers' supervision.",
  "শোভাযাত্রা ও শ্রদ্ধা নিবেদন": "Procession & Tribute",
  "ফুল হাতে শিক্ষার্থীদের সারিবদ্ধ শোভাযাত্রা।":
    "Students take part in an orderly procession carrying flowers.",
  "বার্ষিক সাংস্কৃতিক অনুষ্ঠান ও পুরস্কার বিতরণ": "Annual Cultural Program & Prize Giving",
  "বিদ্যালয় ভবন": "School Building",
  "প্রাতঃকালীন সমাবেশ": "Morning Assembly",
  "বৃক্ষরোপণে শিক্ষক ও শিক্ষার্থী": "Teachers and Students Planting Trees",
  শ্রেণিকক্ষ: "Classroom",
  "ক্লাস চলছে": "Class in Progress",
  "আলপনা আঁকা — ছাত্রীরা": "Girls Creating Alpana",
  "আলপনা আঁকা — ছাত্ররা": "Boys Creating Alpana",
  "পুরস্কার বিতরণ": "Prize Giving",
  "অতিথিদের পুষ্পার্ঘ্য": "Guests Receiving Floral Tributes",
  "পুরস্কার গ্রহণ": "Receiving an Award",
  "বার্ষিক ক্রীড়া প্রতিযোগিতা - ২০২৬": "Annual Sports Competition - 2026",
  "বার্ষিক পরীক্ষা ২০২৬ এর সময়সূচি প্রকাশ": "Annual Examination 2026 Schedule Published",
  "দুর্গাপূজা উপলক্ষে বিদ্যালয় বন্ধ থাকবে": "School Closed for Durga Puja",
  "এসএসসি ২০২৭ ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি": "SSC 2027 Form Fill-up Notice",
  "ষষ্ঠ শ্রেণিতে ভর্তি ফরম বিতরণ": "Class 6 Admission Forms Available",
  "মাসিক বেতন পরিশোধের নোটিশ": "Monthly Tuition Payment Notice",
  "ঈদ-ই মিলাদুন্নবী (সাঃ) উপলক্ষে কুরআন তিলাওয়াত, হামদ-নাত, প্রবন্ধ ও কুইজ প্রতিযোগিতা":
    "Quran recitation, Hamd and Naat, essay, and quiz competitions for Eid-e-Milad-un-Nabi (PBUH)",
  "স্মৃতির অ্যালবাম": "Memories",
  "আমাদের অর্জন": "Our Achievements",
  "দ্রুত লিংক": "Quick Links",
  "ফেসবুক গ্রুপে যোগ দিন": "Join the Facebook Group",
  "পোস্ট কোড": "Postal Code",
  "ফোন ও ওয়েবসাইটের তথ্য অনলাইন ডিরেক্টরি থেকে নেওয়া; যোগাযোগের আগে বিদ্যালয় থেকে যাচাই করুন।":
    "Phone and website details are from online directories; please verify them with the school before contacting.",
  "© ২০২৬ আলোকদিয়া উচ্চ বিদ্যালয়, মধুপুর, টাঙ্গাইল। সর্বস্বত্ব সংরক্ষিত।":
    "© 2026 Alokdia High School, Madhupur, Tangail. All rights reserved.",
  "স্থাপিত:": "Established:",
  "রাতের মোড": "Night Mode",
  "দিনের মোড": "Day Mode",
  ইংরেজি: "English",
  "আলোকদিয়া উচ্চ বিদ্যালয়ের সঙ্গে যোগাযোগ করতে নিচের তথ্য ব্যবহার করুন।":
    "Use the information below to contact Alokdia High School.",
  "যোগাযোগের তথ্য": "Contact Information",
  "আমাদের সঙ্গে যোগাযোগ করুন": "Get in Touch",
  "ঠিকানা, ফোন বা ইমেইলের মাধ্যমে বিদ্যালয়ের সঙ্গে যোগাযোগ করুন।":
    "Contact the school by address, phone, or email.",
  ঠিকানা: "Address",
  ফোন: "Phone",
  ইমেইল: "Email",
  ওয়েবসাইট: "Website",
  ওয়েবসাইট: "Website",
  "ফোন করুন": "Call",
  "ইমেইল পাঠান": "Send Email",
  "ওয়েবসাইট দেখুন": "Visit Website",
  "বিদ্যালয়ের অফিস সময় অনলাইনে নিশ্চিত করা যায়নি। যাওয়ার আগে ফোনে জেনে নিন।":
    "The school's office hours could not be verified online. Please call before visiting.",
  "ফোন নম্বর ও ওয়েবসাইট অনলাইন ডিরেক্টরি থেকে নেওয়া; বিদ্যালয় থেকে যাচাই করুন।":
    "The phone number and website are from online directories; please verify them with the school.",
  "বার্তা পাঠান": "Send a Message",
  "আপনার কোনো প্রশ্ন আছে?": "Have a Question?",
  "ফর্মটি পূরণ করলে আপনার ডিভাইসের ইমেইল অ্যাপে বার্তার খসড়া তৈরি হবে।":
    "Filling out this form will prepare a message in your device's email app.",
  নাম: "Name",
  বিষয়: "Subject",
  "আপনার বার্তা": "Your Message",
  "ইমেইল অ্যাপে বার্তা খুলুন": "Open Message in Email App",
  "আপনার ইমেইল অ্যাপে বার্তাটি পাঠানোর জন্য প্রস্তুত করা হয়েছে।":
    "The message is ready to be sent in your email app.",
  "বিদ্যালয়ের অবস্থান": "School Location",
  "গুগল ম্যাপে খুলুন": "Open in Google Maps",
  "বিদ্যালয়ের মানচিত্র": "School map",
  "নতুন শিক্ষাবর্ষে ভর্তি": "Admission for the New Academic Year",
  "আলোকদিয়া উচ্চ বিদ্যালয়ে ভর্তির তথ্য, প্রয়োজনীয় কাগজপত্র ও যোগাযোগের উপায় জানুন।":
    "Find admission information, required documents, and contact details for Alokdia High School.",
  "ভর্তির প্রস্তুতি": "Admission Preparation",
  "আবেদনের আগে যা জেনে নেবেন": "What to Know Before Applying",
  "ভর্তি-সংক্রান্ত শ্রেণি, সময়সীমা, আসন ও ফি বিদ্যালয় থেকে সরাসরি নিশ্চিত করুন।":
    "Confirm eligible classes, deadlines, seat availability, and fees directly with the school.",
  "শিক্ষার্থীর জন্মনিবন্ধনের অনুলিপি": "Copy of the student's birth certificate",
  "শিক্ষার্থী ও অভিভাবকের পরিচয়পত্রের অনুলিপি":
    "Copies of the student's and guardian's identification",
  "আগের বিদ্যালয়ের ছাড়পত্র ও ফলাফলের কাগজ (প্রযোজ্য হলে)":
    "Transfer certificate and academic records from the previous school, if applicable",
  "শিক্ষার্থীর সাম্প্রতিক পাসপোর্ট সাইজের ছবি": "Recent passport-size photographs of the student",
  "বিদ্যালয় থেকে সংগ্রহ করা পূরণকৃত ভর্তি ফরম":
    "Completed admission form collected from the school",
  "প্রয়োজনীয় কাগজপত্র": "Required Document",
  "এটি সাধারণ প্রস্তুতির তালিকা; শ্রেণি ও শিক্ষাবর্ষ অনুযায়ী প্রয়োজনীয় কাগজপত্র বিদ্যালয় থেকে নিশ্চিত করুন।":
    "This is a general preparation checklist. Confirm required documents for the class and academic year with the school.",
  "ভর্তি বিষয়ে জানতে চান?": "Questions About Admission?",
  "ভর্তি ফরম, আসন, প্রয়োজনীয় কাগজপত্র ও অফিস সময় জানতে বিদ্যালয়ের সঙ্গে যোগাযোগ করুন।":
    "Contact the school to ask about application forms, availability, required documents, and office hours.",
  "বিদ্যালয়ের ঠিকানা ও মানচিত্র": "School address and map",
  "ফোন নম্বর অনলাইন ডিরেক্টরি থেকে নেওয়া; যোগাযোগের আগে বিদ্যালয় থেকে যাচাই করুন।":
    "The phone number is from an online directory; please verify it with the school before contacting.",
  "যোগাযোগ পেজে যান": "Go to Contact Page",
  "ভর্তির ধাপ": "Admission Steps",
  "সহজভাবে ভর্তি প্রক্রিয়া": "A Simple Admission Process",
  "বিদ্যালয়ে যোগাযোগ": "Contact the School",
  "শ্রেণিভিত্তিক আসন, ভর্তি সময় ও ফরম সংগ্রহের নিয়ম বিদ্যালয় অফিস থেকে জেনে নিন।":
    "Ask the school office about class availability, admission dates, and how to collect the form.",
  "ফরম পূরণ ও কাগজপত্র": "Complete the Form and Prepare Documents",
  "বিদ্যালয়ের নির্দেশনা অনুযায়ী ভর্তি ফরম পূরণ করে প্রয়োজনীয় কাগজপত্র জমা দিন।":
    "Complete the admission form and submit the required documents according to the school's instructions.",
  "যাচাই ও পরবর্তী নির্দেশনা": "Review and Next Steps",
  "আবেদন যাচাই, মূল্যায়ন বা সাক্ষাৎকারের প্রয়োজন হলে বিদ্যালয় থেকে সময়সূচি জেনে নিন।":
    "If application review, assessment, or an interview is required, ask the school for the schedule.",
  "প্রক্রিয়া ও সময়সূচি শিক্ষাবর্ষভেদে পরিবর্তিত হতে পারে; সর্বশেষ তথ্য বিদ্যালয় থেকে জেনে নিন।":
    "The process and schedule may vary by academic year; get the latest information from the school.",
  "আমাদের বিদ্যালয়": "Our School",
  "শিক্ষা, মূল্যবোধ ও এগিয়ে চলা": "Education, Values, and Progress",
  "আলোকদিয়া ইউনিয়নের শিক্ষার্থীদের মাধ্যমিক শিক্ষার সুযোগ দেওয়ার লক্ষ্যে বিদ্যালয়টি কাজ করছে। বিদ্যালয়ের ইতিহাস ও কার্যক্রম সম্পর্কে আরও তথ্য বিদ্যালয় কর্তৃপক্ষের কাছ থেকে জানা যাবে।":
    "The school serves the secondary education needs of students in Alokdia Union. Contact the school administration for more information about its history and activities.",
  "ভর্তি সম্পর্কে জানুন": "Learn About Admission",
  "বিদ্যালয় জীবন": "School Life",
  "শেখা ও অংশগ্রহণ": "Learning and Participation",
  নেতৃত্ব: "Leadership",
  "বর্তমান প্রধান শিক্ষক ও ম্যানেজিং কমিটির তথ্য নিশ্চিত করা যায়নি। নিচের পুরোনো তথ্যটি ২০১১ সালের প্রতিবেদনভিত্তিক।":
    "The current head teacher and managing committee have not been verified. The historical information below is based on a 2011 report.",
  "আমাদের অঙ্গীকার": "Our Commitment",
  "জ্ঞান, নৈতিকতা ও দেশপ্রেমে আলোকিত প্রজন্ম গড়াই বিদ্যালয়ের লক্ষ্য।":
    "The school's aim is to nurture a generation enlightened by knowledge, ethics, and patriotism.",
  "আরও জানতে চান?": "Want to Know More?",
  "বিদ্যালয়ের পরিচিতি ও যোগাযোগের তথ্যসূত্র দেখুন, অথবা ভর্তি-সংক্রান্ত তথ্যের জন্য বিদ্যালয়ে যোগাযোগ করুন।":
    "Explore the school profile and its sources, or contact the school for admission information.",
  "শিক্ষা, মূল্যবোধ ও ভবিষ্যৎ": "Education, Values, and the Future",
  "আলোকদিয়া উচ্চ বিদ্যালয়ে শেখা, বিকাশ ও এগিয়ে চলার একসঙ্গে পথচলা।":
    "A place to learn, grow, and move forward together at Alokdia High School.",
  জানুয়ারি: "Jan",
  ফেব্রুয়ারি: "Feb",
  মার্চ: "Mar",
  এপ্রিল: "Apr",
  মে: "May",
  জুন: "Jun",
  জুলাই: "Jul",
  আগস্ট: "Aug",
  সেপ্টেম্বর: "Sep",
  অক্টোবর: "Oct",
  নভেম্বর: "Nov",
  ডিসেম্বর: "Dec",
  "বেসরকারি মাধ্যমিক বিদ্যালয়": "Private Secondary School",
  "ইআইআইএন:": "EIIN:",
  "নির্বাচন করুন": "Select language",
};

const bengaliByEnglish: Record<string, string> = {
  Jan: "জানুয়ারি",
  Feb: "ফেব্রুয়ারি",
  Mar: "মার্চ",
  Apr: "এপ্রিল",
  May: "মে",
  Jun: "জুন",
  Jul: "জুলাই",
  Aug: "আগস্ট",
  Sep: "সেপ্টেম্বর",
  Oct: "অক্টোবর",
  Nov: "নভেম্বর",
  Dec: "ডিসেম্বর",
  "Alokdia High School": "আলোকদিয়া উচ্চ বিদ্যালয়",
  "Night Mode": "রাতের মোড",
  "Day Mode": "দিনের মোড",
};
const englishToBengaliDigit = (digit: string) => "০১২৩৪৫৬৭৮৯".charAt(Number(digit));
const bengaliToEnglishDigit = (digit: string) => String("০১২৩৪৫৬৭৮৯".indexOf(digit));

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("bn");
  const [languageReady, setLanguageReady] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("school-language");
    if (savedLanguage === "bn" || savedLanguage === "en") setLanguage(savedLanguage);
    setLanguageReady(true);
  }, []);

  useEffect(() => {
    if (!languageReady) return;
    document.documentElement.lang = language;
    window.localStorage.setItem("school-language", language);
    document.title =
      language === "en"
        ? "Alokdia High School | Madhupur, Tangail"
        : "আলোকদিয়া উচ্চ বিদ্যালয় | মধুপুর, টাঙ্গাইল";
  }, [language, languageReady]);

  const translate = (text: string) => {
    if (language === "en") {
      return translations[text] ?? text.replace(/[০-৯]/g, bengaliToEnglishDigit);
    }
    return (
      bengaliByEnglish[text] ??
      text
        .replace(/\bEIIN\b/gi, "ইআইআইএন")
        .replace(/\bSSC\b/gi, "এসএসসি")
        .replace(/\bJSC\b/gi, "জেএসসি")
        .replace(/\bMPO\b/gi, "এমপিও")
        .replace(/[0-9]/g, englishToBengaliDigit)
    );
  };
  const value: LanguageContextValue = {
    language,
    setLanguage: (nextLanguage) => setLanguage(nextLanguage),
    t: translate,
    localized: (bengali, english) =>
      language === "en" && english?.trim() ? english : translate(bengali),
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={languageReady ? undefined : "language-loading"} aria-busy={!languageReady}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const initialized = useRef(false);
  const { t } = useLanguage();

  useEffect(() => {
    setDarkMode(window.localStorage.getItem("school-theme") === "dark");
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    window.localStorage.setItem("school-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button
      type="button"
      aria-pressed={darkMode}
      aria-label={darkMode ? t("দিনের মোড") : t("রাতের মোড")}
      onClick={() => setDarkMode((current) => !current)}
      className="rounded-full border border-current/30 px-3 py-1 text-xs font-semibold transition-colors hover:bg-white/10"
    >
      {darkMode ? `☀ ${t("দিনের মোড")}` : `☾ ${t("রাতের মোড")}`}
    </button>
  );
}
