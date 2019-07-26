import { or } from "../operators/logicalOperators";
import ConditionalOperator from "./ConditionalOperator";

class Some extends ConditionalOperator {
  alias: string[] = ['some'];

  callback(value: any): boolean {
    return or(value);
  }

  humanlyReadableAs: string = 'some';
}

export default Some
