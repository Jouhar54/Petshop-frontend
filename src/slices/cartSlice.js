import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/axiosIntersepter';

const userId = localStorage.getItem('userId');

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const response = await api.get(`users/${userId}/cart`);
    return response.data.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(item => item._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      api.post(`/users/${userId}/cart`, action.payload)
    },
    
    updateQuantity: (state, action) => {
      return state.items.map(item => 
        item.id === action.payload.id && { ...item, quantity: action.payload.quantity }
      );
    },

    removeProduct:(state, action)=>{
      state.items = state.items.filter(item=> item._id._id !== action.payload)
      api.delete(`/users/${userId}/cart`, { data: { _id: action.payload } });
    } ,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { addToCart, updateQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;