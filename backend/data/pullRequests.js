const github = require('github')();
const errors = require('../errors.js');


const owner = 'Thecompany';

// TODO: OAuth2
let authenticate = () => github.authenticate({
  type: 'oauth',
  token: process.env.GIT_TOKEN 
});


const getAll = (repo) => new Promise((resolve, reject) => {

    authenticate();
    
    return github.pullRequests.getAll(
        { owner, repo, state: 'open', per_page: 100 },
        (err, res) => err ? reject(err) : resolve(res.data)
    );
}) 



module.exports = {
    getAll
}