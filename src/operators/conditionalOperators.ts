import Equals from "../conditionalOperators/Equals";
import GreaterThanEquals from "../conditionalOperators/GreaterThanEquals";
import NotContains from "../conditionalOperators/NotContains";
import LessThan from "../conditionalOperators/LessThan";
import Some from "../conditionalOperators/Some";
import GreaterThan from "../conditionalOperators/GreaterThan";
import Every from "../conditionalOperators/Every";
import Contains from "../conditionalOperators/Contains";
import None from "../conditionalOperators/None";
import StartsWith from "../conditionalOperators/StartsWith";
import EndsWith from "../conditionalOperators/EndsWith";
import NotEquals from "../conditionalOperators/NotEquals";
import LessThanEquals from "../conditionalOperators/LessThanEquals";

export default [
  new Every(), new Some(), new None(),
  new StartsWith(), new EndsWith(),
  new Equals(), new NotEquals(),
  new Contains(), new NotContains(),
  new GreaterThan(), new GreaterThanEquals(),
  new LessThan(), new LessThanEquals()
]
