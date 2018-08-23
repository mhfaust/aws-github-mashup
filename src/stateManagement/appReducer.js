import actionTypes from './actionTypes.js';

const initialState = {
    reboots: {},
    instanceHttpStatuses: {},
    vpcWakefullness: {}
}

// const makeRebootUpsertObj rebootRecord = (id, record) => 
    //Object.assign({}, state.reboots)[id] = record;

function appReducer(state = initialState, action){
    
    let reboots = { ... state.reboots };
    
    switch (action.type){

        case 'REBOOT_INITIATED':

            let newReboot =  {
                time: action.time,
                status: 'initiated'
            };

            return { 
                reboots: { 
                    ...state.reboots, 
                    [action.instanceId]: newReboot
            }};


        case 'REBOOT_DETECTED_UNDERWAY':

            let reboot = {  
                time: action.time,
                status: 'underway'
            }

            reboots[action.instanceId] = reboot;

            return { ... state, reboots };


        case 'REBOOT_RESOLVED':

            let resolveReboot =  {
                time: action.time,
                status: action.status
            };

            reboots[action.instanceId] = resolveReboot;

            return { ... state, reboots };

        case 'SWITCH_VPC':

            return { 
                vpcWakefullness: {
                    ...state.vpcWakefullness, 
                    [action.vpcName]: action.wakefullness
                }
            };


        default:
            return state;            
    }
}

export default appReducer;