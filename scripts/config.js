let config;
if (process.env.TRAVIS === 'true') {
  config = require('./config/travis');
} else if (process.env.CIRCLECI === 'true') {
  config = require('./config/circle');
} else {
  config = require('./config/default');
}

for (const key in config) {
  const value = config[key];
  // shell envs are weird
  if (
    typeof value === 'undefined' ||
    value === 'undefined' ||
    value === null ||
    value === '' ||
    value === 'false'
  ) {
    throw new Error(`Missing configuration key ${key}`);
  }
}

module.exports = config;
