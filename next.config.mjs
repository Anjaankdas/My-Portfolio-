/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudinary বা অন্য জায়গা থেকে ছবি আনতে চাইলে এখানে domain যোগ করো
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};
export default nextConfig;
