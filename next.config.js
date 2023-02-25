/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // add any domain with scdn in it
    domains: ['i.scdn.co', 'mosaic.scdn.co'],
  },
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/search',
        },
      ]
    },
}
