const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/core/users',
        destination: '/core/users/list',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
