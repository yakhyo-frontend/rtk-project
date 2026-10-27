import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "getProducts",

  async () => {
    const request = await fetch("https://dummyjson.com/products", {
      method: "GET",
    });

    if (!request.ok) {
      throw new Error("Xatolik yuz berdi");
    }

    const getData = await request.json();

    return getData.products;
  },
);

const ProductsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Xatolik yuz berdi";
        state.data = [];
      });
  },
});

export default ProductsSlice.reducer;
