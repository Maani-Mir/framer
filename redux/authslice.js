import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: "",
    isLoggedIn: false,
  },
  reducers: {
    userIdAdd: (state, action) => {
      console.log("state payload for user id add", action.payload.id);
      state.userId = action.payload.id;
      state.isLoggedIn = true;
    },
    userIdRemove: (state, action) => {
      // console.log("state payload for user id remove", action.payload.id);
      state.userId = "";
      state.isLoggedIn = false;
    },
  },
});

export const { userIdAdd, userIdRemove } = authSlice.actions;

export default authSlice.reducer;
