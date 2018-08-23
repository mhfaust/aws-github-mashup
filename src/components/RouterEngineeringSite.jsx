import React from 'react';
import { BrowserRouter, Route, Link, NavLink, } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import routes from '~/routes.jsx';
import awsUrls from '../dataServices/awsUrls';

// totally fake; TODO GitHub
const auth = {
  isAuthenticated: true,
  //authenticate(cb) {
  //  this.isAuthenticated = true
    //setTimeout(cb, 100) // fake async
  //},
  //signout(cb) {
  //  this.isAuthenticated = false
    //setTimeout(cb, 100) // fake async
  //}
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/vpcs' />
  )} />
);

const RouterEngineeringSite = () => (
        <BrowserRouter>
            <div>
                <div id="site-navigation">
                    <Menu as={'nav'} inverted pointing id='primary-nav'>
                        <Menu.Item as={NavLink} to="/vpcs">VPCs</Menu.Item>
                        <Menu.Item as={NavLink} to="/iac">Pipeline</Menu.Item>
                        <Menu.Menu position='right'>
                          <Menu.Item as={NavLink} to="/config">
                            Connect Dashboard
                            <img className="ui mini image" src={awsUrls.dashboardImg('Thecompany-logo.png')} style={{marginLeft: 2 + 'em'}} />
                          </Menu.Item>
                        </Menu.Menu>
                    </Menu>

                    {routes('engineering').map((route, index) => (
                     <PrivateRoute
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.navLevel2}
                      />
                    ))}
                </div>
                            
                {routes('engineering').map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={route.mainContent}
                  />
                ))}     
            </div>
        </BrowserRouter>
    )

export default RouterEngineeringSite;
