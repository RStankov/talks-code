import React from 'react';

import Filters from './Filters';

export default class Footer extends React.Component {

  static propTypes = {
    clearCompletedTodos: React.PropTypes.func.isRequired,
    changeFilter: React.PropTypes.func.isRequired,
    activeFilter: React.PropTypes.string.isRequired,
    filters: React.PropTypes.object.isRequired,
    todos: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  handleClearCompleted(e) {
    this.props.clearCompletedTodos();
  }

  render() {
    const count = this.props.todos.filter((t) => !t.completed).length;
    const counterText = `${ count } ${ count === 1 ? 'item' : 'items' } left`

    const completedCount = this.props.todos.length - count;

    return (
      <div className="footer">
        <div className="counter">{counterText}</div>
        <Filters
          changeFilter={this.props.changeFilter}
          activeFilter={this.props.activeFilter}
          filters={this.props.filters}
          />
        <button
          className="clear"
          style={{visibility: completedCount > 0 ? 'visible' : 'hidden'}}
          onClick={this.handleClearCompleted}
          >Clear completed</button>
      </div>
    );
  }
}

