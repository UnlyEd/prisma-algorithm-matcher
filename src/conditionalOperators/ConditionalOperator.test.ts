import ConditionalOperator from './ConditionalOperator';
import Contains from './Contains';
import EndsWith from './EndsWith';
import Equals from './Equals';
import Every from './Every';
import GreaterThan from './GreaterThan';
import GreaterThanEquals from './GreaterThanEquals';
import IsInside from './IsInside';
import IsNotInside from './IsNotInside';
import LessThan from './LessThan';
import LessThanEquals from './LessThanEquals';
import None from './None';
import NotContains from './NotContains';
import NotEquals from './NotEquals';
import Some from './Some';
import StartsWith from './StartsWith';

describe('ConditionalOperator test src/conditionalOperators/*', () => {
  test('Conditional operator default function', () => {
    const operator = new ConditionalOperator();
    expect(operator.callback(null)).toBe(false);
  });

  describe('Contains operator', () => {
    const operator = new Contains();
    test('Output should be true', () => {
      expect(operator.callback('Hello World', 'Hello',)).toBe(true);
      expect(operator.callback('Hello', ['Hello', 'World'])).toBe(true);
      expect(operator.callback('HELLO', ['Hello', 'World'], ['i'])).toBe(true);
      expect(operator.callback('Hello', { 'Hello': 'World' })).toBe(true);
    });
    test('Output should be false', () => {
      expect(() => {
        operator.callback(undefined, undefined);
      }).toThrowError(/CheckError/);
    });
  });

  describe('EndsWith operator', () => {
    const operator = new EndsWith();
    test('Output should be true', () => {
      expect(operator.callback('llo', 'hello', [])).toBe(true);
      expect(operator.callback('LLO', 'hello', ['i'])).toBe(true);
    });
    test('Output should be false', () => {
      expect(() => {
        operator.callback(undefined, undefined, []);
      }).toThrowError('CheckError');
    });
  });

  describe('Equals operator', () => {
    const operator = new Equals();
    test('Output should be true', () => {
      expect(operator.callback(null, null, [])).toBe(true);
      expect(operator.callback({ 'hello': 'world', 'obj': {} }, { 'hello': 'world', 'obj': {} }, [])).toBe(true);
      expect(operator.callback(['foo', 'bar'], ['foo', 'bar'], [])).toBe(true);
      expect(operator.callback('Hello', 'Hello', [])).toBe(true);
      expect(operator.callback('HELLO', 'Hello', ['i'])).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback('42', 42, [])).toBe(false);

    });
  });

  describe('GreaterThan operator', () => {
    const operator = new GreaterThan();
    test('Output should be true', () => {
      expect(operator.callback(24, 42)).toBe(true);
      expect(operator.callback('24', '42')).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback('hello', 'hello')).toBe(false);
    });
  });

  describe('GreaterThanEquals operator', () => {
    const operator = new GreaterThanEquals();
    test('Output should be true', () => {
      expect(operator.callback(24, 42)).toBe(true);
      expect(operator.callback('24', '42')).toBe(true);
      expect(operator.callback('hello', 'hello')).toBe(true);
    });
  });

  describe('IsInside operator', () => {
    const operator = new IsInside();
    test('Output should be true', () => {
      expect(operator.callback('Hello', 'Hello World',)).toBe(true);
      expect(operator.callback('hello', 'Hello World', ['i'])).toBe(true);
      expect(operator.callback(['Hello', 'World'], 'Hello')).toBe(true);
      expect(operator.callback({ 'Hello': 'World' }, 'Hello')).toBe(true);
      expect(operator.callback({ 'foo': { 'Hello': 'World' } }, { 'Hello': 'World' })).toBe(true);
      expect(operator.callback({ 'foo': { 'bar': { 'Hello': 'World' } } }, { 'Hello': 'World' })).toBe(true);
    });
    test('Output should be false', () => {
      expect(() => {
        operator.callback(undefined, undefined);
      }).toThrowError(/CheckError/);
      expect(operator.callback({ 'foo': { 'foo': 'foo' } }, { 'Hello': 'World' })).toBe(false);
    });
  });

  describe('LessThan operator', () => {
    const operator = new LessThan();
    test('Output should be true', () => {
      expect(operator.callback(42, 24)).toBe(true);
      expect(operator.callback('42', '24')).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback('hello', 'hello')).toBe(false);
    });
  });

  describe('LessThanEqual operator', () => {
    const operator = new LessThanEquals();
    test('Output should be true', () => {
      expect(operator.callback(42, 24)).toBe(true);
      expect(operator.callback('42', '24')).toBe(true);
      expect(operator.callback('hello', 'hello')).toBe(true);
    });
  });

  describe('NotContains operator', () => {
    const operator = new NotContains();
    test('Output should be true', () => {
      expect(operator.callback('Hello World', 'Foo', [])).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback('Hello World', 'Hello', [])).toBe(false);
      expect(operator.callback('Hello', ['Hello', 'World'], [])).toBe(false);
      expect(operator.callback('Hello', { 'Hello': 'World' }, [])).toBe(false);
      expect(() => {
        operator.callback(undefined, undefined, []);
      }).toThrowError(/CheckError/);
    });
  });

  describe('NotEquals operator', () => {
    const operator = new NotEquals();
    test('Output should be true', () => {
      expect(operator.callback('HELLO WORLD', 'hello world', [])).toBe(true);
      expect(operator.callback('42', 42, [])).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback(null, null, [])).toBe(false);
      expect(operator.callback({ 'hello': 'world', 'obj': {} }, { 'hello': 'world', 'obj': {} }, [])).toBe(false);
      expect(operator.callback(['foo', 'bar'], ['foo', 'bar'], [])).toBe(false);
      expect(operator.callback('Hello', 'Hello', [])).toBe(false);
      expect(operator.callback('HELLO WORLD', 'hello world', ['i'])).toBe(false);
    });
  });

  describe('NotIsInside operator', () => {
    const operator = new IsNotInside();
    test('Output should be true', () => {
      expect(operator.callback('foo', 'Hello World',)).toBe(true);
    });
    test('Output should be false', () => {
      expect(() => {
        operator.callback(undefined, undefined);
      }).toThrowError(/CheckError/);
      expect(operator.callback('Hello', 'Hello World',)).toBe(false);
      expect(operator.callback(['Hello', 'World'], 'Hello')).toBe(false);
      expect(operator.callback({ 'Hello': 'World' }, 'Hello')).toBe(false);
    });
  });

  describe('StartWith operator', () => {
    const operator = new StartsWith();
    test('Output should be true', () => {
      expect(operator.callback('Hel', 'Hello', [])).toBe(true);
      expect(operator.callback('HEL', 'Hello', ['i'])).toBe(true);
    });
    test('Output should be false', () => {
      expect(() => {
        operator.callback(undefined, undefined, []);
      }).toThrowError('CheckError');
    });
  });

  describe('Every operator', () => {
    const operator = new Every();
    test('Output should be true', () => {
      expect(operator.callback([true, true])).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback([true, false])).toBe(false);
    });
  });

  describe('Some operator', () => {
    const operator = new Some();
    test('Output should be true', () => {
      expect(operator.callback([true, true])).toBe(true);
      expect(operator.callback([true, false])).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback([false, false])).toBe(false);
    });
  });

  describe('None operator', () => {
    const operator = new None();
    test('Output should be true', () => {
      expect(operator.callback([false, false])).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback([true, false])).toBe(false);
      expect(operator.callback([true, true])).toBe(false);
    });
  });
});
