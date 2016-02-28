var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

const SCOPES=['https://www.googleapis.com/auth/drive'];
const CLIENT_ID='';
const CLIENT_SECRET='';
const REDIRECT_URL='urn:ietf:wg:oauth:2.0:oob';
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

export function generateAuthUrl() {
	var url = oauth2Client.generateAuthUrl({
		response_type: 'code',
		access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token) 
		scope: SCOPES
	});

	return url;
}

export function getTokens(code) {
	return new Promise((resolve, reject) => {
		oauth2Client.getToken(code, (err, tokens) => {
			// console.log(err, tokens);

			if (err) reject(err);
			else resolve(tokens);
		});
	})
}

export function getUserDataByTokens(tokens) {
	return new Promise((resolve, reject) => {
		oauth2Client.setCredentials(tokens);
		let drive = google.drive({ version: 'v3', auth: oauth2Client });
		
		drive.about.get({fields: 'user,storageQuota'}, (err, data) => {
			// console.log(err, data);

			if (err) 
				return reject(err);

			data.tokens = tokens;
			resolve(data);
		});
	});
}

function listHome() {
		this.drive.files.list({
			pageSize: 20, 
			q: "'root' in parents and trashed=false"
		}, (err, data) => {
			console.log(err, data)
		});
	}