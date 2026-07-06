import type { Metadata } from "next";
import GalleryPageClient, {
  categories,
  CATEGORY_META,
  type Category,
} from "./GalleryClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.tummytotoes.com";

const DEFAULT_DESCRIPTION =
  "Explore the full TummyToToes Studio photography portfolio. Newborn, maternity, kids, events, fashion and wedding photography captured across Hyderabad.";

const isCategory = (value: string | string[] | undefined): value is Category => {
  return typeof value === "string" && (categories as string[]).includes(value);
};

// Per-category SEO metadata so each gallery filter gets a unique, crawlable
// <head>. This makes the gallery indexable per-category for search engines
// and provides clean context for LLMs that may retrieve any of these URLs.
export function generateMetadata({
  searchParams,
}: {
  searchParams?: { category?: string | string[] };
}): Metadata {
  const categoryParam = searchParams?.category;
  if (!isCategory(categoryParam)) {
    return {
      title: "Photography Portfolio",
      description: DEFAULT_DESCRIPTION,
      alternates: { canonical: "/gallery" },
    };
  }

  const meta = CATEGORY_META[categoryParam];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/gallery?category=${categoryParam}`,
    },
    openGraph: {
      title: `${meta.title} | TummyToToes Studio`,
      description: meta.description,
      url: `${SITE_URL}/gallery?category=${categoryParam}`,
      type: "website",
    },
    twitter: {
      title: `${meta.title} | TummyToToes Studio`,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Lightweight ItemList / CollectionPage JSON-LD so the gallery structure is
// unambiguous to AI crawlers (helps AEO / GEO retrieval).
function GalleryJsonLd({ category }: { category?: Category }) {
  const baseDescription = category
    ? CATEGORY_META[category].description
    : DEFAULT_DESCRIPTION;

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category
      ? `${CATEGORY_META[category].title} | TummyToToes Studio`
      : "TummyToToes Studio Photography Portfolio",
    description: baseDescription,
    url: category
      ? `${SITE_URL}/gallery?category=${category}`
      : `${SITE_URL}/gallery`,
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
      name: "TummyToToes Studio",
    },
    about: {
      "@type": "Service",
      name: category ? `${category} Photography` : "Photography Services",
      provider: {
        "@type": "LocalBusiness",
        name: "TummyToToes Studio",
        url: SITE_URL,
        telephone: "+91-99665-31312",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kukatpally",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500072",
          addressCountry: "IN",
        },
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
    },
    hasPart: category
      ? undefined
      : categories.map((cat) => ({
          "@type": "WebPage",
          name: CATEGORY_META[cat].title,
          url: `${SITE_URL}/gallery?category=${cat}`,
        })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}

export default function GalleryPage({
  searchParams,
}: {
  searchParams?: { category?: string | string[] };
}) {
  const categoryParam = searchParams?.category;
  const initialCategory: Category | undefined = isCategory(categoryParam)
    ? categoryParam
    : undefined;

  return (
    <>
      <GalleryJsonLd category={initialCategory} />
      <GalleryPageClient initialCategory={initialCategory} />
    </>
  );
}
