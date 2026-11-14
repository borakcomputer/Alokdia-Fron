# এডমিন প্যানেল

**ঠিকানা:** `/admin` (যেমন `http://localhost:8080/admin`)
**প্রথম Super Admin login:** `.env`-এর `SUPER_ADMIN_USERNAME` এবং `SUPER_ADMIN_PASSWORD` ব্যবহার করুন।

## কী কী সম্পাদনা করা যায়

নোটিশ · সংবাদ ও অনুষ্ঠান · ফটো গ্যালারি · হোম স্লাইডার · বাণী/প্রশাসন · প্রাক্তন শিক্ষার্থী · অভিভাবকের মতামত ·
অর্জন/সংখ্যা · দ্রুত প্রবেশ কার্ড · ফলাফল চার্ট · স্কুলের তথ্য (ফোন, ইমেইল, ঠিকানা, ফুটার...)
(যোগ, সম্পাদনা, মোছা, উপর-নিচ করা, ছবি আপলোড, মূল তথ্যে ফেরা, ব্যাকআপ/রিস্টোর)

## কীভাবে কাজ করে

- `src/data/*.tsx` = মূল (ডিফল্ট) তথ্য, আগের মতোই আছে।
- সাইটের ডিফল্ট কনটেন্ট MongoDB-তে না থাকলে source defaults দেখায়।
- এডমিনের পরিবর্তনগুলো MongoDB-তে সেভ হয়; `localStorage` শুধু ব্রাউজার ক্যাশ।
- অ্যাডমিনে বাংলা ও English-এর জন্য আলাদা ইনপুট আছে। English ফাঁকা থাকলে সাইটের আগের অনুবাদ/বাংলা লেখা ব্যবহার হয়।

## MongoDB চালু করা

1. `.env`-এ `MONGODB_URI` সেট করুন। MongoDB Atlas ব্যবহার করলে URI-র database user/password-এর special character percent-encode করুন এবং Atlas Network Access-এ আপনার app server অনুমোদন করুন। URI secret হিসেবে রাখুন, commit/share করবেন না।
2. `admin_users` collection-এ Super Admin account আগে থেকে থাকলে username/password `.env`-এ রাখার দরকার নেই—login তথ্য MongoDB-তেই থাকে এবং password hash করা থাকে। একেবারে নতুন/খালি database-এ প্রথম Super Admin বানাতে হলে শুধু প্রথমবার চালুর জন্য `.env`-এ `SUPER_ADMIN_USERNAME` ও `SUPER_ADMIN_PASSWORD` দিন; account তৈরি হলে দুইটি entry মুছে দিন। Username ৩-৩২ অক্ষরের letters/numbers/`.`/`_`/`-` হবে; password কমপক্ষে ১২ অক্ষরের শক্তিশালী unique secret দিন।
3. `MONGODB_URI`-তে database name না থাকলে `.env`-এ ঐচ্ছিক `MONGODB_DB` দিন।
4. `npm run dev` চালান — এতে সাইট ও MongoDB API দুটোই চালু হবে।
5. MongoDB-তে `alokdia_data` collection-এ school content থাকবে। Admin account ও session আলাদা `admin_users`, `admin_sessions` collection-এ থাকবে।

## Super Admin ও registration

- নতুন database-এ প্রথম Super Admin server-side `.env` bootstrap credential দিয়ে তৈরি হয়; account তৈরি হওয়ার পর username ও password hash `admin_users` collection-এ থাকে। Login session MongoDB-তে থাকে; password scrypt দিয়ে hash করা হয়।
- Super Admin প্রথমবার Admin Panel খুললে source defaults থেকে missing editable collections ও school settings MongoDB-তে seed হয়। আগে থেকে MongoDB-তে থাকা কনটেন্ট overwrite হয় না; এরপর MongoDB-র কনটেন্টই সাইটে ব্যবহৃত হয়।
- লগইন করতে পারলে `/admin` → **Settings & Backup** থেকে বর্তমান password দিয়ে username এবং password বদলান। Username ৩-৩২ অক্ষরের letters/numbers/`.`/`_`/`-` হতে হবে; password কমপক্ষে ১২ অক্ষরের unique secret দিন। Password password manager-এ রাখুন; চ্যাটে বা source code-এ লিখবেন না।
- Super Admin password ভুলে গেলে login page-এর **Forgot password?** চাপুন। Reset link শুধু `.env`-এর `SUPER_ADMIN_EMAIL` ঠিকানায় যাবে; link ৩০ মিনিটে মেয়াদোত্তীর্ণ হয়, একবারই ব্যবহার করা যায়, এবং reset হলে সব Super Admin session বাতিল হয়। এই link অন্য admin account-এর password reset করতে পারে না।
- Email recovery চালু করতে `.env`-এ `SUPER_ADMIN_EMAIL`, Resend-এর `RESEND_API_KEY`, Resend-এ verified sender হিসেবে `RESET_EMAIL_FROM`, এবং login page-এর base URL হিসেবে `ADMIN_PUBLIC_URL` সেট করুন। Resend account-এ sender domain verify করুন; API key server-এর `.env`-এ রাখুন, browser code-এ নয়। উদাহরণগুলো `.env.example`-এ আছে। `.env` বদলানোর পর app server restart করুন।
- Super Admin email inbox-এ প্রবেশাধিকার না থাকলে, MongoDB-তে যুক্ত কম্পিউটারে:
  1. চালু থাকা app বন্ধ করুন।
  2. `.env`-এ নতুন `SUPER_ADMIN_USERNAME` ও কমপক্ষে ১২ অক্ষরের `SUPER_ADMIN_PASSWORD` দিন। Username যেন অন্য admin account-এর সঙ্গে না মেলে।
  3. MongoDB Compass-এ app-এর database → `admin_users` খুলে শুধু `role: "superadmin"` account-এর document মুছুন। Collection বা database মুছবেন না।
  4. `npm run dev` চালু করুন। Server `.env` থেকে নতুন Super Admin তৈরি করবে; এরপর `.env` থেকে দুইটি bootstrap credential মুছে রাখুন এবং নতুন তথ্য নিরাপদে সংরক্ষণ করুন।
