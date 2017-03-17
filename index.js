#!/usr/bin/env node

const spawn = require('./scripts/spawn');
const config = require('./scripts/config');
const log = require('./scripts/log');
const preDeploy = require('./scripts/pre-deploy');
const postDeploy = require('./scripts/post-deploy');

log('Logging into Expo...');
spawn('exp', ['login', '-u', config.expUsername, '-p', config.expPassword], loginError => {
  if (loginError) {
    throw new Error('Failed to log into Expo');
  } else {
    log('Logged into Expo.');
    log('Preparing project for publish...');
    preDeploy();
  }

  log('Publishing project into Expo.');
  spawn('exp', ['publish'], publishError => {
    if (publishError) {
      throw new Error('Failed to publish package to Expo');
    } else {
      log('Published project.');
      log('Notifying GitHub...');
      postDeploy();
    }
  });
});
