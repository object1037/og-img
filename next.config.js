/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:slug*',
        destination: '/api/:slug*',
      },
    ]
  },
}

module.exports = nextConfig
