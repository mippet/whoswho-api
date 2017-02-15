'use strict'

module.exports = function(options) {
  return function(hook) {
    // The authenticated user
    const user = hook.params.user;
    hook.data.authorId = user._id;
  }
}
