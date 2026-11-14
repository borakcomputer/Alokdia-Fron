// পেজের একদম নিচের ফুটার
import { ArrowRight, Facebook, Globe, Mail, MapPin, Phone } from "lucide-react";
import { SCHOOL, FACEBOOK_URL, FOOTER_LINKS } from "@/data/site";
import { logo } from "@/data/photos";
import { useLanguage } from "@/lib/language";

export function Footer() {
  const { t, localized } = useLanguage();

  return (
    <footer id="contact" className="bg-topbar text-topbar-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 rounded-full bg-card p-1"
            />
            <div>
              <b className="block text-lg">{localized(SCHOOL.nameBn, SCHOOL.nameEn)}</b>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-75">
            {localized(SCHOOL.footerText, SCHOOL.footerTextEn)}
          </p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-4 inline-flex items-center gap-2 font-semibold text-accent"
          >
            <Facebook className="icon-motion h-4 w-4" aria-hidden="true" />{" "}
            {t("ফেসবুক গ্রুপে যোগ দিন")}
          </a>
        </div>
        <div>
          <h4 className="font-bold text-accent">{t("দ্রুত লিংক")}</h4>
          <ul className="mt-3 space-y-1.5 text-sm opacity-85">
            {FOOTER_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="group inline-flex items-center gap-1.5">
                  <ArrowRight className="icon-motion h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {t(l.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-accent">{t("যোগাযোগ")}</h4>
          <ul className="mt-3 space-y-2 text-sm opacity-85">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0" />{" "}
              <a href={SCHOOL.mapUrl} target="_blank" rel="noreferrer">
                {localized(SCHOOL.address, SCHOOL.addressEn)}, {t("পোস্ট কোড")} {t(SCHOOL.postCode)}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0" />{" "}
              <a href={`tel:${SCHOOL.phone}`}> {t(SCHOOL.phoneDisplay)}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0" />{" "}
              <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>
            </li>
            <li className="flex gap-2">
              <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />{" "}
              <a href={SCHOOL.website} target="_blank" rel="noreferrer">
                {SCHOOL.website.replace("https://www.", "")}
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs opacity-70">
            {t(
              "ফোন ও ওয়েবসাইটের তথ্য অনলাইন ডিরেক্টরি থেকে নেওয়া; যোগাযোগের আগে বিদ্যালয় থেকে যাচাই করুন।",
            )}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-accent">{t("প্রতিষ্ঠানের তথ্য")}</h4>
          <div className="mt-3 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5 px-4">
            <div className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="opacity-75">{t("ইআইআইএন নম্বর")}</span>
              <strong>{t("114398")}</strong>
            </div>
            <div className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="opacity-75">{t("প্রতিষ্ঠাকাল")}</span>
              <strong>{t("১৯৯৫")}</strong>
            </div>
            <div className="flex items-center justify-between gap-3 py-3 text-sm">
              <span className="opacity-75">{t("শিক্ষার স্তর")}</span>
              <strong>{t("মাধ্যমিক")}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-rule" />
      <div className="flex flex-col items-center justify-between gap-1 px-10 py-4 text-center text-xs opacity-70 sm:flex-row sm:gap-2">
        <p>{localized(SCHOOL.copyright, SCHOOL.copyrightEn)}</p>
        <span className="hidden sm:inline" aria-hidden="true">
          ·
        </span>
        <p>
          Developed by{" "}
          <a
            href="https://mahedi-portfolio-v2.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-accent underline-offset-4 hover:underline"
          >
            Mahedi Hasan
          </a>
        </p>
      </div>
    </footer>
  );
}
