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

// ISR: revalidate every 60 seconds as a baseline; the webhook will revalidate instantly on publish
export const revalidate = 60;

export default async function IndexPage() {
  // Fetch all content from Sanity in parallel
  const [heroSlides, packages, galleryPanels] = await Promise.all([
    client.fetch(HERO_SLIDES_QUERY, {}, { next: { revalidate: 60, tags: ["heroSlide"] } }).catch(() => []),
    client.fetch(PACKAGES_QUERY, {}, { next: { revalidate: 60, tags: ["package"] } }).catch(() => []),
    client.fetch(GALLERY_PANELS_QUERY, {}, { next: { revalidate: 60, tags: ["galleryPanel"] } }).catch(() => []),
  ]);

  // Map Sanity hero slides to plain URL strings for the carousel
  const heroImages: string[] = (heroSlides as Array<{ image?: { secure_url?: string } }>)
    .map((s) => s.image?.secure_url ?? "")
    .filter(Boolean);

  // Map Sanity gallery panels to the shape Gallery expects
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
    src: p.coverImage?.secure_url ?? "",
    title: p.title,
    description: p.description,
    alt: `${p.title} photography by Tummy To Toes`,
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
