import React from 'react';
import {connect} from 'react-redux'

import {changeFilter} from '../actions/FilterActions';
import FILTERS from '../constants/filters';

class Filters extends React.Component {
  filterHander(filterName) {
    return (e) => {
      this.props.dispatch(changeFilter(filterName));
    };
  }

  render() {
    return (
      <span>
        {Object.keys(FILTERS).map((filterName) => (
            <button
              className={filterName === this.props.activeFilterName ? 'selected' : null}
              key={filterName}
              onClick={this.filterHander(filterName)}
              >{filterName}</button>
        ))}
      </span>
    );
  }
}

const decorate = connect((state) => {
  return {
    activeFilterName: state.visibilityFilter.name,
  };
});

export default decorate(Filters);
