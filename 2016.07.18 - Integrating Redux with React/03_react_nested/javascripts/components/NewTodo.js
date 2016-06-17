import React from 'react';

import Input from './Input';

export default class NewTodo extends React.Component {
  static propTypes = {
    addTodo: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(value) {
    this.props.addTodo({text: value});
  }

  render() {
    return (
      <div>
        <div className="arrow">❯</div>
        <Input placeholder="What needs to be done?" onSave={this.handleAdd} />
      </div>
    );
  }
}

