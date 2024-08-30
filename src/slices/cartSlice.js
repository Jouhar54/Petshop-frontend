import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/axiosIntersepter';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const userId = localStorage.getItem('userId');
      const existingProduct = state.find(item => item._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
      api.post(`/users/${userId}/cart`, action.payload)
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