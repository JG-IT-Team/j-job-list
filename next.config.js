/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jobsglobal.com',
      },
    ],
  },
}

module.exports = nextConfig
