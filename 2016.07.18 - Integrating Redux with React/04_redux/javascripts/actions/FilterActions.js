export function changeFilter(filterName) {
  return {
    type: 'filter/select',
    filterName: filterName,
  };
}
