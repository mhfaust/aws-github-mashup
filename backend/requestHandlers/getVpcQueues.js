'use strict';

const ec2 = require('../data/ec2.js');
const sqs = require('../data/sqs.js');

const handler = async function({ vpcName }){
    const infos =  await ec2.describeVpcs(vpcName);
    const info = infos.Vpcs[0];
    
    const qs = await sqs.listQueues(info.VpcId);

    const r = new RegExp(`^.*${info.VpcId}\-(.+)\-([^-]+)\-([^-]+)$`);

    const queues = qs.QueueUrls
        .map(url => url.match(r))
        .reduce((obj, matches) => {
            const url = matches[0]
            const service = matches[1];
            const topic = matches[2];
            const q = matches[3]
            obj[service] = obj[service] || {};
            obj[service][topic] = obj[service][topic] || {};
            obj[service][topic][q] = url;
            return obj;
    }, {});

	return { queues, info } ;
}

module.exports = { handler };