const github = require('github')();
const errors = require('../errors.js');
const chalk = require('chalk');

const owner = 'Thecompany';

// TODO: OAuth2
const authenticate = () => github.authenticate({
  type: 'oauth',
  token: process.env.GIT_TOKEN
});

const getContent = (repo, path, ref) => new Promise((resolve, reject) => {

	ref = ref || 'develop';

	authenticate();

	return github.repos.getContent(
		{ owner, repo, ref, path },
		(err, res) => {
			err ? reject(err) : resolve(new Buffer(res.data.content, 'base64').toString("ascii"))
		}
	);
});

const compareCommits = (repo, base, head) => new Promise((resolve, reject) => {

	//Tf the tags being compared are the same by name, no need to ask github about that:
	if(base === head){
		return resolve({data: {
			status: 'identical',
			ahead_by: 0,
			behind_by: 0
		}});
	}

	authenticate();

	return github.repos.compareCommits(
		{ owner, repo, base, head },
		(err, res) => {
			if(err && err.code === 404){
				logCommitCompare404Message(repo, base, head)
				resolve({data: {
					status: null,
					ahead_by: null,
					behind_by: null
				}});
			}
			else{
				resolve(res)
			}
		}
	);
});

const logCommitCompare404Message = (repo, base, head) => console.log(
	`${chalk.red('github did not find at least one of the following:')}
		repository: ${repo},
		ref "${base}" for ${repo},
		ref "${head}" for ${repo}
	(The github response did not detail which of these 3 it could not find.)
`);

//https://octokit.github.io/rest.js/#api-Repos-getTags
// 100 is the max that will be returned at one time
const getTags = (repo, page, authenticated) => new Promise((resolve, reject) => {
	if(!authenticated) authenticate();

	return github.repos.getTags(
		{ owner, repo, page, per_page: 100 },
		(err, res) => err ? reject(err) : resolve(res) // todo: should be .data
	);
});

async function getAllTags(repo) {
    authenticate();

    let page = 1;
	let tags = [];

    while (page > 0) {
        var newTags = await getTags(repo, page, true);
		tags = tags.concat(newTags.data);
	    page++;
		if (newTags.data.length < 100) page = 0;
	}

	return tags;
};

const getBranches = (repo) => new Promise((resolve, reject) => {
	authenticate();

	github.repos.getBranches(
		{ owner, repo, per_page: 100 },
		(err, res) => {
			err ? reject(err) : resolve(res) 
		}
	);
});

const getCommits = (repo, sha, since, page = 1) => new Promise((resolve, reject) => {

	authenticate();

	return github.repos.getCommits(
		{ owner, repo, sha, since, page, per_page: 100 },
		(err, res) => err ? reject(err) : resolve(res.data)
	);
})

async function getCommitsPageless(repo, sha, since){

	authenticate();

	let commits = [];
	let complete = false;
	let page = 1;

	while(!complete){
		
		let newCommits = await getCommits(repo, sha, since, page);

		commits = commits.concat(newCommits);
		if(!newCommits || newCommits.length < 100)
			complete = true;
		else
			page++;
	}

	return commits;

}

module.exports = {
	getContent,
	compareCommits,
	getBranches,
	getCommits,
	getCommitsPageless,
	getTags,
	getAllTags
};
