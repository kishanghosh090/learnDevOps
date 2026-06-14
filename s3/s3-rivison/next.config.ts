import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next images allow all domains to load images from any source, but you can specify the domains you want to allow
  images: {
    domains: ["localhost", "example.com", "dyr8o0kvcn13j.cloudfront.net"],
  },
  // next api
};

export default nextConfig;
