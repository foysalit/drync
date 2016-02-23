import React, { Component } from 'react';
import { Link } from 'react-router';

import { AppBar, LeftNav, MenuItem, IconButton, FlatButton } from 'material-ui';
import Home from 'material-ui/lib/svg-icons/action/home';

export default class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	};

	handleToggle() {
		this.setState({open: !this.state.open});
	};
	
	render() {
		return (
			<div>
				<LeftNav docked={false} open={this.state.open}>
					<Link to="/">
						<MenuItem onTouchTap={this.handleToggle.bind(this)}>Home</MenuItem>
					</Link>
					<Link to="/browser">
						<MenuItem onTouchTap={this.handleToggle.bind(this)}>Browser</MenuItem>
					</Link>
					<Link to="/settings">
						<MenuItem onTouchTap={this.handleToggle.bind(this)}>settings</MenuItem>
					</Link>
					<Link to="/counter">
						<MenuItem onTouchTap={this.handleToggle.bind(this)}>counter</MenuItem>
					</Link>
				</LeftNav>

				<AppBar
					title="Title"
					showMenuIconButton={true}
					onTitleTouchTap={this.handleToggle.bind(this)}
					onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
				/>
			</div>
		);
	}
}
