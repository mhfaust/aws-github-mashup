import React from 'react';
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { vpcNames } from '../../../common'

const iacNavItems = ['CI', 'Deployments', 'Microservices'];
const configNavItems = ['Options', 'Login']

const IacNav = () => (
    <Menu as={'nav'} pointing secondary id="secondary-nav">
        {iacNavItems.map(item => (
            <Menu.Item as={NavLink} to={`/iac/${item.toLowerCase()}`} key={item} name={item}></Menu.Item>
        ))}
    </Menu>
);

const VpcsNav = () => (	
	<Menu as={'nav'} pointing secondary id="secondary-nav">
		{vpcNames.all.map(vpc => (
			<Menu.Item as={NavLink} to={`/vpcs/${vpc}`} key={vpc} name={vpc}></Menu.Item>
		))}
    </Menu>
);

const ConfigNav = () => (
  <Menu as={'nav'} pointing secondary id="secondary-nav">
    <Menu.Menu  position="right">
    {configNavItems.map(item => (
      <Menu.Item as={NavLink} to={`/config/${item.toLowerCase()}`} key={item} name={item}></Menu.Item>
    ))}
    </Menu.Menu>
  </Menu>
)

export { VpcsNav, IacNav, ConfigNav };
