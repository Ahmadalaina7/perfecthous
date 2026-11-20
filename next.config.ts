import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rustige dev-indicator; de preview-paneel-rand is al druk genoeg.
  devIndicators: false,
  images: {
    // Lokale bestanden worden door next/image geoptimaliseerd naar AVIF/WebP.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [96, 160, 240, 320, 400],
  },
  experimental: {
    // Server actions krijgen ruimte voor foto-uploads.
    serverActions: { bodySizeLimit: "12mb" },
    // De site heeft twee root-layouts (publiek per taal, en beheer). Zonder
    // deze vlag kan Next geen 404 maken voor URL's die op geen route passen.
    globalNotFound: true,
  },
  async headers() {
    // Let op: headers() wordt bij de build uitgevoerd, niet per verzoek. Of de
    // site ingekaderd mag worden (preview) verschilt per omgeving, dus die
    // header staat in middleware.ts. Hier alleen wat altijd geldt.
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Geüploade projectfoto's zijn onveranderlijk: lang cachen.
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
