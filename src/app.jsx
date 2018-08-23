import css from './global.scss';


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterEngineeringSite, RouterProductionSite } from '~/components';

import { store } from '~/stateManagement';


export default {
	init: (audience) => 
		ReactDOM.render((
			<Provider store={store}>
				{
					audience === 'engineering' 
					? <RouterEngineeringSite />
					: <RouterProductionSite />
				}
			</Provider>
		), document.getElementById('site-container'))
}
