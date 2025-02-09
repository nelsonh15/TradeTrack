import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.imgur.com', 'dummyimage.com', 'upload.wikimedia.org'],
  },
};

export default nextConfig;
