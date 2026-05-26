import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: 'https', hostname: 'i.pravatar.cc' }] },
  turbopack: { root: path.resolve('.') }
};
export default nextConfig;
