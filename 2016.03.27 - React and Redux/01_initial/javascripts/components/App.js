import React from 'react'

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="arrow">❯</div>
        <input type="text" placeholder="What needs to be done?" value="" />
        <ul className="list">
          <li>
            <input className="toggle" type="checkbox" />
            <input type="text" value="dasada" />
          </li>
          <li className="completed">
            <input className="toggle" checked={true} type="checkbox" />
            <label>dasada</label>
            <button className="destroy" />
          </li>
          <li>
            <input className="toggle" type="checkbox" />
            <label>dasada</label>
            <button className="destroy">x</button>
          </li>
        </ul>
        <div className="footer">
          <div className="counter">
            4 items left
          </div>
          <button className="selected">All</button>
          <button>Active</button>
          <button>Completed</button>
          <button className="clear">Clear completed</button>
        </div>
      </div>
    );
  }
}
