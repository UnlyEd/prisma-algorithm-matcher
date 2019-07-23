import { ILogicalOperator, ILogicalOperators } from "./Interface";

export const and: ILogicalOperator = (values: boolean[]) => {
  return values.filter(returnValue => !returnValue).length === 0;
};

export const or: ILogicalOperator = (values: boolean[]) => {
  return values.filter(returnValue => returnValue).length > 0;
};

export const not: ILogicalOperator = (values: boolean[]) => {
  return values.filter(returnValue => returnValue).length === 0;
};

/**
 * Global object containing all logical operators handled
 */
export const logicalOperators: ILogicalOperators = {
  'AND': and,
  'OR': or,
  'NOT': not,
};
