import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { VpcStatus, Queues } from '~/components'

const Vpc = ({ vpcName, tab }) => (
    <main id="vpc-page">
        <Menu as={'nav'} tabular attached="top">
            <Menu.Item as={NavLink} to={`/vpcs/${vpcName}/ec2s`} name={'EC2s'} active={tab === 'ec2s'}></Menu.Item>
            <Menu.Item as={NavLink} to={`/vpcs/${vpcName}/queues`} name={'Queues'} active={tab === 'queues'}></Menu.Item>
            {/*<Menu.Item as={NavLink} to={`/vpcs/${vpcName}/data`} name={'Data'} active={tab === 'data'}></Menu.Item>*/}
            {/*<Menu.Item as={NavLink} to={`/vpcs/${vpcName}/logs`} name={'Logs'} active={tab === 'logs'}></Menu.Item>*/}
        </Menu>
    {tab === 'ec2s' ? (
        <VpcStatus vpcName={vpcName} />
    ): null}
    {tab === 'queues' ? (
        <Queues vpcName={vpcName} />
    ): null}    
        
    </main>
)

export default Vpc;
