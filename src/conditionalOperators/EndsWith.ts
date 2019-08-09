import { endsWith, isString } from 'lodash';
import { CheckError } from '../utils/errors';
import ConditionalOperator from './ConditionalOperator';

class EndsWith extends ConditionalOperator {
  alias: string[] = ['endsWith', 'ew'];
  humanlyReadableAs: string = 'ends with';

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (isString(value) && isString(contextValue)) {
      if (flags.includes('i')) {
        return endsWith(contextValue.toLowerCase(), value.toLowerCase());
      }
      return endsWith(contextValue, value);
    }
    throw new CheckError({
      'status': false,
      'conditionalOperator': 'startsWith',
      'value': value,
      'contextValue': contextValue,
      'flags': flags,
      'reason': `Error: operator: startsWith does not handle type ${typeof contextValue} to ${typeof value}`,
    });
  }
}

export default EndsWith;
