import React from 'react';
import {connect} from 'react-redux'

import TodoItem from './TodoItem';

class TodoList extends React.Component {
  render() {
    const todos = this.props.todos.filter(this.props.filter);

    return (
      <ul className="list">
        {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    );
  }
}

const decorate = connect((state) => {
  return {
    todos: state.todos,
    filter: state.visibilityFilter.filter,
  };
});

export default decorate(TodoList);
