/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    CORE_API: process.env.NEXT_PUBLIC_CORE_API,
  }
}

module.exports = nextConfig
