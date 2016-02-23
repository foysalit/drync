import { SAVE_SETTINGS, LOAD_SETTINGS } from '../actions/settings';

const initialConfig = [];

export default function settings(state = initialConfig, action) {
	switch (action.type) {
		case SAVE_SETTINGS:
			return action.data;
		case LOAD_SETTINGS:
			initialConfig.merge(action.data); 
			return initialConfig;
		default:
			return state;
	}
}
