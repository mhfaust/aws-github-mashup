const ec2 = require('../../data/ec2.js');
const helper = require('./awsHelper.js');

async function vpcNames() {

    let response = await ec2.describeVpcs();
    return response.Vpcs.map(vpc => helper.reduceTags(vpc.Tags).Name);
}

module.exports = vpcNames;
