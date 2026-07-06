"use client";

import { useEffect, useCallback, useState, useRef, Suspense, type ReactNode } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { useCloudinaryGallery } from "@/hooks/useCloudinaryGallery";

const FIRST_BATCH_SIZE = 9;

const scheduleIdleTask = (task: () => void) => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => task(), { timeout: 200 });
  } else {
    setTimeout(task, 1);
  }
};

const LazyFadeInImage = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

const LoadMoreSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="w-full aspect-[3/4] rounded-sm bg-muted animate-pulse"
      />
    ))}
  </div>
);

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

const GallerySkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        className="w-full aspect-[3/4] rounded-sm bg-muted animate-pulse"
      />
    ))}
  </div>
);

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

const GalleryContent = ({ initialCategory }: { initialCategory?: Category }) => {
  const [active, setActive] = useState<Category>(initialCategory ?? "Newborn");
  const [displayed, setDisplayed] = useState<Category>(initialCategory ?? "Newborn");
  const [isFading, setIsFading] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (initialCategory) return;
    const searchParams = new URLSearchParams(window.location.search);
    const paramCategory = searchParams.get("category") as Category | null;

    if (paramCategory && categories.includes(paramCategory)) {
      setActive(paramCategory);
      setDisplayed(paramCategory);
    }
  }, [initialCategory]);

  const { images, loading, loadingMore, error, hasMore, loadMore } =
    useCloudinaryGallery(displayed);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const hasMoreRef = useRef(hasMore);
  const loadingMoreRef = useRef(loadingMore);
  const loadMoreRef = useRef(loadMore);

  hasMoreRef.current = hasMore;
  loadingMoreRef.current = loadingMore;
  loadMoreRef.current = loadMore;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!hasMoreRef.current || loadingMoreRef.current) return;

        scheduleIdleTask(() => {
          if (hasMoreRef.current && !loadingMoreRef.current) {
            loadMoreRef.current();
          }
        });
      },
      { rootMargin: "400px", threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [displayed, images.length, hasMore, loadingMore]);

  const handleClose = useCallback(() => {
    if (typeof window !== "undefined" && window.history.state?.lightbox) {
      window.history.back();
    } else {
      setLightbox(null);
    }
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight")
        setLightbox((prev) => (prev !== null ? (prev + 1) % images.length : null));
      if (e.key === "ArrowLeft")
        setLightbox((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    },
    [lightbox, images.length, handleClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const isLightboxOpen = lightbox !== null;

  useEffect(() => {
    if (!isLightboxOpen) return;
    window.history.pushState({ lightbox: true }, "");
    const handlePopState = () => setLightbox(null);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;

    scrollPositionRef.current = scrollY;

    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
      touchAction: body.style.touchAction,
    };

    const previousRootStyles = {
      overflow: documentElement.style.overflow,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.touchAction = "none";
    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";

    return () => {
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.left = previousBodyStyles.left;
      body.style.right = previousBodyStyles.right;
      body.style.width = previousBodyStyles.width;
      body.style.overflow = previousBodyStyles.overflow;
      body.style.overscrollBehavior = previousBodyStyles.overscrollBehavior;
      body.style.touchAction = previousBodyStyles.touchAction;
      documentElement.style.overflow = previousRootStyles.overflow;
      documentElement.style.overscrollBehavior = previousRootStyles.overscrollBehavior;
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (lightbox === null) return;

    if (window.history.state?.lightbox) {
      window.history.back();
    } else {
      setLightbox(null);
    }
    // Close lightbox when switching category; lightbox intentionally omitted from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed]);

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-10 sm:mb-12">
          <div>
            <span className="font-body text-xs uppercase tracking-[0.35em] text-accent">Portfolio</span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground mt-2">
              Full Gallery
            </h1>
          </div>
          <Link
            href="/"

            scroll={true}
            prefetch={true}
            className="font-body text-sm uppercase tracking-[0.15em] border border-foreground text-foreground px-6 py-2.5 rounded-sm hover:bg-foreground hover:text-background transition-colors self-start sm:self-auto"
          >
            Back Home
          </Link>
        </div>

        {/* Horizontally scrollable category tabs on mobile */}
        <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto">
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-6 mb-10 min-w-max md:min-w-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === active) return;
                  setActive(cat);
                  setIsFading(true);
                  window.setTimeout(() => {
                    setDisplayed(cat);
                    setIsFading(false);
                  }, 320);
                }}
                className={`font-body text-sm uppercase tracking-[0.15em] pb-1 transition-colors whitespace-nowrap ${
                  active === cat
                    ? "text-foreground border-b-2 border-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Image grid */}
        <div
          key={displayed}
          className={`transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
        >
          {error ? (
            <p className="font-body text-sm text-muted-foreground text-center py-12">{error}</p>
          ) : loading && images.length === 0 ? (
            <GallerySkeleton />
          ) : !loading && images.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground text-center py-12">
              No images found in this category.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {images.map((img, i) => {
                  const isFirstBatch = i < FIRST_BATCH_SIZE;
                  const isPriority = displayed === "Newborn" && i < 6;

                  const card = (
                    <div
                      className="group relative overflow-hidden rounded-sm cursor-pointer w-full aspect-[3/4]"
                      style={{ willChange: "transform" }}
                      onClick={() => setLightbox(i)}
                    >
                      <Image
                        src={img.secure_url}
                        alt={`${displayed} portrait by TummyToToes Studio in Hyderabad`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        priority={isPriority}
                        loading={isFirstBatch && isPriority ? "eager" : "lazy"}
                        className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-background/30 opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="font-body text-sm uppercase tracking-[0.2em] text-foreground">
                          {displayed}
                        </span>
                      </div>
                    </div>
                  );

                  if (isFirstBatch) {
                    return (
                      <FadeInWhenVisible key={img.public_id} delay={(i % 3) * 80}>
                        {card}
                      </FadeInWhenVisible>
                    );
                  }

                  return (
                    <LazyFadeInImage key={img.public_id}>
                      {card}
                    </LazyFadeInImage>
                  );
                })}
              </div>

              {loadingMore && <LoadMoreSkeleton />}

              {hasMore && (
                <div
                  ref={sentinelRef}
                  className="h-px w-full"
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox — tap dark backdrop to close; only the image blocks close */}
      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/90"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-background/80 hover:text-background z-10 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close preview"
          >
            <X className="h-7 w-7 sm:h-8 sm:h-8" />
          </button>
          <button
            type="button"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-background/80 hover:text-background z-10 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
          <button
            type="button"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-background/80 hover:text-background z-10 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % images.length);
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <Image
              src={images[lightbox].secure_url}
              alt={`${displayed} portrait by TummyToToes Studio in Hyderabad`}
              width={images[lightbox].width}
              height={images[lightbox].height}
              className="pointer-events-auto max-h-[85vh] max-w-[92vw] w-auto h-auto object-contain rounded-sm"
              sizes="92vw"
              loading="lazy"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const GalleryPageClient = ({ initialCategory }: { initialCategory?: Category }) => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <GalleryContent initialCategory={initialCategory} />
    </Suspense>
  );
};

export default GalleryPageClient;
