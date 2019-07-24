import { get, map } from "lodash";
import {
  defaultOptions,
  DEFAULT_CONDITION,
  EVERY_STRING,
  FLAGS_INDICATOR,
  GET_SEPARATOR,
  NONE_STRING,
  SEP_BETWEEN_OPERATOR,
  SEP_OPERATOR,
  SEP_PATH,
  SOME_STRING
} from './constants';
import { IConditionalOperator, IFilter } from "./Interface"
import operators from "./conditionalOperators"
import { CheckError, ValueNotFound } from './errors';

/**
 * Finds the target within the "conditions" object.
 * If the conditionalOperator or the target doesn't exist, then it throws a CheckError.
 *
 * A CheckError is treated as a fatal error, similarly to a native Error.
 * It means something isn't properly configured.
 *
 * @param conditionalOperator
 * @param target
 * @param flags
 * @return {*}
 */
export const findInConditions = (conditionalOperator: string, target: string, flags: string[]) => {
  let returnValue: any = undefined;
  operators.forEach((operatorObject: IConditionalOperator) => {
    if (operatorObject.alias.includes(conditionalOperator)) {
      returnValue = get(operatorObject, target);
    }
  });
  if (returnValue != undefined)
    return returnValue;

  throw(new CheckError({
    'status': false,
    'conditionalOperator': conditionalOperator,
    'target': target,
    'flags': flags,
    'reason': `Error: operator: "${conditionalOperator}" does not exist or doesn't have "${target}" attribute`,
  }));
};

/**
 * Resolves the "path", "operator", and "flags" from a given key
 *
 * @param rule
 * @return {{path: string, flags: Array, operator: string}}
 */
export const resolveInformationInRuleKey = (rule: string) => {
  // this cut the string and keep the conditional operator but
  // if the rules is org_name then tmp is equal org_name
  // if rules is org_name__eq tmp is equal __eq
  const tmp: string = rule.substring(rule.indexOf(SEP_OPERATOR), rule.length);
  let conditionalOperator: string;
  let path: string;

  if (tmp === rule) {
    conditionalOperator = DEFAULT_CONDITION;
    path = rule;
  } else {
    conditionalOperator = tmp.substring(SEP_OPERATOR.length, tmp.length);
    path = rule.substring(0, rule.indexOf(SEP_OPERATOR));
  }
  while (path.includes(SEP_PATH)) {
    path = path.replace(SEP_PATH, GET_SEPARATOR);
  }

  return { conditionalOperator, path };
};

/**
 * this function resolve the complexe Conditional Operator aka every, some, none
 * and the conditional Operator aka eq, gt, etc...
 * @param operators
 */
export const resolveComplexeOperator = (operators: string) => {
  let complexeConditionalOperator: string = operators.substring(0, operators.indexOf(SEP_BETWEEN_OPERATOR));
  let conditionalOperator: string = operators.substring(operators.indexOf(SEP_BETWEEN_OPERATOR), operators.length);
  if (!complexeConditionalOperator) {
    complexeConditionalOperator = conditionalOperator;
    conditionalOperator = DEFAULT_CONDITION;
  }
  if (conditionalOperator[0] == '_')
    conditionalOperator = conditionalOperator.substr(1);
  return { complexeConditionalOperator, conditionalOperator }
};

/**
 * Handles every, some and none operators
 * Not used for "simple" operators, only for complex ones (for arrays/objects)
 *
 * @example TODO retravailler ça, matelos !
 *  Given a key as "school_name__every_equal"
 *  Given a value as "Skema"
 *  The algorithm will first find the "school.name" value, then it'll loop over every value and
 *
 * This value is push back in an array. When the loop is over
 * return the result of the array compute by the appropriate function and for every, or for some and none for none.
 *
 * @param operators
 * @param path
 * @param context
 * @param givenValue
 * @return {{reason: string, flags: *, given_value: *, valueInContext: Array, operator: *, status: *}}
 */

