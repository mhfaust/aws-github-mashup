const https = require('https');

// NOTE ABOUT THIS FILE
// this currently isn't working; the response contains circular references. Instead of messing with it,
// I'm just going to link to the build page for now. This is not a requirement for NEXT-10202; we may
// revisit the status board later.

const travisToken = process.env.TRAVIS_TOKEN;
// It is possible to use the repository id or slug in the request. The result is paginated. Each request will return 25 results.
//
// GET
// /repo/{repository.id}/builds
var httpsGet = function (options) {
  return new Promise((resolve, reject) => {
    let request = https.get(options, (response) => {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject({ code: response.statusCode, status: response.statusMessage, repo: '', ref: options.path });
      } else {
        console.log(response);
        resolve(response);
      }
    }).on('error', (e) => { reject(e); });
    request.end();
  });
}
async function getBuilds(repo) {
  var options = {
    protocol: 'https:',
    hostname: 'api.travis-ci.com',
    path: '/repo/Thecompany%2F' + repo + '/builds',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Travis-API-Version': 3,
      'Authorization': 'token ' + travisToken
    }
  };
  return await httpsGet(options);
}

module.exports = {
  getBuilds
}
