# প্রজেক্টের কাঠামো (কোন ফাইলে কী আছে)

```
src/
├── routes/
│   ├── __root.tsx          ← পুরো সাইটের খোলস (html, font, 404, error)
│   └── index.tsx           ← হোমপেজ: শুধু সেকশনগুলো পরপর সাজানো
│
├── components/
│   ├── layout/             ← পেজের কাঠামো
│   │   ├── TopBar.tsx          উপরের ফোন/ইমেইল বার
│   │   ├── SiteHeader.tsx      লোগো + নাম + মেনু (মোবাইল মেনুসহ)
│   │   ├── NoticeTicker.tsx    চলমান নোটিশ
│   │   ├── LinkStrip.tsx       ছোট লিংকের সারি
│   │   └── Footer.tsx          ফুটার
│   ├── sections/           ← হোমপেজের একেকটা সেকশন (একটা ফাইল = একটা সেকশন)
│   │   ├── HeroSlider.tsx, NoticeBoard.tsx, Leaders.tsx, WelcomeBanner.tsx,
│   │   │   About.tsx, Alumni.tsx, ParentReviews.tsx, NewsEvents.tsx,
│   │   │   PhotoGallery.tsx, Achievements.tsx, ResultsChart.tsx, QuickAccess.tsx
│   ├── shared/SectionTitle.tsx   ← সব সেকশনের শিরোনাম
│   ├── admin/SuperAdminPanel.tsx ← Super Admin account, invite ও approval
│   └── ui/                 ← shadcn এর রেডিমেড বাটন/ডায়ালগ (হাত দেবেন না)
│
├── data/                   ← ডিফল্ট লেখা, ছবি, সংখ্যা
│   ├── types.tsx           ← প্রতিটি তথ্যের TypeScript ছাঁচ
│   ├── site.tsx            ← স্কুলের নাম, ফোন, মেনু, ফুটার লিংক
│   ├── photos.tsx          ← সব ছবির import
│   └── notices.tsx, slides.tsx, leaders.tsx, alumni.tsx, parents.tsx,
│       events.tsx, gallery.tsx, achievements.tsx, results.tsx, quickAccess.tsx
│
├── styles.css              ← রঙ (primary, secondary...) এখানে বদলান
└── assets/                 ← লোগো ও ছবির ফাইল
```

## কী বদলাতে কোন ফাইল?

| কাজ                         | ফাইল                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| ফোন, ইমেইল, EIIN, স্লোগান   | `data/site.tsx`                                                       |
| নতুন নোটিশ                  | `data/notices.tsx`                                                    |
| গ্যালারিতে ছবি              | ছবি `assets/photos/` এ রাখুন → `data/photos.tsx` → `data/gallery.tsx` |
| সভাপতি/প্রধান শিক্ষকের বাণী | `data/leaders.tsx`                                                    |
| ফলাফলের সংখ্যা              | `data/results.tsx`                                                    |
| সাইটের রঙ                   | `styles.css`                                                          |
| কোনো সেকশনের চেহারা/লেআউট   | `components/sections/<সেকশন>.tsx`                                     |
| সেকশনের ক্রম                | `routes/index.tsx`                                                    |
| নতুন সেকশন বানানো           | `components/sections/` এ ফাইল বানান → `routes/index.tsx` এ বসান       |

## ডেটা ও ডেটাবেস

- `src/data/*.tsx`-এ থাকা ডেটা সাইটের ডিফল্ট কনটেন্ট।
- লোকাল development-এ `server/index.mjs` MongoDB connection এবং `/api` endpoints পরিচালনা করে।
- `src/lib/admin-store.tsx` ব্রাউজারের ক্যাশ ও API sync করে; অ্যাডমিন সম্পাদনা MongoDB-তে রাখা হয়।
- সম্পাদনাযোগ্য bilingual লেখায় বাংলা ফিল্ডের পাশাপাশি English ফিল্ড থাকে, যেমন `title` ও `titleEn`।
- `npm run dev` চালাতে `.env`-এ `MONGODB_URI` থাকতে হবে।
- এটি local-only setup; প্রকাশিত/অনলাইন সাইটের জন্য hosted database ও backend আলাদা করে configure করতে হবে।
