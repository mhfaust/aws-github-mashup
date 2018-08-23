import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import View  from './View.jsx';
import { backendApi } from '~/dataServices'; 
import { actionCreators } from '~/stateManagement';


const mapStateToProps = (state, ownProps) => {
    
    const recorded = state.reboots[ownProps.instanceId];
    return{
        happening: !!recorded && (recorded.status === 'initiated' || recorded.status === 'underway'),
        instanceId: ownProps.instanceId,
        Ec2Name: ownProps.Ec2Name,
        vpcName: ownProps.vpcName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        handleClick: () => {
            backendApi.rebootInstance(ownProps.vpcName, ownProps.Ec2Name, ownProps.instanceId)
                .then(
                    () => dispatch(actionCreators.initiateReboot(
                        ownProps.vpcName, 
                        ownProps.Ec2Name, 
                        ownProps.instanceId
                    ))
                )
       }
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(

    (props) => React.createElement(View, { ...props })
    
);

export default connected;