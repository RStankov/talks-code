import React from 'react';
import Component from './index';
import { shallow, mount } from 'enzyme';
import Memory from './Memory';

describe(Component.name, () => {
  it('renders memory', () => {
    const component = mount(<Component />);

    expect(component.find('[data-test="result"]')).toIncludeText('0');
  });

  describe('actions', () => {
    let component;

    beforeEach(() => {
      component = mount(<Component />);

      component.find('[data-test="1"]').simulate('click');
      component.find('[data-test="+"]').simulate('click');
      component.find('[data-test="1"]').simulate('click');
    });

    it('can add digits and operands', () => {
      expect(component.find('[data-test="result"]')).toIncludeText('1 + 1');
    });

    it('can sum numbers', () => {
      component.find('[data-test="calculate"]').simulate('click');

      expect(component.find('[data-test="result"]')).toIncludeText('2');
    });

    it('can remove digits and operands', () => {
      component.find('[data-test="remove"]').simulate('click');

      expect(component.find('[data-test="result"]')).toIncludeText('1 +');
    });

    it('can be reset', () => {
      component.find('[data-test="reset"]').simulate('click');

      expect(component.find('[data-test="result"]')).toIncludeText('0');
    });
  });
});
