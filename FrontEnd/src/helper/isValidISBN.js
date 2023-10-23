export function isValidISBN(isbn) {
  console.log("isbn", isbn);
  let regex = /^(978|979)-\d{1,5}-\d{1,7}-\d{1,6}-\d{1}$/;
  if (!regex.test(isbn)) {
    return false;
  }
  return true;
}
