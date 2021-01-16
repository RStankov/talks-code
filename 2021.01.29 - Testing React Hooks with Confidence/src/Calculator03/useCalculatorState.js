import * as React from 'react';

const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
};

export default function useCalculatorState(initalState = '0') {
  const [memory, setMemory] = React.useState(initalState);

  const actions = React.useMemo(
    () => ({
      add(input) {
        if (!input.match(/\d/)) {
          if (!memory.match(/\d$/)) {
            return;
          }

          if (!OPERATIONS[input]) {
            return;
          }

          setMemory(`${memory} ${input} `);
          return;
        }

        if (memory.match(/(^| )0$/)) {
          setMemory(`${memory.slice(0, -1)}${input}`);
          return;
        }

        setMemory(`${memory}${input}`);
      },
      remove() {
        const newMemory = memory.match(/\d$/)
          ? memory.slice(0, -1)
          : memory.slice(0, -3);

        setMemory(newMemory || '0');
      },
      reset() {
        setMemory('0');
      },
      evaluate() {
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

        setMemory(value.toString());
      },
    }),
    [memory, setMemory],
  );

  return [memory, actions];
}
