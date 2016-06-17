const FILTERS = {
  All: () => true,
  Active: (t) => !t.completed,
  Completed: (t) => t.completed,
};

export default FILTERS;
