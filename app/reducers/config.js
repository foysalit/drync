import { SAVE_CONFIG, LOAD_CONFIG } from '../actions/config';

const initialConfig = [];

export default function config(state = initialConfig, action) {
	console.log(state, action.type);
	switch (action.type) {
		case SAVE_CONFIG:
			return action.data;
		case LOAD_CONFIG:
			initialConfig.merge(action.data); 
			return initialConfig;
		default:
			return state;
	}
}
