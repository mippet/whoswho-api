'use strict';

// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  turn: { type: Boolean, required: true, 'default': false }
});

const cardSchema = new Schema({
  image: { type: String, required: true },
  flipped: {type: Boolean, required: true, 'default': false},
  picked: {type: Boolean, required: true, 'default': false},
  red: {type: Boolean, required: true},
  grey: {type: Boolean, required: true},
  black: {type: Boolean, required: true},
  glass: {type: Boolean, required: true},
  glasses: {type: Boolean, required: true},
  tongue: {type: Boolean, required: true},
  bow: {type: Boolean, required: true},
  hat: {type: Boolean, required: true}
});

const gameSchema = new Schema({
  players: [playerSchema],
  cards: [cardSchema],
  started: { type: Boolean, required: true, 'default': false },
  winner: { type: String, required: true, 'default': 'you Won!' },
  turn: { type: Number, required: true, 'default': 0 },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
});

const gameModel = mongoose.model('game', gameSchema);

module.exports = gameModel;
