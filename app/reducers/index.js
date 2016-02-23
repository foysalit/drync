import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import counter from './counter';
import config from './config';

const rootReducer = combineReducers({
  counter,
  config,
  routing
});

export default rootReducer;
