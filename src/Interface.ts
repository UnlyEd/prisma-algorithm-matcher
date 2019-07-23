/**
 * Interface is used to collect return values then to be sent to a logical operator
 */
export interface IReturnValuesType {
  [key: string]: boolean[]
}

/**
 * Basic interface to use dynamic objects, like : user["name"] = "Toto"
 */
export interface IFilter {
  [key: string]: any
}

/**
 * Interface which contain a pair of a string and function to callback
 */
export interface ILogicalOperators {
  [key: string]: ILogicalOperator
}

export interface ILogicalOperator {
  (values: boolean[]): boolean;
}

export interface IConditionalOperator {
  readonly alias: string[];

  call(value: any, contextValue?: any, flags?: string[]): boolean;

  humanlyReadableAs: string;
}

