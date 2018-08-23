const ec2 = require('../../data/ec2.js');
const helper = require('./awsHelper.js');
const microservices = require('../../../common/microservices.js');

async function vpcInstances (vpcName, microservice)  {

	let instanceDescriptions = await ec2.describeInstances(vpcName, microservice);

	let BastionPublicIp;

	let Microservices = instanceDescriptions.Reservations.map(res => {

		let inst = res.Instances[0];
		let name = inst.Tags.find(tag => tag['Key'] === 'Name').Value.replace(`${vpcName} -`, '').trim();

		if(name === 'SSH-Bastion'){
			BastionPublicIp = inst.PublicIpAddress;
		}

		let tags = helper.reduceTags(inst.Tags);

		return {
			Name: 				name,
			Ec2Name: 			name,
			RepoName: 			microservices.convertName(name, 'ec2', 'git'),
			IacName: 			microservices.convertName(name, 'ec2', 'iac'),
			ApiUrlSegment:		microservices.convertName(name, 'ec2', 'api'),
			DeployMethod: 		tags.Branch ? 'Manual' : "IAC",
			DeployedVersion: 	tags.Branch || tags.Release || null,
			ImageId: 			inst.ImageId,
			InstanceType: 		inst.InstanceType,
			InstanceId:			inst.InstanceId, 
			LaunchTime: 		inst.LaunchTime
		};
	});

	return {
		BastionPublicIp,
		VpcId: instanceDescriptions.Reservations[0].Instances[0].VpcId,
		Microservices
	}
}

module.exports = vpcInstances;