export const handleComplexRequest = (operators: string, path: string, context: IFilter, givenValue: any) => {
  const { complexeConditionalOperator, conditionalOperator } = resolveComplexeOperator(operators);
  let flags: string[] = [];
  let results: boolean[] = [];
  let matches: IFilter = [];
  let tmpArray: string[] = path.split('.');
  const fieldKeyToCheck: any = tmpArray.pop();
  const resolvedContextFieldValue = get(context, tmpArray.join('.'));
  const call = findInConditions(conditionalOperator, 'call', flags);

  map(resolvedContextFieldValue, (valueInContext: any) => {
    flags = get(valueInContext, fieldKeyToCheck + FLAGS_INDICATOR, []);
    if (typeof valueInContext === 'undefined' || typeof givenValue === 'undefined') {
      return {
        'status': false,
        'complex_operator': complexeConditionalOperator, // TODO currently undocumented
        'operator': conditionalOperator,
        'given_value': givenValue,
        'valueInContext': valueInContext,
        'flags': flags,
        'reason': `${status ? 'Success' : 'Fail'} because ${complexeConditionalOperator} of "${valueInContext}" is ${status ? '' : 'not'} ${findInConditions(conditionalOperator, 'humanlyReadableAs', flags)} "${givenValue}"`,
      };
    }
    matches.push({ 'value': givenValue, 'valueInContext': valueInContext[fieldKeyToCheck] });
    results.push(call(givenValue, valueInContext[fieldKeyToCheck], flags));
  });

  const status = findInConditions(complexeConditionalOperator, 'call', flags)(results);
  return {
    'status': status,
    'operator': complexeConditionalOperator,
    'given_value': givenValue,
    'valueInContext': matches,
    'flags': flags,
    'reason': `${status ? 'Success' : 'Fail'} because "${matches}" is ${status ? '' : 'not'} ${findInConditions(complexeConditionalOperator, 'humanlyReadableAs', flags)} "${givenValue}"`,
  };
};

/**
 * It's the main function of the parsing first it calls the buildArg function which is explained above.
 * Second it check if the request needs a special treatment like if the operator is every, some or none
 * both of the special treatment and standard case work the same (the little differences are explained above).
 * The function got to find the valueInContext value in the  context. Next it retrieve the call of the operator.
 * Then the operator is called and the return object is created.
 *
 * @param context
 * @param rule
 * @param value
 * @param options
 */
export const check = (context: object, rule: string, value: any, options: any = defaultOptions) => {
  let { conditionalOperator, path } = resolveInformationInRuleKey(rule);

  if (conditionalOperator.includes(EVERY_STRING) || conditionalOperator.includes(SOME_STRING) || conditionalOperator.includes(NONE_STRING)) {
    return handleComplexRequest(conditionalOperator, path, context, value);
  }

  const valueInContext: any = get(context, path);
  const flags: string[] = get(context, path + FLAGS_INDICATOR, []);

  // If the given value is not defined (missing in context), it's treated as a particular case
  if (typeof valueInContext === 'undefined') {
    if (options.strictMatch) {
      // XXX In "strict match" mode, missing values in context are treated as a match failure
      return {
        'status': false,
        'rule':rule,
        'conditionalOperator': conditionalOperator,
        'given_value': value,
        'valueInContext': valueInContext,
        'flags': flags,
        'reason': `'Fail because "${valueInContext}" is not ${findInConditions(conditionalOperator, 'humanlyReadableAs', flags)} "${value}"`,
      };
    } else {
      // XXX In the other case, the value is considered as "missing" and a special exception is thrown
      //  This exception must be handled by the caller, and should be used to resolve whether the check fails or not (based on a group of "checks", for instance)
      throw(new ValueNotFound({
        'status': null,
        'rule':rule,
        'conditionalOperator': conditionalOperator,
        'path': path,
        'valueInContext': valueInContext,
        'reason': `Error: path: ${path} is not defined in context`,
      }));
    }
  }

  const call = findInConditions(conditionalOperator, 'call', flags);
  const status = call(value, valueInContext, flags);

  return {
    'status': status,
    'rule':rule,
    'operator': conditionalOperator,
    'given_value': value,
    'valueInContext': valueInContext,
    'flags': flags,
    'reason': `${status ? 'Success' : 'Fail'} because "${valueInContext}" is ${status ? '' : 'not'} ${findInConditions(conditionalOperator, 'humanlyReadableAs', flags)} "${value}"`,
  };
};
