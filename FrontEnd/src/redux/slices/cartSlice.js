import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  callCartApi: 0,
  itemQuantity: 0,
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculateItemQuantity: (state, action) => {
      state.itemQuantity = action.payload;
    },
    callCartApi: (state) => {
      state.callCartApi += 1;
    },
  },
});
export const { calculateItemQuantity, callCartApi, incrementByAmount } =
  cartSlice.actions;

export default cartSlice.reducer;
