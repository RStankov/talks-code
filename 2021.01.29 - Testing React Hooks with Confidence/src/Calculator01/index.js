import * as React from 'react';

import Memory from './Memory';
import Grid from './Grid';
import Button from './Button';

const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
};

export default function Calculator() {
  const [memory, setMemory] = React.useState('0');

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

  return (
    <Grid size="4">
      <Grid.Column size="3">
        <Memory>{memory.trim()}</Memory>
        <Button onClick={() => actions.add('1')}>1</Button>
        <Button onClick={() => actions.add('2')}>2</Button>
        <Button onClick={() => actions.add('3')}>3</Button>
        <Button onClick={() => actions.add('4')}>4</Button>
        <Button onClick={() => actions.add('5')}>5</Button>
        <Button onClick={() => actions.add('6')}>6</Button>
        <Button onClick={() => actions.add('7')}>7</Button>
        <Button onClick={() => actions.add('8')}>8</Button>
        <Button onClick={() => actions.add('9')}>9</Button>
        <Button onClick={actions.reset}>C</Button>
        <Button onClick={() => actions.add('0')}>0</Button>
        <Button onClick={actions.remove}>←</Button>
      </Grid.Column>
      <Grid.Column size="1">
        <Button onClick={actions.evaluate}>=</Button>
        <Button onClick={() => actions.add('+')}>+</Button>
        <Button onClick={() => actions.add('-')}>-</Button>
        <Button onClick={() => actions.add('*')}>*</Button>
      </Grid.Column>
    </Grid>
  );
}
