const travis = require('../data/travis.js');

// just get all tags for now, decide how to use them in presentation
module.exports = { handler: ({ repo }) => travis.getBuilds(repo) };
