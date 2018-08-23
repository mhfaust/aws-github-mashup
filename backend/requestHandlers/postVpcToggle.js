const asgNameCache = require('../services/asgNameCache.js');
const autoScaling = require ('../data/autoScaling.js');
const helper = require('../services/aws/awsHelper.js');

async function handler ({ vpcName }, { state }) {  // or 'off'

    try{
        let autoScalingGroupNames = await asgNameCache.get(vpcName);

        const newVal = state === 'off' ? 0 : 1;

        const switchParams =  {
            MinSize: newVal,
            MaxSize: newVal,
            DesiredCapacity: newVal
        };

        let p = await Promise.all(autoScalingGroupNames.map(asgName =>
            autoScaling.updateAutoScalingGroup( asgName, switchParams )
        ));

        let groups = await autoScaling.describeAutoScalingGroups(autoScalingGroupNames);

        //todo this needs to be kept in sync with how the 'viewmodel' is returned for allVpcsAwakeStatus
        //  -- so extract this into a reusable fn:
        return helper.toVpcStatus(groups)
    }
    catch(err){
        return 'FAIL';
    }
}

module.exports = { handler };
