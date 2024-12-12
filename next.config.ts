import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.imgur.com', 'dummyimage.com'],
  },
};

export default nextConfig;
