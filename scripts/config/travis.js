// see documentation for each field in scripts/config/default.js
module.exports = {
  expUsername: process.env.EXP_USERNAME,
  expPassword: process.env.EXP_PASSWORD,
  expReleaseChannel:
    process.env.EXP_CHANNEL || process.env.TRAVIS_PULL_REQUEST_BRANCH || process.env.TRAVIS_BRANCH,
  githubUsername: process.env.GITHUB_USERNAME,
  githubToken: process.env.GITHUB_TOKEN,
  githubOrg: (process.env.TRAVIS_REPO_SLUG || '').split('/')[0],
  githubRepo: (process.env.TRAVIS_REPO_SLUG || '').split('/')[1],
  githubSourceBranch: process.env.TRAVIS_PULL_REQUEST_BRANCH || process.env.TRAVIS_BRANCH,
  githubPullRequestId: process.env.TRAVIS_PULL_REQUEST
};
