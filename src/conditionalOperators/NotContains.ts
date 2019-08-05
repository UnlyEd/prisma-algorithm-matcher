import { CheckError } from "../utils/errors";
import ConditionalOperator from "./ConditionalOperator";
import { handleArrayInCOPContain, handleObjectInObjectInCOPContain, handleStringInObjectInCOPContain, handleStringInStringInCOPContain } from "./utils";

class NotContains extends ConditionalOperator {
  alias: string[] = ['notContains', 'notIncludes', 'nin'];

  callback(value: any, contextValue: any, flags: string[]): boolean {
    let ret;
    ret = handleStringInStringInCOPContain(value, contextValue, flags);
    if (ret === null) {
      ret = handleArrayInCOPContain(value, contextValue, flags);
    }
    if (ret === null) {
      ret = handleStringInObjectInCOPContain(value, contextValue, flags);
    }
    if (ret === null) {
      ret = handleObjectInObjectInCOPContain(value, contextValue, flags);
    }
    if (ret === null) {
      throw new CheckError({
        'status': false,
        'conditionalOperator': "startsWith",
        'value': value,
        'contextValue': contextValue,
        'flags': flags,
        'reason': `Error: operator: startsWith does not handle type ${typeof contextValue} to ${typeof value}`,
      });
    }
    return !ret;
  }

  humanlyReadableAs: string = 'not in';
}

export default NotContains
