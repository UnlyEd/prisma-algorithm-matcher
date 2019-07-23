import { and, not, or } from './logicalOperators';
import { isEqual, isEqualWith, startsWith, endsWith } from 'lodash'

interface IConditionalOperators {
  alias: string[];

  call(value: any, contextValue?: any, flags?: string[]): boolean;

  humanlyReadableAs: string;
}

class ConditionalOperators implements IConditionalOperators {
  alias: string[] = [];

  call(value: any, contextValue?: any, flags?: string[]): boolean {
    return false
  };

  humanlyReadableAs: string = '';
}

class Every extends ConditionalOperators {
  alias: string[] = ['every'];

  call(value: any): boolean {
    return and(value);
  }

  humanlyReadableAs: string = 'every';
}

class Some extends ConditionalOperators {
  alias: string[] = ['some'];

  call(value: any): boolean {
    return or(value);
  }

  humanlyReadableAs: string = 'some';
}

class None extends ConditionalOperators {
  alias: string[] = ['none'];

  call(value: any): boolean {
    return not(value);
  }

  humanlyReadableAs: string = 'none';
}

class StartsWith extends ConditionalOperators {
  alias: string[] = ['startsWith', 'sw'];

  call(value: string, contextValue: string, flags: string[]): boolean {
    if (flags.indexOf('i') >= 0)
      return startsWith(contextValue.toLowerCase(), value.toLowerCase());
    return startsWith(contextValue, value);
  }

  humanlyReadableAs: string = 'starts with';
}

class EndsWith extends ConditionalOperators {
  alias: string[] = ['endsWith', 'ew'];

  call(value: string, contextValue: string, flags: string[]): boolean {
    if (flags.indexOf('i') >= 0)
      return endsWith(contextValue.toLowerCase(), value.toLowerCase());
    return endsWith(contextValue, value);
  }

  humanlyReadableAs: string = 'ends with';
}

class Equals extends ConditionalOperators {
  alias: string[] = ['equals', 'eq'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.indexOf('i') >= 0)
      return isEqualWith(value, contextValue, (object1: any, object2: any) => {
        if (typeof object1 === "string" && typeof object2 === "string") {
          return object1.toLowerCase() === object2.toLowerCase()
        }
      });
    else
      return isEqual(value, contextValue);
  }

  humanlyReadableAs: string = 'equal';
}

class NotEquals extends ConditionalOperators {
  alias: string[] = ['ne', 'notEquals'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    if (flags.indexOf('i') >= 0)
      return !isEqualWith(value, contextValue, (object1: any, object2: any) => {
        if (typeof object1 === "string" && typeof object2 === "string") {
          return object1.toLowerCase() === object2.toLowerCase()
        }
      });
    else
      return !isEqual(value, contextValue);
  }

  humanlyReadableAs: string = 'not';
}

//TODO
class Contains extends ConditionalOperators {
  alias: string[] = ['contains', 'includes', 'in'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'in';
}

//TODO
class NotContains extends ConditionalOperators {
  alias: string[] = ['notContains', 'not_includes', 'nin'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'not in';
}

class GreaterThan extends ConditionalOperators {
  alias: string[] = ['greaterThan', 'gt'];

  call(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue > value;
  }

  humanlyReadableAs: string = 'greaterThan';
}

class GreaterThanEquals extends ConditionalOperators {
  alias: string[] = ['greaterThanEquals', 'gte'];

  call(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue >= value;
  }

  humanlyReadableAs: string = 'greater or equal than';
}

class LessThan extends ConditionalOperators {
  alias: string[] = ['lessThan', 'lt'];

  call(value: string | number, contextValue: string | number, flags: string[]): boolean {
    return contextValue < value;
  }

  humanlyReadableAs: string = 'less than';
}

class LessThanEquals extends ConditionalOperators {
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
