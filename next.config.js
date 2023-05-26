/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "p16-sign.tiktokcdn-us.com",
      "p19-sign.tiktokcdn-us.com",
      "p77-sign-va.tiktokcdn.com",
      "p77-sign-va-lite.tiktokcdn.com",
      "p16-sign-va.tiktokcdn.com",
      "p16-sign-va-lite.tiktokcdn.com",
      "p16-sign-sg.tiktokcdn.com",
      "cdn.shopify.com",
      "firebasestorage.googleapis.com",
      "ae01.alicdn.com",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    appDir: true,
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
