import React from 'react';
import Component from './index';
import { shallow, mount } from 'enzyme';
import Memory from './Memory';

const dt = s => `[data-test="${s}"]`

describe(Component.name, () => {
  it('renders memory', () => {
    const component = mount(<Component />);

    expect(component.find(dt('result'))).toIncludeText('0');
  });

  describe('actions', () => {
    let component;

    beforeEach(() => {
      component = mount(<Component />);

      component.find(dt('1')).simulate('click');
      component.find(dt('+')).simulate('click');
      component.find(dt('1')).simulate('click');
    });

    it('can add digits and operands', () => {
      expect(component.find(dt('result'))).toIncludeText('1 + 1');
    });

    it('can sum numbers', () => {
      component.find(dt('calculate')).simulate('click');

      expect(component.find(dt('result'))).toIncludeText('2');
    });

    it('can remove digits and operands', () => {
      component.find(dt('remove')).simulate('click');

      expect(component.find(dt('result'))).toIncludeText('1 +');
    });

    it('can be reset', () => {
      component.find(dt('reset')).simulate('click');

      expect(component.find(dt('result'))).toIncludeText('0');
    });
  });
});
