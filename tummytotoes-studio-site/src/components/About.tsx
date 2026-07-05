"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-6 md:py-32">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-2 md:gap-16 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        {/* Image – square on all sizes, looks intentional */}
        <div className="relative aspect-square rounded-sm overflow-hidden order-last md:order-first">
          <Image
            src="https://res.cloudinary.com/dgcebqgy3/image/upload/v1780298217/website_photo_2_kf5bse.webp"
            alt="Photographer portrait"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0 md:gap-5 order-first md:order-last">
          <div className="hidden md:block">
            <div className="inline-flex items-center gap-2 w-fit">
              <span
                className={`h-[2px] bg-accent transition-all duration-150 ${visible ? "w-4" : "w-0"
                  }`}
              />
              <span className="font-body text-xs uppercase tracking-[0.35em] text-accent">
                About
              </span>
            </div>
          </div>
          <h2 className="font-caviar font-bold text-3xl sm:text-4xl not-italic text-[#a81fb9] md:hidden mb-4">
            Newborn &amp; Maternity Photographer
            <br />
            based in Hyderabad
          </h2>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold md:font-light text-foreground hidden md:block">
            Hello, I&apos;m Surya Kiran
          </h2>
          <div className="flex md:hidden flex-col gap-4">
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              I&apos;m Surya Kiran — a newborn and maternity photographer with over four years of
              experience capturing the raw, unscripted beauty of new beginnings.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Based in Hyderabad, my studio is a calm, warm space where families feel completely
              at ease. Because the most genuine moments happen when you forget the camera is
              there.
            </p>
          </div>
          <div className="hidden md:flex flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              I&apos;m a newborn and maternity photographer based in Hyderabad, with over four years
              of experience capturing the raw, unscripted beauty of new beginnings. My studio
              is a calm, warm space designed to make families feel completely at ease — because
              the most genuine moments happen when you forget the camera is there.
            </p>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Every session is deeply personal. I believe in slow, intentional photography that
              honours the fleeting details — tiny fingers, quiet glances, the way a mother holds
              her baby for the very first time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
