import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const EditProduct = createAsyncThunk(
  "editProduct",

  async (id, editProduct) => {
    const request = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProduct),
    });

    if (!request.ok) {
      throw new Error("Productni yuklashda xatolik yuz berdi");
    }

    const editData = await request.json();

    return editData;
  },
);

const EditProductSlice = createSlice({
  name: "editProductSlice",
  initialState: {
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(EditProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(EditProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Xatolik yuz berdi";
      });
  },
});

export default EditProductSlice.reducer;
