/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we export a static site
  output: 'export',
  // basePath is required for GitHub Pages deployment at subpath
  basePath: '/netflix-friends-demo',
  // trailingSlash helps with GitHub Pages routing
  trailingSlash: true,
}

module.exports = nextConfig
