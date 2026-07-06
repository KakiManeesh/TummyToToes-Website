import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { client } from "@/sanity/client";
import {
  HERO_SLIDES_QUERY,
  PACKAGES_QUERY,
  GALLERY_PANELS_QUERY,
} from "@/sanity/queries";
import type { GalleryPanelData } from "@/components/Gallery";
import type { PackageData } from "@/components/Packages";
import { cloudinaryOriginalUrl } from "@/lib/cloudinary";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.tummytotoes.com";

// ISR: revalidate every 60 seconds as a baseline; the webhook will revalidate instantly on publish
export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Newborn & Maternity Photographer in Hyderabad | TummyToToes Studio",
  description:
    "TummyToToes Studio captures newborn, maternity, kids, events, fashion and wedding moments in Hyderabad. Slow, intentional, emotionally honest photography by Surya Kiran.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Newborn & Maternity Photographer in Hyderabad | TummyToToes Studio",
    description:
      "TummyToToes Studio captures newborn, maternity, kids, events, fashion and wedding moments in Hyderabad.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    title:
      "Newborn & Maternity Photographer in Hyderabad | TummyToToes Studio",
    description:
      "TummyToToes Studio captures newborn, maternity, kids, events, fashion and wedding moments in Hyderabad.",
  },
};

export default async function IndexPage() {
  // Fetch all content from Sanity in parallel
  const [heroSlides, packages, galleryPanels] = await Promise.all([
    client.fetch(HERO_SLIDES_QUERY, {}, { next: { revalidate: 60, tags: ["heroSlide"] } }).catch(() => []),
    client.fetch(PACKAGES_QUERY, {}, { next: { revalidate: 60, tags: ["package"] } }).catch(() => []),
    client.fetch(GALLERY_PANELS_QUERY, {}, { next: { revalidate: 60, tags: ["galleryPanel"] } }).catch(() => []),
  ]);

  // Map Sanity hero slides to the shape Hero expects — preserving alt text
  // for SEO / GEO per-image optimisation.
  const heroImages: Array<{ url: string; alt: string }> = (
    heroSlides as Array<{
      alt?: string;
      image?: { secure_url?: string };
      category?: string;
    }>
  )
    .map((s) => {
      const url = cloudinaryOriginalUrl(s.image?.secure_url ?? "");
      if (!url) return null;
      const alt =
        s.alt?.trim() ||
        "TummyToToes Studio portfolio photograph from Hyderabad";
      return { url, alt };
    })
    .filter((v): v is { url: string; alt: string } => v !== null);

  // Map Sanity gallery panels to the shape Gallery expects.
  // Alt text is generated from the panel title + studio name for better image SEO.
  const galleryPanelsMapped: GalleryPanelData[] = (
    galleryPanels as Array<{
      _id: string;
      title: string;
      description: string;
      category: string;
      objectPosition?: string;
      coverImage?: { secure_url?: string };
    }>
  ).map((p) => ({
    _id: p._id,
    src: cloudinaryOriginalUrl(p.coverImage?.secure_url ?? ""),
    title: p.title,
    description: p.description,
    alt: `${p.title} portrait — ${p.category} photography by TummyToToes Studio, Hyderabad`,
    category: p.category,
    objectPosition: p.objectPosition,
  })).filter((p) => p.src);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero images={heroImages} />
        <About />
        <Gallery panels={galleryPanelsMapped.length > 0 ? galleryPanelsMapped : undefined} />
        <Packages packages={(packages as PackageData[]).length > 0 ? (packages as PackageData[]) : undefined} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
