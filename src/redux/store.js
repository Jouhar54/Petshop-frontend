import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "../slices/productSlice"
import cartReducer from '../slices/cartSlice'

export const store = configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
    },
  });