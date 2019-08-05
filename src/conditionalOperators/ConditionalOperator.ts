import IConditionalOperator from "../interfaces/IConditionalOperator";

class ConditionalOperator implements IConditionalOperator {
  alias: string[] = [];

  /**
   * this function is a callback use by all operators.
   * @param value
   * @param contextValue
   * @param flags
   */
  callback(value: any, contextValue?: any, flags?: string[]): boolean {
    return false
  };

  humanlyReadableAs: string = '';
}

export default ConditionalOperator