- `.env` বদলালেই আগে থেকে থাকা Super Admin-এর credential বদলায় না—এগুলো শুধু Super Admin account না থাকলে প্রথম account তৈরি করতে ব্যবহৃত হয়। প্রকাশিত/hosted deployment-এ এই local পদ্ধতি প্রযোজ্য নয়; deployment-এর অনুমোদিত database/server administrator-এর সাহায্য নিন।
- `/admin` login-এ যে কেউ registration request দিতে পারে; কোনো invitation লাগে না। Request সঙ্গে সঙ্গে MongoDB-র `admin_users` collection-এ **pending** status-এ জমা হয়। Super Admin **Admin Accounts** থেকে approve না করা পর্যন্ত login করতে পারবে না।
- Super Admin **Admin Accounts** থেকে যেকোনো Admin account delete করতে পারে। Delete করলে account-এর সব active session বাতিল হয়; account-টি আর login করতে পারে না। Super Admin account এই তালিকা থেকে delete করা যায় না।
- Collection ও school data write করতে authenticated admin session লাগে। Public website কেবল প্রকাশিত content পড়ে।
- Super Admin তৈরির আগে থেকে থাকা browser-only admin login আর কাজ করবে না; MongoDB-তে তৈরি Super Admin account দিয়ে sign in করুন।

## সীমাবদ্ধতা ও নিরাপত্তা

- এই database API শুধু এই কম্পিউটারে (`127.0.0.1`) চলে। অনলাইন/প্রকাশিত সাইটে ডেটা দিতে হলে hosted backend লাগবে; MongoDB-কে সরাসরি browser-এ expose করবেন না।
- `.env` version control-এ যোগ করবেন না। MongoDB URI-তে credentials থাকে—এটি client-side code-এ ব্যবহার করবেন না।
- এই database API শুধু loopback interface-এ চলে; এটি production/hosted authentication ব্যবস্থা নয়।
- সাইটের default logo ও ছবিগুলো ImgBB-তে রাখা; MongoDB content-এ শুধু ছবির URL থাকে। অ্যাডমিনে আপলোড করা নতুন ছবিও ImgBB-তে পাঠানো হয়। `IMGBB_API_KEY`-কে server-side secret হিসেবে `.env`/server environment-এ রাখুন, browser/VITE environment variable হিসেবে নয়।
- ছবির local asset-গুলো নতুন করে ImgBB-তে migrate করতে `node --env-file-if-exists=.env scripts/migrate-default-images.mjs` চালান। Migration map MongoDB-তে রাখা হয়, তাই script আবার চালালে একই ছবিগুলো পুনরায় upload হয় না।
- Local API loopback-only এবং admin endpoints session-guarded। Public hosting-এর আগে HTTPS, production session settings, network binding, and deployment authentication policy review করুন।

## নতুন কিছু সম্পাদনার তালিকায় যোগ করতে

`src/routes/admin.tsx` এর `SECTIONS` এ একটা এন্ট্রি যোগ করুন, `CollectionKey` (admin-store.ts) ও `server/index.mjs`-এর allowlist-এ নতুন key। দ্বিভাষিক ফিল্ডে বাংলা key-এর পাশে `En` যোগ করুন (যেমন `title` ও `titleEn`)।
