import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Pas de transformation d'images à la volée : elle passerait chaque image
    // par le Worker au lieu de la servir directement depuis le CDN.
    unoptimized: true,
  },
};

export default nextConfig;
