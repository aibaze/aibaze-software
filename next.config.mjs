/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" }, 
      { hostname: "i.ibb.co" },
      { hostname: "randomuser.me" },
      { hostname: "i.pravatar.cc" },
      { hostname: "cdn.magicui.design" },
      { hostname: "cdn.jsdelivr.net" },
      { hostname: "assets.calendly.com" },
      { hostname: "www.youtube.com" },
      { hostname: "img.youtube.com" },
      { hostname: "unpkg.com" },
      { hostname: "rsms.me" }
    ],
    unoptimized: false,
    dangerouslyAllowSVG: true,
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
