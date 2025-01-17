import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{hostname: "utfs.io"}]
  }
};

export default nextConfig;
