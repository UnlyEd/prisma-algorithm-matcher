import EndsWith from './EndsWith';

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
