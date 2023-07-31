/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //This is for fetching the image for the thrid party origin
  images: {
    domains: ["firebasestorage.googleapis.com"]
  }
}

module.exports = nextConfig
