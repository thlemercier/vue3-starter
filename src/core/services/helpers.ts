export const getOr = <T>(val: T, defaultVal: T) => val || defaultVal

export const hasValue = <T>(val: T) => typeof val !== 'undefined' && val !== null
