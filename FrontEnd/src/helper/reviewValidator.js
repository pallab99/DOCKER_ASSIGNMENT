export const validateReview = (review) => {
  if (review.trim() === '') {
    return 'Review can not be empty';
  }
  if (review.trim().length < 5) {
    return 'Review can not be less than 5 characters';
  }
  if (review.trim().length > 200) {
    return 'Review can not be greater than 200 characters';
  }
};
