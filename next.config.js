/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['supports-color'],
    experimental: {
      esmExternals: 'loose',
    },
    reactStrictMode: true,
  }
  
  module.exports = nextConfig;
  