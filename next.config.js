/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig; 