const repos = require('../data/repos.js');

// just get all tags for now, decide how to use them in presentation
module.exports = { handler: ({ repo }) => repos.getAllTags(repo) };
