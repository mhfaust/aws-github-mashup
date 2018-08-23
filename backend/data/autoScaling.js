const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

let autoScaling = new AWS.AutoScaling();

const handleError = (err, reject, fnName) => {
    console.log(`error source: ${fnName} in ${__filename}. \n${err}`);
    reject(err);
}

const getGroups = (NextToken, AutoScalingGroupNames) => new Promise((resolve, reject) => {
    let MaxRecords = 100;
    let params = NextToken && NextToken.length ? { NextToken, MaxRecords } : { MaxRecords };

    if(AutoScalingGroupNames)
        params = { ...params, AutoScalingGroupNames};

    autoScaling.describeAutoScalingGroups(
        params, 
        (err, data) => err ? handleError(err, reject, 'getGroups', ) : resolve(data)
    );
});

const describeAutoScalingGroups = (AutoScalingGroupNames) => new Promise(async (resolve, reject) => {

    if(AutoScalingGroupNames && AutoScalingGroupNames.length > 50){
        console.log(`can't get ASGs when there are over 50. First ASGName: ${AutoScalingGroupNames[0]}`);
        resolve( [] );
        return;
    }
    try{
        let groups = [];
        let page = { NextToken: true };
        
        while(page.NextToken){
            page = await getGroups(page.NextToken, AutoScalingGroupNames);            
            groups.splice(groups.length, 0, ...page.AutoScalingGroups);        
        }

        resolve( groups );
    }
    catch(err){
        handleError(err, reject, describeAutoScalingGroups.name)
    }
});



const updateAutoScalingGroup = (AutoScalingGroupName, params) => new Promise((resolve, reject) => {

    let mergedParams = { AutoScalingGroupName, ...params }
    
    autoScaling.updateAutoScalingGroup(mergedParams, (err, data) => {
        if(err) {
            handleError(err, reject, updateAutoScalingGroup.name) 
        }
        else{
            
            resolve(data)
        }
    });
});




const getInstances = (NextToken) => new Promise((resolve, reject) => {

    try{
        let MaxRecords = 50;
        let params = NextToken && NextToken.length ? { NextToken, MaxRecords } : { MaxRecords };

        autoScaling.describeAutoScalingInstances(
            params, 
            (err, data) => err ? handleError(err, reject, arguments) : resolve(data)
        );        
    }
    catch(err){
        handleError(err, reject, getInstances.name);
    }

});

const describeAutoScalingInstances = () => new Promise(async (resolve, reject) => {

    try{
        let instances = [];
        let page = { NextToken: true };

        while(page.NextToken){
            page = await getInstances(page.NextToken);
            instances.splice(instances.length, 0, ...page.AutoScalingInstances);        
        }

        resolve( instances );        
    }
    catch(err){
        handleError(err, reject, describeAutoScalingInstances.name);
    }
});



module.exports = { describeAutoScalingGroups, updateAutoScalingGroup, describeAutoScalingInstances };
