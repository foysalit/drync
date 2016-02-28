import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { ActionInfo, NavigationArrowBack, FileFolder } from 'material-ui/lib/svg-icons';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';

class Browser extends Component {
	static propTypes = {
		browser: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.setRoot('/home/foysal/Copy');
	}

	getList(type, files) {
		return files.filter((file) => {
			return file.type == type; 
		});
	};

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
				onTouchTap={this.props.changeDir.bind(this, file)}
			/>
		);
	};

	render() {
		if (!this.props.browser.current)
			return (<div>No Directory selected!</div>);

		const { tree, parentTree } = this.props.browser.current;

		let filesList = this.getList('file', tree.children);
		let foldersList = this.getList('directory', tree.children);

		return (
			<div>
				{ (parentTree) ? 
					<ListItem
						key={parentTree.path}
						leftAvatar={<Avatar icon={<NavigationArrowBack />} />}
						primaryText={parentTree.name}
						secondaryText="Go Back.."
						onTouchTap={this.props.changeDir.bind(this, parentTree)}
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