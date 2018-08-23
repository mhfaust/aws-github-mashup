'use strict'
const repos = require('../data/repos.js');
const pullRequests = require('../data/pullRequests.js');

async function handler(){
	let [branches, prs] = await Promise.all([
		repos.getBranches('iac').then(response => response.data),
		pullRequests.getAll('iac').then(response => response)
	]);

	//all pr labels prepend a branch name with 'Shiftwise:', hence the .slice(10) 
	let prBranchNames = new Set(prs.map(pr => pr.head.label.slice(10)));

	branches.forEach(branch => branch.pullRequestUrl = 
		(prBranchNames.has(branch.name) 
			//it's ok to loop over the prs inside this loop
			//because only a handful of PRs should be open at any time
			? prs.find(pr => pr.head.label.includes(branch.name)).html_url 
			: null
		)
	);

	branches.sort((a,b) => 
		!(prBranchNames.has(a.name) ^ prBranchNames.has(b.name)) // not XOR = they're the same.
			? 0
			: prBranchNames.has(a.name)
				? -1
				: +1
	);

	return branches;
}

module.exports = { handler }