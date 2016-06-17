import React from 'react';

const FILTERS = {
  All: () => true,
  Active: (t) => !t.completed,
  Completed: (t) => t.completed,
};

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: Object.keys(FILTERS)[0],
      editId: null,
      editText: '',
      newTodo: '',
      todos: [],
    };

    this.handleClearCompleted = this.handleClearCompleted.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.handleEditChange  = this.handleEditChange.bind(this);
    this.handleEditKeyDown = this.handleEditKeyDown.bind(this);
  }

  handleClearCompleted(e) {
    this.setState({
      todos: this.state.todos.filter((t) => !t.completed),
    });
  }

  handleChange(e) {
    this.setState({ newTodo: e.target.value || '' });
  }

  handleEditChange(e) {
    this.setState({ editText: e.target.value || '' });
  }

  handleKeyDown(e) {
    if (e.keyCode === ESCAPE_KEY) {
      this.setState({
        newTodo: '',
      });
      return;
    }

    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    e.preventDefault();

    var value = this.state.newTodo.trim();
    if (value) {
      const todo = {
        id: +(new Date()),
        text: value,
        completed: false
      };

      this.setState({
        newTodo: '',
        todos: [todo].concat(this.state.todos),
      });
    }
  }

  handleEditKeyDown(e) {
    if (e.keyCode === ESCAPE_KEY) {
      this.setState({
        editId: null,
        editText: '',
      });
      return;
    }

    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    e.preventDefault();

    var id = this.state.editId;
    var value = this.state.editText.trim();
    if (value) {
      this.setState({
        editId: null,
        editText: '',
        todos: this.state.todos.map((t) => {
          if (t.id === id) {
            t.text = value;
          }
          return t;
        }),
      });
    }
  }

  removeTodoHandler(todo) {
    return (e) => {
      this.setState({
        todos: this.state.todos.filter((t) => t.id !== todo.id),
      });
    };
  }

  editTodoHandler(todo) {
    return (e) => {
      this.setState({
        editId: todo.id,
        editText: todo.text,
      });
    };
  }

  toggleTodoHandler(todo) {
    return (e) => {
      this.setState({
        todos: this.state.todos.map((t) => {
          if (t.id === todo.id) {
            t.completed = !t.completed;
          }
          return t;
        }),
      });
    };
  }

  filterHander(filterName) {
    return (e) => {
      this.setState({
        filter: filterName,
      });
    };
  }

  render() {
    const count = this.state.todos.filter((t) => !t.completed).length;
    const counterText = `${ count } ${ count === 1 ? 'item' : 'items' } left`

    const completedCount = this.state.todos.length - count;

    return (
      <div className="app">
        <div className="arrow">❯</div>
        <input type="text" placeholder="What needs to be done?" onChange={this.handleChange} onKeyDown={this.handleKeyDown} value={this.state.newTodo} />
        <ul className="list">
          {this.state.todos.filter(FILTERS[this.state.filter]).map(this.renderTodo, this)}
        </ul>
        <div className="footer">
          <div className="counter">{counterText}</div>
          {this.renderFilters()}
          <button className="clear" style={{visibility: completedCount > 0 ? 'visible' : 'hidden'}} onClick={this.handleClearCompleted}>Clear completed</button>
        </div>
      </div>
    );
  }

  renderFilters() {
    return Object.keys(FILTERS).map((filterName) => (
      <button className={filterName === this.state.filter ? 'selected' : null} key={filterName} onClick={this.filterHander(filterName)}>{filterName}</button>
    ));
  }

  renderTodo(todo) {
    const content = this.state.editId === todo.id ? (
      <input type="text" value={this.state.editText} onChange={this.handleEditChange} onKeyDown={this.handleEditKeyDown} />
    ) : (
      <span>
        <label onDoubleClick={this.editTodoHandler(todo)}>{todo.text}</label>
        <button className="destroy" onClick={this.removeTodoHandler(todo)}>x</button>
      </span>
    );

    return (
      <li key={todo.id} className={todo.completed ? 'completed' : ''}>
        <input className="toggle" type="checkbox" checked={todo.completed} onChange={this.toggleTodoHandler(todo)} />
        {content}
      </li>
    )
  }
}
