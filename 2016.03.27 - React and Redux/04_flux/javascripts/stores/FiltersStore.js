import {ReduceStore} from 'flux/utils';

import FILTERS from '../constants/filters';

import dispatcher from './dispatcher';

const DEFAULT_FILTER = Object.keys(FILTERS)[0];
const DEFAULT_STATE = {
  name: DEFAULT_FILTER,
  filter: FILTERS[DEFAULT_FILTER],
};

class FilterStore extends ReduceStore {
  getInitialState() {
    return DEFAULT_STATE;
  }

  reduce (state, action) {
    switch (action.type) {
      case 'filter/select':
        const name = action.filterName;
        const filter = FILTERS[name];

        if (!filter) {
          return state;
        }

        return {
          name: name,
          filter: filter,
        };

      default:
        return state;
    }
  }
}

const store = new FilterStore(dispatcher);

export default store;
