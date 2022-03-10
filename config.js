export const computers = [];
export const sourceports = {};
export const autoloadProfiles = {};
export const profiles = [];

// -----===== Begin Editable =====-----
// Note that >< is replaced with the absolute path from computer.dir with a trailing slash appropriate for the OS

computers.push({
	               name        : "Desktop",
	               dir         : "c:/users/candice/dropbox/savegames/doom",
	               extraOptions: {
		               gzdoom: "+vid_maxfps 90 +vid_defwidth 3840 +vid_defheight 2160 +vid_adapter 1 +chp_size 2 +vk_hdr false -savedir ><saves"
	               },
	               os          : "pc"
               });

computers.push({
	               name        : "PC Laptop",
	               dir         : "c:/users/candice/dropbox/savegames/doom",
	               extraOptions: {
		               gzdoom: "+vid_maxfps 180 +vid_defwidth 1920 +vid_defheight 1080 +vid_adapter 1 +chp_size 1 -savedir ><saves"
	               },
	               os          : "pc"
               });

computers.push({
	               name        : "Macbook",
	               dir         : "/users/candice/dropbox/savegames/doom",
	               os          : "mac",
	               extraOptions: {gzdoom: "-savedir ><saves"}
               });

sourceports.gzdoom = {
	paths  : {
		pc : "gzdoom.exe",
		mac: "gzdoom"
	},
	options: "-config ><gzdoom.ini +logfile ><gzdoom.log +vid_fullscreen true +vid_preferbackend 1 +sv_doubleammo true"
};

autoloadProfiles.default =
	["skins/NeuralUpscale2x_v0.95.pk3", "skins/DHTP-2019_11_17.pk3", "lights.pk3", "skins/DoomMetalVol5.wad",
	 "skins/pk_doom_sfx_20120224.wad", "skins/IDKFAv2.wad",
	 "skins/HOOVER1979_UltraHD_Texture_Pack_22052020_Evilution_Override.pk3",
	 "skins/HOOVER1979_UltraHD_Texture_Pack_22052020_Plutonia_Experiment_Override.pk3", "skins/HRRP.pk3",
	 "skins/DoomHDTextures.pk3", "skins/LTP_V5.0.pk3"];

profiles.push({
	              name           : "Trailblazer + Malice + Ultimate Doom 2 / Hellscape",
	              autoload       : "before",
	              autoloadProfile: "default",
	              sourceport     : "gzdoom",
	              iwad           : "doom2",
	              wads           : ["ProjectMalice5.pk3", "ultdoom2-dv2.9.wad", "d2hs-lutz.wad", "Trailblazer.pk3"]
              });

// -----===== End Editable =====-----

export const iwads = {
	doom2   : "doom2.wad",
	doom    : "doom.wad",
	heretic : "heretic.wad",
	hexen   : "hexen.wad",
	tnt     : "tnt.wad",
	plutonia: "plutonia.wad",
	hexendd : "hexendd.wad",
	strife  : "strife1.wad",
	chex    : "chex.wad"
};