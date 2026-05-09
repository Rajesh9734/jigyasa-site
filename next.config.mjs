/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.1.111', '192.168.1.112', '192.168.1.142'],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
