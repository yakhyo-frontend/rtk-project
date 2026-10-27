import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AddProduct = createAsyncThunk(
  "addProduct",

  async (newProduct) => {
    const request = await fetch("https://dummyjson.com/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!request.ok) {
      throw new Error("Xatolik yuz berdi");
    }

    const addData = request.json();

    return addData;
  },
);

const AddProductSlice = createSlice({
  name: "addProductSlice",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(AddProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(AddProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = action.payload;
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Xatolik yuz berdi";
      });
  },
});

export default AddProductSlice.reducer;
