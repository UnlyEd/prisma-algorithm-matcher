interface LogicalOperators {
  (values: boolean[]): boolean;
}

export const and: LogicalOperators = (values: boolean[]) => {
  return values.filter(returnValue => !returnValue).length === 0;
};

export const or: LogicalOperators = (values: boolean[]) => {
  return values.filter(returnValue => returnValue).length > 0;
};

export const not: LogicalOperators = (values: boolean[]) => {
  return values.filter(returnValue => returnValue).length === 0;
};
