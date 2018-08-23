import React from 'react';
import { Icon } from 'semantic-ui-react'

const View = (props) => (
        <Icon
            name='refresh'
            data-vpc-name={props.vpcName}
            data-microservice={props.Ec2Name}
            data-instance-id={props.instanceId}
            onClick={(e) => props.handleClick(props.vpcName, props.Ec2Name, props.instanceId)}
            className={props.happening ? 'RebootButton happening' : 'RebootButton idle'} >
        </Icon>
    )

export default View;