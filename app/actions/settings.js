import { getSettings, createAccount, setAccountDirectory, setAccountActive } from '../api/settings';
import { generateAuthUrl, getTokens, getUserDataByTokens } from '../api/auth';
import { find } from 'lodash';

export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const SET_DIRECTORY = 'SET_DIRECTORY';
export const SET_ACTIVE = 'SET_ACTIVE';
export const GETTING_AUTH_PERMISSION = 'GETTING_AUTH_PERMISSION';

export function saveAuthCode(code) {
	return (dispatch) => {
		getTokens(code).then(getUserDataByTokens).then(createAccount).then((account) => {
			dispatch(addAccount(account));
		});
	};
}

export function setDirectory(account, directory) {
	let data = setAccountDirectory(account, directory);

	return {
		type: SET_DIRECTORY,
		data: data
	};
}

export function setActiveAccount(account) {
	let data = setAccountActive(account);

	return {
		type: SET_ACTIVE,
		data: data
	};
}

export function load() {
	return (dispatch) => {
		const settings = getSettings();

		dispatch({
			type: LOAD_SETTINGS,
			data: settings
		});

		dispatch({
			type: SET_ACTIVE,
			data: find(settings, {active: true})
		});
	};
}

export function addAccount(account) {
	return {
		type: ADD_ACCOUNT,
		data: account
	};
}

export function authenticate() {
	window.open(generateAuthUrl());

	return {
		type: GETTING_AUTH_PERMISSION
	};
}