import { CheckError } from '../utils/errors';
import ConditionalOperator from './ConditionalOperator';
import { handleStringInArray, handleObjectInObject, handleStringInObject, handleStringInString } from './utils';

class IsNotInside extends ConditionalOperator {
  alias: string[] = ['isNotInside', 'isnin'];
  humanlyReadableAs: string = 'not inside';

  callback(value: any, contextValue: any, flags: string[] = []): boolean {
    let ret = handleStringInString(value, contextValue, flags);

    if (ret === null) {
      ret = handleStringInArray(value, contextValue, flags);
    }
    if (ret === null) {
      ret = handleStringInObject(value, contextValue, flags);
    }
    if (ret === null) {
      ret = handleObjectInObject(value, contextValue, flags);
    }
    if (ret === null) {
      throw new CheckError({
        'status': false,
        'conditionalOperator': 'includes',
        'value': value,
        'contextValue': contextValue,
        'flags': flags,
        'reason': `Error: The operator includes does not handle the types "${typeof contextValue}" and "${typeof value}"`,
      });
    }
    return !ret;
  }
}

export default IsNotInside;
