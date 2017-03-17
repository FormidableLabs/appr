const spawn = require('./scripts/spawn');
const config = require('./scripts/config');
const preDeploy = require('./scripts/pre-deploy');
const postDeploy = require('./scripts/post-deploy');

spawn('exp', ['login', '-u', config.expUsername, '-p', config.expPassword], loginError => {
  if (loginError) {
    throw new Error('Failed to log into Expo');
  } else {
    preDeploy();
  }

  spawn('exp', ['publish'], publishError => {
    if (publishError) {
      throw new Error('Failed to publish package to Expo');
    } else {
      postDeploy();
    }
  });
});
