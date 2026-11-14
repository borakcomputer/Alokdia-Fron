// ======================================================================
// Admin panel (/admin)
//  • Edit notices, news, gallery, slider, leadership, alumni, and parent reviews
//  • To add an editable section, add an entry to SECTIONS below
// ======================================================================
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  BarChart3,
  CalendarDays,
  Grid2x2,
  School,
  Trophy,
  Download,
  ExternalLink,
  Images,
  KeyRound,
  LayoutTemplate,
  LogOut,
  Newspaper,
  Pencil,
  Plus,
  Quote,
  RotateCcw,
  Trash2,
  Upload,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AdminLogin,
  adminApi,
  adminLogout,
  changeAdminPassword,
  changeAdminUsername,
  getAdminSession,
  type AdminUser,
} from "@/components/admin/AdminLogin";
import { SuperAdminPanel } from "@/components/admin/SuperAdminPanel";
import {
  DEFAULT_SCHOOL,
  exportAll,
  fileToDataUrl,
  hasOverride,
  importAll,
  loadSchool,
  resetSchool,
  saveSchool,
  type SchoolInfo,
  resetCollection,
  saveCollection,
  useCollection,
  type CollectionKey,
} from "@/lib/admin-store";
import { uploadImageToImgbb } from "@/lib/imgbb";
import { logo } from "@/data/photos";
import { notices } from "@/data/notices";
import { events, EVENT_CATEGORIES } from "@/data/events";
import { galleryPhotos } from "@/data/gallery";
import { slides } from "@/data/slides";
import { leaders } from "@/data/leaders";
import { alumni } from "@/data/alumni";
import { parentReviews } from "@/data/parents";
import { ICON_OPTIONS } from "@/data/icons";
import { defaultAchievementRows, defaultQuickRows, defaultResultRows } from "@/data/serializable";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Panel | Alokdia High School" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

// ---------------------------------------------------------------- Field types

type Field = {
  key: string;
  englishKey?: string;
  label: string;
  type: "text" | "textarea" | "image" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
  optional?: boolean;
  hint?: string;
};

type Item = { id: number } & Record<string, unknown>;

