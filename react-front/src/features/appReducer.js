import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
    allPosts: [],
    allUsers: [],
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    getAllPosts: (state, action) => {
      state.allPosts = action.payload.data;
    },
    getAllUsers: (state, action) => {
      state.allUsers = action.payload.data;
    },
  },
});
export const { 
  incrementByAmount, 
  getAllPosts, 
  getAllUsers
} = appSlice.actions;
export const selectapp = (state) => state.app.value;
export default appSlice.reducer;
