/**
 *
 * Just a small "Storage" object, to simulate a database.
 *
 * Not GraphQL specific
 *
 */

var _  = require('lodash');

function Storage(data) {
  this.data = data || [];
  this.maxId = _(this.data).pluck('id').max() || 0;
};

Storage.prototype.all = function() {
  return this.data;
};

Storage.prototype.create = function(values) {
  values.id = ++this.maxId;
  this.data.push(values);
  return values;
};

Storage.prototype.update = function(values) {
  var id = values.id;

  values = _.omit(values, 'id');

  var index = _.findIndex(this.data, function(object) {
    return object.id == id;
  });

  if (index === -1) {
    throw "Can't find object with id - " + id;
  }

  var object = _.extend(this.data[index], values);

  this.data[index] = object;

  return object;
};

Storage.prototype.destroy = function(values) {
  var removed = _.remove(this.data, function(object) {
    return values.id == object.id;
  });

  return removed[0];
};

Storage.prototype.find = function(id) {
  return _.find(this.data, function(object) {
    return object.id == id;
  });
};

Storage.prototype.where = function(source) {
  return _.where(this.data, source);
};

module.exports = Storage;
