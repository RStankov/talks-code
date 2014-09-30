function template(view) {
  return _.template($('#' + view + '-template').html());
}

Backbone.View.prototype.appendView = function(view) {
  this.$el.append(view.render().el);
};

