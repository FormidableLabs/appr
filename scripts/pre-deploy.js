const utils = require('./utils');
const config = require('./config');

module.exports = function preDeploy() {
  const pkg = utils.readPackageJSON();
  const name = utils.getExpPublishName(pkg.name, config.githubSourceBranch);
  const modified = Object.assign({}, pkg, {
    name,
    privacy: 'unlisted'
  });

  utils.writePackageJSON(modified);

  let app = utils.readAppJSON();
  if (app.expo) {
    app.expo = Object.assign({}, app.expo, {
      name,
      slug: name,
      privacy: 'unlisted'
    });
  } else {
    app = Object.assign({}, app, {
      name,
      slug: name,
      privacy: 'unlisted'
    });
  }

  utils.writeAppJSON(app);
};
