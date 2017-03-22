module.exports = {
  expUsername: process.env.EXP_USERNAME,
  expPassword: process.env.EXP_PASSWORD,
  githubUsername: process.env.GITHUB_USERNAME,
  githubToken: process.env.GITHUB_TOKEN,
  githubOrg: process.env.CIRCLE_PROJECT_USERNAME,
  githubRepo: process.env.CIRCLE_PROJECT_REPONAME,
  githubSourceBranch: process.env.CIRCLE_BRANCH,
  githubPullRequestId: (process.env.CI_PULL_REQUEST || '').split('/').slice(-1)[0]
};
