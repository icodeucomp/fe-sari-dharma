/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "185.196.21.56",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "saridharma.com",
      },
      {
        protocol: "https",
        hostname: "api.saridharma.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
    ],
    domains: ["back-office.saridharma.id"],
  },
};

export default nextConfig;
