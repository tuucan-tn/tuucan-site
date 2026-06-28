import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Let editors visit /admin (Sveltia CMS static editor) without /index.html.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
