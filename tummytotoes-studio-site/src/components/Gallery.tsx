"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

export interface GalleryPanelData {
  _id: string;
  src: string;
  title: string;
  description: string;
  alt: string;
  category: string;
  objectPosition?: string;
}

interface GalleryProps {
  panels?: GalleryPanelData[];
}

// Fallback panels used until Sanity galleryPanel documents exist
const FALLBACK_PANELS: GalleryPanelData[] = [
  {
    _id: "fb-newborn",
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780219816/IMG_9706-copy_dsbpnu.webp",
    title: "Newborn Stories",
    description: "Soft, natural portraits that preserve those first tiny details and quiet moments.",
    alt: "Newborn portrait session",
    category: "Newborn",
    objectPosition: "center center",
  },
  {
    _id: "fb-maternity",
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780249589/IMGL1146-copy_p4zus6.webp",
    title: "Maternity Glow",
    description: "Elegant frames that celebrate your journey with calm tones and gentle movement.",
    alt: "Maternity portrait session",
    category: "Maternity",
    objectPosition: "center 20%",
  },
  {
    _id: "fb-kids",
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780250546/05_rbgb45.webp",
    title: "Little Wonders",
    description: "Joyful, unscripted frames of children being gloriously, authentically themselves.",
    alt: "Kids portrait session",
    category: "Kids",
    objectPosition: "center center",
  },
  {
    _id: "fb-fashion",
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780304437/IMGL0342-copy_tyov64.webp",
    title: "Fashion Stories",
    description: "Bold editorial sessions where personality meets light — crafted to captivate.",
    alt: "Fashion portrait session",
    category: "Fashion",
    objectPosition: "center center",
  },
  {
    _id: "fb-events",
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780297460/0F8A0009-copy_c6emkw.webp",
    title: "Event Highlights",
    description: "Key celebration moments captured with artistic framing and documentary honesty.",
    alt: "Event photography highlight",
    category: "Events",
    objectPosition: "center center",
  },
];

const Gallery = ({ panels: panelsProp }: GalleryProps) => {
  const panels = (panelsProp && panelsProp.length > 0) ? panelsProp : FALLBACK_PANELS;
  const shellRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [seenSteps, setSeenSteps] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    // On mobile, all panels are visible at once (no scroll-snap) — mark everything seen immediately
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSeenSteps(new Set(panels.map((_, i) => i)));
      return;
    }

    const shell = shellRef.current;
    if (!shell) return;

    const syncActiveStep = () => {
      const sectionHeight = shell.clientHeight;
      if (!sectionHeight) return;
      const nextIndex = Math.round(shell.scrollTop / sectionHeight);
      const boundedIndex = Math.max(0, Math.min(panels.length - 1, nextIndex));
      setActiveStep(boundedIndex);
      setSeenSteps((prev) => {
        if (prev.has(boundedIndex)) return prev;
        const next = new Set(prev);
        next.add(boundedIndex);
        return next;
      });
    };

    syncActiveStep();
    shell.addEventListener("scroll", syncActiveStep, { passive: true });
    window.addEventListener("resize", syncActiveStep);

    return () => {
      shell.removeEventListener("scroll", syncActiveStep);
      window.removeEventListener("resize", syncActiveStep);
    };
  }, []);

  return (
    <section id="gallery" className="py-14 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 w-fit mx-auto">
            <span className="h-[2px] bg-accent w-4" />
            <span className="font-body text-xs uppercase tracking-[0.35em] text-accent">
              Portfolio
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground mt-3">
            A glimpse into our world
          </h2>
        </div>

        {/* New mobile cards wrapper: show on mobile only */}
        <div className="block md:hidden space-y-4" aria-label="Mobile gallery showcase">
          {panels.map((panel, index) => (
            <article
              key={`${panel.title}-mobile`}
              className="relative w-full h-[480px] overflow-hidden rounded-2xl"
            >
              <Link
                href={`/gallery?category=${panel.category}`}
                prefetch={false}
                className="relative block w-full h-full overflow-hidden"
                aria-label={`View all ${panel.title}`}
              >
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  fill
                  sizes="100vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover"
                  style={{ objectPosition: panel.objectPosition ?? 'center center' }}
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 p-5 sm:p-6 text-white pointer-events-none">
                <div className="absolute left-5 right-5 bottom-5 sm:left-6 sm:right-6 flex items-end justify-between gap-4">
                  <div className="max-w-[75%]">
                  <h3 className="font-heading text-3xl sm:text-4xl font-light leading-none text-white">
                    {panel.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-white/75 mt-3 max-w-md">
                    {panel.description}
                  </p>
                  </div>
                  <Link
                    href={`/gallery?category=${panel.category}`}
                    prefetch={false}
                    className="font-body text-xs uppercase tracking-[0.25em] text-white/80 [@media(hover:hover)]:hover:text-white transition-colors pointer-events-auto"
                    aria-label={`View all ${panel.title}`}
                  >
                    View All →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Old layout wrapper: hide on mobile, show on desktop only */}
        <div ref={shellRef} className="hidden md:block gallery-scroll-shell" aria-label="Scroll gallery showcase">
          <nav className="gallery-scroll-indicator" aria-label="Gallery sections">
            <span
              className="gallery-scroll-active-dot"
              style={{ "--indicator-index": activeStep } as CSSProperties}
            />
            <ol>
              {panels.map((panel, index) => (
                <li key={`${panel.title}-indicator`}>
                  <button
                    type="button"
                    aria-label={`Go to ${panel.title}`}
                    onClick={() => {
                      const shell = shellRef.current;
                      if (!shell) return;
                      shell.scrollTo({
                        top: shell.clientHeight * index,
                        behavior: "smooth",
                      });
                    }}
                  />
                </li>
              ))}
            </ol>
          </nav>

          {panels.map((panel, index) => {
            const isSeen = seenSteps.has(index);
            return (
              <article key={panel.title} className="gallery-scroll-step">
                <div className="gallery-scroll-content">
                  <div
                    className="gallery-scroll-media relative w-full h-full"
                    style={{
                      opacity: isSeen ? 1 : 0,
                      transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    <Image
                      src={panel.src}
                      alt={panel.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-cover"
                      style={{ objectPosition: panel.objectPosition ?? 'center center' }}
                    />
                  </div>
                  <div
                    className="gallery-scroll-copy"
                    style={{
                      opacity: isSeen ? 1 : 0,
                      transform: isSeen ? "translateY(0)" : "translateY(18px)",
                      transition: "opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 120ms, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 120ms",
                    }}
                  >
                    <Link
                      href={`/gallery?category=${panel.category}`}
                      prefetch={false}
                      className="group/title inline-block"
                      aria-label={`View ${panel.title} gallery`}
                    >
                      <h3 className="font-heading text-3xl md:text-5xl font-light text-foreground mt-2 md:mt-3 [@media(hover:hover)]:group-hover/title:text-accent transition-colors duration-300">
                        {panel.title}
                      </h3>
                      <span className="inline-block font-body text-xs uppercase tracking-[0.25em] text-accent mt-1 md:mt-2 border-b border-accent pb-0.5 opacity-0 [@media(hover:hover)]:group-hover/title:opacity-100 transition-opacity duration-300">
                        View Collection →
                      </span>
                    </Link>
                    <p className="font-body text-sm md:text-lg text-muted-foreground mt-3 md:mt-4 max-w-xl leading-relaxed">
                      {panel.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/gallery"
            scroll={true}
            prefetch={false}
            className="inline-block font-body text-sm uppercase tracking-[0.15em] border border-foreground text-foreground px-8 py-3.5 rounded-sm hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
