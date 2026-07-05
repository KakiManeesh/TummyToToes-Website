"use client";

import { useCallback, useEffect, useState } from "react";

export interface CloudinaryGalleryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

const PAGE_SIZE = 9;

export function useCloudinaryGallery(category: string) {
  const [allImages, setAllImages] = useState<CloudinaryGalleryImage[]>([]);
  const [images, setImages] = useState<CloudinaryGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (!category) {
      setAllImages([]);
      setImages([]);
      setHasMore(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setImages([]);
    setAllImages([]);
    setVisibleCount(PAGE_SIZE);

    fetch(`/api/gallery?category=${encodeURIComponent(category)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load gallery images");
        }
        return data as { images?: CloudinaryGalleryImage[] };
      })
      .then((data) => {
        const fetchedImages = data.images || [];
        setAllImages(fetchedImages);
        setImages(fetchedImages.slice(0, PAGE_SIZE));
        setHasMore(fetchedImages.length > PAGE_SIZE);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Error fetching gallery from Sanity:", err);
        setError("Failed to load gallery images");
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [category]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    // Simulate a brief, smooth delay for a premium UI loading feel
    setTimeout(() => {
      const nextVisibleCount = visibleCount + PAGE_SIZE;
      setImages(allImages.slice(0, nextVisibleCount));
      setVisibleCount(nextVisibleCount);
      setHasMore(allImages.length > nextVisibleCount);
      setLoadingMore(false);
    }, 300);
  }, [allImages, hasMore, loadingMore, visibleCount]);

  return { images, loading, loadingMore, error, hasMore, loadMore };
}
