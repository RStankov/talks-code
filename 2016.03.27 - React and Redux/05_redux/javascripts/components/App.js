import React from 'react';

import NewTodo from './NewTodo';
import TodoList from './TodoList';
import Footer from './Footer';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <NewTodo />
        <TodoList />
        <Footer />
      </div>
    );
  }
}
