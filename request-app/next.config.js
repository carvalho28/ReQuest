/** @type {import('next').NextConfig} */
const { DOCS_URL } = process.env;

const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAINS],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/docs",
        destination: `${DOCS_URL}/docs`,
        permanent: true,
      },
      {
        source: "/docs/:path*",
        destination: `${DOCS_URL}/docs/:path*`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
