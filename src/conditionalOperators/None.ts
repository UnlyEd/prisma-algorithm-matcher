import { not } from "../operators/logicalOperators";
import ConditionalOperator from "./ConditionalOperator";

class None extends ConditionalOperator {
  alias: string[] = ['none'];

  callback(value: any): boolean {
    return not(value);
  }

  humanlyReadableAs: string = 'none';
}

export default None
