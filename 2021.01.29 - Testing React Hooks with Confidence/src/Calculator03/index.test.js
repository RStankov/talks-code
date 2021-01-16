import React from 'react';
import Component from './index';
import Memory from './Memory';

import { render, fireEvent, screen } from '@testing-library/react';

const click = (dt) => fireEvent.click(screen.getByTestId(dt));
const expectComponent = (dt) => expect(screen.getByTestId(dt));

describe(Component.name, () => {
  it('works', () => {
    render(<Component />);
    expectComponent('result').toHaveTextContent('0');

    click('1');
    click('+');
    click('1');
    expectComponent('result').toHaveTextContent('1 + 1');

    click('remove');
    expectComponent('result').toHaveTextContent('1 +');

    click('2');
    expectComponent('result').toHaveTextContent('1 + 2');

    click('evaluate');
    expectComponent('result').toHaveTextContent('3');

    click('reset');
    expectComponent('result').toHaveTextContent('0');
  });
});
