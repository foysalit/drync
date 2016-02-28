import { directoryTree } from 'directory-tree';

export function getTree(path, root) {
	if (!path || path.indexOf(root) < 0)
		return null;

	let tree = directoryTree(path);
	return tree;
}

export function getParentPath(path) {
	let pathItems = path.split("/");
	pathItems.splice(-1, 1);
	let newPath = pathItems.join("/");
	return newPath;
}
