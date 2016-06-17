import React from 'react';

import NewTodo from './NewTodo';
import TodoList from './TodoList';
import Footer from './Footer';

const FILTERS = {
  All: () => true,
  Active: (t) => !t.completed,
  Completed: (t) => t.completed,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: Object.keys(FILTERS)[0],
      todos: [],
    };

    this.changeFilter = this.changeFilter.bind(this);

    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.clearCompletedTodos = this.clearCompletedTodos.bind(this);
  }

  addTodo(todo) {
    const newTodo = { id: +(new Date), completed: false, ...todo };

    this.setState({
      todos: [newTodo].concat(this.state.todos),
    });
  }

  updateTodo(todo, updates) {
    this.setState({
      todos: this.state.todos.map((t) => {
        return t.id === todo.id ? { ...todo, ...updates } : t;
      }),
    });
  }

  removeTodo(todo) {
    this.setState({
      todos: this.state.todos.filter((t) => t.id !== todo.id),
    });
  }

  clearCompletedTodos(e) {
    this.setState({
      todos: this.state.todos.filter((t) => !t.completed),
    });
  }

  changeFilter(filterName) {
    this.setState({
      filter: filterName,
    });
  }

  render() {
    return (
      <div className="app">
        <NewTodo
          addTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos.filter(FILTERS[this.state.filter])}
          updateTodo={this.updateTodo}
          removeTodo={this.removeTodo} />
        <Footer
          todos={this.state.todos}
          filters={FILTERS}
          activeFilter={this.state.filter}
          changeFilter={this.changeFilter}
          clearCompletedTodos={this.clearCompletedTodos} />
      </div>
    );
  }
}
