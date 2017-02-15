// src/services/recipe/recipe-model.js

'use strict';

// recipe-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  amount: { type: String, required: false },
  name: { type: String, required: true },
  optional: { type: Boolean, required: true, 'default': false }
});

const cookingStepSchema = new Schema({
  cookingTime: { type: Number, required: false }, // in minutes
  title: { type: String, required: false },
  description: { type: String, required: true }
});

const recipeSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  photo: { type: String, required: true },
  vegan: { type: Boolean, required: true, 'default': false },
  vegetarian: { type: Boolean, required: true, 'default': false },
  pescatarian: { type: Boolean, required: true, 'default': false },
  cookingTime: { type: Number, required: false }, // in minutes
  ingredients: [ingredientSchema],
  cookingSteps: [cookingStepSchema],
  likedBy: [ Schema.Types.ObjectId ],
  authorId: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const recipeModel = mongoose.model('recipe', recipeSchema);

module.exports = recipeModel;
