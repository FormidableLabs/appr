const fs = require('fs');

function getExpPublishName(packageName, branchName) {
  return `${packageName}-${branchName}`.replace(/[^a-zA-Z0-9\\-]/, '-');
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
  getExpPublishName,
  readPackageJSON,
  writePackageJSON,
  readAppJSON,
  writeAppJSON
};
