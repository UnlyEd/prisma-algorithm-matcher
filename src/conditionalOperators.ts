import { and, not, or } from './logicalOperators';

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

  call(value: any): boolean {
    return false;
  }

  humanlyReadableAs: string = 'starts with';
}

class EndsWith extends ConditionalOperators {
  alias: string[] = ['endsWith', 'ew'];

  call(value: any): boolean {
    return false;
  }

  humanlyReadableAs: string = 'ends with';
}

class Equals extends ConditionalOperators {
  alias: string[] = ['equals', 'eq'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'equal';
}

class NotEquals extends ConditionalOperators {
  alias: string[] = ['ne', 'notEquals'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'not';
}

class Contains extends ConditionalOperators {
  alias: string[] = ['contains', 'includes', 'in'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'in';
}

class NotContains extends ConditionalOperators {
  alias: string[] = ['notContains', 'not_includes', 'nin'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'not in';
}

class GreaterThan extends ConditionalOperators {
  alias: string[] = ['greaterThan', 'gt'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'greaterThan';
}

class GreaterThanEquals extends ConditionalOperators {
  alias: string[] = ['greaterThanEquals', 'gte'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'greater or equal than';
}

class LessThan extends ConditionalOperators {
  alias: string[] = ['lessThan', 'lt'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
  }

  humanlyReadableAs: string = 'less than';
}

class LessThanEquals extends ConditionalOperators {
  alias: string[] = ['lessThanEquals', 'lte'];

  call(value: any, contextValue: any, flags: string[]): boolean {
    return false;
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
