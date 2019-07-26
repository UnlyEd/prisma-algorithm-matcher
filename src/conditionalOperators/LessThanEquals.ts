import ConditionalOperator from "./ConditionalOperator";

class LessThanEquals extends ConditionalOperator {
  alias: string[] = ['lessThanEquals', 'lte'];

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue <= value;
  }

  humanlyReadableAs: string = 'lesser or equal to';
}

export default LessThanEquals
