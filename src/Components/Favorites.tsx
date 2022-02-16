import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {photoSelector, setFavoritePhotos} from "../Redux/Slices/photoSlice";
import Photo from "./Photo";

const Favorites = () => {
  const [photosJSX, setPhotosJSX] = useState<JSX.Element[] | null>(null);
  const {favoritePhotos} = useSelector(photoSelector);

  useEffect(() => {
    if (favoritePhotos.length === 0) {
      const localFavorites = localStorage.getItem("favoritePhotos");
      if (localFavorites) {
        setFavoritePhotos(localFavorites);
      }
    }
    setPhotosJSX(favoritePhotos.map((photo: any) => <Photo photo={photo} key={photo.id} />));
  }, [favoritePhotos]);

  return <div className="image-gallery">{photosJSX}</div>;
};

export default Favorites;
