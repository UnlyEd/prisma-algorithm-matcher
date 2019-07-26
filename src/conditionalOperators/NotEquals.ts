import ConditionalOperator from "./ConditionalOperator";
import { checkStringEqualNoMatchCase } from "./utils";
import {isEqualWith, isEqual} from 'lodash'

class NotEquals extends ConditionalOperator {
  alias: string[] = ['ne', 'notEquals'];

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.includes('i'))
      return !isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
    else
      return !isEqual(value, contextValue);
  }

  humanlyReadableAs: string = 'not';
}

export default NotEquals
