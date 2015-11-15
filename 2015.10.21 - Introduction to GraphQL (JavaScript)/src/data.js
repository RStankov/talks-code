/**
 *
 * Example data. It uses the small custom "Storage" engine.
 *
 * Not GraphQL specific
 *
 */

var Storage = require('./storage.js');

module.exports.users = new Storage([{
  id: 1,
  name: 'Radoslav Stankov',
  handle: 'rstankov',
  picture_uuid: '1122323232',
}]);

module.exports.posts = new Storage([{
  id: 1,
  user_id: 1,
  title: 'First post',
  tagline: 'First demo post',
  votes_count: 0,
  comments_count: 0,
}]);
