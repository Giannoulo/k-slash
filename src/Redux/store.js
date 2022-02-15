import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "./Slices/photoSlice";

export default configureStore({
  reducer: { photos: photoReducer },
});
