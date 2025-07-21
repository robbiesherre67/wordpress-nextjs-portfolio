/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['www.idesigntek.com'],
    unoptimized: true,     // ← disable the Image Optimization API
  },
}

module.exports = nextConfig