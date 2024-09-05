/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/db"],
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
       },
       {
         protocol: "https",
         hostname: "utfs.io"
      }
    ],
  },
};

export default nextConfig;
