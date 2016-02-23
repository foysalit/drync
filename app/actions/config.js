import { getConfigs } from '../api/config';

export const SAVE_CONFIG = 'SAVE_CONFIG';
export const LOAD_CONFIG = 'LOAD_CONFIG';

export function save(config) {
	

	return {
		type: SAVE_CONFIG,
		data: config
	};
}

export function load() {
	const configs = getConfigs();
	
	return {
		type: LOAD_CONFIG,
		data: configs
	};
}

function incrementAsync(delay = 1000) {
	return dispatch => {
		setTimeout(() => {
			dispatch(increment());
		}, delay);
	};
}
