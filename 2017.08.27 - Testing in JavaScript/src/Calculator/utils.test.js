import { addToMemory, removeFromMemory, calculate } from './utils';

describe('utils', () => {
  describe(addToMemory.name, () => {
    it('can add digits', () => {
      expect(addToMemory('1', '2')).toEqual('12');
    });

    it('ensures numbers cannot start with 0', () => {
      expect(addToMemory('0', '1')).toEqual('1');
      expect(addToMemory('1 + 0', '0')).toEqual('1 + 0');
      expect(addToMemory('1 + 0', '1')).toEqual('1 + 1');
      expect(addToMemory('10', '0')).toEqual('100');
    });

    it('can add operand', () => {
      expect(addToMemory('1', '+')).toEqual('1 + ');
    });

    it('guards against add operand before digit', () => {
      expect(addToMemory('', '+')).toEqual('');
    });

    it('guards against two operands one after the other', () => {
      expect(addToMemory('1 + ', '+')).toEqual('1 + ');
    });

    it('guards against add invalid operator', () => {
      expect(addToMemory('1', '~')).toEqual('1');
    });
  });

  describe(removeFromMemory.name, () => {
    it('removes one digit', () => {
      expect(removeFromMemory('1234')).toEqual('123');
    });

    it('removes one operand', () => {
      expect(removeFromMemory('1 + ')).toEqual('1');
    });

    it('returns at least 0 when fully cleared', () => {
      expect(removeFromMemory('1')).toEqual('0');
    });
  });

  describe(calculate.name, () => {
    describe('operations', () => {
      it('handles noop', () => {
        expect(calculate('12')).toEqual('12');
      });

      it('handles "1 + 1" input', () => {
        expect(calculate('1 + 1')).toEqual('2');
      });

      it('handles "1 - 1" input', () => {
        expect(calculate('2 - 1')).toEqual('1');
      });

      it('handles "2 * 3" input', () => {
        expect(calculate('2 * 3')).toEqual('6');
      });
    });

    describe('edge cases', () => {
      it('handles zero in input', () => {
        expect(calculate('1 + 0')).toEqual('1');
      });

      it('handles larger number in input', () => {
        expect(calculate('123 + 456')).toEqual(new String(123 + 456));
      });

      it('handles multiple operations input', () => {
        expect(calculate('1 + 1 + 1')).toEqual('3');
      });

      it('handles incomplete operation input', () => {
        expect(calculate('1 + ')).toEqual('1');
      });

      it('handles negative values', () => {
        expect(calculate('-1 + 2')).toEqual('1');
      });

      it('raises on invalid operand', () => {
        expect(() => calculate('1 % 2')).toThrowError('Invalid "%" operand');
      });
    });
  });
});
