import React from 'react';
import {connect} from 'react-redux'

import {clearCompletedTodos} from '../actions/TodosActions';

import Filters from './Filters';

class Footer extends React.Component {
  handleClear(filterName) {
    this.props.dispatch(clearCompletedTodos());
  }

  render() {
    const count = this.props.todos.filter((t) => !t.completed).length;
    const counterText = `${ count } ${ count === 1 ? 'item' : 'items' } left`

    const completedCount = this.props.todos.length - count;

    return (
      <div className="footer">
        <div className="counter">{counterText}</div>
        <Filters />
        <button
          className="clear"
          style={{visibility: completedCount > 0 ? 'visible' : 'hidden'}}
          onClick={this.handleClear.bind(this)}
          >Clear completed</button>
      </div>
    );
  }
}

const decorate = connect((state) => {
  return {
    todos: state.todos,
  };
});

export default decorate(Footer);
