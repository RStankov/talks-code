import React from 'react';
import {connect} from 'react-redux'

import {addTodo} from '../actions/TodosActions';

import Input from './Input';

class NewTodo extends React.Component {
  handleAdd(value) {
    this.props.dispatch(addTodo({text: value}));
  }

  render() {
    return (
      <div>
        <div className="arrow">❯</div>
        <Input placeholder="What needs to be done?" onSave={this.handleAdd.bind(this)} />
      </div>
    );
  }
}

const decorate = connect();

export default decorate(NewTodo);
