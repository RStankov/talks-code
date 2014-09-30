var Calculator = Backbone.Model.extend({
  defaults: {
    value: 0
  },
  increment: function() {
    this.set('value', this.get('value') + 1);
  },
  decrement: function() {
    this.set('value', this.get('value') - 1);
  },
  getValue: function() {
    return this.get('value');
  }
});

var ButtonsView = Backbone.View.extend({
  events: {
    'click .plus':  'plus',
    'click .minus': 'minus'
  },
  plus: function() {
    this.model.increment();
  },
  minus: function() {
    this.model.decrement();
  }
});

var DisplayView = Backbone.View.extend({
  initialize: function() {
    this.model.bind('change:value', this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.model.getValue());
    return this;
  }
});

var cal = new Calculator();

new ButtonsView({model: cal, el: '.buttons'});
new DisplayView({model: cal, el: '.display'});
