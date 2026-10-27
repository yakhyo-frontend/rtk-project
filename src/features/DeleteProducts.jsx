import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  const request = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });

  if (!request.ok) {
    throw new Error("O'chirishda xatolik yuz berdi");
  }

  if (request.ok) alert(`Mahsulot muvaffaqiyatli o'chirildi`);

  const deleteData = await request.json();
  return deleteData;
});

const deleteProductSlice = createSlice({
  name: "deleteProductSlice",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default deleteProductSlice.reducer;
