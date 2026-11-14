import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Globe, ArrowRight, Clock3, Send } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { LinkStrip } from "@/components/layout/LinkStrip";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { leaders as defaultLeaders } from "@/data/leaders";
import { useCollection } from "@/lib/admin-store";
import { SCHOOL } from "@/data/site";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "যোগাযোগ | আলোকদিয়া উচ্চ বিদ্যালয়" },
      {
        name: "description",
        content: "আলোকদিয়া উচ্চ বিদ্যালয়, মধুপুর, টাঙ্গাইলের ঠিকানা ও যোগাযোগের তথ্য।",
      },
    ],
  }),
  component: ContactPage,
});

const FIELD =
  "ct-field mt-1.5 w-full rounded-xl bg-background px-4 py-3 font-normal outline-none";

function ContactPage() {
  const leaders = useCollection("leaders", defaultLeaders);
  const { t, localized } = useLanguage();
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = String(formData.get("subject") ?? "");
    const body = [
      `${t("নাম")}: ${String(formData.get("name") ?? "")}`,
      `${t("ইমেইল")}: ${String(formData.get("email") ?? "")}`,
      "",
      String(formData.get("message") ?? ""),
    ].join("\n");
    const mailto = `mailto:${SCHOOL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setFormMessage(t("আপনার ইমেইল অ্যাপে বার্তাটি পাঠানোর জন্য প্রস্তুত করা হয়েছে।"));
  };

  const details: {
    icon: typeof MapPin;
    title: string;
    content: string;
    contentEn?: string;
    href: string;
    action: string;
  }[] = [
    {
      icon: MapPin,
      title: "ঠিকানা",
      content: `${SCHOOL.address}, ${t("পোস্ট কোড")} ${t(SCHOOL.postCode)}`,
      contentEn: `${SCHOOL.addressEn}, Postcode ${t(SCHOOL.postCode)}`,
      href: SCHOOL.mapUrl,
      action: "মানচিত্রে দেখুন",
    },
    {
      icon: Phone,
      title: "ফোন",
      content: SCHOOL.phoneDisplay,
      href: `tel:${SCHOOL.phone}`,
      action: "ফোন করুন",
    },
    {
      icon: Mail,
      title: "ইমেইল",
      content: SCHOOL.email,
      href: `mailto:${SCHOOL.email}`,
      action: "ইমেইল পাঠান",
    },
    {
      icon: Globe,
      title: "ওয়েবসাইট",
      content: SCHOOL.website.replace("https://www.", ""),
      href: SCHOOL.website,
      action: "ওয়েবসাইট দেখুন",
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-background font-sans">
      <TopBar />
      <SiteHeader leaders={leaders} />
      <LinkStrip />

      <main>
        <section className="relative isolate overflow-hidden bg-navbar px-4 py-16 text-topbar-foreground sm:py-24">
          <div className="ct-blob ct-blob-a" aria-hidden="true" />
          <div className="ct-blob ct-blob-b" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]"
            aria-hidden="true"
          />
          <div className="ct-rise relative mx-auto max-w-7xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <span className="h-0.5 w-8 bg-accent" /> {t("যোগাযোগ")}
            </p>
            <h1 className="mt-3 text-4xl font-bold sm:text-6xl">{t("যোগাযোগ করুন")}</h1>
            <p className="mt-4 max-w-2xl text-base opacity-85 sm:text-lg">
              {t("আলোকদিয়া উচ্চ বিদ্যালয়ের সঙ্গে যোগাযোগ করতে নিচের তথ্য ব্যবহার করুন।")}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
              <a href="/" className="hover:text-accent">
                {t("হোম")}
              </a>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <span>{t("যোগাযোগ")}</span>
            </div>
          </div>
        </section>

        <section className="dashboard-surface px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-secondary">
                  <span className="h-0.5 w-8 bg-secondary" /> {t("যোগাযোগের তথ্য")}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-primary">
                  {t("আমাদের সঙ্গে যোগাযোগ করুন")}
                </h2>
                <div className="mt-2 h-1 w-16 rounded bg-rule" />
                <p className="mt-4 text-muted-foreground">
                  {t("ঠিকানা, ফোন বা ইমেইলের মাধ্যমে বিদ্যালয়ের সঙ্গে যোগাযোগ করুন।")}
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {details.map(({ icon: Icon, title, content, contentEn, href, action }, i) => (
                    <div
                      key={title}
                      style={{ "--i": i } as React.CSSProperties}
                      className="ct-card dashboard-panel p-5"
                    >
                      <span className="ct-icon grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-bold">{t(title)}</h3>
                      <p className="mt-1 break-words text-sm text-muted-foreground">
                        {title === "ঠিকানা" ? localized(content, contentEn) : t(content)}
                      </p>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className="ct-link mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                      >
                        {t(action)} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-3 rounded-xl border border-secondary/30 bg-secondary/5 p-4 text-sm">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <p className="text-muted-foreground">
                    {t("বিদ্যালয়ের অফিস সময় অনলাইনে নিশ্চিত করা যায়নি। যাওয়ার আগে ফোনে জেনে নিন।")}
                  </p>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {t("ফোন নম্বর ও ওয়েবসাইট অনলাইন ডিরেক্টরি থেকে নেওয়া; বিদ্যালয় থেকে যাচাই করুন।")}
                </p>
              </div>

              <div
                style={{ "--i": 2 } as React.CSSProperties}
                className="ct-card dashboard-panel dashboard-panel-accent h-fit p-5 sm:p-8 lg:sticky lg:top-20"
              >
                <p className="flex items-center gap-2 text-sm font-bold text-secondary">
                  <Send className="h-4 w-4" aria-hidden="true" /> {t("বার্তা পাঠান")}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{t("আপনার কোনো প্রশ্ন আছে?")}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("ফর্মটি পূরণ করলে আপনার ডিভাইসের ইমেইল অ্যাপে বার্তার খসড়া তৈরি হবে।")}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold">
                      {t("নাম")}
                      <input
                        required
                        name="name"
                        placeholder="Your Full Name"
                        autoComplete="name"
                        className={FIELD}
                      />
                    </label>
                    <label className="block text-sm font-semibold">
                      {t("ইমেইল")}
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        autoComplete="email"
                        className={FIELD}
                      />
                    </label>
                  </div>
                  <label className="block text-sm font-semibold">
                    {t("বিষয়")}
                    <input required name="subject" className={FIELD} />
                  </label>
                  <label className="block text-sm font-semibold">
                    {t("আপনার বার্তা")}
                    <textarea
                      required
                      name="message"
                      placeholder="Message"
                      rows={5}
                      className={`${FIELD} resize-y`}
                    />
                  </label>
                  <button
                    type="submit"
                    className="ct-submit inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    {t("ইমেইল অ্যাপে বার্তা খুলুন")} <ArrowRight className="h-4 w-4" />
                  </button>
                  {formMessage && (
                    <p
                      role="status"
                      className="ct-status rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary"
                    >
                      {formMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>

            <div className="ct-map dashboard-panel mt-8 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold">
                    <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
                    {t("বিদ্যালয়ের অবস্থান")}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {localized(SCHOOL.address, SCHOOL.addressEn)}
                  </p>
                </div>
                <a
                  href={SCHOOL.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {t("গুগল ম্যাপে খুলুন")}
                </a>
              </div>
              <iframe
                title={t("বিদ্যালয়ের মানচিত্র")}
                src="https://maps.google.com/maps?q=H24X%2BRJF%2C%20Sonkhula-Alokdia%20Road&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 sm:h-96"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



// ==old===>>

// import { useState, type FormEvent } from "react";
// import { createFileRoute } from "@tanstack/react-router";
// import { Mail, MapPin, Phone, Globe, ArrowRight, Clock3 } from "lucide-react";
// import { Footer } from "@/components/layout/Footer";
// import { LinkStrip } from "@/components/layout/LinkStrip";
// import { SiteHeader } from "@/components/layout/SiteHeader";
// import { TopBar } from "@/components/layout/TopBar";
// import { leaders as defaultLeaders } from "@/data/leaders";
// import { useCollection } from "@/lib/admin-store";
// import { SCHOOL } from "@/data/site";
// import { useLanguage } from "@/lib/language";

// export const Route = createFileRoute("/contact-us")({
//   head: () => ({
//     meta: [
//       { title: "যোগাযোগ | আলোকদিয়া উচ্চ বিদ্যালয়" },
//       {
//         name: "description",
//         content: "আলোকদিয়া উচ্চ বিদ্যালয়, মধুপুর, টাঙ্গাইলের ঠিকানা ও যোগাযোগের তথ্য।",
//       },
//     ],
//   }),
//   component: ContactPage,
// });

// function ContactPage() {
//   const leaders = useCollection("leaders", defaultLeaders);
//   const { t, localized } = useLanguage();
//   const [formMessage, setFormMessage] = useState("");

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const subject = String(formData.get("subject") ?? "");
//     const body = [
//       `${t("নাম")}: ${String(formData.get("name") ?? "")}`,
//       `${t("ইমেইল")}: ${String(formData.get("email") ?? "")}`,
//       "",
//       String(formData.get("message") ?? ""),
//     ].join("\n");
//     const mailto = `mailto:${SCHOOL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

//     window.location.href = mailto;
//     setFormMessage(t("আপনার ইমেইল অ্যাপে বার্তাটি পাঠানোর জন্য প্রস্তুত করা হয়েছে।"));
//   };

//   const details: {
//     icon: typeof MapPin;
//     title: string;
//     content: string;
//     contentEn?: string;
//     href: string;
//     action: string;
//   }[] = [
//     {
//       icon: MapPin,
//       title: "ঠিকানা",
//       content: `${SCHOOL.address}, ${t("পোস্ট কোড")} ${t(SCHOOL.postCode)}`,
//       contentEn: `${SCHOOL.addressEn}, Postcode ${t(SCHOOL.postCode)}`,
//       href: SCHOOL.mapUrl,
//       action: "মানচিত্রে দেখুন",
//     },
//     {
//       icon: Phone,
//       title: "ফোন",
//       content: SCHOOL.phoneDisplay,
//       href: `tel:${SCHOOL.phone}`,
//       action: "ফোন করুন",
//     },
//     {
//       icon: Mail,
//       title: "ইমেইল",
//       content: SCHOOL.email,
//       href: `mailto:${SCHOOL.email}`,
//       action: "ইমেইল পাঠান",
//     },
//     {
//       icon: Globe,
//       title: "ওয়েবসাইট",
//       content: SCHOOL.website.replace("https://www.", ""),
//       href: SCHOOL.website,
//       action: "ওয়েবসাইট দেখুন",
//     },
//   ];

//   return (
//     <div id="top" className="min-h-screen bg-background font-sans">
//       <TopBar />
//       <SiteHeader leaders={leaders} />
//       <LinkStrip />

//       <main>
//         <section className="relative overflow-hidden bg-navbar px-4 py-14 text-topbar-foreground sm:py-20">
//           <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
//           <div className="relative mx-auto max-w-7xl">
//             <p className="text-sm font-semibold text-accent">{t("যোগাযোগ")}</p>
//             <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{t("যোগাযোগ করুন")}</h1>
//             <p className="mt-3 max-w-2xl text-base opacity-85">
//               {t("আলোকদিয়া উচ্চ বিদ্যালয়ের সঙ্গে যোগাযোগ করতে নিচের তথ্য ব্যবহার করুন।")}
//             </p>
//             <div className="mt-5 flex items-center gap-2 text-sm opacity-75">
//               <a href="/">{t("হোম")}</a>
//               <ArrowRight className="h-4 w-4" />
//               <span>{t("যোগাযোগ")}</span>
//             </div>
//           </div>
//         </section>

//         <section className="dashboard-surface px-4 py-12 sm:py-16">
//           <div className="mx-auto max-w-7xl">
//             <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
//               <div>
//                 <p className="text-sm font-bold uppercase tracking-wider text-secondary">
//                   {t("যোগাযোগের তথ্য")}
//                 </p>
//                 <h2 className="mt-2 text-3xl font-bold text-primary">
//                   {t("আমাদের সঙ্গে যোগাযোগ করুন")}
//                 </h2>
//                 <p className="mt-3 text-muted-foreground">
//                   {t("ঠিকানা, ফোন বা ইমেইলের মাধ্যমে বিদ্যালয়ের সঙ্গে যোগাযোগ করুন।")}
//                 </p>

//                 <div className="mt-7 grid gap-4 sm:grid-cols-2">
//                   {details.map(({ icon: Icon, title, content, contentEn, href, action }) => (
//                     <article key={title} className="dashboard-panel p-5">
//                       <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
//                         <Icon className="h-5 w-5" />
//                       </span>
//                       <h3 className="mt-4 font-bold">{t(title)}</h3>
//                       <p className="mt-1 break-words text-sm text-muted-foreground">
//                         {title === "ঠিকানা" ? localized(content, contentEn) : t(content)}
//                       </p>
//                       <a
//                         href={href}
//                         target={href.startsWith("http") ? "_blank" : undefined}
//                         rel={href.startsWith("http") ? "noreferrer" : undefined}
//                         className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
//                       >
//                         {t(action)} <ArrowRight className="h-4 w-4" />
//                       </a>
//                     </article>
//                   ))}
//                 </div>

//                 <div className="mt-4 flex gap-3 rounded-xl border bg-card p-4 text-sm">
//                   <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
//                   <p className="text-muted-foreground">
//                     {t("বিদ্যালয়ের অফিস সময় অনলাইনে নিশ্চিত করা যায়নি। যাওয়ার আগে ফোনে জেনে নিন।")}
//                   </p>
//                 </div>
//                 <p className="mt-3 text-xs text-muted-foreground">
//                   {t("ফোন নম্বর ও ওয়েবসাইট অনলাইন ডিরেক্টরি থেকে নেওয়া; বিদ্যালয় থেকে যাচাই করুন।")}
//                 </p>
//               </div>

//               <div className="dashboard-panel p-5 sm:p-8">
//                 <p className="text-sm font-bold uppercase tracking-wider text-secondary">
//                   {t("বার্তা পাঠান")}
//                 </p>
//                 <h2 className="mt-2 text-2xl font-bold">{t("আপনার কোনো প্রশ্ন আছে?")}</h2>
//                 <p className="mt-2 text-sm text-muted-foreground">
//                   {t("ফর্মটি পূরণ করলে আপনার ডিভাইসের ইমেইল অ্যাপে বার্তার খসড়া তৈরি হবে।")}
//                 </p>

//                 <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <label className="block text-sm font-semibold">
//                       {t("নাম")}
//                       <input
//                         required
//                         name="name"
//                         placeholder="Your Full Name"
//                         autoComplete="name"
//                         className="mt-1.5 w-full rounded-lg border-amber-50 bg-background px-3 py-2.5 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                       />
//                     </label>
//                     <label className="block text-sm font-semibold">
//                       {t("ইমেইল")}
//                       <input
//                         required
//                         name="email"
//                         type="email"
//                         placeholder="Your Email"
//                         autoComplete="email"
//                         className="mt-1.5 w-full rounded-lg border-amber-50 bg-background px-3 py-2.5 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                       />
//                     </label>
//                   </div>
//                   <label className="block text-sm font-semibold">
//                     {t("বিষয়")}
//                     <input
//                       required
//                       name="subject"
//                       className="mt-1.5 w-full rounded-lg border-amber-50 bg-background px-3 py-2.5 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                     />
//                   </label>
//                   <label className="block text-sm font-semibold">
//                     {t("আপনার বার্তা")}
//                     <textarea
//                       required
//                       name="message"
//                       placeholder="Message"
//                       rows={5}
//                       className="mt-1.5 w-full resize-y rounded-lg border-amber-50 bg-background px-3 py-2.5 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
//                     />
//                   </label>
//                   <button
//                     type="submit"
//                     className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-card transition hover:-translate-y-0.5"
//                   >
//                     {t("ইমেইল অ্যাপে বার্তা খুলুন")} <ArrowRight className="h-4 w-4" />
//                   </button>
//                   {formMessage && (
//                     <p role="status" className="text-sm text-muted-foreground">
//                       {formMessage}
//                     </p>
//                   )}
//                 </form>
//               </div>
//             </div>

//             <div className="dashboard-panel mt-8 overflow-hidden">
//               <div className="flex flex-wrap items-center justify-between gap-3 p-5">
//                 <div>
//                   <h2 className="text-xl font-bold">{t("বিদ্যালয়ের অবস্থান")}</h2>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {localized(SCHOOL.address, SCHOOL.addressEn)}
//                   </p>
//                 </div>
//                 <a
//                   href={SCHOOL.mapUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
//                 >
//                   {t("গুগল ম্যাপে খুলুন")}
//                 </a>
//               </div>
//               <iframe
//                 title={t("বিদ্যালয়ের মানচিত্র")}
//                 src="https://maps.google.com/maps?q=H24X%2BRJF%2C%20Sonkhula-Alokdia%20Road&t=&z=15&ie=UTF8&iwloc=&output=embed"
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 className="h-72 w-full border-0 sm:h-96"
//               />
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }
