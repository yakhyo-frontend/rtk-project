import { configureStore } from "@reduxjs/toolkit";
import getProducts from "../features/GetProducts";
import deleteProducts from "../features/DeleteProducts";
import addProducts from "../features/AddProducts";
import editProducts from "../features/EditProducts";

export const store = configureStore({
  reducer: {
    getProducts: getProducts,
    deleteProducts: deleteProducts,
    addProducts: addProducts,
    editProducts: editProducts,
  },
});
