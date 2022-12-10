export const Abilities: {[k: string]: ModdedAbilityData} = {
	/* Enabled Abilities */
	parentalbond: {
		inherit: true,
		isNonstandard: null,
	},
	propellertail: {
		inherit: true,
		isNonstandard: null,
	},
	grimneigh: {
		inherit: true,
		isNonstandard: null,
	},
	chillingneigh: {
		inherit: true,
		isNonstandard: null,
	},
	/* Modified Abilities */
	baddreams: {
		inherit: true,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('lethargic')) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
	},
	illusion: {
		inherit: true,
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			// yes, you can Illusion an active pokemon but only if it's to your right
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					pokemon.illusion = possibleTarget;
					break;
				}
			}

			if (pokemon.illusion) {
				const amogusIndex = pokemon.moves.indexOf('amogus');
				if (amogusIndex < 0) return;
				const replacementMove = Dex.moves.get(pokemon.illusion?.moves[0]);

				if (replacementMove) {
					pokemon.moveSlots[amogusIndex] = {
						move: replacementMove.name,
						id: replacementMove.id,
						pp: replacementMove.pp,
						maxpp: replacementMove.pp,
						target: replacementMove.target,
						disabled: false,
						used: false,
						virtual: true,
					};

					pokemon.abilityState.replacedMoveIndex = amogusIndex;
				}
			}
		},
		onTryMove(source, target, move) {
			const sourceMoveIndex = source.moveSlots.findIndex((moveSlot) => moveSlot.id === move.id);
			const moveIndex = source.abilityState.replacedMoveIndex;
			if (!source.illusion && moveIndex !== undefined && moveIndex === sourceMoveIndex) {
				const amogusMove = Dex.moves.get('amogus');

				source.moveSlots[moveIndex] = {
					move: amogusMove.name,
					id: amogusMove.id,
					pp: amogusMove.pp,
					maxpp: amogusMove.pp,
					target: amogusMove.target,
					disabled: false,
					used: false,
				};

				source.abilityState.replacedMoveIndex = undefined;

				this.actions.useMove('amogus', source, target);

				return null;
			}
		},
	},


	/* Clover Blobbos CAP Abilities */
	allskill: {
		inherit: true,
		isNonstandard: null,
	},
	artillery: {
		inherit: true,
		isNonstandard: null,
	},
	asoneblobbos: {
		inherit: true,
		isNonstandard: null,
	},
	asoneblobbostherian: {
		inherit: true,
		isNonstandard: null,
	},
	asoneblobbosremembered: {
		inherit: true,
		isNonstandard: null,
	},
	blobbotype: {
		inherit: true,
		isNonstandard: null,
	},
	evasionhax: {
		inherit: true,
		isNonstandard: null,
	},
	flipflops: {
		inherit: true,
		isNonstandard: null,
	},
	genwunning: {
		inherit: true,
		isNonstandard: null,
	},
	godrejection: {
		inherit: true,
		isNonstandard: null,
	},
	lootable: {
		inherit: true,
		isNonstandard: null,
	},
	magicalrealm: {
		inherit: true,
		isNonstandard: null,
	},
	memepower: {
		inherit: true,
		isNonstandard: null,
	},
	niceface: {
		inherit: true,
		isNonstandard: null,
	},
	nimblemetalbody: {
		inherit: true,
		isNonstandard: null,
	},
	sharpshooter: {
		inherit: true,
		isNonstandard: null,
	},
	uncompetitive: {
		inherit: true,
		isNonstandard: null,
	},
	peaceandtranquility: {
		inherit: true,
		isNonstandard: null,
	},
	darkthoughts: {
		inherit: true,
		isNonstandard: null,
	},
	gmaxcomatose: {
		inherit: true,
		isNonstandard: null,
	},
	bloodthirsty: {
		inherit: true,
		isNonstandard: null,
	},
	intangible: {
		inherit: true,
		isNonstandard: null,
	},
	hyperboreanarctic: {
		inherit: true,
		isNonstandard: null,
	},
	asonehorse: {
		inherit: true,
		isNonstandard: null,
	},
	armorplate: {
		inherit: true,
		isNonstandard: null,
	},
	libero: {
		inherit: true,
		isNonstandard: null,
	},
	mimicry: {
		onStart(pokemon) {
			if (this.field.terrain) {
				pokemon.addVolatile('mimicry');
			} else {
				const types = pokemon.baseSpecies.types;
				if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				this.hint("Transform Mimicry changes you to your original un-transformed types.");
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectState.target;
			delete pokemon.volatiles['mimicry'];
			pokemon.addVolatile('mimicry');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['mimicry'];
		},
		condition: {
			onStart(pokemon) {
				let newType;
				switch (this.field.terrain) {
				case 'electricterrain':
					newType = 'Electric';
					break;
				case 'grassyterrain':
					newType = 'Grass';
					break;
				case 'mistyterrain':
					newType = 'Fairy';
					break;
				case 'psychicterrain':
					newType = 'Psychic';
					break;
				case 'plasticterrain':
					newType = 'Plastic';
					break;
				}
				if (!newType || pokemon.getTypes().join() === newType || !pokemon.setType(newType)) return;
				this.add('-start', pokemon, 'typechange', newType, '[from] ability: Mimicry');
			},
			onUpdate(pokemon) {
				if (!this.field.terrain) {
					const types = pokemon.species.types;
					if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
					this.add('-activate', pokemon, 'ability: Mimicry');
					this.add('-end', pokemon, 'typechange', '[silent]');
					pokemon.removeVolatile('mimicry');
				}
			},
		},
		name: "Mimicry",
		rating: 0.5,
		num: 250,
	},
	sneedboost: {
		inherit: true,
		isNonstandard: null,
	},
	infection: {
		inherit: true,
		isNonstandard: null,
	},
	costume: {
		inherit: true,
		isNonstandard: null,
	},
	eyeofblobbos: {
		inherit: true,
		isNonstandard: null,
	},
	triforce: {
		inherit: true,
		isNonstandard: null,
	},
	perishtouch: {
		inherit: true,
		isNonstandard: null,
	},
	perishbody: {
		inherit: true,
		isNonstandard: null,
	},
	shadowaura: {
		inherit: true,
		isNonstandard: null,
	},
	ultraego: {
		inherit: true,
		isNonstandard: null,
	},
	ultrainstinct: {
		inherit: true,
		isNonstandard: null,
	},
	artist: {
		inherit: true,
		isNonstandard: null,
	},
	hyperzone: {
		inherit: true,
		isNonstandard: null,
	},
	paperpower: {
		inherit: true,
		isNonstandard: null,
	},
	thatscap: {
		inherit: true,
		isNonstandard: null,
	},
	drenchedbulb: {
		inherit: true,
		isNonstandard: null,
	},
	intoxicate: {
		inherit: true,
		isNonstandard: null,
	},
	radioactive: {
		inherit: true,
		isNonstandard: null,
	},
	limblauncher: {
		inherit: true,
		isNonstandard: null,
	},
	muhmentum: {
		inherit: true,
		isNonstandard: null,
	},
};