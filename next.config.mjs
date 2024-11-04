/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
      domains: ['links.papareact.com', 'res.cloudinary.com'] // Combine domains into one array
  },
};

export default nextConfig;
