/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "localhost" }, 
      { hostname: "i.ibb.co" }
    ],
  },
};

export default nextConfig;
