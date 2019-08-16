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
    test('Equal with operator: null is null', () => {
      expect(operator.callback(null, null, [])).toBeTruthy();
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
    test('Inside Operator: string Hello in Array [\'Hello\', \'World\'] input should be true', () => {
      expect(operator.callback(['Hello', 'World'], 'Hello')).toBeTruthy();
    });
    test('Inside Operator: string Hello in Object {\'Hello\':\'World\'} input should be true', () => {
      expect(operator.callback({ 'Hello': 'World' }, 'Hello')).toBeTruthy();
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
  describe('Not Contain Operator', ()=>{
    const operator = new NotContains();
    test('Not Contains Operator: string Hello World contain string Hello World should be false', () => {
      expect(operator.callback('Hello World', 'Hello', [])).toBeFalsy();
    });
    test('Not Contains Operator: Array [\'Hello\', \'World\'] contain string Hello should be false', () => {
      expect(operator.callback('Hello', ['Hello', 'World'],[])).toBeFalsy();
    });
    test('Not Contains Operator: Object {\'Hello\':\'World\'}  contain Hello should be false', () => {
      expect(operator.callback('Hello', { 'Hello': 'World' }, [])).toBeFalsy();
    });
  });
});
