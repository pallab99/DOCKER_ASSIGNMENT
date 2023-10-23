/* eslint-disable no-useless-escape */
export function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\=\[\]{};:"\\|<>?~]/;
  return specialChars.test(str);
}
