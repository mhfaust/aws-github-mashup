const asgNameCache = require('../services/asgNameCache.js');
const autoScaling = require ('../data/autoScaling.js');
const helper = require('../services/aws/awsHelper.js');

async function handler({ vpcName }){
	let asgNames = await asgNameCache.get(vpcName);

	const groups = asgNames && asgNames.length
		? await autoScaling.describeAutoScalingGroups(asgNames)
		: [];

	return helper.toVpcStatus(groups);
}

module.exports = { handler };
