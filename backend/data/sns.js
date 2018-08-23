const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

let sns = new AWS.SNS();

const listTopics = (NextToken) => new Promise((resolve, reject) => {

    let params = NextToken && NextToken.length ? { NextToken } : {};
    
    let response = sns.listTopics(
        params, 
        (err, data) => err ? reject(err) : resolve(data)
    );
});

const listAllTopics = async () => {

    let topics = [];
    let page = { NextToken: true };
    
    while(page.NextToken){
        page = await listTopics( page.NextToken );
        topics.splice(topics.length, 0, ...page.Topics);
    }
    
    return topics;
}

const listSubscriptionsByTopic = (TopicArn, NextToken) => new Promise((resolve, reject) => {

    let params = NextToken && NextToken.length ? { NextToken, TopicArn } : { TopicArn };
    sns.listSubscriptionsByTopic(
        params, 
        (err, data) => err ? reject(err) : resolve(data)
    );
});

module.exports = {
    listTopics,
    listAllTopics,
    listSubscriptionsByTopic
}