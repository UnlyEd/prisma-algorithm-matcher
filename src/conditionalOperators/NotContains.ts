import { CheckError } from "../utils/errors";
import ConditionalOperator from "./ConditionalOperator";
import { containHandleArray, containHandleObjectInObject, containHandleStringInObject, containHandleStringString } from "./utils";

class NotContains extends ConditionalOperator {
  alias: string[] = ['notContains', 'notIncludes', 'nin'];

  callback(value: any, contextValue: any, flags: string[]): boolean {
    let ret;
    ret = containHandleStringString(value, contextValue, flags);
    if (ret === null)
      ret = containHandleArray(value, contextValue, flags);
    if (ret === null)
      ret = containHandleStringInObject(value, contextValue, flags);
    if (ret === null)
      ret = containHandleObjectInObject(value, contextValue, flags);
    if (ret === null)
      throw new CheckError({
        'status': false,
        'conditionalOperator': "startsWith",
        'value': value,
        'contextValue': contextValue,
        'flags': flags,
        'reason': `Error: operator: startsWith does not handle type ${typeof contextValue} to ${typeof value}`,
      });
    return !ret;
  }

  humanlyReadableAs: string = 'not in';
}

export default NotContains
