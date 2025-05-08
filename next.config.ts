// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 disables ESLint check at build
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

export default nextConfig
