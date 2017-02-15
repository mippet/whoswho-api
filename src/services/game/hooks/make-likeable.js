'use strict'

const errors = require('feathers-errors');

module.exports = function(options) {
  return function(hook) {
    return hook.app.service('recipes').get(hook.id)
      .then((recipe) => {
        if (hook.params.user._id !== recipe.authorId) {

          if (hook.data.like === undefined) {
            throw new errors.Forbidden('You must be the author to do that.');
          }

          const action = hook.data.like ? '$addToSet' : '$pull';
          let data = {};
          data[action] = { likedBy: hook.params.user._id };
          hook.data = data;
        }
      })
  }
}
