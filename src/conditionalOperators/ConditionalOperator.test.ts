import ConditionalOperator from './ConditionalOperator';
import Contains from './Contains';
import EndsWith from './EndsWith';
import Equals from './Equals';
import GreaterThan from './GreaterThan';
import GreaterThanEquals from './GreaterThanEquals';
import IsInside from './IsInside';
import LessThan from './LessThan';
import LessThanEquals from './LessThanEquals';
import NotContains from './NotContains';
import NotEquals from './NotEquals';
import IsNotInside from './IsNotInside';
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
    });
    test('Output should be false', () => {
      expect(() => {
        operator.callback(undefined, undefined, []);
      }).toThrowError('CheckError');
    });
  });

  describe('Equal Operator', () => {
    const operator = new Equals();
    test('Output should be true', () => {
      expect(operator.callback(null, null, [])).toBe(true);
      expect(operator.callback({ 'hello': 'world', 'obj': {} }, { 'hello': 'world', 'obj': {} }, [])).toBe(true);
      expect(operator.callback(['foo', 'bar'], ['foo', 'bar'], [])).toBe(true);
      expect(operator.callback('Hello', 'Hello', [])).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback('42', 42, [])).toBe(false);

    });
  });

  describe('Greater Than Operator', () => {
    const operator = new GreaterThan();
    test('Output should be true', () => {
      expect(operator.callback(24, 42)).toBe(true);
      expect(operator.callback('24', '42')).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback('hello', 'hello')).toBe(false);
    });
  });

  describe('GreaterThan Equal Operator', () => {
    const operator = new GreaterThanEquals();
    test('Output should be true', () => {
      expect(operator.callback(24, 42)).toBe(true);
      expect(operator.callback('24', '42')).toBe(true);
      expect(operator.callback('hello', 'hello')).toBe(true);
    });
  });

  describe('IsInside Operator', () => {
    const operator = new IsInside();
    test('Output should be true', () => {
      expect(operator.callback('Hello', 'Hello World',)).toBe(true);
      expect(operator.callback('hello', 'Hello World', ['i'])).toBe(true);
      expect(operator.callback(['Hello', 'World'], 'Hello')).toBe(true);
      expect(operator.callback({ 'Hello': 'World' }, 'Hello')).toBe(true);
      expect(operator.callback({ 'foo': { 'Hello': 'World' } }, { 'Hello': 'World' })).toBe(true);
    });
    test('Output should be false', () => {
      expect(() => {
        operator.callback(undefined, undefined);
      }).toThrowError(/CheckError/);
    });
  });

  describe('Less Than Operator', () => {
    const operator = new LessThan();
    test('Output should be true', () => {
      expect(operator.callback(42, 24)).toBe(true);
      expect(operator.callback('42', '24')).toBe(true);
    });
    test('Output should be false', () => {
      expect(operator.callback('hello', 'hello')).toBe(false);
    });
  });

  describe('Less Than Equal Operator', () => {
    const operator = new LessThanEquals();
    test('Output should be true', () => {
      expect(operator.callback(42, 24)).toBe(true);
      expect(operator.callback('42', '24')).toBe(true);
      expect(operator.callback('hello', 'hello')).toBe(true);
    });
  });

  describe('Not Contain Operator', () => {
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

  describe('Not Equal Operator', () => {
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

  describe('Not IsInside Operator', () => {
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

  describe('Start With Operator', () => {
    const operator = new StartsWith();
    test('Output should be true', () => {
      expect(operator.callback('Hel', 'Hello', [])).toBe(true);
    });
    test('Output should be false', () => {
      expect(() => {
        operator.callback(undefined, undefined, []);
      }).toThrowError('CheckError');
    });
  });
});
