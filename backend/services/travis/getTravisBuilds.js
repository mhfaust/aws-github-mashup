const travis = require('../../data/travis.js');

async function getTravisBuilds(repo) {
  var temp = await travis.getBuilds(repo);
  return temp;
}

module.exports = getTravisBuilds;
