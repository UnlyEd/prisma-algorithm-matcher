import ConditionalOperator from './ConditionalOperator';
import { isEqual, isEqualWith } from 'lodash';
import { checkStringEqualNoMatchCase } from './utils';

class Equals extends ConditionalOperator {
  alias: string[] = ['equals', 'eq'];

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.includes('i')) {
      return isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
    } else {
      return isEqual(value, contextValue);
    }
  }

  humanlyReadableAs: string = 'equal';
}

export default Equals;
