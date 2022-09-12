const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        permanent: true
      },
    ];
  }
};

module.exports = withImages(redirects);
