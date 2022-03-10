import {createRequire}                                             from "module";
import {autoloadProfiles, computers, iwads, profiles, sourceports} from "./config.js";
const require = createRequire(import.meta.url);

const path = require("path");
const execSync = require('child_process').execSync;

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

	for(const i in computers)
	{
		const computer = computers[i];
		computerMenu.push(computer.name);
	}

	await menu(computerMenu, computerSelection);

	const profileMenu = [];

	for(const i in profiles)
	{
		const profile = profiles[i];
		profileMenu.push(profile.name);
	}

	await menu(profileMenu, profileSelection);
	doom();
})();

function computerSelection(computerNum)
{
	computer = computers[computerNum];
}

function profileSelection(profileNum)
{
	profile = profiles[profileNum];
}

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
			                   callback(val - 1);
			                   resolve();
		                   });
	                   });
}

function doom()
{
	const dir = path.resolve(computer.dir);

	if(!path.isAbsolute(dir))
	{
		throw "Error: Base directory 'dir' must be absolute.";
	}

	const sourceport = sourceports[profile.sourceport];
	const autoloads = autoloadProfiles[profile.autoloadProfile].join(" ");
	const iwad = iwads[profile.iwad];
	let sourceportPath = sourceport.paths[computer.os];
	const extraOptions = computer.extraOptions[profile.sourceport];
	const pwads = profile.wads.join(" ");

	if(!path.isAbsolute(sourceportPath))
	{
		sourceportPath = path.join(dir, sourceportPath);
	}

	let command = sourceportPath;

	const replaceRegex = /></g;

	if( sourceport.options )
	{
		command += " " + sourceport.options.replaceAll(replaceRegex,dir+path.sep);
	}

	command += " -iwad " + iwad;

	let files = "";
	const beforeOrAfter = profile.autoload;

	if( !beforeOrAfter || beforeOrAfter.toLowerCase().includes("after") )
	{
		files = autoloads + " " + pwads;
	}
	else
	{
		files = pwads + " " + autoloads;
	}

	command += " -file " + files;

	if( extraOptions )
	{
		command += " " + extraOptions.replaceAll(replaceRegex,dir+path.sep);
	}

	console.log(command);
	execSync(command);
}