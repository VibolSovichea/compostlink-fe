import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "i.ibb.co",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;