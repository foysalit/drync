import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import counter from './counter';
import settings from './settings';

const rootReducer = combineReducers({
  counter,
  settings,
  routing
});

export default rootReducer;
