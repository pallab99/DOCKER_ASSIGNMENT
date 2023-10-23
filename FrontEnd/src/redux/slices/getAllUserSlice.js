import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hitGetAllUserAdmin: false,
};
export const getAllUserSlice = createSlice({
  name: "getAllBooks",
  initialState,
  reducers: {
    hitGetAllUserAdmin: (state) => {
      state.hitGetAllUserAdmin = !state.hitGetAllUserAdmin;
    },
  },
});
export const { hitGetAllUserAdmin } = getAllUserSlice.actions;

export default getAllUserSlice.reducer;
