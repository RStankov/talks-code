export function addTodo(todo) {
  return {
    type: 'todo/add',
    todo: { id: +(new Date), completed: false, ...todo },
  };
}

export function updateTodo(todo, updates) {
  return {
    type: 'todo/update',
    todo: { ...todo, ...updates },
  };
}

export function removeTodo(todo) {
  return {
    type: 'todo/remove',
    todo: todo,
  };
}

export function clearCompletedTodos() {
  return {
    type: 'todo/clear',
  };
}
