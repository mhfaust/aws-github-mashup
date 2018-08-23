const ec2 = require('../data/ec2.js');

async function handler ({ vpcName, msName, instanceId }) {
    await ec2.rebootInstance(instanceId);
	return { rebooting: `${vpcName}/${msName}/${instanceId}` };
}

module.exports = { handler }