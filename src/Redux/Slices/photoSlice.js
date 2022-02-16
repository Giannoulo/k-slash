import {createSlice} from "@reduxjs/toolkit";
import unsplashInstance from "../../API/axiosConfig";

export const photoSlice = createSlice({
  name: "photos",
  initialState: {
    photoArray: [],
    selectedPhoto: null,
    favoritePhotos: [],
    loading: false,
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photoArray = action.payload;
      state.loading = false;
    },
    setFavoritePhotos: (state, action) => {
      state.favoritePhotos = action.payload;
      state.loading = false;
    },
    setSelectedPhoto: (state, action) => {
      state.selectedPhoto = action.payload;
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
export const {setPhotos, setSelectedPhoto, setFavoritePhotos, loading} = photoSlice.actions;
export default photoSlice.reducer;

// Thunks
export function getPhotos(page) {
  return async (dispatch, getState) => {
    const {photoArray} = getState().photos;
    dispatch(loading(true));
    try {
      const response = await unsplashInstance.get(`/photos?per_page=30&page=${page}`);
      dispatch(setPhotos([...photoArray, ...response.data]));
    } catch (error) {
      dispatch(loading(false));
      alert(error);
    }
  };
}

export function addFavoritePhoto(id) {
  return async (dispatch, getState) => {
    const {favoritePhotos} = getState().photos;
    try {
      const response = await unsplashInstance.get(`/photos/${id}`);
      const newFavoritePhotos = [...favoritePhotos, response.data];
      dispatch(setFavoritePhotos(newFavoritePhotos));
      localStorage.setItem("favoritePhotos", JSON.stringify(newFavoritePhotos));
    } catch (error) {
      dispatch(loading(false));
      alert(error);
    }
  };
}

export function removeFavoritePhoto(id) {
  return (dispatch, getState) => {
    const {favoritePhotos} = getState().photos;
    const newFavoritePhotos = favoritePhotos.filter((photo) => photo.id !== id);
    dispatch(setFavoritePhotos(newFavoritePhotos));
    localStorage.setItem("favoritePhotos", JSON.stringify(newFavoritePhotos));
  };
}

export function getPhotoDetails(id) {
  return async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await unsplashInstance.get(`/photos/${id}`);
      dispatch(setSelectedPhoto(response.data));
      // TODO Add local storage persistence
    } catch (error) {
      dispatch(loading(false));
      alert(error);
    }
  };
}
