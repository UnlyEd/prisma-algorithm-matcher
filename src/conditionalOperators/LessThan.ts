import ConditionalOperator from "./ConditionalOperator";

class LessThan extends ConditionalOperator {
  alias: string[] = ['lessThan', 'lt'];

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue < value;
  }

  humanlyReadableAs: string = 'less than';
}

export default LessThan
