import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPhotoDetails, photoSelector} from "../Redux/Slices/photoSlice";
import {ReactComponent as Heart} from "../Assets/heart.svg";

type Props = {
  photo: any;
};
const Photo = ({photo}: Props) => {
  const {favoritePhotos} = useSelector(photoSelector);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent) => {
    dispatch(getPhotoDetails(photo.id));
  };
  useEffect(() => {
    for (const favoritePhoto of favoritePhotos) {
      if (favoritePhoto.id === photo.id) {
        setLiked(true);
      }
    }
  }, [favoritePhotos, photo]);

  return (
    <div>
      {liked && <Heart className="heart-icon" />}
      <img
        onClick={handleClick}
        src={photo.urls.small}
        alt={photo.alt_description ? photo.alt_description : ""}
      />
    </div>
  );
};

export default Photo;
