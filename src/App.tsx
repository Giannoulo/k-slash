import React, {useEffect} from "react";
import Sidemenu from "./Components/Sidemenu";
import PhotoModal from "./Components/PhotoModal";
import {useDispatch, useSelector} from "react-redux";
import {photoSelector, setFavoritePhotos} from "./Redux/Slices/photoSlice";
import ExposedRoutes from "./ExposedRoutes";
import {BrowserRouter} from "react-router-dom";

function App() {
  const {selectedPhoto, favoritePhotos} = useSelector(photoSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favoritePhotos.length === 0) {
      const localFavorites = localStorage.getItem("favoritePhotos");
      if (localFavorites) {
        dispatch(setFavoritePhotos(JSON.parse(localFavorites)));
      }
    }
  }, [favoritePhotos, dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        {selectedPhoto && <PhotoModal />}
        <Sidemenu />
        <ExposedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
