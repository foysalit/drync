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

import { generateAuthUrl } from '../../api/settings';

class Settings extends Component {
	static propTypes = {
	  	settings: PropTypes.array.isRequired,
	  	authenticate: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			init: false,
			authCode: ''
		};

		this.drive = null;
	};

	getUserData() {
		this.drive.about.get({fields: 'user,storageQuota'}, (err, data) => {
			console.log(err, data);
			if (!err) {
				this.setState({account: data});
			}
		});
	}

	listHome() {
		this.drive.files.list({
			pageSize: 20, 
			q: "'root' in parents and trashed=false"
		}, (err, data) => {
			console.log(err, data)
		});
	}

	componentWillMount() {
		if (this.props.settings.length <= 0)
			return;

		this.tokens = this.props.settings;

		oauth2Client.setCredentials(this.tokens);
		this.drive = google.drive({ version: 'v3', auth: oauth2Client });
		console.log(this.drive);
		this.getUserData();		
	}

	handleAuthCode(e) {
		this.setState({authCode: e.target.value});
	}

	saveToken(tokens) {
	    writeFileSync(CONFIG_FILE, tokens); 
		this.tokens = tokens;
	}

	saveAuthCode(e) {
		oauth2Client.getToken(this.state.authCode, (err, tokens) => {
			console.log(err, tokens);

			if(!err) {
				this.saveToken(tokens);
				oauth2Client.setCredentials(tokens);
				this.drive = google.drive({ version: 'v3', auth: oauth2Client });
			}
		});
	}

	auth() {
		window.open(generateAuthUrl());
		this.setState({init: true});
	}

	showAuthCompleted() {
		if (!this.state.account)
			return (<p>Loading....</p>);

		let { user, storageQuota } = this.state.account;

		let total = format(parseInt(storageQuota.limit));
		let used = format(parseInt(storageQuota.usage))

		return (
			<div>
				<Paper zDepth={1} circle={true} className={styles.propicPaper}>
					<img src={user.photoLink} style={{width:'100%', height:'auto'}}/>
				</Paper>
				<div>{user.displayName}</div>
				<div>{user.emailAddress}</div>
				<div>{ used } Used Out of { total }</div>
				<RaisedButton onTouchTap={this.openSelector.bind()} label="Select Folder" />
				<ClearFix/>
			</div>
		);
	}

	openSelector() {
		console.log(dialog.showOpenDialog({ properties: [ 'openDirectory' ]}));
	}

	showAuthIncomplete() {
		if (this.state.init) {
			return (
				<div>
					<h4>Authentication In Progress...</h4>
					<p>Make sure you copy the code from the authentication window and paste it in the box below</p>
					<TextField 
						fullWidth={true}
						hintText="Paste The Authentication Code Here..."
						onChange={this.handleAuthCode.bind(this)} 
						value={this.state.authCode} />
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
					<h4>No Authentication</h4>
					<p>
						You have not linked your account with Google drive.
						Click the button below to initiate authentication.
					</p>
					<RaisedButton
						label="Authenticate"
						onTouchTap={this.auth.bind(this)}
						secondary={true}/>
				</div>
			);
		}
	}

	render() {
		console.log(this.props);
		return (
			<div className={styles.container}>
				<Paper>
					<div className={styles.authBox}>
						{ this.tokens ? this.showAuthCompleted() : this.showAuthIncomplete() }
					</div>
				</Paper>
			</div>
		);
	}
}

export default Settings;