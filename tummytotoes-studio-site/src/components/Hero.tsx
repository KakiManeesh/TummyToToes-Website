"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";

const SWIPE_THRESHOLD = 50;

interface HeroSlide {
  /** Cloudinary secure_url for the slide image */
  url: string;
  /** Descriptive alt text for SEO / GEO / AEO */
  alt?: string;
}

interface HeroProps {
  /** Hero carousel slides, passed from the server component */
  images?: Array<string | HeroSlide>;
}

const isSlideObject = (
  value: string | HeroSlide,
): value is HeroSlide => typeof value === "object" && value !== null && "url" in value;

const Hero = ({ images = [] }: HeroProps) => {
  // Normalize to the object form so per-image alt can be supplied by the server.
  const slides: HeroSlide[] = images
    .map((value) =>
      isSlideObject(value) ? value : { url: value, alt: undefined },
    )
    .filter((slide) => slide.url);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);

  const startAutoCycle = useCallback(() => {
    if (slides.length === 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    startAutoCycle();
  }, [slides.length, startAutoCycle]);

  const goToPrevious = useCallback(() => {
    if (slides.length === 0) return;

    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoCycle();
  }, [slides.length, startAutoCycle]);

  const handleSwipeEnd = useCallback(
    (startX: number, endX: number) => {
      const delta = endX - startX;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (delta < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    },
    [goToNext, goToPrevious],
  );

  const handleMouseEnd = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (mouseStartX.current === null) return;
      handleSwipeEnd(mouseStartX.current, e.clientX);
      mouseStartX.current = null;
    },
    [handleSwipeEnd],
  );

  useEffect(() => {
    if (slides.length === 0) return;
    startAutoCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides, startAutoCycle]);

  return (
    <section id="home" className="relative overflow-hidden flex items-start md:items-center md:min-h-screen">
      <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-6 md:gap-12 items-start md:items-center pt-24 md:pt-20 pb-10 md:pb-16">

        {/* Image — shown FIRST on mobile via order; no entrance animation (LCP element) */}
        <div className="relative order-first md:order-last">
          <div
            className="relative h-[260px] md:h-auto md:aspect-[3/4] rounded-2xl overflow-hidden w-full max-w-[420px] mx-auto md:ml-auto md:pr-4 cursor-grab active:cursor-grabbing select-none"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              handleSwipeEnd(touchStartX.current, e.changedTouches[0].clientX);
              touchStartX.current = null;
            }}
            onMouseDown={(e) => {
              mouseStartX.current = e.clientX;
            }}
            onMouseUp={handleMouseEnd}
            onMouseLeave={handleMouseEnd}
          >
            {slides.length === 0 ? (
              <div
                className="absolute inset-0 rounded-2xl bg-muted animate-pulse"
                aria-label="Loading hero images"
              />
            ) : (
              slides.map((slide, index) => (
                <Image
                  key={slide.url}
                  src={slide.url}
                  alt={slide.alt ?? "TummyToToes Studio portfolio photograph from Hyderabad"}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  quality={100}
                  unoptimized
                  className="object-cover object-center rounded-2xl pointer-events-none"
                  priority={index === 0}
                  {...(index > 0 ? { loading: "lazy" as const } : {})}
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-5 md:gap-8 order-last md:order-first">
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground opacity-0 animate-fade-up">
            Every tiny detail,
          </h1>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground opacity-0 animate-fade-up animation-delay-200">
            forever remembered.
          </h1>
          <p className="font-body text-[10px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent opacity-0 animate-fade-up animation-delay-400 leading-relaxed">
            Newborn · Maternity · Kids · Events · Fashion · Weddings
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 opacity-0 animate-fade-up animation-delay-600">
            <a
              href="#gallery"
              className="font-body text-sm uppercase tracking-[0.15em] bg-foreground text-background px-6 py-3.5 rounded-sm hover:bg-foreground/90 transition-colors text-center w-full sm:w-auto"
            >
              View Gallery
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-block font-body text-sm uppercase tracking-[0.15em] border border-foreground text-foreground px-6 py-3.5 rounded-sm hover:bg-foreground hover:text-background transition-colors text-center w-full sm:w-auto"
            >
              Book a Session
            </a>
          </div>
          <p className="hidden md:block mt-6 text-left font-caviar font-bold text-3xl lg:text-4xl not-italic text-[#a81fb9] leading-tight opacity-0 animate-fade-up animation-delay-600">
            Newborn &amp; Maternity Photographer
            <br />
            based in Hyderabad
          </p>
        </div>

      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-body text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground mx-6 sm:mx-8"
            >
              Preserving your most precious moments · Newborn · Maternity · Kids · Events · Fashion · Weddings{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
