import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBookDetailsApiCalled: 0,
};
export const bookReview = createSlice({
  name: "bookReview",
  initialState,
  reducers: {
    callBookDetailsApi: (state) => {
      state.isBookDetailsApiCalled = state.isBookDetailsApiCalled + 1;
    },
  },
});
export const { callBookDetailsApi } = bookReview.actions;

export default bookReview.reducer;
