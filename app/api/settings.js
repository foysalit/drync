import { writeFileSync, readFileSync } from 'jsonfile';
import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { find } from 'lodash';

const SETTINGS_DIR= homedir() +'/.drync';
const SETTINGS_FILE=SETTINGS_DIR +'/.settings';

export function getSettings() {
	if (!existsSync(SETTINGS_DIR)){
	    mkdirSync(SETTINGS_DIR);
	}

	try{
		let settings = readFileSync(SETTINGS_FILE);
		return Object.keys(settings).length > 0 ? settings : null;
	} catch(e) {
        writeFileSync(SETTINGS_FILE, [{auth: false}]);
        return null;
	}
}

export function getSettingForUser(user) {
	var settings = getSettings();
	return settings.filter((data) => {
		return data.user && data.user.emailAddress == user.emailAddress;
	});
}

export function getActiveSetting(user) {
	var settings = getSettings();
	return find(settings, {active: true});
}

export function saveAccountForUser(account) {
	let oldSettings = getSettings();
	let newSettings = oldSettings.map((setting) => {
		if (setting.user && setting.user.emailAddress == account.user.emailAddress){
			setting = account
		}
		return setting;
	});

	writeFileSync(SETTINGS_FILE, newSettings);
}

export function setAccountDirectory(account, directory) {
	let settings = getSettingForUser(account.user);
	settings[0].directory = directory;
	saveAccountForUser(settings[0]);
}

export function setAccountActive(account) {
	let settings = getSettings();
	let newSetting = {};
	let newSettings = settings.map((setting) => {
		if (!setting.user)
			return setting;

		if (setting.user.emailAddress == account.user.emailAddress){
			setting.active = true;
			newSetting = setting;
		} else
			setting.active = false;

		return setting;
	});

	writeFileSync(SETTINGS_FILE, newSettings);
	return newSetting;
}

export function createAccount(account) {
	let settings = getSettings();

	account.auth = true;

	settings.push(account);
	writeFileSync(SETTINGS_FILE, settings);
	return account;
}
