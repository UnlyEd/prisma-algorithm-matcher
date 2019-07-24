export default interface IConditionalOperator {
  readonly alias: string[];

  call(value: any, contextValue?: any, flags?: string[]): boolean;

  humanlyReadableAs: string;
}
