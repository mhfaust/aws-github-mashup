import { appReducer } from './';
import { createStore } from 'redux';

const store = createStore(appReducer);

export default store;