import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Next picks this repo as the workspace root even if other lockfiles exist nearby.
    // NOTE: Next loads this config in a Node context where `__dirname` is available.
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
