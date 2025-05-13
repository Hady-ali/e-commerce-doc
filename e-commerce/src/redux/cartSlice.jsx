// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.products.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.products.push({...action.payload, quantity: 1});
      }
      state.total = calculateTotal(state.products);
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find(item => item.id === action.payload);
      item.quantity++;
      state.total = calculateTotal(state.products);
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find(item => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      state.total = calculateTotal(state.products);
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state.products);
    },
    clearCart: (state) => {
      state.products = [];
      state.total = 0;
    },
  },
});

// دالة مساعدة لحساب الإجمالي
const calculateTotal = (products) => {
  return products.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
};

export const { 
  addToCart, 
  incrementQuantity, 
  decrementQuantity, 
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;