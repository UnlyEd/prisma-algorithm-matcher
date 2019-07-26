import { get, isArray, isEqual, isObject, isString, keys } from 'lodash'

export function checkStringEqualNoMatchCase(x: any, y: any): boolean | undefined {
  if (isString(x) && isString(y)) {
    return x.toLowerCase() === y.toLowerCase()
  }
}

export function containHandleStringString(value: any, contextValue: any, flags: string[]): boolean | null {
  if (isString(value) && isString(contextValue)) {
    if (flags.includes('i'))
      return contextValue.toLowerCase().includes(value.toLowerCase());
    return contextValue.includes(value);
  }
  return null
}

export function containHandleArray(value: any, contextValue: any, flags: string[]): boolean | null {
  if (isArray(value)) {
    if (flags.includes('i')) {
      value = value.map((el) => {
        return isString(el) ? el.toLowerCase() : el;
      });
      contextValue = isString(contextValue) ? contextValue.toLowerCase() : contextValue;
    }
    return value.includes(contextValue);
  }
  return null;
}

export function containHandleStringInObject(value: any, contextValue: any, flags: string[]): boolean | null {
  if (isObject(value) && isString(contextValue)) {
    return value.hasOwnProperty(contextValue)
  }
  return null
}

export function containHandleObjectInObject(value: any, contextValue: any, flags: string[]): boolean | null {
  if (isObject(value) && isObject(contextValue)) {
    let ret: boolean = true;
    keys(value).forEach((el) => {
      if (keys(contextValue).includes(el) && !isEqual(get(contextValue, el, undefined), get(value, el, null))) {
        ret = false;
      }
    });
    return ret;
  }
  return null
}
