import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/wubba",
  images: { unoptimized: true },
};

export default nextConfig;