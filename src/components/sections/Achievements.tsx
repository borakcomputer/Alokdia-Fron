// "আমাদের অর্জন" — নীল ব্যান্ডে চারটি সংখ্যা
import type { Achievement } from "@/data/types";
import { useLanguage } from "@/lib/language";

export function Achievements({ items }: { items: Achievement[] }) {
  const { t, localized } = useLanguage();

  return (
    <section className="bg-navbar py-14 text-topbar-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-sm font-semibold tracking-widest text-accent">
          প্রতিষ্ঠানের সংক্ষিপ্ত পরিচিতি
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((s) => (
            <div key={s.id} className="rounded-2xl bg-primary-foreground/10 p-6 text-center">
              <s.icon className="mx-auto h-8 w-8 text-accent" />
              <div className="mt-3 text-3xl font-bold">{t(s.number)}</div>
              <div className="text-sm opacity-85">{localized(s.label, s.labelEn)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
