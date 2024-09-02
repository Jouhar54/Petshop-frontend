import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosIntersepter";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await api.get(`users/products`);
    return response.data.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    deleteProduct:(state, action)=>{
      api.delete(`/admin/products/${action.payload.id}`)
      state.items = state.items.filter(item=> item._id._id !== action.payload)
    } ,

    editProduct:(state, action)=>{
      console.log(action.payload);
      api.put(`/admin/products/${action.payload._id}`, {data: action.payload.updatedProduct})
    } ,

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {deleteProduct, editProduct} = productsSlice.actions;
export default productsSlice.reducer;