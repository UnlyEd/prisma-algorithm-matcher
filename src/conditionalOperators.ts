import { and, not, or } from './logicalOperators';
import { isEqual, isEqualWith, startsWith, endsWith, isArray, isObject, isString } from 'lodash'
import { IConditionalOperator } from "./Interface";

function checkStringEqualNoMatchCase(str1: any, str2: any): boolean | undefined {
  if (typeof str1 === "string" && typeof str2 === "string") {
    return str1.toLowerCase() === str2.toLowerCase()
  }
}

class ConditionalOperator implements IConditionalOperator {
  alias: string[] = [];

  call(value: any, contextValue?: any, flags?: string[]): boolean {
    return false
  };

  humanlyReadableAs: string = '';
}

class Every extends ConditionalOperator {
  alias: string[] = ['every'];

  call(value: any): boolean {
    return and(value);
  }

  humanlyReadableAs: string = 'every';
}

class Some extends ConditionalOperator {
  alias: string[] = ['some'];

  call(value: any): boolean {
    return or(value);
  }

  humanlyReadableAs: string = 'some';
}

class None extends ConditionalOperator {
  alias: string[] = ['none'];

  call(value: any): boolean {
    return not(value);
  }

  humanlyReadableAs: string = 'none';
}

class StartsWith extends ConditionalOperator {
  alias: string[] = ['startsWith', 'sw'];

  call(value: string, contextValue: string, flags: string[]): boolean {
    if (flags.includes('i'))
      return startsWith(contextValue.toLowerCase(), value.toLowerCase());
    return startsWith(contextValue, value);
  }

  humanlyReadableAs: string = 'starts with';
}

class EndsWith extends ConditionalOperator {
  alias: string[] = ['endsWith', 'ew'];

  call(value: string, contextValue: string, flags: string[]): boolean {
    if (flags.includes('i'))
      return endsWith(contextValue.toLowerCase(), value.toLowerCase());
    return endsWith(contextValue, value);
  }

  humanlyReadableAs: string = 'ends with';
}

class Equals extends ConditionalOperator {
  alias: string[] = ['equals', 'eq'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.includes('i'))
      return isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
    else
      return isEqual(value, contextValue);
  }

  humanlyReadableAs: string = 'equal';
}

class NotEquals extends ConditionalOperator {
  alias: string[] = ['ne', 'notEquals'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.includes('i'))
      return !isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
    else
      return !isEqual(value, contextValue);
  }

  humanlyReadableAs: string = 'not';
}

//TODO
class Contains extends ConditionalOperator {
  alias: string[] = ['contains', 'includes', 'in'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    if (isString(value) && isString(contextValue)) {
      if (flags.includes('i'))
        return contextValue.toLowerCase().includes(value.toLowerCase());
      return contextValue.includes(value);
    }
    if (isArray(value)) {
      if (flags.includes('i'))
        return isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
      return value.includes(contextValue);
    }
    if (isObject(value) && isString(contextValue)) {
      value.hasOwnProperty(contextValue)
    }
    return false;
  }

  humanlyReadableAs: string = 'in';
}

//TODO
class NotContains extends ConditionalOperator {
  alias: string[] = ['notContains', 'not_includes', 'nin'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    if (isString(value) && isString(contextValue)) {
      if (flags.includes('i'))
        return !contextValue.toLowerCase().includes(value.toLowerCase());
      return !contextValue.includes(value);
    }
    if (isArray(value)) {
      if (flags.includes('i'))
        return !isEqualWith(value, contextValue, checkStringEqualNoMatchCase);
      return !value.includes(contextValue);
    }
    if (isObject(value) && isString(contextValue)) {
      return !value.hasOwnProperty(contextValue)
    }
    return false;
  }

  humanlyReadableAs: string = 'not in';
}

class GreaterThan extends ConditionalOperator {
  alias: string[] = ['greaterThan', 'gt'];

  call(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue > value;
  }

  humanlyReadableAs: string = 'greaterThan';
}

class GreaterThanEquals extends ConditionalOperator {
  alias: string[] = ['greaterThanEquals', 'gte'];

  call(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue >= value;
  }

  humanlyReadableAs: string = 'greater or equal than';
}

class LessThan extends ConditionalOperator {
  alias: string[] = ['lessThan', 'lt'];

  call(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue < value;
  }

  humanlyReadableAs: string = 'less than';
}

class LessThanEquals extends ConditionalOperator {
  alias: string[] = ['lessThanEquals', 'lte'];

  call(value: string | number, contextValue: string | number, flags: string[]): boolean {
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
]
