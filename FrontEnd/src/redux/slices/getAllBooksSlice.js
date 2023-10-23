import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  debouncedValue: "",
  hitGetAllBooksAdmin: false,
};
export const getAllBooksSlice = createSlice({
  name: "getAllBooks",
  initialState,
  reducers: {
    searchTerm: (state, action) => {
      state.debouncedValue = action.payload;
    },
    hitGetAllBooksAdmin: (state) => {
      state.hitGetAllBooksAdmin = !state.hitGetAllBooksAdmin;
    },
  },
});
export const { searchTerm, hitGetAllBooksAdmin } = getAllBooksSlice.actions;

export default getAllBooksSlice.reducer;
