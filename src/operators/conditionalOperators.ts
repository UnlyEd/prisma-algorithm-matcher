import Contains from '../conditionalOperators/Contains';
import EndsWith from '../conditionalOperators/EndsWith';
import Equals from '../conditionalOperators/Equals';
import Every from '../conditionalOperators/Every';
import GreaterThan from '../conditionalOperators/GreaterThan';
import GreaterThanEquals from '../conditionalOperators/GreaterThanEquals';
import LessThan from '../conditionalOperators/LessThan';
import LessThanEquals from '../conditionalOperators/LessThanEquals';
import None from '../conditionalOperators/None';
import NotContains from '../conditionalOperators/NotContains';
import NotEquals from '../conditionalOperators/NotEquals';
import Some from '../conditionalOperators/Some';
import StartsWith from '../conditionalOperators/StartsWith';

export default [
  new Every(), new Some(), new None(),
  new StartsWith(), new EndsWith(),
  new Equals(), new NotEquals(),
  new Contains(), new NotContains(),
  new GreaterThan(), new GreaterThanEquals(),
  new LessThan(), new LessThanEquals()
];
