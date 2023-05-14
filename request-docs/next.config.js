/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/docs",
};

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = withNextra(nextConfig);
