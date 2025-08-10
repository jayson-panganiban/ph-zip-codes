/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // Static site export
  images: {
    unoptimized: true,
  },
  // Trailing slash for consistency
  trailingSlash: false,
};

module.exports = nextConfig;
