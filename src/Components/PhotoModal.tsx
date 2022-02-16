import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { photoSelector, setSelectedPhoto } from "../Redux/Slices/photoSlice";

const PhotoModal = () => {
  const { selectedPhoto } = useSelector(photoSelector);
  const dispatch = useDispatch();

  const handleCloseClick = (e: React.MouseEvent) => {
    dispatch(setSelectedPhoto(null));
  };
  return (
    <div className="photo-modal">
      <div className="photo-modal__content">
        <img
          src={selectedPhoto.urls.small}
          alt={selectedPhoto.alt_description ? selectedPhoto.alt_description : ""}
        />
        <div className="photo-modal__details">
          <div className="photo-modal__header">
            <button>Like</button>
            <button onClick={handleCloseClick}>Close</button>
          </div>
          <div className="photo-modal__owner">
            <span>{selectedPhoto.alt_description ? selectedPhoto.alt_description : ""}</span>
            <span>{selectedPhoto.user.username ? selectedPhoto.user.username : ""}</span>
          </div>
          <table className="photo-modal__camera">
            <tr>
              <th>Camera Make</th>
              <th>Camera Model</th>
              <th>Foxal length</th>
            </tr>
            <tr>
              <td>{selectedPhoto.exif.make ? selectedPhoto.exif.make : ""}</td>
              <td>{selectedPhoto.exif.model ? selectedPhoto.exif.model : ""}</td>
              <td>{selectedPhoto.exif.focal_length ? selectedPhoto.exif.focal_length : ""}</td>
            </tr>
            <tr>
              <th>Apperture</th>
              <th>Shutter Speed</th>
              <th>ISO</th>
            </tr>
            <tr>
              <td>{selectedPhoto.exif.aperture ? selectedPhoto.exif.aperture : ""}</td>
              <td>{selectedPhoto.exif.exposure_time ? selectedPhoto.exif.exposure_time : ""}</td>
              <td>{selectedPhoto.exif.iso ? selectedPhoto.exif.iso : ""}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
