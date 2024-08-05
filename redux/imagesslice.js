import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    value: [],
    count: 0,
  },
  reducers: {
    imageAdd: (state, action) => {
      console.log("state payload for image add", action.payload.uri);
      state.value.push(action.payload.uri);
      //   state.value = [action.payload.uri];
      //   console.log("state payload for image add", state.payload);
      state.count += 1;
    },
    imageRemove: (state, action) => {
      //finding out the index that contains the uri and removing it
      state.value.splice(
        state.value.findIndex((_value) => {
          _value == action.payload.uri;
          console.log("state payload for image remove", action.payload.uri);
        }),
        1
      );
      state.count -= 1;
    },
    flushImages: (state, action) => {
      state.value = [];
      state.count = 0;
    },
  },
});

export const { imageAdd, imageRemove, flushImages } = imageSlice.actions;

export default imageSlice.reducer;
