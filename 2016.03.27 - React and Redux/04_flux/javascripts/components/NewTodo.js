import React from 'react';

import {addTodo} from '../actions/TodosActions';

import Input from './Input';

export default class NewTodo extends React.Component {
  handleAdd(value) {
    addTodo({text: value});
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

