/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next 15: opcja przeniesiona z `experimental` na poziom główny i przemianowana.
  serverExternalPackages: ["@react-pdf/renderer"],
};

module.exports = nextConfig;
