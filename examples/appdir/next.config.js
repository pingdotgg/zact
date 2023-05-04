/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["zact"],
  experimental: {
    appDir: true,
    runtime: "experimental-edge",
  },
};

module.exports = nextConfig;
