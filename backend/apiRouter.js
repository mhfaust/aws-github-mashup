const express = require('express');
const router = express.Router();

const routeMappings = [
    { verb: 'get', url: '/travis/builds/:repo', handlerName: 'getTravisBuilds' },
    { verb: 'get', url: '/iac/branches', handlerName: 'getIacBranches' },
    { verb: 'get', url: '/iac/compare/:base/:head', handlerName: 'getIacCompare' },
    { verb: 'get', url: '/repos/:repo/compare-refs/:base/:head', handlerName: 'getRepoCompareRefs'},
    { verb: 'get', url: '/tags/:repo', handlerName: 'getTags' },
    { verb: 'get', url: '/vpcs/:vpcName/statuses', handlerName: 'getVpcStatuses' },
    { verb: 'get', url: '/vpcs/:vpcName/queues', handlerName: 'getVpcQueues'},
    { verb: 'get', url: '/vpcs/:vpcName', handlerName: 'getVpc' },
    { verb: 'get', url: '/vpcs/:vpcId/topics/:topicName/subscriptions', handlerName: 'getVpcTopicSubscriptions' },
    { verb: 'get', url: '/vpc-statuses/:vpcName', handlerName: 'getVpcStatuses'},
    { verb: 'post', url: '/vpcs/:vpcName/ec2s/:msName/instances/:instanceId/reboot',  handlerName: 'postVpcEc2InstanceReboot' },
    { verb: 'post', url: '/vpcs/:vpcName/toggle', handlerName: 'postVpcToggle' },
]

routeMappings.forEach( ({url, verb, handlerName}) => {

    const handler = async (request, response, next) => {
        //request.params are the querystring vars (deserialized)
        //request.body are the post vars (deserialized)
        const json = await require('./requestHandlers/' + handlerName).handler(request.params, request.body).catch(next)

        response.json(json);
    }
    router[verb](url, handler);
});


module.exports = router;
