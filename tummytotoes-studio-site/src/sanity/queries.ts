import { defineQuery } from "next-sanity";

// ─── Hero Slides ─────────────────────────────────────────────────────────────
// Returns all active hero slides sorted by display order
export const HERO_SLIDES_QUERY = defineQuery(`
  *[_type == "heroSlide" && active == true] | order(order asc) {
    _id,
    alt,
    order,
    image {
      secure_url,
      public_id,
    }
  }
`);

// ─── Packages ─────────────────────────────────────────────────────────────────
// Returns all packages sorted by display order
export const PACKAGES_QUERY = defineQuery(`
  *[_type == "package"] | order(order asc) {
    _id,
    title,
    price,
    features,
    bonusFeatures,
    featured,
    order
  }
`);

// ─── Gallery Panels ──────────────────────────────────────────────────────────
// Returns homepage gallery showcase panels sorted by display order
export const GALLERY_PANELS_QUERY = defineQuery(`
  *[_type == "galleryPanel"] | order(order asc) {
    _id,
    title,
    description,
    category,
    objectPosition,
    coverImage {
      secure_url,
      public_id,
    }
  }
`);

// ─── Gallery Category (Cloudinary Folders) ──────────────────────────────────
// Returns the gallery category document and its images matching the category slug
export const GALLERY_CATEGORY_QUERY = defineQuery(`
  *[_type == "galleryCategory" && category == $category][0] {
    _id,
    title,
    category,
    images[] {
      secure_url,
      public_id,
      width,
      height
    }
  }
`);
