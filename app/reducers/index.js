import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import counter from './counter';
import { settings, activeAccount } from './settings';
import browser from './browser';

const rootReducer = combineReducers({
	counter,
	settings,
	activeAccount,
	browser,
	routing
});

export default rootReducer;
