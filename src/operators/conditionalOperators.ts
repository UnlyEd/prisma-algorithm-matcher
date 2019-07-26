import { endsWith, get, isArray, isEqual, isEqualWith, isObject, isString, keys, startsWith } from 'lodash';

import IConditionalOperator from '../interfaces/IConditionalOperator';
import { CheckError } from '../utils/errors';
import { and, not, or } from './logicalOperators';

function checkStringEqualNoMatchCase(x: any, y: any): boolean | undefined {
  if (isString(x) && isString(y)) {
    return x.toLowerCase() === y.toLowerCase();
  }
}

function containHandleStringString(value: any, contextValue: any, flags: string[]) {
  if (isString(value) && isString(contextValue)) {
    if (flags.includes('i'))
      return contextValue.toLowerCase().includes(value.toLowerCase());
    return contextValue.includes(value);
  }
  return null;
}

function containHandleArray(value: any, contextValue: any, flags: string[]) {
  if (isArray(value)) {
    if (flags.includes('i')) {
      value = value.map((el) => {
        return isString(el) ? el.toLowerCase() : el;
      });
      contextValue = isString(contextValue) ? contextValue.toLowerCase() : contextValue;
    }
    return value.includes(contextValue);
  }
  return null;
}

function containHandleStringInObject(value: any, contextValue: any, flags: string[]) {
  if (isObject(value) && isString(contextValue)) {
    return value.hasOwnProperty(contextValue);
  }
  return null;
}

function containHandleObjectInObject(value: any, contextValue: any, flags: string[]) {
  if (isObject(value) && isObject(contextValue)) {
    let ret: boolean = true;
    keys(value).forEach((el) => {
      if (keys(contextValue).includes(el) && !isEqual(get(contextValue, el, undefined), get(value, el, null))) {
        ret = false;
      }
    });
    return ret;
  }
  return null;
}

class ConditionalOperator implements IConditionalOperator {
  alias: string[] = [];
  humanlyReadableAs: string = '';

  callback(value: any, contextValue?: any, flags?: string[]): boolean {
    return false;
  };
}

class Every extends ConditionalOperator {
  alias: string[] = ['every'];
  humanlyReadableAs: string = 'every';

  callback(value: any): boolean {
    return and(value);
  }
}

class Some extends ConditionalOperator {
  alias: string[] = ['some'];
  humanlyReadableAs: string = 'some';

  callback(value: any): boolean {
    return or(value);
  }
}

class None extends ConditionalOperator {
  alias: string[] = ['none'];
  humanlyReadableAs: string = 'none';

  callback(value: any): boolean {
    return not(value);
  }
}

class Equals extends ConditionalOperator {
  alias: string[] = ['equals', 'eq'];
  humanlyReadableAs: string = 'equal';

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.includes('i'))
      return isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
    else
      return isEqual(value, contextValue);
  }
}

class NotEquals extends ConditionalOperator {
  alias: string[] = ['ne', 'notEquals'];
  humanlyReadableAs: string = 'not';

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.includes('i'))
      return !isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
    else
      return !isEqual(value, contextValue);
  }
}

class StartsWith extends ConditionalOperator {
  alias: string[] = ['startsWith', 'sw'];
  humanlyReadableAs: string = 'starts with';

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (isString(value) && isString(contextValue)) {
      if (flags.includes('i'))
        return startsWith(contextValue.toLowerCase(), value.toLowerCase());
      return startsWith(contextValue, value);
    }
    throw new Error(JSON.stringify({
      'status': false,
      'conditionalOperator': 'startsWith',
      'value': value,
      'contextValue': contextValue,
      'flags': flags,
      'reason': `Error: operator: startsWith does not handle type ${typeof contextValue} to ${typeof value}`,
    }));
  }
}

class EndsWith extends ConditionalOperator {
  alias: string[] = ['endsWith', 'ew'];
  humanlyReadableAs: string = 'ends with';

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (isString(value) && isString(contextValue)) {
      if (flags.includes('i'))
        return endsWith(contextValue.toLowerCase(), value.toLowerCase());
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

class Contains extends ConditionalOperator {
  alias: string[] = ['contains', 'includes', 'in'];
  humanlyReadableAs: string = 'in';

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
        'conditionalOperator': 'startsWith',
        'value': value,
        'contextValue': contextValue,
        'flags': flags,
        'reason': `Error: operator: startsWith does not handle type ${typeof contextValue} to ${typeof value}`,
      });
    return ret;
  }
}

class NotContains extends ConditionalOperator {
  alias: string[] = ['notContains', 'notIncludes', 'nin'];
  humanlyReadableAs: string = 'not in';

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
        'conditionalOperator': 'startsWith',
        'value': value,
        'contextValue': contextValue,
        'flags': flags,
        'reason': `Error: operator: startsWith does not handle type ${typeof contextValue} to ${typeof value}`,
      });
    return !ret;
  }
}

class GreaterThan extends ConditionalOperator {
  alias: string[] = ['greaterThan', 'gt'];
  humanlyReadableAs: string = 'greaterThan';

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue > value;
  }
}

class GreaterThanEquals extends ConditionalOperator {
  alias: string[] = ['greaterThanEquals', 'gte'];
  humanlyReadableAs: string = 'greater or equal than';

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue >= value;
  }
}

class LessThan extends ConditionalOperator {
  alias: string[] = ['lessThan', 'lt'];
  humanlyReadableAs: string = 'less than';

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue < value;
  }
}

class LessThanEquals extends ConditionalOperator {
  alias: string[] = ['lessThanEquals', 'lte'];
  humanlyReadableAs: string = 'lesser or equal to';

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue <= value;
  }
}

export default [
  new Every(), new Some(), new None(),
  new StartsWith(), new EndsWith(),
  new Equals(), new NotEquals(),
  new Contains(), new NotContains(),
  new GreaterThan(), new GreaterThanEquals(),
  new LessThan(), new LessThanEquals()
];
