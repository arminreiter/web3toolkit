/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      buffer: 'buffer/',
    },
  },
};

module.exports = nextConfig;
