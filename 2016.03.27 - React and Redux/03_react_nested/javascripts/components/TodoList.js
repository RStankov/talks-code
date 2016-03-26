import React from 'react';

import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
  static propTypes = {
    updateTodo: React.PropTypes.func.isRequired,
    removeTodo: React.PropTypes.func.isRequired,
    todos: React.PropTypes.array.isRequired,
  };

  render() {
    return (
      <ul className="list">
        {this.props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={this.props.updateTodo}
            removeTodo={this.props.removeTodo} />
        ))}
      </ul>
    );
  }
}
