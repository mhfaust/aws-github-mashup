const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

let sqs = new AWS.SQS();

const listQueues = (vpcId)  => new Promise((resolve, reject) => {

    return sqs.listQueues(
        { QueueNamePrefix: `mq-${vpcId}`}, 
        (err, data) => err ? reject(err) : resolve(data)
    );

});

module.exports = {
    listQueues
}