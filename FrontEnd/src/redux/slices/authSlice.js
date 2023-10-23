import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.userData = {};
    },
  },
});
export const { addUserData, logOut } = authSlice.actions;

export default authSlice.reducer;
