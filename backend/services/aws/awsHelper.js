const getServiceName = (asg) => asg.Tags.find(tag => tag.Key === 'Microservice');

const toVpcStatus = (asgs) => {
	const servicesOn = asgs.filter(g => g.DesiredCapacity).map(getServiceName);
	const servicesOff =  asgs.filter(g => !g.DesiredCapacity).map(getServiceName);
	return {
		autoScalingGroupNames : asgs.map(g => g.AutoScalingGroupName),
		servicesOn,
		servicesOff,
		awakeness: !!servicesOn.length ? 'awake' : 'asleep'
	}
};

const reduceTags = tags => tags.reduce((map, tag) => { map[tag.Key] = tag.Value; return map; }, {});

module.exports = { toVpcStatus, reduceTags }
