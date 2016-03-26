export default function todos(state = [], action) {
  switch (action.type) {
    case 'todo/add':
      return [action.todo].concat(state);

    case 'todo/update':
      return state.map((t) => t.id === action.todo.id ? action.todo : t);

    case 'todo/remove':
      return state.filter((t) => t.id !== action.todo.id);

    case 'todo/clear':
      return state.filter((t) => !t.completed)

    default:
      return state;
  }
}
