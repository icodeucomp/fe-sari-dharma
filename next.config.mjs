/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: 'https',
        hostname: 'aksd.aacassandra.web.id',
        port: '',
        pathname: '/**',
      }, 
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
    ],
    domains: ["img.youtube.com", "upload.wikimedia.org"],
  },
};

export default nextConfig;
