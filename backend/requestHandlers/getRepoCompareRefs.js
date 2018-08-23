var repos = require('../data/repos.js');

async function handler({ repo, base, head }){
	
	if(base == head)
		return { baseOnlyCommits: [], headOnlyCommits: [] };

	let comp = await repos.compareCommits(repo, base, head);
	let mergeBaseCommitDate = comp.data.merge_base_commit.commit.author.date;
	//merge_base_commit isn't always accurate, apparently, so get up to 30 days 
	//of commits begore that on each branch for the comparison
	let d = new Date(new Date(mergeBaseCommitDate).getTime() - 30 * 24 * 60 * 60 * 1000);
	
	let baseCommits = await repos.getCommitsPageless(repo, base, d);
	let headCommits = await repos.getCommitsPageless(repo, head, d);

	// let [baseCommits, headCommits] = await Promise.all([
	// 	repos.getCommitsPageless(repo, base, d),
	// 	repos.getCommitsPageless(repo, head, d)
	// ]);

	let baseShas = new Set(baseCommits.map(c => c.sha));
	let headShas = new Set(headCommits.map(c => c.sha));
	
	return{
		baseOnlyCommits: baseCommits.filter(c => !headShas.has(c.sha)),
		headOnlyCommits: headCommits.filter(c => !baseShas.has(c.sha))
	}
}

module.exports = { handler };