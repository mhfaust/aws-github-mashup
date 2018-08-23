var getIacTags = require ('../services/github/getIacTags.js');
var microservices = require('../../common/microservices.js');
var pullRequests = require('../data/pullRequests.js');
var repos = require('../data/repos.js');

function getMsDevTags () {
	return Promise.resolve(microservices.allServiceNamesFor('iac')
		.reduce((obj, iacName) => { obj[iacName] = 'develop'; return obj; }, {}));
}

const compareVersionSets = (baseTags, headTags) => {

	return Promise.all(Object.keys(baseTags)
		.filter(iacName =>  baseTags[iacName] &&  headTags[iacName])
		.map(iacName => {
			let repoName = microservices.convertName(iacName, 'iac', 'git');
			return repos.compareCommits(repoName, baseTags[iacName], headTags[iacName])
				.then(response => {
					return {
						msName: iacName,
						repoName,
						baseTag: baseTags[iacName],
						headTag: headTags[iacName],
						status: response.data.status,
						ahead_by: response.data.ahead_by,
						behind_by: response.data.behind_by,
					}
				});
		}))
		.then(promisesData => {
			const combinedPromise = promisesData.reduce((obj, data) => {
				if(data && data.msName)
					obj[data.msName] = data;
				else{
					console.log('this promise didn\'t provide data:', data)
				}

				return obj
			}, {});
			return combinedPromise;
		});
}

async function handler({base, head}) {

	let basePromise = base === 'microservices-develop' ? getMsDevTags() : getIacTags(base);
	let headPromise = head === 'microservices-develop' ? getMsDevTags() : getIacTags(head);

	let [baseTags, headTags] = await Promise.all([basePromise, headPromise]);
	return await compareVersionSets(baseTags, headTags);
}

module.exports = { handler }
