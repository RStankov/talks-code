import { useCalculatorState } from './utils';
import { renderHook, act } from '@testing-library/react-hooks';

describe(useCalculatorState.name, () => {
  function initHook(initalState) {
    return renderHook(() => useCalculatorState(initalState)).result;
  }

  describe('add', () => {
    function call(initalState, value) {
      const hook = initHook(initalState);

      act(() => {
        hook.current[1].add(value);
      });

      return hook.current[0];
    }

    it('can add digits', () => {
      expect(call('1', '2')).toEqual('12');
    });

    it('ensures numbers cannot start with 0', () => {
      expect(call('0', '1')).toEqual('1');
      expect(call('1 + 0', '0')).toEqual('1 + 0');
      expect(call('1 + 0', '1')).toEqual('1 + 1');
      expect(call('10', '0')).toEqual('100');
    });

    it('can add operand', () => {
      expect(call('1', '+')).toEqual('1 + ');
    });

    it('guards against add operand before digit', () => {
      expect(call('', '+')).toEqual('');
    });

    it('guards against two operands one after the other', () => {
      expect(call('1 + ', '+')).toEqual('1 + ');
    });

    it('guards against add invalid operator', () => {
      expect(call('1', '~')).toEqual('1');
    });
  });

  describe('remove', () => {
    function call(initalState) {
      const hook = initHook(initalState);

      act(() => {
        hook.current[1].remove();
      });

      return hook.current[0];
    }

    it('removes one digit', () => {
      expect(call('1234')).toEqual('123');
    });

    it('removes one operand', () => {
      expect(call('1 + ')).toEqual('1');
    });

    it('returns at least 0 when fully cleared', () => {
      expect(call('1')).toEqual('0');
    });
  });

  describe('evaluate', () => {
    function call(initalState) {
      const hook = initHook(initalState);

      act(() => {
        hook.current[1].evaluate();
      });

      return hook.current[0];
    }

    describe('operations', () => {
      it('handles noop', () => {
        expect(call('12')).toEqual('12');
      });

      it('handles "1 + 1" input', () => {
        expect(call('1 + 1')).toEqual('2');
      });

      it('handles "1 - 1" input', () => {
        expect(call('2 - 1')).toEqual('1');
      });

      it('handles "2 * 3" input', () => {
        expect(call('2 * 3')).toEqual('6');
      });
    });

    describe('edge cases', () => {
      it('handles zero in input', () => {
        expect(call('1 + 0')).toEqual('1');
      });

      it('handles larger number in input', () => {
        expect(call('123 + 456')).toEqual((123 + 456).toString());
      });

      it('handles multiple operations input', () => {
        expect(call('1 + 1 + 1')).toEqual('3');
      });

      it('handles incomplete operation input', () => {
        expect(call('1 + ')).toEqual('1');
      });

      it('handles negative values', () => {
        expect(call('-1 + 2')).toEqual('1');
      });
    });
  });
});
