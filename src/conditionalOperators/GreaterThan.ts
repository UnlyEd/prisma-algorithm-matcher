import ConditionalOperator from "./ConditionalOperator";

class GreaterThan extends ConditionalOperator {
  alias: string[] = ['greaterThan', 'gt'];

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue > value;
  }

  humanlyReadableAs: string = 'greaterThan';
}

export default GreaterThan;
