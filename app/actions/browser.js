import { find } from 'lodash';


export const CHANGE_DIR = 'CHANGE_DIR';
export const SET_ROOT = 'SET_ROOT';

export function setRoot(directory) {
	return {
		type: SET_ROOT,
		data: directory
	};
}

export function changeDir(tree) {
	return {
		type: CHANGE_DIR,
		data: tree
	};
}
