import FILTERS from '../constants/filters';

const DEFAULT_FILTER = Object.keys(FILTERS)[0];
const DEFAULT_STATE = {
  name: DEFAULT_FILTER,
  filter: FILTERS[DEFAULT_FILTER],
};

export default function visibilityFilter(state, action) {
  if (!state) {
    state = DEFAULT_STATE;
  }

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
