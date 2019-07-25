export default interface IConditionalOperator {
  readonly alias: string[];

  callback(value: any, contextValue?: any, flags?: string[]): boolean;

  humanlyReadableAs: string;
}
