import React from 'react';
import Favicon from 'react-favicon';
import { vpcNames } from '../../../common';
import { awsUrls } from '~/dataServices';

const View = ({name, size, style}) => {
    size = size || 100;
    const path = vpcNames.isFunko(name) 
        ? `funko-pops/${name}.jpg` 
        : 'davinci-bw.jpg';
    
    let mergedStyle = { 
        ...style, 
        backgroundImage: `url(${awsUrls.dashboardImg(path)})`,
        height: size+'px',
        width: size+'px',
        borderWidth: Math.ceil(size/30)+'px'
    };

    return (
        <span className={`Funko vpcImg`} style={mergedStyle} >
            <Favicon url={awsUrls.dashboardImg(path)}></Favicon>
        </span>
    )
}


export default View;