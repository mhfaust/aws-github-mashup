const microservices = require('../../common/microservices.js');

const chalk = require('chalk');
const autoScaling = require('../data/autoScaling.js');
const ec2 = require('../data/ec2');
const helper = require('./aws/awsHelper')

const cache = {};
const asgNamePrefixes = microservices.allServiceNamesFor('asg');
const getTagsObj = (group) => group.Tags.reduce((obj, tag) => {
        obj[tag.Key] = tag.Value;
        return obj;
    }, {});
let refreshPromise = null;
let refreshing;


async function _refreshCache () {
    refreshing = true;
    console.log('refreshing AutoScalingGroupNames cache...')
    const groups = await autoScaling.describeAutoScalingGroups();

    const asgsByVpc = groups.reduce((obj, group) => {
        const envTag = group.Tags.find(tag => tag.Key === 'Environment')
        if(envTag){
            const vpc = envTag.Value;
            obj[vpc] = obj[vpc] || [];
            const asg = {
                name: group.AutoScalingGroupName,
                tags: getTagsObj(group),
                instanceIds: group.Instances.map(i => i.InstanceId)
            };
            obj[vpc].push(asg);            
        };
        return obj;
    }, {});

    const vpcsFound = new Set(Object.keys(asgsByVpc));

    //double-check that we found asg-names 
    const vpcs = await ec2.describeVpcs();

    const vpcNames = vpcs.Vpcs.map(vpc => helper.reduceTags(vpc.Tags).Name);

    vpcNames.forEach(vpcName => {
        if(!vpcsFound.has(vpcName))
            console.log(chalk.red(`DescribeAutoScalingGroups did not find any entry tagged with Environment: ${vpcName}.`));
        else{
            validateVpcAsgNames(vpcName, asgsByVpc[vpcName])
        }
    });
    Object.keys(asgsByVpc).forEach(vpc => cache[vpc] = asgsByVpc[vpc]);

    refreshing = false;
    return true;
}


function validateVpcAsgNames(vpcName, asgsData){
    if(!asgsData)
        return console.log(`no asgsData for ${vpcName}`);
    
    let foundMatched = new Set();
    const notFound = [];
    
    asgNamePrefixes.forEach((serviceAsgName, i) => {
        const namePrefix = `${vpcName}${serviceAsgName}`;
        if(!asgsData.find(asg => asg.name.startsWith(namePrefix)))
            notFound.push(namePrefix);
        else{
            foundMatched.add(i)
        };
    });
    
    notFound.forEach(nameValue => console.log(`    not found: ${nameValue}`));
}

async function get(serviceIacName) {
    if(refreshPromise === null)
        refreshPromise = _refreshCache();

    return refreshPromise.then(() => {
        let cached = cache[serviceIacName]
        if(cached)
            return cached.map(asg => asg.name);
        else{
            return [];
            console.log(`asgNameCache found no cached entry for ${serviceIacName}`);
        }
    });
}

function refresh(){
    //if it's not already in the middle of a refresh, initiate one.
    //otherwise, just wait for the current refresh to resolve.
    if(!refreshing)
        refreshPromise = _refreshCache();

    return refreshPromise.then(() => true);
}

module.exports = { get, refresh, validateVpcAsgNames } ;