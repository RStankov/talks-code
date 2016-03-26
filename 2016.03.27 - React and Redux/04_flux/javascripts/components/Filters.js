import React from 'react';
import {Container} from 'flux/utils';

import FILTERS from '../constants/filters';
import {changeFilter} from '../actions/FilterActions';
import FiltersStore from '../stores/FiltersStore';

class Filters extends React.Component {
  static getStores() {
    return [FiltersStore];
  }

  static calculateState() {
    return {
      activeFilterName: FiltersStore.getState().name,
    };
  }

  filterHander(filterName) {
    return (e) => {
      changeFilter(filterName);
    };
  }

  render() {
    return (
      <span>
        {Object.keys(FILTERS).map((filterName) => (
            <button
              className={filterName === this.state.activeFilterName ? 'selected' : null}
              key={filterName}
              onClick={this.filterHander(filterName)}
              >{filterName}</button>
        ))}
      </span>
    );
  }
}

const container = Container.create(Filters);

export default container;
