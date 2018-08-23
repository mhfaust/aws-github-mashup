const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

let ec2 = new AWS.EC2();

const describeInstances = (vpcName, microservice) => new Promise((resolve, reject) => {

	let Filters = [{
				Name: 'tag-value',
				Values: [ vpcName ]
			},{
				Name: 'instance-state-name',
				Values: [ 'running' ]
			}];

	if(microservice){
		Filters.push({ Name: 'tag:Microservice' , Values:  [microservice] });
	}
	
	return ec2.describeInstances(
		{ Filters }, 
		(err, data) => err ? reject(err) : resolve(data)
	);
});

const describeVpcs = (vpcName) => new Promise((resolve, reject) => {

	let Filters = [{
				Name: 'state',
				Values: [ 'available' ]
			}];

    if(vpcName)
    	Filters.push({
				Name: 'tag:Name',
				Values: [ vpcName ]
			})
    
	return ec2.describeVpcs(
		{ Filters }, 
		(err, data) => err ? reject(err) : resolve(data)
	);
});



const rebootInstance = (instanceId) => new Promise((resolve, reject) => {

	return ec2.rebootInstances(
		{
			InstanceIds: [instanceId]
		},
		(err, data) => err ? reject(err) : resolve(data)
	);
})




module.exports = { describeInstances, describeVpcs, rebootInstance };