const vpcInstances = require('../services/aws/vpcInstances');
const getIacTags = require('../services/github/getIacTags');
const s3 = require('../data/s3');
const serviceMergeStatuses = require('../services/github/serviceMergeStatuses');
const microservices = require('../../common/microservices');

async function getVpc ({ vpcName })  {

	let tags, vpcInfo;


	try{

		const [
			tags,
			instancesInfo,
			connectTags,
			schedulingTags,
			billingTags,
			blueprintTags
		] = await Promise.all([
			getIacTags('develop'),
			vpcInstances(vpcName),
			s3.getBucketTagging(`${vpcName}.sw-dev.net`),
			s3.getBucketTagging(`scheduling.${vpcName}.sw-dev.net`),
			s3.getBucketTagging(`billing.${vpcName}.sw-dev.net`),
			s3.getBucketTagging(`blueprint.${vpcName}.sw-dev.net`)
		]);

		//ms.RepoName, ms.IacMicroServiceTag, ms.DeployedVersion

		if( blueprintTags.TagSet &&  blueprintTags.TagSet.find)
			instancesInfo.Microservices.push({
				Name: 'Blueprint Website',
				IacName: 'blueprint-website',
				RepoName: 'blueprint-website',
				DeployedVersion: blueprintTags.TagSet.find(tag => tag.Key === 'Release').Value
			});

		if( connectTags.TagSet &&  connectTags.TagSet.find)
			instancesInfo.Microservices.push({
				Name: 'Connect Frontend',
				IacName: 'connect-frontend',
				RepoName: 'connect-frontend',
				DeployedVersion: connectTags.TagSet.find(tag => tag.Key === 'Release').Value
			})

		if( schedulingTags.TagSet &&  schedulingTags.TagSet.find)
			instancesInfo.Microservices.push({
				Name: 'Scheduling Frontend',
				IacName: 'scheduling-frontend',
				RepoName: 'scheduling-frontend',
				DeployedVersion: schedulingTags.TagSet.find(tag => tag.Key === 'Release').Value
			})

		if( billingTags.TagSet &&  billingTags.TagSet.find)
			instancesInfo.Microservices.push({
				Name: 'Billing Frontend',
				IacName: 'billing-frontend',
				RepoName: 'billing-frontend',
				DeployedVersion: billingTags.TagSet.find(tag => tag.Key === 'Release').Value
			})

		console.log('tag', tags['connect-frontend'])

		instancesInfo.Microservices.forEach(ms => {
			ms.IacMicroServiceTag = tags[ms.IacName];
		});



        const statuses = await serviceMergeStatuses(instancesInfo);

        instancesInfo.Microservices.forEach(ms => ms.statusRelativeToIac = statuses[ms.RepoName]);

        return instancesInfo;
	}
	catch(e){
		throw e;
	}
}

module.exports = { handler: getVpc }
