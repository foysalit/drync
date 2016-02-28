import { 
	SAVE_SETTINGS, 
	LOAD_SETTINGS, 
	ADD_ACCOUNT, 
	GETTING_AUTH_PERMISSION,
	SET_DIRECTORY,
	SET_ACTIVE
} from '../actions/settings';

import { assign, clone } from 'lodash';

function findNewSetting(settings) {
	return settings.filter((setting) => {
		if (!setting.emailAddress)
			return true;
	});
}


function updateSetting(oldSettings, updatedSetting) {
	let newSettings = clone(oldSettings);
	return newSettings.map((setting) => {
		if (setting.user && setting.user.emailAddress == updatedSetting.user.emailAddress)
			return updatedSetting;

		return setting;
	});
}

export function settings(state = [], action) {
	switch (action.type) {
		case SAVE_SETTINGS:
			return action.data;
		case LOAD_SETTINGS: 
			return action.data;
		case ADD_ACCOUNT:
			return [...state, action.data];
		case SET_DIRECTORY:
			return updateSetting(state, action.data);
		case SET_ACTIVE:
			return updateSetting(state, action.data);
		case GETTING_AUTH_PERMISSION:
			let account = findNewSetting(state);
			account.auth = GETTING_AUTH_PERMISSION;
			return [account, ...state.slice(1, state.length)];
		default:
			return state;
	}
}

export function activeAccount(state = {}, action) {
	if (action.type === SET_ACTIVE){
		return assign({}, state, action.data);
	}

	return state;
}