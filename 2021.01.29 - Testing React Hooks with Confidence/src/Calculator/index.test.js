import Component from './index';
import Memory from './Memory';

import { render, fireEvent, screen } from '@testing-library/react';

const click = (dt) => fireEvent.click(screen.getByTestId(dt));
const expectComponent = (dt) => expect(screen.getByTestId(dt));

describe(Component.name, () => {
  it('renders memory', () => {
    render(<Component />);

    expectComponent('result').toHaveTextContent('0');
  });

  describe('actions', () => {
    beforeEach(() => {
      render(<Component />);

      click('1');
      click('+');
      click('1');
    });

    it('can add digits and operands', () => {
      expectComponent('result').toHaveTextContent('1 + 1');
    });

    it('can sum numbers', () => {
      click('evaluate');

      expectComponent('result').toHaveTextContent('2');
    });

    it('can remove digits and operands', () => {
      click('remove');

      expectComponent('result').toHaveTextContent('1 +');
    });

    it('can be reset', () => {
      click('reset');

      expectComponent('result').toHaveTextContent('0');
    });
  });
});
