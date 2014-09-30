
Backbone.View.prototype.appendView = function(view) {
  this.$el.append(view.render().el);
};



var app = {
  keys: {
    ESC:   27,
    ENTER: 13
  },
  template: function template(view) {
    return _.template($('#' + view + '-template').html());
  }
};

(function() {
  var template = app.template;

  var Todo = Backbone.Model.extend({
    defaults: {
      done: false,
      text: ''
    },
    isDone: function() {
      return !!this.get('done');
    },
    toggle: function() {
      this.save({done: !this.get('done')});
    },
    setText: function(text) {
      this.save({text: text});
    },
    text: function() {
      return this.get('text');
    }
  });

  var Todos = Backbone.Collection.extend({
    localStorage: new Store('todos'),
    model: Todo,
    done: function() {
      return this.filter(function(todo){ return todo.isDone(); });
    },
    remaining: function() {
      return this.without.apply(this, this.done());
    }
  });

  var TodoAppView = Backbone.View.extend({
    className: 'todo-app',
    render: function() {
      this.appendView(new NewTodoView({collection: this.collection}));
      this.appendView(new TodoListView({collection: this.collection}));
      this.appendView(new TodoStatsView({collection: this.collection}));
      return this;
    }
  });

  var NewTodoView = Backbone.View.extend({
    tagName: 'header',
    template: template('new-todo'),
    events: {
      'keyup :text': 'handleKeyboard',
    },
    render: function() {
      this.$el.html(this.template());
      this.input = this.$(':text');
      return this;
    },
    handleKeyboard: function(e) {
      e.keyCode == app.keys.ESC && this._clearInput()
      e.keyCode == app.keys.ENTER && this._addTodo();
    },
    _clearInput: function() {
      this.input.val('');
      this.input.blur();
    },
    _addTodo: function() {
      this.collection.create({text: this.input.val()});
      this.input.val('');
    }
  });

  var TodoListView = Backbone.View.extend({
    tagName: 'ul',
    bindToCollection: {
      'add': '_addTodo'
    },
    remove: function() {
      this.collection.off('add', this._addTodo, this);
      return Backbone.View.prototype.remove.apply(this, arguments);
    },
    render: function() {
      this.collection.each(this._addTodo, this);
      return this;
    },
    _addTodo: function(todo) {
      this.appendView(new TodoItemView({model: todo}));
    }
  });

  var TodoItemView = Backbone.View.extend({
    tagName: 'li',
    template: template('todo'),
    events: {
      'click button':     'destroy',
      'change :checkbox': 'toggle',
      'dblclick span':    'edit',
      'keyup :text':      'handleKeyboard',
    },
    bindToModel: {
      'destroy':     'remove',
      'change:done': 'renderDone',
      'change:text': 'renderText'
    },
    destroy: function () {
      this.model.destroy();
    },
    toggle: function () {
      this.model.toggle();
    },
    render: function() {
      this.$el.html(this.template());
      this.renderText();
      this.renderDone();
      return this;
    },
    renderText: function() {
      var text = this.model.text();
      this.$('span').html(text);
      this.$(':text').val(text);
    },
    renderDone: function() {
      var isDone = this.model.isDone();
      this.$(':checkbox').prop('checked', isDone);
      this.$el.toggleClass('done', isDone);
    },
    edit: function() {
      this.$el.addClass('editing');
    },
    handleKeyboard: function(e) {
      e.keyCode == app.keys.ENTER && this._update();
      e.keyCode == app.keys.ESC && this._restore();
    },
    _update: function() {
      this.model.setText(this.$(':text').val());
      this.$el.removeClass('editing');
    },
    _restore: function() {
      this.$el.removeClass('editing');
      this.renderText();
    }
  });

  var TodoStatsView = Backbone.View.extend({
    tagName: 'footer',
    template: template('todo-stats'),
    events: {
      'click a': 'clearCompleted'
    },
    bindToCollection: {
      'all': 'render'
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

  app.todos = {
    start: function(collection, container) {
      var view = new TodoAppView({collection: collection});
      container.append(view.render().el);
    },
    Todo: Todo,
    Todos: Todos,
    TodoItemView: TodoItemView,
    NewTodoView: NewTodoView,
    TodoAppView: TodoAppView,
    TodoListView: TodoListView,
    TodoStatsView: TodoStatsView
  };
})();


collection = new app.todos.Todos();
collection.fetch();

app.todos.start(collection, $('body'));
app.todos.start(collection, $('body'));

