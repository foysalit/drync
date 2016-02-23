import React, { Component } from 'react';
import { directoryTree } from 'directory-tree';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { ActionInfo, NavigationArrowBack, FileFolder } from 'material-ui/lib/svg-icons';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';

const ROOT = '/home/foysal/Google Drive';

function getTree(path) {
	if (!path || path.indexOf(ROOT) < 0)
		return null;

	let tree = directoryTree(path);
	return tree;
}

function getParentPath(path) {
	let pathItems = path.split("/");
	pathItems.splice(-1, 1);
	let newPath = pathItems.join("/");
	return newPath;
}

class Browser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			path: ROOT,
			tree: getTree(ROOT),
			parentPath: false,
			parentTree: false
		};
	};

	getList(type, files) {
		return files.filter((file) => {
			return file.type == type; 
		});
	}

	selectTree(tree) {
		let isBack = tree.path == "";
		let path = (isBack) ? this.state.parentPath : this.state.path +'/'+ tree.path;
		let parentPath = (path == ROOT) ? false : getParentPath(path);

		if (tree.type == 'directory'){
			this.setState({
				path: path,
				tree: getTree(path),
				parentPath: parentPath,
				parentTree: getTree(parentPath)
			});
		}
	}

	showList(file) {
		let itemsCount = 0;

		if (file.type == 'directory')
			itemsCount = file.children.length + ' Items inside';
		else if (file.type == 'file')
			itemsCount = file.size;

		return (
			<ListItem
				key={file.path}
				leftAvatar={<Avatar icon={<FileFolder />} />}
				rightIcon={<ActionInfo />}
				primaryText={file.name}
				secondaryText={itemsCount}
				onTouchTap={this.selectTree.bind(this, file)}
			/>
		);
	}

	render() {
		let filesList = this.getList('file', this.state.tree.children);
		let foldersList = this.getList('directory', this.state.tree.children);

		return (
			<div>
				{ (this.state.parentTree) ? 
					<ListItem
						key={this.state.parentTree.path}
						leftAvatar={<Avatar icon={<NavigationArrowBack />} />}
						primaryText={this.state.parentTree.name}
						secondaryText="Go Back.."
						onTouchTap={this.selectTree.bind(this, this.state.parentTree)}
					/>
				: null }

				{ foldersList.length > 0 ? 
					<List subheader="Folders" insetSubheader={true}>
						{ foldersList.map(this.showList.bind(this)) }
					</List>
				: null }

				{ (filesList.length > 0 && foldersList.length > 0) ?
					<Divider inset={true} />
				: null }

				{ filesList.length > 0 ?
					<List subheader="Files" insetSubheader={true}>
						{ filesList.map(this.showList.bind(this)) }
					</List>
				: null }
			</div>
		);
	}
}

export default Browser;