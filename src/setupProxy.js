// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.weatherapi.com/v1', // Include protocol in target URL
      changeOrigin: true,
    })
  );
};
