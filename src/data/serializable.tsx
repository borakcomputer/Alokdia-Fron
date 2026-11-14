// আইকন/অবজেক্ট বাদ দিয়ে "সাধারণ ডাটা" রূপ — এডমিন প্যানেল ও ডাটাবেসের জন্য
import { achievements } from "./achievements";
import { quickItems } from "./quickAccess";
import { results } from "./results";
import { iconName } from "./icons";
import type { Achievement, QuickItem } from "./types";

export type AchievementRow = Omit<Achievement, "icon"> & { icon: string };
export type QuickRow = Omit<QuickItem, "icon"> & { icon: string };
export type ResultRow = { id: number; exam: string; examEn?: string; year: string; percent: number };

export const defaultAchievementRows: AchievementRow[] = achievements.map((a) => ({ ...a, icon: iconName(a.icon) }));
export const defaultQuickRows: QuickRow[] = quickItems.map((q) => ({ ...q, icon: iconName(q.icon) }));
export const defaultResultRows: ResultRow[] = Object.entries(results).flatMap(([exam, pts], i) =>
  pts.map((p, j) => ({ id: i * 1000 + j + 1, exam, year: p.year, percent: p.percent })),
);
