/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  experimental: {
    appDir: true,
    runtime: "experimental-edge",
  },
};

module.exports = nextConfig;
