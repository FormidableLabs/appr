const request = require('request');
const utils = require('./utils');
const config = require('./config');
const log = require('./log');
module.exports = function postDeploy() {
  const expUrl = `https://expo.io/@${config.expUsername}/${utils.readPackageJSON().name}`;
  const expUrlForQRCode = `https://exp.host/@${config.expUsername}/${utils.readPackageJSON().name}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${expUrlForQRCode}`;

  log('Exponent URL', expUrl);
  log('QR Code URL ', qrUrl);

  const body = `
  :shipit: This branch has been deployed to:
  ${expUrl}

  Download the [Expo](https://expo.io/) app and scan this QR code to get started!

  ![QR Code](${qrUrl})
  `;

  if (config.githubPullRequestId) {
    const issueUrl = `https://${config.githubUsername}:${config.githubToken}@api.github.com/repos/${
      config.githubOrg
    }/${config.githubRepo}/issues/${config.githubPullRequestId}/comments`;

    log('GitHub Issue URL', issueUrl);
    request.get(
      {
        url: issueUrl,
        headers: { 'User-Agent': 'ci' }
      },
      (getError, getResponse) => {
        if (getError) {
          console.error('Failed to check comments on GitHub, an error occurred', getError);
        } else if (getResponse.statusCode >= 400) {
          console.error('Failed to check comments on GitHub, request failed with', getResponse);
        } else {
          const comments = JSON.parse(getResponse.body);
          if (!comments.filter(comment => comment.body === body).length) {
            request.post(
              {
                url: issueUrl,
                headers: { 'User-Agent': 'ci' },
                body: JSON.stringify({ body })
              },
              (postError, postResponse) => {
                if (postError) {
                  console.error('Failed to post comment to GitHub, an error occurred', postError);
                } else if (postResponse.statusCode >= 400) {
                  console.error(
                    'Failed to post comment to GitHub, request failed with',
                    postResponse
                  );
                } else {
                  console.log(`Posted message to GitHub PR #${config.githubPullRequestId}`);
                }
              }
            );
          }
        }
      }
    );
  }
};
