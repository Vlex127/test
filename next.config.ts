import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Add other domains if needed
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
  },
};


export default nextConfig;
