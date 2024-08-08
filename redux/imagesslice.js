import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    value: [],
    // croppedValue:[],
    count: 0,
  },
  reducers: {
    imageAdd: (state, action) => {
      console.log("state payload for image add", action.payload.uri);
      state.value.push({ original: action.payload.uri, cropped: "" });
      //   state.value = [action.payload.uri];
      //   console.log("state payload for image add", state.payload);
      state.count += 1;
    },
    croppedImageAdd: (state, action) => {
      console.log("state payload for image crop", action.payload);

      state.value[action.payload.index].cropped = action.payload.uri;
      // state.value.push(
      //   state.value.findIndex((_index) => _index.original == action.payload.uri)
      // );
    },
    imageRemove: (state, action) => {
      console.log("state payload for image remove", action.payload.uri);

      //finding out the index that contains the uri and removing it
      console.log("state array, before slice", state.value);

      // console.log(
      //   "wyhat is it getting, true/false",
      //   state.value.some((_index) => {
      //     console.log("what are we getting in _index", _index.original);
      //     _index.original == action.payload.uri;
      //   })
      // );
      state.value.splice(
        state.value.findIndex(
          (_index) =>
            //console.log("what are we getting in _index", _index);
            _index.original == action.payload.uri
        ),
        1
      );
      console.log("state array, after slice", state.value);

      state.count -= 1;
    },
    flushImages: (state, action) => {
      state.value = [];
      state.count = 0;
    },
  },
});

export const { imageAdd, imageRemove, flushImages, croppedImageAdd } =
  imageSlice.actions;

export default imageSlice.reducer;
