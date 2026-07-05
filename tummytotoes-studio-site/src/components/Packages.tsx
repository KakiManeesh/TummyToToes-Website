"use client";

import { useEffect, useRef, useState } from "react";

export interface PackageData {
  _id: string;
  title: string;
  price: number;
  features: string[];
  bonusFeatures?: string[];
  featured: boolean;
  order: number;
}

interface PackagesProps {
  packages?: PackageData[];
}

// Fallback data shown before Sanity documents are created in Studio
const FALLBACK_PACKAGES: PackageData[] = [
  {
    _id: "fallback-1",
    title: "Maternity Package",
    price: 12000,
    features: [
      "2-Hour Shoot",
      "Studio or Outdoor Location",
      "15 High-Resolution Edited Images",
      "Full Data Delivery",
    ],
    bonusFeatures: ["1 Complimentary Frame", "Makeup Included"],
    featured: false,
    order: 1,
  },
  {
    _id: "fallback-2",
    title: "Newborn Session Package",
    price: 10000,
    features: [
      "2-Hour Shoot",
      "3 Unique Themes",
      "15 Professionally Edited Photos",
      "Full Data Delivery",
    ],
    bonusFeatures: ["Complimentary Album", "1 Framed Print"],
    featured: true,
    order: 2,
  },
  {
    _id: "fallback-3",
    title: "Events Package",
    price: 20000,
    features: [
      "5-Hour Coverage",
      "Candid + Portrait Photography",
      "Cinematic or Traditional Videography",
      "Full Data Delivery",
      "15 Edited Photographs",
    ],
    bonusFeatures: ["1 Framed Print"],
    featured: false,
    order: 3,
  },
];

const Packages = ({ packages: packagesProp }: PackagesProps) => {
  const packages = (packagesProp && packagesProp.length > 0) ? packagesProp : FALLBACK_PACKAGES;
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
    <section id="packages" className="py-14 md:py-32 bg-secondary">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 w-fit mx-auto">
            <span
              className={`h-[2px] bg-accent transition-all duration-150 ${visible ? "w-4" : "w-0"
                }`}
            />
            <span className="font-body text-xs uppercase tracking-[0.35em] text-accent">
              Packages
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground mt-3">
            Simple, transparent pricing
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`bg-card rounded-lg p-6 md:p-8 flex flex-col transition-transform hover:-translate-y-1 duration-300 ${pkg.featured ? "border-t-4 border-accent md:scale-105 shadow-lg" : "shadow-sm"
                }`}
            >
              <h3 className="font-heading text-2xl font-normal text-foreground mb-2">{pkg.title}</h3>
              <p className="font-body text-sm text-muted-foreground mb-5 md:mb-6">Starting at ₹{pkg.price.toLocaleString("en-IN")}</p>
              <ul className="flex flex-col gap-3 mb-6 md:mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-0.5">·</span> {f}
                  </li>
                ))}
                {"bonusFeatures" in pkg && pkg.bonusFeatures && pkg.bonusFeatures.length > 0 && (
                  <>
                    <li className="list-none pt-3 mt-1 border-t border-border">
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                        Bonus
                      </span>
                    </li>
                    {pkg.bonusFeatures.map((f) => (
                      <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-0.5">·</span> {f}
                      </li>
                    ))}
                  </>
                )}
              </ul>
              <a
                href="#contact"
                className={`font-body text-sm uppercase tracking-[0.15em] text-center py-3.5 rounded-sm transition-colors min-h-[48px] flex items-center justify-center ${pkg.featured
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                  }`}
              >
                Enquire Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
