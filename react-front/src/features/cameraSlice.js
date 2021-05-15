import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    cameraImage: null,
  },
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state) => {
      state.cameraImage = null;
    },
    selectCameraImage: (state) => {
      state.cameraImage.selected();
    },
  },
});
export const {
  setCameraImage,
  resetCameraImage,
  selectCameraImage,
} = cameraSlice.actions;
export const selectCamera = (state) => state.camera.cameraImage;
export default cameraSlice.reducer;
