

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  userInfo: null
};

export const SapSlice = createSlice({
  name: "SnapBuy",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    Increment: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },
    Decrement: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    RemoveItem: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.products = [];
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    logOutUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { addToCart, Increment, Decrement, RemoveItem, clearCart, setUser, logOutUser } = SapSlice.actions;
export default SapSlice.reducer;
