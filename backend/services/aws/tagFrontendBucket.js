const s3  = require('../../data/s3.js');

const getFrontendBucket = (vpcName, frontend) => {

	let frontendSegment = ({
		billing: 'billing.',
		blueprint: 'blueprint.',
		scheduling: 'scheduling.',
		connect: ''
	})[frontend];

	return `${frontendSegment}${vpcName}.sw-dev.net`;
}

async function tagFrontendBucket(vpcName, frontend, DeployMethod, tags){

	// if manual deploy, tag 'Branch ' as repo-branch name
	// else tag 'Release' as github-tag.
	let bucket = getFrontendBucket(vpcName, frontend);

	s3.putBucketTagging( bucket, tags );

	setTimeout(async () => {
		let tagging =  await s3.getBucketTagging(bucket);
		console.log(tagging)

	}, 5000);

}

module.exports = tagFrontendBucket;
