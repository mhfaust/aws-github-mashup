import React from 'react';

const View = ({status, ApiUrlSegment, vpcName}) => {
    
    let code = status ? status.toString().slice(0,1) : '';
    let statusClass =  `HttpStatusMonitor status-${code}00`;
    
    return (
        <span 
            className={statusClass} 
            data-ms={ApiUrlSegment} 
            data-vpc={vpcName}>
                {status}
        </span>
    )
}

export default View;