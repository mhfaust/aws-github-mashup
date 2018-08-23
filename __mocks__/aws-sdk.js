const mockResponse = require('./mockResponse.js');

const service = 'aws-sdk';
module.exports = {
  config: { update: () => {} },
  AutoScaling: function () { return {
    describeAutoScalingGroups: (config, callback) => {
      if(config.AutoScalingGroupNames) {
        mockResponse(`autoScaling.describeAutoScalingGroups.ackbar.json`, callback, `describeAutoScalingGroups`, service);
      } else {
        const nextPage = config.NextToken && config.NextToken.length ? config.NextToken : 'page1';
        mockResponse(`autoScaling.describeAutoScalingGroups.${nextPage}.json`, callback, `describeAutoScalingGroups`, service);
      }
    },
    updateAutoScalingGroup: (config, callback) =>
      callback(null, { "mockUpdateAutoScalingGroupResponseKey": 'mock value' } )
  }},
  SNS: function() { return {
    listSubscriptionsByTopic: (config, callback) =>
      mockResponse(`sns.listSubscriptionsByTopic.batman.BlueprintCustomerPublished.json`, callback, `listSubscriptionsByTopic`, service)
  }},
  SQS: function() { return {
    listQueues: (config, callback) =>
      mockResponse(`sqs.listQueues.batman.json`, callback, `listQueues`, service)
  }},
  EC2: function() { return {
    describeInstances: (config, callback) =>
      mockResponse(`ec2.describeInstances.batman.json`, callback, `describeInstances`, service),
    describeVpcs: (config, callback) => {
      const nameFilter = config.Filters.find(f => f.Name === 'tag:Name');
      if(nameFilter)
        mockResponse(`ec2.describeVpcs.${nameFilter.Values[0]}.json`, callback, `describeVpcs`, service);
      else
        mockResponse(`ec2.describeVpcs.json`, callback, `describeVpcs`, service);
    },
    rebootInstances: (config, callback) => { callback(null, true) }
  }},
  S3: function(){ return {
    getBucketTagging: (config, callback) => mockResponse('s3.getBucketTagging.connect-frontend.json', callback, `getBucketTagging`, service)
  }}
};
