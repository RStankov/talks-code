import React from 'react';
import {Container} from 'flux/utils';

import TodosStore from '../stores/TodosStore';
import FiltersStore from '../stores/FiltersStore';

import TodoItem from './TodoItem';

class TodoList extends React.Component {
  static getStores() {
    return [TodosStore, FiltersStore];
  }

  static calculateState() {
    return {
      todos: TodosStore.getState(),
      filter: FiltersStore.getState().filter,
    };
  }

  render() {
    const todos = this.state.todos.filter(this.state.filter);

    return (
      <ul className="list">
        {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    );
  }
}

const container = Container.create(TodoList);

export default container;
