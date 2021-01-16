import React from 'react';

import Memory from './Memory';
import Grid from './Grid';
import Button from './Button';

import { useCalculatorState } from './utils';

export default function Calculator() {
  const [memory, actions] = useCalculatorState();

  return (
    <Grid size="4">
      <Grid.Column size="3" data-testid="buttons">
        <Memory data-testid="result">{memory.trim()}</Memory>
        <Button data-testid="1" onClick={() => actions.add('1')}>
          1
        </Button>
        <Button data-testid="2" onClick={() => actions.add('2')}>
          2
        </Button>
        <Button data-testid="3" onClick={() => actions.add('3')}>
          3
        </Button>
        <Button data-testid="4" onClick={() => actions.add('4')}>
          4
        </Button>
        <Button data-testid="5" onClick={() => actions.add('5')}>
          5
        </Button>
        <Button data-testid="6" onClick={() => actions.add('6')}>
          6
        </Button>
        <Button data-testid="7" onClick={() => actions.add('7')}>
          7
        </Button>
        <Button data-testid="8" onClick={() => actions.add('8')}>
          8
        </Button>
        <Button data-testid="9" onClick={() => actions.add('9')}>
          9
        </Button>
        <Button data-testid="reset" onClick={actions.reset}>
          C
        </Button>
        <Button data-testid="0" onClick={() => actions.add('0')}>
          0
        </Button>
        <Button data-testid="remove" onClick={actions.remove}>
          ←
        </Button>
      </Grid.Column>
      <Grid.Column size="1" data-testid="operations">
        <Button data-testid="evaluate" onClick={actions.evaluate}>
          =
        </Button>
        <Button data-testid="+" onClick={() => actions.add('+')}>
          +
        </Button>
        <Button data-testid="-" onClick={() => actions.add('-')}>
          -
        </Button>
        <Button data-testid="*" onClick={() => actions.add('*')}>
          *
        </Button>
      </Grid.Column>
    </Grid>
  );
}
