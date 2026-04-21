import type { NextConfig } from "next";
import { HOME_LINK_HEADER } from "./src/lib/agent/home-link-header";

const nextConfig: NextConfig = {
  // ==========================================================================
  // Turbopack Configuration
  // ==========================================================================
  turbopack: {
    // Ensure Next picks this repo as the workspace root even if other lockfiles exist nearby.
    root: __dirname,
  },
  
  // ==========================================================================
  // Image Optimization
  // ==========================================================================
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimize images for performance
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 60 days
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },
  
  // ==========================================================================
  // Performance Optimizations for Large-Scale Static Generation
  // ==========================================================================
  
  // Generate standalone output for faster deployments
  output: 'standalone',
  
  // Enable React strict mode for better debugging
  reactStrictMode: true,
  
  // Compress responses
  compress: true,
  
  // Optimize package imports for better tree-shaking
  experimental: {
    // Optimize specific large packages
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
    ],
  },
  
  // ==========================================================================
  // Headers for SEO and Security
  // ==========================================================================
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: HOME_LINK_HEADER,
          },
        ],
      },
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images
        source: '/:path*.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Sitemap caching
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  
  // ==========================================================================
  // Redirects for SEO
  // ==========================================================================
  async redirects() {
    return [
      {
        source: '/hermes-openclaw-llm-cheat-sheet',
        destination: '/resources/hermes-openclaw-llm-cheat-sheet',
        permanent: true,
      },
      // Ensure trailing slashes are handled consistently
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
  
  // ==========================================================================
  // Rewrites for Clean URLs
  // ==========================================================================
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
  
  // ==========================================================================
  // Logging (reduce in production)
  // ==========================================================================
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  
  // ==========================================================================
  // PoweredBy Header (remove for security)
  // ==========================================================================
  poweredByHeader: false,
};

export default nextConfig;
