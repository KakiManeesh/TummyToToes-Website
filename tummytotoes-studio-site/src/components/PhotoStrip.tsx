"use client";

import Image from "next/image";

const photos = [
  {
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780219820/IMGL0057-copy_y7gobv.webp",
    alt: "Portrait photography by Tummy To Toes",
  },
  {
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780219813/2L8A1953-copy-_2_-copy_tbefqo.webp",
    alt: "Studio portrait session",
  },
  {
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780219817/IMG_9768-copy-2-_1_---Copy_fgx4jy.webp",
    alt: "Family photography moment",
  },
  {
    src: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780219823/WhatsApp-Image-2024-08-24-at-9.19.26-PM_ng0yqj.webp",
    alt: "Lifestyle portrait photography",
  },
];

export default function PhotoStrip() {
  const strip = [...photos, ...photos];

  return (
    <section aria-label="Photography highlights" className="overflow-hidden">
      <div className="group overflow-hidden">
        <div className="animate-marquee flex w-max gap-4 motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {strip.map((photo, index) => (
            <Image
              key={`${photo.src}-${index}`}
              src={photo.src}
              alt={photo.alt}
              width={400}
              height={300}
              className="h-[220px] md:h-[300px] w-auto shrink-0 object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}