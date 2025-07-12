/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['supports-color'],
    experimental: {
      esmExternals: 'loose',
    },
    reactStrictMode: true,
    images: {
      domains: ['images.unsplash.com'],
    },
  }
  
module.exports = nextConfig;
  