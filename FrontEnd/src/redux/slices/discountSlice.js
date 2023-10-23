import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discountedBooks: {},
};
export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    addDiscountedBooks: (state, action) => {
      state.discountedBooks = action.payload;
    },
  },
});
export const { addDiscountedBooks } = discountSlice.actions;

export default discountSlice.reducer;
