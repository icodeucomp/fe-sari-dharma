/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "back-office.saridharma.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.back-office.saridharma.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
    ],
    domains: ["img.youtube.com", "upload.wikimedia.org", "back-office.saridharma.id"],
  },
};

export default nextConfig;
