/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we export a static site
  output: 'export',
  // trailingSlash helps with GitHub Pages routing
  trailingSlash: true,
}

module.exports = nextConfig