type Section = {
  key: CollectionKey;
  label: string;
  icon: typeof Bell;
  description: string;
  defaults: Item[];
  fields: Field[];
  /** Which fields appear as the item's title, subtitle, and image in the list. */
  titleKey: string;
  subtitleKey?: string;
  imageKey?: string;
  /** Minimum item count; the site requires at least one slider. */
  minItems?: number;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((m) => ({ value: m, label: m }));

const SECTIONS: Section[] = [
  {
    key: "notices",
    label: "Notices",
    icon: Bell,
    description: "Shown on the notice board and ticker. New notices are added to the top.",
    defaults: notices as Item[],
    titleKey: "title",
    fields: [
      {
        key: "title",
        englishKey: "titleEn",
        label: "Notice title",
        type: "textarea",
        placeholder: "e.g. Annual exam schedule published",
      },
      { key: "day", label: "Day", type: "text", placeholder: "21" },
      { key: "month", label: "Month", type: "select", options: MONTHS },
    ],
  },
  {
    key: "events",
    label: "News & Events",
    icon: Newspaper,
    description: "Cards shown in the homepage News & Events section.",
    defaults: events as Item[],
    titleKey: "title",
    subtitleKey: "category",
    imageKey: "image",
    fields: [
      { key: "title", englishKey: "titleEn", label: "Title", type: "text" },
      { key: "text", englishKey: "textEn", label: "Summary", type: "textarea" },
      {
        key: "category",
        englishKey: "categoryEn",
        label: "Category",
        type: "select",
        options: EVENT_CATEGORIES.slice(1).map((value, index) => ({
          value,
          label: ["General", "Academic", "Sports", "Cultural"][index] ?? "Other",
        })),
      },
      { key: "image", label: "Image", type: "image" },
      { key: "day", label: "Day", type: "text", optional: true, placeholder: "15" },
      {
        key: "month",
        label: "Month",
        type: "select",
        options: [{ value: "", label: "— None —" }, ...MONTHS],
        optional: true,
      },
    ],
  },
  {
    key: "gallery",
    label: "Photo Gallery",
    icon: Images,
    description: "Manage gallery photos. Uploaded images are resized to 1200 px.",
    defaults: galleryPhotos as Item[],
    titleKey: "caption",
    imageKey: "image",
    fields: [
      { key: "image", label: "Image", type: "image" },
      { key: "caption", englishKey: "captionEn", label: "Caption", type: "text" },
    ],
  },
  {
    key: "slides",
    label: "Homepage Slider",
    icon: LayoutTemplate,
    description: "Large images at the top of the homepage. Landscape photos work best.",
    defaults: slides as Item[],
    titleKey: "title",
    imageKey: "image",
    minItems: 1,
    fields: [
      { key: "image", label: "Image", type: "image" },
      { key: "title", englishKey: "titleEn", label: "Overlay text", type: "text" },
      {
        key: "position",
        label: "Image position",
        type: "select",
        options: [
          { value: "center 20%", label: "Top" },
          { value: "center 40%", label: "Upper middle" },
          { value: "center 50%", label: "Center" },
          { value: "center 70%", label: "Lower middle" },
          { value: "center 90%", label: "Bottom" },
        ],
      },
    ],
  },
  {
    key: "leaders",
    label: "Leadership",
    icon: UserRound,
    description: "Information and messages from the chairperson and head teacher.",
    defaults: leaders as Item[],
    titleKey: "name",
    subtitleKey: "tag",
    fields: [
      {
        key: "tag",
        englishKey: "tagEn",
        label: "Role / label",
        type: "text",
        placeholder: "Current head teacher",
      },
      { key: "name", englishKey: "nameEn", label: "Name", type: "text" },
      { key: "text", englishKey: "textEn", label: "Message / description", type: "textarea" },
      {
        key: "borderClass",
        label: "Card accent color",
        type: "select",
        options: [
          { value: "border-t-primary", label: "Green" },
          { value: "border-t-secondary", label: "Red" },
        ],
      },
    ],
  },
  {
    key: "alumni",
    label: "Alumni",
    icon: Users,
    description: "List of successful alumni.",
    defaults: alumni as Item[],
    titleKey: "name",
    subtitleKey: "university",
    fields: [
      { key: "name", englishKey: "nameEn", label: "Name", type: "text" },
      { key: "university", englishKey: "universityEn", label: "Current institution", type: "text" },
      {
        key: "batch",
        englishKey: "batchEn",
        label: "Class / batch",
        type: "text",
        placeholder: "Class of 2020",
      },
    ],
  },
  {
    key: "parents",
    label: "Parent Reviews",
    icon: Quote,
    description: "Comments and testimonials from parents.",
    defaults: parentReviews as Item[],
    titleKey: "name",
    subtitleKey: "quote",
    fields: [
      { key: "quote", englishKey: "quoteEn", label: "Review", type: "textarea" },
      { key: "name", englishKey: "nameEn", label: "Name", type: "text" },
      {
        key: "role",
        englishKey: "roleEn",
        label: "Relationship",
        type: "text",
        placeholder: "Parent of a grade 10 student",
      },
    ],
  },
  {
    key: "achievements",
    label: "Achievements & Statistics",
    icon: Trophy,
    description: "Numbers and statistics shown in the blue band (e.g. 1995 — year established).",
    defaults: defaultAchievementRows as Item[],
    titleKey: "number",
    subtitleKey: "label",
    fields: [
      { key: "number", label: "Number / text", type: "text", placeholder: "1995" },
      {
        key: "label",
        englishKey: "labelEn",
        label: "Label",
        type: "text",
        placeholder: "Year established",
      },
      { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
    ],
  },
  {
    key: "quick",
    label: "Quick Access Cards",
    icon: Grid2x2,
    description:
      "Colorful cards near the bottom of the homepage. Leave the link blank to use its default destination.",
    defaults: defaultQuickRows as Item[],
    titleKey: "title",
    subtitleKey: "text",
    fields: [
      { key: "title", englishKey: "titleEn", label: "Title", type: "text" },
      { key: "text", englishKey: "textEn", label: "Description", type: "text" },
      {
        key: "action",
        englishKey: "actionEn",
        label: "Button text",
        type: "text",
        placeholder: "Apply now",
      },
      {
        key: "href",
        label: "Link",
        type: "text",
        optional: true,
        placeholder: "/admission or https://...",
      },
      { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
      {
        key: "colorClass",
        label: "Card color",
        type: "select",
        options: [
          { value: "bg-gradient-to-br from-blue-700 to-blue-500", label: "Blue" },
          { value: "bg-gradient-to-br from-emerald-700 to-emerald-500", label: "Green" },
          { value: "bg-gradient-to-br from-orange-600 to-orange-400", label: "Orange" },
          { value: "bg-gradient-to-br from-rose-700 to-rose-500", label: "Red" },
          { value: "bg-gradient-to-br from-purple-700 to-purple-500", label: "Purple" },
          { value: "bg-gradient-to-br from-teal-700 to-teal-500", label: "Teal" },
        ],
      },
    ],
  },
  {
    key: "results",
    label: "Results",
    icon: BarChart3,
    description:
      "Results chart. Entries with the same exam name are grouped into one chart. Enter a pass rate from 0 to 100.",
    defaults: defaultResultRows as Item[],
    titleKey: "year",
    subtitleKey: "exam",
    fields: [
      { key: "exam", englishKey: "examEn", label: "Exam name", type: "text", placeholder: "SSC" },
      { key: "year", label: "Year", type: "text", placeholder: "2025" },
      { key: "percent", label: "Pass rate (%)", type: "text", placeholder: "92" },
    ],
  },
];

// ---------------------------------------------------------------- Page

type TabKey = CollectionKey | "school" | "settings" | "accounts";

function AdminPage() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [tab, setTab] = useState<TabKey>("notices");

  useEffect(() => {
    void getAdminSession()
      .then(setUser)
      .catch((error) => console.error("Could not verify admin session:", error))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (user?.role !== "superadmin") return;
    const collections = Object.fromEntries(SECTIONS.map(({ key, defaults }) => [key, defaults]));
    void adminApi("/admin/seed-defaults", { collections, school: DEFAULT_SCHOOL }).catch((error) =>
      console.error("Could not save initial school data to MongoDB:", error),
    );
  }, [user]);

  if (!ready) return <div className="min-h-screen bg-background" />;
  if (!user) return <AdminLogin onSuccess={setUser} />;

  const section = SECTIONS.find((s) => s.key === tab);

  return (
    <div className="min-h-screen bg-muted/40 font-sans">
      <header className="sticky top-0 z-20 border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <img src={logo} alt="" className="h-9 w-9 object-contain" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold leading-tight">Admin Panel</h1>
            <p className="truncate text-xs text-muted-foreground">Alokdia High School</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/" target="_blank">
              <ExternalLink /> View Website
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              try {
                await adminLogout();
              } catch (error) {
                console.error("Could not end admin session:", error);
              } finally {
                setUser(null);
              }
            }}
          >
            <LogOut /> Log Out
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <nav
          className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible"
          aria-label="Admin menu"
        >
          {SECTIONS.map((s) => (
            <TabButton key={s.key} active={tab === s.key} onClick={() => setTab(s.key)}>
              <s.icon className="h-4 w-4" /> {s.label}
            </TabButton>
          ))}
          <TabButton active={tab === "school"} onClick={() => setTab("school")}>
            <School className="h-4 w-4" /> School Information
          </TabButton>
          <TabButton active={tab === "settings"} onClick={() => setTab("settings")}>
            <KeyRound className="h-4 w-4" /> Settings & Backup
          </TabButton>
          {user.role === "superadmin" && (
            <TabButton active={tab === "accounts"} onClick={() => setTab("accounts")}>
              <Users className="h-4 w-4" /> Admin Accounts
            </TabButton>
          )}
        </nav>

        <main className="min-w-0">
          {section ? (
            <CollectionManager key={section.key} section={section} />
          ) : tab === "school" ? (
            <SchoolPanel />
          ) : tab === "accounts" && user.role === "superadmin" ? (
            <AdminAccountsPanel />
          ) : (
            <SettingsPanel user={user} />
          )}
        </main>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active}
      className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
        active ? "bg-primary text-primary-foreground shadow" : "bg-card hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------- Collection manager

function CollectionManager({ section }: { section: Section }) {
  const items = useCollection<Item>(section.key, section.defaults);
  const [editing, setEditing] = useState<Item | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [customized, setCustomized] = useState(false);

  useEffect(() => setCustomized(hasOverride(section.key)), [items, section.key]);

  const flash = useCallback((type: "ok" | "err", text: string) => {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), 4000);
  }, []);

  useEffect(() => {
    const onDatabaseError = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      flash("err", `Could not save to the database: ${message}`);
    };
    window.addEventListener("alokdia:database-error", onDatabaseError);
    return () => window.removeEventListener("alokdia:database-error", onDatabaseError);
  }, [flash]);

  function persist(next: Item[], okText: string) {
    if (saveCollection(section.key, next)) flash("ok", okText);
    else
      flash(
        "err",
        "Could not save — browser storage is full. Remove some images or use smaller ones.",
      );
  }

  function startNew() {
    const blank: Item = { id: 0 };
    section.fields.forEach((f) => {
      blank[f.key] =
        f.type === "select" && f.options ? (f.optional ? "" : (f.options[0]?.value ?? "")) : "";
    });
    setIsNew(true);
    setEditing(blank);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function save(item: Item) {
    if (isNew) {
      const id = items.reduce((m, i) => Math.max(m, i.id), 0) + 1;
      // Notices and events are added to the top; other items are added to the bottom.
      const next =
        section.key === "notices" || section.key === "events"
          ? [{ ...item, id }, ...items]
          : [...items, { ...item, id }];
      persist(next, "Item added.");
    } else {
      persist(
        items.map((i) => (i.id === item.id ? item : i)),
        "Changes saved.",
      );
    }
    setEditing(null);
  }

  function remove(item: Item) {
    if (section.minItems && items.length <= section.minItems) {
      flash("err", `At least ${section.minItems} item(s) must remain.`);
      return;
    }
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    persist(
      items.filter((i) => i.id !== item.id),
      "Item deleted.",
    );
  }

  function move(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    const a = next[index]!;
    next[index] = next[j]!;
    next[j] = a;
    persist(next, "Order updated.");
  }

  function resetAll() {
    if (!window.confirm("Discard all changes in this section and restore the defaults?")) return;
    resetCollection(section.key);
    flash("ok", "Defaults restored.");
  }

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">{section.label}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
        </div>
        <div className="flex gap-2">
          {customized && (
            <Button variant="outline" size="sm" onClick={resetAll}>
              <RotateCcw /> Restore Defaults
            </Button>
          )}
          <Button size="sm" onClick={startNew}>
            <Plus /> Add New
          </Button>
        </div>
      </div>

      {notice && (
        <p
          role="status"
          className={`mt-4 rounded-lg border px-4 py-2 text-sm font-semibold ${
            notice.type === "ok"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {notice.text}
        </p>
      )}

      {editing && (
        <EditForm
          key={editing.id}
          section={section}
          initial={editing}
          isNew={isNew}
          onCancel={() => setEditing(null)}
          onSave={save}
          onError={(t) => flash("err", t)}
        />
      )}

      <ul className="mt-5 space-y-3">
        {items.length === 0 && (
          <li className="rounded-xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            Nothing here yet. Click “Add New” to create an item.
          </li>
        )}
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm"
          >
            {section.imageKey && (
              <img
                src={String(item[section.imageKey] ?? "")}
                alt=""
                className="h-14 w-20 shrink-0 rounded-md bg-muted object-cover"
              />
            )}
            {section.key === "notices" && (
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary text-center text-primary-foreground">
                <span className="leading-none">
                  <b className="block text-base">{String(item["day"])}</b>
                  <span className="text-[10px] uppercase">{String(item["month"])}</span>
                </span>
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-semibold">
                {String(item[section.titleKey] ?? "")}
              </p>
              {section.subtitleKey && (
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {String(item[section.subtitleKey] ?? "")}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Move up"
                disabled={index === 0}
                onClick={() => move(index, -1)}
              >
                <ArrowUp />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Move down"
                disabled={index === items.length - 1}
                onClick={() => move(index, 1)}
              >
                <ArrowDown />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit"
                onClick={() => {
                  setIsNew(false);
                  setEditing(item);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete"
                className="text-destructive"
                onClick={() => remove(item)}
              >
                <Trash2 />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------- Form

function EditForm({
  section,
  initial,
  isNew,
  onCancel,
  onSave,
  onError,
}: {
  section: Section;
  initial: Item;
  isNew: boolean;
  onCancel: () => void;
  onSave: (item: Item) => void;
  onError: (text: string) => void;
}) {
  const [draft, setDraft] = useState<Item>(initial);
  const [uploading, setUploading] = useState(false);

  const set = (key: string, value: unknown) => setDraft((d) => ({ ...d, [key]: value }));

  async function onFile(key: string, file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const image = await fileToDataUrl(file);
      const result = await uploadImageToImgbb({ data: { image } });
      set(key, result.url);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const missing = section.fields.find((f) => !f.optional && !String(draft[f.key] ?? "").trim());
    if (missing) {
      onError(`Please complete "${missing.label}".`);
      return;
    }
    if (section.key === "results") {
      const pct = Number(String(draft["percent"]).replace(/[^\d.]/g, ""));
      if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
        onError("Pass rate must be a number between 0 and 100 (for example, 92).");
        return;
      }
      onSave({ ...draft, percent: pct });
      return;
    }
    onSave(draft);
  }

  const inputCls =
    "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary";

  return (
    <form
      onSubmit={submit}
      className="mt-5 rounded-2xl border-2 border-primary/30 bg-card p-5 shadow-card"
    >
      <h3 className="font-bold">{isNew ? "Add New Item" : "Edit Item"}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {section.fields.map((f) => {
          const wide = f.type === "textarea" || f.type === "image";
          return (
            <div key={f.key} className={wide ? "sm:col-span-2" : ""}>
              <label className="text-sm font-semibold">
                {f.label}
                {f.englishKey && (
                  <span className="ml-1 font-normal text-muted-foreground">(Primary language)</span>
                )}
                {f.optional && (
                  <span className="ml-1 font-normal text-muted-foreground">(Optional)</span>
                )}
              </label>

              {f.type === "text" && (
                <input
                  className={inputCls}
                  value={String(draft[f.key] ?? "")}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              )}
              {f.type === "textarea" && (
                <textarea
                  rows={3}
                  className={inputCls}
                  value={String(draft[f.key] ?? "")}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              )}
              {f.type === "select" && (
                <select
                  className={inputCls}
                  value={String(draft[f.key] ?? "")}
                  onChange={(e) => set(f.key, e.target.value)}
                >
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
              {f.type === "image" && (
                <ImagePicker
                  value={String(draft[f.key] ?? "")}
                  uploading={uploading}
                  onFile={(file) => onFile(f.key, file)}
                />
              )}
            </div>
          );
        })}
        {section.fields.map((f) => {
          const englishKey = f.englishKey;
          if (!englishKey) return null;
          return (
            <label
              key={englishKey}
              className={
                f.type === "textarea"
                  ? "sm:col-span-2 text-sm font-semibold"
                  : "text-sm font-semibold"
              }
            >
              {f.label} (English)
              {f.type === "textarea" ? (
                <textarea
                  rows={3}
                  className={inputCls}
                  value={String(draft[englishKey] ?? "")}
                  onChange={(e) => set(englishKey, e.target.value)}
                />
              ) : (
                <input
                  className={inputCls}
                  value={String(draft[englishKey] ?? "")}
                  onChange={(e) => set(englishKey, e.target.value)}
                />
              )}
            </label>
          );
        })}
      </div>
      <div className="mt-5 flex gap-2">
        <Button type="submit" disabled={uploading}>
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function ImagePicker({
  value,
  uploading,
  onFile,
}: {
  value: string;
  uploading: boolean;
  onFile: (f: File | undefined) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="mt-1 flex items-center gap-4">
      <div className="grid h-24 w-40 shrink-0 place-items-center overflow-hidden rounded-lg border bg-muted text-xs text-muted-foreground">
        {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : "No image"}
      </div>
      <div>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => ref.current?.click()}
        >
          <Upload /> {uploading ? "Uploading…" : value ? "Change Image" : "Choose Image"}
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          JPG/PNG. Images are resized and uploaded to ImgBB.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Settings

function AdminAccountsPanel() {
  return <SuperAdminPanel />;
}

function SettingsPanel({ user }: { user: AdminUser }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [username, setUsername] = useState(user.username);
  const [nextUsername, setNextUsername] = useState(user.username);
  const [usernamePassword, setUsernamePassword] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function submitUsername(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = nextUsername.trim();
    try {
      await changeAdminUsername(usernamePassword, trimmed);
      setUsername(trimmed);
      setNextUsername(trimmed);
      setUsernamePassword("");
      setMsg({ type: "ok", text: "Username changed. Use it the next time you log in." });
    } catch (requestError) {
      setMsg({
        type: "err",
        text: requestError instanceof Error ? requestError.message : "Could not change username.",
      });
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (next.length < 8)
      return setMsg({ type: "err", text: "The new password must be at least 8 characters." });
    try {
      await changeAdminPassword(current, next);
      setMsg({ type: "ok", text: "Password changed." });
      setCurrent("");
      setNext("");
    } catch (requestError) {
      setMsg({
        type: "err",
        text: requestError instanceof Error ? requestError.message : "Could not change password.",
      });
    }
  }

  function download() {
    const blob = new Blob([exportAll()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `alokdia-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function restore(file: File | undefined) {
    if (!file) return;
    const ok = importAll(await file.text());
    setMsg(
      ok ? { type: "ok", text: "Backup restored." } : { type: "err", text: "Invalid backup file." },
    );
  }

  const inputCls =
    "mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary";

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Settings & Backup</h2>

      {msg && (
        <p
          role="status"
          className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
            msg.type === "ok"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {msg.text}
        </p>
      )}

      <form
        onSubmit={submitUsername}
        className="overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card"
      >
        <div className="flex items-start gap-4 border-b bg-background/50 p-5">
          <span className="rounded-xl bg-primary/10 p-3 text-primary">
            <UserRound className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-bold">Admin username</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Current username: <span className="font-semibold text-foreground">{username}</span>
            </p>
          </div>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            New username
            <input
              type="text"
              autoComplete="username"
              maxLength={64}
              className={inputCls}
              value={nextUsername}
              onChange={(e) => setNextUsername(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold">
            Confirm with current password
            <input
              type="password"
              autoComplete="current-password"
              className={inputCls}
              value={usernamePassword}
              onChange={(e) => setUsernamePassword(e.target.value)}
            />
          </label>
          <p className="text-xs text-muted-foreground sm:col-span-2">
            Username is stored in the school database.
          </p>
          <Button
            type="submit"
            className="w-fit"
            disabled={!usernamePassword || !nextUsername.trim()}
          >
            <UserRound /> Update Username
          </Button>
        </div>
      </form>

      <form onSubmit={submit} className="rounded-2xl border bg-card p-5">
        <h3 className="flex items-center gap-2 font-bold">
          <KeyRound className="h-4 w-4" /> Change Password
        </h3>
        <div className="mt-4 grid max-w-md gap-4">
          <label className="text-sm font-semibold">
            Current password
            <input
              type="password"
              className={inputCls}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold">
            New password
            <input
              type="password"
              className={inputCls}
              value={next}
              onChange={(e) => setNext(e.target.value)}
            />
          </label>
          <Button type="submit" className="w-fit" disabled={!current || !next}>
            Save Password
          </Button>
        </div>
      </form>

      <div className="rounded-2xl border bg-card p-5">
        <h3 className="flex items-center gap-2 font-bold">
          <CalendarDays className="h-4 w-4" /> Backup
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          School content is stored in MongoDB. Download a backup regularly; restoring it on another
          computer updates that computer's connected school database.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={download}>
            <Download /> Download Backup
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => restore(e.target.files?.[0])}
          />
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload /> Restore Backup
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- School information

const SCHOOL_FIELDS: {
  key: keyof SchoolInfo;
  englishKey?: keyof SchoolInfo;
  label: string;
  textarea?: boolean;
  hint?: string;
}[] = [
  { key: "nameBn", englishKey: "nameEn", label: "School name" },
  { key: "phone", label: "Phone number", hint: "Used in links: 01309114398" },
  { key: "phoneDisplay", label: "Displayed phone number", hint: "For example: 01309114398" },
  { key: "email", label: "Email" },
  { key: "address", englishKey: "addressEn", label: "Address" },
  { key: "postCode", label: "Postal code" },
  { key: "established", label: "Year established" },
  { key: "eiin", label: "EIIN number" },
  { key: "motto", englishKey: "mottoEn", label: "Motto / subtitle" },
  { key: "about", englishKey: "aboutEn", label: "About the school", textarea: true },
  { key: "footerText", englishKey: "footerTextEn", label: "Footer text", textarea: true },
  { key: "copyright", englishKey: "copyrightEn", label: "Copyright line" },
  { key: "website", label: "Website" },
  { key: "mapUrl", label: "Google Maps link" },
];

function SchoolPanel() {
  const [form, setForm] = useState<SchoolInfo>({ ...DEFAULT_SCHOOL, ...(loadSchool() ?? {}) });
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const inputCls =
    "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary";

  useEffect(() => {
    const onDatabaseError = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;
      setMsg({ type: "err", text: `Could not save to the database: ${message}` });
    };
    window.addEventListener("alokdia:database-error", onDatabaseError);
    return () => window.removeEventListener("alokdia:database-error", onDatabaseError);
  }, []);

  function save(e: React.FormEvent) {
    e.preventDefault();
    const ok = saveSchool(form);
    setMsg(
      ok
        ? { type: "ok", text: "School information saved." }
        : { type: "err", text: "Could not save changes." },
    );
  }

  function reset() {
    if (!window.confirm("Restore the default school information?")) return;
    resetSchool();
    setForm({ ...DEFAULT_SCHOOL });
    setMsg({ type: "ok", text: "Default information restored." });
  }

  return (
    <section>
      <h2 className="text-xl font-bold">School Information</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Update the school phone, email, address, footer, and other details everywhere they appear.
        Add English translations where available.
      </p>
      {msg && (
        <p
          role="status"
          className={`mt-4 rounded-lg border px-4 py-2 text-sm font-semibold ${
            msg.type === "ok"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {msg.text}
        </p>
      )}
      <form onSubmit={save} className="mt-5 rounded-2xl border bg-card p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {SCHOOL_FIELDS.map((f) => (
            <div key={f.key} className={f.textarea ? "sm:col-span-2" : ""}>
              <label className="text-sm font-semibold">
                {f.label}
                {f.englishKey && (
                  <span className="ml-1 font-normal text-muted-foreground">(Primary language)</span>
                )}
                {f.textarea ? (
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={String(form[f.key] ?? "")}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                ) : (
                  <input
                    className={inputCls}
                    value={String(form[f.key] ?? "")}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                )}
              </label>
              {f.englishKey && (
                <label className="mt-2 block text-sm font-semibold">
                  {f.label} (English)
                  {f.textarea ? (
                    <textarea
                      rows={3}
                      className={inputCls}
                      value={String(form[f.englishKey] ?? "")}
                      onChange={(e) => {
                        if (f.englishKey) setForm({ ...form, [f.englishKey]: e.target.value });
                      }}
                    />
                  ) : (
                    <input
                      className={inputCls}
                      value={String(form[f.englishKey] ?? "")}
                      onChange={(e) => {
                        if (f.englishKey) setForm({ ...form, [f.englishKey]: e.target.value });
                      }}
                    />
                  )}
                </label>
              )}
              {f.hint && (
                <span className="block text-xs font-normal text-muted-foreground">{f.hint}</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={reset}>
            <RotateCcw /> Restore Defaults
          </Button>
        </div>
      </form>
    </section>
  );
}
