/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Sneakpeek page
      {
        source: '/sneak-peek',
        destination: '/sneakpeek',
        permanent: true,
      },
      // Canonical homepage redirect
      {
        source: '/new-home',
        destination: '/',
        permanent: true,
      },
      // Smart Tips
      {
        source: '/new-home/smart-tips/:slug',
        destination: '/smart-tips/:slug',
        permanent: true,
      },
      {
        source: '/new-home/smart-tips',
        destination: '/smart-tips',
        permanent: true,
      },
      // Services
      {
        source: '/new-home/services/:slug',
        destination: '/services/:slug',
        permanent: true,
      },
      {
        source: '/new-home/services',
        destination: '/services',
        permanent: true,
      },
      // Brands
      {
        source: '/new-home/brands/:slug',
        destination: '/brand/:slug',
        permanent: true,
      },
      {
        source: '/new-home/brands',
        destination: '/',
        permanent: true,
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // NOTE: Do NOT use output: 'standalone' on Vercel — Vercel manages its own
  // output format and standalone mode breaks dynamic routes (sitemap, API, etc.)
}

module.exports = nextConfig
