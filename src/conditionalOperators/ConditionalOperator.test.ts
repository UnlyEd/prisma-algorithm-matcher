import ConditionalOperator from './ConditionalOperator';
import Contains from './Contains';
import EndsWith from './EndsWith';
import Equals from './Equals';
import Every from './Every';
import GreaterThan from './GreaterThan';
import GreaterThanEquals from './GreaterThanEquals';
import Inside from './Inside';
import LessThan from './LessThan';
import LessThanEquals from './LessThanEquals';
import None from './None';
import NotContains from './NotContains';
import NotEquals from './NotEquals';
import NotInside from './NotInside';
import Some from './Some';
import StartsWith from './StartsWith';

describe('ConditionalOperator test', () => {
  test('Conditional Operator default', () => {
    const operator = new ConditionalOperator();
    expect(operator.callback(null)).toBeFalsy();
  });
  describe('Contains Operator', () => {
    const operator = new Contains();
    test('Contains Operator: string Hello World contain string Hello World should be true', () => {
      expect(operator.callback('Hello World', 'Hello',)).toBeTruthy();
    });
    test('Contains Operator: Array [\'Hello\', \'World\'] contain string Hello should be true', () => {
      expect(operator.callback('Hello', ['Hello', 'World'])).toBeTruthy();
    });
    test('Contains Operator: Object {\'Hello\':\'World\'}  contain Hello should be true', () => {
      expect(operator.callback('Hello', { 'Hello': 'World' })).toBeTruthy();
    });
    test('Contains Operator: undefined in undefined', () => {
      expect(() => {
        operator.callback(undefined, undefined);
      }).toThrowError(/CheckError/);
    });
  });
  describe('End With Operator', () => {
    const operator = new EndsWith();
    test('End With operator: \'Hello\' endwith \'llo\' should be true', () => {
      expect(operator.callback('llo', 'hello', [])).toBeTruthy();
    });
    test('End With operator: undefined endwith undefined should throw', () => {
      expect(() => {
        operator.callback(undefined, undefined, []);
      }).toThrowError('CheckError');
    });
  });
  describe('Equal Operator', () => {
    const operator = new Equals();
    test('Equal with operator: null is equal  null', () => {
      expect(operator.callback(null, null, [])).toBeTruthy();
    });
    test('Equal with operator: object is equal object', () => {
      expect(operator.callback({ 'hello': 'world', 'obj': {} }, { 'hello': 'world', 'obj': {} }, [])).toBeTruthy();
    });
    test('Equal with operator: array is equal array', () => {
      expect(operator.callback(['foo', 'bar'], ['foo', 'bar'], [])).toBeTruthy();
    });
    test('Equal with operator: string is equal string', () => {
      expect(operator.callback('Hello', 'Hello', [])).toBeTruthy();
    });
    test('Equal with operator: string is equal number', () => {
      expect(operator.callback('42', 42, [])).toBeFalsy();
    });
  });
  describe('Greater Than Operator', () => {
    const operator = new GreaterThan();
    test('GreaterThan with: 42 and 24 should be true ', () => {
      expect(operator.callback(24, 42)).toBeTruthy();
    });
    test('GreaterThan with: \'42\'and \'24\' should be true ', () => {
      expect(operator.callback('24', '42')).toBeTruthy();
    });
    test('GreaterThan with: \'hello\'and \'hello\' should be true ', () => {
      expect(operator.callback('hello', 'hello')).toBeFalsy();
    });
  });
  describe('GreaterThan Equal Operator', () => {
    const operator = new GreaterThanEquals();
    test('GreaterThanEqual with: 42 and 24 should be true ', () => {
      expect(operator.callback(24, 42)).toBeTruthy();
    });
    test('GreaterThanEqual with: \'42\'and \'24\' should be true ', () => {
      expect(operator.callback('24', '42')).toBeTruthy();
    });
    test('GreaterThanEqual with: \'hello\'and \'hello\' should be true ', () => {
      expect(operator.callback('hello', 'hello')).toBeTruthy();
    });
  });
  describe('Inside Operator', () => {
    const operator = new Inside();
    test('Inside Operator: string Hello in string Hello World should be true', () => {
      expect(operator.callback('Hello', 'Hello World',)).toBeTruthy();
    });
    test('Inside Operator and i flag: string Hello in string Hello World should be true', () => {
      expect(operator.callback('hello', 'Hello World', ['i'])).toBeTruthy();
    });
    test('Inside Operator: string Hello in Array [\'Hello\', \'World\'] input should be true', () => {
      expect(operator.callback(['Hello', 'World'], 'Hello')).toBeTruthy();
    });
    test('Inside Operator: string Hello in Object {\'Hello\':\'World\'} input should be true', () => {
      expect(operator.callback({ 'Hello': 'World' }, 'Hello')).toBeTruthy();
    });
    test('Inside Operator: Object {\'Hello\':\'World\'} in Object { \'foo\': {\'Hello\':\'World\'}  input should be true', () => {
      expect(operator.callback({ 'foo': {'Hello':'World'} }, {'Hello':'World'})).toBeTruthy();
    });
    test('Inside Operator: undefined in undefined', () => {
      expect(() => {
        operator.callback(undefined, undefined);
      }).toThrowError(/CheckError/);
    });
  });
  describe('Less Than Operator', () => {
    const operator = new LessThan();
    test('LessThan with: 24 and 42 should be true ', () => {
      expect(operator.callback(42, 24)).toBeTruthy();
    });
    test('LessThan with: \'24\'and \'42\' should be true ', () => {
      expect(operator.callback('42', '24')).toBeTruthy();
    });
    test('LessThan with: \'hello\'and \'hello\' should be true ', () => {
      expect(operator.callback('hello', 'hello')).toBeFalsy();
    });
  });
  describe('Less Than Equal Operator', () => {
    const operator = new LessThanEquals();
    test('LessThanEqual with: 24 and 42 should be true ', () => {
      expect(operator.callback(42, 24)).toBeTruthy();
    });
    test('LessThanEqual with: \'24\'and \'42\' should be true ', () => {
      expect(operator.callback('42', '24')).toBeTruthy();
    });
    test('LessThanEqual with: \'hello\'and \'hello\' should be true ', () => {
      expect(operator.callback('hello', 'hello')).toBeTruthy();
    });
  });
  describe('Not Contain Operator', () => {
    const operator = new NotContains();
    test('Not Contains Operator: string Hello World contain string Hello World should be false', () => {
      expect(operator.callback('Hello World', 'Hello', [])).toBeFalsy();
    });
    test('Not Contains Operator: Array [\'Hello\', \'World\'] contain string Hello should be false', () => {
      expect(operator.callback('Hello', ['Hello', 'World'], [])).toBeFalsy();
    });
    test('Not Contains Operator: Object {\'Hello\':\'World\'}  contain Hello should be false', () => {
      expect(operator.callback('Hello', { 'Hello': 'World' }, [])).toBeFalsy();
    });
    test('Not Contains Operator: undefined contain undefined', () => {
      expect(() => {
        operator.callback(undefined, undefined, []);
      }).toThrowError(/CheckError/);
    });
  });
  describe('Not Equal Operator', () => {
    const operator = new NotEquals();
    test('Not Equal with operator: null is equal  null', () => {
      expect(operator.callback(null, null, [])).toBeFalsy();
    });
    test('Not Equal with operator: object is equal object', () => {
      expect(operator.callback({ 'hello': 'world', 'obj': {} }, { 'hello': 'world', 'obj': {} }, [])).toBeFalsy();
    });
    test('Not Equal with operator: array is equal array', () => {
      expect(operator.callback(['foo', 'bar'], ['foo', 'bar'], [])).toBeFalsy();
    });
    test('Not Equal with operator: string is equal string', () => {
      expect(operator.callback('Hello', 'Hello', [])).toBeFalsy();
    });
    test('NotEqual with operator and i flag',()=>{
      expect(operator.callback('HELLO WORLD', 'hello world', [])).toBeTruthy();
      expect(operator.callback('HELLO WORLD', 'hello world', ['i'])).toBeFalsy();
    });
    test('Not Equal with operator: string is equal number', () => {
      expect(operator.callback('42', 42, [])).toBeTruthy();
    });
  });
  describe('Not Inside Operator', () => {
    const operator = new NotInside();
    test('NotInside Operator: string Hello in string Hello World should be true', () => {
      expect(operator.callback('Hello', 'Hello World',)).toBeFalsy();
    });
    test('NotInside Operator: string Hello in Array [\'Hello\', \'World\'] input should be true', () => {
      expect(operator.callback(['Hello', 'World'], 'Hello')).toBeFalsy();
    });
    test('NotInside Operator: string Hello in Object {\'Hello\':\'World\'} input should be true', () => {
      expect(operator.callback({ 'Hello': 'World' }, 'Hello')).toBeFalsy();
    });
    test('NotInside Operator: undefined in undefined', () => {
      expect(() => {
        operator.callback(undefined, undefined);
      }).toThrowError(/CheckError/);
    });
  });
  describe('Start With Operator', ()=>{
    const operator = new StartsWith();
    test('StartWith operator: \'Hello\' start with \'Hel\' should be true', () => {
      expect(operator.callback('Hel', 'Hello', [])).toBeTruthy();
    });
    test('StartWith operator: undefined start with undefined should throw', () => {
      expect(() => {
        operator.callback(undefined, undefined, []);
      }).toThrowError('CheckError');
    });
  })
});
