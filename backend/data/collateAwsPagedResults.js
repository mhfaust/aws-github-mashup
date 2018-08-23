

collateAwsPagesResults = (awsApiCallingFn, params) => new Promise(async (resolve, reject) => {
    
    let results = [];
    let page = { NextToken: true };

    while(page.NextToken){
        page = await getGroups(page.NextToken, params);
        groups.splice(groups.length, 0, ...page.AutoScalingGroups);        
    }

    awsApiCallingFn(
        params, 
        (err, data) => err ? reject(err) : resolve(data)
    );

});