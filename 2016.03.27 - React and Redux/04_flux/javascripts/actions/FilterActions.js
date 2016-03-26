import {dispatch} from '../stores/dispatcher';

export function changeFilter(filterName) {
  dispatch({
    type: 'filter/select',
    filterName: filterName,
  });
}
