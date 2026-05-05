import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/coming_soon/:slug",
        destination: "/coming-soon/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
