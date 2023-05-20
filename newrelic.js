'use strict'

const fs = require('fs');

exports.config = {
  app_name: sdc,
  license_key: fs.readFileSync('/run/secrets/NEW_RELIC_LICENSE_KEY', 'utf8').trim(),
  distributed_tracing: {
    enabled: true,
  },
  logging: {
    level: 'info',
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'response.headers.cookie',
      'response.headers.setCookie*',
    ],
  },
};
