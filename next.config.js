/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAINS],
  },
};

module.exports = nextConfig;
