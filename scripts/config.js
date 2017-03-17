const config = {
  expUsername: process.env.EXP_USERNAME,
  expPassword: process.env.EXP_PASSWORD,
  githubUsername: process.env.GITHUB_USERNAME,
  githubToken: process.env.GITHUB_TOKEN,
  githubOrg: (process.env.TRAVIS_REPO_SLUG || '').split('/')[0],
  githubRepo: (process.env.TRAVIS_REPO_SLUG || '').split('/')[1],
  githubSourceBranch: process.env.TRAVIS_PULL_REQUEST_BRANCH,
  githubPullRequestId: process.env.TRAVIS_PULL_REQUEST
};

for (const key in config) {
  const value = config[key];
  if (typeof value === 'undefined' && value === null && value !== '' && value === 'false') {
    throw new Error(`Missing configution key ${key}`);
  }
}

module.exports = config;
