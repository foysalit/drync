import { getSettings, generateAuthUrl } from '../api/settings';

export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';

export function saveTokens(settings) {
	

	return {
		type: SAVE_SETTINGS,
		data: settings
	};
}

export function load() {
	const settings = getSettings();

	return {
		type: LOAD_SETTINGS,
		data: settings
	};
}