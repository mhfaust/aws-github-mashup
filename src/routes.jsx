import React from 'react';

import { VpcsNav, IacNav, ConfigNav } from '~/components/Nav';
import { Vpc, VpcsHome, CI, DeployStatus, Login, Microservices, Options } from '~/components/';

const routes = (audience) => {

    const allRoutes = [
        {
            exact: true,
            path: '/vpcs',
            navLevel2: () => <VpcsNav />,
            mainContent: () => <VpcsHome audience={audience}/>,
            training: true
        },
        {
            exact: true,
            path: '/vpcs/:vpcName',
            navLevel2: () => <VpcsNav />,
            mainContent: props => <Vpc vpcName={props.match.params.vpcName} tab='ec2s' />,
            training: false
        },
        {
            exact: true,
            path: '/vpcs/:vpcName/ec2s',
            navLevel2: () => <VpcsNav />,
            mainContent: props => <Vpc vpcName={props.match.params.vpcName} tab='ec2s' />,
            training: false
        },
        {
            exact: true,
            path: '/vpcs/:vpcName/queues',
            navLevel2: () => <VpcsNav />,
            mainContent: props => <Vpc vpcName={props.match.params.vpcName} tab='queues' />,
            training: false
        },
        {
            exact: true,
            path: '/iac',
            navLevel2: () => <IacNav />,
            mainContent: () => <CI />,
            training: false
        },
        {
            exact: true,
            path: '/iac/ci',
            navLevel2: () => <IacNav />,
            mainContent: () => <CI />,
            training: false
        },
        {
            exact: true,
            path: '/iac/deployments',
            navLevel2: () => <IacNav />,
            mainContent: () => <DeployStatus />,
            training: false
        },
        {
            exact: true,
            path: '/iac/microservices',
            navLevel2: () => <IacNav />,
            mainContent: () => <Microservices />,
            training: false
        },
        {
            exact: true,
            path: '/config',
            navLevel2: () => <ConfigNav />,
            mainContent: () => <Login />,
            training: false
        },
        {
            exact: true,
            path: '/config/options',
            navLevel2: () => <ConfigNav />,
            mainContent: () => <Options />,
            training: false
        },
        {
            exact: true,
            path: '/config/login',
            navLevel2: () => <ConfigNav />,
            mainContent: () => <Login />,
            training: false
        }
    ]

    return audience === 'training' // ???
        ? allRoutes.filter(route => route.training)
        : allRoutes;
}

export default routes;
