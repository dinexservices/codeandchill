import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.codenchill.tech',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains
      },
    ],
  },
};

export default nextConfig;
