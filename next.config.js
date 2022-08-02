const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboards/tasks',
        permanent: true
      },
    ];
  }
};

module.exports = withImages(redirects);
