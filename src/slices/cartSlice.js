import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    
    updateQuantity: (state, action) => {
      return state.map(item => 
        item.id === action.payload.id && { ...item, quantity: action.payload.quantity }
      );
    },

    removeProduct:(state, action)=>{
      return state.filter(item=> item.id !== action.payload)
    } ,
  },
});

export const { addToCart, updateQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;