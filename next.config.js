/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    CORE_API: process.env.NEXT_PUBLIC_CORE_API,
    FINANCE_API_ID: process.env.NEXT_PUBLIC_FINANCE_API_ID,
  }
}

const redirects = () => [
  {
    source: '/core/users',
    destination: '/core/users/list',
    permanent: true
  },
  {
    source: '/core/apps',
    destination: '/core/apps/list',
    permanent: true
  },
  {
    source: '/finance/transactions',
    destination: '/finance/transactions/list',
    permanent: true
  }
];


module.exports = {
  ...nextConfig,
  redirects,
}
