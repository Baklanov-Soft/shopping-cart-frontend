/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async redirects() {
    return [{ source: '/', destination: '/catalog', permanent: true }];
  }
};

module.exports = nextConfig;
