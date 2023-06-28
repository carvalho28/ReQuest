/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/docs",
  trailingSlash: false,
};

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  latex: true,
});

module.exports = withNextra(nextConfig);
