// next.config.ts

// import type { NextConfig } from 'next'




const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 disables ESLint check at build
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig;
