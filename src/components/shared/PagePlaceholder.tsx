import { Link } from "@tanstack/react-router";
import { ArrowRight, Newspaper } from "lucide-react";
import { useLanguage } from "@/lib/language";

export function PagePlaceholder() {
  const { t } = useLanguage();

  return (
    <section className="dashboard-surface px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="dashboard-panel mx-auto max-w-3xl p-8 text-center">
          <Newspaper className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold">{t("তথ্য শিগগির যোগ করা হবে")}</h2>
          <p className="mt-3 text-muted-foreground">
            {t(
              "এই পৃষ্ঠার নির্ভুল তথ্য বিদ্যালয় থেকে সংগ্রহ করে পরে যোগ করা হবে। আপাতত তথ্যের জন্য বিদ্যালয়ের সঙ্গে যোগাযোগ করুন।",
            )}
          </p>
          <Link
            to="/contact-us"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            {t("যোগাযোগ করুন")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
