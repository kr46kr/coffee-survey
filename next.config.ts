import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/coffee-survey",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
