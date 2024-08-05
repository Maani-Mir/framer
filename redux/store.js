import imageSlice from "./imagesslice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  image: imageSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});
