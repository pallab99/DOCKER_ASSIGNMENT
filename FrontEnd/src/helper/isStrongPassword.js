export const isStrongPassword = (value) => {
  const hasMinLength = value.length >= 8;
  const hasLowerCase = /[a-z]/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasSymbols = /\W|_/.test(value);
  const hasNumbers = /\d/.test(value);

  if (!hasMinLength) {
    return "Password must have at least 8 characters";
  }
  if (!hasLowerCase) {
    return "Password must have at least 1 lowercase character";
  }
  if (!hasUpperCase) {
    return "Password must have at least 1 uppercase character";
  }
  if (!hasSymbols) {
    return "Password must have at least 1 symbol";
  }
  if (!hasNumbers) {
    return "Password must have at least 1 number";
  }

  return true;
};
