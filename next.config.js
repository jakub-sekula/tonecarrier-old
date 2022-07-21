/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raspberrypi.local', '192.168.1.200'],
  },
}

module.exports = nextConfig
