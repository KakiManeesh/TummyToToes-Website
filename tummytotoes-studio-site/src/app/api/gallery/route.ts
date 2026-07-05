import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { GALLERY_CATEGORY_QUERY } from "@/sanity/queries";

export const revalidate = 60;

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
      return NextResponse.json({ error: "A valid category query param is required" }, { status: 400 });
    }

    const data = await client.fetch<GalleryCategory | null>(
      GALLERY_CATEGORY_QUERY,
      { category },
      { next: { revalidate: 60, tags: ["galleryCategory"] } },
    );

    return NextResponse.json({ images: data?.images ?? [] });
  } catch (err) {
    console.error("Gallery API fatal error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
