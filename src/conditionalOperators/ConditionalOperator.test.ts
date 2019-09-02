import ConditionalOperator from './ConditionalOperator';

describe('ConditionalOperator', () => {
  test('Conditional operator default function should not implement "callback" function', () => {
    const operator = new ConditionalOperator();
    expect(operator.callback(null)).toBe(false);
  });
});
