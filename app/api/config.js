import { writeFileSync, readFileSync } from 'jsonfile';
import { existsSync, mkdirSync } from 'fs';

const CONFIG_DIR='/home/foysal/.drync';
const CONFIG_FILE=CONFIG_DIR +'/.config';

export function getConfigs() {
	if (!existsSync(CONFIG_DIR)){
	    mkdirSync(CONFIG_DIR);
	}

	try{
		let configs = readFileSync(CONFIG_FILE);
		return Object.keys(configs).length > 0 ? configs : null;
	} catch(e) {
        writeFileSync(CONFIG_FILE, {});
        return null;
	}
}

export function getConfigForUser(user) {
	var configs = getConfigs();
	configs.filter((data) => {
		return data.emailAddress = user.emailAddress
	});
}

export function saveToken(user, tokens) {
	let config = getConfigs();
	writeFileSync(CONFIG_FILE, tokens); 
}