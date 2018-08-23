import actionTypes from './';
import { backendApi } from '~/dataServices';
import { store } from './'

function initiateReboot(vpcName, ec2, instanceId){

    return {
        type:'REBOOT_INITIATED',
        instanceId,
        status: 'initiated',
        time: new Date()
    }
}

function resolveReboot(instanceId, status){
    
    return{
        type: 'REBOOT_RESOLVED',
        instanceId,
        status,
        time: new Date()
    }
}

function detectReboot(instanceId){
    return{
        type: 'REBOOT_DETECTED_UNDERWAY',
        instanceId,
        status: 'underway',
        time: new Date()
    }    
}

function switchVpc(vpcName, wakefullness){
    return{
        type: 'SWITCH_VPC',
        vpcName,
        wakefullness
    }
}

export default { initiateReboot, resolveReboot, detectReboot }