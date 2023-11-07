/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/login', destination: '/api/auth/signin', permanent: true }];
  },
};

module.exports = nextConfig;
