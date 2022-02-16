import React, {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  photoSelector,
  setSelectedPhoto,
  addFavoritePhoto,
  removeFavoritePhoto,
} from "../Redux/Slices/photoSlice";

const PhotoModal = () => {
  const {selectedPhoto, favoritePhotos} = useSelector(photoSelector);
  const dispatch = useDispatch();
  const isMounted = useRef<boolean>(false);
  const [liked, setLiked] = useState(false);

  const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const element = e.target as HTMLElement;
    if (element.className === "photo-modal" || element.className === "photo-modal__close-button") {
      dispatch(setSelectedPhoto(null));
    }
  };

  useEffect(() => {
    isMounted.current = true;
    for (const photo of favoritePhotos) {
      if (photo.id === selectedPhoto.id) {
        setLiked(true);
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [favoritePhotos, selectedPhoto]);

  const handleLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    if (liked) {
      dispatch(removeFavoritePhoto(selectedPhoto.id));
      setLiked(false);
    } else {
      dispatch(addFavoritePhoto(selectedPhoto.id));
    }
  };

  return (
    <div className="photo-modal" onClick={handleCloseClick}>
      <div className="photo-modal__content">
        <img
          src={selectedPhoto.urls.small}
          alt={selectedPhoto.alt_description ? selectedPhoto.alt_description : ""}
        />
        <div className="photo-modal__details">
          <div className="photo-modal__header">
            <button onClick={handleLikeClick}>{liked ? "Unlike" : "Like"}</button>
            <button className="photo-modal__close-button">Close</button>
          </div>
          <div className="photo-modal__owner">
            <span>{selectedPhoto.alt_description ? selectedPhoto.alt_description : ""}</span>
            <span>{selectedPhoto.user.username ? selectedPhoto.user.username : ""}</span>
          </div>
          <hr />
          <table className="photo-modal__camera">
            <thead>
              <tr>
                <th>Camera Make</th>
                <th>Camera Model</th>
                <th>Foxal length</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedPhoto.exif.make ? selectedPhoto.exif.make : ""}</td>
                <td>{selectedPhoto.exif.model ? selectedPhoto.exif.model : ""}</td>
                <td>{selectedPhoto.exif.focal_length ? selectedPhoto.exif.focal_length : ""}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>Apperture</th>
                <th>Shutter Speed</th>
                <th>ISO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedPhoto.exif.aperture ? selectedPhoto.exif.aperture : ""}</td>
                <td>{selectedPhoto.exif.exposure_time ? selectedPhoto.exif.exposure_time : ""}</td>
                <td>{selectedPhoto.exif.iso ? selectedPhoto.exif.iso : ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
