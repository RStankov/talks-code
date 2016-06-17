import React from 'react';

export default class Filters extends React.Component {
  static propTypes ={
    changeFilter: React.PropTypes.func.isRequired,
    activeFilter: React.PropTypes.string.isRequired,
    filters: React.PropTypes.object.isRequired,
  };

  filterHander(filterName) {
    return (e) => {
      this.props.changeFilter(filterName);
    };
  }

  render() {
    return (
      <span>
        {Object.keys(this.props.filters).map((filterName) => (
            <button
              className={filterName === this.props.activeFilter ? 'selected' : null}
              key={filterName}
              onClick={this.filterHander(filterName)}
              >{filterName}</button>
        ))}
      </span>
    );
  }
}


