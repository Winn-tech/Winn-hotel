import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images :{
    remotePatterns : [
      {
        protocol: 'https',
        hostname: 'ftdxflkcjyiawkvbdgmx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'ftdxflkcjyiawkvbdgmx.supabase.co',
        pathname: '/storage/v1/object/sign/**',
      }
    ]

  }
};

export default nextConfig;
