/**
 *
 * Example data. It uses the small custom "Storage" engine.
 *
 * Not GraphQL specific
 *
 */

var Storage = require('./storage.js');

module.exports.events = new Storage([{
  id: 15,
  name: 'VarnaConf',
  year: '2015',
  date: '15.09.2015',
}]);

module.exports.sessions = new Storage([{
  id: 175,
  name: 'GraphQL',
  start_at: '11:00',
  track: 2,
  event_id: 15,
  speaker_id: 1,
}]);

module.exports.speakers = new Storage([{
  id: 1,
  name: 'Rado',
  picture_uuid: '123121211',
}]);
