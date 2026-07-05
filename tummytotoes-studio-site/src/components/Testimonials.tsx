"use client";

import { useState, useEffect } from "react";
const testimonials = [
  {
    quote:
      "Wonderful experience working with Surya and Team. Hired them for Upanayanam ceremony and they delivered photos which are full of life and emotion. Captured every detail.",
    name: "Laxmi Bollapragada",
  },
  {
    quote:
      "We had a wonderful experience with the maternity photoshoot team. The photographers were very professional, pateint, and made us feel free very comfortable throughout the session. They suggested good poses and captured beautiful moments. The photo quality and editing were excellent. Highly recommended for anyone looking for maternity photoshoot. Thanks to TUMMY TO TOES.",
    name: "Venkat Yeduvaka",
  },
  {
    quote:
      "I had a wonderful experience during my wife maternity photoshoot. The photographer made feel so comfortable and confident throughout the session. All session of shooting is adorable but the editing of photos is satisfactory.",
    name: "Dr. Ambeshwar Kumar",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-14 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
        {/* Quote container with decorative " inside */}
        <div className="relative min-h-[280px] sm:min-h-[240px] md:min-h-[210px] flex items-center justify-center">
          {/* Decorative quote mark — positioned above text to avoid overlap */}
          <span className="absolute -top-3 sm:-top-4 md:-top-6 left-1/2 -translate-x-1/2 font-heading text-6xl md:text-8xl text-accent leading-none select-none pointer-events-none z-0">&quot;</span>

          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 z-10 pt-14 sm:pt-12 md:pt-10 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
              <p className="font-heading text-lg md:text-2xl font-light italic text-foreground leading-relaxed mb-5 md:mb-6">
                {t.quote}
              </p>
              <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {t.name}
              </p>
            </div>
          ))}
        </div>

        {/* Dots — larger touch targets */}
        <div className="flex justify-center gap-1 mt-6 md:mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-colors p-2 box-content ${i === current ? "bg-accent" : "bg-border"
                }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
