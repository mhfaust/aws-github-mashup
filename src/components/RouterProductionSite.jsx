import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import routes from '~/routes.jsx';

// this will be the production site when it goes live
// some renames will be necessary; e.g., training -> production (TODO)
const RouterProductionSite = () => (
        <BrowserRouter>     
            <div>
                {routes('training').map((route, index) => (
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

export default RouterProductionSite;
