export default {

    connect: (vpcName) =>
        `https://${vpcName}.sw-dev.net/`,

    blueprint: (vpcName) => 
        `https://blueprint.${vpcName}.sw-dev.net/`,
    
    ec2: (vpcName) => 
        `https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#Instances:search=${vpcName};sort=desc:tag:Name`,

    cloudwatch: (vpcName) => 
        `https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logStream:group=${vpcName}`,

    rds: (vpcId) => 
        `https://us-west-2.console.aws.amazon.com/rds/home?region=us-west-2#dbinstance:id=db${vpcId.replace('-','')}`,

    s3: (bucket) => 
        `https://s3.console.aws.amazon.com/s3/buckets/${bucket}/?region=us-west-2&tab=overview#`,

    sqs: (vpcId, serviceRepoName, topicName, q = null) =>{

        if(q)
            return `https://console.aws.amazon.com/sqs/home?region=us-west-2#view-messages:selected=https://sqs.us-west-2.amazonaws.com/647461886534/mq-${vpcId}-${serviceRepoName}-${topicName}-${q};noRefresh=true;prefix=mq-${vpcId}$`
        else
            return `https://console.aws.amazon.com/sqs/home?region=us-west-2#queue-browser:prefix=mq-${vpcId}-${serviceRepoName}-${topicName}$`;
    },

    dashboardImg: (bucketRelativePath) => 
        `https://s3-us-west-2.amazonaws.com/connect-dashboard-images/${bucketRelativePath}`
}

