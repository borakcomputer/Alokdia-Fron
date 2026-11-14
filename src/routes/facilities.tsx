import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FlaskConical, Trophy } from "lucide-react";
import { ContentPage } from "@/components/shared/ContentPage";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/facilities")({
  head: () => ({ meta: [{ title: "সুবিধাসমূহ | আলোকদিয়া উচ্চ বিদ্যালয়" }] }),
  component: FacilitiesPage,
});

function FacilitiesPage() {
  const { localized } = useLanguage();
  const facilities = [
    { href: "/library", title: "পাঠাগার", titleEn: "Library", icon: BookOpen },
    { href: "/science-lab", title: "বিজ্ঞানাগার", titleEn: "Science Lab", icon: FlaskConical },
    { href: "/sports", title: "খেলাধুলা", titleEn: "Sports", icon: Trophy },
  ];

  return (
    <ContentPage
      title="সুবিধাসমূহ"
      titleEn="Facilities"
      intro="বিদ্যালয়ের পাঠাগার, বিজ্ঞানাগার ও খেলাধুলার তথ্য।"
      introEn="Information about the school library, science lab and sports."
    >
      <section className="dashboard-surface px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {facilities.map(({ href, title, titleEn, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="dashboard-panel flex items-center gap-4 p-6 font-bold hover:border-primary"
            >
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              {localized(title, titleEn)}
              <ArrowRight className="ml-auto h-5 w-5 text-primary" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
