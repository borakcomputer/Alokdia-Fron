// ======================================================================
// এডমিন ডাটা স্টোর
//  • ডিফল্ট ডাটা = src/data/*.tsx (যেমন আছে তেমনই থাকে)
//  • এডমিন প্যানেলে যা বদলানো হয় তা MongoDB-তে থাকে, localStorage শুধু ক্যাশ
//  • ওয়েবসাইট প্রথমে ডিফল্ট দেখায়, তারপর সেভ করা ডাটা থাকলে সেটা দেখায়
// ======================================================================
import { useCallback, useEffect, useState } from "react";
import { SCHOOL } from "@/data/site";

const PREFIX = "alokdia:data:";
const EVENT = "alokdia:data-changed";
const DATABASE_API = `http://${typeof window === "undefined" ? "127.0.0.1" : window.location.hostname}:8765/api`;

export type CollectionKey =
  | "notices"
  | "events"
  | "gallery"
  | "slides"
  | "leaders"
  | "alumni"
  | "parents"
  | "achievements"
  | "quick"
  | "results";

const ALL_KEYS: CollectionKey[] = [
  "notices",
  "events",
  "gallery",
  "slides",
  "leaders",
  "alumni",
  "parents",
  "achievements",
  "quick",
  "results",
];

export function loadCollection<T>(key: CollectionKey): T[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T[]) : null;
  } catch {
    return null;
  }
}

function reportDatabaseFailure(error: unknown) {
  console.error("Could not save or load data from MongoDB:", error);
  if (typeof window !== "undefined") {
    const message = error instanceof Error ? error.message : "Database request failed";
    window.dispatchEvent(new CustomEvent("alokdia:database-error", { detail: message }));
  }
}

async function databaseRequest<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  const init: RequestInit = { method };
  if (body !== undefined) {
    init.headers = { "content-type": "application/json" };
    init.body = JSON.stringify(body);
  }
  const response = await fetch(`${DATABASE_API}${path}`, { ...init, credentials: "include" });
  const result = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(result.error ?? `Database request failed (${response.status})`);
  return result;
}

function cacheCollection<T>(key: CollectionKey, items: T[]) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(items));
  } catch (error) {
    console.warn("Could not cache local database data in browser storage:", error);
  }
  window.dispatchEvent(new Event(EVENT));
}

async function syncCollectionFromDatabase<T>(key: CollectionKey, defaults: T[]): Promise<T[]> {
  const { items } = await databaseRequest<{ items: unknown[] | null }>(`/collections/${key}`);
  const cached = loadCollection<T>(key);
  if (items !== null) {
    cacheCollection(key, items);
    return items as T[];
  }
  const initialData = cached ?? defaults;
  cacheCollection(key, initialData);
  return initialData;
}

/** সেভ করে। জায়গা শেষ হলে false ফেরত দেয় (ছবি বেশি হলে এমন হয়)। */
export function saveCollection<T>(key: CollectionKey, items: T[]): boolean {
  cacheCollection(key, items);
  void databaseRequest(`/collections/${key}`, "PUT", items).catch(reportDatabaseFailure);
  return true;
}

export function resetCollection(key: CollectionKey) {
  window.localStorage.removeItem(PREFIX + key);
  window.dispatchEvent(new Event(EVENT));
  void databaseRequest(`/collections/${key}`, "DELETE").catch(reportDatabaseFailure);
}

export function hasOverride(key: CollectionKey) {
  return loadCollection(key) !== null;
}

/**
 * ওয়েবসাইট ও এডমিন — দুই জায়গাতেই এটা ব্যবহার হয়।
 * সার্ভার রেন্ডারে ডিফল্ট ফেরত দেয় (hydration mismatch এড়াতে),
 * ব্রাউজারে লোড হওয়ার পর সেভ করা ডাটা বসায়।
 */
export function useCollection<T>(key: CollectionKey, defaults: T[]): T[] {
  const [items, setItems] = useState<T[]>(defaults);

  const refresh = useCallback(() => {
    setItems(loadCollection<T>(key) ?? defaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    refresh();
    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", refresh);
    void syncCollectionFromDatabase<T>(key, defaults)
      .then((databaseItems) => setItems(databaseItems))
      .catch(reportDatabaseFailure);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return items;
}

// ---------------------------------------------------------------- ছবি

/** আপলোড করা ছবি ছোট করে (সর্বোচ্চ ১২০০px, JPEG) data URL বানায়, যাতে localStorage এ ধরে। */
export function fileToDataUrl(file: File, maxSize = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the image."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image file."));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

/** সব সেভ করা ডাটা এক ফাইলে (backup) */
export function exportAll(): string {
  const out: Record<string, unknown> = {};
  ALL_KEYS.forEach((k) => {
    const v = loadCollection(k);
    if (v) out[k] = v;
  });
  const school = loadSchool();
  if (school) out["school"] = school;
  return JSON.stringify(out, null, 2);
}

export function importAll(json: string): boolean {
  try {
    const data = JSON.parse(json) as Record<string, unknown>;
    Object.entries(data).forEach(([k, v]) => {
      if (k === "school" && v && typeof v === "object") saveSchool(v as Record<string, string>);
      else if (ALL_KEYS.includes(k as CollectionKey) && Array.isArray(v))
        saveCollection(k as CollectionKey, v);
    });
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------- স্কুলের তথ্য (ফোন, ইমেইল, ঠিকানা...)

export type SchoolInfo = typeof SCHOOL;
export const DEFAULT_SCHOOL: SchoolInfo = { ...SCHOOL };
const SCHOOL_KEY = PREFIX + "school";

export function loadSchool(): Partial<SchoolInfo> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SCHOOL_KEY);
    return raw ? (JSON.parse(raw) as Partial<SchoolInfo>) : null;
  } catch {
    return null;
  }
}

export async function syncSchoolFromDatabase() {
  const { school } = await databaseRequest<{ school: Partial<SchoolInfo> | null }>("/school");
  const cached = loadSchool();
  if (school) {
    window.localStorage.setItem(SCHOOL_KEY, JSON.stringify(school));
    window.dispatchEvent(new Event(EVENT));
  } else {
    const initialData = cached ?? DEFAULT_SCHOOL;
    window.localStorage.setItem(SCHOOL_KEY, JSON.stringify(initialData));
    window.dispatchEvent(new Event(EVENT));
  }
}

export function saveSchool(info: Partial<SchoolInfo>): boolean {
  try {
    window.localStorage.setItem(SCHOOL_KEY, JSON.stringify(info));
  } catch (error) {
    console.warn("Could not cache school settings in browser storage:", error);
  }
  window.dispatchEvent(new Event(EVENT));
  void databaseRequest("/school", "PUT", info).catch(reportDatabaseFailure);
  return true;
}

export function resetSchool() {
  window.localStorage.removeItem(SCHOOL_KEY);
  window.dispatchEvent(new Event(EVENT));
  void databaseRequest("/school", "DELETE").catch(reportDatabaseFailure);
}

/** সেভ করা তথ্য SCHOOL অবজেক্টে বসায়। কিছু বদলালে true। */
export function applySchoolOverrides(): boolean {
  const next = { ...DEFAULT_SCHOOL, ...(loadSchool() ?? {}) };
  const changed = (Object.keys(next) as (keyof SchoolInfo)[]).some((k) => SCHOOL[k] !== next[k]);
  if (changed) Object.assign(SCHOOL, next);
  return changed;
}
