/** @type {import('next').NextConfig} */

const legacyRoutes = [
  ["/layanan-unggulan", "/featured-services"],
  ["/tentang-kami", "/about-us"],
  ["/tentang-kami/ikhtisar", "/about-us/overview"],
  ["/tentang-kami/ambulans", "/about-us/ambulance"],
  ["/tentang-kami/layanan-fasilitas", "/about-us/facility-services"],
  ["/temukan-dokter", "/find-doctor"],
  ["/temukan-dokter/jadwal", "/find-doctor/schedule"],
  ["/media-informasi", "/media-information"],
  ["/media-informasi/artikel-kesehatan", "/media-information/health-articles"],
  ["/media-informasi/event-community", "/media-information/community-events"],
  ["/media-informasi/form-management", "/media-information/form-management"],
  ["/media-informasi/hubungi-kami", "/media-information/contact-us"],
  ["/media-informasi/indikator-mutu", "/media-information/quality-indicators"],
  ["/media-informasi/karir", "/media-information/careers"],
  ["/media-informasi/paket-promo", "/media-information/promo-packages"],
];

const apiUrl = process.env.NEXT_PUBLIC_API_URL ? new URL(process.env.NEXT_PUBLIC_API_URL) : null;

const nextConfig = {
  output: "standalone",
  // Keep old Indonesian URLs working for bookmarks and search engines.
  async redirects() {
    return legacyRoutes.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/:path*`, destination: `${destination}/:path*`, permanent: true },
    ]);
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      ...(apiUrl
        ? [{ protocol: apiUrl.protocol.replace(":", ""), hostname: apiUrl.hostname, port: apiUrl.port, pathname: "/**" }]
        : []),
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

  },
};

export default nextConfig;
