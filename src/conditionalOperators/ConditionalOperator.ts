import IConditionalOperator from "../interfaces/IConditionalOperator";

class ConditionalOperator implements IConditionalOperator {
  alias: string[] = [];

  callback(value: any, contextValue?: any, flags?: string[]): boolean {
    return false
  };

  humanlyReadableAs: string = '';
}

export default ConditionalOperator
