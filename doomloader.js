import * as fs                                                     from "fs";
import {createRequire}                                             from "module";
import {autoloadProfiles, computers, iwads, profiles, sourceports} from "./config.js";

const require = createRequire(import.meta.url);

const path = require("path");
const exec = require('child_process').exec;
const replaceRegex = /\|>/g;

//Select computer
//Select profile

const readline = require('readline').createInterface({
	                                                     input : process.stdin,
	                                                     output: process.stdout
                                                     });
let computer;
let profile;

(async function()
{
	const computerMenu = [];

	cls();

	for(const i in computers)
	{
		const computer = computers[i];
		computerMenu.push(computer.name);
	}

	await menu(computerMenu, (val) =>
	{
		computer = computers[val];
	});

	const profileMenu = [];

	for(const i in profiles)
	{
		const profile = profiles[i];
		profileMenu.push(profile.name);
	}

	await menu(profileMenu, (val) =>
	{
		profile = profiles[val];
	});
	doom();
})();

function menu(arr, callback)
{
	return new Promise(resolve =>
	                   {
		                   for(let i = 0; i < arr.length; i++)
		                   {
			                   const name = arr[i];
			                   console.log((i + 1) + ") " + name);
		                   }

		                   readline.question("Selection => ", (val) =>
		                   {
							   cls();
			                   callback(val - 1);
			                   resolve();
		                   });
	                   });
}

function cls()
{
	console.clear();
}

function doom()
{
	const dir = path.resolve(computer.dir);

	if(!path.isAbsolute(dir))
	{
		throw "Error: Base directory 'dir' must be absolute.";
	}

	const sourceport = sourceports[profile.sourceport];
	let sourceportPath = sanitise(sourceport.paths[computer.os]);

	if(!path.isAbsolute(sourceportPath))
	{
		sourceportPath = path.join(dir, sourceportPath);
	}

	if(!fs.existsSync(sourceportPath))
	{
		throw "Cannot find sourceport at '" + sourceportPath + "'";
	}

	let command = sourceportPath;

	const iwad = sanitise(iwads[profile.iwad]);
	const extraOptions = sanitise(computer.extraOptions[profile.sourceport]);
	const pwads = sanitise(profile.wads);
	const profileOptions = sanitise(profile.options);
	const sourceportOptions = sanitise(sourceport.options);

	if(sourceportOptions)
	{
		command += " " + sourceportOptions;
	}

	command += " -iwad " + iwad;

	let files = "";

	if(profile.autoloadProfile)
	{
		const autoloadProfile = autoloadProfiles[profile.autoloadProfile];
		const before = sanitise(autoloadProfile.before);
		const after = sanitise(autoloadProfile.after);

		files = before + " " + pwads + " " + after;
	}
	else
	{
		files = pwads;
	}

	command += " -file " + files;

	if(extraOptions)
	{
		command += " " + extraOptions;
	}

	if(profileOptions)
	{
		command += " " + profileOptions;
	}

	console.log(command);

	exec(command, {cwd: dir}, () =>
	 {
	 process.exit(0);
	 });
}

function sanitise(str)
{
	if(!str)
	{
		return str;
	}

	str = str.replaceAll("/", path.sep);
	str = str.replaceAll("\\", path.sep);

	return str;
}