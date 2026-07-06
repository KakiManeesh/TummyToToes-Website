export type Category =
  | "Newborn"
  | "Maternity"
  | "Kids"
  | "Events"
  | "Fashion"
  | "Wedding";

export const categories: Category[] = [
  "Newborn",
  "Maternity",
  "Kids",
  "Events",
  "Fashion",
  "Wedding",
];

// Human-readable description of each gallery category. Used for SEO / GEO
// metadata so AI systems can more reliably interpret each category page.
export const CATEGORY_META: Record<Category, { title: string; description: string }> = {
  Newborn: {
    title: "Newborn Photography in Hyderabad",
    description:
      "Soft, natural newborn portraits captured in-studio by TummyToToes Studio in Hyderabad. Preserving the tiniest details of your baby's first days.",
  },
  Maternity: {
    title: "Maternity Photography in Hyderabad",
    description:
      "Elegant maternity portraits celebrating your pregnancy journey. Calm, gentle and timeless photography by TummyToToes Studio in Hyderabad.",
  },
  Kids: {
    title: "Kids Photography in Hyderabad",
    description:
      "Joyful, unscripted portraits of children being gloriously themselves. Kids photography sessions in Hyderabad by TummyToToes Studio.",
  },
  Events: {
    title: "Event Photography in Hyderabad",
    description:
      "Documentary and candid event coverage for ceremonies, parties and celebrations across Hyderabad by TummyToToes Studio.",
  },
  Fashion: {
    title: "Fashion Photography in Hyderabad",
    description:
      "Bold editorial fashion photography in Hyderabad. Crafted light, considered composition and personality-forward portraits by TummyToToes Studio.",
  },
  Wedding: {
    title: "Wedding Photography in Hyderabad",
    description:
      "Emotional, story-driven wedding photography covering rituals, candid moments and portraits across Hyderabad and beyond.",
  },
};