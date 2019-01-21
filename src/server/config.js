const environments = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
};

const environment = environments[process.env.NODE_ENV] || environments.development;

module.exports = {
  port: process.env.PORT || 8080,
  environment
};
