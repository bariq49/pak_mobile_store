import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, //  Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  ...(process.env.NODE_ENV === "production" && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};

export default nextConfig;
