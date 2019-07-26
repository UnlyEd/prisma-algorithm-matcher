import ConditionalOperator from "./ConditionalOperator";
import { isString, startsWith } from "lodash";

class StartsWith extends ConditionalOperator {
  alias: string[] = ['startsWith', 'sw'];

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (isString(value) && isString(contextValue)) {
      if (flags.includes('i'))
        return startsWith(contextValue.toLowerCase(), value.toLowerCase());
      return startsWith(contextValue, value);
    }
    throw new Error(JSON.stringify({
      'status': false,
      'conditionalOperator': "startsWith",
      'value': value,
      'contextValue': contextValue,
      'flags': flags,
      'reason': `Error: operator: startsWith does not handle type ${typeof contextValue} to ${typeof value}`,
    }));
  }

  humanlyReadableAs: string = 'starts with';
}

export default StartsWith;
