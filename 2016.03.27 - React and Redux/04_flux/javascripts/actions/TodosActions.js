import {dispatch} from '../stores/dispatcher';

export function addTodo(todo) {
  dispatch({
    type: 'todo/add',
    todo: { id: +(new Date), completed: false, ...todo },
  });
}

export function updateTodo(todo, updates) {
  dispatch({
    type: 'todo/update',
    todo: { ...todo, ...updates },
  });
}

export function removeTodo(todo) {
  dispatch({
    type: 'todo/remove',
    todo: todo,
  });
}

export function clearCompletedTodos() {
  dispatch({
    type: 'todo/clear',
  });
}
