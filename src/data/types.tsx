// ======================================================================
// এখানে সব তথ্যের "ছাঁচ" (type) আছে।
// পরে ডাটাবেসে টেবিল/কালেকশন বানানোর সময় এই ফিল্ডগুলোই কলাম হবে।
// ======================================================================
import type { LucideIcon } from "lucide-react";

export type MenuItem = {
  label: string;
  href?: string; // সরাসরি লিংক (ড্রপডাউন না থাকলে)
  sub?: { label: string; href: string }[]; // ড্রপডাউন মেনু
};

export type Slide = {
  id: number;
  image: string;
  position: string; // ছবির কোন অংশ দেখাবে (CSS object-position)
  title: string;
  titleEn?: string;
};

export type Notice = {
  id: number;
  day: string;
  month: string;
  title: string;
  titleEn?: string;
};

export type Leader = {
  id: number;
  tag: string; // "সভাপতির বাণী" / "প্রধান শিক্ষকের বাণী"
  tagEn?: string;
  name: string;
  nameEn?: string;
  text: string;
  textEn?: string;
  borderClass: string; // কার্ডের উপরের রঙিন দাগ
};

export type Alumnus = {
  id: number;
  name: string;
  nameEn?: string;
  university: string;
  universityEn?: string;
  batch: string;
  batchEn?: string;
};

export type ParentReview = {
  id: number;
  quote: string;
  quoteEn?: string;
  name: string;
  nameEn?: string;
  role: string;
  roleEn?: string;
};

export type EventItem = {
  id: number;
  image: string;
  day?: string;
  month?: string;
  category: string;
  title: string;
  titleEn?: string;
  text: string;
  textEn?: string;
  categoryEn?: string;
};

export type GalleryPhoto = {
  id: number;
  image: string;
  caption: string;
  captionEn?: string;
};

export type Achievement = {
  id: number;
  icon: LucideIcon;
  number: string;
  label: string;
  labelEn?: string;
};

export type ResultPoint = { year: string; percent: number };

export type QuickItem = {
  id: number;
  icon: LucideIcon;
  title: string;
  titleEn?: string;
  text: string;
  textEn?: string;
  action: string;
  actionEn?: string;
  colorClass: string;
  href?: string; // ঐচ্ছিক: কার্ডে ক্লিক করলে কোথায় যাবে
};
