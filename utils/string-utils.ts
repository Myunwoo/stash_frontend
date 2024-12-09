/**
 * 빈 문자열 여부
 * @param {value} string
 * @return {boolean}
 * console.log(isEmptyString(""));         // true
 * console.log(isEmptyString("   "));      // true
 * console.log(isEmptyString("Hello"));    // false
 * console.log(isEmptyString(null));       // false
 * console.log(isEmptyString(undefined));  // false
 */
const isEmptyString = (value: string) => {
  return value.trim().length === 0
}


//////////// 여기 아래는 스트링은 아니긴함

/**
 * 빈배열 여부
 * @param {*} array
 * @return {boolean}
 */
const isEmptyArray = (array: any): boolean => {
  return !Array.isArray(array) || array.length === 0
}

/**
 * 빈배열이 아닌지 여부
 * @param {*} array
 * @return {boolean}
 */
const isNotEmptyArray = (array: any): boolean => {
  return !isEmptyArray(array)
}

/**
 * 배열인지 여부
 * @param {*} value
 * @return {boolean}
 */
const isArray = (value: any): boolean => {
  return (!!value) && (value.constructor === Array)
}

/**
 * 빈 값 여부
 * @param {*} value
 * @return {boolean}
 */
const isEmpty = (value: any): boolean => {
  if (value === '' || value === null || value === undefined ||
    (Object.keys(value).length === 0 && value.constructor === Object)) {
    return true
  }
  return false
}

/**
 * 값이 있는지 여부
 * @param {*} value
 * @return {boolean}
 */
const isNotEmpty = (value: any): boolean => {
  return !isEmpty(value)
}

export {
  isEmptyString,
  isEmptyArray,
  isNotEmptyArray,
  isArray,
  isEmpty,
  isNotEmpty
}