import { and } from "../operators/logicalOperators";
import ConditionalOperator from "./ConditionalOperator";

class Every extends ConditionalOperator {
  alias: string[] = ['every'];

  callback(value: any): boolean {
    return and(value);
  }

  humanlyReadableAs: string = 'every';
}

export default Every;
