/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    CORE_API: process.env.NEXT_PUBLIC_CORE_API,
  }
}

const redirects = () => [
  {
    source: '/core/users',
    destination: '/core/users/list',
    permanent: true,
  }
];


module.exports = {
  ...nextConfig,
  redirects,
}
