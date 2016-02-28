import { getTree, getParentPath } from '../api/browser';
import { 
	SET_ROOT,
	CHANGE_DIR
} from '../actions/browser';

import { assign, clone } from 'lodash';

function newTree(tree, browser) {
	let isBack = tree.path == "";
	let path = (isBack) ? browser.current.parentPath : browser.current.path +'/'+ tree.path;
	let parentPath = (path == browser.root) ? false : getParentPath(path);

	if (tree.type == 'directory'){
		return {
			path: path,
			tree: getTree(path, browser.root),
			parentPath: parentPath,
			parentTree: getTree(parentPath, browser.root)
		};
	}
}

export default function browser(state = {}, action) {
	switch (action.type) {
		case SET_ROOT:
			return assign({}, state, {
				root: action.data,
				current: {
					path: action.data,
					tree: getTree(action.data, action.data),
					parentPath: false,
					parentTree: false
				}
			});
		case CHANGE_DIR:
			const { newPath } = action.data;
			return assign({}, state, {
				current: newTree(action.data, state)
			});
		default:
			return state;
	}
}