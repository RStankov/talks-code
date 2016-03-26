import React from 'react';
import {Container} from 'flux/utils';

import {clearCompletedTodos} from '../actions/TodosActions';
import TodosStore from '../stores/TodosStore';

import Filters from './Filters';

class Footer extends React.Component {
  static getStores() {
    return [TodosStore];
  }

  static calculateState() {
    return {
      todos: TodosStore.getState(),
    };
  }

  render() {
    const count = this.state.todos.filter((t) => !t.completed).length;
    const counterText = `${ count } ${ count === 1 ? 'item' : 'items' } left`

    const completedCount = this.state.todos.length - count;

    return (
      <div className="footer">
        <div className="counter">{counterText}</div>
        <Filters />
        <button
          className="clear"
          style={{visibility: completedCount > 0 ? 'visible' : 'hidden'}}
          onClick={clearCompletedTodos}
          >Clear completed</button>
      </div>
    );
  }
}

const container = Container.create(Footer);

export default container;
