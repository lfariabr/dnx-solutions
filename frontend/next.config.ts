import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'github.com',
      'raw.githubusercontent.com',
      'avatars.githubusercontent.com',
      'user-images.githubusercontent.com',
      'unsplash.com',
      'images.unsplash.com',
      'plus.unsplash.com',
    ],
  },
};

export default nextConfig;
