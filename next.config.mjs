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
    ],
  },
};

export default nextConfig;
