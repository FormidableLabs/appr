const fs = require('fs');
const config = require('./config');

function getSafeName(name) {
  return `${name}`.replace(/[^a-zA-Z0-9\\-]/, '-');
}

function getExpChannelName() {
  return getSafeName(`${process.env.EXP_CHANNEL || config.githubSourceBranch}`);
}

function readPackageJSON() {
  return JSON.parse(fs.readFileSync('./package.json'));
}

function writePackageJSON(content) {
  fs.writeFileSync('./package.json', JSON.stringify(content, null, 2));
}

function readAppJSON() {
  return JSON.parse(fs.readFileSync('./app.json'));
}

function writeAppJSON(content) {
  fs.writeFileSync('./app.json', JSON.stringify(content, null, 2));
}

module.exports = {
  getSafeName,
  getExpChannelName,
  readPackageJSON,
  writePackageJSON,
  readAppJSON,
  writeAppJSON
};
