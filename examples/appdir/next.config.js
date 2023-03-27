/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["zact"],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
