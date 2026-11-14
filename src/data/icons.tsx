// Icons available in the admin panel. Add an entry here to make another icon available.
import {
  Award,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  FlaskConical,
  GraduationCap,
  Globe,
  Heart,
  IdCard,
  Landmark,
  Library,
  Mail,
  MapPin,
  Medal,
  Megaphone,
  Phone,
  School,
  Star,
  Trophy,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, { icon: LucideIcon; label: string }> = {
  CalendarDays: { icon: CalendarDays, label: "Calendar" },
  IdCard: { icon: IdCard, label: "ID Card" },
  BookOpen: { icon: BookOpen, label: "Book" },
  Landmark: { icon: Landmark, label: "Institution" },
  UserPlus: { icon: UserPlus, label: "Admission / New Member" },
  Megaphone: { icon: Megaphone, label: "Announcement" },
  FileText: { icon: FileText, label: "Document" },
  Phone: { icon: Phone, label: "Phone" },
  GraduationCap: { icon: GraduationCap, label: "Graduation Cap" },
  Trophy: { icon: Trophy, label: "Trophy" },
  Award: { icon: Award, label: "Award" },
  Medal: { icon: Medal, label: "Medal" },
  Star: { icon: Star, label: "Star" },
  Users: { icon: Users, label: "People" },
  School: { icon: School, label: "School" },
  Library: { icon: Library, label: "Library" },
  FlaskConical: { icon: FlaskConical, label: "Science" },
  Building2: { icon: Building2, label: "Building" },
  Bell: { icon: Bell, label: "Bell" },
  Mail: { icon: Mail, label: "Email" },
  MapPin: { icon: MapPin, label: "Address" },
  Globe: { icon: Globe, label: "Website" },
  Heart: { icon: Heart, label: "Heart" },
};

export const ICON_OPTIONS = Object.entries(ICONS).map(([value, { label }]) => ({ value, label }));

export function getIcon(name: string): LucideIcon {
  return ICONS[name]?.icon ?? Star;
}

export function iconName(icon: LucideIcon): string {
  return Object.entries(ICONS).find(([, v]) => v.icon === icon)?.[0] ?? "Star";
}
