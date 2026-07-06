import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { GALLERY_CATEGORY_QUERY } from "@/sanity/queries";
import { cloudinaryOriginalUrl } from "@/lib/cloudinary";

// Force dynamic rendering - this route requires query parameters
// and cannot be statically optimized at build time
export const dynamic = "force-dynamic";

// Cache control for 60 seconds (applied via response headers, not static optimization)
const CACHE_TTL = 60;

const VALID_CATEGORIES = new Set(["Newborn", "Maternity", "Kids", "Events", "Fashion", "Wedding"]);

type GalleryImage = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

type GalleryCategory = {
  images?: GalleryImage[];
};

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");

    if (!category || !VALID_CATEGORIES.has(category)) {
      return NextResponse.json(
        { error: "A valid category query param is required" },
        { status: 400 }
      );
    }

    const data = await client.fetch<GalleryCategory | null>(
      GALLERY_CATEGORY_QUERY,
      { category },
      { next: { revalidate: 0 } } // No caching at Sanity fetch level
    );

    const images = (data?.images ?? []).map((image) => ({
      ...image,
      secure_url: cloudinaryOriginalUrl(image.secure_url),
    }));

    // Apply cache headers to response
    const response = NextResponse.json({ images });
    response.headers.set(
      "Cache-Control",
      `private, max-age=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL}`
    );

    return response;
  } catch (err) {
    console.error("Gallery API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
