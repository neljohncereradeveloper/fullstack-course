import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure Prisma client is properly bundled
      config.externals = config.externals || [];
      config.externals.push("@prisma/client");
    }
    return config;
  },
};

export default nextConfig;
