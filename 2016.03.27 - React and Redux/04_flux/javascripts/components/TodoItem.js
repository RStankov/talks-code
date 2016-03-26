import React from 'react';

import {updateTodo, removeTodo} from '../actions/TodosActions';

import Input from './Input';

export default class TodoItem extends React.Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleEditCancel() {
    this.setState({editing: false});
  }

  handleUpdate(value) {
    this.setState({editing: false});
    updateTodo(this.props.todo, { text: value });
  }

  handleRemove() {
    removeTodo(this.props.todo);
  }

  handleEdit() {
    this.setState({
      editing: true,
    });
  }

  handleToggle() {
    updateTodo(this.props.todo, { completed: !this.props.todo.completed});
  }

  render() {
    const todo = this.props.todo;

    const content = this.state.editing ? (
      <Input
        initialValue={todo.text}
        onSave={this.handleUpdate}
        onCancel={this.handleEditCancel} />
    ) : (
      <span>
        <label onDoubleClick={this.handleEdit}>{todo.text}</label>
        <button className="destroy" onClick={this.handleRemove}>x</button>
      </span>
    );

    return (
      <li className={todo.completed ? 'completed' : ''}>
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={this.handleToggle} />
        {content}
      </li>
    )
  }
}
