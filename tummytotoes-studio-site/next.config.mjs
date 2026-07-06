/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
        // Wider range of breakpoints so high-DPI / large screens get sharp assets
        deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640],
        // Prefer modern formats for best quality-to-size ratio
        formats: ["image/avif", "image/webp"],
    },
    output: "standalone",
};

export default nextConfig;
