/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3iv89674z08wb.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.smartlistzero.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.trevy.io',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
