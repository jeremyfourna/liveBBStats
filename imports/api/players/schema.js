import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { shootsSchema, foulsSchema, gameStateValues } from '../schemas.js';

export const Players = new Mongo.Collection('players');

Players.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

export const playerGameTimeSchema = new SimpleSchema({
	minutes: {
		type: Number,
		label: 'Minutes played',
		min: 0,
		max: 60
	},
	secondes: {
		type: Number,
		label: 'Secondes played',
		min: 0,
		max: 60
	},
	way: {
		type: String,
		label: 'In or Out',
		allowedValues: ['in', 'out']
	},
	gameState: {
		type: String,
		label: 'State of the game',
		allowedValues: gameStateValues
	}
});

export const playerSchema = new SimpleSchema({
	teamId: {
		type: String,
		label: 'Player id'
	},
	firstName: {
		type: String,
		label: 'Player first name',
		optional: true
	},
	lastName: {
		type: String,
		label: 'Player last name',
		optional: true
	},
	jersey: {
		type: Number,
		label: 'Player jersey Number',
		min: 0,
		max: 99
	},
	inPlay: {
		type: Boolean,
		label: 'Player in field or not'
	},
	gameTime: {
		type: [playerGameTimeSchema],
		optional: true
	},
	evaluation: {
		type: Number,
		label: 'Global player evaluation'
	},
	points: {
		type: shootsSchema,
		label: 'All data for the shoots and points'
	},
	assists: {
		type: Number,
		label: 'Player assists',
		min: 0
	},
	offReb: {
		type: Number,
		label: 'Player offensive rebounds',
		min: 0
	},
	defReb: {
		type: Number,
		label: 'Player defensive rebounds',
		min: 0
	},
	fouls: {
		type: foulsSchema,
		label: 'All data for the fouls'
	},
	steals: {
		type: Number,
		label: 'Player steals',
		min: 0
	},
	blocks: {
		type: Number,
		label: 'Player blocks',
		min: 0
	},
	turnovers: {
		type: Number,
		label: 'Player turnovers',
		min: 0
	}
});

Players.schema = playerSchema;
