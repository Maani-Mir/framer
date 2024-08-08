import imageSlice from "./imagesslice";
import authSlice from "./authslice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  image: imageSlice,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});
