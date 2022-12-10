export const Moves: { [k: string]: ModdedMoveData } = {
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') && !pokemon.hasAbility('lethargic')) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	closeblobmat: {
		inherit: true,
		isNonstandard: null,
	},
	faedozer: {
		inherit: true,
		isNonstandard: null,
	},
	roidflex: {
		inherit: true,
		isNonstandard: null,
	},
	sleppthatblobsthesky: {
		inherit: true,
		isNonstandard: null,
	},
	yiikout: {
		inherit: true,
		isNonstandard: null,
	},
	leafshield: {
		inherit: true,
		isNonstandard: null,
	},
	twintowertumblingterror: {
		inherit: true,
		isNonstandard: null,
	},
	skullcannon: {
		inherit: true,
		isNonstandard: null,
	},
	matingpress: {
		inherit: true,
		isNonstandard: null,
	},
	gunshot: {
		inherit: true,
		isNonstandard: null,
	},
	behemothblob: {
		inherit: true,
		isNonstandard: null,
	},
	genwunroom: {
		inherit: true,
		isNonstandard: null,
	},
	backroom: {
		inherit: true,
		isNonstandard: null,
	},
	charmerssong: {
		inherit: true,
		isNonstandard: null,
	},
	psychospell: {
		inherit: true,
		isNonstandard: null,
	},
	wonderwand: {
		inherit: true,
		isNonstandard: null,
	},
	implosion: {
		inherit: true,
		isNonstandard: null,
	},
	portalgun: {
		inherit: true,
		isNonstandard: null,
	},
	sportsball: {
		inherit: true,
		isNonstandard: null,
	},
	rainbowbeam: {
		inherit: true,
		isNonstandard: null,
	},
	freikugel: {
		inherit: true,
		isNonstandard: null,
	},
	firewall: {
		inherit: true,
		isNonstandard: null,
	},
	maximize: {
		inherit: true,
		isNonstandard: null,
	},
	seaquake: {
		inherit: true,
		isNonstandard: null,
	},
	edgequake: {
		inherit: true,
		isNonstandard: null,
	},
	telluriccurrent: {
		inherit: true,
		isNonstandard: null,
	},
	rockout: {
		inherit: true,
		isNonstandard: null,
	},
	toppingtoss: {
		inherit: true,
		isNonstandard: null,
	},
	heavensblessing: {
		inherit: true,
		isNonstandard: null,
	},
	sandysnore: {
		inherit: true,
		isNonstandard: null,
	},
	amogus: {
		inherit: true,
		isNonstandard: null,
	},
	bishido: {
		inherit: true,
		isNonstandard: null,
	},
	groundbomb: {
		inherit: true,
		isNonstandard: null,
	},
	obsidianhorn: {
		inherit: true,
		isNonstandard: null,
	},
	feudefee: {
		inherit: true,
		isNonstandard: null,
	},
	heavenpierce: {
		inherit: true,
		isNonstandard: null,
	},
	chernoboil: {
		inherit: true,
		type: "Nuclear",
		isNonstandard: null,
	},
	halflife: {
		inherit: true,
		type: "Nuclear",
		isNonstandard: null,
	},
	atombomb: {
		inherit: true,
		type: "Nuclear",
		isNonstandard: null,
	},
	radiation: {
		inherit: true,
		type: "Nuclear",
		isNonstandard: null,
	},
	nuclearmeltdown: {
		inherit: true,
		type: "Nuclear",
		isNonstandard: null,
	},
	toxicbeam: {
		inherit: true,
		isNonstandard: null,
	},
	butterflykick: {
		inherit: true,
		isNonstandard: null,
	},
	inverserush: {
		inherit: true,
		isNonstandard: null,
	},
	skulltoss: {
		inherit: true,
		isNonstandard: null,
		flags: {protect: 1, mirror: 1, bone: 1},
	},
	blobblast: {
		inherit: true,
		isNonstandard: null,
	},
	floofandpoof: {
		inherit: true,
		isNonstandard: null,
	},
	sunburst: {
		inherit: true,
		isNonstandard: null,
	},
	deepfry: {
		inherit: true,
		isNonstandard: null,
	},
	flashbang: {
		inherit: true,
		isNonstandard: null,
	},
	doubleiceblob: {
		inherit: true,
		isNonstandard: null,
	},
	extremesneed: {
		inherit: true,
		isNonstandard: null,
	},
	bouncyball: {
		inherit: true,
		isNonstandard: null,
	},
	bouncybubble: {
		inherit: true,
		isNonstandard: null,
	},
	buzzybuzz: {
		inherit: true,
		isNonstandard: null,
	},
	windwhip: {
		inherit: true,
		isNonstandard: null,
	},
	sleepingsands: {
		inherit: true,
		isNonstandard: null,
	},
	feedandseed: {
		inherit: true,
		isNonstandard: null,
	},
	relicsong: {
		inherit: true,
		isNonstandard: null,
	},
	astralbarrage: {
		inherit: true,
		isNonstandard: null,
	},
	fruitjuice: {
		inherit: true,
		isNonstandard: null,
	},
	sizzlyslide: {
		inherit: true,
		isNonstandard: null,
	},
	electromagnetism: {
		inherit: true,
		isNonstandard: null,
	},
	splishysplash: {
		inherit: true,
		isNonstandard: null,
	},
	titaniumclap: {
		inherit: true,
		isNonstandard: null,
	},
	paranormalactivity: {
		inherit: true,
		isNonstandard: null,
	},
	infectiouswheeze: {
		inherit: true,
		isNonstandard: null,
	},
	siphon: {
		inherit: true,
		isNonstandard: null,
	},
	xenobeam: {
		inherit: true,
		isNonstandard: null,
	},
	abduction: {
		inherit: true,
		isNonstandard: null,
	},
	flashfreeze: {
		inherit: true,
		isNonstandard: null,
	},
	hypersomnia: {
		inherit: true,
		isNonstandard: null,
	},
	sugarrush: {
		inherit: true,
		isNonstandard: null,
	},
	bloodletting: {
		inherit: true,
		isNonstandard: null,
	},
	nosedive: {
		inherit: true,
		isNonstandard: null,
	},
	shadowstrike: {
		inherit: true,
		isNonstandard: null,
	},
	shadowban: {
		inherit: true,
		isNonstandard: null,
	},
	slipturn: {
		inherit: true,
		isNonstandard: null,
	},
	helldive: {
		inherit: true,
		isNonstandard: null,
	},
	hyperzone: {
		inherit: true,
		isNonstandard: null,
	},
	freeballoonday: {
		inherit: true,
		isNonstandard: null,
	},
	spectresabre: {
		inherit: true,
		isNonstandard: null,
	},
	bloodshot: {
		inherit: true,
		isNonstandard: null,
	},
	malicepowder: {
		inherit: true,
		isNonstandard: null,
	},
	mushroomshot: {
		inherit: true,
		isNonstandard: null,
	},
	overdose: {
		inherit: true,
		isNonstandard: null,
	},
	highjumpsaw: {
		inherit: true,
		isNonstandard: null,
	},
	stingingrage: {
		inherit: true,
		isNonstandard: null,
	},
	afteryou: {
		inherit: true,
		isNonstandard: null,
	},
	bilebite: {
		inherit: true,
		isNonstandard: null,
	},
	bestow: {
		inherit: true,
		isNonstandard: null,
	},
	downpour: {
		inherit: true,
		isNonstandard: null,
	},
	embargo: {
		inherit: true,
		isNonstandard: null,
	},
	firepledge: {
		inherit: true,
		isNonstandard: null,
	},
	fling: {
		inherit: true,
		isNonstandard: null,
	},
	freezyfrost: {
		inherit: true,
		isNonstandard: null,
	},
	grasspledge: {
		inherit: true,
		isNonstandard: null,
	},
	energyburst: {
		inherit: true,
		isNonstandard: null,
	},
	glitzyglow: {
		inherit: true,
		isNonstandard: null,
	},
	happyhour: {
		inherit: true,
		isNonstandard: null,
	},
	holdhands: {
		inherit: true,
		isNonstandard: null,
	},
	icestorm: {
		inherit: true,
		isNonstandard: null,
	},
	instruct: {
		inherit: true,
		isNonstandard: null,
	},
	magneticflux: {
		inherit: true,
		isNonstandard: null,
	},
	paleowave: {
		inherit: true,
		isNonstandard: null,
	},
	poisonivy: {
		inherit: true,
		isNonstandard: null,
	},
	quash: {
		inherit: true,
		isNonstandard: null,
	},
	skydrop: {
		inherit: true,
		isNonstandard: null,
	},
	sappyseed: {
		inherit: true,
		isNonstandard: null,
	},
	telekinesis: {
		inherit: true,
		isNonstandard: null,
	},
	waterpledge: {
		inherit: true,
		isNonstandard: null,
	},
	glassing: {
		inherit: true,
		isNonstandard: null,
	},
	meltedplastic: {
		inherit: true,
		isNonstandard: null,
	},
	recycleray: {
		inherit: true,
		isNonstandard: null,
	},
	plasticterrain: {
		inherit: true,
		isNonstandard: null,
	},
	fadereflection: {
		inherit: true,
		isNonstandard: null,
	},
	plasticblaze: {
		inherit: true,
		isNonstandard: null,
	},
	coldcutter: {
		inherit: true,
		isNonstandard: null,
	},
	terrainpulse: {
		num: 805,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Terrain Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			case 'plasticterrain':
				move.type = 'Plastic';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
	},
	present: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Blobbos-Clause') {
				move.type = 'Ice';
			} else {
				move.type = 'Normal';
			}
		},
		onTryHit(target, source, move) {
			if (source.species.name === 'Blobbos-Clause') {
				if (source.isAlly(target)) {
					move.basePower = 0;
					move.infiltrates = true;
				}
				move.basePower = 120;
			}
		},
		onHit(target, source) {
			if (source.species.name === 'Blobbos-Clause') {
				if (source.isAlly(target)) {
					if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
						this.add('-immune', target);
						return this.NOT_FAIL;
					}
				}
			}
		},
	},
};

