const fs = require('fs');

function getExpPublishName(packageName, branchName) {
  return `${packageName}-${branchName}`.replace('/', '-');
}

function readPackageJSON() {
  return JSON.parse(fs.readFileSync('./package.json'));
}

function writePackageJSON(content) {
  fs.writeFileSync('./package.json', JSON.stringify(content, null, 2));
}

module.exports = {
  getExpPublishName,
  readPackageJSON,
  writePackageJSON
};
