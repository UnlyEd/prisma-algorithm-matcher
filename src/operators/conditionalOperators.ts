import Equals from "../conditionalOperators/Equals";
import GreaterThanEquals from "../conditionalOperators/GreaterThanEquals";
import NotContains from "../conditionalOperators/NotContains";
import LessThan from "../conditionalOperators/LessThan";
import Some from "../conditionalOperators/Some";
import GreaterThan from "../conditionalOperators/GreaterThan";
import Every from "../conditionalOperators/Every";
import Contains from "../conditionalOperators/Contains";
import None from "../conditionalOperators/None";
import StartsWith from "../conditionalOperators/StartsWith";
import EndsWith from "../conditionalOperators/EndsWith";
import NotEquals from "../conditionalOperators/NotEquals";
import LessThanEquals from "../conditionalOperators/LessThanEquals";

function checkStringEqualNoMatchCase(x: any, y: any): boolean | undefined {
  if (isString(x) && isString(y)) {
    return x.toLowerCase() === y.toLowerCase()
  }
}

function containHandleStringString(value: any, contextValue: any, flags: string[]) {
  if (isString(value) && isString(contextValue)) {
    if (flags.includes('i'))
      return contextValue.toLowerCase().includes(value.toLowerCase());
    return contextValue.includes(value);
  }
  return null
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
    return value.hasOwnProperty(contextValue)
  }
  return null
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
  return null
}

class ConditionalOperator implements IConditionalOperator {
  alias: string[] = [];

  callback(value: any, contextValue?: any, flags?: string[]): boolean {
    return false
  };

  humanlyReadableAs: string = '';
}

class Every extends ConditionalOperator {
  alias: string[] = ['every'];

  callback(value: any): boolean {
    return and(value);
  }

  humanlyReadableAs: string = 'every';
}

class Some extends ConditionalOperator {
  alias: string[] = ['some'];

  callback(value: any): boolean {
    return or(value);
  }

  humanlyReadableAs: string = 'some';
}

class None extends ConditionalOperator {
  alias: string[] = ['none'];

  callback(value: any): boolean {
    return not(value);
  }

  humanlyReadableAs: string = 'none';
}

class Equals extends ConditionalOperator {
  alias: string[] = ['equals', 'eq'];

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.includes('i'))
      return isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
    else
      return isEqual(value, contextValue);
  }

  humanlyReadableAs: string = 'equal';
}

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

class EndsWith extends ConditionalOperator {
  alias: string[] = ['endsWith', 'ew'];

  callback(value: any, contextValue: any, flags: string[]): boolean {
    if (isString(value) && isString(contextValue)) {
      if (flags.includes('i'))
        return endsWith(contextValue.toLowerCase(), value.toLowerCase());
      return endsWith(contextValue, value);
    }
    throw new CheckError({
      'status': false,
      'conditionalOperator': "startsWith",
      'value': value,
      'contextValue': contextValue,
      'flags': flags,
      'reason': `Error: operator: startsWith does not handle type ${typeof contextValue} to ${typeof value}`,
    })
  }

  humanlyReadableAs: string = 'ends with';
}

class Contains extends ConditionalOperator {
  alias: string[] = ['contains', 'includes', 'in'];

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
    return ret;
  }

  humanlyReadableAs: string = 'in';
}

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

class GreaterThan extends ConditionalOperator {
  alias: string[] = ['greaterThan', 'gt'];

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue > value;
  }

  humanlyReadableAs: string = 'greaterThan';
}

class GreaterThanEquals extends ConditionalOperator {
  alias: string[] = ['greaterThanEquals', 'gte'];

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue >= value;
  }

  humanlyReadableAs: string = 'greater or equal than';
}

class LessThan extends ConditionalOperator {
  alias: string[] = ['lessThan', 'lt'];

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue < value;
  }

  humanlyReadableAs: string = 'less than';
}

class LessThanEquals extends ConditionalOperator {
  alias: string[] = ['lessThanEquals', 'lte'];

  callback(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue <= value;
  }

  humanlyReadableAs: string = 'lesser or equal to';
}

export default [
  new Every(), new Some(), new None(),
  new StartsWith(), new EndsWith(),
  new Equals(), new NotEquals(),
  new Contains(), new NotContains(),
  new GreaterThan(), new GreaterThanEquals(),
  new LessThan(), new LessThanEquals()
];
