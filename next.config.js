/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // add any domain with scdn in it
    domains: [
      'i.scdn.co', 
      'mosaic.scdn.co', 
      'upload.wikimedia.org', 
      'scontent-ams2-1.xx.fbcdn.net', 
      'scontent-lhr8-1.xx.fbcdn.net',
    ]
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
