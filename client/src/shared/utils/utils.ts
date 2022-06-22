export const isEmptyObject = <T extends Record<keyof T, unknown>>(
  value: T
): boolean => {
  return Object.keys(value).length === 0 && value.constructor === Object
}
