import { createSlice } from "@reduxjs/toolkit";
import unsplashInstance from "../../API/axiosConfig";

export const photoSlice = createSlice({
  name: "photos",
  initialState: {
    photoArray: [],
    loading: false,
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photoArray = action.payload;
      state.loading = false;
    },
    // TODO Add Spinner
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export selector,actions,reducer
export const photoSelector = (state) => state.photos;
export const { setPhotos, loading } = photoSlice.actions;
export default photoSlice.reducer;

// Thunks
export function getPhotos(page) {
  return async (dispatch, getState) => {
    const { photoArray } = getState().photos;
    dispatch(loading(true));
    try {
      const response = await unsplashInstance.get(`/photos?per_page=30&page=${page}`);
      dispatch(setPhotos([...photoArray, ...response.data]));
      // TODO Add local storage persistence
    } catch (error) {
      dispatch(loading(false));
      alert(error);
    }
  };
}
