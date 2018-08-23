const sns = require('../data/sns.js');

async function listSubscriptionsByTopic({ vpcId, topicName} ){
	const topicArn = `arn:aws:sns:us-west-2:647461886534:pt-${vpcId}-${topicName}`;
	const response = await sns.listSubscriptionsByTopic(topicArn);

	return response.Subscriptions
}

module.exports = { handler: listSubscriptionsByTopic };
