function template(view) {
  return _.template($('#' + view + '-template').html());
}

Backbone.View.prototype.appendView = function(view) {
  this.$el.append(view.render().el);
};

Todo = Backbone.Model.extend({
  defaults: {
    done:  false,
    text:  ''
  },
  toggle: function() {
    this.save({done: !this.get('done')});
  },
  isDone: function() {
    return this.get('done');
  }
});

TodoList = Backbone.Collection.extend({
  localStorage: new Store('todos'),
  model: Todo,
  done: function() {
    return this.filter(function(todo){ return todo.isDone(); });
  },
  remaining: function() {
    return this.without.apply(this, this.done());
  }
});

TodoView = Backbone.View.extend({
  tagName:  'li',
  template: template('todo'),
  events: {
    'click :checkbox': 'toggleDone',
    'click button':    'destroy',
    'dblclick span':   'edit',
    'keyup :text':     'handleKeyboard',
    'blur :text':      'update'
  },
  initialize: function() {
    this.model.bind('change:text', this.setText, this);
    this.model.bind('change:done', this.setDoneState, this);
    this.model.bind('destroy', this.remove, this);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('input[type="text"]');
    this.setText();
    this.setDoneState();
    return this;
  },
  setText: function() {
    var text = this.model.get('text');
    this.$('span').text(text);
    this.input.val(text);
  },
  setDoneState: function() {
    var isDone = this.model.isDone();
    this.$el.toggleClass('done', isDone);
    this.$(':checkbox').prop('checked', isDone);
  },
  toggleDone: function() {
    this.model.toggle();
  },
  edit: function() {
    this.$el.addClass('editing');
    this.input.focus();
  },
  update: function() {
    this.model.save({text: this.input.val()});
    this.$el.removeClass('editing');
  },
  handleKeyboard: function(e) {
    e.keyCode == 13 && this.update();
    e.keyCode == 27 && (this.$el.removeClass('editing'), this.setText);
  },
  destroy: function() {
    this.model.destroy();
  },
  remove: function() {
    Backbone.View.prototype.remove.apply(this, arguments);
    this.model.off('change:text', this.setText, this);
    this.model.off('change:done', this.setDoneState, this);
    this.model.off('destroy', this.remove, this);
  }
});

TodoStatsView = Backbone.View.extend({
  tagName: 'footer',
  template: template('todo-stats'),
  events: {
    'click a': 'clearCompleted'
  },
  initialize: function() {
    this.collection.bind('all', this.render, this);
  },
  render: function() {
    this.$el.html(this.template({
      total:      this.collection.length,
      done:       this.collection.done().length,
      remaining:  this.collection.remaining().length
    }));
    return this;
  },
  clearCompleted: function() {
    _.invoke(this.collection.done(), 'destroy');
    return false;
  }
});

NewTodoView = Backbone.View.extend({
  tagName: 'header',
  events: {
    'keyup :text': 'createOnEnter'
  },
  template: template('new-todo'),
  render: function() {
    this.$el.html(this.template());
    this.input = this.$(':text');
    return this;
  },
  createOnEnter: function(e) {
    var text = this.input.val();
    if (!text) {
      this.input.focus();
      return;
    }
    if (e.keyCode != 13) {
      return;
    }
    this.collection.create({text: text});
    this.input.val('');
  }
});

TodoListView = Backbone.View.extend({
  tagName: 'ul',
  initialize: function() {
    this.collection.bind('add', this.addOne, this);
  },
  render: function() {
    this.collection.each(this.addOne, this);
    return this;
  },
  addOne: function(todo) {
    this.appendView(new TodoView({model: todo}));
  }
});

TodoAppView = Backbone.View.extend({
  className: 'todo-app',
  render: function() {
    this.appendView(new NewTodoView({collection: this.collection}));
    this.appendView(new TodoListView({collection: this.collection}));
    this.appendView(new TodoStatsView({collection: this.collection}));
    return this;
  }
});

collection = new TodoList();
collection.fetch()

view = new TodoAppView({collection: collection});

$('body').append(view.render().el);

