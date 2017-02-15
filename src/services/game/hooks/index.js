'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

// before hook: assign authorId to the _id of the currently logged in user.
const assignAuthor = require('./assign-author');
// after hook: look up the user with the matching authorId in the users service and add it as 'author'
const populateAuthor = common.populate('author', { service: 'users', field: 'authorId' });
const populateLikes = common.populate('likes', { service: 'users', field: 'likedBy' })

const makeLikeable = require('./make-likeable');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    assignAuthor()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    makeLikeable(),
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    makeLikeable(),
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ]
};

exports.after = {
  all: [
    populateAuthor,
    populateLikes,
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
