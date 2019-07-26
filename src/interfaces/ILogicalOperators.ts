/**
 * Interface which contain a pair of a string and function to callback
 */
import ILogicalOperator from './ILogicalOperator';

export default interface ILogicalOperators {
  [key: string]: ILogicalOperator
}
