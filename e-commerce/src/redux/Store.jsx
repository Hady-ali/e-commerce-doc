import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./SapSlice"



import cartReducer from "./cartSlice"
import userReducer from './userSlice';


export const store = configureStore({
  reducer: {appReducer},


    cart: cartReducer,  
    user: userReducer,

})

