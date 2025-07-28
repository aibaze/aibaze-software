/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" }, 
      { hostname: "i.ibb.co" },
      { hostname: "randomuser.me" }
    ],
  },
};

export default nextConfig;
