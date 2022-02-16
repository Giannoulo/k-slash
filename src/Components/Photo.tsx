import React from "react";
import { useDispatch } from "react-redux";
import { getPhotoDetails } from "../Redux/Slices/photoSlice";

type Props = {
  photo: any;
};
const Photo = ({ photo }: Props) => {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent) => {
    dispatch(getPhotoDetails(photo.id));
  };
  return (
    <img
      onClick={handleClick}
      src={photo.urls.small}
      alt={photo.alt_description ? photo.alt_description : ""}
    />
  );
};

export default Photo;
