import ConditionalOperator from "./ConditionalOperator";

class GreaterThanEquals extends ConditionalOperator {
  alias: string[] = ['greaterThanEquals', 'gte'];

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue >= value;
  }

  humanlyReadableAs: string = 'greater or equal than';
}

export default GreaterThanEquals
