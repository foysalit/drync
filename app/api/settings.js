import { writeFileSync, readFileSync } from 'jsonfile';
import { existsSync, mkdirSync } from 'fs';

const remote = require('electron').remote;
const dialog = remote.require('dialog');

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

const SCOPES=['https://www.googleapis.com/auth/drive'];
const CLIENT_ID='';
const CLIENT_SECRET='';
const REDIRECT_URL='urn:ietf:wg:oauth:2.0:oob';
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const SETTINGS_DIR='/home/foysal/.drync';
const SETTINGS_FILE=SETTINGS_DIR +'/.settings';

export function getSettings() {
	if (!existsSync(SETTINGS_DIR)){
	    mkdirSync(SETTINGS_DIR);
	}

	try{
		let settings = readFileSync(SETTINGS_FILE);
		return Object.keys(settings).length > 0 ? settings : null;
	} catch(e) {
        writeFileSync(SETTINGS_FILE, []);
        return null;
	}
}

export function getSettingForUser(user) {
	var settings = getSettings();
	settings.filter((data) => {
		return data.emailAddress = user.emailAddress
	});
}

export function saveToken(user, tokens) {
	let setting = getSettings();
	writeFileSync(SETTINGS_FILE, tokens); 
}

export function generateAuthUrl() {
	var url = oauth2Client.generateAuthUrl({
		response_type: 'code',
		access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token) 
		scope: SCOPES
	});

	return url;
}