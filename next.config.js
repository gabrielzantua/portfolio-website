/** @type {import('next').NextConfig} */
const repo = 'portfolio-website';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },        // disables Next.js image optimization (which doesn't work in static export)
  basePath: `/${repo}`,                 // tells Next.js your site is served from /portfolio-website
  assetPrefix: `/${repo}/`,             // prefixes all static assets correctly for GitHub Pages
};

module.exports = nextConfig;
