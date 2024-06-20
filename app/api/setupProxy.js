const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
  target: 'https://api.cloudinary.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/cloudinary-proxy': '/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/resources/image/upload',
  },
});

module.exports = function (app) {
  app.use('/api/cloudinary-proxy', proxy);
};