import React, { Component, PropTypes } from 'react';
import { LockOpen } from 'material-ui/lib/svg-icons';
import { 
	Divider, Paper,
	List, ListItem, 
	TextField,
	Avatar, RaisedButton, FontIcon,
	ClearFix
} from 'material-ui';
import styles from './settings.module.css';
import { format } from 'bytes';

const remote = require('electron').remote;
const dialog = remote.require('dialog');

class Settings extends Component {
	static propTypes = {
	  	settings: PropTypes.array.isRequired,
	  	authenticate: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			authCode: ''
		};
	};

	componentDidMount() {
		// this.props.load();
	}

	showAccount(account) {
		let { user, storageQuota, directory, active } = account;

		let total = format(parseInt(storageQuota.limit));
		let used = format(parseInt(storageQuota.usage));

		return (
			<div>
				<Paper zDepth={1} circle={true} className={styles.propicPaper}>
					<img src={user.photoLink} style={{width:'100%', height:'auto'}}/>
				</Paper>
				<div>{user.displayName}</div>
				<div>{user.emailAddress}</div>
				<div>{ used } Used Out of { total }</div>

				{directory ? 
					<RaisedButton label={directory} />
				: 
					<RaisedButton onTouchTap={this.openDirectorySelector.bind(this, account)} label="Select Folder" />
				}

				{!active ? 
					<RaisedButton onTouchTap={this.props.setActiveAccount.bind(this, account)} label="Use Now"></RaisedButton> 
				:
					<RaisedButton primary={true} label="Currently in Use"></RaisedButton>
				}
				<ClearFix/>
			</div>
		);
	}

	openDirectorySelector(account) {
		var root = dialog.showOpenDialog({ properties: [ 'openDirectory' ]});
		if (root)
			this.props.setDirectory(account, root[0]);
	}

	handleAuthCode(e) {
		this.setState({authCode: e.target.value});
	}

	saveAuthCode() {
		this.props.saveAuthCode(this.state.authCode);
	}

	showAuthIncomplete(account) {
		if (!account)
			return;

		const { authenticate } = this.props;

		if (account.auth != false) {
			return (
				<div>
					<h4>Authentication In Progress...</h4>
					<p>Make sure you copy the code from the authentication window and paste it in the box below</p>
					<TextField 
						fullWidth={true}
						onChange={this.handleAuthCode.bind(this)}
						hintText="Paste The Authentication Code Here..." />
					<br/>
					<RaisedButton 
						onTouchTap={this.saveAuthCode.bind(this)}
						label="Done" 
						primary={true} />
				</div> 
			);
		} else {
			return (
				<div>
					<h4>Add New Account...</h4>
					<p>
						To sync with a new Google drive account,
						Click the button below to initiate authentication.
					</p>
					<RaisedButton
						label="Authenticate"
						onTouchTap={authenticate}
						secondary={true}/>
				</div>
			);
		}
	}

	render() {
		const { settings } = this.props;

		return (
			<div className={styles.container}>
				{ settings.map((account, index) => {
					return 	(<Paper key={index} className={styles.accountBoxItem}>
						<div className={styles.accountBox}>
							{ (account && account.auth===true) ? this.showAccount(account) : this.showAuthIncomplete(account) }
						</div>
					</Paper>);
				}) }
			</div>
		);
	}
}

export default Settings;