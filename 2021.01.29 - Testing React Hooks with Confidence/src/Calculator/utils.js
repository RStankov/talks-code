import * as React from 'react';

const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
};

function calculatorReducer(memory, action) {
  switch (action.type) {
    case 'add':
      const input = action.payload;

      if (!input.match(/\d/)) {
        if (!memory.match(/\d$/)) {
          return memory;
        }

        if (!OPERATIONS[input]) {
          return memory;
        }

        return `${memory} ${input} `;
      }

      if (memory.match(/(^| )0$/)) {
        return `${memory.slice(0, -1)}${input}`;
      }

      return `${memory}${input}`;

    case 'remove':
      const newMemory = memory.match(/\d$/)
        ? memory.slice(0, -1)
        : memory.slice(0, -3);

      return newMemory || '0';

    case 'reset':
      return '0';

    case 'evaluate':
      const chunks = memory.split(' ');
      let value = parseInt(chunks[0], 10);

      for (let i = 1; i < chunks.length; i += 2) {
        const other = chunks[i + 1];
        if (typeof other === 'undefined' || other.length === 0) {
          continue;
        }

        const operation = OPERATIONS[chunks[i]];
        if (!operation) {
          throw new Error(`Invalid "${chunks[i]}" operand`);
        }

        value = operation(value, parseInt(other, 10));
      }

      return value.toString();

    default:
      throw new Error(`Invalid action - ${action.type}`);
  }
}

export function useCalculatorState(initalState = '0') {
  const [memory, dispatch] = React.useReducer(calculatorReducer, initalState);

  const actions = React.useMemo(
    () => ({
      add(value) {
        dispatch({ type: 'add', payload: value });
      },
      remove() {
        dispatch({ type: 'remove' });
      },
      reset() {
        dispatch({ type: 'reset' });
      },
      evaluate() {
        dispatch({ type: 'evaluate' });
      },
    }),
    [dispatch],
  );

  return [memory, actions];
}
