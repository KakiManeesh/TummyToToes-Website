/**
 * Returns the original Cloudinary delivery URL without inline transformations.
 * Sanity's cloudinary.asset stores secure_url; some entries may include preview
 * transforms (e.g. w_400/q_auto) that reduce clarity compared to the raw asset.
 */
export function cloudinaryOriginalUrl(url: string): string {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/");
    const uploadIndex = segments.indexOf("upload");

    if (uploadIndex === -1) {
      return url;
    }

    const afterUpload = segments.slice(uploadIndex + 1);
    const versionIndex = afterUpload.findIndex((segment) => /^v\d+$/.test(segment));

    if (versionIndex === -1) {
      return url;
    }

    const versionAndPublicId = afterUpload.slice(versionIndex);
    parsed.pathname = [...segments.slice(0, uploadIndex + 1), ...versionAndPublicId].join("/");

    return parsed.toString();
  } catch {
    return url;
  }
}
