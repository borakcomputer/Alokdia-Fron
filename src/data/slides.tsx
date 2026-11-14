import type { Slide } from "./types";
import { building, assembly, culturalGuests } from "./photos";

// হোমপেজের বড় স্লাইডার
export const slides: Slide[] = [
  { id: 1, image: building, position: "center 40%", title: "আলোকদিয়া উচ্চ বিদ্যালয় — শিক্ষাই আলো" },
  { id: 2, image: assembly, position: "center 70%", title: "প্রতিদিনের প্রাতঃকালীন সমাবেশ" },
  { id: 3, image: culturalGuests, position: "center 75%", title: "বার্ষিক সাংস্কৃতিক অনুষ্ঠান ও পুরস্কার বিতরণ" },
];
