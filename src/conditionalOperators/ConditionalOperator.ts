import IConditionalOperator from '../interfaces/IConditionalOperator';

class ConditionalOperator implements IConditionalOperator {
  alias: string[] = [];
  humanlyReadableAs: string = '';

  /**
   * this function is a callback use by all operators.
   * @param value
   * @param contextValue
   * @param flags
   */
  callback(value: any, contextValue?: any, flags?: string[]): boolean {
    return false;
  };
}

export default ConditionalOperator;
