import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/axiosIntersepter";


export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await api.get(`users/${userId}/cart`);
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },

  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      const userId = localStorage.getItem("userId");
      api.post(`/users/${userId}/cart`, action.payload);
    },

    updateQuantity: (state, action) => {
      const updatedItems = state.items.map((item) =>
        item._id._id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      state.items = updatedItems;
    },

    removeProduct: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id._id !== action.payload
      );
      const userId = localStorage.getItem("userId");
      api.delete(`/users/${userId}/cart`, { data: { _id: action.payload } });
    },
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
  },
});

export const { addToCart, updateQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
