/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  swSrc: "\\src\\service-worker.js",
});

const nextConfig = withPWA({
  // next config
});
module.exports = nextConfig;
